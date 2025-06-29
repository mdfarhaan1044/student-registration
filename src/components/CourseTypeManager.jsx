// src/CourseTypeManager.jsx
import React, { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import "./Styles/courseTypeManager.css";

const CourseTypeManager = () => {
    const { courseTypes, addCourseType, updateCourseType, deleteCourseType } = useCourseContext();
    const [newType, setNewType] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleAddCourseType = () => {
        try {
            addCourseType(newType);
            setNewType("");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdateCourseType = () => {
        try {
            updateCourseType(editIndex, editValue);
            setEditIndex(null);
            setEditValue("");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteCourseType = (index) => {
        if (!window.confirm("Are you sure you want to delete this?")) return;
        deleteCourseType(index);
    };

    return (
        <div className="course-type-container">
            <h2>Course Type Management</h2>
            <input
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="Add new course type"
            />
            <button onClick={handleAddCourseType}>Add</button>

            <ul>
                {courseTypes.map((type, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={handleUpdateCourseType}>Save</button>
                                <button onClick={() => setEditIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span>{type}</span>
                                <div>
                                    <button
                                        onClick={() => {
                                            setEditIndex(index);
                                            setEditValue(type);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteCourseType(index)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseTypeManager;
