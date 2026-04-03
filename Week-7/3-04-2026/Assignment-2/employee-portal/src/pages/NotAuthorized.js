import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AlertBox from "../components/AlertBox";

/* ===========================
   Topic: Authorization Feedback
   - Shown when a logged-in user lacks permission
   =========================== */
export default function NotAuthorized() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card card-wide">
        <h1 className="title">Not Authorized</h1>
        <p className="subtitle">
          {user ? `Hello ${user.name}. Your role cannot access this page.` : "Please log in first."}
        </p>

        <AlertBox type="error" message="Access denied." />

        <div className="row gap">
          <button
            className="btn"
            onClick={() => {
              navigate(user?.role === "admin" ? "/admin" : "/employee", { replace: true });
            }}
          >
            Go to dashboard
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

