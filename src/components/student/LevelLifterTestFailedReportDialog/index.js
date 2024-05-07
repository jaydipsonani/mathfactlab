import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "antd";
import moment from "moment";
import AvgResponseTime from "components/student/AvgResponseTime";
import { getLevelLifterTestReportDetails } from "../../../redux/actions/practiceAction";
import { userRole, mathOperationList, mulSubLevelList, addSubLevelList, mathOperationOrderList } from "config/const";

const LevelLifterTestFailedReportDialog = props => {
  const { errorCount = "", user, selectedLevelLearningMode, levelLifterSubmissionID, correctButOverTime = "" } = props;

  const dispatch = useDispatch();

  const { fetchingLevelLifterQuestionListLoading, levelLifterSubmissionReportDetails } = useSelector(
    ({ strategy }) => strategy
  );

  const { userDetails } = useSelector(({ auth }) => auth);

  const userData = user || userDetails;

  const submission_type = levelLifterSubmissionReportDetails.submission_type;

  useEffect(() => {
    //get  level lifter report by user ID
    dispatch(
      getLevelLifterTestReportDetails(userData && userData.id, selectedLevelLearningMode, levelLifterSubmissionID)
    );
  }, []); // eslint-disable-line

  const mathOprationList = {
    Addition: {
      title: "Addition"
    },

    Subtraction: {
      title: "Subtraction"
    },
    Multiplication: {
      title: "Multiplication"
    },
    Division: {
      title: "Division"
    }
  };

  function studentReportCard(mathOperation, index, questionList) {
    const correctResponseInTimeQnsList = questionList.filter(qns => {
      // const fluencyRateByLevel = getFluencyRateByLevel(
      //   selectedLevelLearningMode,
      //   qns.level_id,
      // );
      return submission_type === "interview"
        ? qns.correct_answer === qns.answer
        : qns.correct_answer === qns.answer &&
            qns.time_taken_in_second <= qns.max_timeout_correct_ans_secs * qns.fluency_rate;
    });

    const correctResponseOverTimeQnsList = questionList.filter(qns => {
      // const fluencyRateByLevel = getFluencyRateByLevel(
      //   selectedLevelLearningMode,
      //   qns.level_id,
      // );
      return (
        qns.correct_answer === qns.answer &&
        qns.time_taken_in_second > qns.max_timeout_correct_ans_secs * qns.fluency_rate
      );
    });

    const inCorrectResponseQnsList = questionList.filter(qns => qns.correct_answer !== qns.answer);

    const correctResponseInTimeQnsAvgResponseTime = +(
      correctResponseInTimeQnsList.reduce((acc, question) => {
        return acc + +question.time_taken_in_second;
      }, 0) / correctResponseInTimeQnsList.length
    ).toFixed(1);

    const notYetResponseQnsList = questionList.filter(qns => qns.correct_answer !== qns.answer);

    const correctResponseOverTimeQnsAvgResponseTime = +(
      correctResponseOverTimeQnsList.reduce((acc, question) => {
        return acc + +question.time_taken_in_second;
      }, 0) / correctResponseOverTimeQnsList.length
    ).toFixed(1);

    const inCorrectResponseQnsAvgResponseTime = +(
      inCorrectResponseQnsList.reduce((acc, question) => {
        return acc + +question.time_taken_in_second;
      }, 0) / inCorrectResponseQnsList.length
    ).toFixed(1);
    return (
      <div className={index === 0 ? "popup-box-wrapper mfl-top-less" : "popup-box-wrapper "}>
        <div className="popup-content-cols-inner">
          <div className="student-popcont-header">
            <div className="student-popcont-header-left">
              <b> {mathOprationList[mathOperation].title}</b> ({questionList.length} Questions)
            </div>
            {/* <div className="student-popcont-header-right">
              <i
                className="report-timer icon-timer mfl-text-green"
                aria-hidden="true"
              ></i>{" "}
              <b className="font-18 mr-5">3</b>
              <span className="mt-auto">secs</span>
            </div> */}
          </div>
          {submission_type === "interview" ? (
            <div className="student-popcont-content">
              {correctResponseInTimeQnsList.length ? (
                <div className="student-additional-wrapper" key="correctResponseInTimeQnsList">
                  <div className="student-additional-title">
                    <span className="mfl-report-title-left font-18">Correct response, fluent</span>

                    {userDetails.role_id !== userRole.STUDENT.role_id ? (
                      <span className="mfl-report-title-right">
                        <i
                          className={"report-timer icon-timer "}
                          // className={
                          //   correctResponseInTimeQnsAvgResponseTime <=
                          //   userData.profile.max_timeout_correct_ans_secs
                          //     ? "report-timer icon-timer mfl-text-green"
                          //     : "report-timer icon-timer mfl-text-yellow"
                          // }
                          aria-hidden="true"
                        ></i>{" "}
                        <b className="font-18 mr-5">
                          {" "}
                          <AvgResponseTime value={correctResponseInTimeQnsAvgResponseTime} />
                        </b>
                        <span className="mt-auto">secs</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="student-popcont-content-inner">
                    {correctResponseInTimeQnsList.map((qns, i) => {
                      const time_taken_in_second_label =
                        qns.time_taken_in_second === 0 || qns.time_taken_in_second === 1
                          ? `${qns.time_taken_in_second}  second`
                          : `${qns.time_taken_in_second}  seconds`;
                      return (
                        <>
                          <div className="student-popcont-content-cols" key={`${qns.id}_${i}`}>
                            <div className="student-calc-card mf-success">
                              {userDetails.role_id !== userRole.STUDENT.role_id && qns.attempt_count > 1 ? (
                                <Tooltip
                                  overlayInnerStyle={{ textAlign: "center" }}
                                  title={`${qns.attempt_count}nd  attempt`}
                                >
                                  <div className="student-calc-card-attempt-count">{qns.attempt_count}</div>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              <div className="student-calc-card-title">
                                {" "}
                                {`  ${qns.first_factor} ${mathOperationList[qns.math_operation_id]}
                                ${qns.second_factor} = ${qns.answer ? qns.answer : ""}`}
                              </div>
                              {userDetails.role_id !== userRole.STUDENT.role_id ? (
                                <div className="student-calc-card-time">{time_taken_in_second_label}</div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}

              {notYetResponseQnsList.length ? (
                <div className="student-additional-wrapper" key="inCorrectResponseQnsList">
                  <div className="student-additional-title">
                    <span className="mfl-report-title-left font-18">Not yet</span>
                    {userDetails.role_id !== userRole.STUDENT.role_id ? (
                      <span className="mfl-report-title-right">
                        <i
                          className={"report-timer icon-timer "}
                          // className={
                          //   inCorrectResponseQnsAvgResponseTime <=
                          //   userData.profile.max_timeout_correct_ans_secs
                          //     ? "report-timer icon-timer mfl-text-green"
                          //     : "report-timer icon-timer mfl-text-yellow"
                          // }
                          aria-hidden="true"
                        ></i>{" "}
                        <b className="font-18 mr-5">
                          {" "}
                          <AvgResponseTime value={inCorrectResponseQnsAvgResponseTime} />
                        </b>
                        <span className="mt-auto">secs</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="student-popcont-content-inner">
                    {notYetResponseQnsList.map((qns, i) => {
                      const time_taken_in_second_label =
                        qns.time_taken_in_second === 0 || qns.time_taken_in_second === 1
                          ? `${qns.time_taken_in_second}  second`
                          : `${qns.time_taken_in_second}  seconds`;
                      return (
                        <>
                          <div className="student-popcont-content-cols" key={`${qns.id}_${i}`}>
                            <div className="student-calc-card mf-danger-teacher">
                              {userDetails.role_id !== userRole.STUDENT.role_id && qns.attempt_count > 1 ? (
                                <Tooltip
                                  overlayInnerStyle={{ textAlign: "center" }}
                                  title={`${qns.attempt_count}nd  attempt`}
                                >
                                  <div className="student-calc-card-attempt-count">{qns.attempt_count}</div>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              <div className="student-calc-card-title">
                                {" "}
                                {`  ${qns.first_factor} ${mathOperationList[qns.math_operation_id]}
                                ${qns.second_factor}`}
                              </div>
                              {userDetails.role_id !== userRole.STUDENT.role_id ? (
                                <div className="student-calc-card-time">{time_taken_in_second_label}</div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="student-popcont-content">
              {correctResponseInTimeQnsList.length ? (
                <div className="student-additional-wrapper" key="correctResponseInTimeQnsList">
                  <div className="student-additional-title">
                    <span className="mfl-report-title-left font-18">Correct response, fluent</span>

                    {userDetails.role_id !== userRole.STUDENT.role_id ? (
                      <span className="mfl-report-title-right">
                        <i
                          className={"report-timer icon-timer "}
                          // className={
                          //   correctResponseInTimeQnsAvgResponseTime <=
                          //   userData.profile.max_timeout_correct_ans_secs
                          //     ? "report-timer icon-timer mfl-text-green"
                          //     : "report-timer icon-timer mfl-text-yellow"
                          // }
                          aria-hidden="true"
                        ></i>{" "}
                        <b className="font-18 mr-5">
                          {" "}
                          <AvgResponseTime value={correctResponseInTimeQnsAvgResponseTime} />
                        </b>
                        <span className="mt-auto">secs</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="student-popcont-content-inner">
                    {correctResponseInTimeQnsList.map((qns, i) => {
                      const time_taken_in_second_label =
                        qns.time_taken_in_second === 0 || qns.time_taken_in_second === 1
                          ? `${qns.time_taken_in_second}  second`
                          : `${qns.time_taken_in_second}  seconds`;
                      return (
                        <>
                          <div className="student-popcont-content-cols" key={`${qns.id}_${i}`}>
                            <div className="student-calc-card mf-success">
                              {userDetails.role_id !== userRole.STUDENT.role_id && qns.attempt_count > 1 ? (
                                <Tooltip
                                  overlayInnerStyle={{ textAlign: "center" }}
                                  title={`${qns.attempt_count}nd  attempt`}
                                >
                                  <div className="student-calc-card-attempt-count mf-success">{qns.attempt_count}</div>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              <div className="student-calc-card-title">
                                {" "}
                                {`  ${qns.first_factor} ${mathOperationList[qns.math_operation_id]}
                              ${qns.second_factor} = ${qns.answer ? qns.answer : "EMPTY"}`}
                              </div>
                              {userDetails.role_id !== userRole.STUDENT.role_id ? (
                                <div className="student-calc-card-time">{time_taken_in_second_label}</div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
              {correctResponseOverTimeQnsList.length ? (
                <div className="student-additional-wrapper" key="correctResponseOverTimeQnsList">
                  <div className="student-additional-title">
                    <span className="mfl-report-title-left font-18">Correct response, not yet fluent</span>
                    {userDetails.role_id !== userRole.STUDENT.role_id ? (
                      <span className="mfl-report-title-right">
                        <i
                          className={"report-timer icon-timer "}
                          // className={
                          //   correctResponseOverTimeQnsAvgResponseTime <=
                          //   userData.profile.max_timeout_correct_ans_secs
                          //     ? "report-timer icon-timer mfl-text-green"
                          //     : "report-timer icon-timer mfl-text-yellow"
                          // }
                          aria-hidden="true"
                        ></i>{" "}
                        <b className="font-18 mr-5">
                          {" "}
                          <AvgResponseTime value={correctResponseOverTimeQnsAvgResponseTime} />
                        </b>
                        <span className="mt-auto">secs</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="student-popcont-content-inner">
                    {correctResponseOverTimeQnsList.map((qns, i) => {
                      const time_taken_in_second_label =
                        qns.time_taken_in_second === 0 || qns.time_taken_in_second === 1
                          ? `${qns.time_taken_in_second}  second`
                          : `${qns.time_taken_in_second}  seconds`;
                      return (
                        <>
                          <div className="student-popcont-content-cols" key={`${qns.id}_${i}`}>
                            <div className="student-calc-card mf-warning">
                              {userDetails.role_id === userRole.TEACHER.role_id && qns.attempt_count > 1 ? (
                                <Tooltip
                                  overlayInnerStyle={{ textAlign: "center" }}
                                  title={`${qns.attempt_count}nd  attempt`}
                                >
                                  <div className="student-calc-card-attempt-count mf-warning">{qns.attempt_count}</div>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              <div className="student-calc-card-title">
                                {" "}
                                {`  ${qns.first_factor} ${mathOperationList[qns.math_operation_id]}
                              ${qns.second_factor} = ${qns.answer ? qns.answer : "EMPTY"}`}
                              </div>
                              {userDetails.role_id !== userRole.STUDENT.role_id ? (
                                <div className="student-calc-card-time">{time_taken_in_second_label}</div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}

              {inCorrectResponseQnsList.length ? (
                <div className="student-additional-wrapper" key="inCorrectResponseQnsList">
                  <div className="student-additional-title">
                    <span className="mfl-report-title-left font-18">Incorrect response</span>
                    {userDetails.role_id !== userRole.STUDENT.role_id ? (
                      <span className="mfl-report-title-right">
                        <i
                          className={"report-timer icon-timer "}
                          // className={
                          //   inCorrectResponseQnsAvgResponseTime <=
                          //   userData.profile.max_timeout_correct_ans_secs
                          //     ? "report-timer icon-timer mfl-text-green"
                          //     : "report-timer icon-timer mfl-text-yellow"
                          // }
                          aria-hidden="true"
                        ></i>{" "}
                        <b className="font-18 mr-5">
                          {" "}
                          <AvgResponseTime value={inCorrectResponseQnsAvgResponseTime} />
                        </b>
                        <span className="mt-auto">secs</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="student-popcont-content-inner">
                    {inCorrectResponseQnsList.map((qns, i) => {
                      const time_taken_in_second_label =
                        qns.time_taken_in_second === 0 || qns.time_taken_in_second === 1
                          ? `${qns.time_taken_in_second}  second`
                          : `${qns.time_taken_in_second}  seconds`;
                      return (
                        <>
                          <div className="student-popcont-content-cols" key={`${qns.id}_${i}`}>
                            <div className="student-calc-card mf-danger">
                              {userDetails.role_id !== userRole.STUDENT.role_id && qns.attempt_count > 1 ? (
                                <Tooltip
                                  overlayInnerStyle={{ textAlign: "center" }}
                                  title={`${qns.attempt_count}nd  attempt`}
                                >
                                  <div className="student-calc-card-attempt-count mf-danger">{qns.attempt_count}</div>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              <div className="student-calc-card-title">
                                {" "}
                                {`  ${qns.first_factor} ${mathOperationList[qns.math_operation_id]}
                              ${qns.second_factor} = ${qns.answer ? qns.answer : "EMPTY"}`}
                              </div>
                              {userDetails.role_id !== userRole.STUDENT.role_id ? (
                                <div className="student-calc-card-time">{time_taken_in_second_label}</div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  const handleCloseDialog = () => {
    props.close();
  };

  let totalQuestionList = Object.keys(levelLifterSubmissionReportDetails).length
    ? Object.keys(levelLifterSubmissionReportDetails.questions).reduce((acc, opration) => {
        return [...acc, ...levelLifterSubmissionReportDetails.questions[opration]];
      }, [])
    : [];

  const totalCorrectResponseInTimeQnsList = totalQuestionList.filter(qns => {
    // const fluencyRateByLevel = getFluencyRateByLevel(
    //   selectedLevelLearningMode,
    //   qns.level_id,
    // );
    return submission_type === "interview"
      ? qns.correct_answer === qns.answer
      : qns.correct_answer === qns.answer &&
          qns.time_taken_in_second <= qns.max_timeout_correct_ans_secs * qns.fluency_rate;
  });

  const totalCorrectResponseOverTimeQnsList = totalQuestionList.filter(qns => {
    // const fluencyRateByLevel = getFluencyRateByLevel(
    //   selectedLevelLearningMode,
    //   qns.level_id,
    // );
    return (
      qns.correct_answer === qns.answer &&
      qns.time_taken_in_second > qns.max_timeout_correct_ans_secs * qns.fluency_rate
    );
  });

  const totalInCorrectResponseQnsList = totalQuestionList.filter(qns => qns.correct_answer !== qns.answer);

  //based on error count
  let isShowErrorMessage = correctButOverTime <= 3 && errorCount <= 3;

  return (
    <>
      <>
        {/* <!-- Popup modal --> */}
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open student-report-popup">
          {/* <Scrollbar className="popup student-report-popup-inner"> */}
          {/* id="style-4" */}
          <div className="popup student-report-popup-inner" id="style-4">
            <div className="popup-header">
              <div className="popup-header-top">
                <div className="popup-header-left">
                  <h4 className="popup-title">
                    {submission_type === "interview"
                      ? `${userData.profile.first_name} ${userData.profile.last_name}’s Level Lifter Interview Report`
                      : `${userData.profile.first_name} ${userData.profile.last_name}’s Level Lifter Report`}
                  </h4>
                  <div className="popup-header-subtitle">
                    {userData.class_name ? (
                      <div className="popup-header-subtitle-inner">
                        Class Name: <div className="popup-header-subtitle-bold">{userData.class_name}</div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="popup-header-subtitle-inner">
                      Mode:{" "}
                      <div className="popup-header-subtitle-bold">
                        {selectedLevelLearningMode === 1 ? "Addition/Subtraction" : "Multiplication/Division"}
                      </div>
                    </div>
                    <div className="popup-header-subtitle-inner">
                      Level:{" "}
                      {Object.keys(levelLifterSubmissionReportDetails).length ? (
                        <div className="popup-header-subtitle-bold">
                          {selectedLevelLearningMode === 1 ? (
                            addSubLevelList[levelLifterSubmissionReportDetails.assign_level_id] ? (
                              <>
                                {addSubLevelList[levelLifterSubmissionReportDetails.assign_level_id].sort}{" "}
                                {addSubLevelList[levelLifterSubmissionReportDetails.assign_level_id].descriptors}
                              </>
                            ) : (
                              "-"
                            )
                          ) : mulSubLevelList[levelLifterSubmissionReportDetails.assign_level_id] ? (
                            <>
                              {mulSubLevelList[levelLifterSubmissionReportDetails.assign_level_id].sort}{" "}
                              {mulSubLevelList[levelLifterSubmissionReportDetails.assign_level_id].descriptors}
                            </>
                          ) : (
                            "-"
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="popup-header-right">
                  <div className="popup-time">
                    <i className="icon-calender"></i>{" "}
                    {Object.keys(levelLifterSubmissionReportDetails).length &&
                      moment(levelLifterSubmissionReportDetails.submission_created_at).format("MMMM DD, YYYY")}
                  </div>
                  <div className="popup-time">
                    <i className="icon-clock"></i>{" "}
                    {Object.keys(levelLifterSubmissionReportDetails).length &&
                      moment(levelLifterSubmissionReportDetails.submission_created_at).format("LT")}
                  </div>
                </div>
              </div>
              {userDetails.role_id === userRole.STUDENT.role_id && isShowErrorMessage ? (
                <div
                  className="popup-header-bottom mb-10"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                  }}
                >
                  <div className={"popup-box-wrapper "}>
                    <h6
                      style={{
                        textAlign: "center",
                        fontSize: "24px",
                        padding: "24px 24px",
                        background: "white",
                        borderBottom: "4px solid #50be81",
                        borderRadius: "6px"
                      }}
                    >
                      {"You are very close to passing this level.  Keep up the good work."}
                    </h6>{" "}
                  </div>
                </div>
              ) : (
                ""
              )}
              {submission_type === "interview" ? (
                <div className="popup-header-bottom">
                  <div className="legend-wrap">
                    <span className="legend mfl-bg-green"></span>Correct response, fluent{" "}
                    <span className="mfl-text-green ml-5">
                      ({totalCorrectResponseInTimeQnsList.length}/{totalQuestionList.length})
                    </span>
                  </div>
                  <div className="legend-wrap">
                    <span className="legend mfl-bg-yellow"></span>Not yet{" "}
                    <span className="mfl-text-yellow ml-5">
                      ({totalInCorrectResponseQnsList.length}/{totalQuestionList.length})
                    </span>
                  </div>
                </div>
              ) : (
                <div className="popup-header-bottom">
                  <div className="legend-wrap">
                    <span className="legend mfl-bg-green"></span>Correct response, fluent{" "}
                    <span className="mfl-text-green ml-5">
                      ({totalCorrectResponseInTimeQnsList.length}/{totalQuestionList.length})
                    </span>
                  </div>
                  <div className="legend-wrap">
                    <span className="legend mfl-bg-yellow"></span>Correct response, not yet fluent{" "}
                    <span className="mfl-text-yellow ml-5">
                      ({totalCorrectResponseOverTimeQnsList.length}/{totalQuestionList.length})
                    </span>
                  </div>
                  <div className="legend-wrap">
                    <span className="legend mfl-bg-red"></span>Incorrect response{" "}
                    <span className="mfl-text-red ml-5">
                      ({totalInCorrectResponseQnsList.length}/{totalQuestionList.length})
                    </span>
                  </div>
                </div>
              )}

              <span className="close" onClick={() => handleCloseDialog()}>
                &times;
              </span>
            </div>

            <div className="popup-content">
              <div className="popup-content-inner">
                {fetchingLevelLifterQuestionListLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20vh",
                      width: "100%"
                    }}
                  >
                    <div className="lds-dual-ring"></div>
                  </div>
                ) : Object.keys(levelLifterSubmissionReportDetails).length ? (
                  Object.keys(levelLifterSubmissionReportDetails.questions)
                    ?.sort((a, b) => mathOperationOrderList[a] - mathOperationOrderList[b])
                    .map((key, index) => {
                      return studentReportCard(key, index, levelLifterSubmissionReportDetails.questions[key]);
                    })
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20vh",
                      width: "100%",
                      fontSize: "24px"
                    }}
                  >
                    <div>This student has not yet taken a Level Lifter.</div>
                  </div>
                )}
                {userDetails.role_id !== userRole.STUDENT.role_id &&
                !fetchingLevelLifterQuestionListLoading &&
                Object.keys(levelLifterSubmissionReportDetails).length &&
                levelLifterSubmissionReportDetails.submission_status === "inprogress" ? (
                  <div className="incomplete-report-wrapper">
                    <div className="font-24">
                      Incomplete results. The student logged off before completing the Level Lifter.
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {!fetchingLevelLifterQuestionListLoading ? (
                <div>
                  <span className="close" onClick={() => handleCloseDialog()}>
                    &times;
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* </Scrollbar> */}
        </div>
        <div className="popup-backface open"></div>
      </>
    </>
  );
};

export default LevelLifterTestFailedReportDialog;
