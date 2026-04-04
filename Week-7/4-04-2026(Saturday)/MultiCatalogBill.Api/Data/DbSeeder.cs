using Microsoft.EntityFrameworkCore;
using MultiCatalogBill.Api.Models;

namespace MultiCatalogBill.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(BillDbContext db, CancellationToken ct = default)
    {
        if (await db.CatalogItems.AnyAsync(ct))
            return;

        var items = new List<CatalogItem>
        {
            new() { Kind = CatalogKind.EntranceFee, Name = "Adult", DefaultUnitPrice = 15m, SortOrder = 1 },
            new() { Kind = CatalogKind.EntranceFee, Name = "Child", DefaultUnitPrice = 8m, SortOrder = 2 },
            new() { Kind = CatalogKind.EntranceFee, Name = "Senior", DefaultUnitPrice = 10m, SortOrder = 3 },
            new() { Kind = CatalogKind.EntranceFee, Name = "VIP", DefaultUnitPrice = 50m, SortOrder = 4 },
            new() { Kind = CatalogKind.Donation, Name = "Donation — $5", DefaultUnitPrice = 5m, SortOrder = 10 },
            new() { Kind = CatalogKind.Donation, Name = "Donation — $10", DefaultUnitPrice = 10m, SortOrder = 11 },
            new() { Kind = CatalogKind.Donation, Name = "Donation — $25", DefaultUnitPrice = 25m, SortOrder = 12 },
            new() { Kind = CatalogKind.Donation, Name = "Donation — $100", DefaultUnitPrice = 100m, SortOrder = 13 },
            new()
            {
                Kind = CatalogKind.Donation,
                Name = "Custom donation",
                Description = "Enter any amount at billing time",
                DefaultUnitPrice = 0m,
                IsCustomAmountEntry = true,
                SortOrder = 14
            },
            new()
            {
                Kind = CatalogKind.SellingPrice,
                Name = "T-shirt",
                DefaultUnitPrice = 22m,
                AllowsVariablePrice = true,
                SortOrder = 20
            },
            new()
            {
                Kind = CatalogKind.SellingPrice,
                Name = "Coffee",
                DefaultUnitPrice = 4.5m,
                AllowsVariablePrice = true,
                SortOrder = 21
            },
            new()
            {
                Kind = CatalogKind.SellingPrice,
                Name = "Guided tour (per person)",
                DefaultUnitPrice = 35m,
                AllowsVariablePrice = true,
                SortOrder = 22
            }
        };

        db.CatalogItems.AddRange(items);
        await db.SaveChangesAsync(ct);
    }
}
