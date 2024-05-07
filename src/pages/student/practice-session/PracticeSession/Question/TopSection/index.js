import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { isTablet } from "react-device-detect";

import hintHoverImg from "assets/images/hint-hover.svg";
import hintImg from "assets/images/hint.svg";
import { checkIsHintAvailable } from "utils/helpers";
import QuestionText from "./QuestionText";
import { getFluencyRateByLevel } from "utils/helpers";

function TopSection(props) {
  const {
    questionDetails,
    // questionDetails: { math_opration },
    // showNextQuestion,
    // resetTimer,
    seconds,
    showHint,
    wrongCount,
    strategyDetails,
    handleShowQuestion,
    currentQuestionIndex,
    handleHintCount,
    userClickedHintCount
  } = props;
  // #statichint show hint time for now we have put 3 seconds
  let showHintSecondCount = 2;

  const { first_factor, second_factor } = questionDetails;
  // const { userDetails } = useSelector(({ auth }) => auth);
  const { userDetails } = useSelector(state => state.auth);
  //   console.log("🚀 ~ TopSection ~ userDetails:", userDetails);

  //Hint clicked count by user
  const [hintClickedCount, setClickedHintCount] = useState(0);
  const [hintTimeInterval, setHintTimeInterval] = useState(0);

  // automatic hint count will be ignore
  // const [userClickedHintCount, setUserClickedHintCount] = useState(0);

  const [isSecondCount, setSecondCount] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintTimeInterval(preState => preState + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHintTimeInterval(0);
  }, [currentQuestionIndex]);

  React.useEffect(() => {
    seconds ? setSecondCount(true) : setSecondCount(false);
  }, [seconds]); // eslint-disable-line

  const handleShowHint = (e, fromWhere) => {
    //Passing hint count to parent component

    if (!isTablet) {
      setFocusToTextField();
    }
    if (hintClickedCount === 2) {
      showHint(2);
      setClickedHintCount(2);
    } else if (checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) > hintClickedCount) {
      showHint(hintClickedCount + 1);
      setClickedHintCount(hintClickedCount + 1);
    } else {
      showHint(hintClickedCount);
      setClickedHintCount(hintClickedCount);
    }

    // if user has clicked hint button
    if (fromWhere === "click") {
      handleHintCount(userClickedHintCount + 1);
    }
  };
  const handleMouseDown = e => {
    e.preventDefault();
  };

  const handleKeyDown = event => {
    if (event.keyCode === 72) {
      handleShowHint();
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  };

  React.useEffect(() => {
    if (seconds >= showHintSecondCount) {
      window.addEventListener("keydown", handleKeyDown);
    }
    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hintClickedCount, seconds]); // eslint-disable-line

  const setFocusToTextField = () => {
    document.getElementById("my_text_field")?.focus();
  };

  useEffect(() => {
    //Different logic for both operation

    //addition/subtraction strategy
    if (process.env.REACT_APP_IS_SOCKET_DISABLE !== "asaa") {
      // if (
      //   questionDetails.math_operation_id === 1 ||
      //   questionDetails.math_operation_id === 2
      // ) {
      // First check if hint is available for active question
      // after check index
      // after check seconds
      // after wrong count

      if (
        (checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) >= 1 &&
          currentQuestionIndex < 5 &&
          !hintClickedCount &&
          hintTimeInterval === userDetails.profile.max_timeout_correct_ans_secs) ||
        (wrongCount === 1 &&
          checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) >= 1 &&
          !hintClickedCount) ||
        (checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) === 2 &&
          wrongCount === 2 &&
          hintClickedCount === 1)
      ) {
        return () => {
          handleShowHint();
        };
      }
    }
    // }
    //  else {
    //   //multiplication/division strategy
    //   if (
    //     (checkIsHintAvailable(
    //       strategyDetails.slug,
    //       first_factor,
    //       second_factor,
    //     ) >= 1 &&
    //       (seconds === userDetails.profile.max_timeout_correct_ans_secs ||
    //         wrongCount === 1)) ||
    //     (currentQuestionIndex < 4 &&
    //       questionDetails.slug ===
    //         strategyDetailBySlug["FINGERS_TRICK"].slug) ||
    //     (currentQuestionIndex > 4 &&
    //       questionDetails.slug ===
    //         strategyDetailBySlug["FINGERS_TRICK"].slug &&
    //       seconds === userDetails.profile.max_timeout_correct_ans_secs) ||
    //     (checkIsHintAvailable(
    //       strategyDetails.slug,
    //       first_factor,
    //       second_factor,
    //     ) === 2 &&
    //       (seconds === userDetails.profile.max_timeout_correct_ans_secs * 2 ||
    //         wrongCount === 2))
    //   ) {
    //     return () => handleShowHint();
    //   }
    // }
  }, [currentQuestionIndex, seconds]); // eslint-disable-line

  const allProps = { ...props, userClickedHintCount: userClickedHintCount };

  const fluencyRateByLevel = getFluencyRateByLevel(
    userDetails.profile.student_learning_mode_id,
    questionDetails.level_id
  );

  return (
    <div className="boxed-test-top">
      {/* Only show question in development and staging */}
      {process.env.REACT_APP_ENV === "development" ||
      process.env.REACT_APP_ENV === "staging" ||
      sessionStorage.getItem("is_show_score") === "true" ? (
        <>
          <span className="show-question">
            <button className="btn btn-secondary" onClick={() => handleShowQuestion()}>
              Show Qns
            </button>
          </span>
          <span className="show-question" style={{ left: "140px" }}>
            MR: X <b style={{ fontSize: "24px" }}>{fluencyRateByLevel}</b>
          </span>
        </>
      ) : (
        ""
      )}

      <div className="flex-calculate">
        <QuestionText {...allProps} />
      </div>

      {/* check by slug if is hint button is available or not  */}
      {checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) === 2 && (
        <Tooltip
          placement="bottom"
          className="tooltip-hint"
          title={currentQuestionIndex === 0 ? "Tip: Hit 'h' for hint" : ""}
        >
          <div
            className={
              checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) &&
              isSecondCount &&
              seconds >= showHintSecondCount &&
              (hintClickedCount === 0 || hintClickedCount === 1)
                ? "hint-wrapper"
                : "hint-wrapper hint-wrapper-hidden"
            }
            onClick={e => handleShowHint(e, "click")}
          >
            <span className="hint-button">
              <button className="btn btn-secondary">
                <img src={hintImg} className="hinticon" alt="Hint" />
                <img src={hintHoverImg} className="hinticon-hover" alt="Hint" />
                {hintClickedCount === 0 ? "1ˢᵗ Hint" : "2ⁿᵈ Hint"}
              </button>
            </span>
          </div>
        </Tooltip>
      )}

      {checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) === 1 && (
        <Tooltip
          placement="bottom"
          title={currentQuestionIndex === 0 ? "Tip: Hit 'h' for hint" : ""}
          className="tooltip-hint"
        >
          <div
            className={
              checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) &&
              isSecondCount &&
              seconds >= showHintSecondCount &&
              hintClickedCount === 0
                ? "hint-wrapper"
                : "hint-wrapper hint-wrapper-hidden"
            }
            onMouseDown={e => handleMouseDown(e)}
            onClick={e => handleShowHint(e, "click")}
          >
            <span className="hint-button">
              <button className="btn btn-secondary">
                <img src={hintImg} className="hinticon" alt="Hint" />
                <img src={hintHoverImg} className="hinticon-hover" alt="Hint" />
                Hint
              </button>
            </span>
          </div>
        </Tooltip>
      )}

      {/* {strategyDetails.isShowHint &&
      seconds >= process.env.REACT_APP_HINT_SHOW_TIME ? (
        strategyDetails.isShowHint === 2 ? (
          hintClickedCount === 0 ? (
            <div className="hint-wrapper" onClick={e => handleShowHint(e)}>
              <span className="hint-button">
                <button className="btn btn-secondary">
                  <img src={hintImg} className="hinticon" alt="Hint" />
                  <img
                    src={hintHoverImg}
                    className="hinticon-hover"
                    alt="Hint"
                  />
                  1ˢᵗ Hint
                </button>
              </span>
            </div>
          ) : (
            <div
              className={
                hintClickedCount === 1 ? "hint-wrapper" : "hint-wrapper hidden"
              }
              onClick={() => handleShowHint()}
            >
              <span className="hint-button">
                <button className="btn btn-secondary">
                  <img src={hintImg} className="hinticon" alt="Hint" />
                  <img
                    src={hintHoverImg}
                    className="hinticon-hover"
                    alt="Hint"
                  />
                  2ⁿᵈ Hint
                </button>
              </span>
            </div>
          )
        ) : (
          <div
            className={
              hintClickedCount === 0
                ? "hint-wrapper"
                : "hint-wrapper hint-wrapper-hidden"
            }
            onMouseDown={e => handleMouseDown(e)}
            onClick={e => handleShowHint(e)}
          >
            <span className="hint-button">
              <button className="btn btn-secondary">
                <img src={hintImg} className="hinticon" alt="Hint" />
                <img src={hintHoverImg} className="hinticon-hover" alt="Hint" />
                Hint
              </button>
            </span>
          </div>
        )
      ) : (
        ""
      )} */}
    </div>
  );
}

export default TopSection;
