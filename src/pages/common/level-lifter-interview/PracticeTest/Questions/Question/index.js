import React, { useState, useEffect } from "react";

// import { useSelector } from "react-redux";
import {
  useLocation
  //  useHistory
} from "react-router-dom";
import Timer from "../../../../../student/practice-session/Timer";
// import { Textfit } from "react-textfit"; CHANGE THIS
import { mathOperationList } from "config/const";
// import KeyboardEventHandler from "react-keyboard-event-handler";

function TeacherQuestion(props) {
  let location = useLocation();
  // let history = useHistory();
  const query = new URLSearchParams(location.search);

  // const isDefaultAnswer =
  //   sessionStorage.getItem("is_default_answer") === "true";
  const {
    questionDetails,
    // questionDetails: { correct_answer: correctAnswer },
    questionDetails: { first_factor, second_factor, math_operation_id },
    activeMathOpration,
    duration,
    currentQuestionIndex,
    changeMathOperation,
    rightAnswer,
    wrongAnswer,
    ShowInterviewReport,
    mathOperationKeyList
  } = props;

  const [replySecond, setReplySecond] = useState(0);

  const handleStopInterview = () => {
    ShowInterviewReport();
    // history.push(`/teacher/students`);
  };

  const checkAnswerFn = key => {
    if (
      key === " " ||
      key === "Enter"

      // replySecond <= userDetails.profile.max_timeout_correct_ans_secs
    ) {
      return rightAnswer(questionDetails.correct_answer + "", questionDetails, replySecond || 1);
    } else {
      return wrongAnswer("", questionDetails, replySecond || 1);
    }
  };

  const handleTimeoutQuestion = () => {
    // wrongAnswer("", questionDetails, replySecond);
  };

  // useEffect(() => {
  //   (process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES" ||
  //     isDefaultAnswer) &&
  //     setCurrentAnswer(questionDetails.correct_answer);
  // }, [questionDetails]); // eslint-disable-line

  const onEveryTimerChange = currentSeconds => {
    setReplySecond(currentSeconds);
  };

  // React.useEffect(() => {
  //   window.addEventListener("keydown", e => checkAnswerFn(e, replySecond));

  //   // cleanup this component
  //   return () => {
  //     window.removeEventListener("keydown", e => checkAnswerFn(e, replySecond));
  //   };
  // }, []); // eslint-disable-line

  useEffect(() => {
    const handleKeyDown = event => {
      checkAnswerFn(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // eslint-disable-line

  return (
    <div key={questionDetails.question_id}>
      {process.env.REACT_APP_IS_QUETION_TIMER_OFF === "YES" && process.env.REACT_APP_ENV === "development" ? (
        ""
      ) : (
        <Timer
          duration={duration}
          timeoutFn={() => handleTimeoutQuestion()}
          onEverySecondChanged={onEveryTimerChange}
          showQuestionTimer={
            process.env.REACT_APP_IS_SHOW_BACKGROUND_TIMER === "YES" || query.get("show-question-timer") === "true"
          }
          currentQuestionIndex={currentQuestionIndex}
          // plz remove rply second
        />
      )}
      {/* // For testing show question index */}
      {process.env.REACT_APP_ENV === "development" ? (
        <div
          style={{
            position: "absolute",
            left: "50px",
            color: "black",
            top: "250px"
          }}
          className="font-30"
        >
          {currentQuestionIndex}
        </div>
      ) : (
        ""
      )}

      <section className="main-test-screen has-full-background">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols wrap">
                  <div className="centered-wrap wrap position-relative">
                    {/* <Textfit mode="single"> */}
                    <div className="assessment-input-wrapper font-150 text-white text-center">
                      {/* <span>=</span> */}
                      {/* <div className="input-design"> */}

                      {/* <KeyboardEventHandler
                        handleKeys={["all"]}
                        onKeyEvent={(key) => checkAnswerFn(key, replySecond)}
                      /> */}
                      <div className="input-design">
                        <span>
                          {first_factor} {mathOperationList[math_operation_id]} {second_factor}
                        </span>
                      </div>
                      {/* </div> */}
                    </div>
                    {/* </Textfit> */}

                    {questionDetails.level_id === 0 && currentQuestionIndex === 0 ? (
                      <div className="notify-text-wrap">
                        <span className="notify-text">Type the number that you see.</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "120px",
                    left: "36px"
                  }}
                >
                  <button className="btn btn-test" onClick={() => handleStopInterview()}>
                    End Interview
                  </button>
                  {/* <span
                      className="close"
                      onClick={() => handleStopInterview()}
                      style={{ fontSize: "24px", color: "#FFF", opacity: "1" }}
                    >
                      <i
                        className="icon-close"
                        style={{ fontSize: "26px" }}
                        aria-hidden="true"
                      ></i>
                    </span> */}
                </div>

                {mathOperationKeyList.length > 1 &&
                  (activeMathOpration === "Addition" || activeMathOpration === "Multiplication") && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "120px",
                        right: "36px"
                      }}
                    >
                      <button className="btn btn-test" onClick={() => changeMathOperation()}>
                        Skip to {activeMathOpration === "Addition" ? "Subtraction" : "Division"}
                        <i className="icon-arrow-right ml-10"></i>
                      </button>
                    </div>
                  )}
              </div>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeacherQuestion;
