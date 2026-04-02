import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const inputStyle = { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "12px", fontSize: "0.95rem" };

  return (
    <div style={{ background: "#fff", padding: "32px", borderRadius: "10px", border: "1px solid #ddd" }}>
      <h2 style={{ marginBottom: "20px" }}>Register</h2>
      <input style={inputStyle} placeholder="Full Name" />
      <input style={inputStyle} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => { if (email && password) { login(email); navigate("/dashboard"); } }}
        style={{ width: "100%", padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", marginBottom: "16px" }}>
        Register
      </button>
      <p style={{ textAlign: "center", color: "#555", fontSize: "0.9rem" }}>
        Have account? <Link to="/login" style={{ color: "#007bff" }}>Login</Link>
      </p>
    </div>
  );
}

export default Register;