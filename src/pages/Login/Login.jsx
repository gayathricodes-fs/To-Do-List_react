import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheckSquare, FiMail, FiLock } from "react-icons/fi";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setError] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (name, value) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(name);


  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError({
      email: "",
      password: "",
    });

    if (!formData.email.trim()) {
      setError({
        email: "Email is required",
        password: "",
      });

      return
    }

    if (!validateEmail(formData.email.trim())) {
      setError({
        email: "Please enter a valid email address",
        password: "",
      });
      return
    }

    if (!formData.password.trim()) {
      setError({
        email: "",
        password: "Password is required",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users`
      );

      const users = await response.json();
      console.log(users);
      const existingUser = users.find(
        (user) => user.email === formData.email.trim() &&
                  user.password === formData.password
      );

      if (!existingUser) {
        alert("Invalid email or password")
        setFormData({
        email : "",
        password : ""
        })
        return;
      }

      

      // Login successful
     localStorage.setItem("user", (existingUser))
      



      // Store logged-in user
      // localStorage.setItem("user", btoa(JSON.stringify(users[0])));

      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Unable to login. Please try again.");
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
          <h1>Welcome!</h1>
          <p>
            Login to continue managing your tasks and stay productive.
          </p>

          <div className="feature">
            <FiCheckSquare />
            <span>Organize your tasks</span>
          </div>

          <div className="feature">
            <FiCheckSquare />
            <span>Set task priorities</span>
          </div>

          <div className="feature">
            <FiCheckSquare />
            <span>Track your progress</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="auth-right">
          <div className="auth-card">

            <div className="brand">
              <img src="/logo-black.png" alt="" />
            </div>
            <p className="auth-subtitle">
              Login to access your TaskPilot.
            </p>

            <form onSubmit={handleLogin}>
              <div className="input-field">
                <div className="input-group">
                  <label>Email</label>

                  <div className="input-wrapper">
                    <FiMail />

                    <input

                      name="email"
                      value={formData.email}

                      placeholder="Enter your email"

                      onChange={handleChange} />
                  </div>

                </div>
                {errors.email && (
                  <small className="text-danger error-msg">
                    {errors.email}
                  </small>
                )}
              </div>

              <div className="input-field">
                <div className="input-group">
                  <label>Password</label>

                  <div className="input-wrapper">
                    <FiLock />

                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                  </div>

                </div>
                {errors.password && (
                  <small className="text-danger error-msg">
                    {errors.password}
                  </small>
                )}
              </div>




              <button type="submit" className="auth-button" >
                Login
              </button>

            </form>

            <p className="switch-auth">
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
