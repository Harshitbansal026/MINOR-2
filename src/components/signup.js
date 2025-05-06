import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Reuse or share the login CSS for styling consistency

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userEmail", userCredential.user.email);
      localStorage.setItem("userId", userCredential.user.uid);
      navigate("/");
    } catch (err) {
      setError("Failed to sign up. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo-section">
          <div className="logo-icon">✍️</div>
          <h1>Join Infinity Docs</h1>
          <p>Your cloud-based collaboration space</p>
        </div>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
