// src/CourseManager.jsx
import React, { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import "./Styles/courseManager.css";

const CourseManager = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourseContext();
  const [newCourse, setNewCourse] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddCourse = () => {
    try {
      addCourse(newCourse);
      setNewCourse("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateCourse = () => {
    try {
      updateCourse(editIndex, editValue);
      setEditIndex(null);
      setEditValue("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteCourse = (index) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    deleteCourse(index);
  };

  return (
    <div className="course-manager-container">
      <h2>Course Manager</h2>
      <input
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        placeholder="Add new course (e.g., English, Urdu)"
      />
      <button onClick={handleAddCourse}>Add</button>

      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleUpdateCourse}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{course}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditValue(course);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCourse(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManager;
