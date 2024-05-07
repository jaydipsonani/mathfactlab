import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { mulSubLevelList, addSubLevelList, userRole, mathOperationList } from "config/const";

const ProgressTablePopup = props => {
  const { isShowProgressTablePopup, selectedLearningMode, user } = props;

  // const dispatch = useDispatch();
  const handleCreateSession = () => {
    props.close();
  };

  const handleClose = () => {
    props.close();
  };

  const { userDetails } = useSelector(({ auth }) => auth);
  // assign user if data is coming from props on teacher dashboard
  const userData = user || userDetails;

  const {
    profile: { student_learning_mode_id = 1, mul_div_level_id = 1, add_sub_level_id = 1 }
  } = userData;

  let learningMode = selectedLearningMode ? +selectedLearningMode : student_learning_mode_id;

  const elem = document.getElementById("active-selected");
  const activeLevelRef = useRef(null);
  // useEffect(() => {
  //   if (activeLevelRef.current) {
  //     console.log(
  //       "🚀 ~ file: index.js:45 ~ useEffect ~ activeLevelRef:",
  //       activeLevelRef,
  //     );
  //     activeLevelRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [activeLevelRef]);

  let userCurrentLevel = learningMode === 1 ? addSubLevelList[add_sub_level_id] : mulSubLevelList[mul_div_level_id];
  useEffect(() => {
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, [elem, userCurrentLevel]);

  let userCurrentModeList = learningMode === 1 ? addSubLevelList : mulSubLevelList;

  let levelListByLearningMode = Object.values(userCurrentModeList);

  // levelListByLearningMode = levelListByLearningMode.filter(
  //   lvl => !lvl.label.includes("Warm Up") || !lvl.label.includes("Graduate"),
  // );

  // remove first and last element of warm up and graduate level
  levelListByLearningMode.shift(); // Removes the first element from an array and returns only that element.
  // levelListByLearningMode.pop();

  const getTriangleClass = lvl => {
    let currentLevelValue = userCurrentLevel ? userCurrentLevel.value : "";
    let triangleClass = "";

    if (lvl.value === currentLevelValue) {
      triangleClass = "count-light-blue";
    } else if (lvl.value > (userCurrentLevel && userCurrentLevel.value)) {
      triangleClass = "count-disable";
    } else {
      triangleClass = "count-green";
    }

    return triangleClass;
  };

  const getStageClass = (currentLevelList, stageType) => {
    let currentLevelValue = userCurrentLevel ? userCurrentLevel.value : "";
    const isLevelIncludeInCurrentStage = currentLevelList.find(lvl => lvl.value === currentLevelValue);

    let firstLevelOfCurrentStageValue = currentLevelList.slice(-1)[0].value;
    let stageClass = "";

    if (isLevelIncludeInCurrentStage) {
      stageClass = "focus";
    } else if (currentLevelValue < firstLevelOfCurrentStageValue && stageType === "basic-2") {
      stageClass = "disable";
    } else {
      stageClass = "mastered";
    }

    return stageClass;
  };

  const getLevelWrapperClass = (lvl, currentStageQuestionList, stageType) => {
    let currentLevelValue = userCurrentLevel ? userCurrentLevel.value : "";
    let firstLevelOfCurrentStageValue = currentStageQuestionList.slice(-1)[0].value;

    const isLevelIncludeInCurrentStage = currentStageQuestionList.find(lvl => lvl.value === currentLevelValue);
    let wrapperClass = "";

    if (lvl.value === currentLevelValue) {
      wrapperClass = "selected";
    } else if (lvl.value >= firstLevelOfCurrentStageValue && isLevelIncludeInCurrentStage) {
      wrapperClass = "focus";
    } else if (currentLevelValue < firstLevelOfCurrentStageValue && stageType === "basic-2") {
      wrapperClass = "disabled";
    } else {
      wrapperClass = "mastered";
    }

    return wrapperClass;
  };
  const getMaxLevelBgColorClass = lvl => {
    let bgClass = "";

    if (lvl.value === (userCurrentLevel && userCurrentLevel.value)) {
      bgClass = "bg-blue";
    } else if (lvl.value > (userCurrentLevel && userCurrentLevel.value)) {
      bgClass = "bg-disable";
    } else {
      bgClass = "bg-green";
    }

    return bgClass;
  };

  // const getLevelButtonClass = lvl => {
  //   let buttonClass = "";
  //   if (lvl.value === (userCurrentLevel && userCurrentLevel.value)) {
  //     buttonClass = "btn-blue";
  //   } else if (lvl.value > (userCurrentLevel && userCurrentLevel.value)) {
  //     buttonClass = "btn-disabled";
  //   } else {
  //     buttonClass = "btn-green";
  //   }
  //   return buttonClass;
  // };

  const basicLevelList = levelListByLearningMode.filter(level => level.stage === "basic").reverse();

  const advancedLevelList = levelListByLearningMode.filter(level => level.stage === "advanced").reverse();

  const superAdvancedLevelList = levelListByLearningMode.filter(level => level.stage === "super-advanced").reverse();

  const superDuperAdvancedLevelList = levelListByLearningMode
    .filter(level => level.stage === "super-duper-advanced")
    .reverse();

  const graduationLevel = levelListByLearningMode.filter(level => level.value === 26);

  const lowerBasicLevel = levelListByLearningMode.filter(level => level.stage === "lower-basic").reverse();

  const basicLevelCount = learningMode === 1 ? 11 : 12;

  return (
    <>
      <>
        {/* <!-- Add or remove " mobile-menu-open " className for toggle aside for mobile and ipad only  --> */}
        <section className="aside-page-layout twoLayout-popup-layout">
          {/* <!-- Popup modal --> */}
          {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
          <div
            className={
              isShowProgressTablePopup
                ? "custom-popup open twoLayout-popup ease-in-popup"
                : "custom-popup  twoLayout-popup ease-in-popup"
            }
          >
            <div className="popup">
              <div className="twoLayout-popup-left">
                <div className="popup-left-inner">
                  <div className="font-46 twoLayout-popup-title">
                    {/* lastlevel */}
                    {`Today’s Focus: ${
                      (userCurrentLevel && userCurrentLevel.value === 26
                        ? "Practice for Graduates"
                        : userCurrentLevel?.label || "-") || "-"
                    }
                    ${(userCurrentLevel && userCurrentLevel.descriptors) || ""}`}
                  </div>
                  <div className="bottom-legend-section">
                    <div className="bottom-legend">
                      <div className="tc-legend blue"></div>
                      <div className="bottom-legend-text">
                        Today’s<span className="font-bold">FOCUS.</span>
                      </div>
                    </div>
                    <div className="bottom-legend">
                      <div className="tc-legend green"></div>
                      <div className="bottom-legend-text">
                        You’re an<span className="font-bold">EXPERT</span>at these facts.
                      </div>
                    </div>
                    <div className="bottom-legend">
                      <div className="tc-legend disabled"></div>
                      <div className="bottom-legend-text">
                        You’ll be working on these facts
                        <span className="font-bold">SOON.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* for teacher user added one more class for content in center */}
              <div
                className={
                  userDetails.role_id === userRole.TEACHER.role_id
                    ? "twoLayout-popup-right layout-content-center"
                    : "twoLayout-popup-right"
                }
              >
                <div className="twoLayout-popup-content">
                  {/* Compare current level  with low level for show stage */}

                  {!!graduationLevel.length && userCurrentLevel && userCurrentLevel.value >= 26 && (
                    <div className="level-wrapper ">
                      <div className={`level-title ${getStageClass(superAdvancedLevelList)}`} style={{ opacity: 0 }}>
                        <div className="level-title-text">Super-Advanced</div>
                      </div>
                      <div className="question-list-wrapper" style={{ display: "contents" }}>
                        {" "}
                        {graduationLevel.map((lvl, i) => {
                          return (
                            <div
                              className={`inline-table-count ${getLevelWrapperClass(lvl, superAdvancedLevelList)}`}
                              ref={lvl.value === (userCurrentLevel && userCurrentLevel.value) ? activeLevelRef : null}
                              key={lvl.value}
                              // id={`level-${lvl.value}`}
                              // key={Math.random()}
                              id={`${
                                lvl.value === (userCurrentLevel && userCurrentLevel.value) ? "active-selected" : ""
                              }`}
                            >
                              <div className="inline-table-button">
                                <div className={`level-label ${getLevelWrapperClass(lvl, superAdvancedLevelList)}`}>
                                  {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                  <span className="level-descriptors">{lvl.descriptors}</span>
                                </div>
                              </div>

                              {learningMode === 1 && lvl.value >= 26 ? (
                                <div
                                  className={`inline-table-raw-outer-wrap ${getMaxLevelBgColorClass(lvl)}`}
                                  style={{ opacity: 0 }}
                                >
                                  {"Example Problems :   "}
                                  {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                    return (
                                      <div key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}>
                                        {/* For extra space */}
                                        {i === 0 ? (
                                          <span
                                            style={{
                                              visibility: "hidden"
                                            }}
                                          >
                                            0
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                        <span className="tc-top">{qns.first_factor}</span>
                                        <span className="math-operation-icon">
                                          {mathOperationList[qns.math_opration]}
                                        </span>
                                        <span className="tc-left">{qns.second_factor}</span>

                                        {/* For extra space */}
                                        {lvl.studentProgressPopupQnsList.length === i + 1 ? (
                                          " "
                                        ) : (
                                          <>
                                            <span>,</span>
                                            <span
                                              style={{
                                                visibility: "hidden"
                                              }}
                                            >
                                              0
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="inline-table-count-wrap" style={{ opacity: 0 }}>
                                  {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                    return (
                                      <div
                                        className={`inline-table-count-item  ${getTriangleClass(lvl)}`}
                                        key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}
                                      >
                                        <span className="tc-top">{qns.correct_answer}</span>
                                        <span className="tc-left">{qns.first_factor}</span>
                                        <span className="tc-right">{qns.second_factor}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}{" "}
                      </div>
                    </div>
                  )}
                  {!!superDuperAdvancedLevelList.length &&
                    userCurrentLevel &&
                    userCurrentLevel.value >= superDuperAdvancedLevelList.slice(-1)[0].value &&
                    +learningMode === 2 && (
                      <div className="level-wrapper ">
                        <div className={`level-title ${getStageClass(superDuperAdvancedLevelList)}`}>
                          <div className="level-title-text">Super-Duper-Advanced</div>
                        </div>
                        <div className="question-list-wrapper">
                          {" "}
                          {superDuperAdvancedLevelList.map((lvl, i) => {
                            return (
                              <div
                                className={`inline-table-count ${getLevelWrapperClass(
                                  lvl,
                                  superDuperAdvancedLevelList
                                )}`}
                                ref={lvl.value === (userCurrentLevel && userCurrentLevel.value) ? activeLevelRef : null}
                                key={lvl.value}
                                // id={`level-${lvl.value}`}
                                // key={Math.random()}
                                id={`${
                                  lvl.value === (userCurrentLevel && userCurrentLevel.value) ? "active-selected" : ""
                                }`}
                              >
                                <div className="inline-table-button">
                                  <div
                                    className={`level-label ${getLevelWrapperClass(lvl, superDuperAdvancedLevelList)}`}
                                  >
                                    {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                    <span className="level-descriptors">{lvl.descriptors}</span>
                                  </div>
                                </div>

                                <div className="inline-table-count-wrap">
                                  {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                    return (
                                      <div
                                        // count-purple
                                        className={`inline-table-count-item ${getTriangleClass(lvl)} `}
                                        key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}
                                      >
                                        <span className="tc-top">{qns.correct_answer}</span>
                                        <span className="tc-left">{qns.first_factor}</span>
                                        <span className="tc-right">{qns.second_factor}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}{" "}
                        </div>
                      </div>
                    )}

                  {!!superAdvancedLevelList.length &&
                    userCurrentLevel &&
                    userCurrentLevel.value >= superAdvancedLevelList.slice(-1)[0].value && (
                      <div className="level-wrapper ">
                        <div className={`level-title ${getStageClass(superAdvancedLevelList)}`}>
                          <div className="level-title-text">Super-Advanced</div>
                        </div>
                        <div className="question-list-wrapper">
                          {" "}
                          {superAdvancedLevelList.map((lvl, i) => {
                            return (
                              <div
                                className={`inline-table-count ${getLevelWrapperClass(lvl, superAdvancedLevelList)}`}
                                ref={lvl.value === (userCurrentLevel && userCurrentLevel.value) ? activeLevelRef : null}
                                key={lvl.value}
                                // id={`level-${lvl.value}`}
                                // key={Math.random()}
                                id={`${
                                  lvl.value === (userCurrentLevel && userCurrentLevel.value) ? "active-selected" : ""
                                }`}
                              >
                                <div className="inline-table-button">
                                  <div className={`level-label ${getLevelWrapperClass(lvl, superAdvancedLevelList)}`}>
                                    {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                    <span className="level-descriptors">{lvl.descriptors}</span>
                                  </div>
                                </div>

                                {learningMode === 1 && lvl.value >= basicLevelCount ? (
                                  <div className={`inline-table-raw-outer-wrap ${getMaxLevelBgColorClass(lvl)}`}>
                                    {"Example Problems :   "}
                                    {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                      return (
                                        <div key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}>
                                          {/* For extra space */}
                                          {i === 0 ? (
                                            <span
                                              style={{
                                                visibility: "hidden"
                                              }}
                                            >
                                              0
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                          <span className="tc-top">{qns.first_factor}</span>
                                          <span className="math-operation-icon">
                                            {mathOperationList[qns.math_opration]}
                                          </span>
                                          <span className="tc-left">{qns.second_factor}</span>

                                          {/* For extra space */}
                                          {lvl.studentProgressPopupQnsList.length === i + 1 ? (
                                            " "
                                          ) : (
                                            <>
                                              <span>,</span>
                                              <span
                                                style={{
                                                  visibility: "hidden"
                                                }}
                                              >
                                                0
                                              </span>
                                            </>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="inline-table-count-wrap">
                                    {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                      return (
                                        <div
                                          className={`inline-table-count-item  ${getTriangleClass(lvl)}`}
                                          key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}
                                        >
                                          <span className="tc-top">{qns.correct_answer}</span>
                                          <span className="tc-left">{qns.first_factor}</span>
                                          <span className="tc-right">{qns.second_factor}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}{" "}
                        </div>
                      </div>
                    )}

                  {/* Compare current level  with low level for show stage */}
                  {!!advancedLevelList.length &&
                    userCurrentLevel &&
                    userCurrentLevel.value >= advancedLevelList.slice(-1)[0].value && (
                      <div className="level-wrapper ">
                        <div className={`level-title ${getStageClass(advancedLevelList)}`}>
                          <div className="level-title-text">Advanced</div>
                        </div>
                        <div className="question-list-wrapper">
                          {" "}
                          {advancedLevelList.map((lvl, i) => {
                            return (
                              <div
                                className={`inline-table-count ${getLevelWrapperClass(lvl, advancedLevelList)}`}
                                ref={lvl.value === (userCurrentLevel && userCurrentLevel.value) ? activeLevelRef : null}
                                key={lvl.value}
                                // id={`level-${lvl.value}`}
                                // key={Math.random()}
                                id={`${
                                  lvl.value === (userCurrentLevel && userCurrentLevel.value) ? "active-selected" : ""
                                }`}
                              >
                                <div className="inline-table-button">
                                  <div className={`level-label ${getLevelWrapperClass(lvl, advancedLevelList)}`}>
                                    {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                    <span className="level-descriptors">{lvl.descriptors}</span>
                                  </div>
                                </div>

                                {learningMode === 1 && lvl.value >= basicLevelCount ? (
                                  <div className={`inline-table-raw-outer-wrap ${getMaxLevelBgColorClass(lvl)}`}>
                                    {"Example Problems :   "}
                                    {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                      return (
                                        <div key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}>
                                          {/* For extra space */}
                                          {i === 0 ? (
                                            <span
                                              style={{
                                                visibility: "hidden"
                                              }}
                                            >
                                              0
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                          <span className="tc-top">{qns.first_factor}</span>
                                          <span className="math-operation-icon">
                                            {mathOperationList[qns.math_opration]}
                                          </span>
                                          <span className="tc-left">{qns.second_factor}</span>

                                          {/* For extra space */}
                                          {lvl.studentProgressPopupQnsList.length === i + 1 ? (
                                            " "
                                          ) : (
                                            <>
                                              <span>,</span>
                                              <span
                                                style={{
                                                  visibility: "hidden"
                                                }}
                                              >
                                                0
                                              </span>
                                            </>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="inline-table-count-wrap">
                                    {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                      return (
                                        <div
                                          className={`inline-table-count-item ${getTriangleClass(lvl)}`}
                                          key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}
                                        >
                                          <span className="tc-top">{qns.correct_answer}</span>
                                          <span className="tc-left">{qns.first_factor}</span>
                                          <span className="tc-right">{qns.second_factor}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {basicLevelList.length &&
                    userCurrentLevel &&
                    userCurrentLevel.value >= lowerBasicLevel.slice(-1)[0].value && (
                      <div className="level-wrapper ">
                        <div className={`level-title ${getStageClass(basicLevelList, "basic-2")}`}>
                          <div className="level-title-text">Basic Part 2</div>
                        </div>
                        <div className="question-list-wrapper">
                          {" "}
                          {basicLevelList.map((lvl, i) => {
                            return (
                              <div
                                className={`inline-table-count ${getLevelWrapperClass(lvl, basicLevelList, "basic-2")}`}
                                ref={lvl.value === (userCurrentLevel && userCurrentLevel.value) ? activeLevelRef : null}
                                key={lvl.value}
                                // id={`level-${lvl.value}`}
                                // key={Math.random()}
                                id={`${
                                  lvl.value === (userCurrentLevel && userCurrentLevel.value) ? "active-selected" : ""
                                }`}
                              >
                                <div className="inline-table-button">
                                  <div
                                    className={`level-label ${getLevelWrapperClass(lvl, basicLevelList, "basic-2")}`}
                                  >
                                    {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                    <span className="level-descriptors">{lvl.descriptors}</span>
                                  </div>
                                </div>

                                <div className="inline-table-count-wrap">
                                  {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                    return (
                                      <div
                                        className={`inline-table-count-item ${getTriangleClass(lvl)}`}
                                        key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}
                                      >
                                        <span className="tc-top">{qns.correct_answer}</span>
                                        <span className="tc-left">{qns.first_factor}</span>
                                        <span className="tc-right">{qns.second_factor}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {!!lowerBasicLevel.length &&
                    userCurrentLevel &&
                    userCurrentLevel.value >= lowerBasicLevel.slice(-1)[0].value && (
                      <div className="level-wrapper ">
                        <div className={`level-title ${getStageClass(lowerBasicLevel)}`}>
                          <div className="level-title-text">Basic Part 1</div>
                        </div>
                        <div className="question-list-wrapper">
                          {" "}
                          {lowerBasicLevel.map((lvl, i) => {
                            return (
                              <div
                                className={`inline-table-count ${getLevelWrapperClass(lvl, lowerBasicLevel)}`}
                                ref={lvl.value === (userCurrentLevel && userCurrentLevel.value) ? activeLevelRef : null}
                                key={lvl.value}
                                // id={`level-${lvl.value}`}
                                id={`${
                                  lvl.value === (userCurrentLevel && userCurrentLevel.value) ? "active-selected" : ""
                                }`}
                              >
                                <div className="inline-table-button">
                                  <div className={`level-label ${getLevelWrapperClass(lvl, lowerBasicLevel)}`}>
                                    {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                    <span className="level-descriptors">{lvl.descriptors}</span>
                                  </div>
                                </div>

                                <div className="inline-table-count-wrap">
                                  {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                    return (
                                      <div
                                        className={`inline-table-count-item ${getTriangleClass(lvl)}`}
                                        key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}
                                      >
                                        <span className="tc-top">{qns.correct_answer}</span>
                                        <span className="tc-left">{qns.first_factor}</span>
                                        <span className="tc-right">{qns.second_factor}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>

                {userDetails.role_id === userRole.TEACHER.role_id ? (
                  <span className="close" onClick={() => handleClose()}>
                    &times;
                  </span>
                ) : (
                  ""
                )}
              </div>

              {userDetails.role_id === userRole.STUDENT.role_id ? (
                <div className="twoLayout-popup-footer">
                  <button className="btn btn-primary ridge font-bold" onClick={() => handleCreateSession()}>
                    Let’s Get Started
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className={isShowProgressTablePopup ? "twoLayout-popup-backface open" : "twoLayout-popup-backface "}
          ></div>
        </section>
      </>
    </>
  );
};

export default ProgressTablePopup;
