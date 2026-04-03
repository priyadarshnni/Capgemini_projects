import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AlertBox from "../components/AlertBox";
import Loader from "../components/Loader";

/* ===========================
   Topic: Authentication UI (Login)
   - Validates user input
   - Shows loader during login
   - Displays alerts for success/error
   =========================== */
export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: "success", message: "" });

  /* ===========================
     Topic: Post-login Redirect
     - If user is already authenticated, send them to their dashboard.
     =========================== */
  useEffect(() => {
    if (!user) return;
    navigate(user.role === "admin" ? "/admin" : "/employee", { replace: true });
  }, [user, navigate]);

  const validate = () => {
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!email.includes("@")) nextErrors.email = "Enter a valid email address.";

    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "success", message: "" });

    if (!validate()) return;

    try {
      setSubmitting(true);
      const nextUser = await login({ email, password });
      setAlert({ type: "success", message: "Login successful." });

      navigate(nextUser.role === "admin" ? "/admin" : "/employee", { replace: true });
    } catch (err) {
      setAlert({ type: "error", message: err?.message || "Login failed." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="card card-wide">
        <h1 className="title">Internal Employee Portal</h1>
        <p className="subtitle">Login to access role-based pages.</p>

        {alert.message ? (
          <AlertBox
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: alert.type, message: "" })}
          />
        ) : null}

        <form className="form" onSubmit={onSubmit}>
          <label className="label">
            Email
            <input
              className={`input ${errors.email ? "input-error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="e.g. admin@company.com"
              autoComplete="username"
            />
            {errors.email ? <div className="field-error">{errors.email}</div> : null}
          </label>

          <label className="label">
            Password
            <input
              className={`input ${errors.password ? "input-error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
            />
            {errors.password ? <div className="field-error">{errors.password}</div> : null}
          </label>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>

          {submitting ? <Loader text="Authenticating..." /> : null}
        </form>

        <div className="hint">
          Demo credentials:
          <div className="hint-row">
            <span className="hint-key">Admin</span>
            <span className="hint-val">admin@company.com / admin123</span>
          </div>
          <div className="hint-row">
            <span className="hint-key">Employee</span>
            <span className="hint-val">employee@company.com / employee123</span>
          </div>
        </div>
      </div>
    </div>
  );
}

