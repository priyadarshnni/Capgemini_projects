// =============================================================================
// ReportsController — read-only analytics endpoints
// =============================================================================
// Base route: /api/Reports
//
// Topic: Daily summary — counts finalized bills and sums totals for one UTC
//        calendar day (FinalizedAtUtc range). Drafts are excluded.
// =============================================================================

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiCatalogBill.Api.Contracts;
using MultiCatalogBill.Api.Data;

namespace MultiCatalogBill.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportsController(BillDbContext db) : ControllerBase
{
    [HttpGet("daily-summary")]
    public async Task<ActionResult<DailySummaryDto>> DailySummary([FromQuery] DateOnly? date, CancellationToken ct = default)
    {
        var d = date ?? DateOnly.FromDateTime(DateTime.UtcNow);
        var start = d.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
        var end = d.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

        var bills = await db.Bills.AsNoTracking()
            .Where(b => !b.IsDraft && b.FinalizedAtUtc >= start && b.FinalizedAtUtc <= end)
            .ToListAsync(ct);

        var count = bills.Count;
        var total = bills.Sum(b => b.GrandTotal);
        var tax = bills.Sum(b => b.TaxAmount);
        return Ok(new DailySummaryDto(d, count, total, tax));
    }
}
