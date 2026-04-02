import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "React T-Shirt", price: 25, emoji: "👕" },
  { id: 2, name: "JavaScript Hoodie", price: 45, emoji: "🧥" },
  { id: 3, name: "CSS Mug", price: 15, emoji: "☕" },
  { id: 4, name: "Node.js Cap", price: 20, emoji: "🧢" },
  { id: 5, name: "Python Sticker Pack", price: 10, emoji: "🐍" },
  { id: 6, name: "TypeScript Notebook", price: 18, emoji: "📓" },
];

function ProductList() {
  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {PRODUCTS.map(p => (
          <Link to={`/products/${p.id}`} key={p.id} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", display: "block", color: "#333" }}>
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{p.emoji}</div>
            <h3 style={{ marginBottom: "8px" }}>{p.name}</h3>
            <p style={{ color: "#007bff", fontWeight: "bold" }}>${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;