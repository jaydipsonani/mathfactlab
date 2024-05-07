import React, { useEffect, useState, useRef } from "react";

// import emojiRocket from "assets/images/students/fxemoji_rocket.svg";

import moment from "moment";
import { useLocation } from "react-router-dom";

import StudentHeader from "components/dashboard/StudentAuthHeader";

import UnlockLevelLifterRequirement from "./UnlockLevelLifterRequirement";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getStrategies,
  addNewPracticeTestSubmission,
  getLevelLifterSubmissionCount,
  startStudentSessionTimer,
  updateLevelLifterCount
} from "../../../redux/actions";
import { updateTeacher } from "../../../redux/actions/authAction";

import LevelLifterCongratulationPopup from "components/student/LevelLifterCongratulationPopup";
import LevelLifterFailedPopup from "components/student/LevelLifterTestFailedReportDialog";
// import ProgressTablePopup from "components/student/ProgressTablePopup";
import AbortSessionDialog from "components/student/AbortSessionDialog";
import {
  mathOperationTitleList,
  MATH_OPERATION,
  superAddSubLevelStrategyName,
  addSubLevelList,
  mulSubLevelList
} from "config/const";
import CountUp from "react-countup";
import { strategyIcon } from "config/const/select-activity";
import { mathOperationImage } from "utils/select-activity-helpers";
import Loader from "components/common/Loader";
import { useTranslation } from "react-i18next";

const StudentSelectActivityPage = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const { t } = useTranslation();
  // const {
  //     strategyList: allStrategyList,
  //     levelLifterSubmissionCount,
  //     fetchingStrategiesLoading,
  //     addPracticeTestAnswerListLoading,
  // } = useSelector(({ strategy }) => strategy);
  const {
    strategyList: allStrategyList,
    levelLifterSubmissionCount,
    fetchingStrategiesLoading,
    addPracticeTestAnswerListLoading
  } = useSelector(state => state.strategy);

  // const { userDetails } = useSelector(({ auth }) => auth);
  const { userDetails } = useSelector(state => state.auth);

  const { is_super_level_lifter_lock } = userDetails.profile;
  const strategyList = allStrategyList.filter(
    strategy => !strategy.slug.includes(userDetails.profile?.disable_strategies_slug)
  );

  const query = new URLSearchParams(location.search);

  const isShowLevelLifterCongratulationPopup = query.get("is_level_lifter_success") === "true";

  const isShowLevelLifterFailedPopup = query.get("is_level_lifter_failed") === "true";

  //for testing only
  const isEnabledLevelLifter =
    query.get("is_enabled_level_lifter") === "true" || !!userDetails.profile.is_level_lifter_lock;

  const levelLifterErrorCount = +query.get("error_count");

  const levelLifterCorrectButOverTimeCount = +query.get("correct_but_over_time_count");

  const isGrpStrCompleted = query.get("is_grp_str");

  const isShowNextGrpStrVisit = isGrpStrCompleted === "true" && levelLifterSubmissionCount === 0;

  const [isShowCongratulationPopup, setIsShowCongratulationPopup] = useState(
    isShowLevelLifterCongratulationPopup || false
  );
  const [isShowFailedPopup, setIsShowFailedPopup] = useState(isShowLevelLifterFailedPopup || false);
  const sessionTimer = useRef(null);

  // const [isShowProgressTablePopup, setIsShowProgressTablePopup] =
  //   useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const handleChangeActiveStage = (e, selectedStage, strategy) => {
    if (strategy.status === "active") {
      setActiveStage(selectedStage);
      e.stopPropagation();
    } else {
      e.stopPropagation();
    }
  };
  // const popupDelayTime = userDetails.is_show_tablet_banner ? 500 : 3000;

  // useEffect(() => {
  //   let sessionStartInterval;
  //   // if session is not started then show progress table popup
  //   if (sessionStorage.getItem("is_show_std_progress_table") !== "true") {
  //     sessionStartInterval = setTimeout(() => {
  //       setIsShowProgressTablePopup(true);
  //     }, popupDelayTime);
  //     return () => clearInterval(sessionStartInterval);
  //   }
  // }, []); // eslint-disable-line

  // useEffect(() => {
  //   if (
  //     sessionStorage.getItem("isSessionStarted") === "true" &&
  //     (!sessionStorage.getItem("session_id") ||
  //       sessionStorage.getItem("session_id") === "")
  //   ) {
  //     dispatch(startSession());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [isShowEndSessionLogoutPopup, setIsShowEndSessionLogoutPopup] = useState(false);

  const [isEndSession, setIsEndSession] = useState(false);

  let navigate = useNavigate();

  const handleRedirectToPracticeSession = strategy => {
    sessionStorage.setItem("active_stage", activeStage);

    ////STATIC
    // history.push(`/student/practice-session?strategy-type=${strategy}`);

    // DYNAMIC
    sessionStorage.setItem("selected_strategy_id", strategy.id);
    navigate(`/student/practice-session?strategy-type=${strategy.slug}`);
  };

  const handleLevelLifter = () => {
    sessionStorage.setItem("active_stage", 0);
    navigate(`/student/practice-test`);
  };
  const {
    profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id, current_assignment_id }
  } = userDetails;

  // !! CHANGES REQUIRED
  const levelId = student_learning_mode_id === 1 ? add_sub_level_id : mul_div_level_id;
  useEffect(() => {
    if (Object.keys(userDetails).length) {
      if (levelId) {
        !strategyList.length && dispatch(getStrategies(student_learning_mode_id, levelId));
      }
    }
  }, [strategyList.length, Object.keys(userDetails).length, add_sub_level_id, mul_div_level_id]); // eslint-disable-line

  useEffect(() => {
    if (Object.keys(userDetails).length) {
      const {
        profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id }
      } = userDetails;
      const levelId = student_learning_mode_id === 1 ? add_sub_level_id : mul_div_level_id;

      dispatch(getLevelLifterSubmissionCount(student_learning_mode_id, levelId));
    }
  }, []); // eslint-disable-line

  const handleCloseFailedPopup = () => {
    sessionStorage.setItem("active_stage", 0);
    setIsShowFailedPopup(false);
    navigate("/student/practice-select-activity");
  };

  // handle Start Session
  // const handleStartSessionTimer = () => {
  //   sessionStorage.setItem(
  //     "session_start_date",
  //     moment().format("YYYY-MM-DD HH:mm")
  //   );
  // };

  let duration = moment.duration(moment().diff(sessionStorage.getItem("session_start_date"), "YYYY-MM-DD HH:mm"));

  let sessionTimeRemaining = Math.round(duration.asMinutes());

  //close session abort logout popup delay 5 sec
  const closeSessionTimer = () => {
    setIsEndSession(true);
    const timeout = setTimeout(() => {
      setIsShowEndSessionLogoutPopup(true);
      setIsEndSession(false);
    }, 5000);
    return () => clearInterval(timeout);
  };

  useEffect(() => {
    if (sessionStorage.getItem("isSessionStarted") === "true") {
      if (sessionTimeRemaining >= userDetails.profile.session_time_limit) {
        // setIsShowEndSessionLogoutPopup(true);
        closeSessionTimer();
      } else {
        const remaingSessionTimeOut = userDetails.profile.session_time_limit - sessionTimeRemaining;

        let sessionTimeoutInterval;
        sessionTimeoutInterval = setTimeout(
          () => {
            // setIsShowEndSessionLogoutPopup(true);
            closeSessionTimer();
          },
          remaingSessionTimeOut * 60 * 1000
        );
        return () => clearInterval(sessionTimeoutInterval);
      }
    }
  }, [sessionStorage.getItem("isSessionStarted")]); // eslint-disable-line

  useEffect(() => {
    if (sessionStorage.getItem("isSessionStarted") === "true" && +sessionStorage.getItem("sessionTimer"))
      sessionTimer.current = setInterval(() => {
        dispatch(startStudentSessionTimer());
      }, 1000);

    return () => clearInterval(sessionTimer.current);
  }, []); // eslint-disable-line

  // const handleCloseProgressTablePopup = () => {
  //   sessionStorage.setItem("is_show_std_progress_table", true);
  //   setIsShowProgressTablePopup(false);
  //   handleStartSessionTimer();
  // };
  const handleCloseEndSessionLogoutPopup = () => {
    setIsShowEndSessionLogoutPopup(false);
  };

  useEffect(() => {
    if (Object.keys(userDetails).length) {
      sessionStorage.setItem("user_learning_mode", +userDetails.profile.student_learning_mode_id);
    }
  }, []); // eslint-disable-line

  //For now stopped Redirection because we are directly redirect user after login so
  //   IF user's details has been changes redirect to placement test
  // useEffect(() => {
  //   if (Object.keys(userDetails).length) {
  //     if (
  //       userDetails.profile.student_learning_mode_id !==
  //       +sessionStorage.getItem("user_learning_mode")
  //     ) {
  //       history.push("/student/placement-test");
  //     }
  //   }
  // }, []); // eslint-disable-line

  //Redirect user to placement test page user's  current level has been reassess(from teacher admin)

  useEffect(() => {
    if (Object.keys(userDetails).length) {
      if (
        (userDetails.profile.student_learning_mode_id === 1 && !userDetails.profile.add_sub_level_id) ||
        (userDetails.profile.student_learning_mode_id === 2 && !userDetails.profile.mul_div_level_id)
      ) {
        navigate("/student/placement-test");
      }
    }
  }, []); // eslint-disable-line

  const visitedStrategyList = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.visited;
      })
    : [];

  //For redirection if level is 12 (mastered) so  redirected to mastered page
  let userAssignedLevel;
  let firstMathOperation;
  let secondMathOperation;
  if (Object.keys(userDetails)) {
    if (userDetails.profile.student_learning_mode_id === 1) {
      userAssignedLevel = +userDetails.profile.add_sub_level_id;
      firstMathOperation = 1;
      secondMathOperation = 2;
    } else {
      userAssignedLevel = +userDetails.profile.mul_div_level_id;
      firstMathOperation = 3;
      secondMathOperation = 4;
    }
  }

  let userAssignedMulDivLevel;
  let userAssignedAddSubLevel;
  if (Object.keys(userDetails)) {
    if (userDetails.profile.student_learning_mode_id === 2) {
      userAssignedMulDivLevel = +userDetails.profile.mul_div_level_id;
    }
  }

  if (Object.keys(userDetails)) {
    if (userDetails.profile.student_learning_mode_id === 1) {
      userAssignedAddSubLevel = +userDetails.profile.add_sub_level_id;
    }
  }

  // visited strategy based on user's operation learning mode wise
  //also add nine pattern logic to ignore scoring
  const firstMathOperationVisitedStrategy = visitedStrategyList.length
    ? visitedStrategyList.filter(
        strategy =>
          strategy.score >= 900 &&
          +strategy.math_operation === firstMathOperation &&
          !(
            (
              strategy.slug.includes("nines-patterns-stage-1") ||
              strategy.slug.includes("nines-patterns-stage-2") ||
              strategy.slug.includes("nines-patterns-stage-3") ||
              strategy.slug.includes("eleven-patterns-stage-1")
            )
            // strategy.slug.includes("eleven-patterns-stage-2")
          )
      )
    : [];

  const secondMathOperationVisitedStrategy = visitedStrategyList.length
    ? visitedStrategyList.filter(strategy => strategy.score >= 900 && +strategy.math_operation === secondMathOperation)
    : [];

  const tenFramesSubtractionVisitedStrategy = visitedStrategyList.length
    ? visitedStrategyList.filter(strategy => strategy.score >= 900 && strategy.slug.includes("ten-frames-subtraction"))
    : [];

  const findDifferenceVisitedStrategy = visitedStrategyList.length
    ? visitedStrategyList.filter(strategy => strategy.score >= 900 && strategy.slug.includes("find-difference"))
    : [];

  // const trainerStrategy = strategyList.length
  //   ? strategyList.filter(strategy => {
  //       return strategy.flag && strategy.flag.includes("trainer");
  //     })
  //   : [];
  const isTrainerAvailable = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.flag?.includes("trainer");
      })
    : [];

  const trainerStrategyVisited = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.visited && strategy.flag && strategy.flag.includes("trainer") && strategy.score >= 950;
      })
    : [];

  const reviewStrategyVisited = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.visited && strategy.flag && strategy.flag.includes("review") && strategy.score >= 900;
      })
    : [];

  let isLevelLifterDisabled = true;
  //Level lifter count = 0

  // #lastlevel
  if (
    !fetchingStrategiesLoading &&
    strategyList.length &&
    userAssignedLevel
    //   visitedStrategyList.length === strategyList.length) ||
    // (!fetchingStrategiesLoading &&
    //   levelLifterSubmissionCount === 0 &&
    //   userAssignedLevel >= 14 &&
    //   firstMathOperationVisitedStrategy.length >= 1 &&
    //   secondMathOperationVisitedStrategy.length >= 1)
  ) {
    switch (true) {
      case userAssignedAddSubLevel === 13: {
        const uniqueAdditionStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("2-digit-plus-multiple-of-10") && strategy.score >= 900;
        });
        const uniqueSubtractionStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("2-digit-minus-multiple-of-10") && strategy.score >= 900;
        });

        if (
          (levelLifterSubmissionCount === 0 && visitedStrategyList.length === strategyList.length) ||
          // (levelLifterSubmissionCount === 0 &&
          //   is_super_level_lifter_lock &&
          //   uniqueAdditionStrategyByLevel.length &&
          //   uniqueSubtractionStrategyByLevel.length) ||
          (levelLifterSubmissionCount >= 1 &&
            uniqueAdditionStrategyByLevel.length &&
            uniqueSubtractionStrategyByLevel.length)
        ) {
          isLevelLifterDisabled = false;
        }
        break;
      }

      case userAssignedAddSubLevel === 14: {
        const uniqueAdditionStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("2-digit-plus-2-digit") && strategy.score >= 900;
        });
        const uniqueSubtractionStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("2-digit-minus-2-digit") && strategy.score >= 900;
        });

        if (
          (levelLifterSubmissionCount === 0 && visitedStrategyList.length === strategyList.length) ||
          // (levelLifterSubmissionCount === 0 &&
          //   is_super_level_lifter_lock &&
          //   uniqueAdditionStrategyByLevel.length &&
          //   uniqueSubtractionStrategyByLevel.length) ||
          (levelLifterSubmissionCount >= 1 &&
            uniqueAdditionStrategyByLevel.length &&
            uniqueSubtractionStrategyByLevel.length)
        ) {
          isLevelLifterDisabled = false;
        }
        break;
      }

      case userAssignedAddSubLevel === 15: {
        const uniqueAdditionStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("-digit-plus-2-digit-ends-with-9") && strategy.score >= 900;
        });
        const uniqueSubtractionStrategyByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited && strategy.slug.includes("2-digit-minus-2-digit-ends-with-9") && strategy.score >= 900
          );
        });

        if (
          (levelLifterSubmissionCount === 0 && visitedStrategyList.length === strategyList.length) ||
          // (levelLifterSubmissionCount === 0 &&
          //   is_super_level_lifter_lock &&
          //   uniqueAdditionStrategyByLevel.length &&
          //   uniqueSubtractionStrategyByLevel.length) ||
          (levelLifterSubmissionCount >= 1 &&
            uniqueAdditionStrategyByLevel.length &&
            uniqueSubtractionStrategyByLevel.length)
        ) {
          isLevelLifterDisabled = false;
        }
        break;
      }

      case userAssignedAddSubLevel === 16: {
        const uniqueAdditionStrategyByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            strategy.slug.includes("2-digit-plus-2-digit-with-sums-greater-than-100-of-10") &&
            strategy.score >= 900
          );
        });
        const uniqueSubtractionStrategyByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            strategy.slug.includes("2-digit-minus-2-digit-with-minuends-greater-than-100-of-10") &&
            strategy.score >= 900
          );
        });

        if (
          (levelLifterSubmissionCount === 0 && visitedStrategyList.length === strategyList.length) ||
          // (levelLifterSubmissionCount === 0 &&
          //   is_super_level_lifter_lock &&
          //   uniqueAdditionStrategyByLevel.length &&
          //   uniqueSubtractionStrategyByLevel.length) ||
          (levelLifterSubmissionCount >= 1 &&
            uniqueAdditionStrategyByLevel.length &&
            uniqueSubtractionStrategyByLevel.length)
        ) {
          isLevelLifterDisabled = false;
        }
        break;
      }

      case userAssignedAddSubLevel === 17: {
        const uniqueAdditionStrategyByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            strategy.slug.includes("2-digit-plus-2-digit-with-sums-greater-than-100") &&
            strategy.score >= 900
          );
        });
        const uniqueSubtractionStrategyByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            strategy.slug.includes("2-digit-minus-2-digit-with-minuends-greater-than-100") &&
            strategy.score >= 900
          );
        });

        if (
          (levelLifterSubmissionCount === 0 && visitedStrategyList.length === strategyList.length) ||
          // (levelLifterSubmissionCount === 0 &&
          //   is_super_level_lifter_lock &&
          //   uniqueAdditionStrategyByLevel.length &&
          //   uniqueSubtractionStrategyByLevel.length) ||
          (levelLifterSubmissionCount >= 1 &&
            uniqueAdditionStrategyByLevel.length &&
            uniqueSubtractionStrategyByLevel.length)
        ) {
          isLevelLifterDisabled = false;
        }
        break;
      }

      // Add/Sub Graduate
      case userAssignedAddSubLevel === 26: {
        const uniqueAdditionStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("2-digit-plus-2-digit") && strategy.score >= 900;
        });
        const uniqueSubtractionStrategyByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            strategy.slug.includes("2-digit-minus-2-digit-with-minuends-greater-than-100") &&
            strategy.score >= 900
          );
        });

        if (
          (levelLifterSubmissionCount === 0 && visitedStrategyList.length === strategyList.length) ||
          // (levelLifterSubmissionCount === 0 &&
          //   is_super_level_lifter_lock &&
          //   uniqueAdditionStrategyByLevel.length &&
          //   uniqueSubtractionStrategyByLevel.length) ||
          (levelLifterSubmissionCount >= 1 &&
            uniqueAdditionStrategyByLevel.length &&
            uniqueSubtractionStrategyByLevel.length)
        ) {
          isLevelLifterDisabled = false;
        }
        break;
      }
      // Mul/Div
      // Level O
      case userAssignedMulDivLevel === 14: {
        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-11=10+1") && strategy.score >= 900;
        });

        if (
          (levelLifterSubmissionCount >= 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }
        break;
      }

      // Level P
      case userAssignedMulDivLevel === 15: {
        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-12=10+2") && strategy.score >= 900;
        });

        if (
          (levelLifterSubmissionCount >= 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }

      // Level Q
      case userAssignedMulDivLevel === 16: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-50=5x10-stage-1") || strategy.slug.includes("dice-50=5x10-stage-2")) &&
            strategy.score >= 900
          );
        });
        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-50=5x10-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      // Level R
      case userAssignedMulDivLevel === 17: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-15=10+5-stage-1") || strategy.slug.includes("dice-15=10+5-stage-2")) &&
            strategy.score >= 900
          );
        });
        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-15=10+5-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }

      // Level S  // No Trainer
      case userAssignedMulDivLevel === 18: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("quarters-4x25=100-stage-1") ||
              strategy.slug.includes("quarters-4x25=100-stage-2")) &&
            strategy.score >= 900
          );
        });
        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("quarters-4x25=100-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      // Level T
      case userAssignedMulDivLevel === 19: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-20=10+10-stage-1") || strategy.slug.includes("dice-20=10+10-stage-2")) &&
            strategy.score >= 900
          );
        });
        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-20=10+10-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      // Level U  // No Trainer
      case userAssignedMulDivLevel === 20: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-19=20-1-stage-1") || strategy.slug.includes("dice-19=20-1-stage-2")) &&
            strategy.score >= 900
          );
        });
        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-19=20-1-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      // Level V
      case userAssignedMulDivLevel === 21: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-18=20-2-stage-1") || strategy.slug.includes("dice-18=20-2-stage-2")) &&
            strategy.score >= 900
          );
        });

        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-18=20-2-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      // Level W
      case userAssignedMulDivLevel === 22: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-14=10+4-stage-1") || strategy.slug.includes("dice-14=10+4-stage-2")) &&
            strategy.score >= 900
          );
        });

        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-14=10+4-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      // Level X
      case userAssignedMulDivLevel === 23: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-16=8+8-stage-1") || strategy.slug.includes("dice-16=8+8-stage-2")) &&
            strategy.score >= 900
          );
        });

        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-16=8+8-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      // Level Y
      case userAssignedMulDivLevel === 24: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-13=10+3-stage-1") || strategy.slug.includes("dice-13=10+3-stage-2")) &&
            strategy.score >= 900
          );
        });

        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-13=10+3-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }

      // Level Z
      case userAssignedMulDivLevel === 25: {
        const uniqueStrategyBasicGroupByLevel = strategyList.filter(strategy => {
          return (
            strategy.visited &&
            (strategy.slug.includes("dice-17=20-3-stage-1") || strategy.slug.includes("dice-17=20-3-stage-2")) &&
            strategy.score >= 900
          );
        });

        const uniqueStrategyByLevel = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("dice-17=20-3-stage-3") && strategy.score >= 900;
        });
        if (
          (levelLifterSubmissionCount === 0 &&
            trainerStrategyVisited.length &&
            uniqueStrategyBasicGroupByLevel.length === 2 &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount === 0 &&
            is_super_level_lifter_lock &&
            uniqueStrategyByLevel.length &&
            reviewStrategyVisited.length) ||
          (levelLifterSubmissionCount >= 1 && uniqueStrategyByLevel.length && reviewStrategyVisited.length)
        ) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      // Level Graduate
      case userAssignedMulDivLevel >= 26: {
        const reviewStrategyList = strategyList.filter(strategy => {
          return strategy.visited && strategy.slug.includes("review") && strategy.score >= 900;
        });

        if (reviewStrategyList.length === 3) {
          isLevelLifterDisabled = false;
        }

        break;
      }
      default:
        if (
          (levelLifterSubmissionCount === 0 && visitedStrategyList.length === strategyList.length) ||
          (levelLifterSubmissionCount === 0 &&
            userAssignedAddSubLevel >= 14 &&
            firstMathOperationVisitedStrategy.length >= 1 &&
            secondMathOperationVisitedStrategy.length >= 1) ||
          (levelLifterSubmissionCount > 0 &&
            firstMathOperationVisitedStrategy.length >= 1 &&
            (userAssignedAddSubLevel === 11 || userAssignedAddSubLevel === 12
              ? tenFramesSubtractionVisitedStrategy.length >= 1 && findDifferenceVisitedStrategy.length >= 1
              : secondMathOperationVisitedStrategy.length >= 1)) ||
          (levelLifterSubmissionCount > 0 &&
            userAssignedMulDivLevel === 5 &&
            firstMathOperationVisitedStrategy.length >= 1)
        ) {
          isLevelLifterDisabled = false;
        }
    }
  }

  //For level E handle Exceptional case (no division strategy)
  //Level lifter count = 1

  //create another list for level E with score 900 in up

  // let visitedStrategylevelEList = strategyList.length
  //   ? strategyList.filter(strategy => {
  //       return strategy.visited && strategy.score >= 900;
  //     })
  //   : [];

  // if (
  //   (levelLifterSubmissionCount > 0 &&
  //     firstMathOperationVisitedStrategy.length >= 1 &&
  //     (userAssignedAddSubLevel >= 11
  //       ? tenFramesSubtractionVisitedStrategy.length >= 1 &&
  //         findDifferenceVisitedStrategy.length >= 1
  //       : secondMathOperationVisitedStrategy.length >= 1)) ||
  //   (levelLifterSubmissionCount > 0 &&
  //     userAssignedMulDivLevel === 5 &&
  //     firstMathOperationVisitedStrategy.length >= 1)
  // ) {
  //   isLevelLifterDisabled = false;
  // }

  // //for testing
  if (isEnabledLevelLifter) {
    isLevelLifterDisabled = false;
  }

  //scroll if strategy is active
  // const activeStrategyEle = document.getElementById("active-strategy-selected");

  // useEffect(() => {

  //  if(activeStrategyEle) {
  //   activeStrategyEle.scrollIntoView();
  //  }
  // },[activeStrategyEle])

  const handleCloseCongratulationPopup = () => {
    sessionStorage.setItem("active_stage", 0);
    setIsShowCongratulationPopup(false);
    // setIsShowEndSessionLogoutPopup(true);

    navigate("/student/practice-select-activity");

    const {
      profile: { student_learning_mode_id }
    } = userDetails;
    dispatch(updateLevelLifterCount({ student_learning_mode_id }));
    //close session if user is graduated
    // #lastlevel
    if (userAssignedLevel === 26) {
      closeSessionTimer();
    }
  };

  // This list will filter stage 2 , stage 3  & stage 4

  const renderStrategyList = strategyList.filter(strategy => {
    return !(
      strategy.slug.includes("stage-2") ||
      strategy.slug.includes("stage-3") ||
      strategy.slug.includes("stage-4")
    );
  });
  const grpStrategyList = strategyList.filter(strategy => {
    return strategy.slug.includes("stage");
  });

  useEffect(() => {
    if (
      +sessionStorage.getItem("active_stage") > 0 &&
      grpStrategyList.length > 0 &&
      grpStrategyList[1].status !== "lock"
    ) {
      setActiveStage(+sessionStorage.getItem("active_stage"));
    }
  }, []); // eslint-disable-line

  // Remove active strategy id so count up will hide
  useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem("selected_strategy_id", "");
    }, 4000);
  }, []); // eslint-disable-line

  // Update strategy name based on level
  const getStrategyName = strategyName => {
    switch (true) {
      case userAssignedMulDivLevel >= 26 && strategyName === "Review":
        return "Review 1";
      case userAssignedAddSubLevel >= 13 && strategyName.includes("X"):
        return superAddSubLevelStrategyName[strategyName];
      case strategyName.includes("Quarters"):
        return (
          <>
            <span className="dice-title">{strategyName.split(",")[0]}</span>

            <span className="dice-sub-title">{strategyName.split(",")[1]}</span>
          </>
        );
      default:
        return strategyName;
    }
  };

  // Update strategy suffix based on level

  const getStrategySuffix = (strategyName, strategySuffix) => {
    switch (true) {
      case userAssignedMulDivLevel >= 26 && strategyName === "Review":
        return "Levels A - N";
      case userAssignedMulDivLevel >= 26 && strategyName === "Review 2":
        return "Levels A - N";
      case userAssignedMulDivLevel >= 26 && strategyName === "Review 3":
        return "Levels O - Z";

      default:
        return strategySuffix;
    }
  };

  let w = window.innerWidth;
  let h = window.innerHeight;

  const isSuperAdvancedLevel =
    userDetails && userDetails.profile.student_learning_mode_id === 1
      ? (addSubLevelList[userDetails.profile.add_sub_level_id] &&
          addSubLevelList[userDetails.profile.add_sub_level_id].stage.includes("super")) ||
        false
      : (mulSubLevelList[userDetails.profile.mul_div_level_id] &&
          mulSubLevelList[userDetails.profile.mul_div_level_id].stage.includes("super")) ||
        false;

  const handleEditSuccess = assigned_level_id => {
    const {
      profile: { student_learning_mode_id }
    } = userDetails;
    setIsShowCongratulationPopup(true);
    dispatch(getStrategies(student_learning_mode_id, assigned_level_id));
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        isSuperAdvancedLevel &&
        !fetchingStrategiesLoading &&
        !isLevelLifterDisabled &&
        userDetails.profile.is_super_level_lifter_lock &&
        !userDetails.profile.is_level_lifter_lock
      ) {
        const {
          profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id }
        } = userDetails;

        let body;
        let assigned_level_id;
        if (
          (student_learning_mode_id === 1 && +add_sub_level_id < 26) ||
          (student_learning_mode_id === 2 && +mul_div_level_id < 26)
        ) {
          if (student_learning_mode_id === 1) {
            assigned_level_id = +add_sub_level_id === 17 ? +add_sub_level_id + 9 + "" : +add_sub_level_id + 1 + "";
            body = {
              profile: {
                add_sub_level_id: assigned_level_id
              }
            };
          } else {
            assigned_level_id = +mul_div_level_id + 1 + "";
            body = {
              profile: {
                mul_div_level_id: assigned_level_id
              }
            };
          }

          dispatch(updateTeacher(body, handleEditSuccess(assigned_level_id)));
        }
      }
    }, 3000);
  }, [fetchingStrategiesLoading, isLevelLifterDisabled]); // eslint-disable-line

  return (
    <>
      <main className="main-wrapper main-test-screen">
        <div className={isEndSession ? "disable-screen" : ""}>
          <StudentHeader />

          <section className="activity-screen main-top-padding">
            <div className="activity-inner-wrapper inner-pedding activity-boxed fm-color">
              <div className="col-xs-12">
                <div className="row">
                  <div className="container">
                    <div className="activity-screen-wrap">
                      {(process.env.REACT_APP_ENV === "development" || process.env.REACT_APP_ENV === "staging") && (
                        <span
                          style={{
                            fontWeight: 300,
                            bottom: "48px",
                            position: "absolute",
                            top: "10px",
                            left: "24px",
                            color: "#acacac"
                          }}
                        >
                          {w + "  x  " + h}
                        </span>
                      )}
                      {/* <div className="wrap with-subtitle">
                      <h4 className="fm-activity-title">
                        // <b>Activities</b> - Click to open 
                        Select your next activity
                      </h4>
                    </div> */}
                      <div className="activity-screen-cols flex-1">
                        <div className="activity-inner">
                          {fetchingStrategiesLoading || addPracticeTestAnswerListLoading ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "calc(100vh - 244px)",
                                width: "100%"
                              }}
                            >
                              <Loader />
                            </div>
                          ) : (
                            renderStrategyList.map((strategy, i) => {
                              const isGrpStrategy = strategy.slug.includes("stage");
                              if (isGrpStrategy) {
                                const currentStageStrategy = grpStrategyList.find(
                                  (strategy, index) => index === activeStage
                                );

                                // custom logi for level  J and level N
                                const isGroupCompleted = grpStrategyList.filter(strategy =>
                                  levelLifterSubmissionCount === 0 &&
                                  (userAssignedMulDivLevel === 9 || userAssignedMulDivLevel === 12)
                                    ? strategy.visited
                                    : strategy.score >= 900
                                );

                                const isShowScore =
                                  (levelLifterSubmissionCount > 0 &&
                                    ![
                                      "nines-patterns-stage-1",
                                      "nines-patterns-stage-2",
                                      "nines-patterns-stage-3",
                                      "eleven-patterns-stage-1"
                                    ].includes(currentStageStrategy.slug)) ||
                                  (userAssignedMulDivLevel >= 14 && currentStageStrategy.slug.includes("stage"));

                                const isStrategyCompleted =
                                  levelLifterSubmissionCount === 0 &&
                                  (userAssignedMulDivLevel === 9 || userAssignedMulDivLevel === 12)
                                    ? currentStageStrategy.visited
                                    : currentStageStrategy.score >= 900;

                                return (
                                  <div className={`activity-cols`} key={`${currentStageStrategy.id}`}>
                                    <div
                                      className={
                                        currentStageStrategy.status === "active"
                                          ? "activity-button-outer"
                                          : "activity-button-outer disabled"
                                      }
                                    >
                                      <button
                                        className={
                                          +strategy.math_operation === MATH_OPERATION.ADDITION ||
                                          +strategy.math_operation === MATH_OPERATION.MULTIPLICATION
                                            ? "btn-frames fbtn-addition"
                                            : "btn-frames fbtn-subs"
                                        }
                                      >
                                        <img
                                          src={mathOperationImage(strategy.math_operation)}
                                          alt="math_opration_img"
                                          className="fbtn-icon"
                                        />
                                        <span className="fbtn-text">
                                          {mathOperationTitleList[strategy.math_operation]}
                                        </span>
                                      </button>
                                      <div
                                        className={`activity-button
                                  fm-has-tabs 
                                    ${isGroupCompleted.length === grpStrategyList.length ? "isActive" : ""}`}
                                        onClick={() => {
                                          currentStageStrategy.status === "active" &&
                                            handleRedirectToPracticeSession(currentStageStrategy);
                                          dispatch(
                                            addNewPracticeTestSubmission({
                                              assignment_id: current_assignment_id,
                                              status_id: "pss_28a554bd3456204632dde438",
                                              assigned_level_id: "lvl_7903eecdde1cbf2c38004b2a",
                                              strategy_id: currentStageStrategy.id
                                            })
                                          );
                                        }}
                                      >
                                        <span className="fm-radio"></span>
                                        <span className="dice-icon">
                                          <img
                                            // src={
                                            //   +strategy.math_operation ===
                                            //     MATH_OPERATION.ADDITION ||
                                            //   +strategy.math_operation ===
                                            //     MATH_OPERATION.MULTIPLICATION
                                            //     ? tenFramesBlue
                                            //     : tenFramesRed
                                            // }
                                            src={
                                              strategy.status === "active"
                                                ? strategyIcon[strategy.slug]
                                                : strategyIcon[
                                                    // -disabled
                                                    strategy.slug + ""
                                                  ]
                                            }
                                            alt="tenFramesBlue"
                                          />
                                        </span>
                                        <span className="dice-title">
                                          {getStrategyName(strategy.name)}
                                          <br />
                                          {strategy.suffix ? (
                                            <span className="dice-sub-title">{currentStageStrategy.suffix}</span>
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                        {isShowScore ? (
                                          <div className="progressed-number">
                                            <span
                                              className={` ${
                                                isStrategyCompleted ? "pronum-inner-active" : "pronum-inner"
                                              }`}
                                              style={{
                                                width: `${(currentStageStrategy.score * 100) / 1000}%`
                                              }}
                                            >
                                              <span
                                                className={`pronum ${isStrategyCompleted ? "bg-green" : ""}${
                                                  currentStageStrategy.score ? "" : "num-hidden"
                                                }`}
                                              >
                                                {sessionStorage.getItem("selected_strategy_id") ===
                                                currentStageStrategy.id ? (
                                                  <CountUp
                                                    // className="pull-left-score"
                                                    startOnMount={false}
                                                    // start={prevScore}
                                                    end={currentStageStrategy.score}
                                                    preserveValue={true}
                                                  />
                                                ) : (
                                                  currentStageStrategy.score
                                                )}
                                              </span>
                                            </span>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {/* || i === 1 */}
                                        <div className="fm-button-tabs">
                                          {grpStrategyList.map((strategy, index) => {
                                            // if level is more than Q so check score also
                                            const isGrpCompleted =
                                              userAssignedMulDivLevel >= 16
                                                ? strategy.visited && strategy.score >= 900
                                                : strategy.visited;

                                            const activeStrToVisit = grpStrategyList.find(
                                              str => str.status === "active" && !str.visited
                                            );

                                            const isCurrentStrToVisit =
                                              activeStrToVisit && activeStrToVisit.id === strategy.id;
                                            return (
                                              <span
                                                key={index}
                                                className={`fm-button ${
                                                  index === activeStage && isGrpCompleted
                                                    ? "current visited"
                                                    : index === activeStage
                                                      ? "current"
                                                      : isShowNextGrpStrVisit && isCurrentStrToVisit
                                                        ? "next-to-visit"
                                                        : ""
                                                } `}
                                                onClick={e => handleChangeActiveStage(e, index, strategy)}
                                              >
                                                {index + 1}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                const isShowScore =
                                  levelLifterSubmissionCount > 0 ||
                                  userAssignedMulDivLevel >= 14 ||
                                  (isSuperAdvancedLevel && userDetails.profile.is_super_level_lifter_lock === 1);

                                if (levelLifterSubmissionCount > 0 || strategy.flag === "trainer") {
                                } else {
                                }

                                const isStrategyCompleted =
                                  strategy.flag === "trainer" && levelLifterSubmissionCount === 0
                                    ? strategy.score >= 950
                                    : userAssignedMulDivLevel >= 14
                                      ? strategy.score >= 900
                                      : levelLifterSubmissionCount > 0
                                        ? strategy.score >= 900
                                        : strategy.visited;

                                const isShowTrainerLabel = strategy.flag === "trainer";
                                return (
                                  <div
                                    className={`activity-cols ${isStrategyCompleted ? "isActive" : ""}`}
                                    key={strategy.id}
                                    onClick={() => {
                                      strategy.status === "active" && handleRedirectToPracticeSession(strategy);
                                      dispatch(
                                        addNewPracticeTestSubmission({
                                          assignment_id: current_assignment_id,
                                          status_id: "pss_28a554bd3456204632dde438",
                                          assigned_level_id: "lvl_7903eecdde1cbf2c38004b2a",
                                          strategy_id: strategy.id
                                        })
                                      );
                                    }}
                                  >
                                    <div
                                      className={
                                        strategy.status === "active"
                                          ? "activity-button-outer"
                                          : "activity-button-outer disabled"
                                      }
                                    >
                                      <button
                                        className={
                                          +strategy.math_operation === MATH_OPERATION.ADDITION ||
                                          +strategy.math_operation === MATH_OPERATION.MULTIPLICATION
                                            ? "btn-frames fbtn-addition"
                                            : "btn-frames fbtn-subs"
                                        }
                                      >
                                        <img
                                          src={mathOperationImage(strategy.math_operation)}
                                          alt="math_opration_img"
                                          className="fbtn-icon"
                                        />
                                        <span className="fbtn-text">
                                          {mathOperationTitleList[strategy.math_operation]}
                                        </span>
                                      </button>

                                      {isShowTrainerLabel && (
                                        <button
                                          className={
                                            +strategy.math_operation === MATH_OPERATION.ADDITION ||
                                            +strategy.math_operation === MATH_OPERATION.MULTIPLICATION
                                              ? "trainer-btn-frames fbtn-addition"
                                              : "trainer-btn-frames fbtn-subs"
                                          }
                                        >
                                          <span className="trainer-text"> TRAINER</span>
                                        </button>
                                      )}

                                      <div className={`activity-button  ${isStrategyCompleted ? "isActive" : ""}`}>
                                        <span className="fm-radio"></span>
                                        <span className="dice-icon">
                                          <img
                                            // src={
                                            //   +strategy.math_operation ===
                                            //     MATH_OPERATION.ADDITION ||
                                            //   +strategy.math_operation ===
                                            //     MATH_OPERATION.MULTIPLICATION
                                            //     ? tenFramesBlue
                                            //     : tenFramesRed
                                            // }
                                            src={
                                              strategy.status === "active"
                                                ? strategyIcon[strategy.slug]
                                                : strategyIcon[strategy.slug + "-disabled"]
                                            }
                                            alt="tenFramesBlue"
                                          />
                                        </span>
                                        <span className="dice-title">
                                          {getStrategyName(strategy.name)}
                                          <br />
                                          <span className="dice-sub-title">
                                            {getStrategySuffix(strategy.name, strategy.suffix)
                                              ? getStrategySuffix(strategy.name, strategy.suffix)
                                              : ""}
                                          </span>
                                        </span>

                                        {isShowScore && (
                                          <div className="progressed-number ">
                                            <span
                                              className="pronum-inner"
                                              style={{
                                                width: `${(strategy.score * 100) / 1000}%`
                                              }}
                                            >
                                              <span className={`pronum ${strategy.score ? "" : "num-hidden"}`}>
                                                {sessionStorage.getItem("selected_strategy_id") === strategy.id ? (
                                                  <CountUp
                                                    // className="pull-left-score"
                                                    startOnMount={false}
                                                    // start={prevScore}
                                                    end={strategy.score}
                                                    preserveValue={true}
                                                  />
                                                ) : (
                                                  strategy.score
                                                )}
                                                {/* {strategy.score} */}
                                              </span>
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })
                          )}

                          {/* <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-addition">
                            <img src={plus} className="fbtn-icon" />
                            <span className="fbtn-text">Addition</span>
                          </button>
                          <div className="activity-button fm-has-tabs">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={tenFramesRed} alt="tenFramesRed" />
                            </span>
                            <span className="dice-title">Ten Frames</span>
                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">1000</span>
                              </span>
                            </div>
                            <div className="fm-button-tabs">
                              <span className="fm-button">1</span>
                              <span className="fm-button current">2</span>
                              <span className="fm-button">3</span>
                              <span className="fm-button">4</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-subs">
                            <img src={minus} className="fbtn-icon" />
                            <span className="fbtn-text">Subtraction</span>
                          </button>
                          <div className="activity-button isActive">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={beads} alt="beads" />
                            </span>
                            <span className="dice-title">Ten Frames</span>

                            <div className="progressed-number progressed-alt ">
                              <span className="pronum">742</span>
                              <span className="pronum-inner">
                                <span
                                  className="pronum-inner-progress"
                                  style={{ width: "50%" }}
                                ></span>
                              </span>
                            </div>

                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">742</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-addition">
                            <img src={plus} className="fbtn-icon" />
                            <span className="fbtn-text">Addition</span>
                          </button>
                          <div className="activity-button fm-has-tabs">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={doubleBar} alt="doubleBar" />
                            </span>
                            <span className="dice-title">Ten Frames</span>
                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">742</span>
                              </span>
                            </div>
                            <div className="fm-button-tabs">
                              <span className="fm-button">1</span>
                              <span className="fm-button current">2</span>
                              <span className="fm-button">3</span>
                              <span className="fm-button">4</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-addition">
                            <img src={plus} className="fbtn-icon" />
                            <span className="fbtn-text">Addition</span>
                          </button>
                          <div className="activity-button fm-has-tabs">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={tenFramesBlue} alt="tenFramesBlue" />
                            </span>
                            <span className="dice-title">Ten Frames</span>
                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">742</span>
                              </span>
                            </div>
                            <div className="fm-button-tabs">
                              <span className="fm-button">1</span>
                              <span className="fm-button current">2</span>
                              <span className="fm-button">3</span>
                              <span className="fm-button">4</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-addition">
                            <img src={plus} className="fbtn-icon" />
                            <span className="fbtn-text">Addition</span>
                          </button>
                          <div className="activity-button fm-has-tabs">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={tenFramesRed} alt="tenFramesRed" />
                            </span>
                            <span className="dice-title">Ten Frames</span>
                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">742</span>
                              </span>
                            </div>
                            <div className="fm-button-tabs">
                              <span className="fm-button">1</span>
                              <span className="fm-button current">2</span>
                              <span className="fm-button">3</span>
                              <span className="fm-button">4</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-subs">
                            <img src={minus} className="fbtn-icon" />
                            <span className="fbtn-text">Subtraction</span>
                          </button>
                          <div className="activity-button isActive">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={beads} alt="beads" />
                            </span>
                            <span className="dice-title">Ten Frames</span>
                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">742</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-addition">
                            <img src={plus} className="fbtn-icon" />
                            <span className="fbtn-text">Addition</span>
                          </button>
                          <div className="activity-button fm-has-tabs">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={doubleBar} alt="doubleBar" />
                            </span>
                            <span className="dice-title">Ten Frames</span>
                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">742</span>
                              </span>
                            </div>
                            <div className="fm-button-tabs">
                              <span className="fm-button">1</span>
                              <span className="fm-button current">2</span>
                              <span className="fm-button">3</span>
                              <span className="fm-button">4</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-addition">
                            <img src={plus} className="fbtn-icon" />
                            <span className="fbtn-text">Addition</span>
                          </button>
                          <div className="activity-button fm-has-tabs">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={doubleBar} alt="doubleBar" />
                            </span>
                            <span className="dice-title">Ten Frames</span>
                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">742</span>
                              </span>
                            </div>
                            <div className="fm-button-tabs">
                              <span className="fm-button">1</span>
                              <span className="fm-button current">2</span>
                              <span className="fm-button">3</span>
                              <span className="fm-button">4</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="activity-cols">
                        <div className="activity-button-outer">
                          <button className="btn-frames fbtn-addition">
                            <img src={plus} className="fbtn-icon" />
                            <span className="fbtn-text">Addition</span>
                          </button>
                          <div className="activity-button fm-has-tabs">
                            <span className="fm-radio"></span>
                            <span className="dice-icon">
                              <img src={doubleBar} alt="doubleBar" />
                            </span>
                            <span className="dice-title">Ten Frames</span>
                            <div className="progressed-number ">
                              <span
                                className="pronum-inner"
                                style={{ width: "50%" }}
                              >
                                <span className="pronum">742</span>
                              </span>
                            </div>
                            <div className="fm-button-tabs">
                              <span className="fm-button">1</span>
                              <span className="fm-button current">2</span>
                              <span className="fm-button">3</span>
                              <span className="fm-button">4</span>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        </div>
                      </div>
                      <div className="activity-screen-cols level-lifter">
                        {/* {levelLifterSubmissionCount === 0 ? (
                        <h2 className="lifter-title">
                          Select your next activity
                        </h2>
                      ) : (
                        <h2 className="lifter-title">
                          To unlock the <b>level lifter</b> again
                        </h2>
                      )} */}

                        <div className="level-lifter-requirement-wrapper">
                          {isSuperAdvancedLevel && userDetails.profile.is_super_level_lifter_lock ? (
                            ""
                          ) : levelLifterSubmissionCount > 0 ? (
                            <h2 className="lifter-title">
                              {t("practice-select-activity.UnLockLevelText")}{" "}
                              <b>{t("practice-select-activity.LevelLifterButton")}</b>{" "}
                              {t("practice-select-activity.AginText")}
                              {/* To unlock the <b>level lifter</b> again */}
                            </h2>
                          ) : (
                            <h2 className="lifter-title">{t("practice-select-activity.UnlockLevelLifterText")}</h2>
                          )}

                          {isSuperAdvancedLevel && userDetails.profile.is_super_level_lifter_lock ? (
                            levelLifterSubmissionCount === 0 &&
                            isTrainerAvailable.length &&
                            !trainerStrategyVisited.length ? (
                              <h2 className="lifter-title">{t("practice-select-activity.UnlockStrategies")}</h2>
                            ) : (
                              <h2 className="lifter-title">{t("practice-select-activity.AdvanceLevelText")}</h2>
                            )
                          ) : (
                            ""
                          )}

                          <UnlockLevelLifterRequirement />
                        </div>
                        {/* <div className="mfl-input-wrap">
                      <input
                        type="checkbox"
                        id="chkbox-score-1"
                        className="mfl-input-checkbox"
                        name="mfl-input-checkbox-1"
                      />
                      <label
                        className="mfl-input-checkbox-label"
                        htmlFor="chkbox-score-1"
                      >
                        Score 900 or more points on a multiplication activity
                      </label>
                    </div>
                    <div className="mfl-input-wrap">
                      <input
                        type="checkbox"
                        id="chkbox-score-2"
                        className="mfl-input-checkbox"
                        name="mfl-input-checkbox-2"
                      />
                      <label
                        className="mfl-input-checkbox-label"
                        htmlFor="chkbox-score-2"
                      >
                        Score 600 or more points on a division activity
                      </label>
                    </div>
                    <div className="mfl-input-wrap">
                      <input
                        type="checkbox"
                        id="chkbox-score-3"
                        className="mfl-input-checkbox"
                        name="mfl-input-checkbox-3"
                      />
                      <label
                        className="mfl-input-checkbox-label"
                        htmlFor="chkbox-score-3"
                      >
                        Complete stages 1 and 2 of
                      </label>
                      <div className="frame-input-wrap">
                        <input
                          type="number"
                          value="2"
                          className="input-control sm"
                        />{" "}
                        =
                        <input
                          type="number"
                          value="1"
                          className="input-control sm"
                        />{" "}
                        +
                        <input
                          type="number"
                          value="1"
                          className="input-control sm"
                        />
                      </div>
                    </div> */}

                        {isSuperAdvancedLevel && userDetails.profile.is_super_level_lifter_lock ? (
                          ""
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-icon-activity"
                            onClick={handleLevelLifter}
                            disabled={isLevelLifterDisabled || fetchingStrategiesLoading}
                          >
                            <span className="icon-img">
                              {/* <img src={emojiRocket} alt="Level Lifter" /> */}
                              <i className="icon-levellifter"></i>
                            </span>{" "}
                            <span className="btn-text">{t("practice-select-activity.LevelLifterButton")}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {isShowFailedPopup && (
        <LevelLifterFailedPopup
          close={handleCloseFailedPopup}
          errorCount={levelLifterErrorCount}
          correctButOverTime={levelLifterCorrectButOverTimeCount}
          selectedLevelLearningMode={userDetails.profile.student_learning_mode_id}
        />
      )}
      {isShowCongratulationPopup && <LevelLifterCongratulationPopup close={handleCloseCongratulationPopup} />}

      {!isShowFailedPopup && !isShowCongratulationPopup && isShowEndSessionLogoutPopup && (
        <AbortSessionDialog close={handleCloseEndSessionLogoutPopup} counter={sessionTimeRemaining} />
      )}
    </>
  );
};

export default StudentSelectActivityPage;
