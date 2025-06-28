// src/Login.jsx
import React, { useState } from "react";
import "./Styles/login.css";

const Login = ({ onLogin }) => {
    const [rollNumber, setRollNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        if (!rollNumber || !password) {
            alert("Both fields are required!");
            return;
        }
        localStorage.setItem(
            "student_" + rollNumber,
            JSON.stringify({ rollNumber, password })
        );
        alert("Registration successful!");
        onLogin(rollNumber);
    };

    const handleLogin = () => {
        const stored = localStorage.getItem("student_" + rollNumber);
        if (!stored) {
            alert("User not found!");
            return;
        }

        const parsed = JSON.parse(stored);
        if (parsed.password === password) {
            alert("Login successful!");
            onLogin(rollNumber);
        } else {
            alert("Incorrect password!");
        }
    };

    return (
        <div className="login-container">
            <h2>Student Login / Register</h2>
            <input
                type="text"
                placeholder="Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-button-group">
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default Login;
