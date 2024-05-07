import React, { useState } from "react";
import Timer from "../../../../../../components/common/Timer";
import Button from "../../../../../../components/common/Button";
import warmUp38Img from "../../../../../../assets/images/warmup-38.svg";
import calcAdditionImg from "../../../../../../assets/images/other/calc-addition.svg";
import calcDivisionImg from "../../../../../../assets/images/other/calc-division.svg";
import calcMultiplicationImg from "../../../../../../assets/images/other/calc-multiplication.svg";
import calcSubtractionImg from "../../../../../../assets/images/other/calc-subtraction.svg";
import { useTranslation } from "react-i18next";
// import KeyPressHook from "./KeyPressHook";
const LevelDirections = props => {
  const { upcomingLevelId, activeMathOperation, activeMathOperationIndex } = props;
  const { t } = useTranslation();

  const [isShowTimer, setIsShowTimer] = useState(false);
  // const [isKeyPressEnable, setIsKeyPressEnable] = useState(true);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("seconds", seconds);
  //     if (seconds > 0) {
  //       setSeconds(seconds => seconds - 1);
  //     }
  //     if (seconds === 1) {
  //       props.closeLevelUpDirections();
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [seconds, props]);
  // const handleCloseLevelupTimer = () => {
  //   props.closeLevelUpDirections()
  // }
  const images = {
    addition: calcAdditionImg,
    subtraction: calcSubtractionImg,
    multiplication: calcMultiplicationImg,
    division: calcDivisionImg
  };

  // // Key press Event
  // useKeypress("Enter", () => {
  //   // Do something when the user has pressed the Space and Enter key
  //   handleStartTimer();
  // });

  const handleStartTimer = () => {
    setIsShowTimer(true);
  };
  const handleCloseTimer = () => {
    setIsShowTimer(false);
    props.closeLevelUpDirections();
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsKeyPressEnable(true);
  //   }, 2000);
  //   return () => clearTimeout();
  // }, []);

  return (
    <>
      {/* {isKeyPressEnable && <KeyPressHook startTimer={handleStartTimer} />} */}
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    {upcomingLevelId === 0 ? (
                      <>
                        <span className="watermark-text op-8">Warm Up</span>
                        <div className="assessment-content">
                          <p>{t("placement-test.warmUpText")}</p>
                          <p>
                            <span> {t("placement-test.instructionText1")} </span>
                          </p>
                          <p>{t("placement-test.instructionText2")}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="watermark-text op-8">{activeMathOperation.toLowerCase()}</span>
                        <div className="assessment-content">
                          <p>
                            {activeMathOperationIndex !== 0 ? t("placement-test.goodText") : ""}{" "}
                            {t("placement-test.subText")}
                            <span>{activeMathOperation.toLowerCase()}</span> {t("placement-test.problemText")}
                          </p>
                          <p>
                            {t("placement-test.pressText")} <b>{t("placement-test.BeginText")}</b>{" "}
                            {t("placement-test.readyText")}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ height: "80px", width: "100%" }}>
                    {isShowTimer ? (
                      <>
                        <Timer closeTimer={handleCloseTimer} />
                      </>
                    ) : (
                      <div className="test-button-wrap">
                        <Button
                          className="btn btn-test"
                          name={
                            upcomingLevelId === 0
                              ? t("placement-test.startedButton")
                              : t("placement-test.alternativeText")
                          }
                          onClick={() => handleStartTimer()}
                        />
                      </div>
                    )}{" "}
                  </div>
                </div>
                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    {upcomingLevelId === 0 ? (
                      <img src={warmUp38Img} className="vec-img" alt="vec-img" />
                    ) : (
                      <img src={images[activeMathOperation.toLowerCase()]} className="vec-img" alt="vec-img" />
                    )}
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

export default LevelDirections;
