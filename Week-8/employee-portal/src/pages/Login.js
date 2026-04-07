import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    const success = login(email, password);
    if (success) navigate("/dashboard");
    else setError("Invalid credentials. Try admin@company.com / admin123");
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    border: `1px solid ${theme.border}`, borderRadius: "8px",
    background: theme.inputBg, color: theme.text,
    fontSize: "0.95rem", outline: "none", marginBottom: "14px"
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "16px", padding: "44px 40px", width: "100%", maxWidth: "420px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🏢</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: theme.text, marginBottom: "4px" }}>Employee Portal</h1>
          <p style={{ color: theme.subtext, fontSize: "0.9rem" }}>Sign in to your account</p>
        </div>

        <label style={{ fontSize: "0.85rem", color: theme.subtext, display: "block", marginBottom: "5px" }}>Email Address</label>
        <input style={inputStyle} type="email" placeholder="admin@company.com" value={email} onChange={e => setEmail(e.target.value)} />

        <label style={{ fontSize: "0.85rem", color: theme.subtext, display: "block", marginBottom: "5px" }}>Password</label>
        <input style={inputStyle} type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()} />

        {error && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "14px" }}>{error}</p>}

        <button onClick={handleLogin} style={{
          width: "100%", padding: "12px", background: theme.accent, color: "#fff",
          border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "1rem", cursor: "pointer"
        }}>Sign In</button>

        <div style={{ marginTop: "20px", background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "14px" }}>
          <p style={{ color: theme.subtext, fontSize: "0.82rem", marginBottom: "6px" }}>Test Credentials:</p>
          <p style={{ color: theme.text, fontSize: "0.82rem" }}>Admin: admin@company.com / admin123</p>
          <p style={{ color: theme.text, fontSize: "0.82rem" }}>Employee: emp@company.com / emp123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;