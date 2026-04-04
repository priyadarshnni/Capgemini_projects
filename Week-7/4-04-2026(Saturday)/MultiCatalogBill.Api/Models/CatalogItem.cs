// =============================================================================
// CatalogItem — reusable product / ticket / donation template
// =============================================================================
// Topic: Kind — groups rows for the UI tabs (EntranceFee, Donation, SellingPrice).
// Topic: AllowsVariablePrice — UI may edit unit price when adding to a bill.
// Topic: IsCustomAmountEntry — e.g. “custom donation”; default price is 0 until
//        the cashier types an amount.
// Topic: Active — false = soft-deleted; still in DB for old bill lines.
// =============================================================================

namespace MultiCatalogBill.Api.Models;

public class CatalogItem
{
    public int Id { get; set; }
    public CatalogKind Kind { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal? DefaultUnitPrice { get; set; }
    public bool AllowsVariablePrice { get; set; }
    public bool IsCustomAmountEntry { get; set; }
    public bool Active { get; set; } = true;
    public int SortOrder { get; set; }
}
