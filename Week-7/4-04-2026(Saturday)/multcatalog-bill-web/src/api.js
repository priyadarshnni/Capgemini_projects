const jsonHeaders = { 'Content-Type': 'application/json' }

async function handle(res) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  if (res.status === 204) return undefined
  return res.json()
}

/** JSON/API calls: relative `/api` in dev (CRA proxy) unless REACT_APP_API_URL is set */
const base = () => (process.env.REACT_APP_API_URL ?? '').replace(/\/$/, '')

/**
 * PDF/CSV must hit the API directly in dev — CRA's webpack proxy often corrupts binary responses
 * or serves index.html instead. Matches MultiCatalogBill.Api http profile (port 5267).
 */
const fileDownloadBase = () => {
  const env = (process.env.REACT_APP_API_URL ?? '').replace(/\/$/, '')
  if (env) return env
  if (process.env.NODE_ENV === 'development') return 'http://localhost:5267'
  return ''
}

export async function fetchCatalog(kind, includeInactive = false) {
  const sp = new URLSearchParams()
  if (kind) sp.set('kind', kind)
  if (includeInactive) sp.set('includeInactive', 'true')
  const q = sp.toString()
  const res = await fetch(`${base()}/api/CatalogItems${q ? `?${q}` : ''}`)
  return handle(res)
}

export async function createBillDraft() {
  const res = await fetch(`${base()}/api/Bills`, { method: 'POST' })
  return handle(res)
}

export async function getBill(id) {
  const res = await fetch(`${base()}/api/Bills/${id}`)
  return handle(res)
}

export async function updateBill(id, body) {
  const res = await fetch(`${base()}/api/Bills/${id}`, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(body),
  })
  return handle(res)
}

export async function finalizeBill(id) {
  const res = await fetch(`${base()}/api/Bills/${id}/finalize`, { method: 'POST' })
  return handle(res)
}

export async function deleteDraft(id) {
  const res = await fetch(`${base()}/api/Bills/${id}`, { method: 'DELETE' })
  await handle(res)
}

export async function searchBills(params) {
  const sp = new URLSearchParams()
  if (params.q) sp.set('q', params.q)
  if (params.draftsOnly !== undefined) sp.set('draftsOnly', String(params.draftsOnly))
  const res = await fetch(`${base()}/api/Bills?${sp.toString()}`)
  return handle(res)
}

export async function dailySummary(date) {
  const q = date ? `?date=${encodeURIComponent(date)}` : ''
  const res = await fetch(`${base()}/api/Reports/daily-summary${q}`)
  return handle(res)
}

export function pdfUrl(id) {
  return `${fileDownloadBase()}/api/Bills/${id}/export/pdf`
}

export function csvUrl(id) {
  return `${fileDownloadBase()}/api/Bills/${id}/export/csv`
}

export async function upsertCatalogItem(method, id, body) {
  const url =
    method === 'POST' ? `${base()}/api/CatalogItems` : `${base()}/api/CatalogItems/${id}`
  const res = await fetch(url, {
    method,
    headers: jsonHeaders,
    body: JSON.stringify(body),
  })
  return handle(res)
}

export async function deleteCatalogItem(id) {
  const res = await fetch(`${base()}/api/CatalogItems/${id}`, { method: 'DELETE' })
  await handle(res)
}
