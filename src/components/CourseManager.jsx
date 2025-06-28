// src/CourseManager.jsx
import React, { useState, useEffect } from "react";
import "./Styles/courseManager.css";

const STORAGE_KEY = "courses";

const CourseManager = () => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [newCourse, setNewCourse] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  const addCourse = () => {
    if (!newCourse.trim()) return alert("Course name cannot be empty!");
    setCourses([...courses, newCourse.trim()]);
    setNewCourse("");
  };

  const updateCourse = () => {
    if (!editValue.trim()) return alert("Updated name cannot be empty!");
    const updated = [...courses];
    updated[editIndex] = editValue.trim();
    setCourses(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const deleteCourse = (index) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setCourses(courses.filter((_, i) => i !== index));
  };

  return (
    <div className="course-manager-container">
      <h2>Course Manager</h2>
      <input
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        placeholder="Add new course (e.g., English, Urdu)"
      />
      <button onClick={addCourse}>Add</button>

      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={updateCourse}>Save</button>
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
                  <button onClick={() => deleteCourse(index)}>Delete</button>
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
