import React from "react";
import bracketTop from "assets/images/curly/bar-diagram-bracket-top.svg";
import bracketTopSuccess from "assets/images/curly/bar-diagram-bracket-top-success.svg";

function BarDiagramDivision(props) {
  //practice question test page
  const {
    first_factor,
    second_factor,
    // isShowHint,
    enteredAnswer,
    answer
  } = props;

  const splitCount = enteredAnswer ? +enteredAnswer : "?";
  function renderNode(number, index) {
    let node = null;

    node = (
      <div className={enteredAnswer === answer ? "box success-border" : "box default-border"} key={number}>
        <span className="answer-text"> {!enteredAnswer && !index ? "?" : enteredAnswer}</span>
      </div>
    );

    return node;
  }

  return (
    <div className="bar-diagram-division-wrapper">
      <div className="box-wrapper-outer">
        <div className="answer-factor">
          <span className={`answer-text font-40 ${enteredAnswer === answer ? "success-text" : ""}`}>
            {" "}
            {enteredAnswer ? splitCount * second_factor : first_factor}
          </span>
        </div>
        <div className="full-curly-brace">
          <img src={enteredAnswer === answer ? bracketTopSuccess : bracketTop} alt="bracketTop"></img>
        </div>

        <div
          className={enteredAnswer === answer ? "box-wrapper-inner success-border" : "box-wrapper-inner default-border"}
        >
          {[...Array(second_factor)].map((number, i) => renderNode(number, i))}
        </div>
      </div>
    </div>
  );
}

export default BarDiagramDivision;
