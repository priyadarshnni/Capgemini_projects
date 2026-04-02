import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #ddd", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#333" }}>🛒 MyShop</h2>
        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {[["Home", "/"], ["About", "/about"], ["Contact", "/contact"], ["Products", "/products"]].map(([label, path]) => (
            <NavLink key={path} to={path} end={path === "/"} style={({ isActive }) => ({ color: isActive ? "#007bff" : "#555", fontWeight: isActive ? "bold" : "normal" })}>
              {label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/dashboard" style={{ color: "green", fontWeight: "bold" }}>Dashboard</NavLink>
              <button onClick={() => { logout(); navigate("/"); }} style={{ padding: "6px 14px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff" }}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" style={{ padding: "6px 14px", background: "#007bff", color: "#fff", borderRadius: "6px" }}>Login</NavLink>
          )}
        </nav>
      </header>

      {/* Sidebar + Content */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 110px)" }}>
        <aside style={{ width: "180px", background: "#fff", borderRight: "1px solid #ddd", padding: "20px 12px" }}>
          {[["🏠 Home", "/"], ["📖 About", "/about"], ["📬 Contact", "/contact"], ["🛍️ Products", "/products"]].map(([label, path]) => (
            <NavLink key={path} to={path} end={path === "/"} style={({ isActive }) => ({
              display: "block", padding: "10px 12px", marginBottom: "4px", borderRadius: "6px",
              background: isActive ? "#e8f0fe" : "transparent", color: isActive ? "#007bff" : "#555", fontWeight: isActive ? "bold" : "normal"
            })}>{label}</NavLink>
          ))}
        </aside>
        <main style={{ flex: 1, padding: "32px" }}>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer style={{ background: "#fff", borderTop: "1px solid #ddd", padding: "16px 24px", textAlign: "center", color: "#888", fontSize: "0.85rem" }}>
        © 2026 MyShop. All rights reserved.
      </footer>
    </div>
  );
}

export default MainLayout;