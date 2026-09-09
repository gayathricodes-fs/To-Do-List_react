import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheckSquare, FiUser, FiMail, FiLock } from "react-icons/fi";
import "./Register.css";
import API_URL from "../../api/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Check whether email already exists
      const checkResponse = await fetch(
        `http://localhost:3001/users?email=${formData.email}`
      );

      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        setError("Email already registered");
        return;
      }

      // Register user
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Unable to register. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Left Section */}
        <div className="auth-left">
          <div className="brand">
            <img src="/logo-update-removebg-preview.png" alt="" />
          </div>

          <h1>Organize your day.</h1>

          <p>
            Plan your tasks, track your progress and get things done
            efficiently.
          </p>

          <div className="feature">
            <FiCheckSquare />
            <span>Manage your daily tasks</span>
          </div>

          <div className="feature">
            <FiCheckSquare />
            <span>Track completed tasks</span>
          </div>

          <div className="feature">
            <FiCheckSquare />
            <span>Stay productive</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="auth-right">
          <div className="auth-card">

            <h2>Create Account</h2>

            <p className="auth-subtitle">
              Create an account to start managing your tasks.
            </p>

            <form onSubmit={handleRegister}>

              <div className="input-group">
                <label>Name</label>

                <div className="input-wrapper">
                  <FiUser />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email</label>

                <div className="input-wrapper">
                  <FiMail />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>

                <div className="input-wrapper">
                  <FiLock />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Confirm Password</label>

                <div className="input-wrapper">
                  <FiLock />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="auth-button">
                Create Account
              </button>

            </form>

            <p className="switch-auth">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;