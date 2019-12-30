import React from "react";

export default function EndPage({ score, wrongAnswers, total }) {
const styles= {
  whiteText:{
    color:"white"
  }
}
  return (
    <div>
      <h1 style={styles.whiteText}> Your Score is {score} </h1> <br />
      <h1 style={styles.whiteText}> The number of Wrong Answers are {wrongAnswers} </h1> <br></br>
      
    </div>
  );
}
