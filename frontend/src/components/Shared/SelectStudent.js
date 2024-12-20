import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "../../services/taskServices";

const SelectStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getStudents = async () => {
      const studentList = await fetchStudents();
      setStudents(studentList);
    };
    getStudents();
  }, []);

  const handleSelectStudent = () => {
    if (selectedStudent) {
      navigate(`/teacher-dashboard?student=${selectedStudent}`);
    }
  };

  return (
    <div>
      <h2>Select a Student</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} onClick={() => setSelectedStudent(student.id)}>
            {student.name}
          </li>
        ))}
      </ul>
      <button onClick={handleSelectStudent} disabled={!selectedStudent}>
        Go to Student's Page
      </button>
    </div>
  );
};

export default SelectStudent;