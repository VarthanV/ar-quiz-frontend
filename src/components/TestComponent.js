import React, { useEffect, useState } from "react";
import { testRoute } from "./helper";
import ScoreShower from "./ScoreShower";
import CompletedOption from "./CompletedOption";
import EndPage from "./EndPage";
import Navbar from "./Navbar";
export default function TestComponent(props) {
  const pk = props.match.params.pk;
  const [score, setScore] = useState(0);
  const [questionIdx, setQuestionIDx] = useState(0);
  const [questions, setQuestion] = useState([]);
  const [wrong, setWrong] = useState(0);
  let currentQues = questions[questionIdx];
  const [end, setEnd] = useState(false);
  useEffect(() => {
    fetch(testRoute + pk)
      .then(res => res.json())
      .then(data => {
        setQuestion(data["questions"]);
      });
  }, [pk]);

  const handleAnswer = e => {
    console.log(e.target.value);

    if (e.target.value === currentQues.answer) {
      alert("Correct ans");
      setScore(score + 1);
      questions[questionIdx].completed = true;
     
    } else {
      alert("Wrong ans");
      setWrong(wrong + 1);
      questions[questionIdx].completed = true;

     
    }
  };
  const handleNext = () => {
    if (questionIdx !== questions.length - 1) {
      setQuestionIDx(questionIdx + 1);
    } else {
      // eslint-disable-next-line no-restricted-globals
      var result = confirm("Are you sure want to quit");
      if (result) {
        setEnd(true);
      }
    }
  };
  const handlePrevious = () => {
    if (questionIdx !== 0) {
      setQuestionIDx(questionIdx - 1);
    }
  };
  return (
    <div>
      <Navbar/>
      {end === false ? (
        <div className="container">
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <ScoreShower score={score}></ScoreShower>
          </div>

          {currentQues === undefined ? (
            <h1> Loading</h1>
          ) : (
            <div
              className="card text-center container"
              style={{ marginTop: "50px" }}
            >
              <div className="card-body">
                <h5 className="card-title">{currentQues.question}</h5>
                {currentQues.completed === undefined ||
                currentQues.completed === false ? (
                  currentQues.options.map(item => (
                    <button onClick={e => handleAnswer(e)} value={item}>
                      {item}
                    </button>
                  ))
                ) : (
                  <CompletedOption
                    correctOption={currentQues.answer}
                    options={currentQues.options}
                  ></CompletedOption>
                )}
              </div>
              <button onClick={handlePrevious}> Previous</button>{" "}
              <button onClick={handleNext}> Next</button>
            </div>
          )}
        </div>
      ) : (
        <EndPage
          score={score}
          total={questions.length + 1}
          wrongAnswers={wrong}
        ></EndPage>
      )}
    </div>
  );
}
