import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const StudentPage = () => {
  const { studentId } = useParams();
  const location = useLocation();
  const { role } = location.state || { role: "student" };
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:5050/api/student/${studentId}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setTasks(data.tasks);
        } else {
          alert("Failed to fetch tasks. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("An error occurred while fetching tasks.");
      }
    };

    fetchTasks();
  }, [studentId]);

  return (
    <div>
      <h2>{role === "student" ? "Your Tasks" : `Managing Tasks for Student #${studentId}`}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
      {role === "teacher" && (
        <div>
          <h3>Set New Task</h3>
          {/* Include widgets for task management */}
        </div>
      )}
    </div>
  );
};

export default StudentPage;

