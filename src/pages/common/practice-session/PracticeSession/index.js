import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Timer from "./Timer";
import QuestionDeckTablePopup from "components/student/QuestionDeckTablePopup";
import Question from "./Question";
// import { useLastLocation } from "react-router-last-location";
import { checkedObjList } from "config/const";
import {
  sampleGroupOfOnePracticeData,
  sampleDicePracticeData,
  sampleGroupFivePracticeData,
  sampleGroupFourPracticeData,
  sampleGroupThreePracticeData,
  sampleGroupSixPracticeData,
  sampleGroupSevenPracticeData,
  sampleGroupZeroPracticeData,
  sampleGroupOfZeroPracticeData,
  sampleGroupDoubleFourPracticeData,
  sampleGroupFiveOnePracticeData,
  sampleGroupFiveTwoPracticeData,
  sampleGroupFiveThreePracticeData,
  sampleGroupOnePracticeData,
  sampleTenMinusOnePracticeData,
  tenFramesDoubleDicesPracticeData,
  numberLinesPracticeData,
  fillInTheBlanksPracticeData,
  tenOnPlaceValueChartSampleData,
  beadsAddition,
  beadsSubtraction,
  doubleBarDiagram,
  areaModels,
  openArrays,
  tenFramesX3PracticeData,
  tenFramesX4PracticeData,
  tenFramesAddition,
  tenFramesSubtraction,
  fiveHalfOfTen,
  ninePatterns,
  ninePatternsStageThree,
  ninePatternsStageTwo,
  ninePatternsStageFour,
  fingersTrick,
  clockFaces,
  missingAddends,
  fiveHalfOfTenWithBeads,
  numberLineDivision,
  diceTenPlusOne,
  diceTenPlusTwo,
  diceSixPlusSix,
  elevePatterns,
  elevePatternsStage2,
  groupsofTwelve,
  divsionBarDiagrams,
  findDifferenceData
} from "utils/data";
// import { useLocation } from "react-router-dom";

const sampleDataListByQuery = {
  sampleGroupOfOnePracticeData: sampleGroupOfOnePracticeData,
  sampleDicePracticeData: sampleDicePracticeData,
  sampleGroupFivePracticeData: sampleGroupFivePracticeData,
  sampleGroupFourPracticeData: sampleGroupFourPracticeData,
  sampleGroupThreePracticeData: sampleGroupThreePracticeData,
  sampleGroupSixPracticeData: sampleGroupSixPracticeData,
  sampleGroupSevenPracticeData: sampleGroupSevenPracticeData,
  sampleGroupZeroPracticeData: sampleGroupZeroPracticeData,
  sampleGroupOfZeroPracticeData: sampleGroupOfZeroPracticeData,
  sampleGroupDoubleFourPracticeData: sampleGroupDoubleFourPracticeData,
  sampleGroupFiveOnePracticeData: sampleGroupFiveOnePracticeData,
  sampleGroupFiveTwoPracticeData: sampleGroupFiveTwoPracticeData,
  sampleGroupFiveThreePracticeData: sampleGroupFiveThreePracticeData,
  sampleGroupOnePracticeData: sampleGroupOnePracticeData,
  sampleTenMinusOnePracticeData: sampleTenMinusOnePracticeData,
  tenFramesDoubleDicesPracticeData: tenFramesDoubleDicesPracticeData,
  "ten-frames-with-double-dices": tenFramesDoubleDicesPracticeData,
  numberLinesPracticeData: numberLinesPracticeData,
  fillInTheBlanksPracticeData: fillInTheBlanksPracticeData,
  tenOnPlaceValueChartSampleData: tenOnPlaceValueChartSampleData,
  beadsAddition: beadsAddition,
  beadsSubtraction: beadsSubtraction,
  doubleBarDiagram: doubleBarDiagram,
  areaModels: areaModels,
  "area-models": areaModels,
  openArrays: openArrays,
  tenFramesX4PracticeData: tenFramesX4PracticeData,
  tenFramesX3PracticeData: tenFramesX3PracticeData,
  tenFramesAddition: tenFramesAddition,
  "ten-frames-addition": tenFramesAddition,
  tenFramesSubtraction: tenFramesSubtraction,
  ninePatterns: ninePatterns,
  "nines-patterns-stage-1": ninePatterns,
  ninePatternsStageTwo: ninePatternsStageTwo,
  ninePatternsStageThree: ninePatternsStageThree,
  fiveHalfOfTen: fiveHalfOfTen,
  ninePatternsStageFour: ninePatternsStageFour,
  "fingers-trick": fingersTrick,
  "clock-faces": clockFaces,
  "missing-addend": missingAddends,
  "five-is-half-of-ten-with-beads": fiveHalfOfTenWithBeads,
  "number-line-division": numberLineDivision,
  "dice-11=10+1": diceTenPlusOne,
  "dice-12=10+2": diceTenPlusTwo,
  "dice-12=6+6": diceSixPlusSix,
  "group-of-12": groupsofTwelve,
  "eleven-patterns-stage-1": elevePatterns,
  "eleven-patterns-stage-2": elevePatternsStage2,
  "division-bar-diagram": divsionBarDiagrams,

  "fill-in-the-blanks": fillInTheBlanksPracticeData,
  "find-difference": findDifferenceData
};
function TeacherPracticeSessionPage(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [seconds, setSeconds] = useState(0);

  const [practiceStrategyScore, setPracticeStrategyScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);

  let location = useLocation();
  let navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const onEveryTimerChange = seconds => {
    setSeconds(seconds);
  };

  // const isShowTestingQuestionDeck = query.get("isShowQuestionDeck") === "true";
  const [submittedAnswerList, setSubmittedAnswerList] = useState([]);
  const [isShowTestingQuestionDeck, setShowTestingQuestionDeck] = useState(false);
  // const lastLocation = useLastLocation();

  const [wrongCount, setWrongCount] = useState(0);

  // let practiceTestQuestionList
  let sampleDataList = sampleDataListByQuery[query.get("strategy-type")];
  // remove after testing
  sessionStorage.setItem("temp", sampleDataList);

  const { userDetails } = useSelector(({ auth }) => auth);
  //redirection only if not redirected from    /student/practice-select-activity
  // useEffect(() => {
  //   if (lastLocation) {
  //     if (
  //       lastLocation &&
  //       lastLocation.pathname !== "/student/practice-select-activity"
  //     ) {
  //       history.replace("/student/practice-select-activity");
  //     }
  //   } else {
  //     history.replace("/student/practice-select-activity");
  //   }
  // }, []); // eslint-disable-line

  const { practiceTestQuestionList } = useSelector(({ strategy }) => strategy);

  //potential point calculation
  const correctAnswerInTimePotentialPoint = Number((1000 / practiceTestQuestionList.length).toFixed(2));
  const correctAnswerOverTimePotentialPoint = Number((correctAnswerInTimePotentialPoint / 2).toFixed(2));
  const skippedAnswerPotentialPoint = Number((correctAnswerInTimePotentialPoint / 4).toFixed(2));

  //Redirection IF user's details has been changes
  // redirected to select activity page
  // useEffect(() => {
  //   if (Object.keys(userDetails).length) {
  //     if (
  //       userDetails.profile.student_learning_mode_id !==
  //       +sessionStorage.getItem("user_learning_mode")
  //     ) {
  //       history.replace("/student/practice-select-activity");
  //     }
  //   }
  // }, []); // eslint-disable-line

  //fetch strategy list after practice session submission

  const handleShowNextQuestion = (answer, questionDetails) => {
    // if (answer !== questionDetails.checkedField) {
    //   setWrongCount(wrongCount + 1);
    // } else {
    if (answer + "" !== questionDetails[questionDetails.checkedField] + "") {
      setWrongCount(wrongCount + 1);
    } else {
      let updatedPracticeStrategyScore;
      const submittedAnswer = {
        question_id: questionDetails.id,
        strategy_id: questionDetails.strategy_id,
        answer:
          questionDetails.checkedField === checkedObjList[3] || questionDetails.checkedField === checkedObjList[4]
            ? questionDetails.correct_answer + ""
            : answer,
        retry_count: 1,
        is_correct: 1,
        time_taken_in_secs: seconds
      };

      let questionScoreCount =
        questionDetails.hintClickedCount > 0 ||
        seconds > userDetails.profile.max_timeout_correct_ans_secs ||
        wrongCount > 0
          ? correctAnswerOverTimePotentialPoint
          : correctAnswerInTimePotentialPoint;
      updatedPracticeStrategyScore = practiceStrategyScore + questionScoreCount;
      // setPrevScore(practiceStrategyScore);
      // setPracticeStrategyScore(updatedPracticeStrategyScore);

      //round float number
      setPrevScore(Number(practiceStrategyScore.toFixed(2)));
      setPracticeStrategyScore(Number(updatedPracticeStrategyScore.toFixed(2)));

      setSubmittedAnswerList([...submittedAnswerList, submittedAnswer]);
      setWrongCount(0);
      if (practiceTestQuestionList.length === currentQuestionIndex + 1) {
        setCurrentQuestionIndex(0);
        // history.replace("/teacher/practice-select-activity");
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };
  function handleSkipQuesion(questionDetails) {
    let updatedPracticeStrategyScore;

    updatedPracticeStrategyScore = practiceStrategyScore + skippedAnswerPotentialPoint;
    // setPrevScore(practiceStrategyScore);
    // setPracticeStrategyScore(updatedPracticeStrategyScore);

    //round float number
    setPrevScore(Number(practiceStrategyScore.toFixed(2)));
    setPracticeStrategyScore(Number(updatedPracticeStrategyScore.toFixed(2)));

    if (practiceTestQuestionList.length === currentQuestionIndex + 1) {
      setCurrentQuestionIndex(0);
      setWrongCount(0);
      setSeconds(0);

      // history.replace("/teacher/practice-select-activity");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setWrongCount(0);
      setSeconds(0);
      const submittedAnswer = {
        question_id: questionDetails.id,
        strategy_id: questionDetails.strategy_id,
        answer: "",
        retry_count: 1,
        is_correct: 0,
        time_taken_in_secs: seconds
      };
      setSubmittedAnswerList([...submittedAnswerList, submittedAnswer]);
    }
  }

  function handleBackQuesion(questionDetails) {
    let updatedPracticeStrategyScore;

    updatedPracticeStrategyScore = practiceStrategyScore + skippedAnswerPotentialPoint;
    // setPrevScore(practiceStrategyScore);
    // setPracticeStrategyScore(updatedPracticeStrategyScore);

    //round float number
    setPrevScore(Number(practiceStrategyScore.toFixed(2)));
    setPracticeStrategyScore(Number(updatedPracticeStrategyScore.toFixed(2)));

    if (practiceTestQuestionList.length === currentQuestionIndex - 1) {
      setCurrentQuestionIndex(0);
      setWrongCount(0);
      setSeconds(0);

      navigate("/teacher/practice-select-activity");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setWrongCount(0);
      setSeconds(0);
      const submittedAnswer = {
        question_id: questionDetails.id,
        strategy_id: questionDetails.strategy_id,
        answer: "",
        retry_count: 1,
        is_correct: 0,
        time_taken_in_secs: seconds
      };
      setSubmittedAnswerList([...submittedAnswerList, submittedAnswer]);
    }
  }

  if (!practiceTestQuestionList.length) {
    return null;
  }

  return (
    <>
      <div key={currentQuestionIndex}>
        <Timer
          questionKey={currentQuestionIndex}
          timeoutFn={onEveryTimerChange}
          onEverySecondChanged={onEveryTimerChange}
          showQuestionTimer={process.env.REACT_APP_IS_SHOW_BACKGROUND_TIMER === "YES"}
        />

        <Question
          questionDetails={practiceTestQuestionList[currentQuestionIndex]}
          showNextQuestion={handleShowNextQuestion}
          seconds={seconds}
          resetTimer={seconds => setSeconds(seconds)}
          wrongCount={wrongCount}
          handleSkipQuesion={handleSkipQuesion}
          handleBackQuesion={handleBackQuesion}
          handleShowQuestion={() => setShowTestingQuestionDeck(!isShowTestingQuestionDeck)}
          prevScore={prevScore}
          practiceStrategyScore={practiceStrategyScore}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>

      {isShowTestingQuestionDeck && (
        <QuestionDeckTablePopup
          close={() => setShowTestingQuestionDeck(!isShowTestingQuestionDeck)}
          loading={false}
          questionList={practiceTestQuestionList}
        />
      )}
    </>
  );
}

export default TeacherPracticeSessionPage;
