using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiCatalogBill.Api.Contracts;
using MultiCatalogBill.Api.Data;
using MultiCatalogBill.Api.Mapping;
using MultiCatalogBill.Api.Models;

namespace MultiCatalogBill.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogItemsController(BillDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<CatalogItemDto>>> GetAll(
        [FromQuery] CatalogKind? kind,
        [FromQuery] bool includeInactive = false,
        CancellationToken ct = default)
    {
        var q = db.CatalogItems.AsNoTracking().AsQueryable();
        if (kind.HasValue)
            q = q.Where(x => x.Kind == kind.Value);
        if (!includeInactive)
            q = q.Where(x => x.Active);
        var list = await q.OrderBy(x => x.SortOrder).ThenBy(x => x.Name).ToListAsync(ct);
        return Ok(list.Select(x => x.ToDto()).ToList());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CatalogItemDto>> GetById(int id, CancellationToken ct = default)
    {
        var item = await db.CatalogItems.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        if (item is null)
            return NotFound();
        return Ok(item.ToDto());
    }

    [HttpPost]
    public async Task<ActionResult<CatalogItemDto>> Create([FromBody] UpsertCatalogItemDto dto, CancellationToken ct = default)
    {
        var entity = new CatalogItem
        {
            Kind = dto.Kind,
            Name = dto.Name.Trim(),
            Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
            DefaultUnitPrice = dto.DefaultUnitPrice,
            AllowsVariablePrice = dto.AllowsVariablePrice,
            IsCustomAmountEntry = dto.IsCustomAmountEntry,
            Active = dto.Active,
            SortOrder = dto.SortOrder
        };
        db.CatalogItems.Add(entity);
        await db.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<CatalogItemDto>> Update(int id, [FromBody] UpsertCatalogItemDto dto, CancellationToken ct = default)
    {
        var entity = await db.CatalogItems.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null)
            return NotFound();
        entity.Kind = dto.Kind;
        entity.Name = dto.Name.Trim();
        entity.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
        entity.DefaultUnitPrice = dto.DefaultUnitPrice;
        entity.AllowsVariablePrice = dto.AllowsVariablePrice;
        entity.IsCustomAmountEntry = dto.IsCustomAmountEntry;
        entity.Active = dto.Active;
        entity.SortOrder = dto.SortOrder;
        await db.SaveChangesAsync(ct);
        return Ok(entity.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> SoftDelete(int id, CancellationToken ct = default)
    {
        var entity = await db.CatalogItems.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null)
            return NotFound();
        entity.Active = false;
        await db.SaveChangesAsync(ct);
        return NoContent();
    }
}
