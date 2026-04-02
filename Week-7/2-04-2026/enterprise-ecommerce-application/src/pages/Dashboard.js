import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h1 style={{ marginBottom: "8px" }}>Dashboard</h1>
      <p style={{ color: "#555", marginBottom: "24px" }}>Welcome, <strong>{user?.name}</strong></p>
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        {[["💰 Revenue", "$12,450"], ["📦 Orders", "284"], ["👥 Customers", "421"]].map(([label, val]) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", flex: 1 }}>
            <p style={{ color: "#555", fontSize: "0.85rem" }}>{label}</p>
            <h2 style={{ marginTop: "8px" }}>{val}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;