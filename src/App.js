import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home'
import TestComponent from './components/TestComponent'
function App() {
  return (
    <Router>
    <div >
      <Route path="/" exact component={Home}></Route>
     <Route path="/test/:pk" exact component={TestComponent}></Route>
    </div>
  
    
    </Router>
  );
}

export default App;
