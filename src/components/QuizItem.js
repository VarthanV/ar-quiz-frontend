import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deleteRoute } from "./helper";

export default function QuizItem({ name, description, pk,author }) {
 const  handleDelete =pk =>{
   const token =localStorage.getItem('token');
   const headers ={
     "Authorization":token
   }
  const data= JSON.stringify({
    pk:parseInt(pk)
  })
   fetch(deleteRoute,{method:"post",headers:headers,body:data}).then(res =>res.json()).then(data =>console.log(data)).catch(err =>console.log(err));


 }

  return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title" style={{color: "white"}}>{name}</h3> 
          
          <hr></hr>
          <p className="card-text" style={{color: "white"}}>{description}</p>
          {author === 'true' ?
          <div className="row">
          <button onClick={() =>handleDelete(pk)}> <i className=" fa fa-trash"></i></button> <br></br>
          <Link to ={"edit/"+pk} className ="btn btn-secondary float-right ml-3"> Edit </Link>
         

           </div>
           : <div></div>}
       
            <Link to={"test/"+ pk} className="btn btn-secondary float-right">
            {" "}
            Take Mock Test !
          </Link> 
          
        </div>
      </div>
  );
}
