import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useEmployees } from "../context/EmployeeContext";

const empty = { name: "", dept: "", role: "", salary: "", status: "Active" };

function Employees() {
  const { theme } = useTheme();
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.name || !form.dept || !form.role || !form.salary) return alert("Fill all fields");
    if (editId) { updateEmployee(editId, { ...form, salary: Number(form.salary) }); setEditId(null); }
    else addEmployee({ ...form, salary: Number(form.salary) });
    setForm(empty); setShowForm(false);
  };

  const handleEdit = (emp) => {
    setForm({ name: emp.name, dept: emp.dept, role: emp.role, salary: emp.salary, status: emp.status });
    setEditId(emp.id); setShowForm(true);
  };

  const inputStyle = {
    width: "100%", padding: "9px 12px", border: `1px solid ${theme.border}`,
    borderRadius: "7px", background: theme.inputBg, color: theme.text,
    fontSize: "0.9rem", outline: "none", marginBottom: "12px"
  };

  return (
    <div style={{ padding: "32px 28px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", marginBottom: "4px" }}>Employees</h1>
          <p style={{ color: theme.subtext }}>Manage all employee records</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(empty); }} style={{
          background: theme.accent, color: "#fff", border: "none",
          padding: "10px 22px", borderRadius: "8px", fontWeight: "700", cursor: "pointer"
        }}>+ Add Employee</button>
      </div>

      {showForm && (
        <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "20px" }}>{editId ? "Edit Employee" : "Add New Employee"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div><label style={{ color: theme.subtext, fontSize: "0.82rem" }}>Full Name</label><input style={inputStyle} placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><label style={{ color: theme.subtext, fontSize: "0.82rem" }}>Department</label><input style={inputStyle} placeholder="Department" value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} /></div>
            <div><label style={{ color: theme.subtext, fontSize: "0.82rem" }}>Role</label><input style={inputStyle} placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div>
            <div><label style={{ color: theme.subtext, fontSize: "0.82rem" }}>Salary</label><input style={inputStyle} placeholder="Salary" type="number" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} /></div>
          </div>
          <select style={{ ...inputStyle, width: "50%" }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button onClick={handleSubmit} style={{ background: theme.accent, color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
              {editId ? "Update" : "Add"}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(empty); }} style={{ background: "transparent", border: `1px solid ${theme.border}`, color: theme.text, padding: "10px 24px", borderRadius: "8px", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <input style={{ ...inputStyle, marginBottom: "16px", width: "300px" }} placeholder="🔍 Search employees..." value={search} onChange={e => setSearch(e.target.value)} />

      <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: theme.inputBg }}>
              {["Name", "Department", "Role", "Salary", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: theme.subtext, fontSize: "0.82rem", fontWeight: "700", borderBottom: `1px solid ${theme.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: "13px 16px", fontWeight: "600" }}>{e.name}</td>
                <td style={{ padding: "13px 16px", color: theme.subtext }}>{e.dept}</td>
                <td style={{ padding: "13px 16px" }}>{e.role}</td>
                <td style={{ padding: "13px 16px", color: theme.accent, fontWeight: "600" }}>₹{e.salary.toLocaleString()}</td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "600", background: e.status === "Active" ? "#dcfce7" : "#fef3c7", color: e.status === "Active" ? "#16a34a" : "#d97706" }}>
                    {e.status}
                  </span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <button onClick={() => handleEdit(e)} style={{ background: "#dbeafe", color: "#2563eb", border: "none", padding: "5px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "8px", fontWeight: "600", fontSize: "0.82rem" }}>Edit</button>
                  <button onClick={() => deleteEmployee(e.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "5px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "0.82rem" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: theme.subtext }}>No employees found.</div>
        )}
      </div>
    </div>
  );
}

export default Employees;