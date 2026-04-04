/**
 * Catalog admin tab — list/edit/deactivate catalog items per CatalogKind.
 * Calls upsertCatalogItem + deleteCatalogItem in api.js; parent passes catalogByKind.
 */
import { useState } from 'react'
import { deleteCatalogItem, upsertCatalogItem } from '../api'

const KINDS = ['EntranceFee', 'Donation', 'SellingPrice']

export function CatalogAdmin({ catalogByKind, onReload, onError, busy, setBusy }) {
  const [kind, setKind] = useState('EntranceFee')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    defaultUnitPrice: 0,
    allowsVariablePrice: false,
    isCustomAmountEntry: false,
    active: true,
    sortOrder: 0,
  })

  const resetForm = () => {
    setEditing(null)
    setForm({
      name: '',
      description: '',
      defaultUnitPrice: 0,
      allowsVariablePrice: false,
      isCustomAmountEntry: false,
      active: true,
      sortOrder: 0,
    })
  }

  const startEdit = (item) => {
    setEditing(item)
    setForm({
      name: item.name,
      description: item.description ?? '',
      defaultUnitPrice: item.defaultUnitPrice ?? 0,
      allowsVariablePrice: item.allowsVariablePrice,
      isCustomAmountEntry: item.isCustomAmountEntry,
      active: item.active,
      sortOrder: item.sortOrder,
    })
  }

  const save = async () => {
    setBusy(true)
    onError(null)
    try {
      const body = {
        kind,
        name: form.name,
        description: form.description || null,
        defaultUnitPrice: form.defaultUnitPrice,
        allowsVariablePrice: form.allowsVariablePrice,
        isCustomAmountEntry: form.isCustomAmountEntry,
        active: form.active,
        sortOrder: form.sortOrder,
      }
      await upsertCatalogItem(editing ? 'PUT' : 'POST', editing?.id, body)
      resetForm()
      await onReload()
    } catch (e) {
      onError(String(e))
    } finally {
      setBusy(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Deactivate this catalog item?')) return
    setBusy(true)
    onError(null)
    try {
      await deleteCatalogItem(id)
      await onReload()
    } catch (e) {
      onError(String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="no-print catalog-admin">
      <section className="panel">
        <h2>Catalog management</h2>
        <div className="catalog-tabs">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              className={kind === k ? 'mini active' : 'mini'}
              onClick={() => {
                setKind(k)
                resetForm()
              }}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="form-grid">
          <label>
            Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            Description
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
          <label>
            Default price
            <input
              type="number"
              step="0.01"
              value={form.defaultUnitPrice}
              onChange={(e) => setForm({ ...form, defaultUnitPrice: Number(e.target.value) })}
            />
          </label>
          <label>
            Sort order
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            />
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={form.allowsVariablePrice}
              onChange={(e) => setForm({ ...form, allowsVariablePrice: e.target.checked })}
            />
            Variable price (selling)
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={form.isCustomAmountEntry}
              onChange={(e) => setForm({ ...form, isCustomAmountEntry: e.target.checked })}
            />
            Custom amount entry (donation)
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Active
          </label>
        </div>
        <div className="actions">
          <button type="button" disabled={busy || !form.name.trim()} onClick={() => void save()}>
            {editing ? 'Update item' : 'Add item'}
          </button>
          {editing && (
            <button type="button" className="secondary" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>
      </section>
      <section className="panel">
        <h3>Items in {kind}</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Flags</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {catalogByKind[kind].map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.defaultUnitPrice?.toFixed(2) ?? '—'}</td>
                  <td className="muted small">
                    {item.allowsVariablePrice && 'var '}
                    {item.isCustomAmountEntry && 'custom '}
                    {!item.active && 'inactive'}
                  </td>
                  <td className="row-actions">
                    <button type="button" className="link" onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button type="button" className="link danger" onClick={() => void remove(item.id)}>
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
