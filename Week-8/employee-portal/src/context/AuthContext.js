import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === "admin@company.com" && password === "admin123") {
      setUser({ name: "Admin User", email, role: "Admin" });
      return true;
    }
    if (email === "emp@company.com" && password === "emp123") {
      setUser({ name: "John Employee", email, role: "Employee" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);