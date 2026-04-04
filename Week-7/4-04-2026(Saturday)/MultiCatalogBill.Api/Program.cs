// =============================================================================
// APPLICATION ENTRY (Program.cs)
// =============================================================================
// This file wires the HTTP pipeline: database, JSON, CORS, migrations, and
// controllers. There is no separate Startup class (.NET 6+ minimal hosting).
// =============================================================================

using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using MultiCatalogBill.Api.Data;
using QuestPDF.Infrastructure;

// --- Topic: QuestPDF license --------------------------------------------------
// QuestPDF requires a license flag before any PDF is generated. Community is
// correct for non-production / learning use; set once at process start.
QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);

// --- Topic: Entity Framework Core + SQL Server -------------------------------
// BillDbContext is registered as scoped (one per HTTP request). Connection
// string lives in appsettings.json under ConnectionStrings:DefaultConnection.
builder.Services.AddDbContext<BillDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- Topic: Web API + JSON for the React client ------------------------------
// JsonStringEnumConverter sends enums as "EntranceFee" instead of 0 so the
// JavaScript app can read stable string values.
builder.Services.AddControllers().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// --- Topic: CORS (browser security) ------------------------------------------
// The React dev server runs on a different port than the API. Browsers block
// cross-origin fetch unless the API explicitly allows the UI origin here.
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevSpa", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:5173",
                "http://127.0.0.1:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// --- Topic: Database migrations + seed data ------------------------------------
// On startup we apply pending EF migrations (create/update tables) and insert
// default catalog rows once if the CatalogItems table is empty (see DbSeeder).
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<BillDbContext>();
    await db.Database.MigrateAsync();
    await DbSeeder.SeedAsync(db);
}

app.UseCors("DevSpa");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
