// Stored on each BillLine: where the line came from (catalog type or fully custom).

namespace MultiCatalogBill.Api.Models;

public enum LineSourceKind
{
    EntranceFee = 0,
    Donation = 1,
    SellingPrice = 2,
    Custom = 3
}
