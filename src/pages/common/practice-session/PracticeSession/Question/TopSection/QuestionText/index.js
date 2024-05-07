import React, { useState } from "react";
import { mathOperationSymbol, MATH_OPERATION,strategyDetailBySlug, checkedObjList  } from "config/const";
import { numberToStringNumber, pluralOfWords } from "utils/helpers";
// import KeyboardEventHandler from "react-keyboard-event-handler";
const pluralize = require("pluralize");

function TeacherQuestionText(props) {
  const {
    passEnteredAnswer,
    showNextQuestion,
    resetTimer,
    questionDetails,
    hintClickedCount,
    questionDetails: {
      slug,
      checkedField,
      correct_answer_second_factor,
      correct_answer_first_factor,
      first_factor,
      second_factor
    }
  } = props;

  const isDefaultAnswer = sessionStorage.getItem("is_default_answer") === "true";

  //close default set  state for open array
  const [currentAnswer, setCurrentAnswer] = useState(
    // slug !== "open-arrays" &&
    process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES" || isDefaultAnswer
      ? `${questionDetails[questionDetails.checkedField]}`
      : ""
  );
  const handleChangeInputAnswer = event => {
    let { value, max } = event.target;
    const re = /^\d{1,3}$/;
    // const re = /^[0-9\b]+$/;

    // if value is blank, or test the regex
    if (value === "" || re.test(value)) {
      value = +value <= +max ? value : currentAnswer;

      setCurrentAnswer(value);
    }
  };
  const [isRightAnswer, setIsRightAnswer] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const checkAnswerFn = (answer, questionDetails) => {
    //add hint count in question details for checking answer is with hint or without hint use
    let updatedQuestionDetails = Object.assign(questionDetails, {
      hintClickedCount
    });

    // find active strategy enum
    const activeStrategyEnum = Object.keys(strategyDetailBySlug).find(
      strategyEnum => strategyDetailBySlug[strategyEnum].slug === slug
    );
    const handleRightAnswerTimer = () => {
      setTimeout(() => {
        setIsRightAnswer(false);
        setCurrentAnswer("");
        showNextQuestion(answer, updatedQuestionDetails);
        resetTimer(0);
      }, strategyDetailBySlug[activeStrategyEnum].rightAnswerTime);
      passEnteredAnswer(answer);
      // +process.env.REACT_APP_RIGHT_ANSWER_TIME
    };

    const handleWrongAnswerTimer = () => {
      setTimeout(() => {
        setCurrentAnswer("");
        setIsWrongAnswer(false);
        showNextQuestion(answer, updatedQuestionDetails);
        resetTimer(0);
        passEnteredAnswer("");
        if (answer === "") {
          setCurrentAnswer(questionDetails[questionDetails.checkedField]);
        }
      }, 1000);
      setTimeout(() => {
        if (answer === "") {
          showNextQuestion(questionDetails[questionDetails.checkedField], updatedQuestionDetails);
        }
      }, 2000);
      passEnteredAnswer(answer);
    };

    if (answer + "" === questionDetails[checkedField] + "") {
      return () => {
        setIsRightAnswer(true);
        handleRightAnswerTimer();
      };
    } else {
      if (answer === "") {
        return () => {
          setIsWrongAnswer(false);
          handleWrongAnswerTimer();
        };
      } else {
        return () => {
          setIsWrongAnswer(true);
          handleWrongAnswerTimer();
        };
      }
    }
  };
  const handleKeyDown = event => {
    if (event.code === "Enter" || event.code === "Space") {
      checkAnswerFn(currentAnswer, questionDetails, "HANDLE_KEY_DOWBN")();
    }
  };
  //in input disable put wrong count condtion
  function strategyRender(slug) {
    switch (slug) {
      case strategyDetailBySlug["DOUBLE_BAR_DAIGRAMS"].slug:
        return (
          <>
            <span className="count-text">
              <span className="font-72">?</span>
            </span>
            <span className="count-equal">=</span>
            <span className="count-input">
              {" "}
              {/* <KeyboardEventHandler
                handleKeys={["enter", "space"]}
                onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                className="input-design"
                // className={
                //   currentAnswer === ""
                //     ? "input-design input-empty"
                //     : "input-design"
                // }
              > */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className={isRightAnswer ? "form-control right-answer" : "form-control"}
                onChange={e => handleChangeInputAnswer(e)}
                autoFocus
                autoComplete="off"
                id="my_text_field"
                // disabled={
                //   wrongCount ===
                //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                // }
                defaultValue={
                  process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                    ? `${questionDetails[questionDetails.checkedField]}`
                    : ""
                }
                value={currentAnswer}
                min="0"
                max="999"
              />{" "}
              {/* </KeyboardEventHandler> */}
            </span>

            <div
              className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}
              style={{ right: "-50%" }}
            >
              <span>Try again.</span>
            </div>
          </>
        );
      case strategyDetailBySlug["AREA_MODELS"].slug:
        return (
          <>
            <span className="count-text">
              <span className="font-72">?</span>
            </span>
            <span className="count-equal">=</span>
            <span className="count-input">
              {" "}
              {/* <KeyboardEventHandler
                handleKeys={["enter", "space"]}
                onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                className="input-design"
                // className={
                //   currentAnswer === ""
                //     ? "input-design input-empty"
                //     : "input-design"
                // }
              > */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className={isRightAnswer ? "form-control right-answer" : "form-control"}
                onChange={e => handleChangeInputAnswer(e)}
                autoFocus
                autoComplete="off"
                id="my_text_field"
                // disabled={
                //   wrongCount ===
                //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                // }
                defaultValue={
                  process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                    ? `${questionDetails[questionDetails.checkedField]}`
                    : ""
                }
                value={currentAnswer}
                min="0"
                max="999"
              />{" "}
              {/* </KeyboardEventHandler> */}
            </span>
            <div
              className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}
              style={{ right: "-50%" }}
            >
              <span>Try again.</span>
            </div>
          </>
        );
      case strategyDetailBySlug["OPEN_ARRAYS"].slug:
        return (
          <>
            {" "}
            <div className="calculate-sm-main-wrapper">
              <div className="first-qns">
                <span className="count-text">
                  <span className="font-36">{first_factor * second_factor}</span>
                </span>
                <span className="count-equal-sm">÷</span>
                <span className="count-text">
                  <span className="font-36">{checkedField === "first_factor" ? second_factor : first_factor}</span>
                </span>
                <span className="count-equal-sm">=</span>
                <span className="count-input-sm">
                  {" "}
                  {/* <KeyboardEventHandler
                    handleKeys={["enter", "space"]}
                    onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                    className="input-design"
                    // className={
                    //   currentAnswer === ""
                    //     ? "input-design input-empty"
                    //     : "input-design"
                    // }
                  > */}
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    inputMode="numeric"
                    className={isRightAnswer ? "form-control right-answer" : "form-control"}
                    onChange={e => handleChangeInputAnswer(e)}
                    autoFocus
                    autoComplete="off"
                    id="my_text_field"
                    // disabled={
                    //   wrongCount ===
                    //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                    // }
                    defaultValue={
                      process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                        ? `${questionDetails[questionDetails.checkedField]}`
                        : ""
                    }
                    value={currentAnswer}
                    min="0"
                    max="999"
                  />{" "}
                  {/* </KeyboardEventHandler> */}
                </span>
              </div>
              <div className="second-qns">
                <span className="count-text">
                  {" "}
                  {checkedField === "first_factor" ? (
                    <>
                      <span className="font-36">
                        <span className="count-input-sm">
                          {" "}
                          {/* <KeyboardEventHandler
                            handleKeys={["enter", "space"]}
                            onKeyEvent={checkAnswerFn(
                              currentAnswer,
                              questionDetails
                            )}
                            className="input-design"
                            // className={
                            //   currentAnswer === ""
                            //     ? "input-design input-empty"
                            //     : "input-design"
                            // }
                          > */}
                          <input
                            type="text"
                            onKeyDown={handleKeyDown}
                            inputMode="numeric"
                            className={isRightAnswer ? "form-control right-answer" : "form-control"}
                            id="my_text_field"
                            autoComplete="off"
                            onChange={e => handleChangeInputAnswer(e)}
                            // disabled={
                            //   wrongCount ===
                            //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                            // }
                            value={currentAnswer}
                            min="0"
                            max="999"
                          />{" "}
                          {/* </KeyboardEventHandler> */}
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="count-text">
                        <span className="font-36">{first_factor}</span>
                      </span>
                    </>
                  )}
                </span>
                <span className="count-equal-sm">x</span>
                <span className="count-input-sm">
                  {" "}
                  {checkedField === "second_factor" ? (
                    <>
                      {/* <KeyboardEventHandler
                      handleKeys={["enter", "space"]}
                      onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                      className="input-design"
                      // className={
                      //   currentAnswer === ""
                      //     ? "input-design input-empty"
                      //     : "input-design"
                      // }
                    > */}
                      <input
                        type="text"
                        onKeyDown={handleKeyDown}
                        inputMode="numeric"
                        className={isRightAnswer ? "form-control right-answer" : "form-control"}
                        id="my_text_field"
                        autoComplete="off"
                        onChange={e => handleChangeInputAnswer(e)}
                        // disabled={
                        //   wrongCount ===
                        //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                        // }
                        value={currentAnswer}
                        min="0"
                        max="999"
                      />
                      {/* </KeyboardEventHandler> */}
                    </>
                  ) : (
                    <span className="count-text">
                      <span className="font-36">{second_factor}</span>
                    </span>
                  )}
                </span>
                <span className="count-equal-sm">=</span>
                <span className="count-text">
                  <span className="font-36"> {first_factor * second_factor}</span>
                </span>
              </div>
            </div>
            <div
              className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}
              style={{ right: "-80%" }}
            >
              <span>Try again.</span>
            </div>
          </>
        );

      case strategyDetailBySlug["MISSING_ADDEND"].slug:
        return (
          <>
            <div className="calculate-sm-main-wrapper">
              <div className="second-qns">
                <span className="count-text">
                  <span className="font-72">{first_factor}</span>
                </span>
                <span className="count-equal">+</span>

                <span className="count-input">
                  {/* <KeyboardEventHandler
                    handleKeys={["enter", "space"]}
                    onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                    className="input-design"
                    // className={
                    //   currentAnswer === ""
                    //     ? "input-design input-empty"
                    //     : "input-design"
                    // }
                  > */}
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    inputMode="numeric"
                    className={isRightAnswer ? "form-control right-answer" : "form-control"}
                    autoFocus
                    autoComplete="off"
                    id="my_text_field"
                    onChange={e => handleChangeInputAnswer(e)}
                    value={currentAnswer}
                    // disabled={
                    //   wrongCount ===
                    //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                    // }
                    min="0"
                    max="999"
                  />
                  {/* </KeyboardEventHandler> */}
                </span>
                <span className="count-equal">=</span>
                <span className="count-text ml-10">
                  <span className="font-72"> {first_factor + second_factor}</span>
                </span>
              </div>
            </div>
            <div className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}>
              <span>Try again.</span>
            </div>
          </>
        );
      case strategyDetailBySlug["NINE_PATTERNS_STAGE_ONE"].slug:
        return (
          <>
            {" "}
            <span className="count-text">
              <span className="font-72">{`${questionDetails.first_factor} ${
                mathOperationSymbol[questionDetails.math_operation_id]
              } ${questionDetails.second_factor}`}</span>
              {questionDetails.math_opration === MATH_OPERATION.MULTIPLICATION && (
                <span className="d-block font-24 letter-space-3">
                  {questionDetails.first_factor}{" "}
                  {`${numberToStringNumber(questionDetails.second_factor)}${
                    questionDetails.first_factor === 1 ? "" : pluralOfWords(questionDetails.second_factor)
                  }`}
                </span>
              )}
            </span>
            <span className="count-equal">=</span>
            {checkedField === checkedObjList[3] ? (
              <>
                <span style={{ marginLeft: "16px" }}></span>
                <span className="count-input">
                  {/* <KeyboardEventHandler
                    handleKeys={["enter", "space"]}
                    onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                    className="input-design"
                    // className={
                    //   currentAnswer === ""
                    //     ? "input-design input-empty"
                    //     : "input-design"
                    // }
                  > */}
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    inputMode="numeric"
                    className="form-control-standard"
                    onChange={e => handleChangeInputAnswer(e)}
                    autoFocus
                    autoComplete="off"
                    id="my_text_field"
                    // disabled={
                    //   wrongCount ===
                    //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                    // }
                    value={currentAnswer}
                    min="0"
                    max="999"
                  />
                  {/* </KeyboardEventHandler> */}
                </span>
                <span
                  className="count-text"
                  style={{
                    display: "flex",
                    marginLeft: "4px",
                    borderBottom: "2px solid #c7f4ff"
                  }}
                >
                  <span className="font-60">{correct_answer_second_factor}</span>
                </span>
              </>
            ) : (
              <>
                <span style={{ marginLeft: "16px" }}></span>
                <span className="count-text" style={{ display: "flex", borderBottom: "2px solid #c7f4ff" }}>
                  <span className="font-60">{correct_answer_first_factor}</span>
                </span>
                <span className="count-input">
                  {/* <KeyboardEventHandler
                    handleKeys={["enter", "space"]}
                    onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                    className="input-design"
                    // className={
                    //   currentAnswer === ""
                    //     ? "input-design input-empty"
                    //     : "input-design"
                    // }
                  > */}
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    inputMode="numeric"
                    className="form-control-standard"
                    onChange={e => handleChangeInputAnswer(e)}
                    autoFocus
                    autoComplete="off"
                    id="my_text_field"
                    // disabled={
                    //   wrongCount ===
                    //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                    // }
                    value={currentAnswer}
                    min="0"
                    max="999"
                  />
                  {/* </KeyboardEventHandler> */}
                </span>
              </>
            )}
            <div
              className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}
              style={{ right: "-80%" }}
            >
              <span>Try again.</span>
            </div>
          </>
        );
      case strategyDetailBySlug["DIVISION_NUMBER_LINE"].slug:
        return (
          <>
            <span className="count-text">
              <span className="division-numberline-question-subtitle-wrapper">
                <span></span>{" "}
                <span className="font-72">{`${questionDetails.first_factor} ${
                  mathOperationSymbol[questionDetails.math_operation_id]
                } ${questionDetails.second_factor}`}</span>
                <span className="count-equal">=</span>
              </span>

              {questionDetails.math_operation_id === MATH_OPERATION.DIVISION && (
                <span className="d-block font-20 letter-space-3">
                  How many
                  {` ${numberToStringNumber(questionDetails.second_factor)}${
                    questionDetails.first_factor === 1 ? "" : pluralOfWords(questionDetails.second_factor)
                  }`}{" "}
                  make {questionDetails.first_factor}?
                </span>
              )}
            </span>

            <span className="count-input">
              {" "}
              {/* <KeyboardEventHandler
                handleKeys={["enter", "space"]}
                onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                className="input-design"
                // className={
                //   currentAnswer === ""
                //     ? "input-design input-empty"
                //     : "input-design"
                // }
              > */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className={isRightAnswer ? "form-control right-answer" : "form-control"}
                id="my_text_field"
                onChange={e => handleChangeInputAnswer(e)}
                autoFocus
                autoComplete="off"
                // disabled={
                //   wrongCount ===
                //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                // }

                defaultValue={
                  process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                    ? `${questionDetails[questionDetails.checkedField]}`
                    : ""
                }
                value={currentAnswer}
                max="999"
              />{" "}
              {/* </KeyboardEventHandler> */}
            </span>
            <div className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}>
              <span>Try again.</span>
            </div>
          </>
        );
      case strategyDetailBySlug["FIND_DIFFERENCE"].slug:
        return (
          <>
            <div className="calculate-sm-main-wrapper">
              <div className="first-qns">
                <span className="count-text">
                  <span className="font-36">{first_factor}</span>
                </span>
                <span className="count-equal-sm">-</span>
                <span className="count-text">
                  <span className="font-36">{second_factor}</span>
                </span>
                <span className="count-equal-sm">=</span>
                <span className="count-input-sm">
                  {" "}
                  {/* <KeyboardEventHandler
                    handleKeys={["enter", "space"]}
                    onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                    className="input-design"
                    // className={
                    //   currentAnswer === ""
                    //     ? "input-design input-empty"
                    //     : "input-design"
                    // }
                  > */}
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    inputMode="numeric"
                    className={isRightAnswer ? "form-control right-answer" : "form-control"}
                    onChange={e => handleChangeInputAnswer(e)}
                    autoFocus
                    autoComplete="off"
                    id="my_text_field"
                    // disabled={
                    //   wrongCount ===
                    //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                    // }
                    defaultValue={
                      process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                        ? `${questionDetails[questionDetails.checkedField]}`
                        : ""
                    }
                    value={currentAnswer}
                    min="0"
                    max="999"
                  />{" "}
                  {/* </KeyboardEventHandler> */}
                </span>
              </div>
              <div className="second-qns">
                <span className="count-text">
                  <>
                    <span className="count-text">
                      <span className="font-36">{second_factor}</span>
                    </span>
                  </>
                </span>
                <span className="count-equal-sm">+</span>
                <span className="count-input-sm">
                  {/* <KeyboardEventHandler
                    handleKeys={["enter", "space"]}
                    onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                    className="input-design"
                    // className={
                    //   currentAnswer === ""
                    //     ? "input-design input-empty"
                    //     : "input-design"
                    // }
                  > */}
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    inputMode="numeric"
                    className={isRightAnswer ? "form-control right-answer" : "form-control"}
                    id="my_text_field"
                    autoComplete="off"
                    onChange={e => handleChangeInputAnswer(e)}
                    // disabled={
                    //   wrongCount ===
                    //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                    // }
                    value={currentAnswer}
                    min="0"
                    max="999"
                  />
                  {/* </KeyboardEventHandler> */}
                </span>
                <span className="count-equal-sm">=</span>
                <span className="count-text">
                  <span className="font-36"> {first_factor}</span>
                </span>
              </div>
            </div>
            <div
              className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}
              style={{ right: "-80%" }}
            >
              <span>Try again.</span>
            </div>
          </>
        );
      case strategyDetailBySlug["BAR_DIAGRAM_DIVISION"].slug:
        return (
          <>
            <span className="count-text">
              <span className="font-72">{`${questionDetails.first_factor} ${
                mathOperationSymbol[questionDetails.math_operation_id]
              } ${questionDetails.second_factor}`}</span>
              {questionDetails.math_operation_id === MATH_OPERATION.MULTIPLICATION && (
                <span className="d-block font-24 letter-space-3">
                  {questionDetails.first_factor}{" "}
                  {`${numberToStringNumber(questionDetails.second_factor)}${
                    questionDetails.first_factor === 1 ? "" : pluralOfWords(questionDetails.second_factor)
                  }`}
                </span>
              )}
            </span>
            <span className="count-equal">=</span>
            <span className="count-input">
              {" "}
              {/* <KeyboardEventHandler
                handleKeys={["enter", "space"]}
                onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                className="input-design"
                // className={
                //   currentAnswer === ""
                //     ? "input-design input-empty"
                //     : "input-design"
                // }
              > */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className={isRightAnswer ? "form-control right-answer" : "form-control"}
                id="my_text_field"
                onChange={e => handleChangeInputAnswer(e)}
                autoFocus
                autoComplete="off"
                // disabled={
                //   wrongCount ===
                //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                // }

                defaultValue={
                  process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                    ? `${questionDetails[questionDetails.checkedField]}`
                    : ""
                }
                value={currentAnswer}
                max="20"
              />{" "}
              {/* </KeyboardEventHandler> */}
            </span>
            <div className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}>
              <span>Try again.</span>
            </div>
          </>
        );

      case strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE"].slug:
        return (
          <>
            <span className="count-text">
              <span className="font-72">{`${questionDetails.first_factor} ${
                mathOperationSymbol[questionDetails.math_operation_id]
              } ${questionDetails.second_factor}`}</span>
              {questionDetails.math_operation_id === MATH_OPERATION.MULTIPLICATION && (
                <span className="d-block font-24 letter-space-3">
                  {questionDetails.first_factor} {pluralize("twenty-five", questionDetails.first_factor)}
                </span>
              )}
            </span>
            <span className="count-equal">=</span>
            <span className="count-input">
              {" "}
              {/* <KeyboardEventHandler
                handleKeys={["enter", "space"]}
                onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                className="input-design"
                // className={
                //   currentAnswer === ""
                //     ? "input-design input-empty"
                //     : "input-design"
                // }
              > */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className={isRightAnswer ? "form-control right-answer" : "form-control"}
                id="my_text_field"
                onChange={e => handleChangeInputAnswer(e)}
                autoFocus
                autoComplete="off"
                // disabled={
                //   wrongCount ===
                //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                // }

                defaultValue={
                  process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                    ? `${questionDetails[questionDetails.checkedField]}`
                    : ""
                }
                value={currentAnswer}
                max="20"
              />{" "}
              {/* </KeyboardEventHandler> */}
            </span>
            <div className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}>
              <span>Try again.</span>
            </div>
          </>
        );

      case strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_TWO"].slug:
        return (
          <>
            <span className="count-text">
              <span className="font-72">{`${questionDetails.first_factor} ${
                mathOperationSymbol[questionDetails.math_operation_id]
              } ${questionDetails.second_factor}`}</span>
              {questionDetails.math_operation_id === MATH_OPERATION.MULTIPLICATION && (
                <span className="d-block font-24 letter-space-3">
                  {questionDetails.first_factor} {pluralize("twenty-five", questionDetails.first_factor)}
                </span>
              )}
            </span>
            <span className="count-equal">=</span>
            <span className="count-input">
              {" "}
              {/* <KeyboardEventHandler
                handleKeys={["enter", "space"]}
                onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                className="input-design"
                // className={
                //   currentAnswer === ""
                //     ? "input-design input-empty"
                //     : "input-design"
                // }
              > */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className={isRightAnswer ? "form-control right-answer" : "form-control"}
                id="my_text_field"
                onChange={e => handleChangeInputAnswer(e)}
                autoFocus
                autoComplete="off"
                // disabled={
                //   wrongCount ===
                //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                // }

                defaultValue={
                  process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                    ? `${questionDetails[questionDetails.checkedField]}`
                    : ""
                }
                value={currentAnswer}
                max="20"
              />{" "}
              {/* </KeyboardEventHandler> */}
            </span>
            <div className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}>
              <span>Try again.</span>
            </div>
          </>
        );
      case strategyDetailBySlug["FILL_IN_THE_BLANKS"].slug:
        return (
          <>
            <span className="count-text">
              <span className="font-72">?</span>
              {/* {questionDetails.math_operation_id ===
                MATH_OPERATION.MULTIPLICATION && (
                <span className="d-block font-24 letter-space-3">
                  {questionDetails.first_factor}{" "}
                  {`${numberToStringNumber(questionDetails.second_factor)}${
                    questionDetails.first_factor === 1
                      ? ""
                      : pluralOfWords(questionDetails.second_factor)
                  }`}
                </span>
              )} */}
            </span>
            <span className="count-equal">=</span>
            <span className="count-input">
              {" "}
              {/* <KeyboardEventHandler
                handleKeys={["enter", "space"]}
                onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                className="input-design"
                // className={
                //   currentAnswer === ""
                //     ? "input-design input-empty"
                //     : "input-design"
                // }
              > */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className={isRightAnswer ? "form-control right-answer" : "form-control"}
                id="my_text_field"
                onChange={e => handleChangeInputAnswer(e)}
                autoFocus
                autoComplete="off"
                // disabled={
                //   wrongCount ===
                //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                // }

                defaultValue={
                  process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                    ? `${questionDetails[questionDetails.checkedField]}`
                    : ""
                }
                value={currentAnswer}
                max="999"
              />{" "}
              {/* </KeyboardEventHandler> */}
            </span>
            <div className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}>
              <span>Try again.</span>
            </div>
          </>
        );

      default:
        return (
          <>
            <span className="count-text">
              <span className="font-72">{`${questionDetails.first_factor} ${
                mathOperationSymbol[questionDetails.math_operation_id]
              } ${questionDetails.second_factor}`}</span>
              {questionDetails.math_operation_id === MATH_OPERATION.MULTIPLICATION && (
                <span className="d-block font-24 letter-space-3">
                  {questionDetails.first_factor}{" "}
                  {`${numberToStringNumber(questionDetails.second_factor)}${
                    questionDetails.first_factor === 1 ? "" : pluralOfWords(questionDetails.second_factor)
                  }`}
                </span>
              )}
            </span>
            <span className="count-equal">=</span>
            <span className="count-input">
              {" "}
              {/* <KeyboardEventHandler
                handleKeys={["enter", "space"]}
                onKeyEvent={checkAnswerFn(currentAnswer, questionDetails)}
                className="input-design"
                // className={
                //   currentAnswer === ""
                //     ? "input-design input-empty"
                //     : "input-design"
                // }
              > */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className={isRightAnswer ? "form-control right-answer" : "form-control"}
                id="my_text_field"
                onChange={e => handleChangeInputAnswer(e)}
                autoFocus
                autoComplete="off"
                // disabled={
                //   wrongCount ===
                //   +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT
                // }

                defaultValue={
                  process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER === "YES"
                    ? `${questionDetails[questionDetails.checkedField]}`
                    : ""
                }
                value={currentAnswer}
                max="999"
              />{" "}
              {/* </KeyboardEventHandler> */}
            </span>
            <div className={isWrongAnswer ? "wrong-answer-text-wrapper-visible" : "wrong-answer-text-wrapper-hidden"}>
              <span>Try again.</span>
            </div>
          </>
        );
    }
  }
  return strategyRender(slug);
}
export default TeacherQuestionText;
