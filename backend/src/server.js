const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/students");
require("dotenv").config();
const sequelize = require("./config/database");
const User = require("./models/User");
const Task = require("./models/Task");


const app = express();
app.use(cors());
app.use(express.json());

// Define relationships
// User.hasMany(Task, { foreignKey: "studentId", as: "tasks" });
// Task.belongsTo(User, { foreignKey: "studentId", as: "student" });

// Sync the database
sequelize
  .sync({ alter: true }) // { force: true } will drop and recreate tables (use only in dev)
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });




app.use("/api", UserRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

app.listen(5000, () => console.log("Backend running on port 5050"));






