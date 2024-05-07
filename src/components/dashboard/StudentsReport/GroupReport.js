import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Table, Card } from "antd";
import { DownloadOutlined, ArrowRightOutlined } from "@ant-design/icons";
import useOnClickOutside from "hooks/Backdrop";
import { getStudentsGroupReport } from "../../../redux/actions/userAction";
import { addSubLevelList, mulSubLevelList } from "config/const";
import logoImg from "assets/images/logo.svg";

const GroupReport = props => {
  const { users, fromDate, toDate } = props;

  const isYesterdayDate = moment(toDate, "'YYYY-MM-DD'").diff(moment(fromDate, "'YYYY-MM-DD'"), "days");

  //  Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => console.log("close"));

  const dispatch = useDispatch();
  const [page] = useState(1);

  useEffect(() => {
    const body = {
      user_ids: users,
      from_date: fromDate,
      to_date: toDate
    };
    dispatch(getStudentsGroupReport(body));
  }, [dispatch, users, page]); // eslint-disable-line

  const { studentsGroupReport, fetchingStudentsGroupReportLoading } = useSelector(({ user }) => user);
  const { userDetails } = useSelector(({ auth }) => auth);

  //generated data required as per table
  let updatedList = studentsGroupReport
    .map(el => {
      return [{ ...el, level_lifter_details: null, is_raw_span: false }];
    })
    .flatMap(a => a)
    .sort((a, b) => a.last_name.localeCompare(b.last_name));

  const handleCloseStudentDeleteDailog = () => {
    props.handleCloseReport();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      width: "100px",
      render: (value, row, index) => {
        return `${row.last_name}, ${row.first_name}`;
      }
    },
    {
      title: "Logins",
      dataIndex: "total_sessions",
      align: "center",
      width: "100px"
    },
    {
      title: "Total Minutes",
      align: "center",
      dataIndex: "total_minutes",
      width: "80px"
    },
    {
      title: "Total Completed Activities",
      align: "center",
      dataIndex: "total_completed_activities",
      width: "100px"
    },
    {
      title: "Assignments",
      align: "center",
      width: "100px",
      dataIndex: "total_completed_activities",
      render: (value, row, index) => {
        return `${row.total_completed_assignment} / ${row.total_assignment}`;
      }
    },
    {
      title: "Addition/Subtraction",
      width: "100px",
      align: "center",
      children: [
        {
          title: (
            <>
              Beg <ArrowRightOutlined className="ml-10 mr-10" style={{ fontSize: "12px" }} /> End
            </>
          ),
          width: "100px",
          align: "center",
          render: (value, row, index) => {
            return {
              children: (
                <div className="flex align-items-center justify-content-center">
                  <div style={{ minWidth: "44px" }}>
                    {row.add_sub_starting_level_id
                      ? addSubLevelList[row.add_sub_starting_level_id]?.sort
                      : row.add_sub_ending_level_id
                        ? "PL"
                        : "-"}{" "}
                    <ArrowRightOutlined className="ml-10 mr-10" style={{ fontSize: "12px" }} />{" "}
                    {row.add_sub_ending_level_id ? addSubLevelList[row.add_sub_ending_level_id]?.sort : "-"}
                  </div>
                </div>
              )
            };
          }
        },
        {
          title: "Level Lifters Passes/Attempts",
          width: "100px",
          align: "center",
          render: (value, row, index) => {
            return `${row.add_sub_total_completed_level_lifter}/${row.add_sub_total_level_lifter}`;
          }
        }
      ]
    },
    {
      title: "Multiplication/Division",
      width: "100px",
      align: "center",
      children: [
        {
          title: (
            <>
              Beg <ArrowRightOutlined className="ml-10 mr-10" style={{ fontSize: "12px" }} /> End
            </>
          ),
          width: "100px",
          align: "center",
          render: (value, row, index) => {
            return {
              children: (
                <div className="flex align-items-center justify-content-center">
                  <div style={{ minWidth: "44px" }}>
                    {row.mul_div_starting_level_id
                      ? mulSubLevelList[row.mul_div_starting_level_id]?.sort
                      : row.mul_div_ending_level_id
                        ? "PL"
                        : "-"}{" "}
                    <ArrowRightOutlined className="ml-10 mr-10" style={{ fontSize: "12px" }} />{" "}
                    {row.mul_div_ending_level_id ? mulSubLevelList[row.mul_div_ending_level_id]?.sort : "-"} {}
                  </div>
                </div>
              )
            };
          }
        },
        {
          title: "Level Lifters Passes/Attempts",

          width: "100px",
          align: "center",
          render: (value, row, index) => {
            return `${row.mul_div_total_completed_level_lifter}/${row.mul_div_total_level_lifter}`;
          }
        }
      ]
    }
  ];

  function headRows() {
    // return [
    //   {
    //     sr: "No.",
    //     name: "Name",
    //     total_sessions: "Sessions",
    //     total_minutes: "Total Minutes",
    //     total_completed_activities: "Total Completed Activities",
    //     add_sub_starting_level_id: "Beg -> End",
    //     add_sub_level_lifter_index: "Level Lifters Passes/Attempts",
    //     mul_div_starting_level_id: "Beg -> End",
    //     mul_div_level_lifter_index: "Level Lifters Passes/Attempts",
    //   },
    // ];

    return [
      [
        {
          content: "",
          colSpan: 6
        },
        {
          content: "Addition/Subtraction",
          colSpan: 2,
          styles: { halign: "center" }
        },
        {
          content: "Multiplication/Division",
          colSpan: 2,
          styles: { halign: "center" }
        }
      ],
      [
        "No.",
        "Name",
        "Sessions",
        "Total Minutes",
        "Total Completed Activities",
        "Assignments",
        "Beg to End",
        "Level Lifters Passes/Attempts",
        "Beg to End",
        "Level Lifters Passes/Attempts"
      ]
    ];
  }

  function bodyRows(reportData) {
    var body = [];

    reportData.forEach((data, i) => {
      const rData = [];
      rData[0] = i + 1;
      rData[1] = `${data.last_name}, ${data.first_name}`;
      rData[2] = data.total_sessions;
      rData[3] = data.total_minutes;
      rData[4] = data.total_completed_activities;
      rData[5] = `${data.total_completed_assignment} / ${data.total_assignment}`;

      rData[6] = data.add_sub_starting_level_id
        ? `${addSubLevelList[data.add_sub_starting_level_id]?.sort ?? "-"} - ${
            addSubLevelList[data.add_sub_ending_level_id]?.sort ?? "-"
          } `
        : "-";
      rData[7] = `${data.add_sub_total_completed_level_lifter}/${data.add_sub_total_level_lifter}`;
      rData[8] = data.mul_div_ending_level_id
        ? `${mulSubLevelList[data.mul_div_starting_level_id]?.sort ?? "-"} - ${
            mulSubLevelList[data.mul_div_ending_level_id]?.sort ?? "-"
          }`
        : "-";
      rData[9] = `${data.mul_div_total_completed_level_lifter}/${data.mul_div_total_level_lifter}`;
      body.push(rData);
      // body.push({
      //   sr: i + 1,
      //   name: `${data.last_name}, ${data.first_name}`,
      //   total_sessions: data.total_sessions,
      //   total_minutes: data.total_minutes,
      //   total_completed_activities: data.total_completed_activities,
      //   add_sub_starting_level_id: data.add_sub_starting_level_id
      //     ? `${
      //         addSubLevelList[data.add_sub_starting_level_id].sort
      //       } ${addSubLevelList[
      //         data.add_sub_starting_level_id
      //       ].descriptors?.replaceAll("☐", "_")}`
      //     : "-",
      //   add_sub_level_lifter_index: `${data.add_sub_total_completed_level_lifter}/${data.add_sub_total_level_lifter}`,
      //   mul_div_starting_level_id: data.mul_div_ending_level_id
      //     ? `${
      //         mulSubLevelList[data.mul_div_ending_level_id].sort
      //       } ${mulSubLevelList[
      //         data.mul_div_ending_level_id
      //       ].descriptors?.replaceAll("☐", "_")}`
      //     : "-",
      //   mul_div_level_lifter_index: `${data.mul_div_total_completed_level_lifter}/${data.mul_div_total_level_lifter}`,
      // });
    });

    return body;
  }

  const GroupReportPdf = ({ reportData }) => {
    if (reportData.length) {
      if (reportData == null) return;
      var doc = new jsPDF("l", "mm", "a4");

      doc.setFontSize(20);
      doc.text(`Group Performance Report`, 150, 15, "center");
      doc.setFontSize(11);
      doc.setTextColor(100);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width

      doc.text(`Teacher : ${userDetails.profile.last_name} ${userDetails.profile.first_name}`, 14, 25);
      doc.text(`Students : ${users.length}`, 70, 25);

      doc.text(`${moment(fromDate).format("DD MMM YY")} - ${moment(toDate).format("DD MMM YY")}`, 240, 25);
      doc.autoTable({
        head: headRows(),
        body: bodyRows(reportData),
        startY: 30,
        styles: {
          fontSize: 10,
          halign: "center"
        },
        columnStyles: [
          { halign: "center" },
          { halign: "left" },
          { halign: "center" },
          { halign: "center" },
          { halign: "center" },
          { halign: "center" },
          { halign: "center" },
          { halign: "center" },
          { halign: "center" }
        ]
        // showHead: "firstPage"
      });

      doc.save(`Group Report.pdf`);
    } else {
      alert("There isn't any data to generate report!");
    }
  };

  const handlePrint = () => {
    GroupReportPdf({ reportData: updatedList });
  };

  return (
    <section>
      <div
        className={
          props.visible
            ? "custom-popup open group-report-main-wrapper ease-in-popup"
            : "custom-popup  group-report-main-wrapper ease-in-popup"
        }
      >
        <div className="popup">
          {/* <Modal
            width={`calc(100vw - 628px)`}
            className="group-report-main-wrapper"
            onClose={handleCloseStudentDeleteDailog}
            visible={props.visible}
            closable={false}
            footer={null}
          > */}
          <div className="drawer-container ">
            <div className="popup-header ">
              <div className="logo">
                <img src={logoImg} className="login-logo md" alt="Math Fact Lab" key="logo-small" />
              </div>
              <div className="popup-header-top mb-0 pb-0">
                <div className="popup-header-left">
                  <h2 className="popup-title">Group Performance Report</h2>
                  <div className="popup-header-bottom">
                    <div className="legend-wrap">
                      Teacher :{" "}
                      <span className="legend-wrap-subtitle-bold">{`${userDetails.profile.last_name} ${userDetails.profile.first_name}`}</span>
                    </div>
                    <div className="legend-wrap">
                      Students : <span className="legend-wrap-subtitle-bold">{`${users.length}`}</span>
                    </div>
                  </div>
                </div>
                <div className="popup-header-right">
                  <div className="popup-time">
                    <i className="icon-calender"></i>
                    {isYesterdayDate === 1
                      ? moment(fromDate).format("DD MMM YY")
                      : `${moment(fromDate).format("DD MMM YY")} -
                          ${moment(toDate).format("DD MMM YY")}`}
                  </div>
                  <div className="popup-time">
                    {/* <PrinterOutlined
                      style={{
                        color: "#2B95F9",
                        fontSize: "22px",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handlePrint()}
                    /> */}
                    <DownloadOutlined
                      onClick={() => handlePrint()}
                      style={{
                        color: "#2B95F9",
                        fontSize: "22px",
                        cursor: "pointer"
                      }}
                    />{" "}
                  </div>
                </div>
              </div>

              <span className="close" onClick={() => handleCloseStudentDeleteDailog()}>
                &times;
              </span>
            </div>

            <div className="popup-content">
              <div className="popup-content-inner">
                <div className={"popup-box-wrapper mfl-top-less"}>
                  {" "}
                  <Card className="report-session-table-wrapper pb-0">
                    {" "}
                    <Table
                      rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
                      columns={columns}
                      dataSource={updatedList}
                      bordered
                      pagination={false}
                      loading={fetchingStudentsGroupReportLoading}
                      headerClassName={"ant-table-blue-header"}
                      scroll={{ y: "calc(100vh - 550px)" }}
                      render={() => <>mathfact</>}
                    ></Table>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          {/* </Modal> */}
        </div>
      </div>
    </section>
  );
};

export default GroupReport;
