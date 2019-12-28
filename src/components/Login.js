import React, { useState } from "react";
import { loginRoute } from "./helper";

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
        console.log(data);
        
      })
      .catch(err => {
        setError(true);
      });
  };
  return (
    <div className="container card ml-10" style={styles.whiteText}>
      {error === true ? (
        <h2 style={styles.redText}> Email or password Incorrect </h2>
      ) : (
        <div> </div>
      )}
      <form onSubmit={e => handleSubmit(e)}>
        <h4> Email</h4> <br></br>
        <input
          type="email"
          onChange={e => handleChange(setEmail, e.target.value)}
        ></input>
        <h4> Password</h4> <br></br>
        <input
          type="password"
          onChange={e => handleChange(setPassword, e.target.value)}
        ></input>
        <button className="button-success" type="submit">
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
}
