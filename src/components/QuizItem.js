import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function QuizItem({name,description,pk}) {
    return (
        <div style={{padding:"2%",alignItems:"justify",}}>
            <div className="card" style={{width:"33%"}}>
  <div className="card-body">
<h5 className="card-title">{name}</h5>
 
<p className="card-text">{description}</p>
    <Link to={"test/"+pk}   className="btn btn-primary"> Attend</Link>
  </div>
</div>
</div>
            
        
    )
}
