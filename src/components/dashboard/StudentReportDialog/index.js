import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import AvgResponseTime from "components/student/AvgResponseTime";
import { getPlacementTestReportDetails } from "../../../redux/actions/quizAction";
import { mulSubLevelList, addSubLevelList, mathOperationOrderList, levels } from "config/const";
import { getFluencyRateByLevel } from "utils/helpers";

const StudentReportDialog = props => {
  const { user, learning_mode } = props;
  const { placementReportDetails, fetchingSubmissionDetailsLoading } = useSelector(({ quiz }) => quiz);

  const levelList = learning_mode === 1 ? addSubLevelList : mulSubLevelList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlacementTestReportDetails(user.id, learning_mode));
  }, [dispatch, user]); // eslint-disable-line

  const handleCloseStudentDeleteDailog = () => {
    props.closeReportDailog();
  };

  function studentReportCardResult(level, questionLevel) {
    const avgResponseTime = +(
      questionLevel.reduce((acc, question) => {
        return acc + +question.time_taken_in_secs;
      }, 0) / questionLevel.length
    ).toFixed(1);

    const avgAllowedTime = +(
      questionLevel.reduce((acc, question) => {
        const fluencyRateByLevel = getFluencyRateByLevel(learning_mode, question.level_id);
        return acc + +(user.profile.max_timeout_correct_ans_secs * fluencyRateByLevel);
      }, 0) / questionLevel.length
    ).toFixed(1);

    const timerColorClass = avgResponseTime <= avgAllowedTime ? "mfl-text-green" : "mfl-text-yellow";

    return (
      <>
        {/* <div className="student-popcont-content"> */}
        <div className="student-additional-wrapper">
          <div className="student-additional-title">
            <span className="mfl-report-title-left font-24">{levels[level]}</span>
            <span className="mfl-report-title-right">
              <i className={`report-timer icon-timer ${timerColorClass}`} aria-hidden="true"></i>{" "}
              <b className="font-18 mr-5">
                <AvgResponseTime value={avgResponseTime} />
              </b>
              <span className="mt-auto">secs</span>
            </span>
          </div>
          <div className="student-popcont-content-inner">
            {questionLevel.map((quetion, i) => {
              const time_taken_in_second_label =
                quetion.time_taken_in_secs > 1
                  ? `${quetion.time_taken_in_secs}  second`
                  : `${quetion.time_taken_in_secs}  seconds`;
              const fluencyRateByLevel = getFluencyRateByLevel(learning_mode, quetion.level_id);
              if (quetion.correct_answer !== quetion.answer) {
                return (
                  <div className="student-popcont-content-cols" key={i}>
                    <div className="student-calc-card mf-danger">
                      <div className="student-calc-card-title">{`${
                        quetion.question
                      } = ${quetion.answer ? quetion.answer : "EMPTY"}`}</div>
                      <div className="student-calc-card-time">{time_taken_in_second_label}</div>
                    </div>
                  </div>
                );
              } else if (quetion.time_taken_in_secs <= user.profile.max_timeout_correct_ans_secs * fluencyRateByLevel) {
                return (
                  <div className="student-popcont-content-cols" key={i}>
                    <div className="student-calc-card mf-success">
                      <div className="student-calc-card-title">
                        {" "}
                        {`${quetion.question} = ${quetion.answer ? quetion.answer : "EMPTY"}`}
                      </div>
                      <div className="student-calc-card-time">{time_taken_in_second_label}</div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="student-popcont-content-cols" key={i}>
                    <div className="student-calc-card mf-warning">
                      <div className="student-calc-card-title">
                        {" "}
                        {`${quetion.question} = ${quetion.answer ? quetion.answer : "EMPTY"}`}
                      </div>
                      <div className="student-calc-card-time"> {time_taken_in_second_label}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }

  function studentReportCard(level, index, questionLevel) {
    // IGNORE warmup level count
    const questionLevelFilterByWarmup = Object.keys(questionLevel).filter(levelKey => levelKey !== "0");

    const totalQuestionByOperation = questionLevelFilterByWarmup.reduce((acc, cur) => {
      return [...acc, ...questionLevel[cur]];
    }, []);

    return (
      <div className={index === 0 ? "popup-box-wrapper mfl-top-less" : "popup-box-wrapper "}>
        <div className="popup-content-cols-inner">
          <div className="student-popcont-header">
            <div className="student-popcont-header-left">
              <b>{level}</b> ({totalQuestionByOperation.length} Questions)
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
          <div className="student-popcont-content">
            {Object.keys(questionLevel).map(level => {
              return studentReportCardResult(level, questionLevel[level]);
            })}
          </div>
        </div>
      </div>
    );
  }

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
                    {`${user.profile.first_name} ${user.profile.last_name}'s Placement Test Report`}
                  </h4>
                  <div className="popup-header-subtitle">
                    <div className="popup-header-subtitle-inner">
                      Class Name: <div className="popup-header-subtitle-bold">{user.class_name}</div>
                    </div>
                    <div className="popup-header-subtitle-inner">
                      Mode:{" "}
                      <div className="popup-header-subtitle-bold">
                        {learning_mode === 1 ? "Addition/Subtraction" : "Multiplication/Division"}
                      </div>
                    </div>
                    <div className="popup-header-subtitle-inner">
                      Initial Level:{" "}
                      <div className="popup-header-subtitle-bold" key={Math.random()}>
                        {" "}
                        {!fetchingSubmissionDetailsLoading && placementReportDetails.length ? (
                          <>
                            {levelList[placementReportDetails[0].submission_assign_level_id].sort}
                            {levelList[placementReportDetails[0].submission_assign_level_id].descriptors}
                          </>
                        ) : (
                          "  "
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popup-header-right">
                  <div className="popup-time">
                    <i className="icon-calender"></i>
                    {placementReportDetails.length &&
                      moment(placementReportDetails[0].submission_created_at).format("MMMM DD, YYYY")}
                  </div>
                  <div className="popup-time">
                    <i className="icon-clock"></i>
                    {placementReportDetails.length &&
                      moment(placementReportDetails[0].submission_created_at).format("LT")}
                  </div>
                </div>
              </div>
              <div className="popup-header-bottom">
                <div className="legend-wrap">
                  <span className="legend mfl-bg-green"></span>Correct response, fluent
                </div>
                <div className="legend-wrap">
                  <span className="legend mfl-bg-yellow"></span>Correct response, not yet fluent{" "}
                </div>
                <div className="legend-wrap">
                  <span className="legend mfl-bg-red"></span>Incorrect response{" "}
                </div>
              </div>
              <span className="close" onClick={() => handleCloseStudentDeleteDailog()}>
                &times;
              </span>
            </div>
            <div className="popup-content">
              <div className="popup-content-inner">
                {fetchingSubmissionDetailsLoading ? (
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
                ) : placementReportDetails.length ? (
                  Object.keys(placementReportDetails[0].question_answer_groupby_level)
                    ?.sort((a, b) => mathOperationOrderList[a] - mathOperationOrderList[b])
                    .map((key, index) => {
                      return studentReportCard(
                        key,
                        index,
                        placementReportDetails[0].question_answer_groupby_level[key]
                      );
                    })
                ) : (
                  ""
                )}
              </div>
              {!fetchingSubmissionDetailsLoading ? (
                <div>
                  <span className="close" onClick={() => handleCloseStudentDeleteDailog()}>
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

export default StudentReportDialog;
