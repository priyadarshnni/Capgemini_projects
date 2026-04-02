import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>🛒 MyShop</h2>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;