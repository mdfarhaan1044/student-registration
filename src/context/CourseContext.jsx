import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState(() => {
    const saved = localStorage.getItem('course_types');
    return saved ? JSON.parse(saved) : [];
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : [];
  });

  const [courseOfferings, setCourseOfferings] = useState(() => {
    const saved = localStorage.getItem('course_offerings');
    return saved ? JSON.parse(saved) : [];
  });

  const [studentRegistrations, setStudentRegistrations] = useState(() => {
    const saved = localStorage.getItem('registrations');
    return saved ? JSON.parse(saved) : {};
  });

  // Save course types to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('course_types', JSON.stringify(courseTypes));
  }, [courseTypes]);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  // Save course offerings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('course_offerings', JSON.stringify(courseOfferings));
  }, [courseOfferings]);

  // Save student registrations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(studentRegistrations));
  }, [studentRegistrations]);

  // Course Type Management Functions
  const addCourseType = (newType) => {
    if (!newType.trim()) {
      throw new Error('Course type cannot be empty!');
    }
    setCourseTypes(prev => [...prev, newType.trim()]);
  };

  const updateCourseType = (index, updatedValue) => {
    if (!updatedValue.trim()) {
      throw new Error('Updated name cannot be empty!');
    }
    setCourseTypes(prev => {
      const updated = [...prev];
      updated[index] = updatedValue.trim();
      return updated;
    });
  };

  const deleteCourseType = (index) => {
    setCourseTypes(prev => prev.filter((_, i) => i !== index));
  };

  // Course Management Functions
  const addCourse = (newCourse) => {
    if (!newCourse.trim()) {
      throw new Error('Course name cannot be empty!');
    }
    setCourses(prev => [...prev, newCourse.trim()]);
  };

  const updateCourse = (index, updatedValue) => {
    if (!updatedValue.trim()) {
      throw new Error('Updated name cannot be empty!');
    }
    setCourses(prev => {
      const updated = [...prev];
      updated[index] = updatedValue.trim();
      return updated;
    });
  };

  const deleteCourse = (index) => {
    setCourses(prev => prev.filter((_, i) => i !== index));
  };

  // Course Offering Management Functions
  const addCourseOffering = (courseType, course) => {
    if (!courseType || !course) {
      throw new Error('Both course type and course must be selected!');
    }
    const newOffering = `${courseType} - ${course}`;
    setCourseOfferings(prev => [...prev, newOffering]);
  };

  const updateCourseOffering = (index, courseType, course) => {
    if (!courseType || !course) {
      throw new Error('Both course type and course must be selected!');
    }
    const updatedOffering = `${courseType} - ${course}`;
    setCourseOfferings(prev => {
      const updated = [...prev];
      updated[index] = updatedOffering;
      return updated;
    });
  };

  const deleteCourseOffering = (index) => {
    setCourseOfferings(prev => prev.filter((_, i) => i !== index));
  };

  // Student Registration Management Functions
  const addStudentRegistration = (offering, name, rollNumber) => {
    if (!offering || !name || !rollNumber) {
      throw new Error('All fields are required!');
    }

    // Check for duplicate BEFORE calling setState
    const current = studentRegistrations[offering] || [];
    const alreadyRegistered = current.some(
      (s) => s.rollNumber === rollNumber
    );
    if (alreadyRegistered) {
      throw new Error('This roll number is already registered for this course offering.');
    }

    const newEntry = { name, rollNumber };
    setStudentRegistrations(prev => {
      const updated = { ...prev };
      if (!updated[offering]) {
        updated[offering] = [];
      }
      updated[offering].push(newEntry);
      return updated;
    });
  };

  const deleteStudentRegistration = (offering, rollNumber) => {
    setStudentRegistrations(prev => {
      const updated = { ...prev };
      if (updated[offering]) {
        updated[offering] = updated[offering].filter(
          (s) => s.rollNumber !== rollNumber
        );
      }
      return updated;
    });
  };

  const value = {
    // Course Types
    courseTypes,
    addCourseType,
    updateCourseType,
    deleteCourseType,
    
    // Courses
    courses,
    addCourse,
    updateCourse,
    deleteCourse,

    // Course Offerings
    courseOfferings,
    addCourseOffering,
    updateCourseOffering,
    deleteCourseOffering,

    // Student Registrations
    studentRegistrations,
    addStudentRegistration,
    deleteStudentRegistration,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}; 