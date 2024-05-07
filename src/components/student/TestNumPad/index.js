import React from "react";
import { EnterOutlined } from "@ant-design/icons";
import BulkAddEraceIcon from "assets/images/bulk-add-erace-icon.png";



const TestNumPad = props => {
  const {
    handleEnterInput,

    inputAnswer,

    questionDetails,

    isChangeNumPadLayout,
    checkAnswerFn
  } = props;

  const handleEnteredInput = event => {
    if (inputAnswer.length <= 2) {
      handleEnterInput(inputAnswer + event);
    }
  };

  const handleErase = () => {
    handleEnterInput("");
  };

  return (
    <>
      <div className={"keypad-container test"}>
        <div className="number-pad-num-cell" onClick={() => handleEnteredInput(1)}>
          1
        </div>
        <div className="number-pad-num-cell margin-right-bottom" onClick={() => handleEnteredInput(2)}>
          2
        </div>
        <div className="number-pad-num-cell" onClick={() => handleEnteredInput(3)}>
          3
        </div>
        <div className="number-pad-num-cell margin-right-bottom" onClick={() => handleEnteredInput(4)}>
          4
        </div>
        <div className="number-pad-num-cell" onClick={() => handleEnteredInput(5)}>
          5
        </div>

        <div className="number-pad-num-cell margin-right-bottom" onClick={() => handleEnteredInput(6)}>
          6
        </div>
        <div className="number-pad-num-cell" onClick={() => handleEnteredInput(7)}>
          7
        </div>
        <div className="number-pad-num-cell margin-right-bottom" onClick={() => handleEnteredInput(8)}>
          8
        </div>
        <div className="number-pad-num-cell" onClick={() => handleEnteredInput(9)}>
          9
        </div>
        <div className="number-pad-num-cell margin-right-bottom" onClick={() => handleEnteredInput(0)}>
          0
        </div>
        <div
          className={
            isChangeNumPadLayout
              ? `number-pad-btn-cell w-full mt-10 margin-right-bottom ${!inputAnswer ? "disabled" : ""}`
              : `number-pad-btn-cell mr-10 ${!inputAnswer ? "disabled" : ""}`
          }
          onClick={checkAnswerFn(inputAnswer, questionDetails)}
        >
          <EnterOutlined />
          Enter
        </div>
        <div
          className={isChangeNumPadLayout ? "number-pad-btn-cell w-full " : "number-pad-btn-cell w-half "}
          onClick={() => handleErase()}
        >
          <img src={BulkAddEraceIcon} alt="bulk-add-erace-icon" />
        </div>

        <div>
          <div className="beta-text">BETA</div>
        </div>
      </div>
    </>
  );
};

export default TestNumPad;
