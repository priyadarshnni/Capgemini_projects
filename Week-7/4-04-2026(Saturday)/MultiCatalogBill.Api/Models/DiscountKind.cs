// How DiscountValue is applied to the bill subtotal (see BillMath.Totals).

namespace MultiCatalogBill.Api.Models;

public enum DiscountKind
{
    None = 0,
    Percent = 1,
    Fixed = 2
}
