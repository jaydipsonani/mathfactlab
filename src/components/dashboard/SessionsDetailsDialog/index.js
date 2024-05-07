import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import useOnClickOutside from "hooks/Backdrop";
import { Table, Card, Drawer } from "antd";
import { getSessionDetailsByStudentID } from "../../../redux/actions/practiceAction";
import { addSubLevelList, mulSubLevelList } from "config/const";

const SessionsDetailsDialog = props => {
  const { user } = props;

  const [visible, setVisible] = useState(false);
  //  Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // const onClose = () => {
  //   setVisible(false);
  // };

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => console.info("close"));

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const limit = 20;

  useEffect(() => {
    setVisible(true);

    dispatch(getSessionDetailsByStudentID(user.id, page, limit));
  }, [dispatch, user, page]); // eslint-disable-line

  const {
    sessionListByUser,
    fetchingSessionListLoading,
    // monthlySessionList,
    // weeklySessionList,
    totalSessionLengthByUser,
    totalCompletedSessionLengthByUser,
    studentSessionStartDate
  } = useSelector(({ strategy }) => strategy);

  // sessionListByUser.map(el =>{
  //   const up = el.level_lifter_history
  //   if(up.length) {
  //     return up.map(e1=>{

  //   return {...el,
  //   singleSession:{...e1}
  //          }

  //         }) }else { return [el]}

  //       }).flatMap(a=>a)

  //generated data required as per table
  let updatedList = sessionListByUser
    .map(el => {
      return el.level_lifter_history.length
        ? el.level_lifter_history.map((e1, index) => {
            if (index > 0) {
              return {
                ...el,
                level_lifter_details: { ...e1 },
                is_raw_span: true
              };
            } else {
              return {
                ...el,
                level_lifter_details: { ...e1 },
                s_raw_span: false
              };
            }
          })
        : [{ ...el, level_lifter_details: null, is_raw_span: false }];
    })
    .flatMap(a => a);

  const handleCloseStudentDeleteDailog = () => {
    props.closeStudentSessionDailog();
  };

  const handleShowLevelLifterDailog = (levelLifterSubmissionID, learningMode) => {
    props.showLevelLifterReportDailog(levelLifterSubmissionID, learningMode);
  };

  // const renderContent = (value, row, index) => {
  //   const obj = {
  //     children: value,
  //     props: {},
  //   };
  //   if (index === 4) {
  //     obj.props.colSpan = 0;
  //   }
  //   return obj;
  // };

  const columns = [
    {
      title: "Date",
      dataIndex: "start_time",
      align: "center",
      width: "100px",
      render: (value, row, index) => {
        const obj = {
          children: moment(value).format("DD MMM, YY").replace(",", " "),
          props: {}
        };
        if (row.level_lifter_history.length) {
          obj.props.rowSpan = row.level_lifter_history.length;
        }
        if (row.is_raw_span) {
          obj.props.rowSpan = 0;
        }

        return obj;
      }
    },
    {
      title: "Learning Mode",
      align: "center",
      dataIndex: "student_learning_mode_id",
      width: "80px",
      render: (value, row, index) => {
        const obj = {
          children:
            value === 1 ? (
              <i className="icon-add-sub" aria-hidden="true" />
            ) : (
              <i className="icon-mul-div" aria-hidden="true" />
            ),
          props: {}
        };
        if (row.level_lifter_history.length) {
          obj.props.rowSpan = row.level_lifter_history.length;
        }
        if (row.is_raw_span) {
          obj.props.rowSpan = 0;
        }

        return obj;
      }
    },
    {
      title: "Starting Level",
      align: "center",
      // colSpan: 2,
      dataIndex: "starting_level_id",
      width: "100px",

      render: (value, row, index) => {
        const obj = {
          children:
            row.student_learning_mode_id === 1
              ? value
                ? `${addSubLevelList[value]?.sort} ${addSubLevelList[value]?.descriptors}`
                : "-"
              : value
                ? `${mulSubLevelList[value]?.sort} ${mulSubLevelList[value]?.descriptors}`
                : "-",
          props: {}
        };
        if (row.level_lifter_history.length) {
          obj.props.rowSpan = row.level_lifter_history.length;
        }
        if (row.is_raw_span) {
          obj.props.rowSpan = 0;
        }

        return obj;
      }
    },

    {
      title: "Ending Level ",
      align: "center",
      dataIndex: "ending_level_id",
      width: "100px",

      render: (value, row, index) => {
        const levelListByMode = row.student_learning_mode_id === 1 ? addSubLevelList : mulSubLevelList;

        const listValue = Object.keys(levelListByMode).includes(String(value));

        const obj = {
          children:
            value && value !== "" && value !== "undefined" && listValue
              ? `${levelListByMode[value]?.sort} ${levelListByMode[value]?.descriptors}`
              : "-",

          props: {}
        };
        if (row.level_lifter_history.length) {
          obj.props.rowSpan = row.level_lifter_history.length;
        }
        if (row.is_raw_span) {
          obj.props.rowSpan = 0;
        }

        return obj;
      }
    },
    {
      title: "Total Minutes",
      align: "center",
      dataIndex: "time_taken_in_min",
      width: "80px",

      render: (value, row, index) => {
        const obj = {
          children: value ? value : "-",
          props: {}
        };
        if (row.level_lifter_history.length) {
          obj.props.rowSpan = row.level_lifter_history.length;
        }
        if (row.is_raw_span) {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    },

    {
      title: "Level Lifter(s)",
      align: "center",
      dataIndex: "assigned_level_id",
      width: "100px",

      render(text, record) {
        let assignedLevel = record.level_lifter_details?.assigned_level_id ?? "";

        const levelListByMode = record.student_learning_mode_id === 1 ? addSubLevelList : mulSubLevelList;

        const listValue = Object.keys(levelListByMode).includes(assignedLevel + "");

        return {
          props: {
            style: {
              background: record.level_lifter_details?.status === "pass" ? "#a9d896" : ""
            }
          },
          children: (
            <div
              onClick={() =>
                handleShowLevelLifterDailog(
                  record.level_lifter_details.level_lifter_submission_id,
                  record.student_learning_mode_id
                )
              }
              style={{ cursor: "pointer", fontWeight: 600 }}
            >
              {assignedLevel && listValue
                ? `${levelListByMode[assignedLevel]?.sort} ${levelListByMode[assignedLevel]?.descriptors}`
                : "-"}
            </div>
          )
        };
      }
    },
    {
      title: "Correct and fluent",
      align: "center",
      dataIndex: "correct_and_fluent",
      width: "80px",

      render(text, record) {
        const isIncorrect = record.level_lifter_details?.correct_and_fluent;
        const displayValue = isIncorrect !== undefined ? `${isIncorrect}%` : "-";
        return {
          props: {
            style: {
              background: record.level_lifter_details?.status === "pass" ? "#a9d896" : ""
            }
          },
          children: <div>{displayValue}</div>
        };
      }
    },
    {
      title: "Correct, not fluent",

      align: "center",
      dataIndex: "correct_and_not_Fluent",
      width: "80px",

      render(text, record) {
        const isIncorrect = record.level_lifter_details?.correct_and_not_Fluent;
        const displayValue = isIncorrect !== undefined ? `${isIncorrect}%` : "-";
        return {
          props: {
            style: {
              background: record.level_lifter_details?.status === "pass" ? "#a9d896" : ""
            }
          },
          children: <div>{displayValue}</div>
        };
      }
    },
    {
      title: "Incorrect",
      align: "center",
      dataIndex: "is_incorrect",
      width: "80px",

      render(text, record) {
        const isIncorrect = record.level_lifter_details?.is_incorrect;
        const displayValue = isIncorrect !== undefined ? `${isIncorrect}%` : "-";
        return {
          props: {
            style: {
              background: record.level_lifter_details?.status === "pass" ? "#a9d896" : ""
            }
          },
          children: <div>{displayValue}</div>
        };
      }
    }
  ];

  // let moments = sessionListByUser.map(d => moment(d.start_time)),
  // minDate = moment.min(moments);

  return (
    <>
      <>
        {/* <!-- Popup modal --> */}
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        {/* <div className="custom-popup open student-report-popup session-details"> */}
        {/* <Scrollbar className="popup student-report-popup-inner"> */}
        {/* id="style-4" */}

        <Drawer
          width={`calc(100vw - 300px)`}
          className="drawer-main-wrapper"
          onClose={handleCloseStudentDeleteDailog}
          open={visible}
          closable={false}
        >
          <div className="drawer-container ">
            <div className="popup-header ">
              <div className="popup-header-top mb-0 pb-0">
                <div className="popup-header-left">
                  <h4 className="popup-title">
                    Daily Session Logs - {user.profile.first_name} {user.profile.last_name}
                  </h4>
                  <div className="popup-header-bottom">
                    <div className="legend-wrap">
                      <span className="legend mfl-bg-green" style={{ backgroundColor: "#a9d896" }}></span>
                      Passing Score
                    </div>
                  </div>
                </div>

                {totalCompletedSessionLengthByUser ? (
                  <div className="popup-header-right">
                    <div className="popup-time">
                      {/* <i className="icon-clock"></i>{" "} */}
                      {totalCompletedSessionLengthByUser} completed{" "}
                      {totalCompletedSessionLengthByUser > 1 ? "sessions" : "session"} since
                    </div>
                    <div className="popup-time">
                      {/* <i className="icon-calender"></i>{" "} */}
                      {moment(studentSessionStartDate).format("MMMM DD, YYYY")}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <span className="close" onClick={() => handleCloseStudentDeleteDailog()}>
                &times;
              </span>
            </div>

            <div className="popup-content">
              <div className="popup-content-inner">
                {/* {fetchingSessionListLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20vh",
                      width: "100%",
                    }}
                  >
                    <div className="lds-dual-ring"></div>
                  </div>
                ) :  */}

                <div className={"popup-box-wrapper mfl-top-less"}>
                  {" "}
                  <Card className="session-table-wrapper pb-0">
                    {" "}
                    <Table
                      rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
                      columns={columns}
                      dataSource={updatedList}
                      bordered
                      pagination={false}
                      loading={fetchingSessionListLoading}
                      headerClassName={"ant-table-blue-header"}
                      scroll={{ y: "auto" }}
                      render={() => <>mathfact</>}
                    ></Table>
                    {totalSessionLengthByUser > sessionListByUser.length && (
                      <div className="load-more-link" onClick={() => setPage(page + 1)}>
                        Load More
                      </div>
                    )}
                  </Card>
                </div>

                {/* ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20vh",
                      width: "100%",
                      fontSize: "24px",
                    }}
                  >
                    <div>This student has not yet taken a Level Lifter.</div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </Drawer>
        {/* </Scrollbar> */}
        {/* </div> */}
        {/* <div className="popup-backface open"></div> */}
      </>
    </>
  );
};

export default SessionsDetailsDialog;
