import React, { useState } from "react";
import Start from "./components/Start/Start";
import Quiz from "./components/Quiz/Quiz";
import "./App.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  function beginPlay() {
    setQuizStarted(true);
  }

  return quizStarted ? <Quiz /> : <Start beginPlay={beginPlay} />;
}

export default App;
