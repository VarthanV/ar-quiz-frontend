import React from "react";
import { Link } from 'react-router-dom';
export default function Navbar() {
  const token = localStorage.getItem('token');

  return (
    <div>
      <nav className="navbar navbar-style navbar-dark navbar-expand-lg  bg-dark pl-md-5 pr-md-5">
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
        <Link className="navbar-brand" to="/">
          AR Coaching Center
        </Link>
        <div className="collapse navbar-collapse text-right" id="navbarNavDropdown">
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
            {token ? <li className="nav-item active">
              <Link to="" className="nav-link">
                <i className="fa fa-user"></i>
              </Link>
            </li> : (<div>
              <li className="nav-item-active">
                <Link to="/login" className="nav-link">
                  Login
              </Link>  </li>
              <li className="nav-item-active">
                <Link to="/register" className="nav-link">
                  Register
              </Link>  </li>

            </div>)}
          </ul>
        </div>
      </nav>
    </div>
  );
}
