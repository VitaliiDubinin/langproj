import React, { useState } from "react";

const AssignTasks = () => {
  const [taskDetails, setTaskDetails] = useState("");

  const handleAssignTask = () => {
    // Call backend API to assign the task
    console.log("Task assigned:", taskDetails);
  };

  return (
    <div>
      <h2>Assign Tasks</h2>
      <textarea
        placeholder="Enter task details"
        value={taskDetails}
        onChange={(e) => setTaskDetails(e.target.value)}
      />
      <button onClick={handleAssignTask}>Assign Task</button>
    </div>
  );
};

export default AssignTasks;
