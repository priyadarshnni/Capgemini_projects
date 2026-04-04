// Which catalog a CatalogItem belongs to (drives UI tabs and filtering).

namespace MultiCatalogBill.Api.Models;

public enum CatalogKind
{
    EntranceFee = 0,
    Donation = 1,
    SellingPrice = 2
}
