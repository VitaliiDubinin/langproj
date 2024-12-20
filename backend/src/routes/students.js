// const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware");

// const router = express.Router();

// // Protected Route: Fetch Tasks
// router.get("/tasks", authMiddleware, async (req, res) => {
//   try {
//     // Logic to fetch tasks assigned to the student
//     res.status(200).json({ success: true, tasks: [] });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Task = require("../models/Task"); // Assuming a Task model exists

const router = express.Router();

router.get("/student/:studentId/tasks", authMiddleware, async (req, res) => {
  const { studentId } = req.params;

  if (req.user.role === "student" && req.user.id !== parseInt(studentId)) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  try {
    const tasks = await Task.findAll({ where: { studentId } });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Failed to fetch tasks" });
  }
});

module.exports = router;
