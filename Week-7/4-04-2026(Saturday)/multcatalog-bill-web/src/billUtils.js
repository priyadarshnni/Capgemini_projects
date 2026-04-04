export const DRAFT_KEY = 'mcb-draft-bill-id'

export function lineTotal(unit, qty) {
  return Math.round(unit * qty * 100) / 100
}

export function computeTotals(lines, discountKind, discountValue, taxRatePercent) {
  const sub = lines.reduce((a, l) => a + lineTotal(l.unitPrice, l.quantity), 0)
  let disc = 0
  if (discountKind === 'Percent') disc = Math.round(sub * (discountValue / 100) * 100) / 100
  else if (discountKind === 'Fixed') disc = Math.min(Math.round(discountValue * 100) / 100, sub)
  const after = Math.max(0, sub - disc)
  const tax = Math.round(after * (taxRatePercent / 100) * 100) / 100
  return { subTotal: sub, discountAmount: disc, taxAmount: tax, grandTotal: after + tax }
}

export function mapKindToSource(k) {
  if (k === 'EntranceFee') return 'EntranceFee'
  if (k === 'Donation') return 'Donation'
  return 'SellingPrice'
}

export function billToLocal(b) {
  return b.lines.map((l, i) => ({
    key: `srv-${l.id}`,
    catalogItemId: l.catalogItemId,
    sourceKind: l.sourceKind,
    description: l.description,
    unitPrice: l.unitPrice,
    quantity: l.quantity,
    sortOrder: l.sortOrder || i,
  }))
}

export function toInputs(lines) {
  return lines.map((l, i) => ({
    catalogItemId: l.catalogItemId,
    sourceKind: l.sourceKind,
    description: l.description,
    unitPrice: l.unitPrice,
    quantity: l.quantity,
    sortOrder: l.sortOrder || i,
  }))
}
