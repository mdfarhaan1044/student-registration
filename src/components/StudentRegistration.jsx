// src/StudentRegistration.jsx
import React, { useState, useEffect } from "react";
import "./Styles/studentRegistration.css";

const OFFERING_KEY = "course_offerings";
const REGISTRATION_KEY = "registrations";

const StudentRegistration = () => {
    const [offerings, setOfferings] = useState([]);
    const [selectedOffering, setSelectedOffering] = useState("");
    const [name, setName] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [registrations, setRegistrations] = useState({});

    useEffect(() => {
        const storedOfferings = JSON.parse(localStorage.getItem(OFFERING_KEY) || "[]");
        const storedRegistrations = JSON.parse(localStorage.getItem(REGISTRATION_KEY) || "{}");

        setOfferings(storedOfferings);
        setRegistrations(storedRegistrations);
    }, []);

    useEffect(() => {
        localStorage.setItem(REGISTRATION_KEY, JSON.stringify(registrations));
    }, [registrations]);

    const handleRegister = () => {
        if (!selectedOffering || !name || !rollNumber) {
            return alert("All fields are required!");
        }

        const newEntry = { name, rollNumber };
        const updated = { ...registrations };

        if (!updated[selectedOffering]) {
            updated[selectedOffering] = [];
        }

        const alreadyRegistered = updated[selectedOffering].some(
            (s) => s.rollNumber === rollNumber
        );

        if (alreadyRegistered) {
            return alert("This roll number is already registered for this course offering.");
        }

        updated[selectedOffering].push(newEntry);
        setRegistrations(updated);
        setName("");
        setRollNumber("");
    };

    return (
        <div className="registration-container">
            <h2>Student Registration</h2>

            <select value={selectedOffering} onChange={(e) => setSelectedOffering(e.target.value)}>
                <option value="">Select Course Offering</option>
                {offerings.map((off, idx) => (
                    <option key={idx} value={off}>{off}</option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>

            {selectedOffering && (
                <div>
                    <h4>Registered Students for: {selectedOffering}</h4>
                    <ul>
                        {(registrations[selectedOffering] || []).map((student, i) => (
                            <li key={i}>
                                {student.name} (Roll No: {student.rollNumber})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StudentRegistration;
