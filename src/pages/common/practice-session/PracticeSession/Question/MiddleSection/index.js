import React from "react";
import Strategy from "./Strategy";

function TeacherMiddleSection(props) {
  //practice question test page

  const {
    questionDetails,
    isShowHint,
    hintClickedCount,
    enteredAnswer,
    strategyDetails,
    isShowBottomSection,
    currentQuestionIndex,
    handleSkipQuesion,
    handleBackQuesion
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
      {!isShowBottomSection ? (
        <>
          <span
            className={"flex-link-left text-secondary  on-middle-section"}
            onClick={() => handleBackQuesion(questionDetails)}
            style={{
              visibility: currentQuestionIndex > 0 ? "visible" : "hidden"
            }}
          >
            <i className="icon-arrow-left"></i>&nbsp; Back
          </span>
          {/* </div> */}
          <span
            className={"flex-link-right text-secondary  on-middle-section"}
            onClick={() => handleSkipQuesion(questionDetails)}
            style={{
              visibility: "visible"
            }}
          >
            Skip<i className="icon-arrow-right"></i>
          </span>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default TeacherMiddleSection;
