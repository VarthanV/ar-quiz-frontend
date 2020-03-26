import React, { useState, useEffect } from "react";
import { addTestRoute } from "./helper";
import { useHistory } from 'react-router-dom';
export default function CreateTest() {
  const styles = {
    whiteText: {
      color: "white"
    }
  }
  const [name, setName] = useState("");
  const [quesCount, setQuesCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [dummy, setDummy] = useState(0);
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('author') === false || localStorage.getItem('author') === undefined || localStorage.getItem('author') === null) {
      history.push('/');
    }
    else {
      setLoading(false)
    }

  }, [])
  const handleChange = (setFunc, value) => {
    setFunc(value);
  };
  const handleQuesChange = (value, index) => {
    questions[index].question = value;
    console.log(questions);
    setDummy(dummy + 1);
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
  const handleCorrectOptionChange = (index, value) => {
    questions[index].correct_option = value;

    console.log(questions);

  }
  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      name: name,
      questions: questions,
    }
    fetch(addTestRoute, { method: "post", body: JSON.stringify(data) }).then(res => res.json()).then(data => {
      if (data['success']) {
        alert("The Test has been created successfully");
        history.push('/');
      }
    }).catch(err => console.log(err));


  };
  return (
    <div className="container card ml-10" style={styles.whiteText}>
      {!isLoading ? <div className="card-body">
        <form onSubmit={e => handleSubmit(e)}>
          <h3 style={styles.whiteText} className="ml-3"> Test Name   </h3>
          <input
            type="text"
            value={name}
            onChange={e => handleChange(setName, e.target.value)}
          />{" "}
          <br></br>
          <button onClick={e => handleQuestionCount(e)} className="button-primary mr-3 mt-3"> Add Question</button>
          {[...Array(quesCount)].map((e, i) => (
            <div>
              <h4> Question {i + 1}</h4> <br></br>
              <h3> {questions[i].question}</h3>
              <input
                key={i}
                onChange={e => handleQuesChange(e.target.value, i)}
              ></input>{" "}
              <br></br>
              <h4> Correct option</h4>
              <input type="text" key={i} onChange={(e) => handleCorrectOptionChange(i, e.target.value)}></input>
              <button className="btn btn-primary " onClick={e => handleOptionIncrement(e, i)}>
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
                    onChange={e =>
                      handleOptionChange(quesCount - 1, e.target.value)
                    }
                  ></input>
                </div>
              ))}
            </div>
          ))}
          <button type="submit" className="button-success mt-5 ml-50 text-center  "> Submit </button>
        </form>
      </div> : <div></div>}
    </div>
  );
}
