import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Tag, Typography, Dropdown, Button, Space, Menu } from "antd";
import {
  PlusOutlined,
  DownOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import ClassCodeDialog from "components/dashboard/ClassCodeDialog";
import DownloadCSV from "components/common/GenerateCSV";
import ErrorBoundary from "components/common/ErrorBoundary";
import Section from "components/common/Section";
import SchoolAdminClassTable from "components/dashboard/SchoolAdminClassTable";
import Container from "components/common/Container";
import ClassesWelcomeSteps from "components/dashboard/ClassesWelcomeSteps";
import ImportClassesListPopup from "components/dashboard/ImportClassesListPopup";
import "assets/sass/components/button-ant.scss";
import {
  removeClassCode,
  getClassCodeList,
  getClassCodeListFromGoogleClassRoom
} from "../../../redux/actions/classCodeAction";
import { headerResetFilter, getSchool } from "../../../redux/actions";
import { roundToTwoDecimals } from "utils/helpers";
import DeletePopup from "components/common/DeletePopup";
const { Title } = Typography;

const SchoolAdminClassesPage = props => {
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const {
    userDetails: { id },
    userDetails
  } = useSelector(({ auth }) => auth);
  const code = query.get("code");

  const { searchText } = useSelector(({ header }) => header);
  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { searchSchoolId } = useSelector(({ header }) => header);
  const { schoolData } = useSelector(({ schoolData }) => schoolData);
  const [activeClassCode, setActiveClassCode] = useState(false);

  useEffect(() => {
    dispatch(headerResetFilter());
  }, []); // eslint-disable-line

  useEffect(() => {
    !classCodeList.length && dispatch(getClassCodeList());
  }, [classCodeList.length]); // eslint-disable-line
  //   useEffect(() => {
  //     // Check if classCodeList is undefined or has zero length
  //     if (!classCodeList || classCodeList.length === 0) {
  //       dispatch(getClassCodeList());
  //     }
  //   }, [classCodeList, dispatch]);

  useEffect(() => {
    !schoolData.length && dispatch(getSchool(id));
  }, [schoolData.length]); // eslint-disable-line

  const [setIsShowSelectClassCodeDialog] = useState(false);

  const [setIsShowClassroomSyncErrorDialog] = useState(false);
  const [isShowClassCodeDialog, setIsShowClassCodeDialog] = useState(false);
  const [isOpenWelcomeStepPopup, setOpenWelcomeStepPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isShowImportClassesPopup, setIsShowImportClassesPopup] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);

  //Edit class code Dialog Open
  const handleShowEditClassCodePopup = activeClassCode => {
    setIsShowClassCodeDialog(true);
    setIsEditMode(true);
    setActiveClassCode(activeClassCode);
  };
  const handleShowDeleteSchoolPopup = activeClassCode => {
    setActiveClassCode(activeClassCode);
    setDeletePopupVisible(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(removeClassCode(activeClassCode.id));
    setDeletePopupVisible(false);
  };

  const handleCloseDeleteClassCodePopup = () => {
    setDeletePopupVisible(false);
  };

  const handleShowClassroomSyncErrorDialog = () => {
    setIsShowClassroomSyncErrorDialog(true);
  };
  const handleCloseClassroomSyncErrorDialog = () => {
    setIsShowClassroomSyncErrorDialog(false);
  };
  const handleCallBackSyncToGoogle = message => {
    handleShowClassroomSyncErrorDialog();
  };

  //Show Class selection  dialog
  const handleShowClassSelectDialog = () => {
    handleCloseClassroomSyncErrorDialog(false);
    setIsShowSelectClassCodeDialog(true);
  };

  //Import data from google class rome
  const handleImportDataFromGoogle = body => {
    dispatch();
    getClassCodeListFromGoogleClassRoom(body, handleShowClassSelectDialog, handleCallBackSyncToGoogle);
  };

  useEffect(() => {
    if (code) {
      handleImportDataFromGoogle({
        code: code,
        requested_url: location.pathname
      });
    }
  }, [code]); // eslint-disable-line

  // Show teacher popup
  const handleShowClassCodeDialog = () => {
    setIsShowClassCodeDialog(true);
    setIsEditMode(false);
  };
  const handleExportToCsv = () => {
    const csvData = !!updatedClassCodeList.length
      ? updatedClassCodeList.map((classObj, i) => {
          const {
            passed_level_lifter_submissions_count,
            students_count,
            students_sessions_count,
            students_total_time_spent_in_mins
          } = classObj;

          let passedLevelLifterRatio = 0;

          if (+passed_level_lifter_submissions_count && students_count) {
            passedLevelLifterRatio = roundToTwoDecimals(+passed_level_lifter_submissions_count / students_count);
          }

          let studentSessionCountRatio = 0;

          if (+students_sessions_count && students_count) {
            studentSessionCountRatio = roundToTwoDecimals(+students_sessions_count / students_count);
          }
          let studentTotalSessionMinRatio = 0;

          if (+students_total_time_spent_in_mins && students_count) {
            studentTotalSessionMinRatio = roundToTwoDecimals(+students_total_time_spent_in_mins / students_count);
          }

          const name = "Class Name";
          const class_code = "Class Code";
          const student_count = "Students";
          const school = "School";
          const students_with_add_sub_learning_mode_count = "Add/Sub Level";
          const students_with_mul_div_learning_mode_count = "Mul/Div Level";
          const passed_level_lifter_submissions_count_title = "Passed levels per student";
          const students_sessions_count_title = "Sessions per student";
          const students_total_time_spent_in_mins_title = "Minutes per student";
          return {
            [name]: classObj.name || "",
            [class_code]: classObj.class_code || "",
            [school]: classObj.school?.name || "",
            [student_count]: classObj.students_count || 0,
            [students_with_add_sub_learning_mode_count]: classObj.students_with_add_sub_learning_mode_count || 0,
            [students_with_mul_div_learning_mode_count]: classObj.students_with_mul_div_learning_mode_count || 0,
            [passed_level_lifter_submissions_count_title]: passedLevelLifterRatio || 0,
            [students_sessions_count_title]: studentSessionCountRatio || 0,
            [students_total_time_spent_in_mins_title]: studentTotalSessionMinRatio || 0
          };
        })
      : [];

    DownloadCSV({
      csvData,
      exportFileName: `Classes`
    });
  };
  // const handleConfirmDeleteClassCode = activeClassCode => {
  //   Modal.confirm({
  //     title: (
  //       <>
  //         <span style={{ fontWeight: "500" }}>
  //           Are you sure you wish to delete <span style={{ fontWeight: "700" }}>{activeClassCode.name}</span> <br />
  //           This will <span style={{ fontWeight: "700" }}>permanently delete</span> all student data for all{" "}
  //           {activeClassCode.students_count} of the students in{" "}
  //           <span style={{ fontWeight: "700" }}>{activeClassCode.name}?</span> <br />
  //           Once deleted, student data cannot be recovered.
  //         </span>
  //       </>
  //     ),
  //     width: 500,
  //     icon: <DeleteOutlined style={{ color: "#fa1414" }} />,
  //     okText: "Delete",
  //     cancelText: "Cancel",
  //     maskClosable: true,
  //     okButtonProps: { type: "danger" },
  //     // cancelButtonProps: { size: "small" },

  //     onOk() {
  //       dispatch(removeClassCode(activeClassCode.id));
  //     }
  //   });
  // };
  const addClassesMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleShowClassCodeDialog()}>
        <UserAddOutlined className="mr-5" /> Create Single Class
      </Menu.Item>

      <Menu.Item key="2" onClick={() => setIsShowImportClassesPopup(true)}>
        <UsergroupAddOutlined className="mr-5" /> Bulk Class Import
      </Menu.Item>
    </Menu>
  );
  const handleCloseUploadCSVPopup = () => {
    setIsShowImportClassesPopup(false);
  };

  let updatedClassCodeList = classCodeList;
  if (searchText) {
    updatedClassCodeList = classCodeList.filter(classCode => {
      return classCode.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  if (searchSchoolId) {
    updatedClassCodeList = classCodeList.filter(classCode => {
      return classCode.school_id === searchSchoolId;
    });
  }

  const actionButtonMenu = (
    <Menu>
      <Menu.Item
        key="actionBtnExportCSV"
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
  const handleCloseStudentBulkCreatePopup = () => {
    setOpenWelcomeStepPopup(false);
  };

  //Close class code Dialog close
  const handleCloseClassCodeDialog = () => {
    setIsShowClassCodeDialog(false);
  };

  return (
    <>
      <Container fluid>
        <Section
          title={
            <>
              <Title level={4} className={"tab-heading"}>
                Classes
                <span className="table-header-counter">
                  <Tag> {updatedClassCodeList?.length}</Tag>
                </span>
              </Title>
            </>
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
                  {/* {isDevOrAlphaEnv ||
                  userDetails?.profile?.type === "primary" ? ( */}
                  <Dropdown type="primary" overlay={addClassesMenu} trigger={["hover"]}>
                    <Button
                      type="primary"
                      // onClick={() => handleShowClassCodeDialog()}
                    >
                      Add Class <PlusOutlined />
                    </Button>
                  </Dropdown>
                  {/* ) : (
                    ""
                  )} */}
                </div>
              </div>
            </div>
          }
        >
          {/* {user} */}

          {!userDetails?.classlink_tenant_sourced_id ? (
            <ErrorBoundary>
              <ClassesWelcomeSteps
                closePopup={handleCloseStudentBulkCreatePopup}
                isOpenPopup={isOpenWelcomeStepPopup}
              />
            </ErrorBoundary>
          ) : (
            ""
          )}

          <ErrorBoundary>
            <SchoolAdminClassTable
              showDeleteSchoolDialog={handleShowDeleteSchoolPopup}
              showEditSchoolDialog={handleShowEditClassCodePopup}
              searchText={searchText}
              classCodeList={updatedClassCodeList}
            />
          </ErrorBoundary>

          {/* {isShowClassCodeDialog ? ( */}
          <ErrorBoundary>
            <ClassCodeDialog
              open={isShowClassCodeDialog}
              closeClassCodePopup={handleCloseClassCodeDialog}
              isEditMode={isEditMode}
              activeClassCode={activeClassCode}
              selectedSchool={searchSchoolId}
            />
          </ErrorBoundary>
          {/* ) : (
            ""
          )} */}
          {isShowImportClassesPopup && (
            <ImportClassesListPopup isOpenPopup={isShowImportClassesPopup} closePopup={handleCloseUploadCSVPopup} />
          )}
          {isDeletePopupVisible && (
            <DeletePopup
              open={isDeletePopupVisible}
              success={handleDeleteConfirm}
              text={
                <span style={{ fontWeight: "500" }}>
                  Are you sure you wish to delete <span style={{ fontWeight: "700" }}>{activeClassCode.name}</span>{" "}
                  <br />
                  This will <span style={{ fontWeight: "700" }}>permanently delete</span> all student data for all{" "}
                  {activeClassCode.students_count} of the students in{" "}
                  <span style={{ fontWeight: "700" }}>{activeClassCode.name}?</span> <br />
                  Once deleted, student data cannot be recovered.
                </span>
              }
              close={handleCloseDeleteClassCodePopup}
            />
          )}
        </Section>
      </Container>
    </>
  );
};

export default SchoolAdminClassesPage;
