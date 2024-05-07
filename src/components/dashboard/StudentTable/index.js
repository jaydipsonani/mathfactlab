import React, { useEffect, useState, useRef } from "react";
import { userRole } from "config/const";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
import {
  Table,
  Dropdown,
  Menu,
  Tag,
  Tooltip,
  Switch,
  Button,
  Popover,
  Typography,
  Radio,
  DatePicker,
  Space
} from "antd";
import moment from "moment";
import QRcode from "react-qr-code";
import Section from "components/common/Section";
import Container from "components/common/Container";
import CounterResetConfirmationDialog from "components/student/CounterResetConfirmationDialog";
import TeacherWelcomeSteps from "components/dashboard/TeacherWelcomeSteps";
import TeacherWelcomeSteps2 from "components/dashboard/TeacherWelcomeSteps2";
import PasswordSwitch from "components/dashboard/PasswordSwitch";
import StudentStatus from "components/dashboard/StudentStatusPopup";
import StudentDetails from "components/dashboard/StudentDetailsPopup";
import { editStudent, editMultipleStudents, getUsersList } from "../../../redux/actions";
import {
  UserAddOutlined,
  PlusOutlined,
  DownOutlined,
  MoreOutlined,
  UsergroupAddOutlined,
  EditOutlined,
  DeleteOutlined,
  BarChartOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  UnlockOutlined,
  SettingOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import _ from "lodash";
import DownloadCSV from "components/common/GenerateCSV";
import ImportStudentListPopup from "components/dashboard/ImportStudentsListPopup";
import ClassCodeDialog from "components/dashboard/ClassCodeDialog";
import ErrorBoundary from "components/common/ErrorBoundary";
import { mulSubLevelList, addSubLevelList, studentTableColumnOptions } from "config/const";
import parentLetter from "assets/xls/Parent-Letter.pdf";
import logo from "assets/images/logo.svg";
import statusGreen from "assets/images/progress-green.png";
import statusRed from "assets/images/progress-red.png";
import statusYellow from "assets/images/progress-yellow.png";
import statusGray from "assets/images/progress-gray.png";
import pdfUserSection from "assets/images/letter-pdf-login.png";
// import "assets/sass/components/button-ant.scss";

const { Title } = Typography;

// moment fromnow text changes
moment.updateLocale("en", {
  relativeTime: {
    s: "Seconds"
  }
});

const StudentTable = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    studentUserList

    // handlePage,
    // handlePageSize,
    // currentPage,
  } = props;

  const {
    fetchingAllUserListLoading
    // totalStudents
  } = useSelector(({ user }) => user);
  const { classCodeList } = useSelector(({ classCode }) => classCode);

  const query = new URLSearchParams(location.search);
  const teacherClassCode = +query.get("class_code");
  const isShowWelcomePopup = query.get("is_show_student_welcome_popup") === "true";

  const { searchClassCode: selectedClassCode } = useSelector(({ header }) => header);

  const selectedClass = classCodeList.find(
    classObj => classObj.class_code === selectedClassCode || classObj.class_code === teacherClassCode + ""
  );

  const {
    userDetails,
    userDetails: { role_id }
  } = useSelector(({ auth }) => auth);

  const { isSelectedStudentIDReset, showProgressTable } = props;

  const [open, setOpen] = useState(false);

  const handleOpenChange = newOpen => {
    setOpen(newOpen);
  };

  // let studentList = studentUserList?.map((student) => {
  //   return {
  //     ...student,
  //     key: student.id,
  //     dataIndex: student.id,
  //   };
  // });
  let studentList = studentUserList?.map(student => {
    // update status field here to filter

    let status;
    let status2;
    let finalStatus = statusGray;

    if (userDetails.role_id === userRole.TEACHER.role_id) {
      const {
        status_stats: { completed_sessions_without_level_up_count, level_lifter_failed_count },
        profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id }
      } = student;
      const levelLifterFailedCount = level_lifter_failed_count;

      const completedSessionsWithoutLevelUpCount = completed_sessions_without_level_up_count;

      const sscLevelLifterCountRange = userDetails?.profile.ssc_level_lifter_count_range;
      const sscCompletedSessionsWithoutLevelUpRange =
        userDetails?.profile.ssc_completed_sessions_without_level_up_range;

      const studentActiveLevel = student_learning_mode_id === 1 ? add_sub_level_id : mul_div_level_id;

      const [minLevelLifter, maxLevelLifter] = sscLevelLifterCountRange?.split(":").map(Number);

      const [minCompletedWithoutLevelUp, maxCompletedWithoutLevelUp] = sscCompletedSessionsWithoutLevelUpRange
        .split(":")
        .map(Number);
      if (studentActiveLevel) {
        if (levelLifterFailedCount <= minLevelLifter) {
          status = "green";
        } else if (levelLifterFailedCount > minLevelLifter && levelLifterFailedCount < maxLevelLifter) {
          status = "yellow";
        } else if (levelLifterFailedCount >= maxLevelLifter) {
          status = "red";
        }

        if (completedSessionsWithoutLevelUpCount <= minCompletedWithoutLevelUp) {
          status2 = "green";
        } else if (
          completedSessionsWithoutLevelUpCount > minCompletedWithoutLevelUp &&
          completedSessionsWithoutLevelUpCount < maxCompletedWithoutLevelUp
        ) {
          status2 = "yellow";
        } else if (completedSessionsWithoutLevelUpCount >= maxCompletedWithoutLevelUp) {
          status2 = "red";
        }

        if (status === "green" && status2 === "green") {
          finalStatus = "green";
        } else if (status === "red" && status2 === "red") {
          finalStatus = "red";
        } else if (status === "yellow" && status2 === "yellow") {
          finalStatus = "yellow";
        } else if ((status === "red" && status2 !== "red") || (status !== "red" && status2 === "red")) {
          finalStatus = "red";
        } else if ((status === "yellow" && status2 !== "yellow") || (status !== "yellow" && status2 === "yellow")) {
          finalStatus = "yellow";
        } else {
          finalStatus = "gray";
        }
      }
    }

    return {
      ...student,
      key: student.id,
      dataIndex: student.id,
      status: finalStatus
    };
  });

  const [width, height] = useWindowSize();
  // studentList = studentList.map(user => {
  //   return {
  //     ...user,
  //     add_sub_level_id: user.profile.add_sub_level_id,
  //     mul_div_level_id: user.profile.mul_div_level_id,
  //   };
  // });

  const handStudentReport = activeUser => {
    props.showStudentReportDailog(activeUser);
  };

  const statusControllerHandler = e => {
    e.stopPropagation();
    props.showSettingDialog();
  };

  const handleLevelLifterInterview = activeUser => {
    sessionStorage.setItem("student_name", `${activeUser.profile.first_name} ${activeUser.profile.last_name}`);
    sessionStorage.setItem("student_learning_mode", activeUser.profile.student_learning_mode_id);

    sessionStorage.setItem(
      "student_level",
      activeUser.profile.student_learning_mode_id === 2
        ? activeUser.profile.mul_div_level_id
        : activeUser.profile.add_sub_level_id
    );

    sessionStorage.setItem("student_user_id", activeUser.id);
    localStorage.setItem("interview_student_user", JSON.stringify(activeUser));

    navigate(`/teacher/level-lifter-interview?user_id=${activeUser.id}`);
  };

  const handleResetStudentLevelConfirmation = row => {
    props.showResetStudentDailog(row);
  };

  const handleStudentLevelLifterLock = record => {
    const body = {
      profile: {
        is_level_lifter_lock: 1 - record.profile.is_level_lifter_lock
      }
    };

    dispatch(editStudent(body, record));
  };

  const handleEditStudent = record => {
    props.showEditStudentDailog(record);
  };

  const handleDeleteStudent = activeUser => {
    props.showDeleteStudentDailog(activeUser);
  };

  const handleShowSessionDetailsDailog = row => {
    props.showSessionDetailsDailog(row);
  };
  const handleShowLevelLifterReportDailog = (row, learning_mode) => {
    props.showLevelLifterReportDailog(row, learning_mode);
  };

  const handleShowProgressTable = (row, learning_mode) => {
    showProgressTable(row, learning_mode);
  };

  let allStudentIDList = studentList.map(student => student.id);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // const [selectedLevelLearningMode, setSelectedLevelLearningMode] = useState(1);
  // const [isVisibleFilterMenu, setVisibleFilterMenu] = useState(false);
  const [isShowCustomDateMenu, setIsShowCustomDateMenu] = useState(false);
  const [isShowMulDivCustomDateMenu, setIsShowMulDivCustomDateMenu] = useState(false);
  const [isShowImportStudentPopup, setIsShowImportStudentPopup] = useState(false);
  const [isShowClassCodeDialog, setIsShowClassCodeDialog] = useState(false);

  const [addSubDate, setAddSubDate] = useState("");

  const [mulDivDate, setMulDivDate] = useState("");

  const [selectedAddSubMode, setSelectedAddSubMode] = useState("Initial");

  const [selectedMulDivMode, setSelectedMulDivMode] = useState("Initial");

  const [selectedAddSubDateKey, setSelectedAddSubDateKey] = useState("1");
  const [selectedMulDivDateKey, setSelectedMulDivDateKey] = useState("1");
  const [menuItemEvent, setMenuItemEvent] = useState(null);
  const [isOpenWelcomeStepPopup, setOpenWelcomeStepPopup] = useState(false);
  const [OpenWelcomeStepPopup, setIsOpenWelcomeStepPopup] = useState(false);
  useEffect(() => {
    if (
      userDetails.role_id === userRole.TEACHER.role_id &&
      !userDetails.school_district_id &&
      userDetails.login_count <= 1 &&
      localStorage.getItem("is_show_student_step_popup") !== "true"
    ) {
      setOpenWelcomeStepPopup(true);
    }
  }, []); // eslint-disable-line

  const handleCloseStudentBulkCreatePopup = () => {
    setOpenWelcomeStepPopup(false);
  };

  const handleCloseStudentPopup = () => {
    setIsOpenWelcomeStepPopup(false);
  };

  const [visible, setVisible] = useState(false);

  const [modeType, setModeType] = useState(localStorage.getItem("current-mode") || "performance");

  const [isShowAllPassword, setIsShowAllPassword] = useState(false);

  const [checkedColumnList, setCheckedColumns] = useState(
    studentTableColumnOptions[modeType]
      .filter(option =>
        option.id === "status"
          ? userRole.TEACHER.role_id && +userDetails.profile.is_school_user === 0
          : option.defaultChecked
      )
      .map(column => column.id)
  );

  // useEffect(() => {
  //   localStorage.getItem(modeType)
  //     ? setCheckedColumns(
  //         studentTableColumnOptions[modeType]
  //           .filter(option =>
  //             JSON.parse(localStorage.getItem(modeType).includes(option.id)),
  //           )
  //           .map(column => column.id),
  //       )
  //     : setCheckedColumns(
  //         studentTableColumnOptions[modeType]
  //           .filter(option => option.defaultChecked)
  //           .map(column => column.id),
  //       );
  // }, [modeType]);

  useEffect(() => {}, [modeType]);
  const [isShowResetCounterConfirmationPopup, setIsShowResetCounterConfirmationPopup] = useState(false);

  useEffect(() => {
    if (isShowWelcomePopup) {
      setOpenWelcomeStepPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  //Default set last name ascend order
  const [sortedInfo, setSortedInfo] = useState({
    column: {
      title: "Last Name",

      // dataIndex: "name1",
      // key: "name1",
      dataIndex: "last_name",
      key: "last_name",

      align: "center",
      showSorterTooltip: false
    },

    // columnKey: "name1",
    // field: "name1",
    columnKey: "last_name",
    field: "last_name",
    order: "ascend"
  });
  // const [sortedInfo, setSortedInfo] = useState({});
  const handleChangeTable = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const hasSelected = selectedRowKeys.length > 0;

  // const [filterColumn, setFilterColumn] = useState([]);

  //reset selected row id after edit
  useEffect(() => {
    setSelectedRowKeys([]);
  }, [isSelectedStudentIDReset]);

  const sortingLevel = (a, b, orderBy) => {
    const updated_a =
      b.profile[orderBy] === null || b.profile[orderBy] === "null" || b.profile[orderBy] === ""
        ? -1
        : +b.profile[orderBy];
    const updated_b =
      a.profile[orderBy] === null || a.profile[orderBy] === "null" || a.profile[orderBy] === ""
        ? -1
        : +a.profile[orderBy];

    if (updated_b < updated_a) {
      return -1;
    }
    if (updated_b > updated_a) {
      return 1;
    }
    return 0;
  };
  const sortingStatus = (a, b, orderBy) => {
    const valueByColor = {
      green: 1,
      yellow: 2,
      red: 3,
      gray: 0
    };

    const updated_a = valueByColor[b.profile[orderBy]];

    const updated_b = valueByColor[a.profile[orderBy]];

    if (updated_b < updated_a) {
      return -1;
    }
    if (updated_b > updated_a) {
      return 1;
    }
    return 0;
  };

  // const handleShowCounterResetConfirmationPopup = (e, mode) => {
  //   setIsShowResetCounterConfirmationPopup(true);
  //   setSelectedLevelLearningMode(mode);
  //   e.stopPropagation();
  // };

  const handleCloseCounterResetConfirmationPopup = () => {
    setIsShowResetCounterConfirmationPopup(false);
  };

  const handleChangeDisabledStrategy = record => {
    const updatedStrategyList =
      record.profile.disable_strategies_slug && record.profile.disable_strategies_slug.includes("fingers-trick")
        ? "dice-9=10-1"
        : "fingers-trick";

    const body = {
      profile: {
        disable_strategies_slug: updatedStrategyList
      }
    };

    dispatch(editStudent(body, record));
  };

  const classCodesList = classCodeList.map(classDetails => classDetails.class_code);

  const handleChangeDateAddSub = async (e, selectedDate, selectedCase, c, d) => {
    e.domEvent.stopPropagation();

    e.domEvent.isPropagationStopped();
    let selectedDates;
    let selectedMode;

    switch (selectedCase) {
      case "Yesterday":
        selectedDates = moment().subtract(1, "days").format("MM-DD-YYYY");
        setSelectedAddSubDateKey("2");
        selectedMode = "Yesterday";
        break;
      case "1 week ago":
        selectedDates = moment().subtract(7, "d").format("MM-DD-YYYY");
        setSelectedAddSubDateKey("3");
        selectedMode = "1 week ago";
        break;
      case "2 week ago":
        selectedDates = moment().subtract(14, "d").format("MM-DD-YYYY");
        setSelectedAddSubDateKey("4");
        selectedMode = "2 weeks ago";
        break;
      case "1 month ago":
        selectedDates = moment().subtract(30, "d").format("MM-DD-YYYY");
        setSelectedAddSubDateKey("5");
        selectedMode = "1 month ago";
        break;
      case "Custom":
        selectedDates = selectedDate
          ? selectedDate.format("MM-DD-YYYY")
          : moment(userDetails.profile.created_at).format("MM-DD-YYYY");
        setSelectedAddSubDateKey("6");
        selectedMode = "";
        break;
      default:
        // selectedDates = moment(userDetails.profile.created_at).format(
        //   "MM-DD-YYYY",
        // );
        selectedDates = "";
        setSelectedAddSubDateKey("1");
        selectedMode = "Initial";
      // code block
    }

    let addSubStartDate = addSubDate;
    addSubStartDate = selectedDates;

    setAddSubDate(selectedDates);
    setSelectedAddSubMode(selectedMode);
    setVisible(false);
    setIsShowCustomDateMenu(false);
    setIsShowMulDivCustomDateMenu(false);

    dispatch(
      getUsersList(
        classCodesList,
        addSubStartDate ? moment(addSubStartDate).format("YYYY-MM-DD") : "",
        mulDivDate ? moment(mulDivDate).format("YYYY-MM-DD") : ""
      )
    );
  };

  const handleChangeDateMulDiv = async (e, selectedDate, selectedCase, c, d) => {
    e.domEvent.stopPropagation();

    e.domEvent.isPropagationStopped();
    let selectedDates;
    let selectedMode;

    switch (selectedCase) {
      case "Yesterday":
        selectedDates = moment().subtract(1, "days").format("MM-DD-YYYY");
        setSelectedMulDivDateKey("2");
        selectedMode = "Yesterday";
        break;
      case "1 week ago":
        selectedDates = moment().subtract(7, "d").format("MM-DD-YYYY");
        setSelectedMulDivDateKey("3");
        selectedMode = "1 week ago";
        break;
      case "2 week ago":
        selectedDates = moment().subtract(14, "d").format("MM-DD-YYYY");
        setSelectedMulDivDateKey("4");
        selectedMode = "2 weeks ago";
        break;
      case "1 month ago":
        selectedDates = moment().subtract(30, "d").format("MM-DD-YYYY");
        setSelectedMulDivDateKey("5");
        selectedMode = "1 month ago";
        break;
      case "Custom":
        selectedDates = selectedDate
          ? selectedDate.format("MM-DD-YYYY")
          : moment(userDetails.profile.created_at).format("MM-DD-YYYY");
        setSelectedMulDivDateKey("6");
        selectedMode = "";
        break;
      default:
        // selectedDates = moment(userDetails.profile.created_at).format(
        //   "MM-DD-YYYY",
        // );
        selectedDates = "";
        setSelectedMulDivDateKey("1");
        selectedMode = "Initial";
      // code block
    }

    let mulDivStartDate = mulDivDate;

    mulDivStartDate = selectedDates;
    setMulDivDate(selectedDates);

    setSelectedMulDivMode(selectedMode);

    setVisible(false);
    setIsShowCustomDateMenu(false);
    setIsShowMulDivCustomDateMenu(false);

    dispatch(
      getUsersList(
        classCodesList,
        addSubDate ? moment(addSubDate).format("YYYY-MM-DD") : "",
        mulDivStartDate ? moment(mulDivStartDate).format("YYYY-MM-DD") : ""
      )
    );
  };
  const handleShowAddSubCustomDateMenu = e => {
    e.stopPropagation();
    setIsShowCustomDateMenu(!isShowCustomDateMenu);
    setIsShowMulDivCustomDateMenu(false);
  };
  const handleShowMulDivCustomDateMenu = e => {
    e.stopPropagation();
    setIsShowCustomDateMenu(false);
    setIsShowMulDivCustomDateMenu(!isShowMulDivCustomDateMenu);
  };

  const handleAssignEvent = e => {
    setMenuItemEvent((e.domEvent = e));
  };

  const handlePassword = () => {
    setIsShowAllPassword(!isShowAllPassword);
  };

  const handleSuccessStartAssignment = () => {
    setSelectedRowKeys([]);
  };
  const handleStartAssignment = () => {
    const body = {
      studentUserIds: selectedRowKeys,

      updates: {
        profile: {
          is_assignment_on: 1
        },
        current_assignment_stats: {
          activities_count: 0,
          completed_sessions_count: 0,
          passed_level_lifter_count: 0,
          sessions_count: 0
        }
      }
    };

    dispatch(
      editMultipleStudents(body, handleSuccessStartAssignment, "Assignment count will begin when students next log in.")
    );
  };

  const handleCloseAssignment = () => {
    props.showCloseAssignmentDailog();
  };

  const addDivDateSelectionMenu = (
    <Menu selectedKeys={selectedAddSubDateKey} style={{ borderRight: 0 }}>
      <Menu.Item key="1" onClick={e => handleChangeDateAddSub(e, "", "Initial")}>
        Initial
      </Menu.Item>
      <Menu.Item key="2" onClick={e => handleChangeDateAddSub(e, "", "Yesterday")}>
        Yesterday
      </Menu.Item>
      <Menu.Item key="3" onClick={e => handleChangeDateAddSub(e, "", "1 week ago")}>
        1 week ago
      </Menu.Item>
      <Menu.Item key="4" onClick={e => handleChangeDateAddSub(e, "", "2 week ago")}>
        2 weeks ago
      </Menu.Item>
      <Menu.Item key="5" onClick={e => handleChangeDateAddSub(e, "", "1 month ago")}>
        1 month ago
      </Menu.Item>

      <Menu.Item
        key="6"
        onClick={e => {
          e.domEvent.stopPropagation();
          e.domEvent.isPropagationStopped();
        }}
      >
        {/* Custom <CalendarOutlined className="ml-5" />{" "} */}
        <DatePicker
          // getPopupContainer={trigger => trigger.parentNode}
          size={"small"}
          onChange={date => {
            handleChangeDateAddSub(menuItemEvent, date, "Custom");
            menuItemEvent.domEvent.stopPropagation();
            menuItemEvent.domEvent.isPropagationStopped();
          }}
          onClick={e => {
            handleAssignEvent(e);
            setVisible(true);
            e.stopPropagation();
          }}
          open={visible}
          format={"MM-DD-YYYY"}
        />

        {/* <Popover
          trigger="click"
          placement="right"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          content={
            <div style={{ width: 300 }}>
              <Calendar
                fullscreen={false}
                onSelect={date => handleChangeDateAddSub(date, "Custom")}
              />
            </div>
          }
        >
          Custom <CalendarOutlined className="ml-10" />
        </Popover> */}
        {/* <DatePicker
          format={"DD-MM-YYYY"}
          onChange={onChange}
          placeholder={"Custom"}
          bordered={false}
        /> */}
      </Menu.Item>
    </Menu>
  );

  const MulDivDateSelectionMenu = (
    <Menu selectedKeys={selectedMulDivDateKey} style={{ borderRight: 0 }}>
      <Menu.Item key="1" onClick={e => handleChangeDateMulDiv(e, "", "Initial")}>
        Initial
      </Menu.Item>
      <Menu.Item key="2" onClick={e => handleChangeDateMulDiv(e, "", "Yesterday")}>
        Yesterday
      </Menu.Item>
      <Menu.Item key="3" onClick={e => handleChangeDateMulDiv(e, "", "1 week ago")}>
        1 week ago
      </Menu.Item>
      <Menu.Item key="4" onClick={e => handleChangeDateMulDiv(e, "", "2 week ago")}>
        2 weeks ago
      </Menu.Item>
      <Menu.Item key="5" onClick={e => handleChangeDateMulDiv(e, "", "1 month ago")}>
        1 month ago
      </Menu.Item>

      <Menu.Item
        key="6"
        onClick={e => {
          e.domEvent.stopPropagation();
          e.domEvent.isPropagationStopped();
        }}
      >
        {/* Custom <CalendarOutlined className="ml-5" />{" "} */}
        <DatePicker
          // getPopupContainer={trigger => trigger.parentNode}
          size={"small"}
          onChange={date => {
            handleChangeDateMulDiv(menuItemEvent, date, "Custom");
            menuItemEvent.domEvent.stopPropagation();
            menuItemEvent.domEvent.isPropagationStopped();
          }}
          onClick={e => {
            handleAssignEvent(e);
            setVisible(true);
            e.stopPropagation();
          }}
          open={visible}
          format={"MM-DD-YYYY"}
        />

        {/* <Popover
          trigger="click"
          placement="right"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          content={
            <div style={{ width: 300 }}>
              <Calendar
                fullscreen={false}
                onSelect={date => handleChangeDateAddSub(date, "Custom")}
              />
            </div>
          }
        >
          Custom <CalendarOutlined className="ml-10" />
        </Popover> */}
        {/* <DatePicker
          format={"DD-MM-YYYY"}
          onChange={onChange}
          placeholder={"Custom"}
          bordered={false}
        /> */}
      </Menu.Item>
    </Menu>
  );

  const columns = [
    // {
    //   title: "",
    //   dataIndex: "selection",
    //   width: 30 // Set the width of the checkbox column
    // },
    // {
    //   title: "",
    //   dataIndex: "is_google_class",
    //   key: "is_google_class",
    //   align: "center",
    //   render(text, record) {
    //     return {
    //       children: (
    //         <div>
    //           {!!record.profile.is_imported_from_google && (
    //             <imgimport Header from './../DashboardLayout/Header/index';

    //               src={googleIcon}
    //               alt="google-icon"
    //               className={classes.googleIcon}
    //             />
    //           )}
    //         </div>
    //       ),
    //     };
    //   },
    // },

    {
      title: "Mode View",
      dataIndex: "mode_view",
      key: "mode_view",
      align: "center",
      // filters: _.uniq(
      //   _.map(studentList, "profile.student_learning_mode_id"),
      // ).map(code => {
      //   return { text: code, value: code };
      // }),
      showSorterTooltip: false,
      filteredValue: filteredInfo.mode_view || null,
      onFilter: (value, record) => record.profile.student_learning_mode_id === +value,
      sorter: (a, b) => (+a.profile.student_learning_mode_id > +b.profile.student_learning_mode_id ? -1 : 1),
      sortOrder: sortedInfo.columnKey === "mode_view" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <div style={{ letterSpacing: 1 }}>{record.profile.student_learning_mode_id === 1 ? "+/-" : "x/÷"}</div>
          )
        };
      },
      // width: 124,
      width: 124
    },
    {
      title: "Name",
      dataIndex: "name1",
      key: "name1",
      align: "left",
      width: 200,
      showSorterTooltip: false,
      sorter: (a, b) => a.profile.last_name.localeCompare(b.profile.last_name),
      sortOrder: sortedInfo.columnKey === "name1" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <Popover content={<StudentDetails user={record} />} title={false} trigger="click">
              <div style={{ cursor: "pointer", textDecoration: "underline" }}>
                <strong>{[record.profile.last_name, record.profile.first_name].filter(Boolean).join(", ")}</strong>
              </div>
            </Popover>
          )
        };
      }
      // width: width > 1300 ? undefined : 200,
    },
    userDetails?.role_id === userRole.TEACHER.role_id && {
      title: (
        <div className="flex align-items-center justify-content-center" style={{ justifyContent: "space-around" }}>
          <span className="joyride-4">Status</span>
          <SettingOutlined onClick={e => statusControllerHandler(e)} />
        </div>
      ),

      dataIndex: "status",
      key: "status",
      align: "center",
      showSorterTooltip: false,
      sorter: (a, b) => sortingStatus(a, b, "status"),
      sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,

      render(text, record) {
        let status;
        switch (record.profile.status) {
          case "red":
            status = statusRed;
            break;
          case "green":
            status = statusGreen;
            break;
          case "yellow":
            status = statusYellow;
            break;
          default:
            status = statusGray;
            break;
        }

        return {
          children: (
            <>
              {record.profile.status === "gray" ? (
                <Tooltip
                  overlayClassName="ant-tooltip-reset-counter"
                  title="Status light functionality begins 14 days after a student takes their initial placement test. "
                >
                  <img
                    src={status}
                    alt="status"
                    style={{
                      width: "20px",
                      height: "20px",
                      filter: "grayscale(100%)"
                    }}
                  />
                </Tooltip>
              ) : (
                <Popover
                  content={<StudentStatus user={record} open={open} />}
                  title={false}
                  trigger="click"
                  onOpenChange={handleOpenChange}
                >
                  <div>
                    <img
                      src={status}
                      alt="status"
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                  </div>
                </Popover>
              )}
            </>
          )
        };
      },
      width: width > 1300 ? undefined : 180
    },
    // Previous - current Add/Sub column
    {
      title: (
        <div className="flex align-items-center justify-content-center">
          {/* Initial Level */}
          {/* visible={isShowCustomDateMenu} */}
          {/* trigger="click" */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Popover
              content={addDivDateSelectionMenu}
              // trigger="click"
              overlayInnerStyle={{ padding: "12px" }}
            >
              <CalendarOutlined
                style={{ fontSize: "16px", padding: "4px 6px" }}
                // className="ml-10"

                onClick={e => handleShowAddSubCustomDateMenu(e)}
              />
            </Popover>
            <span
              style={{
                color: "#2dca89",
                fontSize: "8px",
                opacity: addSubDate || selectedAddSubMode === "Initial" ? 1 : 0
              }}
              onClick={e => e.stopPropagation()}
            >
              {" "}
              {selectedAddSubMode ? selectedAddSubMode : addSubDate ? addSubDate : "perviousDate"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginLeft: "24px"
            }}
          >
            <i
              style={{ fontSize: "16px", minWidth: "44px", padding: "4px" }}
              className="icon-add-sub"
              aria-hidden="true"
            ></i>
            <span
              style={{
                color: "#2dca89",
                fontSize: "8px"
              }}
            >
              Current
            </span>
          </div>

          {/* <DatePicker format={"DD-MM-YYYY"} onChange={onChange} /> */}
        </div>
      ),
      dataIndex: "previous_add_sub_level_id",
      key: "previous_add_sub_level_id",
      align: "center",
      showSorterTooltip: false,
      className: "pervious_level_column_wrapper",
      sorter: (a, b) => sortingLevel(a, b, "add_sub_level_id"),
      sortOrder: sortedInfo.columnKey === "previous_add_sub_level_id" && sortedInfo.order,
      render(text, record) {
        const currentLevelListByLearningMode =
          record.profile.student_learning_mode_id === 1 ? addSubLevelList : mulSubLevelList;
        const islevelLifter = !!record.profile.is_add_sub_level_lifter;
        return {
          children: (
            <div className="flex align-items-center justify-content-center">
              <div style={{ minWidth: "44px" }}>
                {!currentLevelListByLearningMode[record.profile.previous_add_sub_level_id] ? (
                  <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                    -
                  </button>
                ) : currentLevelListByLearningMode[record.profile.previous_add_sub_level_id].sort === "-" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-warm-up" aria-hidden="true"></i>
                  </button>
                ) : currentLevelListByLearningMode[record.profile.previous_add_sub_level_id].sort === "GR" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-graduation-cap" aria-hidden="true"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-icon-trans "
                    style={{
                      fontWeight: 600
                    }}
                  >
                    {currentLevelListByLearningMode[record.profile.previous_add_sub_level_id].sort}
                  </button>
                )}
              </div>

              <ArrowRightOutlined className="ml-10 mr-10" style={{ fontSize: "12px" }} />

              {record.profile.student_learning_mode_id === 1 ? (
                <Tag
                  style={{
                    background: "#e0f7ed",
                    color: "#2dcc89",
                    minWidth: "44px"
                  }}
                  key={"add_sub_level_id"}
                  className="border-none button-secondary-light mr-0"
                >
                  <div
                    onClick={() =>
                      record.profile.add_sub_level_id !== null &&
                      record.profile.add_sub_level_id !== "null" &&
                      record.profile.add_sub_level_id !== ""
                        ? islevelLifter
                          ? handleShowLevelLifterReportDailog(record, "1")
                          : handStudentReport({ row: record, learning_mode: 1 })
                        : ""
                    }
                    // style={{ marginLeft: "32px" }}
                  >
                    {!addSubLevelList[record.profile.add_sub_level_id] ? (
                      <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                        -
                      </button>
                    ) : addSubLevelList[record.profile.add_sub_level_id].sort === "-" ? (
                      <button type="button" className="btn-icon-trans ">
                        <i className="icon-warm-up" aria-hidden="true"></i>
                      </button>
                    ) : addSubLevelList[record.profile.add_sub_level_id].sort === "GR" ? (
                      <button type="button" className="btn-icon-trans ">
                        <i className="icon-graduation-cap" aria-hidden="true"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-icon-trans "
                        style={{
                          fontWeight: 600
                        }}
                      >
                        {addSubLevelList[record.profile.add_sub_level_id].sort}
                      </button>
                    )}
                    {/* {record.profile.add_sub_increment_count ? (
                    <>
                      <ArrowUpOutlined />{" "}
                      {record.profile.add_sub_increment_count}
                    </>
                  ) : (
                    ""
                  )} */}
                  </div>
                </Tag>
              ) : (
                <div
                  onClick={() =>
                    record.profile.add_sub_level_id !== null &&
                    record.profile.add_sub_level_id !== "null" &&
                    record.profile.add_sub_level_id !== ""
                      ? islevelLifter
                        ? handleShowLevelLifterReportDailog(record, "1")
                        : handStudentReport({ row: record, learning_mode: 1 })
                      : ""
                  }
                  style={{ minWidth: "44px" }}
                  // style={{ marginLeft: "32px" }}
                >
                  {!addSubLevelList[record.profile.add_sub_level_id] ? (
                    <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                      -
                    </button>
                  ) : addSubLevelList[record.profile.add_sub_level_id].sort === "-" ? (
                    <button type="button" className="btn-icon-trans ">
                      <i className="icon-warm-up" aria-hidden="true"></i>
                    </button>
                  ) : addSubLevelList[record.profile.add_sub_level_id].sort === "GR" ? (
                    <button type="button" className="btn-icon-trans ">
                      <i className="icon-graduation-cap" aria-hidden="true"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-icon-trans "
                      style={{
                        fontWeight: 600
                      }}
                    >
                      {addSubLevelList[record.profile.add_sub_level_id].sort}
                    </button>
                  )}
                  {/* {record.profile.add_sub_increment_count ? (
                    <>
                      <ArrowUpOutlined />{" "}
                      {record.profile.add_sub_increment_count}
                    </>
                  ) : (
                    ""
                  )} */}
                </div>
              )}
            </div>
          )
        };
      },
      width: width > 1300 ? undefined : 180
    },
    // Previous - current Mul/Div column
    {
      title: (
        <div className="flex align-items-center justify-content-center">
          {/* Initial Level */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Popover
              content={MulDivDateSelectionMenu}
              // trigger="click"
              overlayInnerStyle={{ padding: "12px" }}
              // visible={isShowMulDivCustomDateMenu}
            >
              <CalendarOutlined
                style={{ fontSize: "16px", padding: "4px 6px" }}
                // className="ml-10"
                onClick={e => handleShowMulDivCustomDateMenu(e)}
              />
            </Popover>
            <span
              style={{
                color: "#2dca89",
                fontSize: "8px",
                opacity: mulDivDate || selectedMulDivMode === "Initial" ? 1 : 0
              }}
              onClick={e => e.stopPropagation()}
            >
              {selectedMulDivMode ? selectedMulDivMode : mulDivDate ? mulDivDate : "perviousDate"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginLeft: "24px"
            }}
          >
            <i
              style={{ fontSize: "16px", minWidth: "44px", padding: "4px" }}
              className="icon-mul-div "
              aria-hidden="true"
            ></i>
            <span
              style={{
                color: "#2dca89",
                fontSize: "8px"
              }}
            >
              Current
            </span>
          </div>

          {/* <DatePicker format={"DD-MM-YYYY"} onChange={onChange} /> */}
        </div>
      ),
      dataIndex: "previous_mul_div_level_id",
      key: "previous_mul_div_level_id",
      align: "center",
      showSorterTooltip: false,
      className: "pervious_level_column_wrapper",

      sorter: (a, b) => sortingLevel(a, b, "mul_div_level_id"),
      sortOrder: sortedInfo.columnKey === "previous_mul_div_level_id" && sortedInfo.order,
      render(text, record) {
        const currentLevelListByLearningMode =
          record.profile.student_learning_mode_id === 1 ? addSubLevelList : mulSubLevelList;
        const islevelLifter = !!record.profile.is_mul_div_level_lifter;
        return {
          children: (
            <div className="flex align-items-center justify-content-center">
              <div style={{ minWidth: "44px" }}>
                {!currentLevelListByLearningMode[record.profile.previous_mul_div_level_id] ? (
                  <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                    -
                  </button>
                ) : currentLevelListByLearningMode[record.profile.previous_mul_div_level_id].sort === "-" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-warm-up" aria-hidden="true"></i>
                  </button>
                ) : currentLevelListByLearningMode[record.profile.previous_mul_div_level_id].sort === "GR" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-graduation-cap" aria-hidden="true"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-icon-trans "
                    style={{
                      fontWeight: 600
                    }}
                  >
                    {currentLevelListByLearningMode[record.profile.previous_mul_div_level_id].sort}
                  </button>
                )}
              </div>
              <ArrowRightOutlined className="ml-10 mr-10" style={{ fontSize: "12px" }} />
              {record.profile.student_learning_mode_id === 2 ? (
                <Tag
                  style={{
                    background: "#e0f7ed",
                    color: "#2dcc89",
                    minWidth: "44px"
                  }}
                  key={"add_sub_level_id"}
                  className="border-none button-secondary-light mr-0"
                >
                  <div
                    onClick={() =>
                      record.profile.mul_div_level_id !== null &&
                      record.profile.mul_div_level_id !== "null" &&
                      record.profile.mul_div_level_id !== ""
                        ? islevelLifter
                          ? handleShowLevelLifterReportDailog(record, "2")
                          : handStudentReport({ row: record, learning_mode: 2 })
                        : ""
                    }
                    // style={{ marginLeft: "32px" }}
                  >
                    {!mulSubLevelList[record.profile.mul_div_level_id] ? (
                      <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                        -
                      </button>
                    ) : mulSubLevelList[record.profile.mul_div_level_id].sort === "-" ? (
                      <button type="button" className="btn-icon-trans ">
                        <i className="icon-warm-up" aria-hidden="true"></i>
                      </button>
                    ) : mulSubLevelList[record.profile.mul_div_level_id].sort === "GR" ? (
                      <button type="button" className="btn-icon-trans ">
                        <i className="icon-graduation-cap" aria-hidden="true"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-icon-trans "
                        style={{
                          fontWeight: 600
                        }}
                      >
                        {mulSubLevelList[record.profile.mul_div_level_id].sort}
                      </button>
                    )}

                    {/* {record.profile.mul_div_increment_count ? (
                    <>
                      <ArrowUpOutlined />{" "}
                      {record.profile.mul_div_increment_count}
                    </>
                  ) : (
                    ""
                  )} */}
                  </div>
                </Tag>
              ) : (
                <div
                  onClick={() =>
                    record.profile.mul_div_level_id !== null &&
                    record.profile.mul_div_level_id !== "null" &&
                    record.profile.mul_div_level_id !== ""
                      ? islevelLifter
                        ? handleShowLevelLifterReportDailog(record, "2")
                        : handStudentReport({ row: record, learning_mode: 2 })
                      : ""
                  }
                  style={{ minWidth: "44px" }}
                  // style={{ marginLeft: "32px" }}
                >
                  {!mulSubLevelList[record.profile.mul_div_level_id] ? (
                    <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                      -
                    </button>
                  ) : mulSubLevelList[record.profile.mul_div_level_id].sort === "-" ? (
                    <button type="button" className="btn-icon-trans ">
                      <i className="icon-warm-up" aria-hidden="true"></i>
                    </button>
                  ) : mulSubLevelList[record.profile.mul_div_level_id].sort === "GR" ? (
                    <button type="button" className="btn-icon-trans ">
                      <i className="icon-graduation-cap" aria-hidden="true"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-icon-trans "
                      style={{
                        fontWeight: 600
                      }}
                    >
                      {mulSubLevelList[record.profile.mul_div_level_id].sort}
                    </button>
                  )}

                  {/* {record.profile.mul_div_increment_count ? (
                    <>
                      <ArrowUpOutlined />{" "}
                      {record.profile.mul_div_increment_count}
                    </>
                  ) : (
                    ""
                  )} */}
                </div>
              )}
            </div>
          )
        };
      },
      width: width > 1300 ? undefined : 180
    },
    {
      title: (
        <>
          <i style={{ fontSize: "24px" }} className="icon-add-sub" aria-hidden="true" />{" "}
          {/* <div>
             <Tooltip
              
              overlayClassName="ant-tooltip-reset-counter"
              title={"Reset the +/- growth counter back to 0."}
            >
              <Tag onClick={e => handleShowCounterResetConfirmationPopup(e, 1)}>
                Reset
              </Tag>{" "}
            </Tooltip> 
          </div>*/}
        </>
      ),
      align: "center",
      dataIndex: "add_sub_level_id",
      key: "add_sub_level_id",
      showSorterTooltip: true,
      render(text, record) {
        const islevelLifter = !!record.profile.is_add_sub_level_lifter;

        if (record.profile.student_learning_mode_id === 1) {
          return {
            children: (
              <Tag color="blue" key={"add_sub_level_id"} className="border-none button-secondary-light ">
                <div
                  onClick={() =>
                    record.profile.add_sub_level_id !== null &&
                    record.profile.add_sub_level_id !== "null" &&
                    record.profile.add_sub_level_id !== ""
                      ? islevelLifter
                        ? handleShowLevelLifterReportDailog(record, "1")
                        : handStudentReport({ row: record, learning_mode: 1 })
                      : ""
                  }
                >
                  {!addSubLevelList[record.profile.add_sub_level_id] ? (
                    <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                      -
                    </button>
                  ) : addSubLevelList[record.profile.add_sub_level_id].sort === "-" ? (
                    <button type="button" className="btn-icon-trans ">
                      <i className="icon-warm-up" aria-hidden="true"></i>
                    </button>
                  ) : addSubLevelList[record.profile.add_sub_level_id].sort === "GR" ? (
                    <button type="button" className="btn-icon-trans ">
                      <i className="icon-graduation-cap" aria-hidden="true"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-icon-trans "
                      style={{
                        fontWeight: 600
                      }}
                    >
                      {addSubLevelList[record.profile.add_sub_level_id].sort}
                    </button>
                  )}
                  {/* {record.profile.add_sub_increment_count ? (
                    <>
                      <ArrowUpOutlined />{" "}
                      {record.profile.add_sub_increment_count}
                    </>
                  ) : (
                    ""
                  )} */}
                </div>
              </Tag>
            )
          };
        } else {
          return {
            children: (
              <div
                onClick={() =>
                  record.profile.add_sub_level_id !== null &&
                  record.profile.add_sub_level_id !== "null" &&
                  record.profile.add_sub_level_id !== ""
                    ? islevelLifter
                      ? handleShowLevelLifterReportDailog(record, "1")
                      : handStudentReport({ row: record, learning_mode: 1 })
                    : ""
                }
              >
                {!addSubLevelList[record.profile.add_sub_level_id] ? (
                  <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                    -
                  </button>
                ) : addSubLevelList[record.profile.add_sub_level_id].sort === "-" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-warm-up" aria-hidden="true"></i>
                  </button>
                ) : addSubLevelList[record.profile.add_sub_level_id].sort === "GR" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-graduation-cap" aria-hidden="true"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-icon-trans "
                    style={{
                      fontWeight: 600
                    }}
                  >
                    {addSubLevelList[record.profile.add_sub_level_id].sort}
                  </button>
                )}
                {/* {record.profile.add_sub_increment_count ? (
                  <>
                    <ArrowUpOutlined /> {record.profile.add_sub_increment_count}
                  </>
                ) : (
                  ""
                )} */}
              </div>
            )
          };
        }
      },
      sorter: (a, b) => sortingLevel(a, b, "add_sub_level_id"),
      sortOrder: sortedInfo.columnKey === "add_sub_level_id" && sortedInfo.order
    },
    {
      title: (
        <>
          <i style={{ fontSize: "24px" }} className="icon-mul-div" aria-hidden="true" />
          <div>
            {/* <Tooltip
              
              overlayClassName="ant-tooltip-reset-counter"
              title={"Reset the x/÷ growth counter back to 0."}
            >
              <Tag onClick={e => handleShowCounterResetConfirmationPopup(e, 2)}>
                Reset
              </Tag>{" "}
            </Tooltip> */}
          </div>
        </>
      ),
      align: "center",
      showSorterTooltip: false,
      key: "mul_div_level_id",
      dataIndex: "mul_div_level_id",
      render(text, record) {
        const islevelLifter = !!record.profile.is_mul_div_level_lifter;

        if (record.profile.student_learning_mode_id === 2) {
          return {
            children: (
              // <Tag
              //   color="blue"
              //   key={"add_sub_level_id"}
              //   className="border-none button-secondary-light "
              // >
              <div
                onClick={() =>
                  record.profile.mul_div_level_id !== null &&
                  record.profile.mul_div_level_id !== "null" &&
                  record.profile.mul_div_level_id !== ""
                    ? islevelLifter
                      ? handleShowLevelLifterReportDailog(record, "2")
                      : handStudentReport({ row: record, learning_mode: 2 })
                    : ""
                }
              >
                {!mulSubLevelList[record.profile.mul_div_level_id] ? (
                  <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                    -
                  </button>
                ) : mulSubLevelList[record.profile.mul_div_level_id].sort === "-" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-warm-up" aria-hidden="true"></i>
                  </button>
                ) : mulSubLevelList[record.profile.mul_div_level_id].sort === "GR" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-graduation-cap" aria-hidden="true"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-icon-trans "
                    style={{
                      fontWeight: 600
                    }}
                  >
                    {mulSubLevelList[record.profile.mul_div_level_id].sort}
                  </button>
                )}

                {/* {record.profile.mul_div_increment_count ? (
                    <>
                      <ArrowUpOutlined />{" "}
                      {record.profile.mul_div_increment_count}
                    </>
                  ) : (
                    ""
                  )} */}
              </div>
              // </Tag>
            )
          };
        } else {
          return {
            children: (
              <div
                onClick={() =>
                  record.profile.mul_div_level_id !== null &&
                  record.profile.mul_div_level_id !== "null" &&
                  record.profile.mul_div_level_id !== ""
                    ? islevelLifter
                      ? handleShowLevelLifterReportDailog(record, "2")
                      : handStudentReport({ row: record, learning_mode: 2 })
                    : ""
                }
              >
                {!mulSubLevelList[record.profile.mul_div_level_id] ? (
                  <button type="button" className="btn-icon-trans " style={{ pointerEvents: "none" }}>
                    -
                  </button>
                ) : mulSubLevelList[record.profile.mul_div_level_id].sort === "-" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-warm-up" aria-hidden="true"></i>
                  </button>
                ) : mulSubLevelList[record.profile.mul_div_level_id].sort === "GR" ? (
                  <button type="button" className="btn-icon-trans ">
                    <i className="icon-graduation-cap" aria-hidden="true"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-icon-trans "
                    style={{
                      fontWeight: 600
                    }}
                  >
                    {mulSubLevelList[record.profile.mul_div_level_id].sort}
                  </button>
                )}
                {/* {record.profile.mul_div_increment_count ? (
                  <>
                    <ArrowUpOutlined /> {record.profile.mul_div_increment_count}
                  </>
                ) : (
                  ""
                )} */}
              </div>
            )
          };
        }
      },
      sorter: (a, b) => sortingLevel(a, b, "mul_div_level_id"),
      sortOrder: sortedInfo.columnKey === "mul_div_level_id" && sortedInfo.order
    },
    {
      title: "Fluency Rate",
      dataIndex: "max_timeout_correct_ans_secs",
      key: "max_timeout_correct_ans_secs",
      align: "center",
      showSorterTooltip: false,

      render(text, record) {
        return {
          children: <div>{record.profile.max_timeout_correct_ans_secs}s</div>
        };
      },
      width: 106
    },
    {
      title: "Whoopsies",
      dataIndex: "allowed_level_lifter_whoopsies",
      key: "allowed_level_lifter_whoopsies",
      align: "center",
      showSorterTooltip: false,
      render(text, record) {
        return {
          children: <div>{record.profile.allowed_level_lifter_whoopsies}</div>
        };
      },
      width: 106
    },

    // informative actions
    {
      title: "Actions",
      dataIndex: "informative_actions",
      align: "center",

      render(text, record) {
        return {
          props: {
            style: { align: "center" }
          },
          children: (
            <div>
              <button type="button" className="btn-icon-trans edit" onClick={() => handleEditStudent(record)}>
                <EditOutlined />
              </button>
              <button
                style={{ marginLeft: "6px" }}
                type="button"
                className="btn-icon-trans delete"
                onClick={() => handleDeleteStudent(record)}
              >
                <DeleteOutlined />
              </button>
            </div>
          )
        };
      },
      width: 106
    },
    // Assignment
    {
      title: () => {
        const isAssignmentON = studentList.some(std => std.profile.is_assignment_on);

        return (
          <div
            className="d-flex"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {hasSelected ? (
                <>
                  <Tag
                    color={isAssignmentON || hasSelected ? "#2dca89" : ""}
                    style={{
                      padding: "4px 8px",
                      cursor: "pointer",
                      position: "relative"
                    }}
                    onClick={() => handleStartAssignment()}
                  >
                    {isAssignmentON ? "Assigned" : "Assign"}
                    <span
                      style={{
                        position: "absolute",

                        fontSize: "10px",
                        marginRight: "8px",
                        color: "#9f9b9b",
                        left: "50%",
                        transform: "translate(-50%, 105%)"
                      }}
                    >
                      (Beta){" "}
                    </span>
                  </Tag>
                </>
              ) : isAssignmentON ? (
                <>
                  <Tag
                    color={isAssignmentON || hasSelected ? "blue" : ""}
                    style={{ padding: "4px 8px", position: "relative" }}
                  >
                    Assigned
                    <span
                      style={{
                        position: "absolute",

                        fontSize: "10px",
                        marginRight: "8px",
                        color: "#9f9b9b",
                        left: "50%",
                        transform: "translate(-50%, 105%)"
                      }}
                    >
                      (Beta)
                    </span>
                  </Tag>
                </>
              ) : (
                <>
                  <Tooltip
                    overlayClassName="ant-tooltip-reset-counter"
                    title={`To activate the Assign button, first select  student(s).  You can do this by clicking checkboxes.  `}
                  >
                    <Tag
                      color={isAssignmentON || hasSelected ? "blue" : ""}
                      style={{ padding: "4px 8px", position: "relative" }}
                    >
                      {isAssignmentON ? "Assigned" : "Assign"}{" "}
                      <span
                        style={{
                          position: "absolute",

                          fontSize: "10px",
                          marginRight: "8px",
                          color: "#9f9b9b",
                          left: "50%",
                          transform: "translate(-50%, 105%)"
                        }}
                      >
                        (Beta)
                      </span>
                    </Tag>
                  </Tooltip>
                </>
              )}
              {/* <span
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    fontSize: "10px",
                    marginRight: "8px",
                    color: "#9f9b9b",
                  }}
                >
                  (Beta)
                </span> */}

              {isAssignmentON ? (
                <Tooltip overlayClassName="ant-tooltip-reset-counter-light" title={`End assignment. `}>
                  <CloseCircleOutlined className="ml-10" onClick={() => handleCloseAssignment()} />
                </Tooltip>
              ) : (
                ""
              )}
            </div>
            <Tooltip
              overlayClassName="ant-tooltip-reset-counter"
              title={
                <div>
                  <p>
                    Clicking the Assign button provides you a way to keep track of student activity (completed sessions
                    and activities) during the time that the assignment is active. This may be useful if you wish to
                    assign MathFactLab for homework.
                  </p>
                  <p>
                    Assignments can be active as long as you wish. Ending the assignment (by clicking the x) will clear
                    the column, but data will be saved and available on reports.
                  </p>
                  <p>
                    On reports, students are given credit for completing an assignment if they have completed at least
                    one session while the assignment was active.
                  </p>
                  <p>Credit is given if a student completes at least 75% of a session.</p>
                </div>
              }
            >
              <b className="info-icon">?</b>
            </Tooltip>
          </div>
        );
      },

      dataIndex: "assignment",
      key: "assignment",
      align: "center",
      showSorterTooltip: false,
      render(text, record) {
        return {
          children: (
            <div>
              {record.profile.is_assignment_on ? (
                <div>
                  <Tooltip
                    overlayClassName="ant-tooltip-reset-counter"
                    title={`${record.current_assignment_stats.completed_sessions_count} completed session(s). ${record.current_assignment_stats.sessions_spent_time} minutes of practice.`}
                  >
                    <Tag
                      color={record.current_assignment_stats.completed_sessions_count >= 1 ? "green" : ""}
                      className="button-secondary-light"
                      style={{ borderRadius: "30px" }}
                    >
                      {record.current_assignment_stats.completed_sessions_count}
                    </Tag>
                  </Tooltip>
                  -
                  <Tooltip
                    overlayClassName="ant-tooltip-reset-counter"
                    title={`${record.current_assignment_stats.activities_count} activities. ${record.current_assignment_stats.passed_level_lifter_count} Level Lifter(s) completed.`}
                  >
                    <Tag
                      className="button-secondary-light "
                      style={{
                        marginLeft: "8px"
                        // color: "#2b95f9",
                        // background: "#f2f8ff",
                        // borderColor: "#b7d7fc",
                      }}
                      color={
                        record.current_assignment_stats.activities_count +
                          record.current_assignment_stats.passed_level_lifter_count >=
                        1
                          ? "blue"
                          : ""
                      }
                    >
                      {record.current_assignment_stats.activities_count +
                        record.current_assignment_stats.passed_level_lifter_count}
                    </Tag>
                  </Tooltip>
                </div>
              ) : (
                "-"
              )}
            </div>
          )
        };
      },
      width: width > 1300 ? undefined : 180
    },

    // Performance actions
    {
      title: "Actions",
      dataIndex: "performance_actions",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: { align: "center" }
          },
          children: (
            <div>
              <button type="button" className="btn-icon-trans edit" onClick={() => handleEditStudent(record)}>
                <EditOutlined />
              </button>
              <Dropdown
                disabled={hasSelected}
                trigger={["click"]}
                overlay={
                  <Menu>
                    {
                      //# last level
                      ((record.profile.student_learning_mode_id === 1 &&
                        record.profile.add_sub_level_id &&
                        record.profile.add_sub_level_id < 26) ||
                        (record.profile.student_learning_mode_id === 2 &&
                          record.profile.mul_div_level_id &&
                          record.profile.mul_div_level_id < 26)) && (
                        <Menu.Item
                          key="14"
                          onClick={() => handleLevelLifterInterview(record, record.profile.student_learning_mode_id)}
                        >
                          <span className="action-menu">
                            <i
                              className="icon-interview mr-5"
                              aria-hidden="true"
                              style={{ fontSize: "14px", color: "#000" }}
                            />{" "}
                          </span>
                          Level Lifter Interview
                          <Tooltip
                            overlayClassName="ant-tooltip-reset-counter"
                            title="This feature allows you to assess the student one-on-one.  You determine if the student is ready to level up."
                          >
                            <b className="info-icon">?</b>
                          </Tooltip>
                        </Menu.Item>
                      )
                    }
                    {/* <Menu.Item
                      key="2"
                      onClick={() =>
                        handleShowLevelLifterReportDailog(
                          record,
                          record.profile.student_learning_mode_id,
                        )
                      }
                    >
                      <RiseOutlined className="mr-10" /> Level Lifter
                    </Menu.Item> */}

                    {/* <Menu.Item
                    key="3"
                    onClick={() => handleShowSessionDetailsDailog(record)}
                  >
                    <BarChartOutlined className="mr-5" /> Usage Stats
                  </Menu.Item> */}
                    {((record.profile.student_learning_mode_id === 1 && record.profile.add_sub_level_id) ||
                      (record.profile.student_learning_mode_id === 2 && record.profile.mul_div_level_id)) && (
                      <Menu.Item key="13" onClick={() => handleStudentLevelLifterLock(record)}>
                        {!record.profile.is_level_lifter_lock ? (
                          <>
                            <span className="action-menu">
                              <UnlockOutlined className="mr-10" />
                            </span>
                            Unlock Level Lifter{"  "}
                            <Tooltip
                              overlayClassName="ant-tooltip-reset-counter"
                              title="Selecting this option allows the student one-time access to the Level Lifter without completing the typical requirements for unlocking it."
                            >
                              <b className="info-icon">?</b>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <span className="action-menu">
                              <UnlockOutlined className="mr-10" />
                            </span>{" "}
                            Lock Level Lifter
                            <Tooltip
                              overlayClassName="ant-tooltip-reset-counter"
                              title="Currently this student’s Level Lifter is unlocked.  Selecting this option will lock it again; thus, requiring the student to complete all the typical tasks for unlocking it."
                            >
                              <b className="info-icon">?</b>
                            </Tooltip>
                          </>
                        )}{" "}
                      </Menu.Item>
                    )}
                    {record.profile.add_sub_level_id !== null &&
                      record.profile.add_sub_level_id !== "null" &&
                      record.profile.add_sub_level_id !== "" && (
                        <Menu.Item key="4" onClick={() => handStudentReport({ row: record, learning_mode: 1 })}>
                          <span className="action-menu">
                            <i className="icon-add-sub  mr-5 " aria-hidden="true" style={{ fontSize: "14px" }} />{" "}
                          </span>
                          Placement Test
                        </Menu.Item>
                      )}

                    {/* <Menu.Item key="6" onClick={() => handleEditStudent(record)}>
                    <EditOutlined className="mr-5" /> Edit
                  </Menu.Item> */}
                    {/* <Menu.Item
                      key="7"
                      onClick={() => handleDeleteStudent(record)}
                    >
                      <DeleteOutlined className="mr-10" /> Delete
                    </Menu.Item> */}

                    {record.profile.add_sub_level_id !== null &&
                      record.profile.add_sub_level_id !== "null" &&
                      record.profile.add_sub_level_id !== "" && (
                        <Menu.Item
                          key="8"
                          // user and  show prgroess level learning mode passing as parameter
                          onClick={() => handleShowProgressTable(record, 1)}
                        >
                          <span className="action-menu">
                            <i className="icon-add-sub  mr-5" aria-hidden="true" style={{ fontSize: "14px" }} />{" "}
                          </span>
                          Progress table
                        </Menu.Item>
                      )}
                    {record.profile.mul_div_level_id !== null &&
                      record.profile.mul_div_level_id !== "null" &&
                      record.profile.mul_div_level_id !== "" && (
                        <Menu.Item key="5" onClick={() => handStudentReport({ row: record, learning_mode: 2 })}>
                          <span className="action-menu">
                            <i className="icon-mul-div mr-5" aria-hidden="true" style={{ fontSize: "14px" }} />{" "}
                          </span>
                          Placement Test
                        </Menu.Item>
                      )}
                    {record.profile.mul_div_level_id !== null &&
                      record.profile.mul_div_level_id !== "null" &&
                      record.profile.mul_div_level_id !== "" && (
                        <Menu.Item key="9" onClick={() => handleShowProgressTable(record, 2)}>
                          <span className="action-menu">
                            <i className="icon-mul-div mr-5" aria-hidden="true" style={{ fontSize: "14px" }} />{" "}
                          </span>
                          Progress table
                        </Menu.Item>
                      )}

                    {/* <Menu.Item
                    key="10"
                    onClick={() => handleShowStrategiesTable(record)}
                  >
                    <UnorderedListOutlined className="mr-10" />
                    Strategies
                  </Menu.Item> */}
                    <div className="inline-flex">
                      <Menu.Item key="11">
                        <div className="strategy-lock inline-flex">
                          {record.profile.disable_strategies_slug &&
                          !record.profile.disable_strategies_slug.includes("dice-9=10-1") ? (
                            <Tag color="#2dcc89" key={"add_sub_level_id"} className="border-none">
                              <span className="mr-2">9 = 10 - 1</span>
                            </Tag>
                          ) : (
                            <span className="mr-2">9 = 10 - 1</span>
                          )}
                          <Switch
                            className="ml-5 mr-5"
                            onChange={e =>
                              // handleShowDisableStrategyConfirmationPopup(
                              //   e,
                              //   record,
                              // )
                              handleChangeDisabledStrategy(record)
                            }
                            checked={
                              record.profile.disable_strategies_slug &&
                              record.profile.disable_strategies_slug.includes("dice-9=10-1")
                            }
                          />{" "}
                          {record.profile.disable_strategies_slug &&
                          record.profile.disable_strategies_slug.includes("dice-9=10-1") ? (
                            <Tag color="#2dcc89" key={"add_sub_level_id"} className="border-none">
                              <span className="mr-2">Fingers</span>
                            </Tag>
                          ) : (
                            <span className="mr-2">Fingers</span>
                          )}
                        </div>

                        {/* <Switch
                      className="ml-5"
                      onChange={e =>
                        handleShowDisableStrategyConfirmationPopup(
                          e,
                          record,
                          "9 = 10 - 1",
                        )
                      }
                      checked={
                        record.profile.disable_strategies_slug &&
                        record.profile.disable_strategies_slug.includes(
                          "9 = 10 - 1",
                        )
                      }
                    /> */}
                        <Tooltip
                          overlayClassName="ant-tooltip-reset-counter"
                          title="The fingers trick strategy, by default, is turned off for students. This strategy is offered for students who have difficulty learning the x9 facts. If the fingers trick strategy is turned on for a student, the 9 = 10 - 1 strategy will automatically be turned off."
                        >
                          <b className="info-icon">?</b>
                        </Tooltip>
                      </Menu.Item>
                    </div>
                    {(record.profile.add_sub_level_id !== null &&
                      record.profile.add_sub_level_id !== "null" &&
                      record.profile.add_sub_level_id !== "") ||
                    (record.profile.mul_div_level_id !== null &&
                      record.profile.mul_div_level_id !== "null" &&
                      record.profile.mul_div_level_id !== "") ? (
                      <Menu.Item key="1" onClick={() => handleResetStudentLevelConfirmation(record)}>
                        <span className="action-menu">
                          <i className="icon-reassess mr-10" aria-hidden="true"></i>
                        </span>
                        Reassess
                      </Menu.Item>
                    ) : (
                      ""
                    )}
                  </Menu>
                }
                placement="bottomCenter"
                // icon={}
              >
                {/* <DownCircleOutlined /> */}
                {/* <Button type="primary"> */}
                <MoreOutlined
                  rotate="90"
                  twoToneColor="#eb2f96"
                  style={{
                    border: "1px solid",
                    padding: "4px",
                    borderRadius: "8px",
                    color: "#2dcc89",
                    marginLeft: "12px"
                  }}
                />
                {/* </Button> */}
              </Dropdown>
            </div>
          )
        };
      },
      width: 120
    },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "center",
      render(text, record, index) {
        return {
          props: {
            style: { align: "center" }
          },
          children: (
            <div onClick={() => handleEditStudent(record)}>
              <button type="button" className="btn-icon-trans edit">
                <EditOutlined />
              </button>
            </div>
          )
        };
      }
    },
    // {
    //   title: "Reassess",
    //   dataIndex: "reassess",
    //   align: "center",
    //   render(text, record) {
    //     return {
    //       props: {
    //         style: { align: "center" },
    //       },
    //       children: (
    //         <div>
    //           {(record.profile.add_sub_level_id !== null &&
    //             record.profile.add_sub_level_id !== "null" &&
    //             record.profile.add_sub_level_id !== "") ||
    //           (record.profile.mul_div_level_id !== null &&
    //             record.profile.mul_div_level_id !== "null" &&
    //             record.profile.mul_div_level_id !== "") ? (
    //             <div
    //
    //               onClick={() => handleResetStudentLevelConfirmation(record)}
    //             >
    //               <button type="button" className="btn-icon-trans edit">
    //                 <i className="icon-reassess" aria-hidden="true"></i>
    //               </button>
    //             </div>
    //           ) : (
    //             <div />
    //           )}
    //         </div>
    //       ),
    //     };
    //   },
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render(text, record, index) {
        return {
          children: (
            <Dropdown
              disabled={hasSelected}
              // visible={true}
              overlay={
                <Menu>
                  {(record.profile.add_sub_level_id !== null &&
                    record.profile.add_sub_level_id !== "null" &&
                    record.profile.add_sub_level_id !== "") ||
                  (record.profile.mul_div_level_id !== null &&
                    record.profile.mul_div_level_id !== "null" &&
                    record.profile.mul_div_level_id !== "") ? (
                    <Menu.Item key="1" onClick={() => handleResetStudentLevelConfirmation(record)}>
                      <i className="icon-reassess mr-10" aria-hidden="true"></i>
                      Reassess
                    </Menu.Item>
                  ) : (
                    ""
                  )}

                  <Menu.Item
                    key="2"
                    onClick={() => handleShowLevelLifterReportDailog(record, record.profile.student_learning_mode_id)}
                  >
                    <i className="icon-interview mr-5" aria-hidden="true" style={{ fontSize: "14px", color: "#000" }} />{" "}
                    Level Lifter
                  </Menu.Item>

                  {/* <Menu.Item
                    key="3"
                    onClick={() => handleShowSessionDetailsDailog(record)}
                  >
                    <BarChartOutlined className="mr-5" /> Usage Stats
                  </Menu.Item> */}
                  {record.profile.add_sub_level_id !== null &&
                    record.profile.add_sub_level_id !== "null" &&
                    record.profile.add_sub_level_id !== "" && (
                      <Menu.Item key="4" onClick={() => handStudentReport({ row: record, learning_mode: 1 })}>
                        <i className="icon-add-sub  mr-5" aria-hidden="true" style={{ fontSize: "14px" }} /> Placement
                        Test
                      </Menu.Item>
                    )}
                  {record.profile.mul_div_level_id !== null &&
                    record.profile.mul_div_level_id !== "null" &&
                    record.profile.mul_div_level_id !== "" && (
                      <Menu.Item key="5" onClick={() => handStudentReport({ row: record, learning_mode: 2 })}>
                        <i className="icon-mul-div mr-5" aria-hidden="true" style={{ fontSize: "14px" }} /> Placement
                        Test
                      </Menu.Item>
                    )}

                  {/* <Menu.Item key="6" onClick={() => handleEditStudent(record)}>
                    <EditOutlined className="mr-5" /> Edit
                  </Menu.Item> */}
                  <Menu.Item key="7" onClick={() => handleDeleteStudent(record)}>
                    <DeleteOutlined className="mr-10" /> Delete
                  </Menu.Item>

                  {record.profile.add_sub_level_id !== null &&
                    record.profile.add_sub_level_id !== "null" &&
                    record.profile.add_sub_level_id !== "" && (
                      <Menu.Item
                        key="8"
                        // user and  show prgroess level learning mode passing as parameter
                        onClick={() => handleShowProgressTable(record, 1)}
                      >
                        <i className="icon-add-sub  mr-5" aria-hidden="true" style={{ fontSize: "14px" }} /> Progress
                        table
                      </Menu.Item>
                    )}

                  {record.profile.mul_div_level_id !== null &&
                    record.profile.mul_div_level_id !== "null" &&
                    record.profile.mul_div_level_id !== "" && (
                      <Menu.Item key="9" onClick={() => handleShowProgressTable(record, 2)}>
                        <i className="icon-mul-div mr-5" aria-hidden="true" style={{ fontSize: "14px" }} /> Progress
                        table
                      </Menu.Item>
                    )}

                  {/* <Menu.Item
                    key="10"
                    onClick={() => handleShowStrategiesTable(record)}
                  >
                    <UnorderedListOutlined className="mr-10" />
                    Strategies
                  </Menu.Item> */}
                  <div className="inline-flex">
                    <Menu.Item key="11">
                      <div className="strategy-lock inline-flex">
                        {record.profile.disable_strategies_slug &&
                        !record.profile.disable_strategies_slug.includes("dice-9=10-1") ? (
                          <Tag color="#2dcc89" key={"add_sub_level_id"} className="border-none">
                            <span className="mr-2">9 = 10 - 1</span>
                          </Tag>
                        ) : (
                          <span className="mr-2">9 = 10 - 1</span>
                        )}
                        <Switch
                          className="ml-5 mr-5"
                          onChange={e =>
                            // handleShowDisableStrategyConfirmationPopup(
                            //   e,
                            //   record,
                            // )
                            handleChangeDisabledStrategy(record)
                          }
                          checked={
                            record.profile.disable_strategies_slug &&
                            record.profile.disable_strategies_slug.includes("dice-9=10-1")
                          }
                        />{" "}
                        {record.profile.disable_strategies_slug &&
                        record.profile.disable_strategies_slug.includes("dice-9=10-1") ? (
                          <Tag color="#2dcc89" key={"add_sub_level_id"} className="border-none">
                            <span className="mr-2">Fingers</span>
                          </Tag>
                        ) : (
                          <span className="mr-2">Fingers</span>
                        )}
                      </div>

                      {/* <Switch
                      className="ml-5"
                      onChange={e =>
                        handleShowDisableStrategyConfirmationPopup(
                          e,
                          record,
                          "9 = 10 - 1",
                        )
                      }
                      checked={
                        record.profile.disable_strategies_slug &&
                        record.profile.disable_strategies_slug.includes(
                          "9 = 10 - 1",
                        )
                      }
                    /> */}
                      <Tooltip
                        overlayClassName="ant-tooltip-reset-counter"
                        title="The fingers trick strategy, by default, is turned off for students. This strategy is offered for students who have difficulty learning the x9 facts. If the fingers trick strategy is turned on for a student, the 9 = 10 - 1 strategy will automatically be turned off."
                      >
                        <b className="info-icon">?</b>
                      </Tooltip>
                    </Menu.Item>
                  </div>
                  <Menu.Item key="13" onClick={() => handleStudentLevelLifterLock(record)}>
                    {!record.profile.is_level_lifter_lock ? (
                      <>
                        <UnlockOutlined className="mr-10" />
                        Unlock Level Lifter{"  "}
                        <Tooltip
                          overlayClassName="ant-tooltip-reset-counter"
                          title="Selecting this option allows the student one-time access to the Level Lifter without completing the typical requirements for unlocking it."
                        >
                          <b className="info-icon">?</b>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <UnlockOutlined className="mr-10" />
                        Lock Level Lifter
                        <Tooltip
                          overlayClassName="ant-tooltip-reset-counter"
                          title="Currently this student’s Level Lifter is unlocked.  Selecting this option will lock it again; thus, requiring the student to complete all the typical tasks for unlocking it."
                        >
                          <b className="info-icon" style={{ borderRadius: "50%" }}>
                            ?
                          </b>
                        </Tooltip>
                      </>
                    )}{" "}
                  </Menu.Item>

                  {
                    //# last level
                    ((record.profile.student_learning_mode_id === 1 &&
                      record.profile.add_sub_level_id &&
                      record.profile.add_sub_level_id < 26) ||
                      (record.profile.student_learning_mode_id === 2 &&
                        record.profile.mul_div_level_id &&
                        record.profile.mul_div_level_id < 26)) && (
                      <Menu.Item
                        key="14"
                        onClick={() => handleLevelLifterInterview(record, record.profile.student_learning_mode_id)}
                      >
                        <i
                          className="icon-interview mr-5"
                          aria-hidden="true"
                          style={{ fontSize: "14px", color: "#000" }}
                        />{" "}
                        Level Lifter Interview
                      </Menu.Item>
                    )
                  }
                </Menu>
              }
              placement="bottomCenter"
              // icon={}
            >
              {/* <DownCircleOutlined /> */}
              {/* <Button type="primary"> */}
              <MoreOutlined
                rotate="90"
                twoToneColor="#eb2f96"
                style={{
                  border: "1px solid",
                  padding: "4px",
                  borderRadius: "8px",
                  color: "#2dcc89"
                }}
              />
              {/* </Button> */}
            </Dropdown>
          )
        };
      }
      // width: 120,
    },
    {
      title: "Usage Stats",
      dataIndex: "usage_stats",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: { align: "center" }
          },
          children: (
            <div onClick={() => handleShowSessionDetailsDailog(record)}>
              <button type="button" className="btn-icon-trans edit">
                <BarChartOutlined />
              </button>
            </div>
          )
        };
      },
      width: 106
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      showSorterTooltip: false,
      sorter: (a, b) => a.user_name.localeCompare(b.user_name),
      sortOrder: sortedInfo.columnKey === "user_name" && sortedInfo.order,
      width: 200
    },

    {
      title: (
        <div onClick={() => handlePassword()} className="password-cell">
          Password
        </div>
      ),
      dataIndex: "password",
      align: "center",
      width: 250,
      render(text, record) {
        return {
          children: (
            <div>
              <PasswordSwitch password={record.password} isShowAllPassword={isShowAllPassword} />
            </div>
          )
        };
      }
    },
    {
      title: "Class",
      dataIndex: "class_name",
      key: "class_name",
      align: "center",
      width: 300,
      showSorterTooltip: false,
      filteredValue: filteredInfo.class_code || null,
      sorter: (a, b) => a.class_name.localeCompare(b.class_name),
      sortOrder: sortedInfo.columnKey === "class_name" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.class_name}</div>
        };
      }
    },
    {
      title: "Class code",
      dataIndex: "class_code",
      key: "class_code",
      align: "center",
      // filters: _.uniq(_.map(studentList, "profile.class_code")).map(code => {
      //   return { text: code, value: code };
      // }),
      showSorterTooltip: false,
      filteredValue: filteredInfo.class_code || null,
      // onFilter: (value, record) => record.profile.class_code.includes(value),
      sorter: (a, b) => (+a.class_code > +b.class_code ? -1 : 1),
      sortOrder: sortedInfo.columnKey === "class_code" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div style={{ letterSpacing: 1 }}>{record.class_code}</div>
        };
      },
      width: 200
    },
    {
      title: "Last updated ",
      dataIndex: "updated_at",
      key: "updated_at",
      align: "center",
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
      sortOrder: sortedInfo.columnKey === "updated_at" && sortedInfo.order,
      showSorterTooltip: false,
      width: 250,
      render(text, record) {
        return {
          children: <div>{record.updated_at ? moment(record.updated_at).fromNow() : ""}</div>
        };
      }
    }
  ];

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
    columnWidth: 48
  };

  const handleMultiDeleteUser = selectedRows => {
    props.showMultipleDeleteStudentDailog(selectedRows);
  };

  const handleMultiEditUser = () => {
    props.showMultiEditStudentDailog(selectedRowKeys);
  };

  const handleShowAddStudentPopup = () => {
    props.showAddStudentDialog();
  };

  const handleShowProgressTablePopup = () => {
    props.showProgressTablePopup();
  };

  //Close class code Dialog close
  const handleCloseClassCodeDialog = () => {
    setIsShowClassCodeDialog(false);
  };
  const componentRef = useRef();
  const componentLetterRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const handlePrintLetter = useReactToPrint({
    content: () => componentLetterRef.current
  });

  // const modifyPdf = async () => {
  //   // Fetch first existing PDF document
  //   const pdf = parentLetter;
  //   const url1 =
  //     "https://drive.google.com/file/d/1fbj5nX357H7IkBS6gv24JgY70KONrq64/edit?usp=share_link";
  //   const firstDonorPdfBytes = await fetch(url1).then(res => res.arrayBuffer());

  //   // Fetch second existing PDF document
  //   const url2 = "https://pdf-lib.js.org/assets/with_large_page_count.pdf";
  //   const secondDonorPdfBytes = await fetch(url2).then(res =>
  //     res.arrayBuffer(),
  //   );

  //   // Load a PDFDocument from each of the existing PDFs
  //   const firstDonorPdfDoc = await PDFDocument.load(firstDonorPdfBytes);
  //   const secondDonorPdfDoc = await PDFDocument.load(secondDonorPdfBytes);

  //   // Create a new PDFDocument
  //   const pdfDoc = await PDFDocument.create();

  //   // Copy the 1st page from the first donor document, and
  //   // the 743rd page from the second donor document
  //   const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [0]);
  //   const [secondDonorPage] = await pdfDoc.copyPages(secondDonorPdfDoc, [742]);

  //   // Add the first copied page
  //   pdfDoc.addPage(firstDonorPage);

  //   // Insert the second copied page to index 0, so it will be the
  //   // first page in `pdfDoc`
  //   pdfDoc.insertPage(0, secondDonorPage);

  //   // Serialize the PDFDocument to bytes (a Uint8Array)
  //   const pdfBytes = await pdfDoc.save();

  //   // Trigger the browser to download the PDF document
  //   download(pdfBytes, "pdf-lib_page_copying_example.pdf", "application/pdf");
  // };

  class ComponentToPrint extends React.Component {
    render() {
      const renderStudentList = _.chunk(studentUserList, 10);

      return (
        <div>
          {renderStudentList.map((studentList, i) => {
            return (
              <div
                key={i}
                style={{
                  pageBreakAfter: "always",
                  pageBreakInside: "avoid"
                }}
              >
                <div
                  style={{
                    display: "flex",

                    margin: "8px 4px",
                    alignItems: "center"
                  }}
                >
                  {/* <div style={{ width: "200px", marginLeft: "4px" }}>
                    <img src={logo} alt="MathFactLab" className="login-logo" />
                  </div> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      marginLeft: "16px"
                    }}
                  >
                    <div className="font-36 text-secondary mt-5 mb-10">
                      Login cards
                      {/* Login cards - {userDetails.profile.first_name}{" "}
                      {userDetails.profile.last_name}{" "} */}
                    </div>
                    {/* <div className="font-18 mt-5">
                      Class code - {userDetails.class_code}
                    </div> */}
                  </div>
                </div>

                <div data-v-1538b6bb="" className="student-card-main-wrapper">
                  {studentList.map(student => {
                    return (
                      <div key={student.id} data-v-61b73c48="" data-v-1538b6bb="" className="student-login-card">
                        {/* <div data-v-61b73c48="" className="card-header">
                          <div data-v-61b73c48="" className="card-title">
                            {student.profile.last_name}{" "}
                            {student.profile.first_name}
                          </div>
                          <div data-v-61b73c48="" className="card-subtitle">
                            {student.profile.class_code}
                          </div>
                        </div> */}
                        <ul data-v-61b73c48="" className="login-steps">
                          <li className="step">
                            <div className="card-logo">
                              <img src={logo} alt="MathFactLab" className="login-logo" />
                            </div>
                          </li>
                          <li className="card-title">
                            {student.profile.first_name} {student.profile.last_name}
                          </li>
                          <li data-v-61b73c48="" className="step">
                            <div data-v-61b73c48="" className="step-instructions">
                              <div data-v-61b73c48="" className="left-column">
                                <div data-v-61b73c48="" className="step-label">
                                  Website:
                                </div>{" "}
                                <div data-v-61b73c48="" className="step-label">
                                  Classcode:
                                </div>{" "}
                                <div data-v-61b73c48="" className="step-label">
                                  Username:
                                </div>{" "}
                                <div data-v-61b73c48="" className="step-label">
                                  Password:
                                </div>{" "}
                              </div>

                              <div className="right-column">
                                <div data-v-61b73c48="" className="field login">
                                  {window.location.host}
                                  {/* www.mathfactlab.com */}
                                </div>
                                <div data-v-61b73c48="" className="field login">
                                  {student.class_code}
                                </div>
                                <div data-v-61b73c48="" className="field login">
                                  {student.user_name}
                                </div>
                                <div data-v-61b73c48="" className="field password">
                                  {student.password}
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <QRcode
                              value={JSON.stringify({
                                user_name: student.user_name,
                                class_code: student.class_code,
                                password: student.password
                              })}
                              style={{ height: "299px" }}
                            />{" "}
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
                {/* qr code Generate with QRcodeData*/}
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100vh"
                  }}
                >
                  {studentList.length &&
                    studentList?.map(student => (
                      <div key={student.id} style={{ marginBottom: "20px" }}>
                        <QRcode value={JSON.stringify({ studentList })} style={{ height: "800px" }} />
                      </div>
                    ))}
                </div> */}

                <div style={{ margin: "100px" }}></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  class ComponentToPrintLetter extends React.Component {
    render() {
      const renderStudentPrintList = studentUserList.slice(0, 4);
      return (
        <>
          {renderStudentPrintList.map((studentList, i) => {
            return (
              <div
                key={i}
                style={{
                  margin: "24px",
                  pageBreakAfter: "always"
                  // pageBreakInside: "avoid",
                }}
              >
                <div>
                  {" "}
                  <img src={logo} alt="MathFactLab" className="login-logo" style={{ width: "320px" }} />
                </div>
                <div style={{ margin: "24px 46px" }}>
                  {" "}
                  <div className="font-24 mt-10">
                    <div>Dear Families</div>
                    <div className="font-24 mt-10">
                      This year, in class, students are using MathFactLab to practice and learn the basic math facts
                      (for example, 7 + 5, 14 - 9, 6 x 8, or 32 ÷ 4). What we particularly like about this program is
                      that problems are represented visually and students are given strategies to solve them.{" "}
                    </div>
                    <div className="font-24 mt-10">
                      Regular practice at home with MathFactLab will lead to improved math fact fluency and greater
                      overall success in math.{" "}
                    </div>
                  </div>
                  <div style={{ padding: "12px", border: "1px solid black" }} className="mt-10">
                    <ul>
                      <li>
                        Students progress through a series of levels, learning a new group of related math facts at each
                        level
                      </li>
                      <li>
                        he program automatically logs students off at the end of their session. Session lengths are set
                        by the teacher and range from 5
                      </li>
                      <li>
                        MathFactLab works on desktops, laptops, Chromebooks, iPads and other tablets. It is not
                        optimized for smartphones.
                      </li>
                    </ul>
                  </div>
                  <div className="user-details-section">
                    <div>
                      <img src={pdfUserSection} alt="pdfUserSection" />
                    </div>
                    {/* <div></div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  }

  const filteredColumns = checkedColumnList.reduce((acc, cur) => {
    let updatedColumnList = acc;
    const searchByDatIndex = columns.find(col => col.dataIndex === cur);
    if (searchByDatIndex) {
      updatedColumnList.push(searchByDatIndex);
      acc = updatedColumnList;
      return acc;
    }
    return acc;
  }, []);

  // const onChangeFilterColumnSelection = e => {
  //   let checkedColumns = checkedColumnList;

  //   if (checkedColumns.includes(e.target.id)) {
  //     checkedColumns = checkedColumns.filter(id => {
  //       return id !== e.target.id;
  //     });
  //     setCheckedColumns([...checkedColumns]);
  //     localStorage.setItem([modeType], JSON.stringify([...checkedColumns]));
  //   } else {
  //     let updatedColumList = [...checkedColumns, e.target.id];

  //     // sort column list
  //     checkedColumns = studentTableColumnOptions[modeType]
  //       .filter(option => updatedColumList.includes(option.id))

  //       .map(column => column.id);

  //     setCheckedColumns([...checkedColumns]);
  //     localStorage.setItem([modeType], JSON.stringify([...checkedColumns]));
  //   }
  // };

  const handleExportToCsv = () => {
    const csvData = !!studentList.length
      ? studentList.map((student, i) => {
          const last_name = "Last Name";
          const first_name = "First Name";
          const user_name = "Username";
          const password = "Password";
          const class_name = "Class";
          const class_code = "Class code";
          const Whoopsies = "Whoopsies";
          const Fluency_Rate = "Fluency Rate";
          const Status = "Status";
          const Add_Sub_Level = "Add/Sub Level";
          const Mul_Div_Level = "Mul/Div Level";
          const assign_completed_sessions = "Sessions (Assign)";
          const assign_minutes = "Minutes (Assign)";
          const assign_activity = "Activities (Assign)";
          const assign_level_lifters = "Level Lifters (Assign) ";

          return {
            [last_name]: student.profile.last_name || "",
            [first_name]: student.profile.first_name || "",
            [user_name]: student.user_name || "",
            [password]: student.password || "",
            [class_name]: student.class_name || "",
            [class_code]: student.class_code || "",
            [Whoopsies]: student.profile.allowed_level_lifter_whoopsies || "",
            [Fluency_Rate]: student.profile.max_timeout_correct_ans_secs || 0,
            [Add_Sub_Level]: addSubLevelList[student.profile.add_sub_level_id]
              ? addSubLevelList[student.profile.add_sub_level_id]["sort"]
              : "-",
            [Mul_Div_Level]: mulSubLevelList[student.profile.mul_div_level_id]
              ? mulSubLevelList[student.profile.mul_div_level_id]["sort"]
              : "-",
            [Status]: student.profile.status || "",
            [assign_completed_sessions]: student.current_assignment_stats.completed_sessions_count || "",
            [assign_minutes]: student.current_assignment_stats.sessions_spent_time || "",
            [assign_activity]: student.current_assignment_stats.activities_count || "",
            [assign_level_lifters]: student.current_assignment_stats.passed_level_lifter_count || ""
          };
        })
      : [];

    DownloadCSV({
      csvData,
      exportFileName: `Students`
    });
  };

  // const handleVisibleFilterMenu = flag => {
  //   setVisibleFilterMenu(flag);
  // };

  // const studentTableColumn =
  //   modeType === "informative"
  //     ? studentTableColumnOptions.informative
  //     : studentTableColumnOptions.performance;

  // const columnListMenu = (
  //   <Menu>
  //     <Menu.ItemGroup title="">
  //       {studentTableColumn
  //         .filter(item => item.defaultChecked)
  //         .map(option => {
  //           return (
  //             <Menu.Item key={option.id}>
  //               <Checkbox
  //                 id={option.id}
  //                 onChange={onChangeFilterColumnSelection}
  //                 checked={
  //                   localStorage.getItem(modeType)
  //                     ? localStorage.getItem(modeType).includes(option.id)
  //                     : option.defaultChecked
  //                 }
  //                 disabled={option.disabled}
  //               >
  //                 {option.label}
  //               </Checkbox>
  //             </Menu.Item>
  //           );
  //         })}
  //     </Menu.ItemGroup>
  //   </Menu>
  // );

  const actionButtonMenu = (
    <Menu>
      <Menu.Item
        onClick={() => handleShowProgressTablePopup()}
        id="actionBtnViewProgressTable"
        // eslint-disable-next-line react/no-unknown-property
        useful="actionBtnViewProgressTable"
      >
        View Progress table
      </Menu.Item>
      {userDetails.role_id !== userRole.PARENT.role_id && (
        <Menu.Item
          onClick={() => handleExportToCsv()}
          id="actionBtnExportCSV"
          // eslint-disable-next-line react/no-unknown-property
          useful="actionBtnExportCSV"
        >
          Export CSV
        </Menu.Item>
      )}

      <Menu.Item
        onClick={() => handlePrint()}
        id="actionBtnGenerateLoginCards"
        // eslint-disable-next-line react/no-unknown-property
        useful="actionBtnGenerateLoginCards"
      >
        Generate Login Cards
      </Menu.Item>
      {userDetails.role_id !== userRole.PARENT.role_id && (
        <Menu.Item
          id="actionBtnPrintParentLetter"
          // eslint-disable-next-line react/no-unknown-property
          useful="actionBtnPrintParentLetter"
        >
          <a href={parentLetter} download>
            Print Parent Letter
          </a>{" "}
        </Menu.Item>
      )}

      {process.env.REACT_APP_ENV === "local" ? (
        <Menu.Item
          onClick={() => handlePrintLetter()}
          id="actionBtnGenerateLoginCards"
          // eslint-disable-next-line react/no-unknown-property
          useful="actionBtnGenerateLoginCards"
        >
          2 Generate Parent Letters
        </Menu.Item>
      ) : (
        ""
      )}

      {userDetails.role_id !== userRole.PARENT.role_id && (
        <>
          {/* <Menu.Item
            onClick={() => handleMultiEditUser()}
            disabled={!hasSelected}
          >
            Edit Bulk
          </Menu.Item> */}
          <Menu.Item onClick={() => handleMultiDeleteUser(selectedRowKeys)} disabled={!hasSelected}>
            Delete Bulk
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  const addStudentMenu = (
    <Menu>
      <Menu.Item onClick={() => handleShowAddStudentPopup()}>
        <UserAddOutlined className="mr-5" /> Add Single Student
      </Menu.Item>

      {/* <Menu.Item onClick={() => setOpenWelcomeStepPopup(true)}>
        <UsergroupAddOutlined className="mr-5" /> Add Multiple Students
      </Menu.Item>

      <Menu.Item onClick={() => setIsShowImportStudentPopup(true)}>
        <UsergroupAddOutlined className="mr-5" /> Bulk Student Import
      </Menu.Item> */}
      {userDetails.role_id !== userRole.PARENT.role_id && (
        <>
          <Menu.Item onClick={() => setOpenWelcomeStepPopup(true)}>
            <UsergroupAddOutlined className="mr-5" /> Add Multiple Students
          </Menu.Item>

          <Menu.Item onClick={() => setIsShowImportStudentPopup(true)}>
            <UsergroupAddOutlined className="mr-5" /> Bulk Student Import
          </Menu.Item>
        </>
      )}

      {/* <Menu.Item onClick={() => setIsShowClassCodeDialog(true)}>
        <i
          className="icon-class-Active joyride-1 mr-5"
          style={{ fontSize: "14px", color: "black" }}
          aria-hidden="true"
        ></i>{" "}
        Add Class
      </Menu.Item> */}
    </Menu>
  );

  const handleChangeMode = e => {
    setModeType(e.target.value);
    localStorage.setItem("current-mode", e.target.value);
    const updatedColums = studentTableColumnOptions[e.target.value]
      .filter(option => option.defaultChecked)
      .map(column => column.id);
    setCheckedColumns([...updatedColums]);
  };

  studentList = studentList.map(student => {
    return {
      ...student,
      updated_at: student.updated_at
    };
  });

  const handleCloseUploadCSVPopup = () => {
    setIsShowImportStudentPopup(false);
  };

  // const handlePageChange = page => {
  //   handlePage(page);
  // };
  // const handlePageLimitChange = (limit, size) => {
  //   handlePageSize(size);
  // };
  return (
    <Container fluid>
      <Section
        title={
          <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
            <Title level={4} className={"tab-heading"}>
              {selectedClass?.name ? `${selectedClass.name}'s ` : role_id === "parent" ? "Your" : "All"}{" "}
              {role_id === userRole.PARENT.role_id ? "children" : "students"}
              <span className="table-header-counter">
                <Tag> {studentList?.length}</Tag>
              </span>
            </Title>
            <div className="mode-wrapper">
              <Radio.Group value={modeType} onChange={handleChangeMode} buttonStyle="solid">
                <Radio.Button value="informative" className="radio-button-item">
                  Informative
                </Radio.Button>
                <Radio.Button value="performance" className="radio-button-item">
                  Performance
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        }
        extra={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center"
              }}
            >
              <>
                {/* <div style={{ marginRight: 16 }}>
                    <Button
                      type="primary"
                      onClick={() => handleMultiDeleteUser()}
                      icon={<DeleteOutlined />}
                    ></Button>
                  </div> */}
                <div style={{ marginRight: 16 }}>
                  {hasSelected ? (
                    <Button type="primary" disabled={!hasSelected} onClick={() => handleMultiEditUser()}>
                      <Space>
                        Group Edit
                        <EditOutlined />
                      </Space>
                    </Button>
                  ) : (
                    <Tooltip title="Please select student(s) first (by clicking on a checkbox).">
                      <Button type="primary" disabled={!hasSelected} onClick={() => handleMultiEditUser()}>
                        <Space>
                          Group Edit
                          <EditOutlined />
                        </Space>
                      </Button>
                    </Tooltip>
                  )}

                  {/* <Button
                    type="primary"
                    onClick={() => handleMultiEditUser()}
                    icon={<EditOutlined />}
                    disabled={!hasSelected}
                    title={"Group Edit"}
                  ></Button> */}
                </div>
              </>

              {/* <Tooltip
                  
                  overlayClassName="ant-tooltip-reset-counter"
                  title="FirstName, lastName, UserName,Class code and learning Mode is required in csv file header row."
                > */}
              {/* <label htmlFor="file">Import student list</label>
                    <input
                      id="file"
                      type="file"
                      accept=".csv"
                      onChange={changeHandler}
                      style={{
                        visibility: "hidden",
                      }}
                    /> */}
              {/* </Tooltip> */}
              {/*
              <div style={{ marginRight: 16 }}>
                <Button
                  type="secondary"
                  onClick={() => handleExportToCsv()}
                  icon={<DownloadOutlined />}
                >
                  Export CSV
                </Button>
              </div> */}

              {/* <div style={{ marginRight: 16 }}>
                <Dropdown
                  overlay={columnListMenu}
                  onVisibleChange={handleVisibleFilterMenu}
                  visible={isVisibleFilterMenu}
                  trigger="onclick"
                >
                  <Button type="secondary" >
                    <EyeOutlined />
                  </Button>
                </Dropdown>
              </div> */}

              {/* {role_name !== "parent" && (
                <div style={{ marginRight: 16 }}>
                  <Button
                    type="secondary"
                    onClick={() => handlePrint()}
                    icon={<PrinterOutlined />}
                  >
                    Login Cards
                  </Button>
                </div>
              )} */}

              <div style={{ marginRight: 16 }}>
                <Dropdown type="primary" overlay={actionButtonMenu} trigger={["click"]}>
                  <Button>
                    <Space>
                      Actions
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>

              <div className="joyride-4">
                {process.env.REACT_APP_IS_ENABLE_BULK_FEATURE !== "YES" &&
                userDetails.role_id !== userRole.PARENT.role_id ? (
                  userDetails.role_id === userRole.TEACHER.role_id && userDetails.school_district_id ? (
                    ""
                  ) : (
                    <Dropdown type="primary" overlay={addStudentMenu} trigger={["hover"]}>
                      <Button type="primary">
                        <PlusOutlined />
                      </Button>
                    </Dropdown>
                  )
                ) : (
                  <Button type="primary" onClick={() => handleShowAddStudentPopup()}>
                    <PlusOutlined />
                  </Button>
                )}
              </div>
            </div>
          </div>
        }
      >
        {/* , display: "none" */}
        <>
          <div style={{ width: "8.25in", display: "none" }}>
            <ComponentToPrint ref={componentRef} />
          </div>

          <div style={{ width: "8.25in", display: "none" }}>
            <ComponentToPrintLetter ref={componentLetterRef} />
          </div>
          {/* <div>
            <span style={{ marginLeft: 8, position: "absolute" }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div> */}
          <Table
            rowSelection={rowSelection}
            columns={filteredColumns}
            dataSource={studentList}
            onChange={handleChangeTable}
            loading={fetchingAllUserListLoading}
            // scroll={{ y: "calc(100vh - 300px)", x: "1150" }}
            scroll={{
              y: height - 300,
              x: width - 300
            }}
            // width="max(1800px, calc(100vw - 60px))"
            // components={vt}
            pagination={false}
            size="middle"
            virtual
          />

          {isShowResetCounterConfirmationPopup && (
            <CounterResetConfirmationDialog
              close={handleCloseCounterResetConfirmationPopup}
              allStudentIDList={allStudentIDList}
              // selectedLevelLearningMode={selectedLevelLearningMode}
            />
          )}
          <ErrorBoundary>
            <TeacherWelcomeSteps closePopup={handleCloseStudentBulkCreatePopup} isOpenPopup={isOpenWelcomeStepPopup} />
          </ErrorBoundary>

          <ErrorBoundary>
            <TeacherWelcomeSteps2
              closePopup={handleCloseStudentPopup}
              isOpenPopup={OpenWelcomeStepPopup}
              studentUserList={studentUserList}
            />
          </ErrorBoundary>

          {isShowImportStudentPopup && (
            <ImportStudentListPopup isOpenPopup={isShowImportStudentPopup} closePopup={handleCloseUploadCSVPopup} />
          )}

          {/* {isShowClassCodeDialog && ( */}
          <ErrorBoundary>
            <ClassCodeDialog
              open={isShowClassCodeDialog}
              closeClassCodePopup={handleCloseClassCodeDialog}
              activeClassCode={false}
            />
          </ErrorBoundary>
          {/* )} */}
        </>
        {/* pagination
         {studentUserList.length > 0 && (
          <div className="table-pagination">
            <Pagination
              defaultCurrent={currentPage}
              total={totalStudents}
              onChange={handlePageChange}
              onShowSizeChange={handlePageLimitChange}
            />
          </div>
        )} */}
      </Section>
    </Container>
  );
};

export default StudentTable;
