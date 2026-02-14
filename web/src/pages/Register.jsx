import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">

        <div className="registration-branding">
          <div className="branding-content">
            <div className="branding-logo">🌟</div>
            <h1 className="branding-title">Join the Pack!</h1>
            <p className="branding-subtitle">
              Create your Campus Reserve Account
            </p>
          </div>
        </div>

        <div className="registration-form-section">
          <h1 className="registration-title">Sign Up</h1>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form className="registration-form" onSubmit={handleSubmit}>

            <div className="input-row">
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input 
                  type="text"
                  name="lastName"
                  placeholder="Dela Cruz"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Username</label>
              <input 
                type="text"
                name="username"
                placeholder="john_doe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email</label>
              <input 
                type="email"
                name="email"
                placeholder="juan@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input 
                type="tel"
                name="phone"
                placeholder="+63 912 345 6789"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="switch-form">
            <p>Already have an account?</p>
            <button 
              type="button" 
              className="switch-btn" 
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
