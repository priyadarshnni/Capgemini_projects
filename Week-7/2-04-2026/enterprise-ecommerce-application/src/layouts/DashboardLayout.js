import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "200px", background: "#fff", borderRight: "1px solid #ddd", padding: "20px 12px", display: "flex", flexDirection: "column" }}>
        <h3 style={{ padding: "0 12px", marginBottom: "8px" }}>🛒 MyShop</h3>
        <p style={{ padding: "0 12px", color: "#888", fontSize: "0.82rem", marginBottom: "20px" }}>Hi, {user?.name}</p>
        {[["⚡ Dashboard", "/dashboard"], ["📊 Analytics", "/dashboard/analytics"], ["⚙️ Settings", "/dashboard/settings"]].map(([label, path]) => (
          <NavLink key={path} to={path} end={path === "/dashboard"} style={({ isActive }) => ({
            display: "block", padding: "10px 12px", marginBottom: "4px", borderRadius: "6px",
            background: isActive ? "#e8f0fe" : "transparent", color: isActive ? "#007bff" : "#555", fontWeight: isActive ? "bold" : "normal"
          })}>{label}</NavLink>
        ))}
        <div style={{ marginTop: "auto" }}>
          <NavLink to="/" style={{ display: "block", padding: "10px 12px", color: "#555" }}>🌐 Public Site</NavLink>
          <button onClick={() => { logout(); navigate("/login"); }} style={{ width: "100%", padding: "10px 12px", background: "#fff", border: "1px solid #ddd", borderRadius: "6px", color: "#e74c3c", fontWeight: "bold", textAlign: "left" }}>
            🚪 Logout
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: "32px", background: "#f5f5f5" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;