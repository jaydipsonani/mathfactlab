import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Slider from "rc-slider";
import { Card, Checkbox, Row, Col, message, Tooltip, Drawer, Space, Button } from "antd";
import Container from "components/common/Container";
import ErrorBoundary from "components/common/ErrorBoundary";
import { userRole } from "config/const";
import { updateTeacher, getUsersList } from "../../../redux/actions";
import "rc-slider/assets/index.css";
import "assets/sass/components/button-ant.scss";
import "assets/sass/components/settings.scss";

const StudentStatusControllerDialog = ({ open, closeSettingPopup }) => {
  const dispatch = useDispatch();

  const {
    userDetails,
    userDetails: { role_id }
  } = useSelector(({ auth }) => auth);
  const currentDate = moment(userDetails.profile.created_at).format("DD-MM-YYYY");
  const { completed_sessions, completed_sessions_without_level_up, level_lifter_count_at_failed } =
    userDetails.profile.student_status_controller;

  const [loading, setLoading] = useState(false);
  const [minValueCompletedSession, setMinValueCompletedSession] = useState(completed_sessions.min);

  const [maxValueCompletedSession, setMaxValueCompletedSession] = useState(completed_sessions.max);

  const [minValueLevelLifterFailed, setMinValueLevelLifterFailed] = useState(level_lifter_count_at_failed.min);
  const [maxValueLevelLifterFailed, setMaxValueLevelLifterFailed] = useState(level_lifter_count_at_failed.max);
  const [minValueCompletedSessionWithoutLevelup, setMinValueCompletedSessionWithoutLevelup] = useState(
    completed_sessions_without_level_up.min
  );
  const [maxValueCompletedSessionWithoutLevelup, setMaxValueCompletedSessionWithoutLevelup] = useState(
    completed_sessions_without_level_up.max
  );

  const [isOnCompletedSession, setIsOnCompletedSession] = useState(completed_sessions.is_on);
  const [isOnLevelLifterFailed, setIsOnLevelLifterFailed] = useState(level_lifter_count_at_failed.is_on);
  const [isOnCompletedSessionWithoutLevelup, setIsOnCompletedSessionWithoutLevelup] = useState(
    completed_sessions_without_level_up.is_on
  );

  const handleSave = () => {
    setLoading(true);
    const body = {
      role_id: role_id,
      profile: {
        student_status_controller: {
          completed_sessions: {
            min: minValueCompletedSession[0] || minValueCompletedSession,
            max: minValueCompletedSession[1] || maxValueCompletedSession,
            is_on: isOnCompletedSession
          },
          level_lifter_count_at_failed: {
            min: maxValueLevelLifterFailed[0] || minValueLevelLifterFailed,
            max: maxValueLevelLifterFailed[1] || maxValueLevelLifterFailed,
            is_on: isOnLevelLifterFailed
          },
          completed_sessions_without_level_up: {
            min: maxValueCompletedSessionWithoutLevelup[0] || minValueCompletedSessionWithoutLevelup,
            max: maxValueCompletedSessionWithoutLevelup[1] || maxValueCompletedSessionWithoutLevelup,
            is_on: isOnCompletedSessionWithoutLevelup
          }
        }
      }
    };
    dispatch(updateTeacher(body))
      .then(() => {
        closeSettingPopup();
        message.success("Your settings has been updated successfully.");

        dispatch(getUsersList(userRole.STUDENT.role_id, currentDate, currentDate));
      })
      .catch(() => {
        message.error("Something went wrong!");
      });
    setLoading(false);
  };

  const handleSettingDialog = () => {
    closeSettingPopup();
  };

  const handleResetDefault = () => {
    setLoading(true);

    setIsOnCompletedSession(true);
    setIsOnLevelLifterFailed(true);
    setIsOnCompletedSessionWithoutLevelup(true);

    setMinValueCompletedSession(2);
    setMaxValueCompletedSession(4);

    setMinValueLevelLifterFailed(2);
    setMaxValueLevelLifterFailed(5);

    setMinValueCompletedSessionWithoutLevelup(2);
    setMaxValueCompletedSessionWithoutLevelup(7);

    const body = {
      role_id: role_id,
      profile: {
        student_status_controller: {
          completed_sessions: {
            min: 2,
            max: 4,
            is_on: true
          },
          level_lifter_count_at_failed: {
            min: 2,
            max: 5,
            is_on: isOnLevelLifterFailed
          },
          completed_sessions_without_level_up: {
            min: 2,
            max: 7,
            is_on: isOnCompletedSessionWithoutLevelup
          }
        }
      }
    };

    dispatch(updateTeacher(body))
      .then(() => {
        message.success("Your settings has been updated successfully.");
      })
      .catch(() => {
        message.error("Something went wrong!");
      });
    setLoading(false);
  };

  // const handleChangeCompletedSession = value => {
  //   setMinValueCompletedSession(value[0]);
  //   setMaxValueCompletedSession(value[1]);
  // };

  const handleChangeLevelLifter = value => {
    setMinValueLevelLifterFailed(value[0]);
    setMaxValueLevelLifterFailed(value[1]);
  };

  const handlChangeLevelingUp = value => {
    setMinValueCompletedSessionWithoutLevelup(value[0]);
    setMaxValueCompletedSessionWithoutLevelup(value[1]);
  };
  return (
    <>
      <Drawer
        className="student-drawer-wrapper"
        open={open}
        onClose={handleSettingDialog}
        title={
          <div>
            Status Light Control Panel{" "}
            <Tooltip
              overlayClassName="ant-tooltip-status-control"
              title={
                <div>
                  <p>
                    The status light control panel allows you to fine-tune how a student’s current MathFactLab ‘status’
                    is determined.
                  </p>
                  <p>Slide the red and green circles of each bar to levels that you feel are most appropriate.</p>
                  <p>Uncheck a box to remove that variable from status determination.</p>
                  <p>Hit ‘Reset’ to return to MathFactLab defaults.</p>
                </div>
              }
            >
              <b className="setting-info-icon">?</b>
            </Tooltip>
          </div>
        }
        // destroyOnClose={true}
        onCancel={() => handleSettingDialog()}
        closable={false}
        width={700}
        footer={null}
        key="modal"
        extra={
          <>
            <Space>
              <Button disabled={loading} onClick={() => handleResetDefault()}>
                Reset to defaults
              </Button>
              <Button onClick={() => handleSettingDialog()} disabled={loading}>
                Cancel
              </Button>

              <Button type="primary" disabled={loading} onClick={() => handleSave()}>
                Save
              </Button>
            </Space>
          </>
        }
      >
        <ErrorBoundary>
          <Row gutter={30}>
            <Col lg={24} md={24} sm={24}>
              <div className="setting-dialog-wrapper">
                <Container fluid>
                  {/* <div className="slider-title">
                    <Checkbox
                      className="popup-checkbox"
                      checked={isOnCompletedSession}
                      onChange={() =>
                        setIsOnCompletedSession(!isOnCompletedSession)
                      }
                    />
                    <h6 className="setting-subtitle">Completed sessions</h6>
                    <Tooltip
                      placement="bottom"
                      overlayClassName="ant-tooltip-reset-counter"
                      title="# of completed sessions in the last 14 days.  (Will not trigger red/yellow until 14 days after initial placement test.)"
                    >
                      <b className="setting-info-icon">?</b>
                    </Tooltip>
                  </div> */}

                  {/* <Card className="setting-dialog-card-wrapper">
                    <div
                      className={
                        isOnCompletedSession
                          ? "setting-wrapper-body-child"
                          : "setting-wrapper-body-child disabled"
                      }
                    >
                      <div style={{ width: 500, marginInlineEnd: 10 }}>
                        <Slider
                          marks={{
                            0: 0,
                            1: 1,
                            2: 2,
                            3: 3,
                            4: 4,
                            5: 5,
                            6: 6,
                            7: 7,
                            8: 8,
                            9: 9,
                            10: 10,
                          }}
                          range
                          defaultValue={[
                            minValueCompletedSession,
                            maxValueCompletedSession,
                          ]}
                          value={[
                            minValueCompletedSession,
                            maxValueCompletedSession,
                          ]}
                          railStyle={{
                            backgroundColor: "#f92b2b",
                            height: 10,
                          }}
                          handleStyle={[
                            {
                              borderColor: "#2DCC89",
                              border: "4px solid #f92b2b",
                              height: 20,
                              width: 20,
                              backgroundColor: "white",
                              opacity: 1,
                            },
                            {
                              borderColor: "#2DCC89",
                              border: "4px solid #2dcc89",
                              height: 20,
                              width: 20,
                              backgroundColor: "white",
                              opacity: 1,
                            },
                          ]}
                          min={0}
                          max={10}
                          pushable={1}
                          trackStyle={[
                            { backgroundColor: "yellow", height: 10 },
                          ]}
                          allowCross={false}
                          onChange={handleChangeCompletedSession}
                        />

                        <div
                          className="slider-after-railtrack"
                          style={{
                            left: `${(minValueCompletedSession[1]
                              ? minValueCompletedSession[1]
                              : maxValueCompletedSession) *
                              50 +
                              7}px`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </Card> */}

                  <div className="slider-title">
                    <Checkbox
                      className="popup-checkbox"
                      checked={isOnLevelLifterFailed}
                      onChange={() => setIsOnLevelLifterFailed(!isOnLevelLifterFailed)}
                    />
                    <h6 className="setting-subtitle">Level Lifters</h6>
                    <Tooltip
                      placement="bottom"
                      overlayClassName="ant-tooltip-reset-counter"
                      title="# of failed Level Lifters at current level. (Count is refreshed when Level Lifter/Interview is passed or when teacher changes the student’s level.)
                        "
                    >
                      <b className="setting-info-icon">?</b>
                    </Tooltip>
                  </div>
                  <Card className="setting-dialog-card-wrapper">
                    <div
                      className={
                        isOnLevelLifterFailed ? "setting-wrapper-body-child" : "setting-wrapper-body-child disabled"
                      }
                    >
                      <div style={{ width: 500, marginInlineEnd: 10 }}>
                        <Slider
                          range
                          marks={{
                            0: 0,
                            1: 1,
                            2: 2,
                            3: 3,
                            4: 4,
                            5: 5,
                            6: 6,
                            7: 7,
                            8: 8,
                            9: 9,
                            10: 10,
                            11: 11,
                            12: 12
                          }}
                          defaultValue={[minValueLevelLifterFailed, maxValueLevelLifterFailed]}
                          value={[minValueLevelLifterFailed, maxValueLevelLifterFailed]}
                          railStyle={{
                            backgroundColor: "#2dcc89",
                            height: 10
                          }}
                          handleStyle={[
                            {
                              borderColor: "#2DCC89",
                              border: "4px solid  #2dcc89",
                              height: 20,
                              width: 20,
                              backgroundColor: "white",
                              opacity: 1
                            },
                            {
                              borderColor: "#2DCC89",
                              border: "4px solid #f92b2b",
                              height: 20,
                              width: 20,
                              backgroundColor: "white",
                              opacity: 1
                            }
                          ]}
                          min={0}
                          max={12}
                          pushable={1}
                          trackStyle={[{ backgroundColor: "yellow", height: 10 }]}
                          allowCross={false}
                          onChange={handleChangeLevelLifter}
                        />
                        <div
                          className="slider-after-railtrack"
                          style={{
                            left: `${
                              (maxValueLevelLifterFailed[1]
                                ? maxValueLevelLifterFailed[1]
                                : maxValueLevelLifterFailed) *
                                50 +
                              7
                            }px`,
                            backgroundColor: "#f92b2b"
                          }}
                        ></div>
                      </div>
                    </div>
                  </Card>

                  <div className="slider-title">
                    <Checkbox
                      className="popup-checkbox"
                      checked={isOnCompletedSessionWithoutLevelup}
                      onChange={() => setIsOnCompletedSessionWithoutLevelup(!isOnCompletedSessionWithoutLevelup)}
                    />
                    <h6 className="setting-subtitle">Leveling up</h6>
                    <Tooltip
                      placement="bottom"
                      overlayClassName="ant-tooltip-reset-counter"
                      title="# of completed sessions without leveling up."
                    >
                      <b className="setting-info-icon">?</b>
                    </Tooltip>
                  </div>
                  <Card className="setting-dialog-card-wrapper">
                    <div
                      className={
                        isOnCompletedSessionWithoutLevelup
                          ? "setting-wrapper-body-child"
                          : "setting-wrapper-body-child disabled"
                      }
                    >
                      <div style={{ width: 500, marginInlineEnd: 10 }}>
                        <Slider
                          dots={true}
                          range
                          marks={{
                            0: 0,
                            1: 1,
                            2: 2,
                            3: 3,
                            4: 4,
                            5: 5,
                            6: 6,
                            7: 7,
                            8: 8,
                            9: 9,
                            10: 10,
                            11: 11,
                            12: 12
                          }}
                          defaultValue={[
                            minValueCompletedSessionWithoutLevelup,
                            maxValueCompletedSessionWithoutLevelup
                          ]}
                          value={[minValueCompletedSessionWithoutLevelup, maxValueCompletedSessionWithoutLevelup]}
                          railStyle={{
                            backgroundColor: "#2dcc89",
                            height: 10
                          }}
                          handleStyle={[
                            {
                              borderColor: "#2DCC89",
                              border: "4px solid  #2dcc89",
                              height: 20,
                              width: 20,
                              backgroundColor: "white",
                              opacity: 1
                            },
                            {
                              borderColor: "#2DCC89",
                              border: "4px solid #f92b2b",
                              height: 20,
                              width: 20,
                              backgroundColor: "white",
                              opacity: 1
                            }
                          ]}
                          min={0}
                          max={12}
                          pushable={1}
                          trackStyle={[{ backgroundColor: "yellow", height: 10 }]}
                          allowCross={false}
                          onChange={handlChangeLevelingUp}
                        />
                        <div
                          className="slider-after-railtrack"
                          style={{
                            left: `${
                              (maxValueCompletedSessionWithoutLevelup[1]
                                ? maxValueCompletedSessionWithoutLevelup[1]
                                : maxValueCompletedSessionWithoutLevelup) *
                                50 +
                              7
                            }px`,
                            backgroundColor: "#f92b2b"
                          }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                  {/* <div className="flex justify-content-end">
                    <Space>
                      <Button
                        onClick={() => handleSettingDialog()}
                        disabled={loading}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="primary"
                        disabled={loading}
                        onClick={() => handleSave()}
                      >
                        Apply
                      </Button>
                    </Space>
                  </div> */}
                </Container>
              </div>
            </Col>
          </Row>
        </ErrorBoundary>
      </Drawer>
    </>
  );
};

export default StudentStatusControllerDialog;
