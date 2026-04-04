using System.Text.Json.Serialization;
using MultiCatalogBill.Api.Models;

namespace MultiCatalogBill.Api.Contracts;

public record CatalogItemDto(
    int Id,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] CatalogKind Kind,
    string Name,
    string? Description,
    decimal? DefaultUnitPrice,
    bool AllowsVariablePrice,
    bool IsCustomAmountEntry,
    bool Active,
    int SortOrder);

public record UpsertCatalogItemDto(
    [property: JsonConverter(typeof(JsonStringEnumConverter))] CatalogKind Kind,
    string Name,
    string? Description,
    decimal? DefaultUnitPrice,
    bool AllowsVariablePrice,
    bool IsCustomAmountEntry,
    bool Active,
    int SortOrder);

public record BillLineInputDto(
    int? CatalogItemId,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] LineSourceKind SourceKind,
    string Description,
    decimal UnitPrice,
    decimal Quantity,
    int SortOrder);

public record UpdateBillDto(
    string? CustomerName,
    string? Notes,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] DiscountKind DiscountKind,
    decimal DiscountValue,
    decimal TaxRatePercent,
    List<BillLineInputDto> Lines);

public record BillLineDto(
    int Id,
    int? CatalogItemId,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] LineSourceKind SourceKind,
    string Description,
    decimal UnitPrice,
    decimal Quantity,
    decimal LineTotal,
    int SortOrder);

public record BillSummaryDto(
    int Id,
    string? InvoiceNumber,
    DateTime CreatedAtUtc,
    DateTime UpdatedAtUtc,
    DateTime? FinalizedAtUtc,
    bool IsDraft,
    string? CustomerName,
    decimal GrandTotal);

public record BillDetailDto(
    int Id,
    string? InvoiceNumber,
    DateTime CreatedAtUtc,
    DateTime UpdatedAtUtc,
    DateTime? FinalizedAtUtc,
    bool IsDraft,
    string? CustomerName,
    string? Notes,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] DiscountKind DiscountKind,
    decimal DiscountValue,
    decimal TaxRatePercent,
    decimal SubTotal,
    decimal DiscountAmount,
    decimal TaxAmount,
    decimal GrandTotal,
    List<BillLineDto> Lines);

public record DailySummaryDto(DateOnly Date, int BillCount, decimal TotalSales, decimal TotalTax);
