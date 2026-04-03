import { createContext, useContext, useMemo, useState } from "react";

/* ===========================
   Topic: Employee Management Context (In-memory CRUD)
   - No backend integration (temporary in-memory data)
   - Admin can Create/Update/Delete
   - Employee can Read only (filtered in UI)
   =========================== */

const EmployeeContext = createContext(null);

const seedEmployees = [
  {
    id: "emp-1001",
    name: "John Employee",
    email: "employee@company.com",
    department: "Engineering",
    designation: "Frontend Developer",
    role: "employee",
  },
  {
    id: "emp-1002",
    name: "Ayesha Khan",
    email: "ayesha@company.com",
    department: "HR",
    designation: "HR Associate",
    role: "employee",
  },
  {
    id: "emp-1003",
    name: "Sahil Kumrawat (Admin record)",
    email: "admin@company.com",
    department: "Management",
    designation: "HR Admin",
    role: "admin",
  },
];

function makeId() {
  // CRA runs in modern browsers; `crypto.randomUUID()` is ideal.
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `emp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(seedEmployees);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = useMemo(() => {
    /* ===========================
       Topic: Create Employee
       - Adds new record in-memory
       - Simulates async delay for loader UX
       =========================== */
    const createEmployee = async (data) => {
      setLoading(true);
      setError("");
      try {
        await new Promise((r) => setTimeout(r, 500));

        setEmployees((prev) => [
          {
            ...data,
            id: makeId(),
          },
          ...prev,
        ]);
      } catch (e) {
        setError(e?.message || "Failed to create employee.");
        throw e;
      } finally {
        setLoading(false);
      }
    };

    /* ===========================
       Topic: Read Employees
       - Context provides list (admin page can show all)
       - Employee page filters to own email
       =========================== */
    const getEmployees = () => employees;

    /* ===========================
       Topic: Update Employee
       - Finds by `id` and merges new values
       =========================== */
    const updateEmployee = async (id, patch) => {
      setLoading(true);
      setError("");
      try {
        await new Promise((r) => setTimeout(r, 500));

        setEmployees((prev) => {
          const next = prev.map((emp) => (emp.id === id ? { ...emp, ...patch } : emp));
          return next;
        });
      } catch (e) {
        setError(e?.message || "Failed to update employee.");
        throw e;
      } finally {
        setLoading(false);
      }
    };

    /* ===========================
       Topic: Delete Employee
       - Removes record by `id`
       =========================== */
    const deleteEmployee = async (id) => {
      setLoading(true);
      setError("");
      try {
        await new Promise((r) => setTimeout(r, 500));
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } catch (e) {
        setError(e?.message || "Failed to delete employee.");
        throw e;
      } finally {
        setLoading(false);
      }
    };

    return { createEmployee, updateEmployee, deleteEmployee, getEmployees };
  }, [employees]);

  const value = {
    employees,
    loading,
    error,
    createEmployee: api.createEmployee,
    updateEmployee: api.updateEmployee,
    deleteEmployee: api.deleteEmployee,
    getEmployees: api.getEmployees,
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
}

export const useEmployees = () => {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error("useEmployees must be used within an EmployeeProvider.");
  return ctx;
};

