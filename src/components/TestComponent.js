import React, { useEffect, useState } from "react";
import { testRoute } from "./helper";
import ScoreShower from "./ScoreShower";
import CompletedOption from "./CompletedOption";
import EndPage from "./EndPage";
import { useHistory } from "react-router-dom";
export default function TestComponent(props) {
  const pk = props.match.params.pk;
  const [score, setScore] = useState(0);
  const [questionIdx, setQuestionIDx] = useState(0);
  const [questions, setQuestion] = useState([]);
  const [wrong, setWrong] = useState(0);
  let currentQues = questions[questionIdx];
  const [end, setEnd] = useState(false);
  const history = useHistory();
  const [completed, setCompleted] = useState(false);
  const [dummy,setDummy] =useState(0);

  //const [incompleteQuestions, setIncompleteQuestions] = useState([]);
  useEffect(() => {
    if (
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") === null
    ) {
      alert("Please Login to continue");
      history.push("/login");
    } else {
      fetch(testRoute + pk)
        .then(res => res.json())
        .then(data => {
          setQuestion(data["questions"]);
        });
    }
  }, []);

  const handleAnswer = e => {
    let newQues = questions;
    newQues[questionIdx].choosenAns = e.target.value;
    setQuestion(newQues);
    setDummy(dummy+1);
    console.log(questions);
  };
  const evaluvateAnswers = () => {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === questions[i].choosenAns) {
        questions[i].completed = true;
        setScore(score + 1);
      } else {
        questions[i].completed = true;
      }
      console.log(score);
    }
  };
  const completeMockTest = () => {
    
    evaluvateAnswers();
    setCompleted(true);

    
  };
  const handleNext = () => {
    if (questionIdx === questions.length - 1) {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("Are you sure want to end the test");
      if (result) {
        evaluvateAnswers();
        setCompleted(true);
      }
    } else {
      setQuestionIDx(parseInt(questionIdx + 1));
    }
  };
  const handleIndexChange = e => {
    console.log(e.target.value);
    setQuestionIDx(parseInt(e.target.value));
  };

  const handlePrevious = () => {
    if (questionIdx !== 0) {
      setQuestionIDx(questionIdx - 1);
    }
  };
  const markForlater = () => {
    questions[questionIdx].completed = false;
    handleNext();
  };
  return (
    <div>
      {end === false ? (
        <div className="container">
          <div className="row">
            <div className="col">
              {currentQues === undefined ? (
                <h1> Loading</h1>
              ) : (
                <div className="card" style={{ marginTop: "50px" }}>
                  <div className="card-body">
                    <h1
                      className="float-right display-4"
                      style={{ color: "white" }}
                    >
                      {" "}
                      {questionIdx + 1}/{questions.length}
                    </h1>
                    <h2 style={{ color: "white" }}>
                      Question {questionIdx + 1}
                    </h2>
                    <hr
                      style={{
                        width: "85%",
                        marginLeft: "0px",
                        backgroundColor: "white"
                      }}
                    ></hr>
                    <p style={{ color: "white" }}>{currentQues.question}</p>
                    {currentQues.completed === false ||
                    currentQues.completed === undefined ? (
                      currentQues.options.map(item => (
                        <button
                          className= { currentQues.choosenAns === item ?"button-warning mr-3":"button-primary mr-3 "}
                          onClick={e => handleAnswer(e)}
                          value={item}
                        >
                          {item}
                        </button>
                      ))
                    ) : (
                      <CompletedOption
                        options={currentQues.options}
                        correctOption={currentQues.answer}
                      ></CompletedOption>
                    )}
                    <hr
                      style={{
                        width: "85%",
                        marginLeft: "0px",
                        marginBottom: "-10px",
                        backgroundColor: "white"
                      }}
                    ></hr>
                  </div>
                  <div className="container ml-1">
                    <button
                      className="button-primary mr-3 pl-3 pr-3 pt-2 pb-2"
                      onClick={handlePrevious}
                    >
                      <i className="fa fa-arrow-left mr-2"></i> Previous
                      Question
                    </button>
                    <button
                      className="button-primary mr-3 pl-3 pr-3 pt-2 pb-2"
                      onClick={handleNext}
                    >
                      Next Question <i className="fa fa-arrow-right ml-2"></i>{" "}
                    </button>
                    <button
                      className="button-warning mr-3 pl-3 pr-3 pt-2 pb-2"
                      onClick={markForlater}
                    >
                      Mark for Review <i className="fa fa-clock-o ml-1"></i>{" "}
                    </button>
                  {completed ===false ?  <button
                      className="button-success mr-3 pl-3 pr-3 pt-2 pb-2"
                      onClick={completeMockTest}
                    >
                      Complete Mock Test <i className="fa fa-check ml-2"></i>{" "}
                    </button>:<button className="button-primary" onClick={() => setEnd(true)}> Get reports </button>}  
                  </div>
                  <br></br>
                </div>
              )}
              <br></br>
              <div className="card p-4">
                <h2 className="mb-0" style={{ color: "white" }}>
                  Mock Test Instructions
                </h2>
                <hr className="mt-1" style={{ backgroundColor: "white" }}></hr>
                <p style={{ color: "white" }}>
                  Mock test instructions will be populated here
                </p>
              </div>
            </div>

            <div className="col-lg-3">
              <div style={{ textAlign: "center", paddingTop: "50px" }}>
                <ScoreShower score={score}></ScoreShower>
              </div>
              <br></br>
              {questions.map((item, index) => {
                return item.completed === undefined ? (
                  <button
                    className="mark-button-primary mr-1"
                    value={index}
                    onClick={e => handleIndexChange(e)}
                  >
                    {" "}
                    {index}
                  </button>
                ) : item.completed === false ? (
                  <button
                    className="mark-button-warning mr-1"
                    value={index}
                    onClick={e => handleIndexChange(e)}
                  >
                    {" "}
                    {index}
                  </button>
                ) : item.completed === true && item.answeredCorrect === true ? (
                  <button
                    className="mark-button-success mr-1"
                    value={index}
                    onClick={e => handleIndexChange(e)}
                  >
                    {" "}
                    {index}
                  </button>
                ) : (
                  <button
                    value={index}
                    className="mark-button-danger mr-1"
                    onClick={e => handleIndexChange(e)}
                  >
                    {" "}
                    {index}
                  </button>
                );
              })}
            </div>
          </div>
          <br></br>
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
