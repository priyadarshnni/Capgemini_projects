import { lineTotal } from '../billUtils'

export function InvoicePrint({ bill, lines, customerName, notes, previewTotals, taxRatePercent }) {
  return (
    <section className="invoice-print">
      <div className="invoice-card">
        <header>
          <div>
            <h2>Invoice</h2>
            <p className="muted">
              {bill.invoiceNumber ?? `Draft #${bill.id}`} · {new Date(bill.updatedAtUtc).toLocaleString()}
            </p>
          </div>
          <div className="brand">MCB</div>
        </header>
        {customerName && <p>Customer: {customerName}</p>}
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Line</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.key}>
                <td>{l.description}</td>
                <td>{l.unitPrice.toFixed(2)}</td>
                <td>{l.quantity}</td>
                <td>{lineTotal(l.unitPrice, l.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="invoice-totals">
          <div>
            <span>Subtotal</span>
            <span>{previewTotals.subTotal.toFixed(2)}</span>
          </div>
          <div>
            <span>Discount</span>
            <span>-{previewTotals.discountAmount.toFixed(2)}</span>
          </div>
          <div>
            <span>Tax ({taxRatePercent}%)</span>
            <span>{previewTotals.taxAmount.toFixed(2)}</span>
          </div>
          <div className="grand">
            <span>Total</span>
            <span>{previewTotals.grandTotal.toFixed(2)}</span>
          </div>
        </div>
        {notes && <p className="notes">Notes: {notes}</p>}
      </div>
    </section>
  )
}
