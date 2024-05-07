import React, { useState } from "react";
import calcAdditionImg from "../../../../../assets/images/other/calc-addition.svg";
import calcDivisionImg from "../../../../../assets/images/other/calc-division.svg";
import calcMultiplicationImg from "../../../../../assets/images/other/calc-multiplication.svg";
import calcSubtractionImg from "../../../../../assets/images/other/calc-subtraction.svg";
import { useDispatch, useSelector } from "react-redux";
import Timer from "../../../../../components/common/Timer";
import Button from "../../../../../components/common/Button";
import {
  getLevelLifterQuestionList,
  createNewLevelLifterSubmission
} from "../../../../../redux/actions/practiceAction";
import { useTranslation } from "react-i18next";

const BeginTest = props => {
  const { handleShowQuestion } = props;
  const dispatch = useDispatch();
  const [isShowTimer, setIsShowTimer] = useState(false);
  const { t } = useTranslation();
  const { userDetails } = useSelector(({ auth }) => auth);

  const {
    profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id, current_assignment_id }
  } = userDetails;

  const levelId = student_learning_mode_id === 1 ? add_sub_level_id : mul_div_level_id;
  let activeMathOperation = userDetails.profile.student_learning_mode_id === 1 ? "Addition" : "Multiplication";

  const handleFetchLevelLifterSubmissionDetails = () => {
    dispatch(getLevelLifterQuestionList("", "", student_learning_mode_id, "", levelId));
    props.isShowTest();
  };

  // Key press Event
  // useKeypress("Enter", () => {
  //   // Do something when the user has pressed the Space and Enter key
  //   handleClickBeginTest();
  // });

  //please change second timer as per timer component timers countdonw* 5 -500 , ex. 1000 * 5 -500 = 4500
  const handleClickBeginTest = () => {
    setIsShowTimer(true);
    // history
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
    setTimeout(() => {
      handleFetchData();
    }, 4000);
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
  const handleShowQuestionDeck = () => {
    dispatch(getLevelLifterQuestionList("", "", student_learning_mode_id, "", levelId));
    handleShowQuestion();
  };
  // const handleStartTimer = () => {
  //   setIsShowTimer(true);
  // };

  const handleFetchData = () => {
    const body = {
      status_id: "lss_20c437727b4f974676da2386",
      assignment_id: current_assignment_id,
      // title: "dummy1",
      session_id: sessionStorage.getItem("session_id"),
      assigned_level_id: levelId,
      learning_mode_id: student_learning_mode_id
    };
    async function fetchData() {
      // You can await here
      await dispatch(createNewLevelLifterSubmission(body, handleFetchLevelLifterSubmissionDetails));
      // ...
    }
    fetchData();
  };

  const handleCloseTimer = () => {
    setIsShowTimer(false);
  };

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
                    <span className="watermark-text op-8">{t("practice-select-activity.LevelLifterButton")}</span>

                    <div className="assessment-content">
                      <div className="level-lifter-wrap">
                        <i className="icon-levellifter"></i>{" "}
                        <span className="btn-text">{t("practice-select-activity.LevelLifterButton")}</span>
                      </div>

                      <p className="mt-5 mb-0">
                        {/* {activeMathOprationIndex !== 0 ? "Good work. " : ""}{" "} */}
                        {t("placement-test.subText")} <br />
                        <span>
                          {Object.keys(userDetails).length && mathOprationList[activeMathOperation].title}
                        </span>{" "}
                        {t("placement-test.problemText")}
                        <br />
                        <p className="mt-5 mb-0 level-lifter-desc"> {t("practice-select-activity.LevelHintText")}</p>
                      </p>

                      <p className="mb-0">
                        {t("placement-test.pressText")} <b>{t("placement-test.BeginText")}</b>{" "}
                        {t("placement-test.readyText")}
                      </p>
                    </div>

                    <div className="test-button-wrap" style={{ height: "80px" }}>
                      {isShowTimer ? (
                        <>
                          <Timer closeTimer={handleCloseTimer} />
                        </>
                      ) : (
                        <Button
                          className="btn btn-test"
                          name={t("placement-test.alternativeText")}
                          onClick={() => {
                            handleClickBeginTest();
                          }}
                        />
                      )}
                    </div>
                    {/* Only show question in development and staging */}
                    {(process.env.REACT_APP_ENV === "development" || process.env.REACT_APP_ENV === "staging") && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0
                        }}
                      >
                        <button className="btn btn-test" onClick={() => handleShowQuestionDeck()}>
                          {t("practice-select-activity.showQns")}
                        </button>
                      </div>
                    )}
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
