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
          alert("Email or Username Already exists , Please login using your credentials");
          history.push("/login");

        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="container card ml-10" style={styles.whiteText}>
      <form onSubmit={e => handleSubmit(e)}>
        <h4> UserName</h4> <br></br>
        <input
          type="text"
          onChange={e => handleChange(setUsername, e.target.value)}
        ></input>
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
