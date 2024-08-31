import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    emailid: "",
    password: "",
    verifyPassword: "", // Added for password verification
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  // Simulated registered users list
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, emailid, password, verifyPassword } = formData;

    // Validate form data
    if (!username || !emailid || !password) {
      setError("Please fill in all fields correctly.");
      return;
    }

    if (password !== verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Simulate user registration by updating the local state
      setRegisteredUsers([...registeredUsers, { username, emailid }]);
      setSuccess(true);
      setError(null); // Clear any previous errors
      navigate("/homepage");
      console.log("Registration successful:", { username, emailid });
    } catch (error) {
      setError("Sign up failed. Please try again.");
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login template d-flex justify-content-center align-items-center w-100 vh-100"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <form
        className="w-25 p-lg-5 p-md-3 p-sm-2 bg-light"
        style={{
          borderTopRightRadius: "1.5rem",
          borderBottomRightRadius: "1.5rem",
        }}
        onSubmit={handleSubmit}
      >
        <h3
          className="d-flex mb-5 align-items-center justify-content-start font-montserrat fs-2"
          style={{ fontWeight: "700" }}
        >
          Sign Up
        </h3>

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Enter Name"
            className="lined-input font-bold"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="emailid"
            placeholder="Enter Email"
            className="lined-input font-bold"
            value={formData.emailid}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="lined-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="verifyPassword"
            placeholder="Verify Password"
            className="lined-input"
            value={formData.verifyPassword}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid">
          {success && (
            <div className="alert text-success p-0 text-end mb-1">
              Sign up successful!
            </div>
          )}
          {error && (
            <div className="alert text-danger p-0 text-end mb-1">{error}</div>
          )}

          <button className="btn text-primary text-light">Sign Up</button>
        </div>
        <div className="text-right d-flex justify-content-end mt-2">
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </form>
      <Loader loading={loading} />
    </div>
  );
};

export default SignUp;
