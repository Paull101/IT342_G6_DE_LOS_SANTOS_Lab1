import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        // Save token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", email.split("@")[0]); // Save username from email
        setSuccess("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-form-section">
          <div className="login-header">
            <h1 className="login-title">Login</h1>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form className="login-form" onSubmit={handleLogin}>

            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                placeholder="john.doe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="switch-form">
            <p>
              New User?{" "}
              <button
                type="button"
                className="switch-btn"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </p>
          </div>

          <p className="forgot-password">
            <button
              type="button"
              className="forgot-link"
            >
              Forgot Password?
            </button>
          </p>
        </div>

        <div className="login-branding">
          <div className="branding-content">
            <div className="branding-logo">🐾</div>
            <h1 className="branding-title">Campus Reserve</h1>
            <p className="branding-subtitle">
              Your gateway to seamless campus facility reservations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
