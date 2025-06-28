// src/StudentRegistration.jsx
import React, { useState, useEffect } from "react";

const OFFERING_KEY = "course_offerings";
const REGISTRATION_KEY = "registrations"; // { "Group - Hindi": [{name, roll}] }

const StudentRegistration = () => {
    const [offerings, setOfferings] = useState([]);
    const [selectedOffering, setSelectedOffering] = useState("");
    const [name, setName] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [registrations, setRegistrations] = useState({});

    // Load offerings and registrations
    useEffect(() => {
        const storedOfferings = JSON.parse(localStorage.getItem(OFFERING_KEY) || "[]");
        const storedRegistrations = JSON.parse(localStorage.getItem(REGISTRATION_KEY) || "{}");

        setOfferings(storedOfferings);
        setRegistrations(storedRegistrations);
    }, []);

    // Save registrations when changed
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

        // Prevent duplicate roll number for same offering
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
        <div style={{ padding: 20 }}>
            <h2>Student Registration</h2>

            <select value={selectedOffering} onChange={(e) => setSelectedOffering(e.target.value)}>
                <option value="">Select Course Offering</option>
                {offerings.map((off, idx) => (
                    <option key={idx} value={off}>{off}</option>
                ))}
            </select>

            <br />
            <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
            />
            <br />
            <button onClick={handleRegister}>Register</button>

            {/* Show registered students for selected offering */}
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
