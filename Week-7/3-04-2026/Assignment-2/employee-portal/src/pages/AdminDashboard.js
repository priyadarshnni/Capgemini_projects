import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEmployees } from "../context/EmployeeContext";
import AlertBox from "../components/AlertBox";
import Loader from "../components/Loader";

/* ===========================
   Topic: Admin Dashboard (Employee CRUD)
   - Allowed only for Admin via `ProtectedRoute`
   - Full CRUD using Context API (in-memory)
   =========================== */
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { employees, loading, error, createEmployee, updateEmployee, deleteEmployee } = useEmployees();

  const [alert, setAlert] = useState({ type: "success", message: "" });

  const [mode, setMode] = useState("create"); // "create" | "edit"
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    role: "employee",
  });
  const [errors, setErrors] = useState({});

  const normalizedEmployees = useMemo(() => {
    // Ensure stable sort by name for nicer UX.
    return [...employees].sort((a, b) => a.name.localeCompare(b.name));
  }, [employees]);

  const validate = () => {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 2) next.name = "Name must be at least 2 characters.";

    if (!form.email.trim()) next.email = "Email is required.";
    else if (!form.email.includes("@")) next.email = "Enter a valid email address.";

    if (!form.department.trim()) next.department = "Department is required.";
    if (!form.designation.trim()) next.designation = "Designation is required.";

    if (!["employee", "admin"].includes(form.role)) next.role = "Role must be employee or admin.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const resetForm = () => {
    setMode("create");
    setForm({
      id: "",
      name: "",
      email: "",
      department: "",
      designation: "",
      role: "employee",
    });
    setErrors({});
  };

  /* ===========================
     Topic: Create Employee (Admin)
     =========================== */
  const onCreate = async (e) => {
    e.preventDefault();
    setAlert({ type: "success", message: "" });
    if (!validate()) return;

    try {
      await createEmployee({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        department: form.department.trim(),
        designation: form.designation.trim(),
        role: form.role,
      });
      setAlert({ type: "success", message: "Employee created successfully." });
      resetForm();
    } catch (err) {
      setAlert({ type: "error", message: err?.message || "Failed to create employee." });
    }
  };

  /* ===========================
     Topic: Edit Employee (Update)
     - Update employee record by `id`
     =========================== */
  const onUpdate = async (e) => {
    e.preventDefault();
    setAlert({ type: "success", message: "" });
    if (!validate()) return;

    try {
      await updateEmployee(form.id, {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        department: form.department.trim(),
        designation: form.designation.trim(),
        role: form.role,
      });
      setAlert({ type: "success", message: "Employee updated successfully." });
      resetForm();
    } catch (err) {
      setAlert({ type: "error", message: err?.message || "Failed to update employee." });
    }
  };

  /* ===========================
     Topic: Delete Employee
     =========================== */
  const onDelete = async (id) => {
    const emp = employees.find((x) => x.id === id);
    const ok = window.confirm(`Delete employee "${emp?.name || "this user"}"?`);
    if (!ok) return;

    setAlert({ type: "success", message: "" });
    try {
      await deleteEmployee(id);
      setAlert({ type: "success", message: "Employee deleted successfully." });
      if (mode === "edit" && form.id === id) resetForm();
    } catch (err) {
      setAlert({ type: "error", message: err?.message || "Failed to delete employee." });
    }
  };

  const onEdit = (emp) => {
    setMode("edit");
    setForm({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      department: emp.department,
      designation: emp.designation,
      role: emp.role,
    });
    setErrors({});
    setAlert({ type: "success", message: "" });
  };

  return (
    <div className="page">
      <div className="card card-wide">
        <div className="header-row">
          <div>
            <h1 className="title">Admin Dashboard</h1>
            <div className="muted">
              Welcome <span className="pill">{user?.name}</span>
            </div>
          </div>

          <div className="row gap">
            <button className="btn" onClick={() => navigate("/employee")}>
              My Profile
            </button>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {alert.message ? (
          <AlertBox
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: alert.type, message: "" })}
          />
        ) : null}

        {error ? <AlertBox type="error" message={error} /> : null}

        {/* ===========================
            Topic: Employee Management (CRUD UI)
            - Admin creates/edits/deletes employees
           =========================== */}
        <div className="crud-grid">
          <div className="panel">
            <h2 className="panel-title">
              {mode === "create" ? "Create Employee" : "Edit Employee"}
            </h2>

            <form className="form" onSubmit={mode === "create" ? onCreate : onUpdate}>
              <label className="label">
                Name
                <input
                  className={`input ${errors.name ? "input-error" : ""}`}
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  type="text"
                  placeholder="Full name"
                />
                {errors.name ? <div className="field-error">{errors.name}</div> : null}
              </label>

              <label className="label">
                Email
                <input
                  className={`input ${errors.email ? "input-error" : ""}`}
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  type="email"
                  placeholder="name@company.com"
                />
                {errors.email ? <div className="field-error">{errors.email}</div> : null}
              </label>

              <label className="label">
                Department
                <input
                  className={`input ${errors.department ? "input-error" : ""}`}
                  value={form.department}
                  onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
                  type="text"
                  placeholder="e.g. Engineering"
                />
                {errors.department ? <div className="field-error">{errors.department}</div> : null}
              </label>

              <label className="label">
                Designation
                <input
                  className={`input ${errors.designation ? "input-error" : ""}`}
                  value={form.designation}
                  onChange={(e) => setForm((p) => ({ ...p, designation: e.target.value }))}
                  type="text"
                  placeholder="e.g. Frontend Developer"
                />
                {errors.designation ? <div className="field-error">{errors.designation}</div> : null}
              </label>

              <label className="label">
                Role
                <select
                  className={`input ${errors.role ? "input-error" : ""}`}
                  value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                >
                  <option value="employee">employee</option>
                  <option value="admin">admin</option>
                </select>
                {errors.role ? <div className="field-error">{errors.role}</div> : null}
              </label>

              <div className="row gap">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
                </button>
                {mode === "edit" ? (
                  <button
                    className="btn"
                    type="button"
                    disabled={loading}
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>

              {loading ? <Loader text="Working on employee data..." /> : null}
            </form>
          </div>

          <div className="panel">
            <h2 className="panel-title">Employees</h2>

            {loading && mode !== "edit" ? <Loader text="Refreshing list..." /> : null}

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Role</th>
                    <th className="th-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {normalizedEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.department}</td>
                      <td>{emp.designation}</td>
                      <td>
                        <span className={`badge ${emp.role === "admin" ? "badge-admin" : "badge-employee"}`}>
                          {emp.role}
                        </span>
                      </td>
                      <td className="td-actions">
                        <div className="row gap-sm">
                          <button
                            className="btn btn-small"
                            type="button"
                            disabled={loading}
                            onClick={() => onEdit(emp)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-small btn-danger"
                            type="button"
                            disabled={loading}
                            onClick={() => onDelete(emp.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {normalizedEmployees.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty">
                        No employees found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <div className="note">
              Only Admin can create, update, or delete employees.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

