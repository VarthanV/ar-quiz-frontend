import React from "react";

export default function EndPage({ score, wrongAnswers ,total}) {
  return (
    <div>
      <h1> Your Score is {score/total}</h1> <br/>
      <h1>   The number of Wrong Answers are {wrongAnswers} </h1>
    </div>
  );
}
