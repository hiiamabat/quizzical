import React, { useState, useEffect } from "react";
import "./Quiz.css";

export default function Quiz({ quizData, getNewQuizData }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuizData, setCurrentQuizData] = useState([]);

  useEffect(() => {
    setCurrentQuizData(quizData);
  }, [quizData]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const countCorrectAnswers = () => {
    let correctCount = 0;
    currentQuizData.forEach((question) => {
      if (selectedAnswers[question.id] === question.correct_answer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handlePlayNewGame = () => {
    getNewQuizData();
    setShowResults(false);
    setSelectedAnswers({});
  };

  return (
    <div className="quiz">
      <form>
        {currentQuizData &&
          currentQuizData.map((question, index) => (
            <div key={index}>
              <fieldset>
                <legend>
                  <h2>{question.question}</h2>
                </legend>
                <div className="answers">
                  {question.answers.map((answer, ansIndex) => {
                    const isSelected = selectedAnswers[question.id] === answer;
                    const isCorrect = answer === question.correct_answer;
                    let backgroundColor = "";
                    let opacity = 1;
                    let color = "";
                    let border = "";

                    if (showResults) {
                      if (isCorrect) {
                        backgroundColor = "#94D7A2";
                        border = "none";
                      } else if (isSelected && !isCorrect) {
                        backgroundColor = "#F8BCBC";
                        border = "none";
                      } else {
                        opacity = 0.5;
                      }
                    }

                    if (!showResults) {
                      backgroundColor = isSelected ? "#D6DBF5" : "";
                      border = isSelected ? "none" : "2px solid #293264";
                    }

                    return (
                      <label
                        key={ansIndex}
                        htmlFor={`${question.id}_${answer}`}
                        className="radio-button"
                        style={{
                          backgroundColor,
                          opacity,
                          color,
                          border,
                          pointerEvents: showResults ? "none" : "auto",
                        }}
                      >
                        <input
                          type="radio"
                          id={`${question.id}_${answer}`}
                          name={answer}
                          value={answer}
                          checked={isSelected}
                          onChange={() =>
                            handleAnswerSelect(question.id, answer)
                          }
                        />
                        {answer}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          ))}
      </form>
      {!showResults && (
        <button className="btn" onClick={checkAnswers}>
          Check Answers
        </button>
      )}
      {showResults && (
        <div className="results">
          <p>
            You got {countCorrectAnswers()} out of {currentQuizData.length}{" "}
            right
          </p>
          <button className="btn" onClick={handlePlayNewGame}>
            Play New Game
          </button>
        </div>
      )}
    </div>
  );
}
