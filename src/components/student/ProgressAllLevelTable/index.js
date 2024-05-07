import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DownloadOutlined } from "@ant-design/icons";
import Select from "components/common/ReactSelect";
import { mulSubLevelList, addSubLevelList, userRole, mathOperationList,studentLearningModeList } from "config/const";

const ProgressAllLevelTable = props => {
  const { isShowProgressTablePopup } = props;

  const [learningMode, setSelectedLearningMode] = useState(1);

  const handleClose = () => {
    props.close();
  };

  const { userDetails } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const elem = document.getElementById("active-selected");
    if (elem) {
      elem.scrollIntoView();
    }
  }, [learningMode]);

  let userCurrentModeList = learningMode === 1 ? addSubLevelList : mulSubLevelList;

  let levelListByLearningMode = Object.values(userCurrentModeList);

  // remove first and last element of warm up and graduate level
  levelListByLearningMode.shift(); // Removes the first element from an array and returns only that element.
  // levelListByLearningMode.pop();

  const basicLevelList = levelListByLearningMode.filter(level => level.stage === "basic").reverse();

  const advancedLevelList = levelListByLearningMode.filter(level => level.stage === "advanced").reverse();

  const superAdvancedLevelList = levelListByLearningMode.filter(level => level.stage === "super-advanced").reverse();

  const superDuperAdvancedLevelList = levelListByLearningMode
    .filter(level => level.stage === "super-duper-advanced")
    .reverse();

  const graduationLevel = levelListByLearningMode.filter(level => level.value === 26);

  const lowerBasicLevel = levelListByLearningMode.filter(level => level.stage === "lower-basic").reverse();

  const basicLevelCount = learningMode === 1 ? 11 : 12;

  const handleChangeLearningMode = () => {
    setSelectedLearningMode(learningMode === 1 ? 2 : 1);
  };

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
                    Progress Table{" "}
                    <div>
                      {learningMode === 1 ? (
                        <h4 className="mode-title">Addition/Subtraction </h4>
                      ) : (
                        <h4 className="mode-title">Multiplication/Division</h4>
                      )}
                    </div>
                  </div>
                  <div className="bottom-legend-section section-exception">
                    <div className="bottom-legend">
                      <div className="bottom-legend-text">Select learning mode</div>
                    </div>
                    <Select
                      name="learningMode"
                      value={learningMode}
                      options={studentLearningModeList}
                      onChange={handleChangeLearningMode}
                      placeholder="Select Learning Mode..."
                    />
                  </div>
                  <div className="download-btn">
                    <a
                      style={{ color: "white" }}
                      href={"https://drive.google.com/u/0/uc?id=1KvTw_3DBuFK5Kb7PweRqXU-463O35gok&export=download"}
                      download
                    >
                      <DownloadOutlined
                        style={{
                          fontSize: "22px",
                          marginRight: "20px",
                          cursor: "pointer"
                        }}
                        download={
                          "https://drive.google.com/u/0/uc?id=1KvTw_3DBuFK5Kb7PweRqXU-463O35gok&export=download"
                        }
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* for teacher user added one more class for content in center */}
              <div
                className={
                  userDetails.role_id !== userRole.STUDENT.role_id
                    ? "twoLayout-popup-right layout-content-center"
                    : "twoLayout-popup-right"
                }
              >
                <div className="twoLayout-popup-content">
                  {/* Compare current level  with low level for show stage */}

                  <div className="level-wrapper ">
                    <div className="level-title mastered" style={{ opacity: 0 }}>
                      <div className="level-title-text">Super-Advanced</div>
                    </div>
                    <div className="question-list-wrapper" style={{ display: "contents" }}>
                      {" "}
                      {graduationLevel.map((lvl, i) => {
                        return (
                          <div className="inline-table-count mastered" key={Math.random()}>
                            <div className="inline-table-button">
                              <div className="level-label mastered">
                                {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                <span className="level-descriptors">{lvl.descriptors}</span>
                              </div>
                            </div>

                            {learningMode === 1 && lvl.value >= 26 ? (
                              <div className="inline-table-raw-outer-wrap bg-green" style={{ opacity: 0 }}>
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
                                      className="inline-table-count-item  count-green"
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

                  {+learningMode === 2 && (
                    <div className="level-wrapper ">
                      <div className="level-title mastered">
                        <div className="level-title-text">Super-Duper-Advanced</div>
                      </div>
                      <div className="question-list-wrapper">
                        {" "}
                        {superDuperAdvancedLevelList.map((lvl, i) => {
                          return (
                            <div className="inline-table-count mastered" key={Math.random()}>
                              <div className="inline-table-button">
                                <div className="level-label mastered">
                                  {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                  <span className="level-descriptors">{lvl.descriptors}</span>
                                </div>
                              </div>

                              <div className="inline-table-count-wrap">
                                {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                  return (
                                    <div
                                      // count-purple
                                      className="inline-table-count-item count-green"
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

                  <div className="level-wrapper ">
                    <div className="level-title mastered">
                      <div className="level-title-text">Super-Advanced</div>
                    </div>
                    <div className="question-list-wrapper">
                      {" "}
                      {superAdvancedLevelList.map((lvl, i) => {
                        return (
                          <div className="inline-table-count mastered" key={Math.random()}>
                            <div className="inline-table-button">
                              <div className="level-label mastered">
                                {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                <span className="level-descriptors">{lvl.descriptors}</span>
                              </div>
                            </div>

                            {learningMode === 1 && lvl.value >= basicLevelCount ? (
                              <div className="inline-table-raw-outer-wrap bg-green">
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
                                      className="inline-table-count-item  count-green"
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

                  <div className="level-wrapper ">
                    <div className="level-title mastered">
                      <div className="level-title-text">Advanced</div>
                    </div>
                    <div className="question-list-wrapper">
                      {" "}
                      {advancedLevelList.map((lvl, i) => {
                        return (
                          <div className="inline-table-count mastered" key={Math.random()}>
                            <div className="inline-table-button">
                              <div className="level-label mastered">
                                {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                <span className="level-descriptors">{lvl.descriptors}</span>
                              </div>
                            </div>

                            {learningMode === 1 && lvl.value >= basicLevelCount ? (
                              <div className="inline-table-raw-outer-wrap bg-green">
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
                                      className="inline-table-count-item count-green"
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

                  <div className="level-wrapper ">
                    <div className="level-title mastered">
                      <div className="level-title-text">Basic Part 2</div>
                    </div>
                    <div className="question-list-wrapper">
                      {" "}
                      {basicLevelList.map((lvl, i) => {
                        return (
                          <div className="inline-table-count mastered" key={Math.random()}>
                            <div className="inline-table-button">
                              <div className="level-label mastered">
                                {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                <span className="level-descriptors">{lvl.descriptors}</span>
                              </div>
                            </div>

                            <div className="inline-table-count-wrap">
                              {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                return (
                                  <div
                                    className="inline-table-count-item count-green"
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

                  <div className="level-wrapper ">
                    <div className="level-title mastered">
                      <div className="level-title-text">Basic Part 1</div>
                    </div>
                    <div className="question-list-wrapper">
                      {" "}
                      {lowerBasicLevel.map((lvl, i) => {
                        return (
                          <div
                            className="inline-table-count mastered"
                            key={Math.random()}
                            id={`${lvl.value === 1 ? "active-selected" : ""}`}
                          >
                            <div className="inline-table-button">
                              <div className="level-label mastered">
                                {`${lvl.sort === "GR" ? "Graduate" : lvl.sort}`}
                                <span className="level-descriptors">{lvl.descriptors}</span>
                              </div>
                            </div>

                            <div className="inline-table-count-wrap">
                              {lvl.studentProgressPopupQnsList.map((qns, i) => {
                                return (
                                  <div
                                    className="inline-table-count-item count-green"
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
                </div>

                {userDetails.role_id !== userRole.STUDENT.role_id ? (
                  <span className="close" onClick={() => handleClose()}>
                    &times;
                  </span>
                ) : (
                  ""
                )}
              </div>
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

export default ProgressAllLevelTable;
