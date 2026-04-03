import { useLanguage } from "../context/LanguageContext";

const LANGUAGES = [
  { code: "en", label: "🇬🇧 English" },
  { code: "hi", label: "🇮🇳 हिंदी" },
  { code: "fr", label: "🇫🇷 Français" },
];

function Navbar({ currentPage, setPage }) {
  const { t, language, setLanguage } = useLanguage();

  return (
    <nav style={{
      background: "#fff", borderBottom: "1px solid #ddd",
      padding: "14px 32px", display: "flex",
      justifyContent: "space-between", alignItems: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
    }}>
      {/* Logo */}
      <h2 style={{ color: "#2563eb", fontWeight: 700 }}>🌐 {t.appTitle}</h2>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "8px" }}>
        {[["home", t.home], ["about", t.about], ["contact", t.contact]].map(([key, label]) => (
          <button key={key} onClick={() => setPage(key)} style={{
            padding: "8px 18px", borderRadius: "6px", border: "none",
            background: currentPage === key ? "#2563eb" : "transparent",
            color: currentPage === key ? "#fff" : "#555",
            fontWeight: currentPage === key ? "bold" : "normal",
            fontSize: "0.9rem"
          }}>{label}</button>
        ))}
      </div>

      {/* Language Switcher */}
      <div style={{ display: "flex", gap: "6px" }}>
        {LANGUAGES.map(lang => (
          <button key={lang.code} onClick={() => setLanguage(lang.code)} style={{
            padding: "6px 12px", borderRadius: "6px", fontSize: "0.82rem",
            border: `1px solid ${language === lang.code ? "#2563eb" : "#ddd"}`,
            background: language === lang.code ? "#eff6ff" : "#fff",
            color: language === lang.code ? "#2563eb" : "#555",
            fontWeight: language === lang.code ? "bold" : "normal"
          }}>{lang.label}</button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;