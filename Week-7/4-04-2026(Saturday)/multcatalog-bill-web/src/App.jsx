import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createBillDraft,
  csvUrl,
  deleteDraft,
  fetchCatalog,
  finalizeBill,
  getBill,
  pdfUrl,
  searchBills,
  updateBill,
} from './api'
import {
  billToLocal,
  computeTotals,
  DRAFT_KEY,
  lineTotal,
  mapKindToSource,
  toInputs,
} from './billUtils'
import { CatalogAdmin } from './components/CatalogAdmin'
import { DailySummaryPanel } from './components/DailySummaryPanel'
import { InvoicePrint } from './components/InvoicePrint'

let bootstrapBillPromise = null

function loadOrCreateBootstrapBill() {
  if (!bootstrapBillPromise) {
    bootstrapBillPromise = (async () => {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const id = Number(raw)
        if (id) {
          try {
            const b = await getBill(id)
            if (b.isDraft) return b
            localStorage.removeItem(DRAFT_KEY)
          } catch {
            localStorage.removeItem(DRAFT_KEY)
          }
        }
      }
      const b = await createBillDraft()
      localStorage.setItem(DRAFT_KEY, String(b.id))
      return b
    })()
  }
  return bootstrapBillPromise
}

const TAB_DEFS = [
  ['billing', 'Billing'],
  ['catalogs', 'Catalogs'],
  ['history', 'Past bills'],
  ['summary', 'Daily summary'],
]

const CATALOG_KINDS = ['EntranceFee', 'Donation', 'SellingPrice']

export default function App() {
  const [tab, setTab] = useState('billing')
  const [catalogByKind, setCatalogByKind] = useState({
    EntranceFee: [],
    Donation: [],
    SellingPrice: [],
  })
  const [activeCatalog, setActiveCatalog] = useState('EntranceFee')
  const [bill, setBill] = useState(null)
  const [lines, setLines] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [notes, setNotes] = useState('')
  const [discountKind, setDiscountKind] = useState('None')
  const [discountValue, setDiscountValue] = useState(0)
  const [taxRatePercent, setTaxRatePercent] = useState(8)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [historyQuery, setHistoryQuery] = useState('')
  const [history, setHistory] = useState([])
  const [summaryDate, setSummaryDate] = useState(() => new Date().toISOString().slice(0, 10))

  const loadCatalogs = useCallback(async () => {
    const [e, d, s] = await Promise.all([
      fetchCatalog('EntranceFee', true),
      fetchCatalog('Donation', true),
      fetchCatalog('SellingPrice', true),
    ])
    setCatalogByKind({ EntranceFee: e, Donation: d, SellingPrice: s })
  }, [])

  useEffect(() => {
    loadCatalogs().catch((err) => setError(String(err)))
  }, [loadCatalogs])

  const previewTotals = useMemo(
    () =>
      computeTotals(
        lines.map((l) => ({ unitPrice: l.unitPrice, quantity: l.quantity })),
        discountKind,
        discountValue,
        taxRatePercent,
      ),
    [lines, discountKind, discountValue, taxRatePercent],
  )

  const applyBill = useCallback((b) => {
    setBill(b)
    setLines(billToLocal(b))
    setCustomerName(b.customerName ?? '')
    setNotes(b.notes ?? '')
    setDiscountKind(b.discountKind)
    setDiscountValue(b.discountValue)
    setTaxRatePercent(b.taxRatePercent)
  }, [])

  useEffect(() => {
    let cancelled = false
    void loadOrCreateBootstrapBill()
      .then((b) => {
        if (!cancelled) applyBill(b)
      })
      .catch((e) => {
        if (!cancelled) setError(String(e))
      })
    return () => {
      cancelled = true
    }
  }, [applyBill])

  const startFreshDraft = useCallback(async () => {
    setBusy(true)
    setError(null)
    try {
      const b = await createBillDraft()
      localStorage.setItem(DRAFT_KEY, String(b.id))
      applyBill(b)
    } catch (e) {
      setError(String(e))
    } finally {
      setBusy(false)
    }
  }, [applyBill])

  const persistDraft = async () => {
    if (!bill?.isDraft) return
    setBusy(true)
    setError(null)
    try {
      const body = {
        customerName: customerName || null,
        notes: notes || null,
        discountKind,
        discountValue,
        taxRatePercent,
        lines: toInputs(lines),
      }
      const updated = await updateBill(bill.id, body)
      applyBill(updated)
      localStorage.setItem(DRAFT_KEY, String(updated.id))
    } catch (e) {
      setError(String(e))
    } finally {
      setBusy(false)
    }
  }

  const addFromCatalog = (item) => {
    const price = item.isCustomAmountEntry ? 0 : item.defaultUnitPrice ?? 0
    setLines((prev) => [
      ...prev,
      {
        key: `new-${crypto.randomUUID()}`,
        catalogItemId: item.id,
        sourceKind: mapKindToSource(item.kind),
        description: item.name,
        unitPrice: price,
        quantity: 1,
        sortOrder: prev.length,
      },
    ])
  }

  const addCustomLine = () => {
    setLines((prev) => [
      ...prev,
      {
        key: `new-${crypto.randomUUID()}`,
        catalogItemId: null,
        sourceKind: 'Custom',
        description: 'Custom item',
        unitPrice: 0,
        quantity: 1,
        sortOrder: prev.length,
      },
    ])
  }

  const removeLine = (key) => setLines((prev) => prev.filter((l) => l.key !== key))

  const updateLine = (key, patch) =>
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, ...patch } : l)))

  const finalize = async () => {
    if (!bill?.isDraft) return
    setBusy(true)
    setError(null)
    try {
      await persistDraft()
      const id = bill.id
      const finalized = await finalizeBill(id)
      applyBill(finalized)
      localStorage.removeItem(DRAFT_KEY)
    } catch (e) {
      setError(String(e))
    } finally {
      setBusy(false)
    }
  }

  const refreshHistory = async () => {
    setBusy(true)
    setError(null)
    try {
      const list = await searchBills({ q: historyQuery || undefined })
      setHistory(list)
    } catch (e) {
      setError(String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="app">
      <header className="top no-print">
        <div>
          <h1>Multi-Catalog Bill Generator</h1>
          <p className="muted">Create React App (JavaScript) + ASP.NET Core + SQL Server</p>
        </div>
        <nav className="tabs">
          {TAB_DEFS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? 'tab active' : 'tab'}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {error && (
        <div className="banner error no-print" role="alert">
          {error}
        </div>
      )}

      {tab === 'billing' && (
        <main className="grid no-print">
          <section className="panel">
            <h2>Catalog picker</h2>
            <div className="catalog-tabs">
              {CATALOG_KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  className={activeCatalog === k ? 'mini active' : 'mini'}
                  onClick={() => setActiveCatalog(k)}
                >
                  {k === 'EntranceFee' ? 'Entrance' : k === 'Donation' ? 'Donation' : 'Selling'}
                </button>
              ))}
            </div>
            <div className="chip-grid">
              {catalogByKind[activeCatalog]
                .filter((item) => item.active)
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="chip"
                    onClick={() => addFromCatalog(item)}
                    title={item.description ?? item.name}
                  >
                    <span className="chip-title">{item.name}</span>
                    <span className="chip-meta">
                      {item.isCustomAmountEntry ? 'Custom $' : `$${(item.defaultUnitPrice ?? 0).toFixed(2)}`}
                    </span>
                  </button>
                ))}
            </div>
            <button type="button" className="secondary full" onClick={addCustomLine}>
              + Custom line (not in catalog)
            </button>
          </section>

          <section className="panel grow">
            <div className="row spread">
              <h2>Current bill</h2>
              <div className="row">
                <span className={`pill ${bill?.isDraft ? 'draft' : ''}`}>
                  {bill?.isDraft ? 'Draft' : 'Finalized'}
                </span>
                {bill?.invoiceNumber && <span className="pill">{bill.invoiceNumber}</span>}
              </div>
            </div>

            <div className="form-grid">
              <label>
                Customer
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  disabled={!bill?.isDraft}
                />
              </label>
              <label>
                Notes
                <input value={notes} onChange={(e) => setNotes(e.target.value)} disabled={!bill?.isDraft} />
              </label>
            </div>

            <div className="table-wrap">
              <table className="lines">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Line</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {lines.length === 0 && (
                    <tr>
                      <td colSpan={5} className="muted">
                        Add items from a catalog or create a custom line.
                      </td>
                    </tr>
                  )}
                  {lines.map((l) => (
                    <tr key={l.key}>
                      <td>
                        <input
                          value={l.description}
                          onChange={(e) => updateLine(l.key, { description: e.target.value })}
                          disabled={!bill?.isDraft}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={l.unitPrice}
                          onChange={(e) => updateLine(l.key, { unitPrice: Number(e.target.value) })}
                          disabled={!bill?.isDraft}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          min={0}
                          value={l.quantity}
                          onChange={(e) => updateLine(l.key, { quantity: Number(e.target.value) })}
                          disabled={!bill?.isDraft}
                        />
                      </td>
                      <td>{lineTotal(l.unitPrice, l.quantity).toFixed(2)}</td>
                      <td>
                        {bill?.isDraft && (
                          <button type="button" className="link" onClick={() => removeLine(l.key)}>
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="form-grid discounts">
              <label>
                Discount
                <select
                  value={discountKind}
                  onChange={(e) => setDiscountKind(e.target.value)}
                  disabled={!bill?.isDraft}
                >
                  <option value="None">None</option>
                  <option value="Percent">Percent</option>
                  <option value="Fixed">Fixed amount</option>
                </select>
              </label>
              <label>
                Discount value
                <input
                  type="number"
                  step="0.01"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  disabled={!bill?.isDraft || discountKind === 'None'}
                />
              </label>
              <label>
                Tax %
                <input
                  type="number"
                  step="0.01"
                  value={taxRatePercent}
                  onChange={(e) => setTaxRatePercent(Number(e.target.value))}
                  disabled={!bill?.isDraft}
                />
              </label>
            </div>

            <div className="totals">
              <div>
                <span>Subtotal</span>
                <strong>{previewTotals.subTotal.toFixed(2)}</strong>
              </div>
              <div>
                <span>Discount</span>
                <strong>-{previewTotals.discountAmount.toFixed(2)}</strong>
              </div>
              <div>
                <span>Tax</span>
                <strong>{previewTotals.taxAmount.toFixed(2)}</strong>
              </div>
              <div className="grand">
                <span>Total</span>
                <strong>{previewTotals.grandTotal.toFixed(2)}</strong>
              </div>
            </div>

            <div className="actions">
              <button type="button" disabled={busy || !bill?.isDraft} onClick={() => void persistDraft()}>
                Save draft
              </button>
              <button type="button" className="secondary" disabled={busy} onClick={() => void startFreshDraft()}>
                New draft
              </button>
              <button
                type="button"
                className="primary"
                disabled={busy || !bill?.isDraft || lines.length === 0}
                onClick={() => void finalize()}
              >
                Finalize bill
              </button>
              {bill && (
                <>
                  <a className="button secondary" href={pdfUrl(bill.id)} target="_blank" rel="noreferrer">
                    PDF
                  </a>
                  <a className="button secondary" href={csvUrl(bill.id)} target="_blank" rel="noreferrer">
                    CSV
                  </a>
                  <button type="button" className="secondary" onClick={() => window.print()}>
                    Print
                  </button>
                </>
              )}
            </div>
          </section>
        </main>
      )}

      {tab === 'catalogs' && (
        <CatalogAdmin
          catalogByKind={catalogByKind}
          onReload={loadCatalogs}
          onError={setError}
          busy={busy}
          setBusy={setBusy}
        />
      )}

      {tab === 'history' && (
        <section className="panel no-print history">
          <h2>Past bills</h2>
          <div className="row">
            <input
              placeholder="Search invoice, customer, or id"
              value={historyQuery}
              onChange={(e) => setHistoryQuery(e.target.value)}
            />
            <button type="button" onClick={() => void refreshHistory()}>
              Search
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setHistoryQuery('')
                void (async () => {
                  setBusy(true)
                  try {
                    setHistory(await searchBills({}))
                  } finally {
                    setBusy(false)
                  }
                })()
              }}
            >
              Show all
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Updated (UTC)</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id}>
                    <td>{h.id}</td>
                    <td>{h.invoiceNumber ?? '—'}</td>
                    <td>{h.customerName ?? '—'}</td>
                    <td>{h.isDraft ? 'Draft' : 'Final'}</td>
                    <td>{h.grandTotal.toFixed(2)}</td>
                    <td>{new Date(h.updatedAtUtc).toLocaleString()}</td>
                    <td className="row-actions">
                      <button
                        type="button"
                        className="link"
                        onClick={() =>
                          void (async () => {
                            setBusy(true)
                            try {
                              const b = await getBill(h.id)
                              applyBill(b)
                              setTab('billing')
                            } finally {
                              setBusy(false)
                            }
                          })()
                        }
                      >
                        Open
                      </button>
                      {h.isDraft && (
                        <button
                          type="button"
                          className="link danger"
                          onClick={() =>
                            void (async () => {
                              if (!window.confirm('Delete this draft?')) return
                              setBusy(true)
                              try {
                                await deleteDraft(h.id)
                                if (bill?.id === h.id) await startFreshDraft()
                                await refreshHistory()
                              } finally {
                                setBusy(false)
                              }
                            })()
                          }
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === 'summary' && (
        <DailySummaryPanel
          summaryDate={summaryDate}
          setSummaryDate={setSummaryDate}
          setError={setError}
          setBusy={setBusy}
        />
      )}

      {bill && (
        <InvoicePrint
          bill={bill}
          lines={lines}
          customerName={customerName}
          notes={notes}
          previewTotals={previewTotals}
          taxRatePercent={taxRatePercent}
        />
      )}
    </div>
  )
}
