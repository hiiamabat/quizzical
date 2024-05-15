import React, { useState, useEffect } from "react";
import Start from "./components/Start/Start";
import Quiz from "./components/Quiz/Quiz";
import "./App.css";
import he from "he";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizData, setQuizData] = useState(null);

  const getQuizData = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy"
      );
      const data = await response.json();
      const questions = data.results.map((question, index) => {
        let answers;
        if (question.type === "boolean") {
          answers = [
            he.decode(question.correct_answer),
            he.decode(question.incorrect_answers[0]),
          ];
        } else {
          answers = [
            he.decode(question.correct_answer),
            ...question.incorrect_answers.map(he.decode),
          ].sort(() => Math.random() - 0.5);
        }
        return {
          id: index++,
          question: he.decode(question.question),
          correct_answer: he.decode(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map(he.decode),
          answers,
          selectedAnswer: "",
        };
      });
      setQuizData(questions);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    // Make sure to not fetch if the data is already there
    if (!quizData) {
      getQuizData();
    }
  }, [quizData]);

  function beginPlay() {
    setQuizStarted(true);
  }

  return quizStarted ? (
    <Quiz quizData={quizData} getNewQuizData={getQuizData} />
  ) : (
    <Start beginPlay={beginPlay} />
  );
}

export default App;
