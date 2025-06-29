// src/CourseOfferingManager.jsx
import React, { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import "./Styles/courseOfferingManager.css";
import { NotebookTabs } from "lucide-react";

const CourseOfferingManager = () => {
    const {
        courses,
        courseTypes,
        courseOfferings,
        addCourseOffering,
        updateCourseOffering,
        deleteCourseOffering
    } = useCourseContext();

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const handleAddOffering = () => {
        try {
            addCourseOffering(selectedType, selectedCourse);
            setSelectedCourse("");
            setSelectedType("");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdateOffering = () => {
        try {
            updateCourseOffering(editIndex, selectedType, selectedCourse);
            setEditIndex(null);
            setSelectedCourse("");
            setSelectedType("");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteOffering = (index) => {
        if (!window.confirm("Delete this offering?")) return;
        deleteCourseOffering(index);
    };

    return (
        <div className="offering-manager-container">
            <h2> <NotebookTabs />Course Offering Management</h2>

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
                    <button onClick={handleAddOffering}>Add Offering</button>
                ) : (
                    <button onClick={handleUpdateOffering}>Update Offering</button>
                )}
            </div>

            <ul>
                {courseOfferings.map((offering, idx) => (
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
                            <button onClick={() => handleDeleteOffering(idx)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseOfferingManager;
