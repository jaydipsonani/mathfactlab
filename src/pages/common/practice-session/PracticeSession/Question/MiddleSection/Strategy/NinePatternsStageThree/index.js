import React from "react";
import arrowHintImg from "assets/images/arrow/nine-pattern-arrow-hint.svg";

function NinePatternsStageThree(props) {
  //practice question test page
  const { first_factor, second_factor, answer, isShowHint } = props;
  let answerFirstDigit = first_factor * second_factor === 90 ? 9 : first_factor - 1;
  let answerLastDigit = answer > 10 ? +(answer + "").slice(-1) : "0";
  return (
    <div className="calculation-box-wrapper">
      <div className="calculation-box visible">
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
                <span className={isShowHint ? "digit visible" : "digit"}>{answerFirstDigit}</span>
              </span>
              <span className="answer-input">
                <span className="digit ">{answerLastDigit}</span>
              </span>
            </div>
          </div>
        </div>
        <div
          // className={
          //   isShowHint ? "bottom-hint-text visible" : "bottom-hint-text"
          // }
          className="bottom-hint-text visible"
        >
          {" "}
          <span className="hint-digit left">10s</span>
          <span>+</span>
          <span className="hint-digit">1s</span>
          <span className="mr-5">=</span>
          <span>9</span>
        </div>

        {/* <div
          className={
            isShowHint
              ? "hint-text-box-wrapper visible"
              : "hint-text-box-wrapper"
          }
        >
          <div className={"textCenter hint-text-box"}>
            <div>For the 10s digit,</div>
            <div>subtract one from the first factor.</div>
          </div>
        </div> */}
      </div>

      {/* <div
        className={
          isShowHint ? "hint-text-box-wrapper visible" : "hint-text-box-wrapper"
        }
      >
        <div className={"textCenter hint-text-box"}>
          <div>For the 10s digit,</div>
          <div>subtract one from the first factor.</div>
        </div>
      </div> */}
    </div>
  );
}

export default NinePatternsStageThree;

/* className={isShowHint ? "curve-arrow visible" : "curve-arrow"} */
