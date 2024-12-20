import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const navigate = useNavigate();
  
    const handleRegister = async () => {
      const success = await registerUser(email, password, role);
      if (success) {
        alert("Registration successful! You can now log in.");
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <button onClick={handleRegister}>Register</button>
      </div>
    );
  };
  
  export default Register;