// src/StudentRegistration.jsx
import React, { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import "./Styles/studentRegistration.css";
import { CircleUserRound } from "lucide-react";
import { UserRound } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { TableOfContents } from "lucide-react";

const StudentRegistration = () => {
    const {
        courseOfferings,
        studentRegistrations,
        addStudentRegistration,
        deleteStudentRegistration
    } = useCourseContext();

    const [selectedOffering, setSelectedOffering] = useState("");
    const [name, setName] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRegister = () => {
        try {
            addStudentRegistration(selectedOffering, name, rollNumber);
            setName("");
            setRollNumber("");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteRegistration = (offering, rollNumber) => {
        if (!window.confirm("Are you sure you want to remove this student registration?")) return;
        deleteStudentRegistration(offering, rollNumber);
    };

    return (
        <div className="registration-container">
            <h2> <CircleUserRound />Student Registration</h2>

            <div className="registration-form">
                <h3>Register New Student</h3>
                <select value={selectedOffering} onChange={(e) => setSelectedOffering(e.target.value)}>
                    <option value="">Select Course Offering</option>
                    {courseOfferings.map((off, idx) => (
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
                <button className="registration-button" onClick={handleRegister}>Register Student</button>
            </div>

            {showSuccess && (
                <div className="registration-success">
                    <CircleCheckBig size={15} /> Student registered successfully!
                </div>
            )}

            {selectedOffering && (
                <div>
                    <h4> <TableOfContents /> Registered Students for: {selectedOffering}</h4>
                    <ul>
                        {(studentRegistrations[selectedOffering] || []).map((student, i) => (

                            <li className="registration-list" key={i}>
                                <span className="registration-list-item"> <UserRound size={25} fill="black" color="white" /> {student.name} (Roll No: {student.rollNumber})</span>
                                <button className="remove-button"
                                    onClick={() => handleDeleteRegistration(selectedOffering, student.rollNumber)}>
                                    Remove
                                </button>
                            </li>

                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StudentRegistration;
