import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import BottomSection from "./BottomSection";
import { strategyDetailBySlug, checkedObjList } from "config/const";


function TeacherQuestion(props) {
  const {
    questionDetails,
    questionDetails: { slug },
    showNextQuestion,
    seconds,
    resetTimer,
    wrongCount,
    handleSkipQuesion,
    handleShowQuestion,
    handleBackQuesion,
    prevScore,
    practiceStrategyScore,
    currentQuestionIndex
  } = props;
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const [isShowHint, setIsShowHint] = useState(query.get("isShowHint") === "true" ? 1 : false);
  //field for double bar daigrams
  const [isCheckField, setCheckField] = useState(null);
  //Hint clicked count
  const [hintClickedCount, setHintClickedCount] = useState(0);
  const handleShowHint = hintCount => {
    setHintClickedCount(hintCount);
    setIsShowHint(true);
  };
  //practice question test page
  const strategyDetail =
    questionDetails && Object.values(strategyDetailBySlug).find(strategy => strategy.slug === questionDetails.slug);

  // Current Answer for pass to bottom and middle section ( Exceptional case bar diagram)

  const [enteredAnswer, setEnteredAnswer] = useState("");

  let randomFieldIndex = null;
  let updatedQuestionDetails = questionDetails;
  let checkedListObj = checkedObjList;
  let checkedField = checkedListObj[isCheckField];

  if (questionDetails.slug === "nines-patterns-stage-1") {
    let correctAnswerFactor = [...(questionDetails.correct_answer + "")];
    //change correct answer for only answer 9 to 09 so that we can get correction answer in checkedfield
    if (correctAnswerFactor.length === 1) {
      correctAnswerFactor = ["0", questionDetails.correct_answer + ""];
    }
    const updatedCheckField = {
      checkedField,
      [checkedObjList[3]]: correctAnswerFactor[0],
      [checkedObjList[4]]: correctAnswerFactor[1]
    };
    checkedField = { ...updatedCheckField };
  }
  // if (questionDetails.slug === "nines-patterns-stage-1") {
  //   let correctAnswerFactor = [...(questionDetails.correct_answer + "")];
  //   //change correct answer for only answer 9 to 09 so that we can get correction answer in checkedfield
  //   if (correctAnswerFactor.length === 1) {
  //     correctAnswerFactor = ["0", questionDetails.correct_answer + ""];
  //   }
  //   const updatedCheckField = {
  //     ...checkedField,
  //     [checkedObjList[3]]: correctAnswerFactor[0],
  //     [checkedObjList[4]]: correctAnswerFactor[1],
  //   };
  //   checkedField = updatedCheckField;
  // }

  (function () {
    switch (slug) {
      case strategyDetailBySlug["DOUBLE_BAR_DAIGRAMS"].slug:
        randomFieldIndex = Math.floor(Math.random() * 3);
        isCheckField === null && setCheckField(randomFieldIndex);
        return (updatedQuestionDetails = {
          ...questionDetails,
          checkedField
        });
      case strategyDetailBySlug["OPEN_ARRAYS"].slug:
        randomFieldIndex = Math.floor(Math.random() * 2);
        isCheckField === null && setCheckField(randomFieldIndex);
        // return (updatedQuestionDetails = Object.assign(questionDetails, {
        //   checkedField,
        // }));
        return (updatedQuestionDetails = {
          ...questionDetails,
          checkedField
        });

      case strategyDetailBySlug["MISSING_ADDEND"].slug:
        //second factor as answer so random field index= 1
        randomFieldIndex = 1;
        isCheckField === null && setCheckField(randomFieldIndex);
        // return (updatedQuestionDetails = (questionDetails, {
        //   checkedField,
        // }));
        return (updatedQuestionDetails = {
          ...questionDetails,
          checkedField
        });

      case strategyDetailBySlug["NINE_PATTERNS_STAGE_ONE"].slug:
        randomFieldIndex = Math.floor(Math.random() * (4 - 3 + 1) + 3);

        if (questionDetails.correct_answer === "9") {
          randomFieldIndex = 4;
        }
        isCheckField === null && setCheckField(randomFieldIndex);
        // return (updatedQuestionDetails = Object.assign(questionDetails, {
        //   ...checkedField,
        // }));
        return (updatedQuestionDetails = {
          ...questionDetails,
          checkedField
        });

      default:
        isCheckField === null && setCheckField(2);
        return (updatedQuestionDetails = {
          ...questionDetails,
          checkedField
        });
    }
  })();

  const handleShowNextQuestion = currentAnswer => {
    setEnteredAnswer(currentAnswer);
  };

  return (
    <>
      <section className="boxed-test-screen main-top-padding" key={updatedQuestionDetails && updatedQuestionDetails.id}>
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="boxed-test-wrap">
                <div className="boxed-test-wrap-inner">
                  <TopSection
                    questionDetails={updatedQuestionDetails}
                    showNextQuestion={showNextQuestion}
                    passEnteredAnswer={handleShowNextQuestion}
                    seconds={seconds}
                    showHint={handleShowHint}
                    resetTimer={resetTimer}
                    strategyDetails={strategyDetail}
                    wrongCount={wrongCount}
                    handleShowQuestion={handleShowQuestion}
                    currentQuestionIndex={currentQuestionIndex}
                    hintClickedCount={hintClickedCount}
                  />
                  <MiddleSection
                    questionDetails={updatedQuestionDetails}
                    seconds={seconds}
                    isShowHint={isShowHint}
                    hintClickedCount={hintClickedCount}
                    enteredAnswer={enteredAnswer}
                    strategyDetails={strategyDetail}
                    handleSkipQuesion={handleSkipQuesion}
                    handleBackQuesion={handleBackQuesion}
                    isShowBottomSection={strategyDetail.isShowBottomSection}
                    currentQuestionIndex={currentQuestionIndex}
                  />
                  <BottomSection
                    questionDetails={updatedQuestionDetails}
                    seconds={seconds}
                    wrongCount={wrongCount}
                    handleSkipQuesion={handleSkipQuesion}
                    handleBackQuesion={handleBackQuesion}
                    practiceStrategyScore={practiceStrategyScore}
                    prevScore={prevScore}
                    isShowBottomSection={strategyDetail.isShowBottomSection}
                    isShowHint={isShowHint}
                    enteredAnswer={enteredAnswer}
                    hintClickedCount={hintClickedCount}
                    currentQuestionIndex={currentQuestionIndex}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TeacherQuestion;
