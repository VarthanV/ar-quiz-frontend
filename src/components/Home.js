import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import QuizItem from "./QuizItem";
import { homeRoute } from "./helper";

export default function Home() {
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    fetch(homeRoute)
      .then(res => res.json())
      .then(data => {
        setQuiz(data);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {quiz.map(item => (
        <div key={item.pk}>
          <QuizItem
            key={item.pk}
            name={item.name}
            description={item.description}
            pk={item.pk}
          ></QuizItem>
        </div>
      ))}
    </div>
  );
}
