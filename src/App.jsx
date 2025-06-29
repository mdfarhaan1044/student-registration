// src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import CourseTypeManager from "./components/CourseTypeManager";
import CourseManager from "./components/CourseManager";
import CourseOfferingManager from "./components/CourseOfferingManager";
import StudentRegistration from "./components/StudentRegistration";
import { CourseProvider } from "./context/CourseContext";
import "./App.css";
import { LogOut } from "lucide-react";
import { PiHandWavingThin } from "react-icons/pi";
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
              <h2 className="dashboard-header-title" >Welcome, {loggedInUser} <PiHandWavingThin size={30} color="black" /></h2>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={20} color="white" />
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
