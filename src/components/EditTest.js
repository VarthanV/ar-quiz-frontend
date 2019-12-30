import React, { useEffect } from "react";

import { testRoute } from "./helper";
export default function EditTest(props) {
  const styles ={
    whiteText:{
      color:"white"
    }
  }
  const pk = props.match.params.pk;
  const [question, setQuestion] = useEffect([]);
  useEffect(() =>{
    console.log(pk);
    
    fetch(testRoute+pk).then(res =>res.json()).then(data =>console.log(data)).catch(err=>console.log(err))
  },[pk])
  return <div>
   <h1 style ={styles.whiteText}> knkn</h1>
  </div>;
}
