import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector, useDispatch } from "react-redux";
import { Table, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Loader from "components/common/Loader";
import useOnClickOutside from "hooks/Backdrop";
import { getStudentIndividualReport } from "../../../redux/actions/userAction";
import { addSubLevelList, mulSubLevelList } from "config/const";
import logoImg from "assets/images/logo.svg";

const IndividualReport = props => {
  const { students, fromDate, toDate, studentList } = props;
  // const updatedStudent = students.filter((std, i) => i === 0);

  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      user_ids: students,
      from_date: fromDate,
      to_date: toDate
    };
    dispatch(getStudentIndividualReport(body));
  }, []); // eslint-disable-line
  //  Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => console.log("close"));

  const {
    studentIndividual,

    fetchingStudentIndividualLoading
  } = useSelector(({ user }) => user);

  //generated data required as per table
  const userListOption = studentList
    .filter(std => students.includes(std.id))
    .map(user => {
      return {
        label: `${user.profile.last_name}, ${user.profile.first_name}`,
        value: user.id
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  const [selectUser, setSelectUser] = useState("");

  useEffect(() => {
    if (studentIndividual.length) {
      setSelectUser(userListOption[0].value);
    }
  }, [userListOption.length, studentIndividual.length]); // eslint-disable-line

  const selectedStudentReportDetails = studentIndividual.find(data => data.user_id === selectUser);

  const handleChangeClassCode = value => {
    setSelectUser(value);
    // dispatch(getStudentIndividualReport(value, fromDate, toDate));
  };
  const handleCloseStudentDeleteDailog = () => {
    props.handleCloseReport();
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      align: "center",
      width: "100px",
      render: (value, row, index) => {
        return value ? moment(value).format("DD MMM YY") : "-";
      }
    },
    {
      title: "Total Minutes",
      align: "center",
      dataIndex: "time_taken_in_min",
      width: "80px"
    },
    // {
    //   title: "Total Completed Activities",
    //   align: "center",
    //   dataIndex: "total_completed_activities",
    //   width: "100px",
    // },

    {
      title: "Beginning Level",
      align: "center",
      dataIndex: "starting_level_id",
      width: "100px",
      render: (value, row, index) => {
        return row.student_learning_mode_id === 1
          ? value && value !== "undefined"
            ? `${addSubLevelList[value]?.sort} ${addSubLevelList[value]?.descriptors}`
            : row.ending_level_id
              ? "PL"
              : "-"
          : value && value !== "undefined"
            ? `${mulSubLevelList[value]?.sort} ${mulSubLevelList[value]?.descriptors}`
            : row.ending_level_id
              ? "PL"
              : "-";
      }
    },
    {
      title: "Ending Level",
      align: "center",
      dataIndex: "ending_level_id",
      width: "80px",
      render: (value, row, index) => {
        return row.student_learning_mode_id === 1
          ? value && value !== "undefined"
            ? `${addSubLevelList[value]?.sort} ${addSubLevelList[value]?.descriptors}`
            : "-"
          : value && value !== "undefined"
            ? `${mulSubLevelList[value]?.sort} ${mulSubLevelList[value]?.descriptors}`
            : "-";
      }
    },

    {
      title: "Level Lifters Passes/Attempts",
      align: "center",
      dataIndex: "assigned_level_id",
      width: "100px",
      render: (value, row, index) => {
        return `${row.total_completed_level_lifter}/${row.total_level_lifter}`;
      }
    }
  ];

  function headRows() {
    return [
      {
        sr: "No.",
        created_at: "Date",
        time_taken_in_min: "Total Minutes",
        // total_completed_activities: "Total Completed Activities",
        starting_level_id: "Beginning Level",
        ending_level_id: "Ending Level",
        assigned_level_id: "Level Lifters Passes/Attempts"
      }
    ];
  }

  function bodyRows(reportData) {
    var body = [];

    reportData.forEach((data, i) => {
      body.push({
        sr: i + 1,
        created_at: moment(data.created_at).format("DD MMM YY"),
        time_taken_in_min: data.time_taken_in_min,
        total_completed_activities: data.total_completed_activities,
        starting_level_id:
          data.student_learning_mode_id === 1
            ? data.starting_level_id
              ? `${addSubLevelList[data.starting_level_id]?.sort}`
              : "-"
            : data.starting_level_id
              ? `${mulSubLevelList[data.starting_level_id]?.sort}`
              : "-",
        ending_level_id:
          data.student_learning_mode_id === 1
            ? data.ending_level_id
              ? `${addSubLevelList[data.ending_level_id]?.sort}`
              : "-"
            : data.ending_level_id
              ? `${mulSubLevelList[data.ending_level_id]?.sort}`
              : "-",
        assigned_level_id: `${data.total_completed_level_lifter}/${data.total_level_lifter}`
      });
    });

    return body;
  }

  const IndividualReportPdf = ({ reportData }) => {
    if (reportData.length) {
      var doc = new jsPDF("p", "mm", "a4");
      reportData.map(data => {
        doc.setFontSize(20);
        doc.text(`${data.first_name} ${data.last_name}’s Individual Performance Report`, 100, 15, "center");
        doc.setFontSize(10);
        doc.setTextColor(100);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width

        // Total Sessions
        doc.text(`Total Sessions : `, 14, 25);
        doc.setFont("helvetica", "bold");
        doc.text(`${data.sessionDetails.length}`, 40, 25);

        // Total Min
        doc.setFont("helvetica", "normal");
        doc.text(`Total Min : `, 85, 25);
        doc.setFont("helvetica", "bold");
        doc.text(`${data.sessionDetails && data.sessionDetails.reduce((a, b) => a + b.time_taken_in_min, 0)}`, 104, 25);

        // Date
        doc.setFont("helvetica", "normal");
        doc.text(`${moment(fromDate).format("DD MMM YY")} - ${moment(toDate).format("DD MMM YY")}`, 160, 25);

        // Y will be 30 for Second line

        // Assignments
        doc.setFont("helvetica", "normal");
        doc.text(`Assignments : `, 14, 30);
        doc.setFont("helvetica", "bold");
        doc.text(`${data.total_completed_assignment}/${data.total_assignment}`, 37, 30);

        // Add/Sub Growth
        doc.setFont("helvetica", "normal");
        doc.text(`+/- Growth : `, 85, 30);
        doc.setFont("helvetica", "bold");
        doc.text(`${studentGrowthAddSub ? `${studentGrowthAddSub} Levels` : "NA"}`, 105, 30);

        // Mul/Div Growth
        doc.setFont("helvetica", "normal");
        doc.text(`x/÷ Growth : `, 160, 30);
        doc.setFont("helvetica", "bold");

        doc.text(`${studentGrowthMulDiv ? `${studentGrowthMulDiv} Levels` : "NA"}`, 180, 30);
        //
        doc.autoTable({
          head: headRows(),
          body: bodyRows(data.sessionDetails),
          startY: 35,
          styles: {
            fontSize: 10,
            halign: "center"
          },
          columnStyles: {
            0: { cellWidth: "auto" },
            1: { cellWidth: 25 },
            2: { cellWidth: "auto" },
            3: { cellWidth: "auto" },
            4: { cellWidth: 35 },
            5: { cellWidth: 35 },
            6: { cellWidth: "auto" }
            // etc
          }
          // showHead: "firstPage"
        });
        doc.addPage();
        return true;
      });

      // var pdfData = doc.output();

      // var blob = new Blob([pdfData], { type: "application/pdf" });

      // var url = URL.createObjectURL(blob);

      // var pdfObject =
      //   '<iframe width="100%" height="100%" src="' + url + '"></iframe>';

      // var printWindow = window.open(
      //   "",
      //   "Print Preview",
      //   "height=600,width=800",
      // );
      // printWindow.document.write(pdfObject);
      // printWindow.document.close();
      // printWindow.focus();
      // printWindow.print();
      doc.save(`Student_${reportData.length} Report.pdf`);
    } else {
      alert("There isn't any data to generate report!");
    }
  };

  const handlePrint = () => {
    IndividualReportPdf({
      reportData: studentIndividual
    });
  };

  const totalTime =
    selectedStudentReportDetails &&
    selectedStudentReportDetails?.sessionDetails?.reduce((a, b) => a + b.time_taken_in_min, 0);

  const studentCompletedSessions =
    selectedStudentReportDetails &&
    selectedStudentReportDetails?.sessionDetails?.filter(session => session.status === 1);

  const addSubStudentSessions =
    selectedStudentReportDetails &&
    selectedStudentReportDetails?.sessionDetails?.filter(
      session => session.student_learning_mode_id === 1 && !!session.starting_level_id
    );

  const mulDivStudentSessions =
    selectedStudentReportDetails &&
    selectedStudentReportDetails?.sessionDetails?.filter(
      session => session.student_learning_mode_id === 2 && !!session.starting_level_id
    );

  const studentGrowthAddSub = addSubStudentSessions?.length
    ? +addSubStudentSessions[0].ending_level_id -
      +addSubStudentSessions[addSubStudentSessions.length - 1].starting_level_id
    : "";
  const studentGrowthMulDiv = mulDivStudentSessions?.length
    ? +mulDivStudentSessions[0].ending_level_id -
      +mulDivStudentSessions[mulDivStudentSessions.length - 1].starting_level_id
    : "";

  return (
    <section className="individual-report-main-wrapper-layout">
      <div
        className={
          props.visible
            ? "custom-popup open individual-report-main-wrapper ease-in-popup"
            : "custom-popup  individual-report-main-wrapper ease-in-popup"
        }
      >
        <div className="popup">
          {studentIndividual.length <= 0 ? (
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
            <div className="drawer-container ">
              <div className="left-content">
                <div className="student-list-header">Student :</div>
                <div className="user-list-right-side">
                  {userListOption.length &&
                    userListOption.map(user => {
                      return (
                        <div
                          key={user.value}
                          className={`user-list-item ${selectUser === user.value ? "selected" : ""}`}
                          onClick={() => handleChangeClassCode(user.value)}
                        >
                          {user.label}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="right-content">
                <div className="popup-header">
                  <div className="top-header">
                    <div className="app-logo">
                      <img src={logoImg} className=" md" alt="Math Fact Lab" key="logo-small" />
                    </div>
                    {/* <div className="student-select">
                        <Select
                          name="learningMode"
                          className="form-control"
                          value={selectUser}
                          options={userListOption}
                          onChange={handleChangeClassCode}
                          style={{ width: 260 }}
                        >
                          {userListOption}
                        </Select>
                      </div> */}
                    <div>
                      <span className="close" onClick={() => handleCloseStudentDeleteDailog()}>
                        &times;
                      </span>
                    </div>
                  </div>
                  <div className="popup-header-top mb-0 pb-0">
                    <div className="popup-header-left">
                      <h4 className="popup-title">
                        {selectedStudentReportDetails && selectedStudentReportDetails.first_name}{" "}
                        {selectedStudentReportDetails && selectedStudentReportDetails.last_name}
                        ’s Individual Performance Report{" "}
                      </h4>
                      <div className="popup-header-bottom">
                        <div className="legend-wrap">
                          Total Logins :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {selectedStudentReportDetails && selectedStudentReportDetails?.sessionDetails.length}
                          </span>
                        </div>
                        <div className="legend-wrap">
                          Total Minutes : <span className="legend-wrap-subtitle-bold">{totalTime}</span>
                        </div>
                        <div className="legend-wrap">
                          +/- Growth :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {studentGrowthAddSub ? `${studentGrowthAddSub} Levels` : "NA"}
                          </span>
                        </div>
                        <div className="legend-wrap">
                          x/÷ Growth :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {studentGrowthMulDiv ? `${studentGrowthMulDiv} Levels` : "NA"}
                          </span>
                        </div>
                        <div className="legend-wrap">
                          Completed Assignments :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {studentCompletedSessions && studentCompletedSessions.length
                              ? `${selectedStudentReportDetails.total_completed_assignment}/${selectedStudentReportDetails.total_assignment}`
                              : "0 / 0"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="popup-header-right">
                      <div className="popup-time">
                        <i className="icon-calender"></i> {moment(fromDate).format("DD MMM YY")} -{" "}
                        {moment(toDate).format("DD MMM YY")}
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
                        />
                        */}
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
                </div>

                <div className="popup-content">
                  <div className="popup-content-inner">
                    <div className={"popup-box-wrapper mfl-top-less"}>
                      <Card className="report-session-table-wrapper pb-0">
                        <Table
                          rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
                          columns={columns}
                          dataSource={
                            (selectedStudentReportDetails && selectedStudentReportDetails.sessionDetails) || []
                          }
                          bordered
                          pagination={false}
                          loading={fetchingStudentIndividualLoading}
                          headerClassName={"ant-table-blue-header"}
                          scroll={{ y: "calc(100vh - 460px)" }}
                          render={() => <>mathfact</>}
                        ></Table>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndividualReport;
