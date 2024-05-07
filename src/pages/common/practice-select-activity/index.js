import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import AuthHeader from "components/DashboardLayout/Header";
import StudentHeader from "components/dashboard/StudentAuthHeader";
import Loader from "components/common/Loader";
import ErrorBoundary from "components/common/ErrorBoundary";
import { getStrategies } from "../../../redux/actions/practiceAction";
import { mathOperationTitleList, MATH_OPERATION, superAddSubLevelStrategyName } from "config/const";
import { strategyIcon } from "config/const/select-activity";
import { mathOperationImage } from "utils/select-activity-helpers";
import leftArrow from "assets/images/back-arrow-icon.svg";
// import AuthHeader from "components/Layout/AuthHeader";

import { Tooltip } from "antd";

const TeacherSelectActivityPage = props => {
  const dispatch = useDispatch();
  let location = useLocation();

  //student placement test page
  const { strategyList, fetchingStrategiesLoading } = useSelector(({ strategy }) => strategy);

  const { userDetails } = useSelector(({ auth }) => auth);

  const query = new URLSearchParams(location.search);

  const learning_mode = query.get("learning_mode_id");

  const level_id = query.get("level_id");

  const [selectedOrder, setSelectedOrder] = useState(sessionStorage.getItem("question_order") || "random");

  //Show Progress Table  Popup

  // const [isRandomOrder, setRandomOrder] = useState(true);
  // const [isNumericalOrder, setNumericalOrder] = useState(false);
  // const [isStudentOrder, setStudentOrder] = useState(false);

  let navigate = useNavigate();

  const handleRedirectToPracticeSession = strategy => {
    if (sessionStorage.getItem("question_order") === "numerical") {
      if (sessionStorage.getItem("selected_strategy_id") === strategy.id) {
        +sessionStorage.getItem("question_set_no") === 4
          ? sessionStorage.setItem("question_set_no", 1)
          : sessionStorage.setItem("question_set_no", +sessionStorage.getItem("question_set_no") + 1);
      } else {
        sessionStorage.setItem("question_set_no", 1);
      }

      let set_no = +sessionStorage.getItem("question_set_no");

      navigate(
        `/teacher/practice-session?strategy-type=${strategy.slug}&learning_mode=${learning_mode}&level_id=${level_id}&set_no=${set_no}`
      );
    } else {
      sessionStorage.removeItem("question_set_no");

      navigate(
        `/teacher/practice-session?strategy-type=${strategy.slug}&learning_mode=${learning_mode}&level_id=${level_id}`
      );
    }
    sessionStorage.setItem("selected_strategy_id", strategy.id);
  };

  const handlePracticeOrder = strategy => {
    // if (strategy.status === "active") {
    handleRedirectToPracticeSession(strategy);
    // }
  };

  const getStrategyName = strategyName => {
    switch (true) {
      case +level_id >= 26 && +learning_mode === 2 && strategyName === "Review":
        return "Review 1";
      case +level_id >= 13 && +learning_mode === 1 && strategyName.includes("X"):
        return superAddSubLevelStrategyName[strategyName];
      case strategyName.includes("Quarters"):
        return (
          <>
            <span className="dice-title">{strategyName.split(",")[0]}</span>

            <span className="dice-sub-title">{strategyName.split(",")[1]}</span>
          </>
        );
      default:
        return strategyName;
    }
  };

  const getStrategySuffix = (strategyName, strategySuffix) => {
    switch (true) {
      case +level_id >= 26 && +learning_mode === 2 && strategyName === "Review":
        return "Levels A - N";
      case +level_id >= 26 && +learning_mode === 2 && strategyName === "Review 2":
        return "Levels A - N";
      case +level_id >= 26 && +learning_mode === 2 && strategyName === "Review 3":
        return "Levels O - Z";

      default:
        return strategySuffix;
    }
  };
  useEffect(() => {
    if (learning_mode && level_id) {
      dispatch(getStrategies(learning_mode, level_id));
    }
  }, [learning_mode, level_id]); // eslint-disable-line

  useEffect(() => {
    if (Object.keys(userDetails).length) {
      sessionStorage.setItem("user_learning_mode", +learning_mode);
    }

    if (!sessionStorage.getItem("question_order")) {
      sessionStorage.setItem("question_order", selectedOrder);
    }
  }, []); // eslint-disable-line

  const handleQuestionOrder = order => {
    setSelectedOrder(order);
    sessionStorage.setItem("question_order", order);
  };

  const [activeStage, setActiveStage] = useState(0);

  const handleChangeActiveStage = (e, selectedStage, strategy) => {
    if (strategy.status === "active") {
      setActiveStage(selectedStage);
      e.stopPropagation();
    } else {
      e.stopPropagation();
    }
  };
  const renderStrategyList = strategyList.filter(strategy => {
    return !(
      strategy.slug.includes("stage-2") ||
      strategy.slug.includes("stage-3") ||
      strategy.slug.includes("stage-4")
    );
  });
  const grpStrategyList = strategyList.filter(strategy => {
    return strategy.slug.includes("stage");
  });

  const backToTeachingTool = () => {
    navigate("/teacher/teaching-tools");
  };

  return (
    <>
      {/* <AuthHeader /> */}
      <StudentHeader />
      <ErrorBoundary>
        <main className="main-wrapper main-test-screen">
          <section className="activity-screen main-top-padding">
            <div className="activity-inner-wrapper inner-pedding activity-boxed fm-color">
              <div className="col-xs-12">
                <div className="row">
                  {fetchingStrategiesLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "calc(100vh - 244px)",
                        width: "100%"
                      }}
                    >
                      <Loader />
                    </div>
                  ) : (
                    <div className="container">
                      <div className="activity-screen-wrap">
                        <div className="activity-screen-cols flex-1">
                          <div className="order-button-tabs">
                            <div className="back-to-dashboard-wrapper">
                              <span className="back-to-dashboard-test-arrow" onClick={backToTeachingTool}>
                                <div className="left-arrow-wrapper">
                                  <img src={leftArrow} alt="leftArrow" />
                                  {/* <span>Dashboard</span> */}
                                </div>
                              </span>
                            </div>
                            <div className="order-button-wrapper">
                              <span
                                className={selectedOrder === "random" ? "order-button current" : "order-button"}
                                onClick={() => {
                                  handleQuestionOrder("random");
                                }}
                              >
                                Random Order
                                <Tooltip
                                  // placement="topLeft"
                                  overlayClassName="ant-tooltip-order-counter"
                                  title="Current level problems only - presented in random order."
                                >
                                  <span
                                    className={
                                      selectedOrder === "random"
                                        ? "order-button-info-icon current"
                                        : "order-button-info-icon"
                                    }
                                  >
                                    ?
                                  </span>
                                </Tooltip>
                              </span>

                              <span
                                className={selectedOrder === "numerical" ? "order-button current" : "order-button"}
                                onClick={() => {
                                  handleQuestionOrder("numerical");
                                }}
                              >
                                Numerical Order
                                <Tooltip
                                  // placement="top"
                                  overlayClassName="ant-tooltip-order-counter"
                                  title="Current level problems only - presented in numerical order."
                                >
                                  <span
                                    className={
                                      selectedOrder === "numerical"
                                        ? "order-button-info-icon current"
                                        : "order-button-info-icon"
                                    }
                                  >
                                    ?
                                  </span>
                                </Tooltip>
                              </span>

                              <span
                                className={selectedOrder === "student" ? "order-button current" : "order-button"}
                                onClick={() => {
                                  handleQuestionOrder("student");
                                }}
                              >
                                Student Mix
                                <Tooltip
                                  // placement="rightTop"
                                  overlayClassName="ant-tooltip-order-counter"
                                  title="Typical student mix of problems. Begins with current level problems.  Previous levels are then mixed in."
                                >
                                  <span
                                    className={
                                      selectedOrder === "student"
                                        ? "order-button-info-icon current"
                                        : "order-button-info-icon"
                                    }
                                  >
                                    ?
                                  </span>
                                </Tooltip>
                              </span>
                            </div>
                          </div>
                          {/* <div className="wrap with-subtitle">
                          <h4 className="fm-activity-title">{""}</h4>
                        </div> */}

                          <div className="activity-inner">
                            {!!renderStrategyList.length &&
                              renderStrategyList.map((strategy, i) => {
                                const isGrpStrategy = strategy.slug.includes("stage");
                                if (isGrpStrategy) {
                                  const currentStageStrategy = grpStrategyList.find(
                                    (strategy, index) => index === activeStage
                                  );

                                  return (
                                    <>
                                      <div className="activity-cols teaching-tool" key={i}>
                                        <div className="activity-button-outer">
                                          <button
                                            className={
                                              +strategy.math_operation === MATH_OPERATION.ADDITION ||
                                              +strategy.math_operation === MATH_OPERATION.MULTIPLICATION
                                                ? "btn-frames fbtn-addition"
                                                : "btn-frames fbtn-subs"
                                            }
                                          >
                                            <img
                                              src={mathOperationImage(strategy.math_operation)}
                                              alt="math_opration_img"
                                              className="fbtn-icon"
                                            />
                                            <span className="fbtn-text">
                                              {mathOperationTitleList[strategy.math_operation]}
                                            </span>
                                          </button>
                                          <div
                                            className="activity-button"
                                            onClick={() => {
                                              handleRedirectToPracticeSession(currentStageStrategy);
                                            }}
                                          >
                                            <span className="dice-icon">
                                              <img
                                                // src={
                                                //   +strategy.math_operation ===
                                                //     MATH_OPERATION.ADDITION ||
                                                //   +strategy.math_operation ===
                                                //     MATH_OPERATION.MULTIPLICATION
                                                //     ? tenFramesBlue
                                                //     : tenFramesRed
                                                // }
                                                src={
                                                  strategy.status === "active"
                                                    ? strategyIcon[strategy.slug]
                                                    : strategyIcon[
                                                        // -disabled
                                                        strategy.slug + ""
                                                      ]
                                                }
                                                alt="tenFramesBlue"
                                              />
                                            </span>
                                            <span className="dice-title">{getStrategyName(strategy.name)}</span>

                                            {!strategy.suffix ? (
                                              <span className="dice-title">{currentStageStrategy.suffix}</span>
                                            ) : (
                                              ""
                                            )}
                                            <div className="fm-button-tabs">
                                              {grpStrategyList.map((strategy, index) => {
                                                return (
                                                  <span
                                                    key={index}
                                                    className={`fm-button ${index === activeStage ? "current" : ""}`}
                                                    onClick={e => handleChangeActiveStage(e, index, strategy)}
                                                  >
                                                    {index + 1}
                                                  </span>
                                                );
                                              })}
                                            </div>
                                            {/* || i === 1 */}
                                            <div className="fm-button-tabs">
                                              {grpStrategyList.map((strategy, index) => {
                                                return (
                                                  <span
                                                    key={index}
                                                    className={`fm-button ${index === activeStage ? "current" : ""}`}
                                                    onClick={e => handleChangeActiveStage(e, index, strategy)}
                                                  >
                                                    {index + 1}
                                                  </span>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                } else {
                                  const isShowTrainerLabel = strategy.flag === "trainer";
                                  return (
                                    <div
                                      className="activity-cols  teaching-tool"
                                      key={strategy.id}
                                      onClick={() => {
                                        handlePracticeOrder(strategy);
                                      }}
                                    >
                                      <div
                                        className={
                                          strategy.status === "active"
                                            ? "activity-button-outer"
                                            : "activity-button-outer"
                                        }
                                      >
                                        <button
                                          className={
                                            +strategy.math_operation === MATH_OPERATION.ADDITION ||
                                            +strategy.math_operation === MATH_OPERATION.MULTIPLICATION
                                              ? "btn-frames fbtn-addition"
                                              : "btn-frames fbtn-subs"
                                          }
                                        >
                                          <img
                                            src={mathOperationImage(strategy.math_operation)}
                                            alt="math_opration_img"
                                            className="fbtn-icon"
                                          />
                                          <span className="fbtn-text">
                                            {mathOperationTitleList[strategy.math_operation]}
                                          </span>
                                        </button>
                                        {isShowTrainerLabel && (
                                          <button
                                            className={
                                              +strategy.math_operation === MATH_OPERATION.ADDITION ||
                                              +strategy.math_operation === MATH_OPERATION.MULTIPLICATION
                                                ? "trainer-btn-frames fbtn-addition"
                                                : "trainer-btn-frames fbtn-subs"
                                            }
                                          >
                                            <span className="trainer-text"> TRAINER</span>
                                          </button>
                                        )}
                                        <div className="activity-button">
                                          <span className="dice-icon">
                                            <img
                                              src={
                                                strategy.status === "active"
                                                  ? strategyIcon[strategy.slug]
                                                  : strategyIcon[strategy.slug]
                                              }
                                              alt="tenFramesBlue"
                                            />
                                          </span>
                                          <span className="dice-title">{getStrategyName(strategy.name)}</span>

                                          {getStrategySuffix(strategy.name, strategy.suffix) ? (
                                            <span className="dice-title">
                                              {getStrategySuffix(strategy.name, strategy.suffix)}
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default TeacherSelectActivityPage;
