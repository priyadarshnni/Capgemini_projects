using MultiCatalogBill.Api.Models;

namespace MultiCatalogBill.Api.Services;

public static class BillMath
{
    public static decimal LineTotal(decimal unitPrice, decimal quantity) =>
        Math.Round(unitPrice * quantity, 2, MidpointRounding.AwayFromZero);

    public static (decimal SubTotal, decimal DiscountAmount, decimal TaxAmount, decimal GrandTotal) Totals(
        IEnumerable<(decimal UnitPrice, decimal Quantity)> lines,
        DiscountKind discountKind,
        decimal discountValue,
        decimal taxRatePercent)
    {
        var sub = lines.Sum(l => LineTotal(l.UnitPrice, l.Quantity));
        var disc = discountKind switch
        {
            DiscountKind.Percent => Math.Round(sub * (discountValue / 100m), 2, MidpointRounding.AwayFromZero),
            DiscountKind.Fixed => Math.Min(Math.Round(discountValue, 2, MidpointRounding.AwayFromZero), sub),
            _ => 0m
        };
        var after = Math.Max(0, sub - disc);
        var tax = Math.Round(after * (taxRatePercent / 100m), 2, MidpointRounding.AwayFromZero);
        var grand = after + tax;
        return (sub, disc, tax, grand);
    }
}
