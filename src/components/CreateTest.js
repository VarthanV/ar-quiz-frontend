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
    <div className="container pt-5">
      <div className="card p-3 p-md-5">
        {!isLoading ? <div className="">
          <form onSubmit={e => handleSubmit(e)}>
            <h3>Test Creation Portal
            <button type="submit" className="btn btn-success text-center float-right ml-2"> Submit </button>
            <button type="submit" className="btn btn-warning text-center float-right">Draft</button>
            </h3>
            <hr className="my-1"></hr>
            <label>Enter the Title for the test</label>
            <input
              type="text"
              value={name}
              className="form-control"
              onChange={e => handleChange(setName, e.target.value)}
            />{" "}
            {[...Array(quesCount)].map((e, i) => (
              <div>
                <hr></hr>
                <div className="card p-4">
                  <h4> Question {i + 1}</h4>
                  <h4> {questions[i].question}</h4>
                  <input
                    key={i}
                    onChange={e => handleQuesChange(e.target.value, i)}
                    className="form-control"
                  ></input>{" "}
                  <hr></hr>
                  <h5>Answer</h5>
                  <input type="text" className="form-control" key={i} onChange={(e) => handleCorrectOptionChange(i, e.target.value)}></input>

                  <hr></hr>
                  {[...Array(questions[i].optionCount)].map((e, i) => (
                    <div className="">
                      <h5> Option {i + 1}</h5>
                      <input
                        type="text"
                        key={i}
                        className="form-control"
                        onChange={e =>
                          handleOptionChange(quesCount - 1, e.target.value)
                        }
                      ></input>
                    </div>
                  ))}
                  <div>
                    <hr></hr>
                    <button className="btn btn-primary floar-rigth" onClick={e => handleOptionIncrement(e, i)}>
                      {" "}
                Add options{" "}
                    </button>{" "}
                  </div>
                </div>
              </div>
            ))}
            <hr></hr>
            <button onClick={e => handleQuestionCount(e)} className="btn btn-primary"> Add Question</button>
            <hr></hr>
            <button type="submit" className="btn btn-success text-center float-right ml-2"> Submit </button>
            <button type="submit" className="btn btn-warning text-center float-right">Draft</button>
          </form>
        </div> : <div></div>}

      </div>
    </div>
  );
}
