import { useLanguage } from "../context/LanguageContext";

function Home() {
  const { t, language } = useLanguage();

  const langNames = { en: "English", hi: "हिंदी", fr: "Français" };

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "10px", padding: "40px", marginBottom: "24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px", color: "#1e293b" }}>{t.welcome}</h1>
        <p style={{ color: "#555", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 24px" }}>{t.welcomeDesc}</p>
        <p style={{ color: "#888", fontStyle: "italic", fontSize: "0.95rem" }}>"{t.tagline}"</p>
      </div>

      {/* Current Language Card */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ color: "#3b82f6", fontSize: "0.82rem", fontWeight: "bold", letterSpacing: "1px", marginBottom: "6px" }}>
            {t.currentLang}
          </p>
          <h3 style={{ fontSize: "1.3rem", color: "#1e293b" }}>{langNames[language]}</h3>
        </div>
        <div style={{ fontSize: "3rem" }}>
          {language === "en" ? "🇬🇧" : language === "hi" ? "🇮🇳" : "🇫🇷"}
        </div>
      </div>
    </div>
  );
}

export default Home;