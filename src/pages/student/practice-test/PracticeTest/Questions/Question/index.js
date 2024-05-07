import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { Textfit } from "react-textfit";
// import KeyboardEventHandler from "react-keyboard-event-handler";
import { mathOperationList } from "config/const";
import TestNumPad from "components/student/TestNumPad";
import { isTablet } from "react-device-detect";
// import { getFluencyRateByLevel } from "utils/helpers";

function Question(props) {
  const [currentAnswer, setCurrentAnswer] = useState("");
  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const isDefaultAnswer = sessionStorage.getItem("is_default_answer") === "true";

  const {
    questionDetails,
    // questionDetails: { correct_answer: correctAnswer },
    questionDetails: {
      first_factor,
      second_factor,
      math_operation_id
      // level_id,
    },
    studentLevelLifterTestProgressBarPercentage,
    duration,
    currentQuestionIndex,
    rightAnswer,
    wrongAnswer
  } = props;

  let levelLifterProgress;
  levelLifterProgress = studentLevelLifterTestProgressBarPercentage;
  const { userDetails } = useSelector(({ auth }) => auth);
  const [replySecond, setReplySecond] = useState(0);

  const handleChangeInputAnswer = e => {
    let { value, max } = e.target;

    // const re = /^[0-9\b]+$/;
    const re = /^\d{1,4}$/;

    // if value is blank, or test the regex
    if (value === "" || re.test(value)) {
      value = +value <= +max ? value : currentAnswer;

      setCurrentAnswer(value);
    }
    // setCurrentAnswer(e.target.value);
  };

  const handleKeypadInputAnswer = value => {
    const re = /^\d{1,4}$/;

    // if value is blank, or test the regex
    if (value === "" || re.test(value)) {
      value = +value <= +9999 ? value : currentAnswer;

      setCurrentAnswer(value);
    }
  };

  const checkAnswerFn = (answer, questionDetails) => {
    // const fluencyRateByLevel = getFluencyRateByLevel(
    //   userDetails.profile.student_learning_mode_id,
    //   level_id,
    // );
    return () => {
      setCurrentAnswer("");

      if (
        answer === questionDetails.correct_answer &&
        replySecond <= userDetails.profile.max_timeout_correct_ans_secs * questionDetails.fluency_rate

        // replySecond <= userDetails.profile.max_timeout_correct_ans_secs
      ) {
        rightAnswer(answer, questionDetails, replySecond || 1);
      } else {
        wrongAnswer(answer, questionDetails, replySecond || 1);
      }
    };
  };
  const handleKeyDown = event => {
    if (currentAnswer) {
      if (event.code === "Enter" || event.code === "Space") {
        checkAnswerFn(currentAnswer, questionDetails, "HANDLE_KEY_DOWBN")();
      }
    }
  };

  useEffect(() => {
    (process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES" || isDefaultAnswer) &&
      setCurrentAnswer(questionDetails.correct_answer);
  }, [questionDetails]); // eslint-disable-line

  const onEveryTimerChange = currentSeconds => {
    setReplySecond(currentSeconds);
  };

  return (
    <div key={questionDetails.question_id}>
      {process.env.REACT_APP_IS_QUETION_TIMER_OFF === "YES" && process.env.REACT_APP_ENV === "development" ? (
        ""
      ) : (
        <Timer
          duration={duration}
          timeoutFn={checkAnswerFn(currentAnswer, questionDetails)}
          onEverySecondChanged={onEveryTimerChange}
          showQuestionTimer={
            process.env.REACT_APP_IS_SHOW_BACKGROUND_TIMER === "YES" ||
            query.get("show-question-timer") === "true" ||
            process.env.REACT_APP_ENV === "development" ||
            process.env.REACT_APP_ENV === "staging" ||
            sessionStorage.getItem("is_show_score") === "true"
          }
          currentQuestionIndex={currentQuestionIndex}
          rightAnswerTime={
            userDetails.profile.max_timeout_correct_ans_secs * questionDetails.fluency_rate
            // getFluencyRateByLevel(
            //   userDetails.profile.student_learning_mode_id,
            //   level_id,
            // )
          }
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
                      <span>
                        {first_factor} {mathOperationList[math_operation_id]} {second_factor}
                      </span>
                      <span>=</span>
                      <div className="input-design">
                        {/* <KeyboardEventHandler
                        handleKeys={["enter", "space"]}
                        onKeyEvent={checkAnswerFn(
                          currentAnswer,
                          questionDetails
                        )}
                        isDisabled={currentAnswer === ""}
                        className="input-design"
                        // className={
                        //   currentAnswer === ""
                        //     ? "input-design input-empty"
                        //     : "input-design"
                        // }
                      > */}
                        <input
                          autoFocus={!isTablet}
                          onKeyDown={handleKeyDown}
                          key={questionDetails.question_id}
                          type="text"
                          placeholder={questionDetails.level_id === 0 ? questionDetails.correct_answer : ""}
                          defaultValue={
                            process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES" ||
                            query.get("set-default-correct-answer") === "true"
                              ? questionDetails.correct_answer
                              : ""
                          }
                          value={currentAnswer}
                          autoComplete="off"
                          className="input-field"
                          onChange={e => handleChangeInputAnswer(e)}
                          min="0"
                          max="9999"
                        />
                        {/* </KeyboardEventHandler> */}
                      </div>
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
                  <div className="level-lifter-progress-bar-wrapper">
                    <div className="level-lifter-content">
                      <div
                        className="level-lifter-progress"
                        style={{
                          width: `${levelLifterProgress}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  {isTablet && (
                    <TestNumPad
                      inputAnswer={currentAnswer}
                      handleEnterInput={handleKeypadInputAnswer}
                      questionDetails={questionDetails}
                      handleRightAnswer={checkAnswerFn}
                      handleWrongAnswer={checkAnswerFn}
                      checkAnswerFn={checkAnswerFn}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Question;
