import React, { useState } from "react";
import ProgressBar from "./qiz/progress-bar";
import questions from "./questions.json";
import "./App.css";
import Difficulty from "./qiz/difficulty";
import { calculateWidth, shuffle } from "./qiz/helpers";
import ResultBar from "./qiz/result-bar";

function App() {
  const [i, setI] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [result, setResult] = useState("");
  const [randomOptions, setRandomOptions] = useState([
    ...makeOptions(questions[0].correct_answer, questions[0].incorrect_answers),
  ]);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const onOptionSelect = (e) => {
    setOptionsDisabled(true);
    e.target.classList.add("selected");
    if (e.target.value === questions[i].correct_answer) {
      setResult("Correct");
      setCorrectAnswers((state) => state + 1);
    } else {
      setResult("Sorry!");
    }
    setShowResult(true);
  };

  const onNextClick = (i) => {
    if (i < questions.length) {
      setI(i);
      setOptionsDisabled(false);
      setRandomOptions([
        ...makeOptions(
          questions[i].correct_answer,
          questions[i].incorrect_answers
        ),
      ]);
      setShowResult(false);
    }
  };

  return (
    <div>
      <ProgressBar width={calculateWidth(i + 1, questions.length)} />
      <div className="center">
        <h1>
          Question {i + 1} of {questions.length}
        </h1>
        <p>{unescape(questions[i].category)}</p>

        <Difficulty level={questions[i].difficulty} />

        <p>{unescape(questions[i].question)}</p>
        <div className="options">
          {randomOptions.map((item) => (
            <div key={item} className="answer-button-div">
              <button
                disabled={optionsDisabled}
                className="answer-button"
                value={item}
                onClick={(e) => onOptionSelect(e)}
              >
                {unescape(item)}
              </button>
            </div>
          ))}
        </div>
        {showResult && (
          <div className="result">
            <h2>{result}</h2>
            <button
              className="answer-button"
              style={{ width: "fit-content" }}
              onClick={() => onNextClick(i + 1)}
            >
              Next Question
            </button>
          </div>
        )}
        <div className="score">
          <h3>Score: {calculateWidth(correctAnswers, i+1)}%</h3>
          <h3>
            Max Score:{" "}
            {calculateWidth(
              questions.length - i + correctAnswers,
              questions.length
            )}
            %
          </h3>
        </div>
      </div>
      <ResultBar
        lowestPossible={calculateWidth(correctAnswers, questions.length)}
        currentScore={calculateWidth(correctAnswers, i+1)}
        maxPossible={calculateWidth(
          questions.length - i + correctAnswers,
          questions.length
        )}
      />
    </div>
  );
}

function makeOptions(correctOption, incorrectOptions) {
  return shuffle([...incorrectOptions, correctOption]);
}

export default App;
