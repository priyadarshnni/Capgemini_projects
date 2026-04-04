using System.Globalization;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiCatalogBill.Api.Contracts;
using MultiCatalogBill.Api.Data;
using MultiCatalogBill.Api.Mapping;
using MultiCatalogBill.Api.Models;
using MultiCatalogBill.Api.Services;

namespace MultiCatalogBill.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BillsController(BillDbContext db, ILogger<BillsController> log) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<BillSummaryDto>>> Search(
        [FromQuery] string? q,
        [FromQuery] DateTime? fromUtc,
        [FromQuery] DateTime? toUtc,
        [FromQuery] bool? draftsOnly,
        CancellationToken ct = default)
    {
        var query = db.Bills.AsNoTracking().AsQueryable();
        if (draftsOnly == true)
            query = query.Where(b => b.IsDraft);
        else if (draftsOnly == false)
            query = query.Where(b => !b.IsDraft);

        if (fromUtc.HasValue)
            query = query.Where(b => b.CreatedAtUtc >= fromUtc.Value);
        if (toUtc.HasValue)
            query = query.Where(b => b.CreatedAtUtc <= toUtc.Value);

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(b =>
                (b.InvoiceNumber != null && b.InvoiceNumber.Contains(term)) ||
                (b.CustomerName != null && b.CustomerName.Contains(term)) ||
                b.Id.ToString().Contains(term));
        }

        var list = await query
            .OrderByDescending(b => b.UpdatedAtUtc)
            .Take(200)
            .ToListAsync(ct);
        return Ok(list.Select(b => b.ToSummaryDto()).ToList());
    }

    [HttpPost]
    public async Task<ActionResult<BillDetailDto>> CreateDraft(CancellationToken ct = default)
    {
        var now = DateTime.UtcNow;
        var bill = new Bill
        {
            CreatedAtUtc = now,
            UpdatedAtUtc = now,
            IsDraft = true,
            DiscountKind = DiscountKind.None,
            DiscountValue = 0,
            TaxRatePercent = 8m
        };
        db.Bills.Add(bill);
        await db.SaveChangesAsync(ct);
        await db.Entry(bill).Collection(x => x.Lines).LoadAsync(ct);
        return CreatedAtAction(nameof(GetById), new { id = bill.Id }, bill.ToDetailDto());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BillDetailDto>> GetById(int id, CancellationToken ct = default)
    {
        var bill = await db.Bills
            .AsNoTracking()
            .Include(b => b.Lines)
            .FirstOrDefaultAsync(b => b.Id == id, ct);
        if (bill is null)
            return NotFound();
        return Ok(bill.ToDetailDto());
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<BillDetailDto>> Update(int id, [FromBody] UpdateBillDto dto, CancellationToken ct = default)
    {
        var bill = await db.Bills.Include(b => b.Lines).FirstOrDefaultAsync(b => b.Id == id, ct);
        if (bill is null)
            return NotFound();
        if (!bill.IsDraft)
            return BadRequest("Only draft bills can be edited.");

        bill.CustomerName = string.IsNullOrWhiteSpace(dto.CustomerName) ? null : dto.CustomerName.Trim();
        bill.Notes = string.IsNullOrWhiteSpace(dto.Notes) ? null : dto.Notes.Trim();
        bill.DiscountKind = dto.DiscountKind;
        bill.DiscountValue = dto.DiscountValue;
        bill.TaxRatePercent = dto.TaxRatePercent;
        bill.UpdatedAtUtc = DateTime.UtcNow;

        db.BillLines.RemoveRange(bill.Lines);
        bill.Lines.Clear();

        var order = 0;
        foreach (var line in dto.Lines ?? [])
        {
            if (string.IsNullOrWhiteSpace(line.Description))
                continue;
            if (line.Quantity <= 0)
                continue;

            var desc = line.Description.Trim();
            var price = line.UnitPrice;
            if (line.CatalogItemId is { } cid)
            {
                var cat = await db.CatalogItems.AsNoTracking().FirstOrDefaultAsync(c => c.Id == cid && c.Active, ct);
                if (cat is null)
                    return BadRequest($"Unknown catalog item: {cid}");
                if (cat.IsCustomAmountEntry && price < 0)
                    return BadRequest("Custom donation amount must be zero or positive.");
                if (!cat.AllowsVariablePrice && !cat.IsCustomAmountEntry && cat.DefaultUnitPrice is { } def)
                    price = def;
            }

            bill.Lines.Add(new BillLine
            {
                CatalogItemId = line.CatalogItemId,
                SourceKind = line.SourceKind,
                Description = desc,
                UnitPrice = price,
                Quantity = line.Quantity,
                SortOrder = line.SortOrder != 0 ? line.SortOrder : order++
            });
        }

        ApplyTotals(bill);
        await db.SaveChangesAsync(ct);
        await db.Entry(bill).Collection(x => x.Lines).LoadAsync(ct);
        return Ok(bill.ToDetailDto());
    }

    [HttpPost("{id:int}/finalize")]
    public async Task<ActionResult<BillDetailDto>> Finalize(int id, CancellationToken ct = default)
    {
        var bill = await db.Bills.Include(b => b.Lines).FirstOrDefaultAsync(b => b.Id == id, ct);
        if (bill is null)
            return NotFound();
        if (!bill.IsDraft)
            return BadRequest("Bill is already finalized.");
        if (bill.Lines.Count == 0)
            return BadRequest("Add at least one line before finalizing.");

        ApplyTotals(bill);
        bill.InvoiceNumber = $"INV-{DateTime.UtcNow:yyyyMMdd}-{bill.Id:000000}";
        bill.IsDraft = false;
        bill.FinalizedAtUtc = DateTime.UtcNow;
        bill.UpdatedAtUtc = bill.FinalizedAtUtc.Value;
        await db.SaveChangesAsync(ct);
        await db.Entry(bill).Collection(x => x.Lines).LoadAsync(ct);
        return Ok(bill.ToDetailDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteDraft(int id, CancellationToken ct = default)
    {
        var bill = await db.Bills.FirstOrDefaultAsync(b => b.Id == id, ct);
        if (bill is null)
            return NotFound();
        if (!bill.IsDraft)
            return BadRequest("Only drafts can be deleted.");
        db.Bills.Remove(bill);
        await db.SaveChangesAsync(ct);
        return NoContent();
    }

    [HttpGet("{id:int}/export/pdf")]
    public async Task<IActionResult> ExportPdf(int id, CancellationToken ct = default)
    {
        try
        {
            var bill = await db.Bills.AsNoTracking().Include(b => b.Lines).FirstOrDefaultAsync(b => b.Id == id, ct);
            if (bill is null)
                return NotFound();
            var pdf = BillPdfBuilder.Build(bill);
            var name = bill.InvoiceNumber ?? $"draft-{bill.Id}";
            var safeName = string.Join("_", name.Split(Path.GetInvalidFileNameChars()));
            return File(pdf, "application/pdf", $"{safeName}.pdf");
        }
        catch (Exception ex)
        {
            log.LogError(ex, "PDF export failed for bill {BillId}", id);
            return Problem(detail: ex.Message, title: "PDF generation failed");
        }
    }

    [HttpGet("{id:int}/export/csv")]
    public async Task<IActionResult> ExportCsv(int id, CancellationToken ct = default)
    {
        var bill = await db.Bills.AsNoTracking().Include(b => b.Lines).FirstOrDefaultAsync(b => b.Id == id, ct);
        if (bill is null)
            return NotFound();

        var sb = new StringBuilder();
        sb.AppendLine("invoice,description,unit_price,quantity,line_total");
        var inv = bill.InvoiceNumber ?? $"DRAFT-{bill.Id}";
        foreach (var line in bill.Lines.OrderBy(l => l.SortOrder).ThenBy(l => l.Id))
        {
            var lt = BillMath.LineTotal(line.UnitPrice, line.Quantity);
            sb.AppendLine(string.Join(',',
                Csv(inv),
                Csv(line.Description),
                line.UnitPrice.ToString(CultureInfo.InvariantCulture),
                line.Quantity.ToString(CultureInfo.InvariantCulture),
                lt.ToString(CultureInfo.InvariantCulture)));
        }

        var bytes = Encoding.UTF8.GetBytes(sb.ToString());
        return File(bytes, "text/csv", $"{inv}.csv");
    }

    private static void ApplyTotals(Bill bill)
    {
        var pairs = bill.Lines.Select(l => (l.UnitPrice, l.Quantity));
        var (sub, disc, tax, grand) = BillMath.Totals(pairs, bill.DiscountKind, bill.DiscountValue, bill.TaxRatePercent);
        bill.SubTotal = sub;
        bill.DiscountAmount = disc;
        bill.TaxAmount = tax;
        bill.GrandTotal = grand;
    }

    private static string Csv(string? s)
    {
        if (string.IsNullOrEmpty(s))
            return "\"\"";
        var escaped = s.Replace("\"", "\"\"");
        return $"\"{escaped}\"";
    }
}
