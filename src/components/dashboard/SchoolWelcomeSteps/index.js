import React, { useState } from "react";
import Step1 from "./Step1";
import logo from "assets/images/logo.svg";
import "assets/sass/components/button-ant.scss";

const SchoolWelcomeSteps = props => {
  const [currentStep, setCurrentStep] = useState(0);

  const { closePopup, isOpenPopup } = props;

  // const handleNextNewUser = () => {
  //   if (currentStep === 1) {
  //     handleClose();
  //     // For not show again on new user
  //   } else {
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

  const handleClose = () => {
    closePopup();
  };

  return (
    <>
      <section className="welcome-step-layout">
        <div
          className={
            isOpenPopup
              ? "custom-popup open welcome-step-popup ease-in-popup"
              : "custom-popup  welcome-step-popup ease-in-popup"
          }
        >
          <div className="popup">
            <span className="close-text" onClick={handleClose}>
              X Close
            </span>

            {/* <div className="welcome-step-popup-left">
              <div className="popup-left-inner">
                <img src={logo} alt="MathFactLab" className="login-logo" />
                <Steps
                  current={currentStep}
                  direction="vertical"
                  progressDot
                ></Steps>
              </div>
            </div> */}

            <img
              src={logo}
              alt="MathFactLab"
              className="close-text"
              style={{
                width: 234,
                left: 20
              }}
            />

            <div
              className={true ? "welcome-step-popup-right layout-content-center" : "welcome-step-popup-right"}
              // ! :please remove after all steps added
              style={{ padding: "25px 180px" }}
            >
              <div className="welcome-step-popup-content">
                {currentStep === 0 && (
                  <Step1
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
                    // handleNextNewUser={handleNextNewUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={isOpenPopup ? "twoLayout-popup-backface open" : "twoLayout-popup-backface "}></div>
      </section>
    </>
  );
};

export default SchoolWelcomeSteps;
