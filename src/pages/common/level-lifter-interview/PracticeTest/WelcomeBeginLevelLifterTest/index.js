import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import ReactGA from "react-ga4";
// import Timer from "components/Timer";
import Button from "components/common/Button";
import LevelLifterInterviewDirectionPopup from "../../../../../components/common/LevelLifterInterviewDirectionPopup";
import { getLevelLifterQuestionList, createNewLevelLifterSubmission } from "../../../../../redux/actions";
import { userRole } from "config/const";
import calcAdditionImg from "assets/images/other/calc-addition.svg";
import calcDivisionImg from "assets/images/other/calc-division.svg";
import calcMultiplicationImg from "assets/images/other/calc-multiplication.svg";
import calcSubtractionImg from "assets/images/other/calc-subtraction.svg";
// import useKeypress from "react-use-keypress";
const BeginTest = props => {
  // const { handleShowQuestion } = props;
  const dispatch = useDispatch();
  // const [isShowTimer, setIsShowTimer] = useState(false);

  const [isShowTeacherWelcomePopup, setIsShowTeacherWelcomePopup] = useState(true);

  const { userDetails } = useSelector(({ auth }) => auth);

  const student = JSON.parse(localStorage.getItem("interview_student_user"));

  const {
    profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id, current_assignment_id }
  } = student;

  const activeLevelId = student_learning_mode_id === 1 ? add_sub_level_id : mul_div_level_id;
  let activeMathOperation = student_learning_mode_id === 1 ? "Addition" : "Multiplication";

  const handleFetchLevelLifterSubmissionDetails = () => {
    dispatch(getLevelLifterQuestionList("", "", student_learning_mode_id, "", activeLevelId));

    props.isShowTest();
  };

  // Key press Event
  // useKeypress("Enter", () => {
  //   // Do something when the user has pressed the Space and Enter key
  //   handleClickBeginTest();
  // });

  //please change second timer as per timer component timers countdonw* 5 -500 , ex. 1000 * 5 -500 = 4500
  const handleClickBeginTest = () => {
    handleFetchData();
    if (process.env.REACT_APP_ENV !== "development" || process.env.REACT_APP_ENV !== "staging") {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Level Lifter  test `,
        action: `Teacher clicked Begin  ${activeMathOperation} Test`,
        label: "Teacher page"
      });
    }
  };
  const mathOprationList = {
    Addition: {
      title: "addition",
      img: calcAdditionImg
    },

    Subtracton: {
      title: "subtracton",
      img: calcSubtractionImg
    },
    Multiplication: {
      title: "multiplication",
      img: calcMultiplicationImg
    },
    Division: {
      title: "division",
      img: calcDivisionImg
    }
  };
  // const handleShowQuestionDeck = () => {
  //   dispatch(getLevelLifterQuestionList());
  //   handleShowQuestion();
  // };

  const handleCloseTeacherWelcomePopup = () => {
    // localStorage.setItem("is_show_welcome_popup", true);

    setIsShowTeacherWelcomePopup(false);
  };

  const isTeacherUser = !sessionStorage.getItem("user-role") && localStorage.getItem("user-role");
  // const handleStartTimer = () => {
  //   setIsShowTimer(true);
  // };

  const handleFetchData = () => {
    const body = {
      status_id: "lss_20c437727b4f974676da2386",
      assignment_id: current_assignment_id,
      assigned_level_id: activeLevelId,
      learning_mode_id: student_learning_mode_id,
      submission_type: "interview"
    };
    async function fetchData() {
      // You can await here
      await dispatch(createNewLevelLifterSubmission(body, handleFetchLevelLifterSubmissionDetails, student.id));
      // ...
    }
    fetchData();
  };

  // const handleCloseTimer = () => {
  //   setIsShowTimer(false);
  // };

  return (
    <>
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    {/* <span className="watermark-text op-8">Try your best</span> */}

                    <LevelLifterInterviewDirectionPopup
                      close={handleCloseTeacherWelcomePopup}
                      open={
                        isTeacherUser === userRole.TEACHER.role_name &&
                        userDetails &&
                        !userDetails.profile.is_disabled_interview_banner &&
                        isShowTeacherWelcomePopup
                      }
                    />

                    <span className="watermark-text op-8">Level Lifter</span>

                    <div className="assessment-content">
                      <div className="level-lifter-wrap mw-full">
                        <i className="icon-levellifter"></i>
                        <span className="btn-text">
                          Level Lifter interview for {student.profile.first_name} {student.profile.last_name}
                        </span>
                      </div>

                      <p className="mt-5 mb-0">
                        {/* {activeMathOprationIndex !== 0 ? "Good work. " : ""}{" "} */}
                        Now get ready for some <br />
                        <span>
                          {Object.keys(userDetails).length && mathOprationList[activeMathOperation].title}
                        </span>{" "}
                        problems.
                        <br />
                        <p className="mt-5 mb-0 level-lifter-desc">
                          {" "}
                          Level Lifter questions do not have models or hints.
                        </p>
                      </p>

                      <p className="mb-0">
                        Press <b>‘Begin’</b> when you are ready.
                      </p>
                    </div>
                    <div className="test-button-wrap" style={{ height: "80px" }}>
                      <Button
                        className="btn btn-test"
                        name={"Begin"}
                        onClick={() => {
                          handleClickBeginTest();
                        }}
                      />
                    </div>
                    {/* Only show question in development and staging */}
                    {/* {(process.env.REACT_APP_ENV === "development" ||
                      process.env.REACT_APP_ENV === "staging") && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                        }}
                      >
                        <button
                          className="btn btn-test"
                          onClick={() => handleShowQuestionDeck()}
                        >
                          Show Qns
                        </button>
                      </div>
                    )} */}
                  </div>
                  <div className="level-lifter-help-wrapper">
                    <Tooltip
                      title={
                        <>
                          <p color="inherit">
                            Interviews allow students to take the Level Lifter orally. This might be helpful for
                            students with anxiety, attention difficulties or for those who may struggle with entering
                            their responses accurately.
                          </p>{" "}
                          <p color="inherit">
                            Hit the <span className="ant-tooltip-span">spacebar</span> for each correct-and-fluent
                            response. Hit <span className="ant-tooltip-span">any letter key</span> for any responses
                            that are incorrect or for ones that you do not consider fluent.
                          </p>{" "}
                          <p color="inherit">
                            After the interview, a report of the responses will be provided. You will then be able to
                            select whether the student is ready to level up or needs to continue working on this level.
                          </p>
                          <p color="inherit">
                            You may advance to the next operation when you feel ready. You may end the interview early
                            by hitting the ‘End interview’ button. You will still then have the option of promoting the
                            student or not.
                          </p>
                        </>
                      }
                      overlayClassName="ant-tooltip-reset-counter-level-lifter"
                    >
                      <div className="qn-mark-icon">
                        <b>?</b>
                      </div>
                    </Tooltip>
                  </div>
                  {/* <p className="bottom-no-hint-text">
                    • Level Lifter questions do not have models or hints.
                  </p> */}
                </div>

                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    <img src={mathOprationList[activeMathOperation].img} className="vec-img" alt="vec-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BeginTest;
