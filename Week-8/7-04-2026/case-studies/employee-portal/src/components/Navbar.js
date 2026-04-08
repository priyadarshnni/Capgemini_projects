import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  const linkStyle = (isActive) => ({
    padding: "8px 16px", borderRadius: "6px", fontSize: "0.9rem",
    fontWeight: isActive ? "bold" : "normal",
    background: isActive ? theme.accent : "transparent",
    color: isActive ? "#fff" : theme.subtext,
    textDecoration: "none", transition: "all 0.2s"
  });

  return (
    <nav style={{
      background: theme.navBg, borderBottom: `1px solid ${theme.border}`,
      padding: "12px 28px", display: "flex", justifyContent: "space-between",
      alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "1.3rem" }}>🏢</span>
        <span style={{ fontWeight: "800", fontSize: "1.1rem", color: theme.accent }}>EmployeePortal</span>
      </div>

      <div style={{ display: "flex", gap: "4px" }}>
        {[["Dashboard", "/dashboard"], ["Employees", "/employees"], ["Analytics", "/analytics"], ["Settings", "/settings"]].map(([label, path]) => (
          <NavLink key={path} to={path} style={({ isActive }) => linkStyle(isActive)}>{label}</NavLink>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={toggleTheme} style={{
          background: theme.inputBg, border: `1px solid ${theme.border}`,
          borderRadius: "8px", padding: "7px 14px", cursor: "pointer",
          color: theme.text, fontSize: "0.85rem"
        }}>{theme.isDark ? "☀️ Light" : "🌙 Dark"}</button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: theme.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "0.9rem" }}>
            {user?.name?.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: "600", color: theme.text }}>{user?.name}</div>
            <div style={{ fontSize: "0.75rem", color: theme.subtext }}>{user?.role}</div>
          </div>
        </div>

        <button onClick={handleLogout} style={{
          background: "#ef4444", color: "#fff", border: "none",
          borderRadius: "8px", padding: "7px 14px", cursor: "pointer",
          fontSize: "0.85rem", fontWeight: "600"
        }}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;