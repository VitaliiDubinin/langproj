// import React, { useState } from "react";
// import UploadPDF from "./UploadPDF";

// const TeacherDashboard = () => {
//   const [fileProcessed, setFileProcessed] = useState(false);
//   const [generatedQuestions, setGeneratedQuestions] = useState([]);

//   const handleProcessingComplete = () => {
//     setFileProcessed(true);
//   };

//   const handleGenerateQuestions = async (mode) => {
//     const options =
//       mode === "options" ? prompt("Enter options for question generation") : "";

//     try {
//       const response = await fetch("http://localhost:5050/api/teacher/generate-questions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ mode, options }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert("Questions generated successfully!");
//         setGeneratedQuestions(data.questions); // Update state to display questions
//       } else {
//         alert(`Error generating questions: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error generating questions:", error);
//       alert("An error occurred while generating questions.");
//     }
//   };

//   return (
//     <div>
//       <h2>Teacher Dashboard</h2>
//       {!fileProcessed ? (
//         <UploadPDF onProcessingComplete={handleProcessingComplete} />
//       ) : (
//         <div>
//           <button onClick={() => handleGenerateQuestions("default")}>
//             Write 10 questions on base of text
//           </button>
//           <button onClick={() => handleGenerateQuestions("options")}>
//             Ask 10 questions with options
//           </button>
//           <div>
//             {generatedQuestions.length > 0 && (
//               <div>
//                 <h3>Generated Questions:</h3>
//                 <ul>
//                   {generatedQuestions.map((question, index) => (
//                     <li key={index}>{question}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5050/api/teacher/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setStudents(data.students);
        } else {
          alert("Failed to fetch students. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        alert("An error occurred while fetching students.");
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (studentId) => {
    navigate(`/student-page/${studentId}`, { state: { role: "teacher" } });
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} ({student.email})
            <button onClick={() => handleStudentClick(student.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;



