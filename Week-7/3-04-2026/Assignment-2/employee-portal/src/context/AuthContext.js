import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ===========================
   Topic: Authentication Context
   - Provides `login()` and `logout()`
   - Stores logged-in user (including role)
     in memory + `localStorage` to survive refresh.
   =========================== */

const AuthContext = createContext(null);

const STORAGE_KEY = "employee_portal_user_v1";

// Demo users (no backend integration for now).
const DEMO_USERS = [
  {
    email: "admin@company.com",
    password: "admin123",
    name: "HR Admin",
    role: "admin",
  },
  {
    email: "employee@company.com",
    password: "employee123",
    name: "John Employee",
    role: "employee",
  },
];

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial load from localStorage

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // If localStorage is corrupted, just ignore it.
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ===========================
     Topic: Login (No Backend)
     - Validate against demo credentials
     - Set `user` + persist to localStorage
     =========================== */
  const login = async ({ email, password }) => {
    // Simulate network latency to improve UX (loader).
    await new Promise((r) => setTimeout(r, 400));

    const match = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === String(email).toLowerCase() && u.password === password
    );

    if (!match) throw new Error("Invalid email or password.");

    const nextUser = { email: match.email, name: match.name, role: match.role };
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    return nextUser;
  };

  /* ===========================
     Topic: Logout Handling (Fixes stale sessions)
     - Clear memory state + localStorage
     - Redirect to login route
     =========================== */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider.");
  return ctx;
};

