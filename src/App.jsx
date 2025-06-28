// src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import CourseTypeManager from "./components/CourseTypeManager";
import CourseManager from "./components/CourseManager";
import CourseOfferingManager from "./components/CourseOfferingManager";
import StudentRegistration from "./components/StudentRegistration";
import "./App.css"; // 👈 Import the CSS

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogin = (rollNumber) => {
    localStorage.setItem("loggedInUser", rollNumber);
    setLoggedInUser(rollNumber);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <div className="app-container">
      {!loggedInUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="dashboard">
          <div className="dashboard-header">
            <h2>Welcome, {loggedInUser}</h2>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <CourseTypeManager />
          <CourseManager />
          <CourseOfferingManager />
          <StudentRegistration />
        </div>
      )}
    </div>
  );
}

export default App;
