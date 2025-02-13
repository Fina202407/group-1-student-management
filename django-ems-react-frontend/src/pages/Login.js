import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        username,
        password,
      });

      // Save token and user details in localStorage
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials or something went wrong!");
      console.error(err);
    }
  };

  // Styles for the right side image container
  const rightImageStyle = {
    backgroundImage: 'url("https://forum.ac.jp/forum/wp-content/themes/amore_tcd028/images2/img_it_point01_02.jpg")', // Replace with your desired image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row" style={{ minHeight: "100vh" }}>
        {/* Left Side: Login Form */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{ background: "#e9f7ff", minHeight: "100vh" }}
        >
          <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <div className="mt-3 text-center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
        {/* Right Side: Image */}
        <div className="col-md-6 d-none d-md-block" style={rightImageStyle}></div>
      </div>
    </div>
  );
};

export default Login;
