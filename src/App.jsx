// src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import CourseTypeManager from "./components/CourseTypeManager";
import CourseManager from "./components/CourseManager";
import CourseOfferingManager from "./components/CourseOfferingManager";
import StudentRegistration from "./components/StudentRegistration";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load user from localStorage on first render
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
    <div>
      {!loggedInUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div style={{ padding: 20 }}>
          <h2>Welcome, {loggedInUser}</h2>
          <CourseTypeManager />
          <CourseManager />
          <CourseOfferingManager />
          <StudentRegistration />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
