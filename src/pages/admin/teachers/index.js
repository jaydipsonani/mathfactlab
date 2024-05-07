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
import DeletePopup from "components/common/DeletePopup";
import ErrorBoundary from "components/common/ErrorBoundary";
import Section from "components/common/Section";
import Container from "components/common/Container";
import TeacherDialog from "components/dashboard/TeacherDailog";
import TeacherTable from "components/dashboard/TechersTable";
import ClassesWelcomeSteps from "components/dashboard/ClassesWelcomeSteps";
import ClassCodeDialog from "components/dashboard/ClassCodeDialog";
import ImportTeacherListPopup from "components/dashboard/ImportTeacherListPopup";
import DownloadCSV from "components/common/GenerateCSV";
import { userRole } from "config/const";
import "assets/sass/components/button-ant.scss";
import { getTeacher, deleteTeacher } from "../../../redux/actions/teacherAction";
import { headerResetFilter } from "../../../redux/actions/headerAction";
import { getClassCodeList, getClassCodeListFromGoogleClassRoom } from "../../../redux/actions/classCodeAction";
import { getSchool } from "../../../redux/actions/schoolAction";

const { Title } = Typography;

const SchoolAdminTeacherPage = props => {
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const code = query.get("code");
  const teacherClassCode = +query.get("class_code");

  const { searchClassCode: selectedClassCode } = useSelector(({ header }) => header);
  const { searchSchoolId } = useSelector(({ header }) => header);
  const {
    userDetails: { role_id }
  } = useSelector(({ auth }) => auth);

  const { searchText } = useSelector(({ header }) => header);

  const { teacherData } = useSelector(({ teacherData }) => teacherData);

  const { classCodeList } = useSelector(({ classCode }) => classCode);

  const [isShowTeacherPopup, setIsShowTeacherPopup] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [setIsShowSelectTeacherDialog] = useState(false);

  const [setIsShowClassroomSyncErrorDialog] = useState(false);

  const [selectedTeacherData, setSelectedTeacherData] = useState(false);
  const [isShowClassCodeDialog, setIsShowClassCodeDialog] = useState(false);

  const [isOpenWelcomeStepPopup, setOpenWelcomeStepPopup] = useState(false);
  const [isShowImportStudentPopup, setIsShowImportStudentPopup] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [activeUser, setActiveUser] = useState(false);

  const handleCloseStudentBulkCreatePopup = () => {
    setOpenWelcomeStepPopup(false);
  };
  useEffect(() => {
    dispatch(headerResetFilter());
  }, []); // eslint-disable-line

  useEffect(() => {
    dispatch(getTeacher());
  }, []); // eslint-disable-line

  useEffect(() => {
    dispatch(getSchool());
  }, []); // eslint-disable-line
  // useEffect(() => {
  //   if (
  //     userDetails.role_name === userRole.SCHOOL_ADMIN.role_name &&
  //     userDetails.profile.type === "primary" &&
  //     userDetails.login_count <= 2 &&
  //     localStorage.getItem("is_show_student_step_popup") !== "true"
  //   ) {
  //     setOpenWelcomeStepPopup(true);
  //   }
  // }, []); // eslint-disable-line
  useEffect(() => {
    !classCodeList.length && dispatch(getClassCodeList());
  }, [classCodeList.length]); // eslint-disable-line

  const addStudentMenu = (
    <Menu>
      <Menu.Item onClick={() => handleShowTeacherDialog()}>
        <UserAddOutlined className="mr-5" /> Add Single Teacher
      </Menu.Item>
      {/* {process.env.REACT_APP_ENV === "development" ? (
        <Menu.Item onClick={() => setOpenWelcomeStepPopup(true)}>
          <UsergroupAddOutlined className="mr-5" /> Add Multiple Teachers
        </Menu.Item>
      ) : (
        ""
      )} */}
      <Menu.Item onClick={() => setIsShowImportStudentPopup(true)}>
        <UsergroupAddOutlined className="mr-5" /> Bulk Teacher Import
      </Menu.Item>
    </Menu>
  );

  const handleShowDeleteTeacherPopup = teacher => {
    setActiveUser(teacher);
    setDeletePopupVisible(true);
  };

  const handleDeleteConfirm = () => {
    // Implement your delete logic here
    dispatch(deleteTeacher(activeUser.user_id));
    setDeletePopupVisible(false);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopupVisible(false);
  };

  // Show teacher popup
  const handleShowTeacherDialog = () => {
    setIsShowTeacherPopup(true);
    setIsEditMode(false);
  };

  // Close teacher popup
  const handleCloseTeacherDialog = teacherList => {
    setIsShowTeacherPopup(false);
    setIsShowClassCodeDialog(false);
  };
  //show classDialog
  const handleShowClassDialog = () => {
    setIsShowClassCodeDialog(!isShowClassCodeDialog);
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
    setIsShowSelectTeacherDialog(true);
  };

  //Edit Teacher Dialog Open
  const handleShowEditTeacherPopup = teacherData => {
    setSelectedTeacherData(teacherData);
    setIsShowTeacherPopup(true);
    setIsEditMode(true);
  };

  const handleCloseUploadCSVPopup = () => {
    setIsShowImportStudentPopup(false);
  };

  //Import data from google class rome
  const handleImportDataFromGoogle = body => {
    dispatch(getClassCodeListFromGoogleClassRoom(body, handleShowClassSelectDialog, handleCallBackSyncToGoogle));
  };

  useEffect(() => {
    if (code) {
      handleImportDataFromGoogle({
        code: code,
        requested_url: location.pathname
      });
    }
  }, [code]); // eslint-disable-line

  // filter by search bar
  let updatedTeacherList = teacherData;
  if (searchText) {
    updatedTeacherList = teacherData.filter(classCode => {
      return classCode.profile.first_name.toLowerCase().includes(searchText);
    });
  }
  if (selectedClassCode) {
    updatedTeacherList = teacherData.filter(classCode => {
      return classCode.id.toLowerCase().includes(selectedClassCode);
    });
  }

  if (searchSchoolId) {
    const classCodeListBySelectedSchool = classCodeList
      .filter(classCode => {
        return classCode.school_code_identifier === +searchSchoolId;
      })
      .map(classData => classData.class_code);

    updatedTeacherList = teacherData.filter(std => {
      return std.classes.ids.split(",").some(classData => classCodeListBySelectedSchool.includes(classData.class_code));
    });
  }
  // const handleConfirmDeleteTeacher = teacher => {
  //   Modal.confirm({
  //     title: (
  //       <>
  //         <span style={{ fontWeight: "500" }}>
  //           Are you sure you wish to delete{" "}
  //           <b>
  //             {teacher.profile.first_name} {teacher.profile.last_name}’s
  //           </b>{" "}
  //           teacher account?
  //           <br />
  //         </span>
  //       </>
  //     ),
  //     width: 500,
  //     icon: <DeleteOutlined style={{ color: "#fa1414" }} />,
  //     okText: "Delete",
  //     cancelText: "Cancel",
  //     maskClosable: true,
  //     // okButtonProps: { size: "small", type: "danger" },
  //     // cancelButtonProps: { size: "small" },

  //     onOk() {
  //       dispatch(deleteTeacher(teacher.user_id));
  //     }
  //   });
  // };
  //change class_code name in header:
  const selectedClass = classCodeList.find(
    classObj => classObj.class_code === selectedClassCode || classObj.class_code === teacherClassCode + ""
  );
  const handleExportToCsv = () => {
    const csvData = !!updatedTeacherList.length
      ? updatedTeacherList.map((teacher, i) => {
          const first_name = "Name";
          const email = "Email";
          const classes = "Class(es)";
          const is_email_verified = "Invitation";

          return {
            [first_name]: `${teacher.profile?.last_name} ${teacher.profile?.first_name}` || "",
            [email]: teacher.email || "",
            // [classes]:
            //   teacher.classes.map(classObj => classObj.name).join(", ") || "",
            [classes]: teacher.classes?.names,

            [is_email_verified]: teacher.is_email_verified === 1 ? "Accepted" : "Invite Sent" || ""
          };
        })
      : [];

    DownloadCSV({
      csvData,
      exportFileName: `Teacher`
    });
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

  return (
    <>
      <Container fluid>
        <Section
          title={
            <>
              <Title level={4} className={"tab-heading"}>
                {selectedClass?.name ? `${selectedClass.name}'s ` : role_id === userRole.PARENT.role_id ? "Your" : ""}{" "}
                {role_id === userRole.PARENT.role_id ? "children" : "Teachers"}
                <span className="table-header-counter">
                  <Tag> {updatedTeacherList?.length}</Tag>
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

                {/* <div className="joyride-4">
                  <Button
                    type="primary"
                    onClick={() => handleShowTeacherDialog()}
                  >
                    Add Teacher <PlusOutlined />
                  </Button>
                </div> */}

                <div className="joyride-4">
                  <Dropdown type="primary" overlay={addStudentMenu} trigger={["hover"]}>
                    <Button type="primary">
                      Add Teacher <PlusOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
          }
        >
          <ErrorBoundary>
            <TeacherTable
              teacherData={updatedTeacherList}
              showEditTeacherDialog={handleShowEditTeacherPopup}
              showDeleteTeacherDialog={handleShowDeleteTeacherPopup}
              selectedTeacherData={selectedTeacherData}
              searchClassCode={selectedClassCode}
              classCodeList={classCodeList}
            />
          </ErrorBoundary>
          {/* {isShowTeacherPopup && ( */}
          <ErrorBoundary>
            <TeacherDialog
              closeTeacherDialog={handleCloseTeacherDialog}
              isEditMode={isEditMode}
              activeUser={selectedTeacherData}
              searchClassCode={selectedClassCode}
              setIsShowClassCodeDialog={handleShowClassDialog}
              open={isShowTeacherPopup}
            />
          </ErrorBoundary>
          {/* )} */}
          {<ClassesWelcomeSteps closePopup={handleCloseStudentBulkCreatePopup} isOpenPopup={isOpenWelcomeStepPopup} />}
          {isShowImportStudentPopup && (
            <ImportTeacherListPopup isOpenPopup={isShowImportStudentPopup} closePopup={handleCloseUploadCSVPopup} />
          )}
          {/* {isShowClassCodeDialog ? ( */}
          <ErrorBoundary>
            <ClassCodeDialog
              open={isShowClassCodeDialog}
              closeClassCodePopup={handleCloseTeacherDialog}
              isEditMode={false}
              activeClassCode={""}
              selectedSchool={searchSchoolId}
              setIsShowClassCodeDialog={handleShowClassDialog}
            />
          </ErrorBoundary>
          {/* ) : (
            ""
          )} */}
          {isDeletePopupVisible && (
            <DeletePopup
              open={isDeletePopupVisible}
              success={handleDeleteConfirm}
              text={
                <span style={{ fontWeight: "500" }}>
                  Are you sure you wish to delete{" "}
                  <b>
                    {activeUser?.profile?.first_name} {activeUser?.profile?.last_name}’s
                  </b>{" "}
                  teacher account?
                  <br />
                </span>
              }
              close={handleCloseDeletePopup}
            />
          )}
        </Section>
      </Container>
    </>
  );
};

export default SchoolAdminTeacherPage;
