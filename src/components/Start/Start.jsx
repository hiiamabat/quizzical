import React from "react";
import "./Start.css";

export default function Start(props) {
  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button className="btn" onClick={props.beginPlay}>
        Start Quiz
      </button>
    </div>
  );
}
