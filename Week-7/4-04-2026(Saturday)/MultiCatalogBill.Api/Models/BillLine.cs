// =============================================================================
// BillLine — one purchased row on an invoice
// =============================================================================
// Topic: CatalogItemId — optional link back to catalog; null = fully custom line.
// Topic: SourceKind — EntranceFee | Donation | SellingPrice | Custom (snapshot
//        for reporting; not the same as CatalogKind when line is Custom).
// =============================================================================

namespace MultiCatalogBill.Api.Models;

public class BillLine
{
    public int Id { get; set; }
    public int BillId { get; set; }
    public Bill Bill { get; set; } = null!;
    public int? CatalogItemId { get; set; }
    public CatalogItem? CatalogItem { get; set; }
    public LineSourceKind SourceKind { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public decimal Quantity { get; set; } = 1;
    public int SortOrder { get; set; }
}
