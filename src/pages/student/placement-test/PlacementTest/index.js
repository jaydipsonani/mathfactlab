import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Levels from "./Levels";
import WelcomeBeginTest from "./WelcomeBeginTest";
import { useBeforeunload } from "react-beforeunload";
import PlacementTestCompletion from "../../../../components/student/PlacementTestCompletion";
import { updateCurrentSubmissionDetails } from "../../../../redux/actions";
import { handleUpdateCurrentSubmissionUserLevelId, updateTeacher } from "../../../../redux/actions";

const PlacementTest = props => {
  const dispatch = useDispatch();
  const [activeQuizLevelList, setActiveQuizLevelList] = useState([]);
  const [activeMathOprationIndex, setActiveMathOprationIndex] = useState(0);
  const [mathOperationKeyList, setMathOperationKeyList] = useState([]);
  const [hasNoMoreOperation, setHasNoMoreOperation] = useState(false);
  const [updatedAssignedLevel, setUpdatedAssignedLevel] = useState(null);
  const [mathOperationResult, setMathOperationResult] = useState({});
  const { submissionDetails } = useSelector(({ quiz }) => quiz);
  const { activeSubmissionDetails, addingNewSubmissionLoading, fetchingSubmissionDetailsLoading } = useSelector(
    ({ quiz }) => quiz
  );
  const { userDetails, fetchingUserDetailsLoading } = useSelector(({ auth }) => auth);
  // let history = useHistory();

  //For Reset data on page reload or tab close
  useBeforeunload(() => "You'll lose your data!");

  useEffect(() => {
    if (Object.keys(submissionDetails).length) {
      const {
        profile: { student_learning_mode_id }
      } = userDetails;
      //it will return ["addition","substraction"]
      let operationKeyList = Object.keys(submissionDetails[0].question_answer_groupby_level).sort();
      if (student_learning_mode_id === 2) {
        operationKeyList = operationKeyList.reverse();
      }

      setMathOperationKeyList(operationKeyList);

      //active quiz level list
      setActiveQuizLevelList(submissionDetails[0].question_answer_groupby_level[operationKeyList[0]]);
    }
  }, [Object.keys(submissionDetails).length]); // eslint-disable-line
  const [isShowTest, setIsShowTest] = useState(false);

  const handleSHowTest = () => {
    setIsShowTest(true);
  };

  const handleUpdateCurrentSubmissionUserLevel = updatedAssignedLevel => {
    const {
      profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id }
    } = userDetails;

    const body = {
      add_sub_level_id: student_learning_mode_id === 1 ? updatedAssignedLevel : add_sub_level_id,
      mul_div_level_id: student_learning_mode_id === 2 ? updatedAssignedLevel : mul_div_level_id
    };

    dispatch(handleUpdateCurrentSubmissionUserLevelId(body));
  };

  const sumOfTotalLevelError = (...objs) => {
    return objs.reduce((a, b) => {
      Object.keys(b).forEach(key => {
        if (b.hasOwnProperty(key)) a[key] = (a[key] || 0) + b[key];
      });
      return a;
    }, {});
  };

  const calculateAssignedLevel = totalErrorByMathOperation => {
    let sum = 0;

    const array = Object.keys(totalErrorByMathOperation).map((key, i) => {
      return { [key]: totalErrorByMathOperation[key] };
    });

    return array
      .map((element, i) => {
        sum = sum + element[i];

        return sum;
      })
      .findIndex(a => a >= 3);
  };
  const handleUpdateUserLevel = updatedAssignedLevel => {
    const {
      profile: { student_learning_mode_id }
    } = userDetails;

    let body;
    if (student_learning_mode_id === 1) {
      body = {
        profile: {
          add_sub_level_id: updatedAssignedLevel
        }
      };
    } else {
      body = {
        profile: {
          mul_div_level_id: updatedAssignedLevel
        }
      };
    }

    dispatch(updateTeacher(body));
  };

  const handleChangeMathOpration = (quizLevel, updatedLevelResult) => {
    let updatedMathOprationResult = {
      ...mathOperationResult,
      ...{ [activeMathOprationIndex]: updatedLevelResult }
    };
    let updatedActiveMathOprationIndex = activeMathOprationIndex + 1;

    let updatedActiveQuizLevelList =
      submissionDetails[0].question_answer_groupby_level[mathOperationKeyList[updatedActiveMathOprationIndex]];

    const totalErrorByMathOperation = sumOfTotalLevelError(...Object.values(updatedMathOprationResult));

    if (mathOperationKeyList.length === updatedActiveMathOprationIndex) {
      const assigned_level_id =
        calculateAssignedLevel(totalErrorByMathOperation) > 0
          ? calculateAssignedLevel(totalErrorByMathOperation)
          : quizLevel;

      setUpdatedAssignedLevel(assigned_level_id);
      setHasNoMoreOperation(true);
      const body = {
        status_id: "pss_0cd2b73ebb653229872326f3",
        // assigned_level_id: totalQuizLevel + 1,
        assigned_level_id: assigned_level_id
      };

      async function fetchData() {
        // You can await here
        await dispatch(
          updateCurrentSubmissionDetails(body, activeSubmissionDetails, handleUpdateUserLevel(assigned_level_id))
        );
      }
      fetchData();
      handleUpdateCurrentSubmissionUserLevel(assigned_level_id);
    } else {
      setMathOperationResult(updatedMathOprationResult);
      setActiveQuizLevelList(updatedActiveQuizLevelList);
      setActiveMathOprationIndex(updatedActiveMathOprationIndex);
    }
  };

  let userAssignedLevel;

  if (Object.keys(userDetails)) {
    if (userDetails.profile.student_learning_mode_id === 1) {
      userAssignedLevel = +userDetails.profile.add_sub_level_id;
    } else {
      userAssignedLevel = +userDetails.profile.mul_div_level_id;
    }
  }

  // Stored user learning mode  for redirection from practice test and

  useEffect(() => {
    if (Object.keys(userDetails).length) {
      sessionStorage.setItem("user_learning_mode", +userDetails.profile.student_learning_mode_id);
    }
  }, []); // eslint-disable-line

  //Redirect it practice session if user has already done placement test means user has any assigned level

  // if (userAssignedLevel) {
  //   history.repl("/student/practice-select-activity");
  // }

  return (
    <>
      {fetchingUserDetailsLoading ? (
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
      ) : userAssignedLevel ? (
        <PlacementTestCompletion
          updatedAssignedLevel={userAssignedLevel}
          learning_mode={userDetails.profile.student_learning_mode_id}
        />
      ) : !isShowTest ? (
        <WelcomeBeginTest isShowTest={handleSHowTest} />
      ) : addingNewSubmissionLoading || fetchingSubmissionDetailsLoading ? (
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
      ) : hasNoMoreOperation ? (
        <PlacementTestCompletion
          updatedAssignedLevel={updatedAssignedLevel}
          learning_mode={userDetails.profile.student_learning_mode_id}
        />
      ) : (
        <Levels
          activeMathOprationIndex={activeMathOprationIndex}
          activeMathOpration={mathOperationKeyList[activeMathOprationIndex]}
          activeQuizLevelList={activeQuizLevelList}
          changeMathOperation={handleChangeMathOpration}
        />
      )}
    </>
  );
};

export default PlacementTest;
