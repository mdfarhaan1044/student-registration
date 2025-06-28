// src/CourseTypeManager.jsx

import React, { useState, useEffect } from "react";

const STORAGE_KEY = "course_types";

const CourseTypeManager = () => {
    const [courseTypes, setCourseTypes] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [newType, setNewType] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    // Save on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courseTypes));
    }, [courseTypes]);

    const addCourseType = () => {
        if (!newType.trim()) return alert("Course type cannot be empty!");
        setCourseTypes([...courseTypes, newType.trim()]);
        setNewType("");
    };

    const updateCourseType = () => {
        if (!editValue.trim()) return alert("Updated name cannot be empty!");
        const updated = [...courseTypes];
        updated[editIndex] = editValue.trim();
        setCourseTypes(updated);
        setEditIndex(null);
        setEditValue("");
    };

    const deleteCourseType = (index) => {
        if (!window.confirm("Are you sure you want to delete this?")) return;
        setCourseTypes(courseTypes.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Course Type Management</h2>
            <input
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="Add new course type"
            />
            <button onClick={addCourseType}>Add</button>

            <ul>
                {courseTypes.map((type, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={updateCourseType}>Save</button>
                                <button onClick={() => setEditIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {type}
                                <button onClick={() => {
                                    setEditIndex(index);
                                    setEditValue(type);
                                }}>Edit</button>
                                <button onClick={() => deleteCourseType(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseTypeManager;
