import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotAuthorized from "../pages/NotAuthorized";

/* ===========================
   Topic: Protected Routes (Auth + Role)
   - If not logged in -> redirect to `/login`
   - If role not allowed -> show NotAuthorized page
   =========================== */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <div className="app-shell">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <NotAuthorized />;
  }

  return children;
}

