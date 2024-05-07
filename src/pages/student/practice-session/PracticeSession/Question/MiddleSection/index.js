import React from "react";
import Strategy from "./Strategy";
import NumberPad2 from "components/student/OnScreenKeyPad2";
import { isTablet } from "react-device-detect";

const MiddleSection = props => {
  //practice question test page

  const {
    questionDetails,
    isShowHint,
    hintClickedCount,
    enteredAnswer,
    strategyDetails,
    handleEnterInput,
    inputAnswer,
    showNextQuestion,
    // updatedQuestionDetails,

    resetTimer,
    userClickedHintCount,
    passEnteredAnswer,
    handleRightAnswer,
    handleWrongAnswer,
    isChangeNumPadLayout
  } = props;

  return (
    <div className="boxed-test-mid">
      <Strategy
        questionDetails={questionDetails}
        isShowHint={isShowHint}
        hintClickedCount={hintClickedCount}
        enteredAnswer={enteredAnswer}
        strategyDetails={strategyDetails}
      />
      {isTablet && (
        <NumberPad2
          handleEnterInput={handleEnterInput}
          inputAnswer={inputAnswer}
          showNextQuestion={showNextQuestion}
          questionDetails={questionDetails}
          passEnteredAnswer={passEnteredAnswer}
          // hintClickedCount={hintClickedCount}
          resetTimer={resetTimer}
          userClickedHintCount={userClickedHintCount}
          handleRightAnswer={handleRightAnswer}
          handleWrongAnswer={handleWrongAnswer}
          isChangeNumPadLayout={isChangeNumPadLayout}
        />
      )}
    </div>
  );
};

export default MiddleSection;
