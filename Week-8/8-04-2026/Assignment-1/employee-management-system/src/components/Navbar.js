/**
 * COMPONENT: Navbar
 * ------------------
 * PURPOSE: Top navigation bar shown on all authenticated pages.
 *
 * REDUX USAGE:
 * - useSelector → reads user info from auth state
 * - useSelector → reads isDark from theme state
 * - useDispatch → dispatches logout() and toggleTheme() actions
 *
 * FEATURES:
 * - Navigation links to all pages
 * - Dark/Light mode toggle button
 * - User avatar with name and role
 * - Logout button that clears Redux auth state
 *
 * NavLink from react-router-dom automatically adds active styling
 * when the current URL matches the link's path.
 */

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";

function Navbar({ theme }) {
  // dispatch sends actions to Redux store
  const dispatch = useDispatch();

  // useSelector reads specific parts of Redux state
  const { user } = useSelector((state) => state.auth);
  const { isDark } = useSelector((state) => state.theme);

  const navigate = useNavigate();

  // Handle logout: dispatch action then redirect to login
  const handleLogout = () => {
    dispatch(logout()); // clears auth state in Redux
    navigate("/login");
  };

  // Dynamic link style based on whether link is active
  const linkStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: isActive ? "bold" : "normal",
    background: isActive ? theme.accent : "transparent",
    color: isActive ? "#fff" : theme.subtext,
    textDecoration: "none",
    transition: "all 0.2s",
  });

  return (
    <nav style={{
      background: theme.navBg,
      borderBottom: `1px solid ${theme.border}`,
      padding: "12px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "1.3rem" }}>🏢</span>
        <span style={{ fontWeight: "800", fontSize: "1.1rem", color: theme.accent }}>
          Redux EMS
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "4px" }}>
        {[
          ["Dashboard",  "/dashboard"],
          ["Employees",  "/employees"],
          ["Analytics",  "/analytics"],
          ["Settings",   "/settings"],
        ].map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => linkStyle(isActive)}
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Right side: theme toggle + user info + logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {/* Theme toggle button — dispatches toggleTheme action */}
        <button
          onClick={() => dispatch(toggleTheme())}
          style={{
            background: theme.inputBg,
            border: `1px solid ${theme.border}`,
            borderRadius: "8px", padding: "7px 14px",
            cursor: "pointer", color: theme.text, fontSize: "0.85rem",
          }}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* User avatar and info */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: theme.accent, display: "flex",
            alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: "bold", fontSize: "0.9rem",
          }}>
            {user?.name?.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: "600", color: theme.text }}>
              {user?.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: theme.subtext }}>
              {user?.role}
            </div>
          </div>
        </div>

        {/* Logout button — dispatches logout action */}
        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444", color: "#fff", border: "none",
            borderRadius: "8px", padding: "7px 14px",
            cursor: "pointer", fontSize: "0.85rem", fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;