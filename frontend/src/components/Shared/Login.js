// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { authenticateUser } from "../../services/authService";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState(""); // Add password state
//   const [role, setRole] = useState("student");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     const isAuthenticated = await authenticateUser(email, password, role); // Include password
//     console.log("isAuthenticated",isAuthenticated)
//     if (isAuthenticated) {
//         localStorage.setItem("token", isAuthenticated.token);
//       if (role === "teacher") {
//         navigate("/select-student");
//       } else {
//         navigate("/student-dashboard");
//       }
//     } else {
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password" // Add password field
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="teacher">Teacher</option>
//         <option value="student">Student</option>
//       </select>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "teacher") {
        navigate("/teacher-dashboard");
      } else if (role === "student") {
        navigate("/student-page");
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const { success, token, role } = await authenticateUser(email, password);

      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else if (role === "student") {
          navigate("/student-page");
        } else {
          alert("Invalid role detected.");
        }
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;


