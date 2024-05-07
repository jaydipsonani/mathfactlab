import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import QuestionText from "./QuestionText";
import { checkIsHintAvailable } from "utils/helpers";
import { strategyDetailBySlug } from "config/const";
import hintHoverImg from "assets/images/hint-hover.svg";
import hintImg from "assets/images/hint.svg";

function TeacherTopSection(props) {
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
    currentQuestionIndex
  } = props;
  const { first_factor, second_factor } = questionDetails;
  const { userDetails } = useSelector(({ auth }) => auth);

  let location = useLocation();
  let navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  //Hint clicked count by user
  const [hintClickedCount, setClickedHintCount] = useState(0);

  const [isSecondCount, setSecondCount] = useState(false);

  React.useEffect(() => {
    seconds ? setSecondCount(true) : setSecondCount(false);
  }, [seconds]); // eslint-disable-line

  const handleShowHint = e => {
    //Passing hint count to parent component

    setFocusToTextField();
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

  const handleStop = () => {
    navigate(
      `/teacher/practice-select-activity?learning_mode_id=${query.get(
        "learning_mode"
      )}&level_id=${query.get("level_id")}`
    );
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hintClickedCount, seconds]); // eslint-disable-line

  const setFocusToTextField = () => {
    document.getElementById("my_text_field").focus();
  };

  useEffect(() => {
    //Different logic for both operation

    //addition/subtraction strategy
    if (process.env.REACT_APP_IS_SOCKET_DISABLE !== "YES") {
      if (questionDetails.math_operation_id === 1 || questionDetails.math_operation_id === 2) {
        // First check if hint is available for active question
        // after check index
        // after check seconds
        // after wrong count
        if (
          (checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) >= 1 &&
            currentQuestionIndex < 6 &&
            seconds === userDetails.profile.max_timeout_correct_ans_secs) ||
          (wrongCount === 1 && checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) === 1) ||
          (checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) === 2 && wrongCount === 2)
        ) {
          return () => handleShowHint();
        }
      } else {
        //multiplication/division strategy
        if (
          (checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) >= 1 &&
            (seconds === userDetails.profile.max_timeout_correct_ans_secs || wrongCount === 1)) ||
          (currentQuestionIndex < 4 && questionDetails.slug === strategyDetailBySlug["FINGERS_TRICK"].slug) ||
          (currentQuestionIndex > 4 &&
            questionDetails.slug === strategyDetailBySlug["FINGERS_TRICK"].slug &&
            seconds === userDetails.profile.max_timeout_correct_ans_secs) ||
          (checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) === 2 &&
            (seconds === userDetails.profile.max_timeout_correct_ans_secs * 2 || wrongCount === 2))
        ) {
          return () => handleShowHint();
        }
      }
    }
  }, [currentQuestionIndex, seconds]); // eslint-disable-line
  return (
    <div className="boxed-test-top">
      {/* Only show question in development and staging */}
      {(process.env.REACT_APP_ENV === "development" ||
        process.env.REACT_APP_ENV === "staging" ||
        sessionStorage.getItem("is_default_answer") === "true") && (
        <div className="show-question" style={{ left: "180px" }}>
          <button className="btn btn-secondary" onClick={() => handleShowQuestion()}>
            Show Qns
          </button>
        </div>
      )}
      <div className="show-question">
        <button className="btn btn-secondary" onClick={() => handleStop()}>
          Close
        </button>
      </div>
      <div className="flex-calculate">
        <QuestionText {...props} />
      </div>
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
              (hintClickedCount === 0 || hintClickedCount === 1)
                ? "hint-wrapper"
                : "hint-wrapper hint-wrapper-hidden"
            }
            onClick={() => handleShowHint()}
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
              checkIsHintAvailable(strategyDetails.slug, first_factor, second_factor) && hintClickedCount === 0
                ? "hint-wrapper"
                : "hint-wrapper"
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
        </Tooltip>
      )}
    </div>
  );
}

export default TeacherTopSection;
