import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const enterQuiz = () => {navigate("/Quiz")} 
  return (
    <div>
      <button className="button-items" onClick={enterQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default Home;
