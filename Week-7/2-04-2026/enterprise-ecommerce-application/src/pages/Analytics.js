function Analytics() {
  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Analytics</h1>
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "24px" }}>
        <p style={{ color: "#555", marginBottom: "16px" }}>Monthly Sales</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" }}>
          {[40, 65, 50, 80, 55, 90, 75].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: "#007bff", borderRadius: "4px 4px 0 0", opacity: 0.7 }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
            <div key={d} style={{ flex: 1, textAlign: "center", fontSize: "0.75rem", color: "#888" }}>{d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;