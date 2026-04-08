import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useEmployees } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { employees } = useEmployees();
  const navigate = useNavigate();

  const active = employees.filter(e => e.status === "Active").length;
  const inactive = employees.filter(e => e.status === "Inactive").length;
  const depts = [...new Set(employees.map(e => e.dept))].length;
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length);

  const card = (icon, label, value, color) => (
    <div key={label} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "12px", padding: "24px", flex: 1 }}>
      <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{icon}</div>
      <div style={{ color: theme.subtext, fontSize: "0.82rem", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "1.6rem", fontWeight: "800", color }}>{value}</div>
    </div>
  );

  return (
    <div style={{ padding: "32px 28px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: "800", marginBottom: "4px" }}>Welcome back, {user?.name} 👋</h1>
        <p style={{ color: theme.subtext }}>Role: {user?.role} · Here's your portal overview</p>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        {card("👥", "Total Employees", employees.length, theme.accent)}
        {card("✅", "Active", active, "#22c55e")}
        {card("⏸️", "Inactive", inactive, "#f59e0b")}
        {card("🏢", "Departments", depts, "#8b5cf6")}
        {card("💰", "Avg Salary", "₹" + avgSalary.toLocaleString(), "#ef4444")}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ marginBottom: "16px", fontSize: "1rem" }}>Recent Employees</h3>
          {employees.slice(0, 4).map(e => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${theme.border}`, fontSize: "0.9rem" }}>
              <div>
                <div style={{ fontWeight: "600" }}>{e.name}</div>
                <div style={{ color: theme.subtext, fontSize: "0.8rem" }}>{e.dept}</div>
              </div>
              <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "600", background: e.status === "Active" ? "#dcfce7" : "#fef3c7", color: e.status === "Active" ? "#16a34a" : "#d97706" }}>
                {e.status}
              </span>
            </div>
          ))}
        </div>

        <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ marginBottom: "16px", fontSize: "1rem" }}>Quick Actions</h3>
          {[["➕ Add New Employee", "/employees", theme.accent], ["📊 View Analytics", "/analytics", "#8b5cf6"], ["⚙️ Settings", "/settings", "#f59e0b"]].map(([label, path, color]) => (
            <button key={label} onClick={() => navigate(path)} style={{
              display: "block", width: "100%", padding: "12px 16px", marginBottom: "10px",
              background: color + "15", border: `1px solid ${color}40`,
              borderRadius: "8px", color, fontWeight: "600", cursor: "pointer",
              fontSize: "0.9rem", textAlign: "left"
            }}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;