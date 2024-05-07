import React, { useEffect, useState } from "react";
import moment from "moment";
import { Radio, Space, DatePicker, Checkbox, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import IndividualReport from "./IndividualReport";
import GroupReport from "./GroupReport";
import Select from "components/common/ReactSelect";
import ImageViewer from "components/student/ImageViewer";
import { getUsersList } from "../../../redux/actions/userAction";
import { getSchool } from "../../../redux/actions/schoolAction";
import { getClassCodeList } from "../../../redux/actions/classCodeAction";
import { userRole } from "config/const";
import logoImg from "assets/images/logo.svg";
import IndividualReportImg from "assets/images/individual-report.png";
import GroupReportImg from "assets/images/group-report.png";
import IndividualReportFullImg from "assets/images/IndividualReport.png";
import GroupReportFullImg from "assets/images/GroupReport.png";

const StudentsReport = props => {
  const { isOpenPopup } = props;

  const { userDetails } = useSelector(({ auth }) => auth);
  const { studentList: studentUserList } = useSelector(({ user }) => user);
  const [selectedClassId, setSelectClassId] = useState("");
  const [selectedSchoolCode, setSelectSchoolCode] = useState("");
  const [groupStudentId, setGroupStudentId] = useState([]);
  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { schoolData } = useSelector(({ schoolData }) => schoolData);
  const [isShowReport, setIsShowReport] = useState(false);
  const [reportType, setReportType] = useState(false);
  const [dateType, setDateType] = useState(false);
  const [selectedDateCase, setSelectedDateCase] = useState(false);

  const [isSelectAllStudents, setIsSelectAllStudents] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));

  const [fromDateVisible, setFromDateVisibleVisible] = useState(false);
  const [toDateVisible, setToDateVisible] = useState(false);
  const [selectionError, setSelectionError] = useState(false);
  const [isImageVisible, setImageVisible] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const [studentList, setStudentList] = useState([]);

  const [menuItemEvent, setMenuItemEvent] = useState(null);
  const dispatch = useDispatch();
  let classCodeListOption = [
    // {
    //   label: "All Classes",
    //   value: "",
    // },

    ...classCodeList.map(classCode => {
      return {
        label: `${classCode.name} - ${classCode.class_code}`,
        value: classCode.class_code,
        schoolID: classCode.school_id
      };
    })
  ];

  const schoolListOption = [
    // {
    //   label: "All Schools",
    //   value: "",
    // },
    ...schoolData.map(school => {
      return {
        label: school.name,
        value: school.id
      };
    })
  ];

  useEffect(() => {
    !classCodeList.length && dispatch(getClassCodeList());
  }, []); // eslint-disable-line

  useEffect(() => {
    !schoolData.length && dispatch(getSchool());
  }, []); // eslint-disable-line

  const handleChangeClassCode = e => {
    setSelectClassId(e.target.value);

    const selectedClassDetails = classCodeList.find(classDetails => classDetails.class_code === e.target.value);

    if (selectedDateCase === "Since Initial") {
      setFromDate(moment(selectedClassDetails.created_at).format("YYYY-MM-DD"));
    }

    setGroupStudentId([]);
    setIsSelectAllStudents([]);
    setIsSelectAllStudents(false);
  };

  const handleChangeSchool = e => {
    setSelectSchoolCode(e.target.value);
  };

  if (selectedSchoolCode) {
    classCodeListOption = classCodeListOption.filter(classCode => classCode.schoolID === selectedSchoolCode);
  }

  useEffect(() => {
    if (studentUserList.length <= 0) {
      const classCodesList = classCodeList.map(classDetails => classDetails.class_code);

      dispatch(getUsersList(classCodesList));
    }
  }, [classCodeList.length]); // eslint-disable-line

  useEffect(() => {
    setStudentList(studentUserList);
  }, [studentUserList]);

  useEffect(() => {
    if (schoolListOption.length) {
      setSelectSchoolCode(schoolListOption[0].value);
    }
  }, [schoolListOption.length]); // eslint-disable-line

  useEffect(() => {
    if (classCodeListOption.length) {
      setSelectClassId(classCodeListOption[0].value);

      const selectedClassDetails = classCodeList.find(
        classDetails => classDetails.class_code === classCodeListOption[0].value
      );

      setFromDate(moment(selectedClassDetails.created_at).format("YYYY-MM-DD"));
    }
  }, [classCodeListOption.length]); // eslint-disable-line

  const handleSelectStudent = studentId => {
    if (!groupStudentId.includes(studentId)) {
      setGroupStudentId([...groupStudentId, studentId]);
    } else {
      const newStudentList = groupStudentId.filter(data => data !== studentId);
      setGroupStudentId([...newStudentList]);
    }
  };
  const onChangeSelectReportType = e => {
    setReportType(e.target.value);
    setSelectionError(false);
  };
  const onChangeSelectDate = e => {
    setDateType(e.target.value);
    setSelectionError(false);
    if (e.target.value === 1) {
      setFromDate("");
      setToDate("");
    }
  };
  const handleAssignEvent = e => {
    setMenuItemEvent((e.domEvent = e));
  };

  const handleChangeToDate = async (e, selectedDate, selectedCase, c, d) => {
    setSelectedDateCase(selectedCase);
    switch (selectedCase) {
      case "Yesterday":
        setFromDate(moment().subtract(1, "days").format("YYYY-MM-DD"));
        setToDate(moment().format("YYYY-MM-DD"));

        break;
      case "Last 7 days":
        setFromDate(moment().subtract(7, "d").format("YYYY-MM-DD"));
        setToDate(moment().format("YYYY-MM-DD"));

        break;
      case "Last 30 days":
        setFromDate(moment().subtract(30, "d").format("YYYY-MM-DD"));
        setToDate(moment().format("YYYY-MM-DD"));

        break;
      case "Since Initial":
        const selectedClassDetails = classCodeList.find(classDetails => classDetails.class_code === selectedClassId);

        setFromDate(moment(selectedClassDetails.created_at).format("YYYY-MM-DD"));
        setToDate(moment().format("YYYY-MM-DD"));

        break;
      case "Custom":
        c === "From Date"
          ? setFromDate(selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : "")
          : setToDate(selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"));
        setFromDateVisibleVisible(false);
        setToDateVisible(false);
        break;
      default:
        setFromDate(moment().format("YYYY-MM-DD"));
        setToDate(moment().format("YYYY-MM-DD"));
    }
  };

  const handleGenerateReport = () => {
    if (dateType && !!groupStudentId.length && reportType) {
      setIsShowReport(true);
    } else {
      setSelectionError(true);
    }
  };

  let updatedStudentsList = [...studentList];
  if (selectedClassId) {
    updatedStudentsList = studentList.filter(student => student.class_code === selectedClassId);
  }
  const selectAllStudent = event => {
    if (event.target.checked) {
      setGroupStudentId(updatedStudentsList.map(user => user.id));
    } else {
      setGroupStudentId([]);
    }
    setIsSelectAllStudents(event.target.checked);
  };

  return (
    <>
      <section className="students-report-layout">
        <div
          className={
            isOpenPopup
              ? "custom-popup open students-report-popup ease-in-popup"
              : "custom-popup  students-report-popup ease-in-popup"
          }
        >
          <div className="popup">
            <div className="students-report-header">
              <img src={logoImg} className="report-logo md" alt="Math Fact Lab" key="logo-small" />

              <span className="close-text" onClick={() => props.closePopup(false)}>
                X Close
              </span>
            </div>
            <div className="students-report-popup-header-text">
              Report Generator <span className="beta-text">(Beta) </span>
            </div>
            <div className="students-report-popup-content">
              <div className="students-report">
                <div className="students-report-left">
                  <Space direction="vertical">
                    <div className="step-1-2">
                      <div className="students-report-text">1. Select Type of Report</div>
                      <div className="radio-grp-container">
                        <Radio.Group onChange={onChangeSelectReportType} value={reportType}>
                          <Radio value={"individual"}>
                            <img
                              src={IndividualReportImg}
                              alt="individual-report-icon"
                              onClick={() => {
                                setImageVisible(true);
                                setSelectedImageSrc(IndividualReportFullImg);
                              }}
                              style={{
                                width: 120
                              }}
                            />

                            <span className="students-report-sub-text">Individual Report</span>
                          </Radio>

                          <br />

                          <Radio value={"group"}>
                            <img
                              src={GroupReportImg}
                              alt="group-report-icon"
                              onClick={() => {
                                setImageVisible(true);
                                setSelectedImageSrc(GroupReportFullImg);
                              }}
                              style={{
                                width: 120
                              }}
                            />
                            <span className="students-report-sub-text">Group Report</span>
                          </Radio>
                        </Radio.Group>
                      </div>
                      {selectionError && !reportType && <div className="error-text">Please Select Type of Report</div>}
                    </div>
                    <div className="step-1-2">
                      <div className="students-report-text">2. Select Dates</div>
                      <div className="radio-grp-container">
                        <Radio.Group onChange={onChangeSelectDate} value={dateType}>
                          <Radio value={"Today"} onClick={e => handleChangeToDate(e, "", "Initial")}>
                            <span className="students-report-sub-text">Today</span>
                          </Radio>
                          <br />
                          <Radio value={"Yesterday"} onClick={e => handleChangeToDate(e, "", "Yesterday")}>
                            <span className="students-report-sub-text">Yesterday</span>
                          </Radio>
                          <br />
                          <Radio value={"Last 7 days"} onClick={e => handleChangeToDate(e, "", "Last 7 days")}>
                            <span className="students-report-sub-text">Last 7 days</span>
                          </Radio>
                          <br />
                          <Radio value={"Last 30 days"} onClick={e => handleChangeToDate(e, "", "Last 30 days")}>
                            <span className="students-report-sub-text">Last 30 days</span>
                          </Radio>
                          <br />
                          <Radio value={"Since Initial"} onClick={e => handleChangeToDate(e, "", "Since Initial")}>
                            <span className="students-report-sub-text">Since Initial</span>
                          </Radio>
                          <br />
                          <Radio value={"Custom"} onClick={e => handleChangeToDate(e, "", "Custom")}>
                            <span className="students-report-sub-text">Custom</span>
                          </Radio>
                          <div className={dateType !== "Custom" ? "disable-datePicker" : "datePicker"}>
                            <span className="from-date-text"> From Date - </span>
                            {"  "}
                            <DatePicker
                              size={"middle"}
                              onChange={date => {
                                handleChangeToDate(menuItemEvent, date, "Custom", "From Date");
                                menuItemEvent.domEvent.stopPropagation();
                                menuItemEvent.domEvent.isPropagationStopped();
                              }}
                              onClick={e => {
                                handleAssignEvent(e);
                                setFromDateVisibleVisible(true);
                                e.stopPropagation();
                              }}
                              open={fromDateVisible}
                              format={"YYYY-MM-DD"}
                              disabled={dateType !== "Custom"}
                              value={fromDate ? moment(fromDate, "YYYY-MM-DD") : undefined}
                              disabledDate={current => {
                                return toDate && current && moment(current).format("YYYY-MM-DD") > toDate;
                              }}
                            />
                            {"  "}
                            <span className="from-date-text"> To Date - {"  "}</span>
                            <DatePicker
                              size={"middle"}
                              onChange={date => {
                                handleChangeToDate(menuItemEvent, date, "Custom", "To Date");
                                menuItemEvent.domEvent.stopPropagation();
                                menuItemEvent.domEvent.isPropagationStopped();
                              }}
                              onClick={e => {
                                handleAssignEvent(e);
                                setToDateVisible(true);
                                e.stopPropagation();
                              }}
                              open={toDateVisible}
                              format={"YYYY-MM-DD"}
                              disabled={dateType !== "Custom" || !fromDate}
                              value={toDate ? moment(toDate, "YYYY-MM-DD") : undefined}
                              disabledDate={current => {
                                return fromDate && current && moment(current).format("YYYY-MM-DD") < fromDate;
                              }}
                            />
                          </div>
                        </Radio.Group>
                      </div>
                      {selectionError && !dateType && <div className="error-text">Please Select Date Range</div>}
                    </div>

                    <div className="student-selection">
                      <div className="students-report-right-text">3. Select Students</div>
                      <div className="step-3-select">
                        <Select
                          name="learningMode"
                          className="form-control"
                          value={selectedClassId}
                          options={classCodeListOption}
                          onChange={handleChangeClassCode}
                          style={{ width: 260 }}
                        >
                          {classCodeListOption}
                        </Select>

                        {userDetails.role_id === userRole.SCHOOL_ADMIN.role_id ? (
                          <Select
                            name="schoolCode"
                            className="form-control ml20"
                            value={selectedSchoolCode}
                            options={schoolListOption}
                            onChange={handleChangeSchool}
                            style={{ width: 260 }}
                          >
                            {schoolListOption}
                          </Select>
                        ) : (
                          ""
                        )}

                        <div className="select-all">
                          <Checkbox onChange={selectAllStudent} checked={isSelectAllStudents} /> All Students (
                          {updatedStudentsList.length})
                        </div>
                      </div>
                      <div className="students-list">
                        {updatedStudentsList.length ? (
                          updatedStudentsList.map((user, i) => {
                            return (
                              <div key={i}>
                                <Checkbox
                                  onChange={() => handleSelectStudent(user.id)}
                                  checked={groupStudentId.includes(user.id)}
                                />
                                <span style={{ marginLeft: "10px" }}>
                                  {user.profile.last_name}
                                  {", "}
                                  {user.profile.first_name}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <div>There is no any student.</div>
                        )}
                      </div>
                      {selectionError && !groupStudentId.length && (
                        <div className="error-text">Please Select students as per your report type</div>
                      )}{" "}
                    </div>
                  </Space>
                </div>
              </div>
            </div>

            <div className="footer">
              <div className="generate-btn">
                <Button className="btn btn-primary" type="primary" onClick={handleGenerateReport}>
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={isOpenPopup ? "twoLayout-popup-backface open" : "twoLayout-popup-backface "}></div>
        <ImageViewer
          onClose={() => {
            setImageVisible(false);
            setSelectedImageSrc("");
          }}
          visible={isImageVisible}
          imageSrc={selectedImageSrc}
        />
      </section>

      {isShowReport && reportType === "individual" ? (
        <IndividualReport
          visible={isShowReport}
          handleCloseReport={setIsShowReport}
          students={groupStudentId}
          fromDate={fromDate}
          toDate={toDate}
          studentList={updatedStudentsList}
        />
      ) : (
        ""
      )}
      {isShowReport && reportType === "group" ? (
        <GroupReport
          visible={isShowReport}
          handleCloseReport={setIsShowReport}
          users={groupStudentId}
          fromDate={fromDate}
          toDate={toDate}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default StudentsReport;
