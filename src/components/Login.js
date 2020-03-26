import React, { useState } from "react";
import { loginRoute } from "./helper";
import { useHistory } from "react-router-dom";

export default function Login() {
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
  const [error, setError] = useState(false);
  const history = useHistory();
  const handleChange = (setFunc, value) => {
    setFunc(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    let data = JSON.stringify({
      email: email,
      password: password
    });
    fetch(loginRoute, { method: "post", body: data })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", `Token ${data.token}`);
        localStorage.setItem("author", data.author);
        history.push("/");

      })
      .catch(err => {
        setError(true);
        console.log(err);
        
      });
  };
  return (
    <div className="container pt-5">
      <div className="card p-3">
        <h2 className="text-center">Login</h2>
        <hr></hr>
        <form onSubmit={e => handleSubmit(e)}>
          <label> Email</label> <br></br>
          <input
            type="email"
            className="form-control"
            onChange={e => handleChange(setEmail, e.target.value)}
          ></input>
          <label> Password</label> <br></br>
          <input
            type="password"
            className="form-control"
            onChange={e => handleChange(setPassword, e.target.value)}
          ></input>
          <button className=" btn btn-outline-secondary float-right" type="submit">
            Login{""}
          </button>
        </form>
        {error === true ? (
          <div>
            <hr></hr>
            <div className="alert alert-warning text-center">
              <a>Your login details were not correct. Please contact the system admin for your login details</a>
            </div>
          </div>
        ) : (
            <div> </div>
          )}

      </div>
    </div>
  );
}
