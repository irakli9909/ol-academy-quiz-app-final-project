import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";

import { Boolean } from "./QuestionTypes/Boolean/Boolean";
import { Multiple } from "./QuestionTypes/Multiple/Multiple";
import { Single } from "./QuestionTypes/Single/Single";
import TryAgain from "../TryAgain/TryAgain";

import { setDataWithExpiry, getDataWithExpiry } from "../../Utilities/Api";
import  useFetchData  from "../../helpers/useFetchData";
import "./Quiz.css";

const Quiz = () => {
  const [data, setData] = useState({ questions: [], answers: [] });
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  const goHomePage = () => {
    navigate("/");
  };

  const handleNext = () => {
    setCurrentQuestionId(currentQuestionId + 1);
  };

  const handleSettingScore = (newScore) => {
    setScore(newScore);
  };
  const fetchData = useFetchData()

  useEffect(() => {
    const getData = async () => {
      setDataWithExpiry('data', fetchData, 500000);
      setData({
        questions: getDataWithExpiry("data").questions,
        answers: getDataWithExpiry("data").answers,
      });
    };

    const dataWithExpiry = getDataWithExpiry("data");

    if(dataWithExpiry) {
      setData({
        questions: getDataWithExpiry("data").questions,
        answers: getDataWithExpiry("data").answers,
      });
    } else {
      getData();
    }
  }, [fetchData]);

  const { questions, answers } = data;

  return !questions.length ? (
    <div className="app">
      <Rings />
    </div>
  ) : (
    <div className="page">
      {currentQuestionId < questions.length ? (
        questions[currentQuestionId].type === "single" ? (
          <Single
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Single>
        ) : questions[currentQuestionId].type === "multiple" ? (
          <Multiple
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Multiple>
        ) : (
          <Boolean
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Boolean>
        )
      ) : (
        <div className="final-page">
          <div className="score-container">
            <h3>Total score:</h3>
            <h1>
              {score} / {questions.length}
            </h1>
          </div>
          <TryAgain value={score} total={questions.length} />
        </div>
      )}
      <div className="progress-bar-container">
        <Progress
          color="warning"
          value={(currentQuestionId / questions.length) * 100}
        >
          {currentQuestionId}/{questions.length}
        </Progress>
      </div>

      <button className="button-home" onClick={goHomePage}>
        Go Home
      </button>
    </div>
  );
};

export default Quiz;
