// src/App.jsx
import React, { useState, useEffect } from "react";
import StudentRegistration from "./components/StudentRegistration";
import CourseTypeManager from "./components/CourseTypeManager";

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
        < StudentRegistration onLogin={handleLogin} />
      ) : (
        <div style={{ padding: 20 }}>
          <h2>Welcome, {loggedInUser}</h2>
          <CourseTypeManager />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
