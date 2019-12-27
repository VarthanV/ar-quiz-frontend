import React, { useState } from "react";

export default function CreateTest() {
  const [name, setName] = useState("");
  const [quesCount, setQuesCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [dummy, setDummy] = useState(0);

  const handleChange = (setFunc, value) => {
    setFunc(value);
  };
  const handleQuesChange = (value, index) => {
    questions[index].question = value;
    console.log(questions);
    localStorage.setItem("questions", questions);
  };
  const handleOptionChange = (index, value) => {
    let optionCount = questions[index].optionCount;

    questions[index].options[optionCount - 1] = value;

    console.log(questions);
  };
  const handleOptionIncrement = (e, index) => {
    e.preventDefault();
    questions[index].optionCount++;
    setDummy(dummy + 1);
  };
  const handleQuestionCount = e => {
    e.preventDefault();
    questions[quesCount] = {};
    questions[quesCount].question = "";
    questions[quesCount].options = [];
    questions[quesCount].optionCount = 0;
    setQuesCount(quesCount + 1);
  };
  return (
    <div className="container card">
      <div className="card-body">
        <form>
          <input
            type="text"
            value={name}
            onChange={e => handleChange(setName, e.target.value)}
          />{" "}
          <br></br>
          <button onClick={e => handleQuestionCount(e)}> Add Question</button>
          {[...Array(quesCount)].map((e, i) => (
            <div>
              <h4> Question {i + 1}</h4> <br></br>
              <input
                key={i}
                onChange={e => handleQuesChange(e.target.value, i)}
              ></input>{" "}
              <br></br>
              <button onClick={e => handleOptionIncrement(e, i)}>
                {" "}
                Add options{" "}
              </button>{" "}
              <br></br>
              {[...Array(questions[i].optionCount)].map((e, i) => (
                <div>
                  <h4> Option {i + 1}</h4> <br></br>
                  <input
                    type="text"
                    key={i}
                    onChange={e => handleOptionChange(i, e.target.value)}
                  ></input>
                </div>
              ))}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
