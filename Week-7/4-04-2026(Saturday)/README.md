# Multi-Catalog Bill Generator

Full-stack demo: **ASP.NET Core Web API** + **SQL Server** + **Create React App (JavaScript)**. This README explains **what each part does** and how they connect.

---

## 1. What the system does (business view)

- **Three product catalogs**: entrance tickets, donations (presets + custom amount), sellable items with optional variable price.
- **Bills**: build a bill from catalog lines or fully custom lines; edit quantities and prices; apply **percentage or fixed discount**; compute **tax** on the amount after discount; **finalize** to get a unique invoice number.
- **Persistence**: drafts and finalized bills live in SQL Server; the UI can resume the last draft via `localStorage`.
- **Exports**: **PDF** (QuestPDF) and **CSV** per bill; **daily sales summary** (finalized bills only, UTC calendar day).

---

## 2. Repository layout

| Path | Role |
|------|------|
| `MultiCatalogBill.Api/` | REST API, EF Core, PDF generation, migrations |
| `multcatalog-bill-web/` | React UI (`npm start`, default port **3000**) |
| `MultiCatalogBill.slnx` | Solution entry for the API project |

---

## 3. How to run locally

1. **SQL Server LocalDB** (or change the connection string in `MultiCatalogBill.Api/appsettings.json`).
2. **API** (HTTP profile — matches the React dev default for PDF/CSV links):

   ```bash
   cd MultiCatalogBill.Api
   dotnet run --launch-profile http
   ```

   Listens on **http://localhost:5267**. On startup: **migrations** apply and **seed data** runs once (see `Data/DbSeeder.cs`).

3. **React app**:

   ```bash
   cd multcatalog-bill-web
   npm install
   npm start
   ```

   Opens **http://localhost:3000**. JSON API calls use the **CRA `proxy`** to `5267`. **PDF/CSV** links call **`http://localhost:5267` directly** so binary files are not broken by the dev proxy (see `src/api.js`).

Optional: set `REACT_APP_API_URL` (e.g. `https://localhost:7150`) if the API runs on another origin.

---

## 4. Backend topics (MultiCatalogBill.Api)

### 4.1 `Program.cs` — application startup

- Registers **EF Core** with SQL Server using `ConnectionStrings:DefaultConnection`.
- **QuestPDF** community license (required before generating any PDF).
- **JSON**: enums serialize as strings for the React client (`JsonStringEnumConverter`).
- **CORS** `DevSpa`: allows the React dev servers (`localhost:3000`, etc.) to call the API from the browser.
- **Migrate + seed** on startup inside a scoped `BillDbContext` so the database schema and demo catalog exist.

### 4.2 `Data/BillDbContext.cs` — database mapping

- Maps **entities** to tables: `CatalogItem`, `Bill`, `BillLine`.
- Configures **precision** for money fields, **string lengths**, **indexes** (e.g. unique invoice number when not null).
- **Relationships**: a bill has many lines (`Cascade` delete); optional link from line to catalog item (`SetNull` on delete).

### 4.3 `Data/DbSeeder.cs` — initial catalog data

- Runs only if `CatalogItems` is empty.
- Inserts sample **entrance**, **donation**, and **selling** rows so the UI has chips to click immediately.

### 4.4 `Models/` — domain types

- **`CatalogKind`**: which catalog a row belongs to (EntranceFee, Donation, SellingPrice).
- **`CatalogItem`**: name, default price, flags like `AllowsVariablePrice`, `IsCustomAmountEntry`, `Active`.
- **`Bill`**: draft vs finalized, invoice number, customer/notes, discount/tax fields, **stored totals** (recalculated whenever lines change).
- **`BillLine`**: description, unit price, quantity, optional `CatalogItemId`, `SourceKind` (including **Custom** for non-catalog lines).
- **`DiscountKind`**: None, Percent, Fixed.

### 4.5 `Services/BillMath.cs` — money calculations

- **`LineTotal`**: `unitPrice × quantity`, rounded to 2 decimals.
- **`Totals`**: sum lines → **subtotal** → subtract **discount** (percent of subtotal or fixed cap) → **tax** on the remainder → **grand total**. Same rules are mirrored in the React `billUtils.js` for live preview.

### 4.6 `Services/BillPdfBuilder.cs` — PDF export

- Uses **QuestPDF** to layout a one-page invoice: header, optional customer, table of lines (or a placeholder row if empty), subtotal/discount/tax/total, notes, footer.
- Called from `BillsController.ExportPdf`.

### 4.7 `Controllers/CatalogItemsController.cs` — catalog CRUD

- **GET** list (filter by `kind`, optional `includeInactive` for the admin UI).
- **POST/PUT** create or update an item.
- **DELETE** soft-deactivates (`Active = false`) so old bills still make sense historically.

### 4.8 `Controllers/BillsController.cs` — bills and exports

| Endpoint | What happens |
|----------|----------------|
| `GET /api/Bills` | Search/filter bills (text, date range, draft-only). |
| `POST /api/Bills` | Creates an **empty draft** bill. |
| `GET /api/Bills/{id}` | Full bill + lines (read-only shape for JSON). |
| `PUT /api/Bills/{id}` | **Replaces** line items for a **draft**; validates catalog references; reapplies **BillMath**; saves totals. |
| `POST .../finalize` | Requires at least one line; assigns **`INV-yyyyMMdd-{id}`**; sets `IsDraft = false` and `FinalizedAtUtc`. |
| `DELETE /api/Bills/{id}` | Only **drafts** can be removed. |
| `GET .../export/pdf` | Builds PDF bytes; filename sanitized. |
| `GET .../export/csv` | UTF-8 CSV of line items. |

### 4.9 `Controllers/ReportsController.cs` — reporting

- **`GET /api/Reports/daily-summary?date=`** (optional `yyyy-MM-dd`, default today **UTC**): aggregates **finalized** bills whose `FinalizedAtUtc` falls on that UTC day → count, sum of `GrandTotal`, sum of `TaxAmount`.

### 4.10 `Contracts/` + `Mapping/` — API DTOs

- Request/response shapes for JSON; **`DtoMapping`** extension methods convert entities → DTOs for responses.

---

## 5. Frontend topics (multcatalog-bill-web)

### 5.1 `src/api.js` — talking to the backend

- **`base()`**: empty in dev → `fetch('/api/...')` goes through CRA **proxy** to the API.
- **`fileDownloadBase()`**: in **development**, PDF/CSV use **`http://localhost:5267`** so the browser downloads real files (see section 3).
- Each `export async function` wraps a REST call and parses JSON (or throws on error).

### 5.2 `src/billUtils.js` — same math as the server (preview)

- **`computeTotals`**, **`lineTotal`**: keep the on-screen totals aligned with server rules before you hit **Save draft**.
- **`billToLocal` / `toInputs`**: map API line DTOs ↔ editable row state (with local `key` for React lists).
- **`DRAFT_KEY`**: `localStorage` key for “which draft id to reopen”.

### 5.3 `src/App.jsx` — main UI

- **Tabs**: Billing (builder), Catalogs (admin), Past bills, Daily summary.
- **Bootstrap promise**: on first load, tries to load the bill id from `localStorage`; if missing or invalid, **creates a new draft** (shared promise avoids double-create under React Strict Mode).
- **Billing**: chips load from `fetchCatalog(..., true)`; only **active** items show as chips; **Save draft** sends `PUT` with full line list; **Finalize** calls finalize endpoint then clears draft key.
- **Print**: `@media print` in `index.css` hides chrome and prints the invoice card.

### 5.4 `src/components/`

- **`CatalogAdmin.jsx`**: CRUD UI for catalog rows per kind.
- **`DailySummaryPanel.jsx`**: picks a date, calls daily summary API.
- **`InvoicePrint.jsx`**: printable invoice block (also used for print layout).

---

## 6. Configuration reference

| Setting | Where | Purpose |
|---------|--------|---------|
| `ConnectionStrings:DefaultConnection` | `appsettings.json` | SQL Server |
| `proxy` | `multcatalog-bill-web/package.json` | Dev proxy target for `/api` |
| `REACT_APP_API_URL` | `.env` in React project | Override API host for all calls and downloads |

---

## 7. EF Core migrations

Created under `MultiCatalogBill.Api/Migrations/`. Apply manually if you disable auto-migrate on startup:

```bash
cd MultiCatalogBill.Api
dotnet ef database update
```

---

## 8. Where to read code next

- **End-to-end bill save**: `App.jsx` → `api.updateBill` → `BillsController.Update` → `BillMath.Totals`.
- **Invoice PDF**: `BillsController.ExportPdf` → `BillPdfBuilder.Build`.
- **Database shape**: `BillDbContext.OnModelCreating` + `Models/*.cs`.

### 8.1 Files with inline “topic” documentation

| Area | Files (comments at top or above each endpoint/block) |
|------|--------------------------------------------------------|
| Startup | `MultiCatalogBill.Api/Program.cs` |
| EF mapping | `Data/BillDbContext.cs`, `Data/DbSeeder.cs` |
| REST | `Controllers/BillsController.cs`, `CatalogItemsController.cs`, `ReportsController.cs` |
| Math / PDF | `Services/BillMath.cs`, `Services/BillPdfBuilder.cs` |
| DTOs | `Contracts/ApiDtos.cs`, `Mapping/DtoMapping.cs` |
| Entities | `Models/Bill.cs`, `BillLine.cs`, `CatalogItem.cs`, `CatalogKind.cs`, `DiscountKind.cs`, `LineSourceKind.cs` |
| React | `multcatalog-bill-web/src/api.js`, `billUtils.js`, `App.jsx`, `index.js`, `components/*.jsx` |

Each of those files also has **inline section comments** at the top or above major blocks explaining the same ideas in context.
