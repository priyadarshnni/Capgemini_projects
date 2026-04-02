function Settings() {
  return (
    <div style={{ maxWidth: "500px" }}>
      <h1 style={{ marginBottom: "24px" }}>Settings</h1>
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "24px" }}>
        <h3 style={{ marginBottom: "16px" }}>Profile</h3>
        <input placeholder="Display Name" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "12px" }} />
        <input placeholder="Email" type="email" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "16px" }} />
        <button style={{ padding: "10px 24px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px" }}>Save</button>
      </div>
    </div>
  );
}

export default Settings;