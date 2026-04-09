import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <h2>Login</h2>
      <p>Continue to your dashboard and collaboration tools.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>

        {error ? <p className="error-text">{error}</p> : null}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-footnote">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}
