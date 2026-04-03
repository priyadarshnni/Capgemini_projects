/* ===========================
   Topic: Alerts (UX)
   - Central place for success/error messages
   - Used by login + employee CRUD actions
   =========================== */
export default function AlertBox({ type = "success", message, onClose }) {
  if (!message) return null;

  return (
    <div className={`alert-box alert-${type}`} role="alert">
      <div className="alert-message">{message}</div>
      {typeof onClose === "function" && (
        <button className="alert-close" onClick={onClose} aria-label="Close alert">
          ×
        </button>
      )}
    </div>
  );
}

