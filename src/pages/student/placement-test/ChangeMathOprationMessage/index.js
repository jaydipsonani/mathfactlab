import React, { useEffect, useState } from "react";
import calcImg from "assets/images/calc.svg";

const LevelDirections = props => {
  const { activeMath } = props;
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds => seconds - 1);
      }
      if (seconds === 1) {
        props.closeLevelUpDirections();
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, props]); // eslint-disable-line
  // const handleCloseLevelupTimer = () => {
  //   props.closeLevelUpDirections()
  // }
  return (
    <>
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    <span className="watermark-text op-8">{t("placement-test.changeMathOperationMessage")}</span>
                    <div className="assessment-content">
                      {activeMath === 1 ? (
                        <p>
                          {t("placement-test.goodText")} {t("placement-test.subText")}{" "}
                          <span>{t("placement-test. subTractionText")} </span>
                          {t("placement-test. problemsPressText")}
                        </p>
                      ) : (
                        <p>
                          {t("placement-test.goodText")} {t("placement-test.subText")}{" "}
                          <span>{t("placement-test. divisionText")}</span>
                          {t("placement-test. problemsPressText")}
                        </p>
                      )}
                    </div>
                    <div className="font-150">{seconds}</div>
                    {/* <div className="test-button-wrap">
                      <button
                        className="btn btn-test"
                        onClick={() => handleCloseLevelupTimer()}
                      >
                        Let’s Start
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    <img src={calcImg} className="vec-img" alt="calcImg" />
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
