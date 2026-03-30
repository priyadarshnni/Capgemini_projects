function Cart({ cart, onUpdateQty, onRemove, total }) {
  return (
    <div className="panel">
      <h2 className="panel-title">🛒 Cart</h2>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="cart-emoji">{item.emoji}</span>
                <div className="cart-info">
                  <span className="cart-name">{item.name}</span>
                  <span className="cart-subtotal">
                    ${item.price} × {item.qty} = ${item.price * item.qty}
                  </span>
                </div>
                <div className="qty-controls">
                  <button onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <div className="total">
            Total: <strong>${total}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;