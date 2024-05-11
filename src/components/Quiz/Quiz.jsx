import React from "react";
import "./Quiz.css";

export default function Quiz() {
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div className="quiz">
      <h1>Quiz</h1>
    </div>
  );
}
