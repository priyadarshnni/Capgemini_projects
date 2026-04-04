using MultiCatalogBill.Api.Contracts;
using MultiCatalogBill.Api.Models;
using MultiCatalogBill.Api.Services;

namespace MultiCatalogBill.Api.Mapping;

public static class DtoMapping
{
    public static CatalogItemDto ToDto(this CatalogItem x) =>
        new(x.Id, x.Kind, x.Name, x.Description, x.DefaultUnitPrice, x.AllowsVariablePrice, x.IsCustomAmountEntry, x.Active, x.SortOrder);

    public static BillLineDto ToDto(this BillLine x) =>
        new(
            x.Id,
            x.CatalogItemId,
            x.SourceKind,
            x.Description,
            x.UnitPrice,
            x.Quantity,
            BillMath.LineTotal(x.UnitPrice, x.Quantity),
            x.SortOrder);

    public static BillSummaryDto ToSummaryDto(this Bill x) =>
        new(x.Id, x.InvoiceNumber, x.CreatedAtUtc, x.UpdatedAtUtc, x.FinalizedAtUtc, x.IsDraft, x.CustomerName, x.GrandTotal);

    public static BillDetailDto ToDetailDto(this Bill x) =>
        new(
            x.Id,
            x.InvoiceNumber,
            x.CreatedAtUtc,
            x.UpdatedAtUtc,
            x.FinalizedAtUtc,
            x.IsDraft,
            x.CustomerName,
            x.Notes,
            x.DiscountKind,
            x.DiscountValue,
            x.TaxRatePercent,
            x.SubTotal,
            x.DiscountAmount,
            x.TaxAmount,
            x.GrandTotal,
            x.Lines.OrderBy(l => l.SortOrder).ThenBy(l => l.Id).Select(l => l.ToDto()).ToList());
}
