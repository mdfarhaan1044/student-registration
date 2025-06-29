// src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import CourseTypeManager from "./components/CourseTypeManager";
import CourseManager from "./components/CourseManager";
import CourseOfferingManager from "./components/CourseOfferingManager";
import StudentRegistration from "./components/StudentRegistration";
import { CourseProvider } from "./context/CourseContext";
import "./App.css"; 

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
    <CourseProvider>
      <div className="app-container">
        {!loggedInUser ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div className="dashboard fade-in">
            <div className="dashboard-header">
              <h2>Welcome, {loggedInUser} 👋</h2>
              <button className="logout-btn" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16,17 21,12 16,7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </button>
            </div>
            <div className="dashboard-content">
              <CourseTypeManager />
              <CourseManager />
              <CourseOfferingManager />
              <StudentRegistration />
            </div>
          </div>
        )}
      </div>
    </CourseProvider>
  );
}

export default App;
