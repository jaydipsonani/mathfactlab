import React, { useEffect, useState } from "react";
import { EnterOutlined } from "@ant-design/icons";
import { strategyDetailBySlug } from "config/const";
import BulkAddEraceIcon from "assets/images/bulk-add-erace-icon.png";


const OnScreenKeyPad2 = props => {
  const {
    handleEnterInput,
    passEnteredAnswer,
    inputAnswer,
    hintClickedCount,
    resetTimer,
    showNextQuestion,
    userClickedHintCount,
    questionDetails,
    questionDetails: { slug, checkedField },
    handleRightAnswer,
    handleWrongAnswer,
    isChangeNumPadLayout
  } = props;

  const [isLeftNumPadLayout, setIsLeftNumPadLayout] = useState(false);
  useEffect(() => {
    const contains = (target, pattern) => {
      let value = 0;
      pattern.forEach(function (word) {
        value = value + target.includes(word);
      });
      return value === 1;
    };
    if (contains(slug, ["five-is-half-of-ten"])) {
      setIsLeftNumPadLayout(true);
    }
  }, [slug]);
  const handleEnteredInput = event => {
    const inputLengthDigit = slug.includes("dice-50=5x10") ? 3 : 2;
    if (inputAnswer.length <= inputLengthDigit) {
      handleEnterInput(inputAnswer + event);
    }
  };

  const handleErase = () => {
    handleEnterInput("");
  };

  const checkAnswerFn = (answer, questionDetails) => {
    //add hint count in question details for checking answer is with hint or without hint use
    let updatedQuestionDetails = Object.assign(questionDetails, {
      hintClickedCount,
      userClickedHintCount
    });

    // find active strategy enum
    const activeStrategyEnum = Object.keys(strategyDetailBySlug).find(
      strategyEnum => strategyDetailBySlug[strategyEnum].slug === slug
    );

    const handleRightAnswerTimer = () => {
      setTimeout(() => {
        handleRightAnswer(false);
        // if (practiceTestQuestionList.length !== currentQuestionIndex + 1) {
        handleEnterInput("");
        // }
        showNextQuestion(answer, updatedQuestionDetails);
        resetTimer(0);
      }, strategyDetailBySlug[activeStrategyEnum].rightAnswerTime);
      passEnteredAnswer(answer);
      // +process.env.REACT_APP_RIGHT_ANSWER_TIME
    };

    const handleWrongAnswerTimer = () => {
      setTimeout(() => {
        handleWrongAnswer(false);
        // if (practiceTestQuestionList.length !== currentQuestionIndex + 1) {
        handleEnterInput("");
        // }
        showNextQuestion(answer, updatedQuestionDetails);
        resetTimer(0);
        passEnteredAnswer("");
      }, strategyDetailBySlug[activeStrategyEnum].wrongAnswerTime);
      passEnteredAnswer(answer);
    };

    if (answer + "" === questionDetails[checkedField] + "") {
      handleRightAnswer(true);
      handleRightAnswerTimer();
    } else {
      handleWrongAnswer(true);
      handleWrongAnswerTimer();
    }
  };

  return (
    <>
      <div
        className={
          isChangeNumPadLayout
            ? isLeftNumPadLayout
              ? "keypad-container right"
              : "keypad-container right"
            : "keypad-container"
        }
      >
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
              ? "number-pad-btn-cell  w-full mt-10 margin-right-bottom"
              : "number-pad-btn-cell mr-10 "
          }
          onClick={() => checkAnswerFn(inputAnswer, questionDetails)}
        >
          <EnterOutlined />
          Enter
        </div>
        <div
          className={isChangeNumPadLayout ? "number-pad-btn-cell w-full  " : "number-pad-btn-cell w-half "}
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

export default OnScreenKeyPad2;
