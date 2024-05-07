import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
// import ProgressBar from "./ProgressBar";
import BottomSection from "./BottomSection";
import { strategyDetailBySlug, checkedObjList } from "../../../../../config/const";

// import NumberPad from "components/OnScreenKeyPad";
// import NumberPad2 from "components/OnScreenKeyPad2";

// import { isTablet } from "react-device-detect";

function Question(props) {
  const {
    questionDetails,
    questionDetails: { slug },
    showNextQuestion,
    seconds,
    resetTimer,
    wrongCount,
    handleSkipQuesion,
    handleShowQuestion,
    prevScore,
    practiceStrategyScore,
    currentQuestionIndex,
    studentPracticeTestProgressBarPercentage,
    practiceTestQuestionList,
    isChangeNumPadLayout,
    changeKeypadLayout
  } = props;

  let location = useLocation();

  const query = new URLSearchParams(location.search);

  const [isShowHint, setIsShowHint] = useState(query.get("isShowHint") === "true" ? 1 : false);

  // field for double bar diagrams
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
        return (updatedQuestionDetails = {
          ...questionDetails,
          checkedField
        });
      case strategyDetailBySlug["MISSING_ADDEND"].slug:
        //second factor as answer so random field index= 1
        randomFieldIndex = 1;
        isCheckField === null && setCheckField(randomFieldIndex);
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
        return (updatedQuestionDetails = {
          ...questionDetails,
          ...checkedField
        });

      default:
        isCheckField === null && setCheckField(2);
        return (updatedQuestionDetails = { ...questionDetails, checkedField });
    }
  })();

  const handleShowNextQuestion = currentAnswer => {
    setEnteredAnswer(currentAnswer);
  };
  // const isDefaultAnswer = sessionStorage.getItem("is_default_answer") === "true";

  const [inputAnswer, setInputAnswer] = useState("");

  // useEffect(() => {
  //   if (
  //     process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES" ||
  //     isDefaultAnswer
  //   )
  //     setInputAnswer(`${questionDetails[questionDetails.checkedField]}`);
  // }, [isDefaultAnswer, questionDetails]);
  // useEffect(() => {

  //   if (
  //     questionDetails &&
  //     questionDetails.checkedField &&
  //     (process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES" || isDefaultAnswer)
  //   ) {

  //     setInputAnswer(`${questionDetails[questionDetails.checkedField]}`);
  //   }
  // }, [isDefaultAnswer, questionDetails]);

  const [userClickedHintCount, setUserClickedHintCount] = useState(0);

  const [isRightAnswer, setIsRightAnswer] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

  const handleChangeKeypadLayout = () => {
    changeKeypadLayout();
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
                    practiceTestQuestionList={practiceTestQuestionList}
                    inputAnswer={inputAnswer}
                    handleEnterInput={setInputAnswer}
                    handleHintCount={setUserClickedHintCount}
                    userClickedHintCount={userClickedHintCount}
                    handleRightAnswer={setIsRightAnswer}
                    handleWrongAnswer={setIsWrongAnswer}
                    isRightAnswer={isRightAnswer}
                    isWrongAnswer={isWrongAnswer}
                  />
                  <MiddleSection
                    questionDetails={updatedQuestionDetails}
                    seconds={seconds}
                    isShowHint={isShowHint}
                    hintClickedCount={hintClickedCount}
                    enteredAnswer={enteredAnswer}
                    strategyDetails={strategyDetail}
                    // numpad
                    handleEnterInput={setInputAnswer}
                    inputAnswer={inputAnswer}
                    showNextQuestion={showNextQuestion}
                    // questionDetails={updatedQuestionDetails}
                    passEnteredAnswer={handleShowNextQuestion}
                    // hintClickedCount={hintClickedCount}
                    resetTimer={resetTimer}
                    userClickedHintCount={userClickedHintCount}
                    handleRightAnswer={setIsRightAnswer}
                    handleWrongAnswer={setIsWrongAnswer}
                    isChangeNumPadLayout={isChangeNumPadLayout}
                  />
                  {/* <ProgressBar
                    practiceTestQuestionList={practiceTestQuestionList}
                    currentQuestionIndex={currentQuestionIndex}
                    studentPracticeTestProgressBarPercentage={
                      studentPracticeTestProgressBarPercentage
                    }
                  /> */}
                  {/* <LoadingBar
                    progress={studentPracticeTestProgressBarPercentage}
                    shadow={false}
                    color="#50be81"
                    height={6}
                    containerStyle={{ position: "revert" }}
                  /> */}
                  {/* {!isTablet && (
                    <div className="ipad-number-pad"> 
                      {/* <NumberPad
                        handleEnterInput={setInputAnswer}
                        inputAnswer={inputAnswer}
                        showNextQuestion={showNextQuestion}
                        questionDetails={updatedQuestionDetails}
                        passEnteredAnswer={handleShowNextQuestion}
                        hintClickedCount={hintClickedCount}
                        resetTimer={resetTimer}
                        userClickedHintCount={userClickedHintCount}
                        handleRightAnswer={setIsRightAnswer}
                        handleWrongAnswer={setIsWrongAnswer}
                      /> */}
                  {/* <NumberPad2
                        handleEnterInput={setInputAnswer}
                        inputAnswer={inputAnswer}
                        showNextQuestion={showNextQuestion}
                        questionDetails={updatedQuestionDetails}
                        passEnteredAnswer={handleShowNextQuestion}
                        hintClickedCount={hintClickedCount}
                        resetTimer={resetTimer}
                        userClickedHintCount={userClickedHintCount}
                        handleRightAnswer={setIsRightAnswer}
                        handleWrongAnswer={setIsWrongAnswer}
                      /> */}
                  {/* </div>
                  )} */}

                  <div
                    className="practice-test-progress-bar-wrapper"
                    style={{
                      width: `${studentPracticeTestProgressBarPercentage}%`
                    }}
                  ></div>

                  {/* <Line
                    percent="20"
                    strokeWidth="1"
                    strokeColor="#D3D3D3"
                    trailColor="#ffffff"
                    style={{ borderRadius: "none" }}
                  /> */}
                  <BottomSection
                    questionDetails={updatedQuestionDetails}
                    seconds={seconds}
                    wrongCount={wrongCount}
                    handleSkipQuesion={handleSkipQuesion}
                    practiceStrategyScore={practiceStrategyScore}
                    prevScore={prevScore}
                    isShowBottomSection={strategyDetail.isShowBottomSection}
                    isShowHint={isShowHint}
                    enteredAnswer={enteredAnswer}
                    hintClickedCount={hintClickedCount}
                    currentQuestionIndex={currentQuestionIndex}
                    isChangeNumPadLayout={isChangeNumPadLayout}
                    changeKeypadLayout={handleChangeKeypadLayout}
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

export default Question;
