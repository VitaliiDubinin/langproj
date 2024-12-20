import React, { useState } from "react";

const AnswerQuestions = ({ questions }) => {
  const [answers, setAnswers] = useState([]);

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // Handle submission of answers to the backend
    console.log("Submitted Answers:", answers);
  };

  return (
    <div>
      <h2>Answer Questions</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          <input
            type="text"
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
};

export default AnswerQuestions;
