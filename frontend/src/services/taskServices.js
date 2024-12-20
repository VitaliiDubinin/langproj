// src/services/taskService.js
export const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/teacher/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      return data.students;
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };
  