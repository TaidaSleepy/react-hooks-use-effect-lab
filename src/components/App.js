import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions] = useState(quiz); // only need questions array
  const [currentQuestionId, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  function handleQuestionAnswered(correct) {
    if (correct) {
      setScore((score) => score + 1);
    }

    // Move to next question
    if (currentQuestionId < questions.length) {
      setCurrentQuestion((id) => id + 1);
    } else {
      setCurrentQuestion(null); // game over
    }
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;