import React, { useState } from "react";
import { registerRoute } from "./helper";
import { useHistory } from 'react-router-dom';
export default function Register() {
  const styles = {
    whiteText: {
      color: "white"
    },
    redText: {
      color: "red"
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();
  const handleChange = (setFunc, value) => {
    setFunc(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = JSON.stringify({
      email: email,
      password: password,
      username: username
    })
    fetch(registerRoute, { method: "post", body: data })
      .then(res => res.json())
      .then(data => {
        if (data.registered === true) {
          alert("Success ! ");
          history.push("/login");
        }
        else {
          return (
            <div>
              <div className="alert alert-warning">
                <a>A user might be existing already with the same username or email.</a>
              </div>
            </div>
          )
          history.push("/login");

        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="container pt-5">
      <div className="card p-3">
        <h2 className="text-center">Register</h2>
        <hr></hr>
      <form onSubmit={e => handleSubmit(e)}>
        <label> Username</label> <br></br>
        <input
          type="text" className="form-control"
          onChange={e => handleChange(setUsername, e.target.value)}
        ></input>
        <label> Email</label> <br></br>
        <input
          type="email" className="form-control"
          onChange={e => handleChange(setEmail, e.target.value)}
        ></input>
        <label> Password</label> <br></br>
        <input
          type="password" className="form-control"
          onChange={e => handleChange(setPassword, e.target.value)}
        ></input>
        <button className="btn btn-outline-secondary float-right" type="submit">
          {" "}
          Submit
        </button>
      </form>
      </div>
      </div>
  );
}
