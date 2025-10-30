import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [answered, setAnswered] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining === 0 && !answered) {
      setAnswered(true);
      onAnswered(false); // user ran out of time
      return;
    }

    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining, answered, onAnswered]);

  // Handle user clicking an answer
  function handleAnswerClick(selectedAnswer) {
    if (answered) return; // ignore if already answered

    setAnswered(true);

    const correct = selectedAnswer === question.correctAnswer;
    onAnswered(correct);
  }

  return (
    <div>
      <p>{question.question}</p>
      <ul>
        {question.answers.map((answer, i) => (
          <li key={i}>
            <button
              onClick={() => handleAnswerClick(answer)}
              disabled={answered} // disable after answered
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;