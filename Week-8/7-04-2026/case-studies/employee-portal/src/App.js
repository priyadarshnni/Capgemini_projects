import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text, transition: "all 0.3s ease", fontFamily: "Segoe UI, sans-serif" }}>
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;