/* import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup; */

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /*const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };*/
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // ✅ Store user info locally
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userId', user.uid);
  
      // ✅ Redirect to home
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };
  

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Sign Up</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;

