import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import thumbsupImg from "assets/images/thumbs-up.svg";
import { useTranslation } from "react-i18next";
// import { logout } from "store/action";

const PlacementTestCompletion = props => {
  // const dispatch = useDispatch();
  const { learning_mode } = props;
  let navigate = useNavigate();
  const { t } = useTranslation();

  const { width, height } = useWindowSize();
  const handleRedirectToPracticeSession = () => {
    navigate("/student/practice-select-activity");
  };

  // const authLogoutSuccess = () => {
  //   //student user so removed session storage and redirected to student login page

  //   sessionStorage.clear();

  //   history.replace("/student/login");
  // };

  //logout student
  // const handleLogoutUser = () => {
  //   dispatch(logout(authLogoutSuccess));
  // };

  // get maximum level in basic fact as per learning mode
  const basicFactsMaxLevel = learning_mode === 1 ? 11 : 12;
  return (
    <>
      {/* #lastlevel */}
      {props.updatedAssignedLevel === 26 && (
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
      )}
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    {/* {props.updatedAssignedLevel === 12 ? (
                      <>
                        {props.learning_mode === 1 ? (
                          <>
                            <span className="watermark-text op-8">Wow!!</span>
                            <div className="assessment-content">
                              <p>You have mastered all the basic</p>

                              <p>
                                <span>addition</span> and{" "}
                                <span>subtraction</span> facts.
                              </p>
                              <p>
                                <b>Well done!</b>
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="watermark-text op-8">
                              Congratulations!
                            </span>
                            <div className="assessment-content">
                              <p>You have mastered all the basic</p>
                              <p>
                                <span>multiplication</span> and{" "}
                                <span>division</span> facts.
                              </p>
                              <p>
                                <b>Well done!!</b>
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    ) : ( */}
                    <>
                      <span className="watermark-text op-8">{t("placement-test.goodText")}</span>
                      <p className="spotlight-text">
                        <span>{t("placement-test.goodText")}</span>
                      </p>
                      {/* #lastlevel */}
                      {props.updatedAssignedLevel === 26 ? (
                        <h1 className="bigger-text">
                          <div className="assessment-content">
                            <p className="small-font-40-text mt-10">
                              {t("placement-test.CongratulationsText")}{" "}
                              <b>{learning_mode === 1 ? "addition and subtraction" : "multiplication and division"}</b>{" "}
                              {t("placement-test.FactsText")}
                            </p>
                            <p className="small-font-40-text">
                              {t("placement-test.CompletedTestText")}{" "}
                              <b>{learning_mode === 1 ? "addition and subtraction" : "multiplication and division"}</b>{" "}
                              {t("placement-test.programText")}
                            </p>
                          </div>
                          {/* <small>
                            {`Congratulations! You are a master of all the basic
                            and advanced ${
                              learning_mode === 1
                                ? "addition and subtraction"
                                : "multiplication and division"
                            } facts.
                            Please let your teacher know that you have completed
                            MathFactLab’s multiplication and division program.`}
                          </small>{" "} */}
                        </h1>
                      ) : //    #lastlevel
                      props.updatedAssignedLevel >= basicFactsMaxLevel ? (
                        <>
                          <div className="assessment-content">
                            <p className="small-font-40-text mt-10">
                              {t("placement-test.CongratulationText")}{" "}
                              <b>{learning_mode === 1 ? "addition and subtraction" : "multiplication and division"}</b>{" "}
                              facts.
                            </p>
                            <p className="small-font-40-text">
                              You are now ready to work on advanced{" "}
                              <b>{learning_mode === 1 ? "addition and subtraction" : "multiplication and division"}</b>{" "}
                              facts.
                            </p>
                          </div>
                        </>
                      ) : (
                        <h1 className="bigger-text">
                          <small>{t("placement-test.nowLetsReadyText")}</small>{" "}
                        </h1>
                      )}

                      <div
                        className="test-button-wrap"
                        // onClick={() => handleLogoutUser()}

                        onClick={() => handleRedirectToPracticeSession()}
                      >
                        <button className="btn btn-test">
                          {t("placement-test.startedButton")} {/* See you tomorrow */}
                        </button>
                      </div>
                    </>
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

export default PlacementTestCompletion;
