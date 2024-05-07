import React from "react";
import thumbsupImg from "assets/images/thumbs-up.svg";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PlacementTestCompletion(props) {
  let history = useHistory();
  const { t } = useTranslation();
  const handleRedirectToPracticeSession = () => {
    history.push("/student/practice-select-activity");
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
                    {props.updatedAssignedLevel === 12 ? (
                      <>
                        {props.learning_mode === 1 ? (
                          <>
                            <span className="watermark-text op-8">Wow!!</span>
                            <div className="assessment-content">
                              <p>You have mastered all the basic</p>

                              <p>
                                <span>addition</span> and <span>subtraction</span> facts.
                              </p>
                              <p>
                                <b>Well done!</b>
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="watermark-text op-8">Congratulations!</span>
                            <div className="assessment-content">
                              <p>You have mastered all the basic</p>
                              <p>
                                <span>multiplication</span> and <span>division</span> facts.
                              </p>
                              <p>
                                <b>Well done!!</b>
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="watermark-text op-8"> {t("placement-test.goodText")}</span>
                        <p className="spotlight-text">
                          <span>{t("placement-test.goodText")}</span>
                        </p>
                        <h1 className="bigger-text">
                          <small>Now let's get started!</small>{" "}
                        </h1>
                        <div className="test-button-wrap" onClick={() => handleRedirectToPracticeSession()}>
                          <button className="btn btn-test">Let's Get Started</button>
                        </div>
                      </>
                    )}
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
}

export default PlacementTestCompletion;
