// src/CourseOfferingManager.jsx
import React, { useState, useEffect } from "react";
import "./Styles/courseOfferingManager.css";

const OFFERING_KEY = "course_offerings";
const COURSE_KEY = "courses";
const TYPE_KEY = "course_types";

const CourseOfferingManager = () => {
    const [offerings, setOfferings] = useState(() => {
        const saved = localStorage.getItem(OFFERING_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [courses, setCourses] = useState([]);
    const [courseTypes, setCourseTypes] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem(COURSE_KEY) || "[]");
        const storedTypes = JSON.parse(localStorage.getItem(TYPE_KEY) || "[]");
        setCourses(storedCourses);
        setCourseTypes(storedTypes);
    }, []);

    useEffect(() => {
        localStorage.setItem(OFFERING_KEY, JSON.stringify(offerings));
    }, [offerings]);

    const addOffering = () => {
        if (!selectedCourse || !selectedType) return alert("Select both values");
        const newOffering = `${selectedType} - ${selectedCourse}`;
        setOfferings([...offerings, newOffering]);
        setSelectedCourse("");
        setSelectedType("");
    };

    const updateOffering = () => {
        if (editIndex === null || !selectedCourse || !selectedType) return;
        const updated = [...offerings];
        updated[editIndex] = `${selectedType} - ${selectedCourse}`;
        setOfferings(updated);
        setEditIndex(null);
        setSelectedCourse("");
        setSelectedType("");
    };

    const deleteOffering = (index) => {
        if (!window.confirm("Delete this offering?")) return;
        setOfferings(offerings.filter((_, i) => i !== index));
    };

    return (
        <div className="offering-manager-container">
            <h2>Course Offering Management</h2>

            <div className="offering-form">
                <h3>Create New Offering</h3>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="">Select Course Type</option>
                    {courseTypes.map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                    ))}
                </select>

                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">Select Course</option>
                    {courses.map((course, idx) => (
                        <option key={idx} value={course}>{course}</option>
                    ))}
                </select>

                {editIndex === null ? (
                    <button onClick={addOffering}>Add Offering</button>
                ) : (
                    <button onClick={updateOffering}>Update Offering</button>
                )}
            </div>

            <ul>
                {offerings.map((offering, idx) => (
                    <li key={idx}>
                        <span>{offering}</span>
                        <div>
                            <button
                                onClick={() => {
                                    const [type, course] = offering.split(" - ");
                                    setSelectedCourse(course);
                                    setSelectedType(type);
                                    setEditIndex(idx);
                                }}
                            >
                                Edit
                            </button>
                            <button onClick={() => deleteOffering(idx)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseOfferingManager;
