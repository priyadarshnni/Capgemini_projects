using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using MultiCatalogBill.Api.Models;

namespace MultiCatalogBill.Api.Services;

public static class BillPdfBuilder
{
    public static byte[] Build(Bill bill)
    {
        var lines = bill.Lines.OrderBy(l => l.SortOrder).ThenBy(l => l.Id).ToList();

        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(40);
                page.DefaultTextStyle(x => x.FontSize(10));
                page.Header()
                    .Row(row =>
                    {
                        row.RelativeItem().Column(c =>
                        {
                            c.Item().Text("Multi-Catalog Bill").SemiBold().FontSize(18);
                            c.Item().Text($"Issued (UTC): {(bill.FinalizedAtUtc ?? bill.UpdatedAtUtc):yyyy-MM-dd HH:mm}");
                        });
                        row.ConstantItem(120).AlignRight().Text(bill.InvoiceNumber ?? $"DRAFT-{bill.Id}").SemiBold();
                    });

                page.Content().Column(col =>
                {
                    if (!string.IsNullOrWhiteSpace(bill.CustomerName))
                        col.Item().Text($"Customer: {bill.CustomerName}");

                    col.Item().PaddingTop(12).Table(table =>
                    {
                        table.ColumnsDefinition(c =>
                        {
                            c.RelativeColumn(3);
                            c.RelativeColumn(1);
                            c.RelativeColumn(1);
                            c.RelativeColumn(1);
                        });

                        table.Header(header =>
                        {
                            header.Cell().Element(CellHeader).Text("Item");
                            header.Cell().Element(CellHeader).AlignRight().Text("Price");
                            header.Cell().Element(CellHeader).AlignRight().Text("Qty");
                            header.Cell().Element(CellHeader).AlignRight().Text("Line");
                        });

                        if (lines.Count == 0)
                        {
                            table.Cell().Text("(No line items)");
                            table.Cell().Text("—");
                            table.Cell().Text("—");
                            table.Cell().Text("—");
                        }
                        else
                        {
                            foreach (var line in lines)
                            {
                                var lt = BillMath.LineTotal(line.UnitPrice, line.Quantity);
                                table.Cell().Text(line.Description);
                                table.Cell().AlignRight().Text($"{line.UnitPrice:F2}");
                                table.Cell().AlignRight().Text($"{line.Quantity}");
                                table.Cell().AlignRight().Text($"{lt:F2}");
                            }
                        }

                        static IContainer CellHeader(IContainer c) =>
                            c.DefaultTextStyle(x => x.SemiBold()).PaddingBottom(4).BorderBottom(1).BorderColor(Colors.Grey.Lighten1);
                    });

                    col.Item().PaddingTop(16).AlignRight().Column(t =>
                    {
                        t.Item().Row(r =>
                        {
                            r.ConstantItem(100).Text("Subtotal");
                            r.ConstantItem(80).AlignRight().Text($"{bill.SubTotal:F2}");
                        });
                        t.Item().Row(r =>
                        {
                            r.ConstantItem(100).Text("Discount");
                            r.ConstantItem(80).AlignRight().Text($"-{bill.DiscountAmount:F2}");
                        });
                        t.Item().Row(r =>
                        {
                            r.ConstantItem(100).Text($"Tax ({bill.TaxRatePercent:F2}%)");
                            r.ConstantItem(80).AlignRight().Text($"{bill.TaxAmount:F2}");
                        });
                        t.Item().PaddingTop(4).Row(r =>
                        {
                            r.ConstantItem(100).Text("Total").SemiBold();
                            r.ConstantItem(80).AlignRight().Text($"{bill.GrandTotal:F2}").SemiBold();
                        });
                    });

                    if (!string.IsNullOrWhiteSpace(bill.Notes))
                        col.Item().PaddingTop(20).Text(bill.Notes);
                });

                page.Footer().AlignCenter().Text("Thank you").FontSize(9).FontColor(Colors.Grey.Darken2);
            });
        }).GeneratePdf();
    }
}
