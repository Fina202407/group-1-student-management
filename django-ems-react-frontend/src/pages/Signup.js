import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  // State variables for user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  // Function to handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send the request to the backend
      const response = await axios.post("http://127.0.0.1:8000/api/auth/signup/", {
        username,
        password,
        role, // Sending the role; backend will use this to assign a group
      });

      // Check if the response has a token
      if (response.data.token) {
        // Save token and user info in localStorage
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token);

        alert("Signup Successful!");
        navigate("/dashboard"); // Redirect to dashboard after successful signup
      } else {
        alert("Signup failed: No token received.");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Signup failed! Please try again.");
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row" style={{ minHeight: "100vh" }}>
        {/* Left Side: Full-height image (only visible on md+ screens) */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage: 'url("	https://forum.ac.jp/forum/wp-content/themes/amore_tcd028/images2/img_it_mv01.jpg")', // Replace with your image URL
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "50vh",
          }}
        ></div>

        {/* Right Side: Signup form with light blue background */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{ background: "#e9f7ff", minHeight: "100vh" }}
        >
          <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-control"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  <option value="Student">Student</option>
                </select>
              </div>
              <button className="btn btn-success w-100" type="submit">
                Register
              </button>
            </form>
            <div className="mt-3 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
