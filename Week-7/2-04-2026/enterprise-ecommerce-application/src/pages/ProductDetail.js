import { useParams, NavLink, Outlet } from "react-router-dom";

const PRODUCTS = {
  1: { name: "React T-Shirt", price: 25, emoji: "👕", desc: "Premium cotton tee with React logo." },
  2: { name: "JavaScript Hoodie", price: 45, emoji: "🧥", desc: "Cozy hoodie for late-night coding." },
  3: { name: "CSS Mug", price: 15, emoji: "☕", desc: "Start your day with good styles." },
  4: { name: "Node.js Cap", price: 20, emoji: "🧢", desc: "Adjustable cap with Node.js logo." },
  5: { name: "Python Sticker Pack", price: 10, emoji: "🐍", desc: "10 premium vinyl stickers." },
  6: { name: "TypeScript Notebook", price: 18, emoji: "📓", desc: "A5 dotted notebook, 200 pages." },
};

function ProductDetail() {
  const { productId } = useParams();
  const product = PRODUCTS[productId];

  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "28px", marginBottom: "20px", display: "flex", gap: "24px", alignItems: "center" }}>
        <div style={{ fontSize: "4rem" }}>{product.emoji}</div>
        <div>
          <h1 style={{ marginBottom: "8px" }}>{product.name}</h1>
          <p style={{ color: "#555", marginBottom: "12px" }}>{product.desc}</p>
          <p style={{ color: "#007bff", fontWeight: "bold", fontSize: "1.3rem", marginBottom: "16px" }}>${product.price}</p>
          <button style={{ padding: "10px 24px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px" }}>Add to Cart</button>
        </div>
      </div>

      {/* Nested tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {[["Reviews", "reviews"], ["Specifications", "specs"]].map(([label, path]) => (
          <NavLink key={path} to={path} style={({ isActive }) => ({
            padding: "8px 20px", borderRadius: "6px", border: "1px solid #ddd",
            background: isActive ? "#007bff" : "#fff", color: isActive ? "#fff" : "#555", fontWeight: isActive ? "bold" : "normal"
          })}>{label}</NavLink>
        ))}
      </div>

      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "24px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProductDetail;