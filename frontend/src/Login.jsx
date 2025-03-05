import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    axios
      .post("http://localhost:8585/user/login", { email, password })
      .then((result) => {
        if (result.data.message === "Login Successful") {
          navigate("/home");
        } else {
          alert(result.data.message || "Login failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Login error: ", err);
        alert("An error occurred. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false); 
      });
  };
  
  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ebee",
  };

  const logoContainerStyle = {
    textAlign: "center",
    backgroundColor: "white",
    padding: "40px 30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const h2Style = {
    color: "black",
    marginBottom: "20px",
  };

  const inputStyle = {
    height: "30px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    border: "0.5px solid #ccc",
    padding: "10px",
    marginTop: "30px",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "350px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#3897f0",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "30px",
  };

  const textStyle = {
    fontSize: "12px",
    marginTop: "20px",
    color: "#999",
  };

  const facebookTextStyle = {
    color: "#3897f0",
    fontWeight: "bold",
    marginTop: "10px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <h2 style={h2Style}>Instagram</h2>
        <div>
          <input
            type="email"
            id="email"
            style={inputStyle}
            placeholder=" email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            id="password"
            style={inputStyle}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            style={{
              ...buttonStyle,
              ...(isSubmitting || !email || !password) && { backgroundColor: "#ccc", cursor: "not-allowed" },
            }}
            onClick={handleSubmit}
            disabled={!email || !password || isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p style={textStyle}>Forgot your login details? Get help logging in.</p>

          <h6 style={{ textAlign: "center", marginTop: "20px" }}>or</h6>
          <h6 style={facebookTextStyle}>Log in with Facebook</h6>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <p style={textStyle}>Don't have an account? Sign up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
