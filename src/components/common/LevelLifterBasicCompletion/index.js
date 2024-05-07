import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Confetti from "react-confetti";
import moment from "moment";
import { useWindowSize } from "react-use";
import { getLastLevelByLearningMode } from "utils/helpers";
import { studentSessionTimeLimitList } from "config/const";
import { logout } from "../../../redux/actions/authAction";
import { endSession } from "../../../redux/actions/practiceAction";
import thumbsupImg from "assets/images/thumbs-up.svg";

const LevelLifterBasicCompletion = props => {
  const dispatch = useDispatch();
  const { learning_mode, updatedAssignedLevel } = props;
  let navigate = useNavigate();
  const { t } = useTranslation();

  const { width, height } = useWindowSize();
  const [isShowMessage, setIsShowMessage] = useState(false);
  const handleRedirectToPracticeSession = () => {
    navigate("/student/practice-select-activity");
  };

  let duration = moment.duration(moment().diff(sessionStorage.getItem("session_start_date"), "YYYY-MM-DD HH:mm"));

  const counter = Math.round(duration.asMinutes());

  const authLogoutSuccess = () => {
    //student user so removed session storage and redirected to student login page

    sessionStorage.clear();

    navigate("/login");
  };

  //logout student
  const handleLogoutUser = () => {
    dispatch(logout(authLogoutSuccess));
  };

  const maxSessionLimit = studentSessionTimeLimitList.find(
    (limit, index) => index + 1 === studentSessionTimeLimitList.length
  ).value;
  const handleEndSession = async () => {
    let sessionID = sessionStorage.getItem("session_id");
    if (sessionID) {
      const body = {
        time_taken_in_min: counter > maxSessionLimit ? maxSessionLimit : counter,
        end_time: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
        status: 1,

        ending_level_id: +updatedAssignedLevel,
        updated_by: "STUDENT"
      };

      await dispatch(endSession(sessionID, body));
    }
    handleLogoutUser();
  };

  // get maximum level in basic fact as per learning mode
  // const basicFactsMaxLevel = learning_mode === 1 ? 11 : 12;

  useEffect(() => {
    setTimeout(() => {
      setIsShowMessage(true);
    }, 500);
  });

  const getSuccessMessageByMode = (learning_mode, updatedAssignedLevel) => {
    if (learning_mode === 1) {
      switch (updatedAssignedLevel) {
        case 6: {
          return (
            <div className="assessment-content">
              <p className="small-font-40-text mt-10">
                Congratulations! You have mastered the
                <b> Basic Part 1 </b>
                addition and subtraction facts.
              </p>
              <p className="small-font-40-text">
                You are now ready to work on
                <b> Basic Part 2 </b>
                addition and subtraction facts.
              </p>
            </div>
          );
        }

        case 11: {
          return (
            <div className="assessment-content">
              <p className="small-font-40-text mt-10">
                {t("placement-test.CongratulationMasteredText")}
                <b> Basic </b>
                addition and subtraction facts.
              </p>
              <p className="small-font-40-text">
                You are now ready to work on
                <b> Advanced </b>
                addition and subtraction facts.
              </p>
            </div>
          );
        }

        case 13: {
          return (
            <div className="assessment-content">
              <p className="small-font-40-text mt-10">
                Congratulations! You have mastered the
                <b> Advanced </b>
                addition and subtraction facts.
              </p>
              <p className="small-font-40-text">
                You are now ready to work on
                <b> Super-Advanced </b>
                addition and subtraction facts.
              </p>
            </div>
          );
        }
        default:
          return (
            <h1 className="bigger-text">
              <div className="assessment-content">
                <p className="small-font-40-text mt-10">
                  {t("placement-test.CongratulationMasteredText")}
                  <b> Basic, Advanced, and Super-Advanced </b>
                  addition and subtraction facts.
                </p>
                <p className="small-font-40-text">
                  Please let your teacher know that you have completed MathFactLab’s addition and subtraction program.
                </p>
                <p className="small-font-40-text">
                  You are now ready for our
                  <b> Graduate Level. </b> Log in regularly to keep your skills sharp.
                </p>
              </div>
            </h1>
          );
      }
    } else {
      switch (updatedAssignedLevel) {
        case 6: {
          return (
            <div className="assessment-content">
              <p className="small-font-40-text mt-10">
                Congratulations! You have mastered the
                <b> Basic Part 1 </b>
                multiplication and division facts.
              </p>
              <p className="small-font-40-text">
                You are now ready to work on
                <b> Basic Part 2 </b>
                multiplication and division facts.
              </p>
            </div>
          );
        }
        case 12: {
          return (
            <div className="assessment-content">
              <p className="small-font-40-text mt-10">
                {t("placement-test.CongratulationMasteredText")}
                <b> Basic </b>
                multiplication and division facts.
              </p>
              <p className="small-font-40-text">
                You are now ready to work on
                <b> Advanced </b>
                multiplication and division facts.
              </p>
            </div>
          );
        }
        case 14: {
          return (
            <div className="assessment-content">
              <p className="small-font-40-text mt-10">
                Congratulations! You have mastered the
                <b> Advanced </b>
                multiplication and division facts.
              </p>
              <p className="small-font-40-text">
                You are now ready to work on
                <b> Super-Advanced </b>
                multiplication and division facts.
              </p>
            </div>
          );
        }
        case 20: {
          return (
            <div className="assessment-content">
              <p className="small-font-40-text mt-10">
                Congratulations! You have mastered the
                <b> Super-Advanced </b>
                multiplication and division facts.
              </p>
              <p className="small-font-40-text">
                You are now ready to work on the
                <b> Super-Duper-Advanced </b>
                multiplication and division facts.
              </p>
            </div>
          );
        }
        default:
          return (
            <h1 className="bigger-text">
              <div className="assessment-content">
                <p className="small-font-40-text mt-10">
                  {t("placement-test.CongratulationMasteredText")}
                  <b> Basic, Advanced, Super-Advanced, and Super-Duper-Advanced </b>
                  multiplication and division facts.
                </p>
                <p className="small-font-40-text">
                  Please let your teacher know that you have completed MathFactLab’s multiplication and division
                  program.
                </p>
                <p className="small-font-40-text">
                  You are now ready for our
                  <b> Graduate Level. </b> Log in regularly to keep your skills sharp.
                </p>
              </div>
            </h1>
          );
      }
    }
  };

  const maxLevelCountByLearningMode = getLastLevelByLearningMode(learning_mode);

  return (
    <>
      {/* #lastlevel */}
      {/* {props.updatedAssignedLevel === 14 && ( */}
      <Confetti
        recycle={false}
        numberOfPieces={100}
        width={width}
        height={height}
        // by increase area of x and y  will be increase
        initialVelocityX={{ min: -10, max: 10 }}
        initialVelocityY={{ min: -10, max: 10 }}
        confettiSource={{
          w: 10,
          h: 10,
          x: width / 3,
          y: height / 2.3
        }}
      >
        {" "}
      </Confetti>
      {/* )} */}
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    {isShowMessage ? (
                      <>
                        <span className="watermark-text op-8">
                          {props.updatedAssignedLevel === maxLevelCountByLearningMode ? "Excellent" : "Good"} work
                        </span>
                        <p className="spotlight-text">
                          <span>
                            {props.updatedAssignedLevel === maxLevelCountByLearningMode ? "Excellent" : "Good"} Work!
                          </span>
                        </p>
                        {/* #lastlevel */}

                        {getSuccessMessageByMode(learning_mode, updatedAssignedLevel)}
                        {/* 
                        {props.updatedAssignedLevel > 12 ? (
                          <h1 className="bigger-text">
                            <div className="assessment-content">
                              <p className="small-font-40-text mt-10">
                                Congratulations! You are a master of all the
                                basic and advanced{" "}
                                <b>
                                  {learning_mode === 1
                                    ? "addition and subtraction"
                                    : "multiplication and division"}
                                </b>{" "}
                                facts.
                              </p>
                              <p className="small-font-40-text">
                                Please let your teacher know that you have
                                completed MathFactLab’s{" "}
                                <b>
                                  {learning_mode === 1
                                    ? "addition and subtraction"
                                    : "multiplication and division"}
                                </b>{" "}
                                program.
                              </p>
                              <p className="small-font-40-text">
                                Log in regularly to keep your skills sharp by
                                working on our <b>Graduate</b> level.
                              </p>
                            </div>
                          </h1>
                        ) : //    #lastlevel
                        props.updatedAssignedLevel >= basicFactsMaxLevel ? (
                          <>
                            <div className="assessment-content">
                              <p className="small-font-40-text mt-10">
                                Congratulations! You have mastered the basic{" "}
                                <b>
                                  {learning_mode === 1
                                    ? "addition and subtraction"
                                    : "multiplication and division"}
                                </b>{" "}
                                facts.
                              </p>
                              <p className="small-font-40-text">
                                You are now ready to work on advanced{" "}
                                <b>
                                  {learning_mode === 1
                                    ? "addition and subtraction"
                                    : "multiplication and division"}
                                </b>{" "}
                                facts.
                              </p>
                            </div>
                          </>
                        ) : (
                          <h1 className="bigger-text">
                            <small>Now let's get started!</small>{" "}
                          </h1>
                        )} */}

                        <div
                          className="test-button-wrap"
                          onClick={
                            props.updatedAssignedLevel === maxLevelCountByLearningMode
                              ? () => handleEndSession()
                              : () => handleRedirectToPracticeSession()
                          }
                        >
                          <button className="btn btn-test">
                            {props.updatedAssignedLevel === 26 ? "See You Soon!" : "Let's Get Started"}
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {/* )} */}
                  </div>
                </div>
                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    <img src={thumbsupImg} className="vec-img" alt="thumbsupImg" />
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

export default LevelLifterBasicCompletion;
