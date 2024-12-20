// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Shared/Navbar";
// import Login from "./components/Shared/Login";
// import Register from "./components/Shared/Register";
// import SelectStudent from "./components/Shared/SelectStudent";
// import TeacherDashboard from "./components/Teacher/TeacherDashboard";
// import StudentDashboard from "./components/Student/StudentDashboard";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/select-student" element={<SelectStudent />} />
//         <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Shared/Login";
import Register from "./components/Shared/Register";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import StudentPage from "./components/Student/StudentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-page/:studentId" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;

