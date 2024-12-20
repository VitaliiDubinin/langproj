import React, { useState } from "react";

const ConfigureQuestions = () => {
  const [questions, setQuestions] = useState([""]);

  const addQuestion = () => setQuestions([...questions, ""]);
  const updateQuestion = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestions = () => {
    // Call backend API to save the questions
    console.log("Configured Questions:", questions);
  };

  return (
    <div>
      <h2>Configure Questions</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question}
            onChange={(e) => updateQuestion(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSaveQuestions}>Save Questions</button>
    </div>
  );
};

export default ConfigureQuestions;
