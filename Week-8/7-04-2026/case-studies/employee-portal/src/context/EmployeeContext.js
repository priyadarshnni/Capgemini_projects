import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

const initialEmployees = [
  { id: 1, name: "Rahul Sharma", dept: "Engineering", role: "Developer", salary: 75000, status: "Active" },
  { id: 2, name: "Priya Singh", dept: "Design", role: "UI Designer", salary: 65000, status: "Active" },
  { id: 3, name: "Arjun Mehta", dept: "Marketing", role: "Manager", salary: 80000, status: "Active" },
  { id: 4, name: "Sneha Patel", dept: "HR", role: "HR Lead", salary: 70000, status: "Inactive" },
];

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(initialEmployees);

  const addEmployee = (emp) => {
    setEmployees(prev => [...prev, { ...emp, id: Date.now() }]);
  };

  const updateEmployee = (id, updated) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployees = () => useContext(EmployeeContext);