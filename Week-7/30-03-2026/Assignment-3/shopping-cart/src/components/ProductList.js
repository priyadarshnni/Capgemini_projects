function ProductList({ products, onAdd }) {
  return (
    <div className="panel">
      <h2 className="panel-title">🏪 Products</h2>
      <ul className="product-list">
        {products.map((p) => (
          <li key={p.id} className="product-item">
            <span className="product-emoji">{p.emoji}</span>
            <div className="product-info">
              <span className="product-name">{p.name}</span>
              <span className="product-price">${p.price}</span>
            </div>
            <button className="add-btn" onClick={() => onAdd(p)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;