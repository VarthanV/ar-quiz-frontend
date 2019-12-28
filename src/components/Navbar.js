import React from "react";
import {Link} from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-style navbar-dark navbar-expand-lg pl-5 pr-5">
        <Link className="navbar-brand" to="/">
          AR Coaching Center
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="#">
                Mock Test
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="#">
                Your progress
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="" className="nav-link">
                <i className="fa fa-user"></i>
              </Link>
            </li> 
          </ul>
        </div>
      </nav>
    </div>
  );
}
