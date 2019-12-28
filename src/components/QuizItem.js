import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function QuizItem({ name, description, pk }) {
 

  return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title" style={{color: "white"}}>{name}</h3> 
          
          <hr></hr>
          <p className="card-text" style={{color: "white"}}>{description}</p>
          <Link to={"test/" + pk} className="btn btn-secondary float-right">
            {" "}
            Take Mock Test !
          </Link>
        </div>
      </div>
  );
}
