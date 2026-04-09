import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      setLoading(true);
      await register({ name, email, password });
      setSuccessMessage("Registration successful. You can now login.");
      setTimeout(() => navigate("/login"), 500);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <h2>Create Account</h2>
      <p>Join AquaVeda to report, collaborate, and drive impact.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        </label>

        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required />
        </label>

        {error ? <p className="error-text">{error}</p> : null}
        {successMessage ? <p className="success-text">{successMessage}</p> : null}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="auth-footnote">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
