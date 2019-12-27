import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import TestComponent from "./components/TestComponent";
import CreateTest from "./components/CreateTest";
function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home}></Route>
        <Route path="/test/:pk" exact component={TestComponent}></Route>
        <Route path="/new" exact component={CreateTest}>
          {" "}
        </Route>
      </div>
    </Router>
  );
}

export default App;
