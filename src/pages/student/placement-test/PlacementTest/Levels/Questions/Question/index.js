// import React, { useState, useEffect } from "react";
// import Timer from "./Timer";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import KeyboardEventHandler from "react-keyboard-event-handler";

// function Question(props) {
//   const [currentAnswer, setCurrentAnswer] = useState("");
//   let location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const {
//     questionDetails,
//     // questionDetails: { correct_answer: correctAnswer },
//     questionDetails: { question },

//     duration,
//     currentQuestionIndex,
//     rightAnswer,
//     wrongAnswer,
//   } = props;
//   const { userDetails } = useSelector(({ auth }) => auth);
//   const [replySecond, setReplySecond] = useState(0);
//   const handleChangeInputAnswer = e => {

//     setCurrentAnswer(e.target.value);
//   };

//   const checkAnswerFn = (answer, questionDetails) => {
//     return () => {
//       setCurrentAnswer("");

//       if (
//         (answer === questionDetails.correct_answer &&
//           replySecond <= userDetails.profile.max_timeout_correct_ans_secs) ||
//         questionDetails.level_id === 0

//         // replySecond <= userDetails.profile.max_timeout_correct_ans_secs
//       ) {
//         rightAnswer(answer, questionDetails, replySecond || 1);
//       } else {
//         wrongAnswer(answer, questionDetails, replySecond || 1);
//       }
//     };
//   };
//   useEffect(() => {
//     (process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES" ||
//       query.get("set-default-correct-answer") === "true") &&
//       setCurrentAnswer(questionDetails.correct_answer);
//   }, [questionDetails]); // eslint-disable-line

//   const onEveryTimerChange = currentSeconds => {
//     setReplySecond(currentSeconds);
//   };
//   return (
//     <div key={questionDetails.question_id}>
//       {process.env.REACT_APP_IS_QUETION_TIMER_OFF === "YES" ? (
//         ""
//       ) : (
//         <Timer
//           duration={duration}
//           timeoutFn={checkAnswerFn(currentAnswer, questionDetails)}
//           onEverySecondChanged={onEveryTimerChange}
//           showQuestionTimer={
//             process.env.REACT_APP_IS_SHOW_BACKGROUND_TIMER === "YES" ||
//             query.get("show-question-timer") === "true"
//           }
//           // plz remove rply second
//         />
//       )}
//       <section className="main-test-screen has-full-background">
//         <div className="col-xs-12">
//           <div className="row">
//             <div className="container">
//               <div className="main-test-wrap">
//                 <div className="main-test-left main-test-cols wrap">
//                   <div className="centered-wrap wrap position-relative">
//                     <div className="assessment-input-wrapper font-150 text-white text-center">
//                       <span>{question}</span>
//                       <span>=</span>
//                       {/* <div className="input-design"> */}
//                       <KeyboardEventHandler
//                         handleKeys={["enter", "space"]}
//                         onKeyEvent={checkAnswerFn(
//                           currentAnswer,
//                           questionDetails,
//                         )}
//                         className="input-design"
//                         // className={
//                         //   currentAnswer === ""
//                         //     ? "input-design input-empty"
//                         //     : "input-design"
//                         // }
//                       >
//                         <input
//                           autoFocus
//                           key={questionDetails.question_id}
//                           type="number"
//                           placeholder={
//                             questionDetails.level_id === 0
//                               ? questionDetails.correct_answer
//                               : ""
//                           }
//                           defaultValue={
//                             process.env
//                               .REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER ===
//                               "YES" ||
//                             query.get("set-default-correct-answer") === "true"
//                               ? questionDetails.correct_answer
//                               : ""
//                           }
//                           className="input-field"
//                           onChange={e => handleChangeInputAnswer(e)}
//                         />
//                       </KeyboardEventHandler>
//                       {/* </div> */}
//                     </div>
//                     {questionDetails.level_id === 0 &&
//                     currentQuestionIndex === 0 ? (
//                       <div className="notify-text-wrap">
//                         <span className="notify-text">
//                           Type the number that you see.
//                         </span>
//                       </div>
//                     ) : (
//                       ""
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Question;

//updated logic
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import KeyboardEventHandler from "react-keyboard-event-handler";
import { getFluencyRateByLevel } from "utils/helpers";
import TestNumPad from "components/student/TestNumPad";
import { isTablet } from "react-device-detect";
// import { Textfit } from "react-textfit";CHANGE THIS
function Question(props) {
  const [currentAnswer, setCurrentAnswer] = useState("");
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const {
    questionDetails,
    // questionDetails: { correct_answer: correctAnswer },
    questionDetails: { question, level_id },

    duration,
    currentQuestionIndex,
    rightAnswer,
    wrongAnswer
  } = props;

  const { userDetails } = useSelector(({ auth }) => auth);
  const [replySecond, setReplySecond] = useState(0);

  const isDefaultAnswer = sessionStorage.getItem("is_default_answer") === "true";

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

  const checkAnswerFn = (answer, questionDetails, fronNow) => {
    const fluencyRateByLevel = getFluencyRateByLevel(userDetails.profile.student_learning_mode_id, level_id);
    return () => {
      setCurrentAnswer("");
      if (
        (answer === questionDetails.correct_answer &&
          replySecond <= userDetails.profile.max_timeout_correct_ans_secs * fluencyRateByLevel) ||
        questionDetails.level_id === 0

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
            questionDetails.level_id > 0 &&
            (process.env.REACT_APP_IS_SHOW_BACKGROUND_TIMER === "YES" ||
              query.get("show-question-timer") === "true" ||
              process.env.REACT_APP_ENV === "development" ||
              process.env.REACT_APP_ENV === "staging" ||
              sessionStorage.getItem("is_show_score") === "true")
          }
          rightAnswerTime={
            userDetails.profile.max_timeout_correct_ans_secs *
            getFluencyRateByLevel(userDetails.profile.student_learning_mode_id, level_id)
          }
          // plz remove rply second
        />
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
                      <span>{question}</span>
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
                          onKeyDown={handleKeyDown}
                          key={questionDetails.question_id}
                          type="text"
                          placeholder={questionDetails.level_id === 0 ? questionDetails.correct_answer : ""}
                          autoFocus={!isTablet}
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
                    </div>{" "}
                    {/* </Textfit> */}
                    {questionDetails.level_id === 0 && currentQuestionIndex === 0 ? (
                      <div className="notify-text-wrap">
                        <span className="notify-text">Type the number that you see.</span>
                      </div>
                    ) : (
                      ""
                    )}
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
