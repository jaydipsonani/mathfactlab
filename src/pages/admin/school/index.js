import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Typography, Button, Dropdown, Space, Menu } from "antd";
import { PlusOutlined, DownOutlined, DownloadOutlined } from "@ant-design/icons";
// import ClassesWelcomeSteps from "components/ClassesWelcomeSteps";
import SchoolWelcomeSteps from "components/dashboard/SchoolWelcomeSteps";
import ErrorBoundary from "components/common/ErrorBoundary";
import SchoolDialog from "components/dashboard/SchoolDialog";
import Section from "components/common/Section";
import SchoolTable from "components/dashboard/SchoolTable";
import Container from "components/common/Container";
import DownloadCSV from "components/common/GenerateCSV";
import DeletePopup from "components/common/DeletePopup";
import { getSchool } from "../../../redux/actions/schoolAction";
import { fetchClassLinkClasses } from "../../../redux/actions";
import { removeSchool } from "../../../redux/actions/schoolAction";
import { getClassCodeListFromGoogleClassRoom } from "../../../redux/actions";
import { headerResetFilter } from "../../../redux/actions";
import { userRole } from "config/const";
import { roundToTwoDecimals, isNormalUser } from "utils/helpers";
import "assets/sass/components/button-ant.scss";

const { Title } = Typography;

const SchoolAdminSchoolPage = props => {
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const code = query.get("code");
  // const { enqueueSnackbar } = useSnackbar();
  const {
    userDetails,
    userDetails: { id }
  } = useSelector(({ auth }) => auth);

  const { searchText } = useSelector(({ header }) => header);
  const { classCodeList } = useSelector(({ classCode }) => classCode);

  const { schoolData, addNewSchoolLoading, editSchoolDataLoading } = useSelector(({ schoolData }) => schoolData);

  useEffect(() => {
    dispatch(headerResetFilter());
  }, []); // eslint-disable-line

  useEffect(() => {
    dispatch(getSchool(id));
  }, []); // eslint-disable-line

  const [isShowSchoolDialog, setIsShowSchoolDialog] = useState(false);
  // const [setIsShowSchoolDeleteDialog] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [setIsShowSelectClassDailog] = useState(false);
  const [setShowSelectClassLinkDialog] = useState(false);
  const [activeSchool, setActiveSchool] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [setIsShowClassroomSyncErrorDialog] = useState(false);

  //Edit class code Dialog Open
  const handleShowEditSchoolPopup = activeSchool => {
    setIsEditMode(true);
    setIsShowSchoolDialog(true);
    setActiveSchool(activeSchool);
  };

  const handleAddSchoolName = () => {
    setIsShowSchoolDialog(true);
    setIsEditMode(false);
    setActiveSchool({});
  };

  const actionButtonMenu = (
    <Menu>
      <Menu.Item
        onClick={() => handleExportToCsv()}
        id="actionBtnExportCSV"
        // eslint-disable-next-line react/no-unknown-property
        useful="actionBtnExportCSV"
      >
        <DownloadOutlined className="mr-5" />
        Export CSV
      </Menu.Item>
    </Menu>
  );

  const updateSchoolData = schoolData.map((school, index) => {
    const classListBySchool = classCodeList.filter(classItem => classItem.school_id === school.id);
    const totalStudentCount = classListBySchool.reduce((acc, current) => acc + current.students_count, 0);

    // session count ratio

    const totalSessionsCount = classListBySchool.reduce((acc, current) => acc + +current.students_sessions_count, 0);

    let studentSessionCountRatio = 0;

    if (totalSessionsCount && totalStudentCount) {
      studentSessionCountRatio = roundToTwoDecimals(totalSessionsCount / totalStudentCount);
    }

    //   // session mins ratio

    const totalTimeSpent = classListBySchool.reduce(
      (acc, current) => acc + +current.students_total_time_spent_in_mins,
      0
    );
    let studentTotalSessionMinRatio = 0;

    if (totalTimeSpent && totalStudentCount) {
      studentTotalSessionMinRatio = roundToTwoDecimals(totalTimeSpent / totalStudentCount);
    }
    // passed level lifter ration
    const passedLevelLifterCount = classListBySchool.reduce(
      (acc, current) => acc + +current.passed_level_lifter_submissions_count,
      0
    );
    let passedLevelLifterRatio = 0;

    if (passedLevelLifterCount && totalStudentCount) {
      passedLevelLifterRatio = roundToTwoDecimals(passedLevelLifterCount / totalStudentCount);
    }
    //CHANGE_THIS
    return Object.assign(
      { ...school },
      {
        classes_count: classListBySchool.length,
        students_count: totalStudentCount,
        students_sessions_count: studentSessionCountRatio,
        students_total_time_spent_in_mins: studentTotalSessionMinRatio,
        passed_level_lifter_submissions_count: passedLevelLifterRatio
      }
    );
  });
  // const handleConfirmDeleteClass = activeSchool => {
  //   Modal.confirm({
  //     title: (
  //       <>
  //         <span style={{ fontWeight: "500" }}>
  //           Are you sure you wish to delete School? <br />
  //           This will <span style={{ fontWeight: "700" }}>permanently delete</span> all student data for all NUMBER of
  //           the students in School
  //           <span style={{ fontWeight: "700" }}> {activeSchool.name}? </span> <br />
  //           Once deleted, student data cannot be recovered.
  //         </span>
  //       </>
  //     ),
  //     width: 500,
  //     icon: <DeleteOutlined style={{ color: "#fa1414" }} />,
  //     okText: "Delete",
  //     cancelText: "Cancel",
  //     maskClosable: true,
  //     // okButtonProps: { size: 'middle', type: 'danger' },
  //     okButtonProps: {
  //       size: "middle",
  //       type: "danger",
  //       style: {
  //         backgroundColor: "#ff4d4f",
  //         borderColor: "#ff4d4f",
  //         color: "white"
  //       }
  //     },

  //     // cancelButtonProps: { size: 'small' },

  //     onOk() {
  //       dispatch(removeSchool(activeSchool.id));
  //     }
  //   });
  // };

  //csv download data
  const handleExportToCsv = () => {
    const csvData = !!updateSchoolData.length
      ? updateSchoolData.map((school, i) => {
          const classListBySchool = classCodeList.filter(classItem => classItem.school_id === school.id);
          const totalStudentCount = classListBySchool.reduce((acc, current) => acc + current.students_count, 0);
          // session count ratio
          const totalSessionsCount = classListBySchool.reduce(
            (acc, current) => acc + +current.students_sessions_count,
            0
          );

          let studentSessionCountRatio = 0;

          if (totalSessionsCount && totalStudentCount) {
            studentSessionCountRatio = roundToTwoDecimals(totalSessionsCount / totalStudentCount);
          }

          // session mins ratio

          const totalTimeSpent = classListBySchool.reduce(
            (acc, current) => acc + +current.students_total_time_spent_in_mins,
            0
          );
          let studentTotalSessionMinRatio = 0;

          if (totalTimeSpent && totalStudentCount) {
            studentTotalSessionMinRatio = roundToTwoDecimals(totalTimeSpent / totalStudentCount);
          }
          // passed level lifter ration
          const passedLevelLifterCount = classListBySchool.reduce(
            (acc, current) => acc + +current.passed_level_lifter_submissions_count,
            0
          );
          let passedLevelLifterRatio = 0;

          if (passedLevelLifterCount && totalStudentCount) {
            passedLevelLifterRatio = roundToTwoDecimals(passedLevelLifterCount / totalStudentCount);
          }
          const name = "School Name";
          const code = "Class Code";
          const administrator = "Administrator(s)";
          const classes = "Classes";
          const student = "Students";
          const passed_level_lifter_submissions_count_title = "Passed levels per student";
          const students_sessions_count_title = "Sessions per student";
          const students_total_time_spent_in_mins_title = "Minutes per student";

          return {
            [name]: school.name || "",
            [code]: school.school_code_identifier || "",
            [administrator]: school.access_user_emails,

            [classes]: school.classes_count || 0,

            [student]: school.students_count || 0,
            [passed_level_lifter_submissions_count_title]: passedLevelLifterRatio || 0,
            [students_sessions_count_title]: studentSessionCountRatio || 0,
            [students_total_time_spent_in_mins_title]: studentTotalSessionMinRatio || 0
          };
        })
      : [];

    DownloadCSV({
      csvData,
      exportFileName: `School`
    });
  };
  //Close class code Dialog close
  const handleCloseClassCodeDialog = () => {
    setIsShowSchoolDialog(false);
  };

  //Show Delete Confirmation Dialog open

  const handleDeleteConfirm = () => {
    dispatch(removeSchool(activeSchool.id));
    setDeletePopupVisible(false);
  };

  const handleShowDeleteSchoolPopup = activeSchool => {
    setActiveSchool(activeSchool);
    setDeletePopupVisible(true);
  };

  const handleCloseDeleteSchoolPopup = () => {
    setDeletePopupVisible(false);
  };

  const handleShowClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(true);
  };
  const handleCloseClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(false);
  };
  const handleCallBackSyncToGoogle = message => {
    handleShowClassroomSyncErrorDailog();
  };

  //Show Class selection  dialog
  const handleShowClassSelectDailog = () => {
    handleCloseClassroomSyncErrorDailog(false);
    setIsShowSelectClassDailog(true);
  };

  //Import data from google class rome
  const handleImportDataFromGoogle = body => {
    dispatch();
    getClassCodeListFromGoogleClassRoom(body, handleShowClassSelectDailog, handleCallBackSyncToGoogle);
  };

  useEffect(() => {
    if (code) {
      handleImportDataFromGoogle({
        code: code,
        requested_url: location.pathname
      });
    }
  }, [code]); // eslint-disable-line

  const [isOpenWelcomeStepPopup, setOpenWelcomeStepPopup] = useState(false);
  const isShowWelcome = query.get("is_show_school_welcome_popup") === "true";

  useEffect(() => {
    if (
      (userDetails.role_id === userRole.SCHOOL_ADMIN.role_id &&
        userDetails.profile.type === "primary" &&
        userDetails.login_count <= 1 &&
        localStorage.getItem("is_show_school_welcome_popup") !== "true") ||
      isShowWelcome
    ) {
      setOpenWelcomeStepPopup(true);
    }
  }, []); // eslint-disable-line

  const handleCloseStudentBulkCreatePopup = () => {
    setOpenWelcomeStepPopup(false);
    localStorage.setItem("is_show_school_welcome_popup", true);
  };

  const classLinkClassesFetchSuccess = () => {
    setShowSelectClassLinkDialog(true);
  };

  const handleSyncClassLinkClasses = () => {
    dispatch(fetchClassLinkClasses(classLinkClassesFetchSuccess));
  };

  // Filter Classcode list by searchbox
  // filter by search bar

  let updatedClassCodeList = schoolData;
  if (searchText) {
    updatedClassCodeList = schoolData.filter(classRow => {
      return classRow.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  return (
    <>
      {/* <Helmet>
        <title>Classes | MathFact Lab</title>

      </Helmet> */}

      <Container fluid>
        <Section
          // title={`Classes (${classCodeList.length})`}
          title={
            <>
              <Title level={4} className={"tab-heading"}>
                Schools
                <span className="table-header-counter">
                  <Tag> {updatedClassCodeList?.length}</Tag>
                </span>
              </Title>
            </>
          }
          extra={
            <div className="google-classroom-section">
              {location.pathname === "/teacher/classes" && !!userDetails.class_link_sourced_id && (
                <Button type="primary" className="mr-10" onClick={handleSyncClassLinkClasses}>
                  Sync with Class Link
                </Button>
              )}
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

              {userDetails.profile.type === "primary" && isNormalUser(userDetails) ? (
                <Button type="primary" onClick={() => handleAddSchoolName()} className="joyride-2">
                  Add School <PlusOutlined />
                </Button>
              ) : (
                ""
              )}
            </div>
          }
        >
          <ErrorBoundary>
            <SchoolTable
              showDeleteSchoolDialog={handleShowDeleteSchoolPopup}
              showEditSchoolDialog={handleShowEditSchoolPopup}
              searchText={searchText}
              schoolData={updatedClassCodeList}
            />
          </ErrorBoundary>

          {/* <ErrorBoundary>
            <ClassesWelcomeSteps
              closePopup={handleCloseStudentBulkCreatePopup}
              isOpenPopup={isOpenWelcomeStepPopup}
            />
          </ErrorBoundary> */}

          <ErrorBoundary>
            <SchoolWelcomeSteps closePopup={handleCloseStudentBulkCreatePopup} isOpenPopup={isOpenWelcomeStepPopup} />
          </ErrorBoundary>
          {/* {isShowSchoolDialog ? ( */}
          <ErrorBoundary>
            <SchoolDialog
              open={isShowSchoolDialog}
              closeClassCodePopup={handleCloseClassCodeDialog}
              isEditMode={isEditMode}
              activeSchool={activeSchool}
              loading={addNewSchoolLoading || editSchoolDataLoading}
            />
          </ErrorBoundary>
          {/* ) : (
                        ''
                    )} */}
            {isDeletePopupVisible && (
              <DeletePopup
                open={isDeletePopupVisible}
                success={handleDeleteConfirm}
                text={
                  <span style={{ fontWeight: "500" }}>
                    Are you sure you wish to delete School? <br />
                    This will <span style={{ fontWeight: "700" }}>permanently delete</span> all student data for all
                    NUMBER of the students in School
                    <span style={{ fontWeight: "700" }}> {activeSchool.name}? </span> <br />
                    Once deleted, student data cannot be recovered.
                  </span>
                }
                close={handleCloseDeleteSchoolPopup}
              />
            )}
        </Section>
      </Container>
    </>
  );
};

export default SchoolAdminSchoolPage;
