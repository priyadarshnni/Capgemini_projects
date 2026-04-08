/**
 * COMPONENT: App (Root Component)
 * --------------------------------
 * PURPOSE: Sets up routing and passes theme object to all pages.
 *
 * REDUX USAGE:
 * - useSelector(state => state.auth)      → checks if user is logged in
 * - useSelector(state => state.theme)     → reads isDark for styling
 * - useSelector(state => state.employees) → reads loading for spinner
 *
 * THEME OBJECT:
 * Built from isDark boolean — passed as prop to all pages.
 * This avoids repeating theme logic in every component.
 *
 * ROUTING:
 * - /login      → Login page (public)
 * - /dashboard  → Dashboard (protected)
 * - /employees  → Employees CRUD (protected)
 * - /analytics  → Analytics charts (protected)
 * - /settings   → Settings page (protected)
 * - /*          → Redirects to dashboard or login based on auth
 *
 * ProtectedRoute checks isAuthenticated from Redux.
 * If not logged in → redirects to /login automatically.
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  // Read global state from Redux store
  const { isAuthenticated }   = useSelector((state) => state.auth);
  const { isDark }            = useSelector((state) => state.theme);
  const { loading }           = useSelector((state) => state.employees);

  /**
   * THEME OBJECT
   * Built from isDark — all colors defined here.
   * Passed as prop to pages and Navbar for consistent styling.
   */
  const theme = {
    isDark,
    bg:       isDark ? "#0f172a" : "#f1f5f9",
    cardBg:   isDark ? "#1e293b" : "#ffffff",
    text:     isDark ? "#f1f5f9" : "#1e293b",
    subtext:  isDark ? "#94a3b8" : "#64748b",
    border:   isDark ? "#334155" : "#e2e8f0",
    navBg:    isDark ? "#1e293b" : "#ffffff",
    inputBg:  isDark ? "#0f172a" : "#f8fafc",
    accent:   "#3b82f6",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.bg,
      color: theme.text,
      fontFamily: "Segoe UI, sans-serif",
      transition: "all 0.3s ease",
    }}>
      <BrowserRouter>
        {/* Show loading spinner when employees.loading is true */}
        {loading && <LoadingSpinner />}

        {/* Show Navbar only when user is authenticated */}
        {isAuthenticated && <Navbar theme={theme} />}

        <Routes>
          {/* Public route — redirect to dashboard if already logged in */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login theme={theme} />}
          />

          {/* Protected routes — ProtectedRoute checks Redux auth state */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard theme={theme} /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><Employees theme={theme} /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics theme={theme} /></ProtectedRoute>} />
          <Route path="/settings"  element={<ProtectedRoute><Settings  theme={theme} /></ProtectedRoute>} />

          {/* Catch all — redirect based on auth status */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;