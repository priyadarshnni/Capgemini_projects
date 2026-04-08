import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const row = (label, content) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${theme.border}` }}>
      <span style={{ color: theme.text, fontWeight: "500" }}>{label}</span>
      <span>{content}</span>
    </div>
  );

  const Toggle = ({ val, onToggle }) => (
    <div onClick={onToggle} style={{ width: "46px", height: "26px", borderRadius: "13px", background: val ? theme.accent : theme.border, position: "relative", cursor: "pointer", transition: "background 0.3s" }}>
      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#fff", position: "absolute", top: "3px", left: val ? "23px" : "3px", transition: "left 0.3s" }} />
    </div>
  );

  return (
    <div style={{ padding: "32px 28px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", fontWeight: "800", marginBottom: "4px" }}>Settings</h1>
      <p style={{ color: theme.subtext, marginBottom: "28px" }}>Manage your preferences</p>

      <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "4px" }}>Profile</h3>
        <p style={{ color: theme.subtext, fontSize: "0.85rem", marginBottom: "16px" }}>Your account information</p>
        {row("Name", <strong>{user?.name}</strong>)}
        {row("Email", <span style={{ color: theme.subtext }}>{user?.email}</span>)}
        {row("Role", <span style={{ background: theme.accent + "20", color: theme.accent, padding: "3px 12px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: "600" }}>{user?.role}</span>)}
      </div>

      <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Appearance</h3>
        {row("Dark Mode", <Toggle val={theme.isDark} onToggle={toggleTheme} />)}
        {row("Current Theme", <span style={{ color: theme.subtext }}>{theme.isDark ? "Dark" : "Light"}</span>)}
      </div>

      <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "12px", padding: "24px" }}>
        <h3 style={{ marginBottom: "16px" }}>About</h3>
        {row("Version", <span style={{ color: theme.subtext }}>1.0.0</span>)}
        {row("Built with", <span style={{ color: theme.subtext }}>React + Context API</span>)}
        {row("State Management", <span style={{ color: theme.subtext }}>AuthContext + ThemeContext + EmployeeContext</span>)}
      </div>
    </div>
  );
}

export default Settings;