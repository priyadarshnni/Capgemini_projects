import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "React T-Shirt", price: 25, emoji: "👕" },
  { id: 2, name: "JavaScript Hoodie", price: 45, emoji: "🧥" },
  { id: 3, name: "CSS Mug", price: 15, emoji: "☕" },
  { id: 4, name: "Node.js Cap", price: 20, emoji: "🧢" },
  { id: 5, name: "Python Sticker Pack", price: 10, emoji: "🐍" },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="app">
      <h1 className="app-title">🛒 Shopping Cart</h1>
      <div className="layout">
        <ProductList products={PRODUCTS} onAdd={addToCart} />
        <Cart cart={cart} onUpdateQty={updateQty} onRemove={removeItem} total={total} />
      </div>
    </div>
  );
}

export default App;