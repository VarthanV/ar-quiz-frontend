import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import TestComponent from "./components/TestComponent";
import CreateTest from "./components/CreateTest";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import EditTest from "./components/EditTest";
function App() {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Route path="/" exact component={Home}></Route>
        <Route path="/test/:pk" exact component={TestComponent}></Route>
        <Route path="/new" exact component={CreateTest}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/edit/:pk" exact component ={EditTest}> </Route>
      </div>
    </Router>
  );
}

export default App;
