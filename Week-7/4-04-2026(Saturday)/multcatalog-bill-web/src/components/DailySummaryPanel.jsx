import { useEffect, useState } from 'react'
import { dailySummary } from '../api'

export function DailySummaryPanel({ summaryDate, setSummaryDate, setError, setBusy }) {
  const [data, setData] = useState(null)

  const load = async () => {
    setBusy(true)
    setError(null)
    try {
      const d = await dailySummary(summaryDate)
      setData({ billCount: d.billCount, totalSales: d.totalSales, totalTax: d.totalTax })
    } catch (e) {
      setError(String(e))
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryDate])

  return (
    <section className="panel no-print summary">
      <h2>Daily sales summary (UTC day)</h2>
      <label>
        Date
        <input type="date" value={summaryDate} onChange={(e) => setSummaryDate(e.target.value)} />
      </label>
      <button type="button" onClick={() => void load()}>
        Refresh
      </button>
      {data && (
        <div className="summary-cards">
          <div className="stat">
            <span>Bills</span>
            <strong>{data.billCount}</strong>
          </div>
          <div className="stat">
            <span>Sales</span>
            <strong>{data.totalSales.toFixed(2)}</strong>
          </div>
          <div className="stat">
            <span>Tax collected</span>
            <strong>{data.totalTax.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </section>
  )
}
