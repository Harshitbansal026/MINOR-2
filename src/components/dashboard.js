/* import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogout = () => signOut(auth);

  return (
    <div>
      {user ? (
        <>
          <h3>Welcome, {user.email}</h3>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Not Logged In</p>
      )}
    </div>
  );
}

export default Dashboard; */

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <>
          <h3>Welcome, {user.email}</h3>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Not Logged In</p>
      )}
    </div>
  );
}

export default Dashboard;

