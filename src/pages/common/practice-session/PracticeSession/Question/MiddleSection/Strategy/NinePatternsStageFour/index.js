import React from "react";
import arrowHintImg from "assets/images/arrow/nine-pattern-arrow-hint.svg";

function NinePatternsStageFour(props) {
  //practice question test page
  const { first_factor, second_factor, answer, hintClickedCount } = props;
  let answerFirstDigit = +(("0" + answer).slice(-2) + "").slice(0, 1);
  let answerLastDigit = +(("0" + answer).slice(-2) + "").slice(-1);
  return (
    <div className="nine-patterns-stage-four-main-outer-wrapper">
      <div className={hintClickedCount >= 1 ? "calculation-box visible" : "calculation-box "}>
        <div className="calculation-inner">
          <div className="calculation-left">
            <span className="calc-count">
              {first_factor}
              <span className="arrow-hint">
                <div className="arrow-hint-inner">
                  <span className="hint-count font-30">-1</span>
                  <img src={arrowHintImg} className="arrow-hint-img" alt="hint" />
                </div>
              </span>
            </span>
            <span className="calc-multiply ml-10 mr-10">x</span>
            <span className="calc-count">{second_factor}</span>
            <span className="calc-eqals ml-10 mr-15">=</span>
          </div>
          <div className="calculation-right">
            <div className="calculation-input">
              <span className="answer-input">
                <span className={hintClickedCount >= 2 ? "digit visible" : "digit"}>{answerFirstDigit}</span>
              </span>
              <span className="answer-input">
                <span className="digit ">{answerLastDigit}</span>
              </span>
            </div>
          </div>
        </div>
        <div className={hintClickedCount >= 2 ? "bottom-hint-text visible" : "bottom-hint-text"}>
          {" "}
          <span className="hint-digit left">10s</span>
          <span>+</span>
          <span className="hint-digit">1s</span>
          <span className="mr-5">=</span>
          <span>9</span>
        </div>
      </div>
    </div>
  );
}

export default NinePatternsStageFour;
