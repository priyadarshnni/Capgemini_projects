import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { useEmployees } from "../context/EmployeeContext";

/* ===========================
   Topic: Employee View (Own Data Only)
   - Employees can only read their own employee record
   - Admin also routes through here when role allows `/employee`
   =========================== */
export default function EmployeeProfile() {
  const { user, logout } = useAuth();
  const { employees, loading } = useEmployees();

  if (loading) return <Loader text="Loading your profile..." />;

  const record = employees.find(
    (e) => e.email.toLowerCase() === String(user?.email).toLowerCase()
  );

  return (
    <div className="page">
      <div className="card">
        <div className="header-row">
          <div>
            <h1 className="title">Employee Profile</h1>
            <div className="muted">
              Logged in as <span className="pill">{user?.role}</span>
            </div>
          </div>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>

        {!record ? (
          <div className="empty">
            No employee record found for your account.
          </div>
        ) : (
          <div className="profile-grid">
            <div className="field">
              <div className="field-label">Name</div>
              <div className="field-value">{record.name}</div>
            </div>
            <div className="field">
              <div className="field-label">Email</div>
              <div className="field-value">{record.email}</div>
            </div>
            <div className="field">
              <div className="field-label">Department</div>
              <div className="field-value">{record.department}</div>
            </div>
            <div className="field">
              <div className="field-label">Designation</div>
              <div className="field-value">{record.designation}</div>
            </div>
            <div className="field">
              <div className="field-label">Role (Portal)</div>
              <div className="field-value">{record.role}</div>
            </div>
          </div>
        )}

        <div className="note">
          CRUD actions are restricted to Admin users.
        </div>
      </div>
    </div>
  );
}

