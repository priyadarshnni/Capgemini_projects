import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import NotAuthorized from "./pages/NotAuthorized";
import "./App.css";

/* ===========================
   Topic: Root Redirect Logic
   - After login (or refresh), route users
     to the correct dashboard based on role.
   =========================== */
function RootRedirect() {
  const { user, loading } = useAuth();

  if (loading) return <div className="app-shell">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "admin") return <Navigate to="/admin" replace />;
  return <Navigate to="/employee" replace />;
}

/* ===========================
   Topic: App Routing + Providers
   - Public: `/login`
   - Protected: `/admin` (admin only)
   - Protected: `/employee` (employee own profile)
   =========================== */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />

            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Auth + Role protected routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={["employee", "admin"]}>
                  <EmployeeProfile />
                </ProtectedRoute>
              }
            />

            <Route path="/not-authorized" element={<NotAuthorized />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
