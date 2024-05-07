import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import WelcomeBeginLevelLifterTest from "./WelcomeBeginLevelLifterTest";
import ChangeMathOperation from "./ChangeMathOperation";
import PracticeQuestionDeckTablePopup from "components/student/PracticeQuestionDeckTablePopup";
import LevelLifterInterviewTestReportDialog from "components/common/LevelLifterInterviewTestReportDialog";
import Questions from "./Questions";
import LevelLifterBasicCompletion from "components/common/LevelLifterBasicCompletion";
import ErrorBoundary from "components/common/ErrorBoundary";
import LevelLifterInterviewCongratulationPopup from "components/common/LevelLifterInterviewCongratulationPopup";
import LevelLifterReportCloseDialog from "components/common/LevelLifterReportCloseDialog";
import { mathOperationOrderList } from "config/const";

const TeacherPracticeTest = props => {
  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const activeUser = JSON.parse(localStorage.getItem("interview_student_user"));

  // start level lifter test by click on start button
  const [isShowLevelLifterTest, setIsShowLevelLifterTest] = useState(false);
  const [isShowTestingQuestionDeck, setShowTestingQuestionDeck] = useState(false);
  const [activeMathOprationIndex, setActiveMathOprationIndex] = useState(0);
  const [isShowLevelLifterBasicCompilation, setIsShowLevelLifterBasicCompilation] = useState(false);

  const [isShowLevelLifterCompilation, setIsShowLevelLifterCompilation] = useState(false);

  const [isShowClosePopup, setIsShowClosePopup] = useState(false);

  const [mathOperationKeyList, setMathOperationKeyList] = useState([]);
  const [isShowMathOprationTimer, setIsShowMathOprationTimer] = useState(false);
  const [activeQuizLevelList, setActiveQuizLevelList] = useState([]);

  const [isShowInterviewReport, setIsShowInterviewReport] = useState(false);
  //Question to be add for retake
  const [retakeQuestionCount, setRetakeQuestionCount] = useState([]);
  const [mathOperationResult, setMathOperationResult] = useState({});

  //error count will change base on wrong answer list
  let wrongErrorCount = 0;
  let isCorrectButNotFluentCount = 0;
  // let history = useHistory();
  // const lastLocation = useLastLocation();
  const {
    fetchingLevelLifterQuestionListLoading,
    levelLifterQuestionList: submissionDetails,
    levelLifterSubmissionDetails
  } = useSelector(({ strategy }) => strategy);

  const { fetchingUserDetailsLoading } = useSelector(({ auth }) => auth);
  // const {

  //     profile: { add_sub_level_id, student_learning_mode_id, mul_div_level_id },

  //   } = activeUser;
  //For Reset data on page reload or tab close
  // useBeforeunload(() => "You'll lose your data!");

  useEffect(() => {
    if (Object.keys(submissionDetails).length) {
      //active quiz level list
      let operationKeyList = Object.keys(submissionDetails);
      operationKeyList = operationKeyList?.sort((a, b) => mathOperationOrderList[a] - mathOperationOrderList[b]);
      setMathOperationKeyList(operationKeyList);

      setActiveQuizLevelList(submissionDetails[operationKeyList[0]]);

      setRetakeQuestionCount(
        Math.ceil(
          (+process.env.REACT_APP_LEVEL_LIFTER_WRONG_COUNT_PERC / 100) * submissionDetails[operationKeyList[0]].length
        )
      );
    }
  }, [Object.keys(submissionDetails).length]); // eslint-disable-line

  //Start Level Lifter test
  const handleShowLevelLifterTest = () => {
    setIsShowLevelLifterTest(true);
  };

  const handleUpdateWrongAnswerList = wrongAnswerList => {
    wrongErrorCount = wrongAnswerList.filter(answer => !answer.isCorrectButNotFluent).length;

    //find a correct but not fluent answer
    isCorrectButNotFluentCount = wrongAnswerList.filter(answer => answer.isCorrectButNotFluent).length;
  };

  const {
    profile: { add_sub_level_id, student_learning_mode_id, mul_div_level_id }
  } = activeUser;

  let assigned_level_id = student_learning_mode_id === 1 ? add_sub_level_id : mul_div_level_id;

  const handleChangeMathOpration = () => {
    let updatedMathOprationResult = {
      ...mathOperationResult,
      ...{
        [activeMathOprationIndex]: {
          wrongErrorCount: wrongErrorCount,
          isCorrectButNotFluentCount: isCorrectButNotFluentCount
        }
      }
    };

    let updatedActiveMathOprationIndex = activeMathOprationIndex + 1;

    if (mathOperationKeyList.length === updatedActiveMathOprationIndex) {
      setIsShowLevelLifterBasicCompilation(true);

      setIsShowInterviewReport(true);
      // history.replace(`/teacher/students?is_level_lifter_interview=true`);
    } else {
      let updatedActiveQuizLevelList = submissionDetails[mathOperationKeyList[updatedActiveMathOprationIndex]];

      setRetakeQuestionCount(
        Math.ceil((+process.env.REACT_APP_LEVEL_LIFTER_WRONG_COUNT_PERC / 100) * updatedActiveQuizLevelList.length)
      );
      setMathOperationResult(updatedMathOprationResult);
      setIsShowMathOprationTimer(true);
      setActiveQuizLevelList(updatedActiveQuizLevelList);
      setActiveMathOprationIndex(updatedActiveMathOprationIndex);
    }
  };

  const addQuestionToQuestionList = questionDetails => {
    setActiveQuizLevelList([...activeQuizLevelList, questionDetails]);
  };

  const handleCloseMathOprationTimer = () => {
    setIsShowMathOprationTimer(false);
  };

  // let userAssignedLevel;

  // if (Object.keys(userDetails)) {
  //   if (userDetails.profile.student_learning_mode_id === 1) {
  //     userAssignedLevel =
  //       +userDetails.profile.add_sub_level_id === 12 ? 12 : false;
  //   } else {
  //     userAssignedLevel =
  //       +userDetails.profile.mul_div_level_id === 12 ? 12 : false;
  //   }
  // }

  //rediection only if not rediected from    /student/practice-select-activity
  // useEffect(() => {
  //   if (lastLocation) {
  //     if (
  //       lastLocation &&
  //       lastLocation.pathname !== "/teacher/practice-select-activity"
  //     ) {
  //       history.replace("/teacher/practice-select-activity");
  //     }
  //   } else {
  //     history.replace("/teacher/practice-select-activity");
  //   }
  // }, []); // eslint-disable-line

  //For now stopped Redirection because we are directly redirect user after login so
  //   IF user's details has been changes redirect to select activity page

  // useEffect(() => {
  //   if (Object.keys(userDetails).length) {
  //     if (
  //       userDetails.profile.student_learning_mode_id !==
  //       +sessionStorage.getItem("user_learning_mode")
  //     ) {
  //       history.replace("/teacher/practice-select-activity");
  //     }
  //   }
  // }, []); // eslint-disable-line

  useEffect(() => {
    if (query.get("is_level_lifter_failed")) {
      setIsShowLevelLifterBasicCompilation(true);
    }
  }, []); // eslint-disable-line

  return (
    <>
      {fetchingUserDetailsLoading || fetchingLevelLifterQuestionListLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%"
          }}
        >
          <div className="lds-dual-ring"></div>
        </div>
      ) : isShowLevelLifterBasicCompilation ? (
        <LevelLifterBasicCompletion
          updatedAssignedLevel={assigned_level_id}
          learning_mode={activeUser.profile.student_learning_mode_id}
        />
      ) : !isShowLevelLifterTest ? (
        <WelcomeBeginLevelLifterTest
          isShowTest={handleShowLevelLifterTest}
          handleShowQuestion={() => setShowTestingQuestionDeck(!isShowTestingQuestionDeck)}
          closeMathOprationTimer={handleCloseMathOprationTimer}
        />
      ) : isShowMathOprationTimer ? (
        <ChangeMathOperation
          closeMathOprationTimer={handleCloseMathOprationTimer}
          activeMathOpration={mathOperationKeyList[activeMathOprationIndex]}
          handleShowQuestion={() => setShowTestingQuestionDeck(!isShowTestingQuestionDeck)}
        />
      ) : (
        <Questions
          //put unique key for question components
          // key={Math.random()}
          ShowInterviewReport={() => setIsShowInterviewReport(!isShowInterviewReport)}
          activeQuestionList={activeQuizLevelList}
          changeMathOperation={handleChangeMathOpration}
          addQuestionToQuestionList={addQuestionToQuestionList}
          retakeQuestionCount={retakeQuestionCount}
          updateWrongAnswerList={handleUpdateWrongAnswerList}
          activeMathOpration={mathOperationKeyList[activeMathOprationIndex]}
          mathOperationKeyList={mathOperationKeyList}
        />
      )}
      {isShowTestingQuestionDeck && (
        <PracticeQuestionDeckTablePopup
          close={() => setShowTestingQuestionDeck(!isShowTestingQuestionDeck)}
          loading={fetchingLevelLifterQuestionListLoading}
          questionList={activeQuizLevelList}
        />
      )}

      {isShowInterviewReport && (
        <ErrorBoundary>
          <LevelLifterInterviewTestReportDialog
            open={isShowInterviewReport}
            close={() => setIsShowInterviewReport(!isShowInterviewReport)}
            user={activeUser}
            levelLifterSubmissionID={levelLifterSubmissionDetails.id}
            // learning_mode={activeUser.profile.student_learning_mode_id}
            showCoagulationPop={() => setIsShowLevelLifterCompilation(true)}
            showClosePopup={() => setIsShowClosePopup(true)}
            selectedLevelLearningMode={"1"}
          />{" "}
        </ErrorBoundary>
      )}

      {isShowLevelLifterCompilation && <LevelLifterInterviewCongratulationPopup user={activeUser} />}
      {isShowClosePopup && <LevelLifterReportCloseDialog close={() => setIsShowClosePopup(false)} />}
    </>
  );
};

export default TeacherPracticeTest;
