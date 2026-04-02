import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 style={{ marginBottom: "12px" }}>Welcome to MyShop</h1>
      <p style={{ color: "#555", marginBottom: "24px" }}>Browse our products or login to access your dashboard.</p>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/products" style={{ padding: "10px 24px", background: "#007bff", color: "#fff", borderRadius: "6px" }}>Browse Products</Link>
        <Link to="/about" style={{ padding: "10px 24px", border: "1px solid #ddd", borderRadius: "6px", color: "#333" }}>Learn More</Link>
      </div>
    </div>
  );
}

export default Home;