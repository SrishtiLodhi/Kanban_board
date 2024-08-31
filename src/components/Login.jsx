// src/components/Login.jsx

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth from context

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = formData;

    // Validate form data
    if (!name || !password) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      await login(name, password); // Use login function from context
      setError(null);
      navigate("/homepage");
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login template d-flex justify-content-center align-items-center w-100 vh-100"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <div
        className="w-25 bg-light"
        style={{
          borderRadius: "1.3rem",
        }}
      >
        <form
          className="h-100 d-flex flex-column p-lg-5 p-md-3 p-sm-2 justify-content-between"
          onSubmit={handleSubmit}
        >
          <div>
            <h3
              className="d-flex mb-1 align-items-center justify-content-start font-montserrat fs-2"
              style={{ fontWeight: "700" }}
            >
              Login
            </h3>
            <p className="mb-5" style={{ fontWeight: "500" }}>
              Please login to continue
            </p>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Enter Username"
                className="lined-input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="lined-input mb-1"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-end">
                <Link to="/" className="text-decoration-none text-end">
                  Forgot password?
                </Link>
              </p>
            </div>
          </div>
          <div>
            <div className="d-grid">
              {error && (
                <div className="alert text-danger p-0 text-end mb-1">
                  {error}
                </div>
              )}
              <button
                className="btn text-primary text-light"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="text-right d-flex justify-content-end mt-2">
              <p>
                No account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
