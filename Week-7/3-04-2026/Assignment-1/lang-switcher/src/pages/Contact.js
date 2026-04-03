import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: "100%", padding: "10px 14px", border: "1px solid #ddd",
    borderRadius: "6px", fontSize: "0.95rem", marginBottom: "14px",
    outline: "none", background: "#fafafa"
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "10px", padding: "36px", maxWidth: "520px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", color: "#1e293b" }}>{t.contactTitle}</h1>
      {sent ? (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>✅</div>
          <p style={{ color: "#16a34a", fontWeight: "bold" }}>{t.sent}</p>
        </div>
      ) : (
        <>
          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "4px" }}>{t.name}</label>
          <input style={inputStyle} placeholder={t.name} />

          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "4px" }}>{t.email}</label>
          <input style={inputStyle} placeholder={t.email} type="email" />

          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "4px" }}>{t.message}</label>
          <textarea style={{ ...inputStyle, height: "120px", resize: "vertical" }} placeholder={t.message} />

          <button onClick={() => setSent(true)} style={{
            width: "100%", padding: "12px", background: "#2563eb",
            color: "#fff", border: "none", borderRadius: "6px",
            fontWeight: "bold", fontSize: "0.95rem"
          }}>{t.send}</button>
        </>
      )}
    </div>
  );
}

export default Contact;