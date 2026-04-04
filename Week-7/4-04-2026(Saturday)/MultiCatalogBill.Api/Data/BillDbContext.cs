// =============================================================================
// BillDbContext — EF Core database mapping
// =============================================================================
// Maps C# entities to SQL Server tables: column types, lengths, indexes, and
// relationships. Migrations are generated from changes to this model.
// =============================================================================

using Microsoft.EntityFrameworkCore;
using MultiCatalogBill.Api.Models;

namespace MultiCatalogBill.Api.Data;

public class BillDbContext(DbContextOptions<BillDbContext> options) : DbContext(options)
{
    public DbSet<CatalogItem> CatalogItems => Set<CatalogItem>();
    public DbSet<Bill> Bills => Set<Bill>();
    public DbSet<BillLine> BillLines => Set<BillLine>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // --- Topic: CatalogItem ------------------------------------------------
        // Sellable / ticket / donation template rows. Index supports filtering
        // by Kind + Active in the API list endpoints.
        modelBuilder.Entity<CatalogItem>(e =>
        {
            e.Property(x => x.Name).HasMaxLength(200);
            e.Property(x => x.Description).HasMaxLength(500);
            e.Property(x => x.DefaultUnitPrice).HasPrecision(18, 4);
            e.HasIndex(x => new { x.Kind, x.Active });
        });

        // --- Topic: Bill -------------------------------------------------------
        // Header row for an invoice: draft vs finalized, stored totals, unique
        // invoice number when finalized (filtered unique index allows many NULLs).
        modelBuilder.Entity<Bill>(e =>
        {
            e.Property(x => x.InvoiceNumber).HasMaxLength(40);
            e.HasIndex(x => x.InvoiceNumber).IsUnique().HasFilter("[InvoiceNumber] IS NOT NULL");
            e.Property(x => x.CustomerName).HasMaxLength(200);
            e.Property(x => x.Notes).HasMaxLength(2000);
            e.Property(x => x.DiscountValue).HasPrecision(18, 4);
            e.Property(x => x.TaxRatePercent).HasPrecision(18, 4);
            e.Property(x => x.SubTotal).HasPrecision(18, 4);
            e.Property(x => x.DiscountAmount).HasPrecision(18, 4);
            e.Property(x => x.TaxAmount).HasPrecision(18, 4);
            e.Property(x => x.GrandTotal).HasPrecision(18, 4);
        });

        // --- Topic: BillLine ---------------------------------------------------
        // Line items belonging to one bill. Cascade: deleting a bill deletes
        // its lines. CatalogItemId optional — custom lines have no catalog link.
        modelBuilder.Entity<BillLine>(e =>
        {
            e.Property(x => x.Description).HasMaxLength(300);
            e.Property(x => x.UnitPrice).HasPrecision(18, 4);
            e.Property(x => x.Quantity).HasPrecision(18, 4);
            e.HasOne(x => x.Bill)
                .WithMany(b => b.Lines)
                .HasForeignKey(x => x.BillId)
                .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(x => x.CatalogItem)
                .WithMany()
                .HasForeignKey(x => x.CatalogItemId)
                .OnDelete(DeleteBehavior.SetNull);
        });
    }
}
