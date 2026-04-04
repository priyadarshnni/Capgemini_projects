namespace MultiCatalogBill.Api.Models;

public class Bill
{
    public int Id { get; set; }
    public string? InvoiceNumber { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime UpdatedAtUtc { get; set; }
    public DateTime? FinalizedAtUtc { get; set; }
    public bool IsDraft { get; set; } = true;
    public string? CustomerName { get; set; }
    public string? Notes { get; set; }
    public DiscountKind DiscountKind { get; set; }
    public decimal DiscountValue { get; set; }
    public decimal TaxRatePercent { get; set; } = 8m;
    public decimal SubTotal { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal GrandTotal { get; set; }

    public ICollection<BillLine> Lines { get; set; } = new List<BillLine>();
}
