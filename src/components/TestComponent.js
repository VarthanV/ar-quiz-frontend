import React, { useEffect, useState } from "react";
import { testRoute, saveProgressRoute } from "./helper";
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
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [end, setEnd] = useState(false);
  const history = useHistory();
  const [completed, setCompleted] = useState(false);
  const [dummy, setDummy] = useState(0);

  //const [incompleteQuestions, setIncompleteQuestions] = useState([]);
  useEffect(() => {
    if (
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") === null
    ) {
      alert("Please Login to continue");
      history.push("/login");
    } else {
      console.log("hey");
      fetch(testRoute + pk + '/', {
        method: "POST",
        headers: { "Authorization": localStorage.getItem("token") }
      }).then(res => res.json()).then(data => {

        setQuestion(data['questions'])
        setAlreadyCompleted(data['already_completed'])
        setCompleted(data['already_completed'])
        if (data['already_completed']) {
          console.log("hi");

          
        }


      }).catch(err => console.log(err))
    }
  }, []);

  const reportProgress = () => {
    fetch(saveProgressRoute, {
      method: "POST",
      body: JSON.stringify({
        pk: pk,
        score: score
      }),
      headers: { "Authorization": localStorage.getItem("token") }
    }).then(res => res.json()).then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);

    })
  }

  const handleAnswer = e => {
    let newQues = questions;
    newQues[questionIdx].choosenAns = e.target.value;
    setQuestion(newQues);
    setDummy(dummy + 1);
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

  const markAllComplete = () => {
    for (let i = 0; i < questions.length; i++) {
      questions[i].completed = true;
    }
  }
  const completeMockTest = () => {

    evaluvateAnswers();
    setCompleted(true);
    reportProgress();

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
      {end === false || alreadyCompleted ? (
        <div className="container">
          <div className="row">
            <div className="col">
              {currentQues === undefined ? (
                <h1> Loading</h1>
              ) : (
                  <div className="card mt-5 pb-4">
                    <div className="card-body">
                      <h1 className="float-right h2">{" "}{questionIdx + 1} of {questions.length}
                      </h1>
                      <h2>
                        Question {questionIdx + 1}
                      </h2>
                      <hr></hr>
                      <p>{currentQues.question}</p>
                      { !alreadyCompleted && (currentQues.completed === false ||
                        currentQues.completed === undefined) ? (
                          currentQues.options.map(item => (
                            <button
                              className={currentQues.choosenAns === item ? "btn btn-primary mr-3" : "btn btn-outline-secondary mr-3"}
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
                    {!alreadyCompleted ? <div className="container">
                      <button
                        className="btn btn-primary px-3 py-2 mr-2 mb-2"
                        onClick={handlePrevious}
                      >
                        <i className="fa fa-arrow-left mr-2"></i> Previous
                      Question
                      </button>
                      <button
                        className="btn btn-primary px-3 py-2 mr-2 mb-2"
                        onClick={handleNext}
                      >
                        Next Question <i className="fa fa-arrow-right ml-2"></i>{" "}
                      </button>
                      <button
                        className="btn btn-warning px-3 py-2 mr-2 mb-2"
                        onClick={markForlater}
                      >
                        Mark for Review <i className="fa fa-clock-o ml-1"></i>{" "}
                      </button>
                      {completed === false ? <button
                        className="btn btn-success px-3 py-2 mr-2 mb-2"
                        onClick={completeMockTest}
                      >
                        Complete Mock Test <i className="fa fa-check ml-2"></i>{" "}
                      </button> : <button className="btn btn-primary" onClick={() => setEnd(true)}> Get reports </button>}
                    </div> : <div></div>}
                    <br></br>
                  </div>
                )}
            </div>

            <div className="col-md-4 mt-5">
              <div className="card p-3">
                <h2>Question index</h2>
                <hr className="mt-1"></hr>
                <div className="">
                  {questions.map((item, index) => {
                    return item.completed === undefined ? (
                      <button
                        className="btn btn-primary mr-1"
                        value={index}
                        onClick={e => handleIndexChange(e)}
                      >
                        {" "}
                        {index}
                      </button>
                    ) : item.completed === false ? (
                      <button
                        className="btn btn-warning mr-1"
                        value={index}
                        onClick={e => handleIndexChange(e)}
                      >
                        {" "}
                        {index}
                      </button>
                    ) : item.completed === true && item.answeredCorrect === true ? (
                      <button
                        className="btn btn-success mr-1"
                        value={index}
                        onClick={e => handleIndexChange(e)}
                      >
                        {" "}
                        {index}
                      </button>
                    ) : (
                            <button
                              value={index}
                              className="btn btn-danger mr-1"
                              onClick={e => handleIndexChange(e)}
                            >
                              {" "}
                              {index}
                            </button>
                          );
                  })}
                  <hr></hr>
                  <h5>Instructions</h5>
                  <p>Intruction to candidates will be given here</p>
                </div>
              </div>
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
