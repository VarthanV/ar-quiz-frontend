import React, { useState, useEffect } from "react";
import QuizItem from "./QuizItem";
import { homeRoute } from "./helper";
export default function Home() {
  const [quiz, setQuiz] = useState([]);
  const [author,setAuthor] = useState(false);
  useEffect(() => {
    const authorData =localStorage.getItem('author');
    setAuthor(authorData);
    fetch(homeRoute)
      .then(res => res.json())
      .then(data => {
        setQuiz(data);
      });
  }, []);

  return (
    <div>
      
      
      <h1 className="display-4 text-center p-5">Available Mock Tests</h1>
      <div className="container">
        {quiz.map(item => (
          <div key={item.pk}>
            <QuizItem
              key={item.pk}
              name={item.name}
              description={item.description}
              pk={item.pk}
              author ={author}
            ></QuizItem>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}
