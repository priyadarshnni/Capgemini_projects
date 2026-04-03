import { useLanguage } from "../context/LanguageContext";

function About() {
  const { t } = useLanguage();
  return (
    <div>
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "10px", padding: "36px" }}>
        <h1 style={{ marginBottom: "16px", color: "#1e293b" }}>{t.aboutTitle}</h1>
        <p style={{ color: "#555", lineHeight: 1.8 }}>{t.aboutDesc}</p>

        <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
          {[["🌍", "40+", "Countries"], ["👥", "10K+", "Users"], ["⭐", "4.9", "Rating"]].map(([icon, val, label]) => (
            <div key={label} style={{ flex: 1, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{icon}</div>
              <div style={{ fontWeight: "bold", fontSize: "1.4rem", color: "#2563eb" }}>{val}</div>
              <div style={{ color: "#888", fontSize: "0.82rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;