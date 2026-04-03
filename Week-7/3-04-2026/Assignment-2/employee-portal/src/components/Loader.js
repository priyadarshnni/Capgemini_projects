/* ===========================
   Topic: Reusable Loader
   - Keeps UI responsive during async simulation
   =========================== */
export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <div className="spinner" />
      <div className="loader-text">{text}</div>
    </div>
  );
}

