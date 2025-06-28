// src/CourseOfferingManager.jsx
import React, { useState, useEffect } from "react";

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

    // Load courses & course types
    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem(COURSE_KEY) || "[]");
        const storedTypes = JSON.parse(localStorage.getItem(TYPE_KEY) || "[]");
        setCourses(storedCourses);
        setCourseTypes(storedTypes);
    }, []);

    // Save offerings
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
        <div style={{ padding: 20 }}>
            <h2>Course Offering Management</h2>

            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Select Course Name</option>
                {courseTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                ))}
            </select>

            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select Course Type</option>
                {courses.map((course, idx) => (
                    <option key={idx} value={course}>{course}</option>
                ))}
            </select>

            {editIndex === null ? (
                <button onClick={addOffering}>Add Offering</button>
            ) : (
                <button onClick={updateOffering}>Update Offering</button>
            )}

            <ul>
                {offerings.map((offering, idx) => (
                    <li key={idx}>
                        {offering}
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseOfferingManager;
