import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useSnackbar } from "notistack";
import { Tag, Typography, Button, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import ClassCodeTable from "components/dashboard/ClassCodeTable";
import ClassCodeDialog from "components/dashboard/ClassCodeDialog";
import ConfirmationClassCodeDialog from "components/dashboard/ConfirmationClassCodeDialog";
import ErrorBoundary from "components/common/ErrorBoundary";
import ClassroomSyncErrorPopup from "components/common/Button/ClassroomSyncErrorPopup";
import SyncDialog from "components/common/SyncDialog";
import SelectClassDailog from "components/dashboard/ClassListSelectionDialog";
import ClassLinkClassesSelectionDialog from "components/dashboard/ClassLinkClassesSelectionDialog";
import Section from "components/common/Section";
import Container from "components/common/Container";
import { useDispatch, useSelector } from "react-redux";
import classRoomImg from "assets/images/google-classroom.svg";
import {
  getClassCodeListFromGoogleClassRoom,
  getClassCodeList,
  headerResetFilter,
  fetchClassLinkClasses,
  removeClassCode
} from "../../../redux/actions";
import { googleScopeClassroom } from "config/const";
import "assets/sass/components/button-ant.scss";

const { Title } = Typography;

const TeacherClassesPage = props => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const code = query.get("code");
  // const { enqueueSnackbar } = useSnackbar();
  const { userDetails } = useSelector(({ auth }) => auth);

  const { searchText } = useSelector(({ header }) => header);

  const {
    classCodeList,
    deleteClassCodeLoading,
    fetchingAllClassCodeListFromGoogleClassRoomLoading,
    fetchingClassLinkClassListLoading
  } = useSelector(state => state.classCode);

  useEffect(() => {
    dispatch(headerResetFilter());
  }, []); // eslint-disable-line

  useEffect(() => {
    !classCodeList.length && dispatch(getClassCodeList());
  }, [classCodeList.length]); // eslint-disable-line

  const [isShowClassCodeDialog, setIsShowClassCodeDialog] = useState(false);
  const [isShowClassCodeDeleteDialog, setIsShowClassCodeDeleteDialog] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [activeClassCode, setActiveClassCode] = useState(false);
  const [isShowSelectClassDailog, setIsShowSelectClassDailog] = useState(false);
  const [isShowSelectClassLinkDialog, setShowSelectClassLinkDialog] = useState(false);

  const [isShowClassroomSyncErrorDialog, setIsShowClassroomSyncErrorDialog] = useState(false);

  //Edit class code Dialog Open
  const handleShowEditClassCodePopup = activeClassCode => {
    setIsEditMode(true);
    setIsShowClassCodeDialog(true);
    setActiveClassCode(activeClassCode);
  };

  //Close class code Dialog close
  const handleCloseClassCodeDialog = () => {
    setIsShowClassCodeDialog(false);
  };

  //Show Delete Confirmation Dialog open
  const handleShowDeleteClassCodePopup = activeClassCode => {
    // setIsShowClassCodeDeleteDialog(true);
    setActiveClassCode(activeClassCode);
    handleConfirmDeleteClass(activeClassCode);
  };
  const handleConfirmDeleteClass = activeClassCode => {
    Modal.confirm({
      title: (
        <>
          <span style={{ fontWeight: "500" }}>
            Are you sure you wish to delete Class? <br />
            This will <span style={{ fontWeight: "700" }}>permanently delete</span> all student data for all{" "}
            {activeClassCode.students_count} of the students in{" "}
            <span style={{ fontWeight: "700" }}>{activeClassCode.name}?</span> <br />
            Once deleted, student data cannot be recovered.
          </span>
        </>
      ),
      width: 500,
      icon: <DeleteOutlined style={{ color: "#fa1414" }} />,
      okText: "Delete",
      cancelText: "Cancel",
      maskClosable: true,
      okButtonProps: { size: "small", danger: true },
      cancelButtonProps: { size: "small" },
      onOk() {
        dispatch(removeClassCode(activeClassCode.id, handleCloseDeleteClassCodePopup));
      }
      // onCancel() {
      //   close();
      // },
    });
  };
  //Close Delete Confirmation Dialog close
  const handleCloseDeleteClassCodePopup = activeClassCode => {
    setIsShowClassCodeDeleteDialog(false);
  };

  //delete api call
  const handleDeleteClassCode = () => {
    dispatch();
    // removeClassCode(activeClassCode.id, handleCloseDeleteClassCodePopup),
  };

  const handleShowClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(true);
  };
  const handleCloseClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(false);
  };
  const handleCallBackSyncToGoogle = message => {
    // enqueueSnackbar(message, {
    //   variant: "error",
    //   anchorOrigin: { vertical: "bottom", horizontal: "left" },
    // });
    handleShowClassroomSyncErrorDailog();
  };

  //Show Class selection  dialog
  const handleShowClassSelectDailog = () => {
    handleCloseClassroomSyncErrorDailog(false);
    setIsShowSelectClassDailog(true);
  };

  //Show Class selection  dialog
  const handleCloseClassSelectDailog = () => {
    handleCloseClassroomSyncErrorDailog();
    navigate("/teacher/classes");
  };

  //Close Class selection  dialog
  const handleCloseClassSelectionDailog = () => {
    setIsShowSelectClassDailog(false);
  };

  //Import data from google class rome
  const handleImportDataFromGoogle = body => {
    dispatch(getClassCodeListFromGoogleClassRoom(body, handleShowClassSelectDailog, handleCallBackSyncToGoogle));
  };

  useEffect(() => {
    if (code) {
      handleImportDataFromGoogle({
        code: code,
        requested_url: location.pathname
      });
      navigate(location.pathname, { replace: true });
    }
  }, [code]); // eslint-disable-line

  const classLinkClassesFetchSuccess = () => {
    setShowSelectClassLinkDialog(true);
  };
  //close class link classes dialog
  const handleCloseClassLinkSelectionDailog = () => {
    setShowSelectClassLinkDialog(false);
  };

  const handleSyncClassLinkClasses = () => {
    dispatch(fetchClassLinkClasses(classLinkClassesFetchSuccess));
  };

  const handleAddclassName = () => {
    setIsEditMode(false);
    setIsShowClassCodeDialog(true);
  };
  // const handleAddclassNameDemo = () => {
  //   setPopupShow(true);
  // };

  // Filter Classcode list by searchbox
  // filter by search bar

  let updatedClassCodeList = classCodeList;
  if (searchText) {
    updatedClassCodeList = classCodeList.filter(classCode => {
      return classCode.name.toLowerCase().includes(searchText);
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
                Classes
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
                  Sync with ClassLink
                </Button>
              )}
              {location.pathname === "/teacher/classes" &&
              !!userDetails.google_user_id &&
              !userDetails.school_district_id ? (
                !userDetails.google_access_token_id ? (
                  <>
                    <a
                      // className="search with-button btn-google-classroom js-sync-google-classrooms"
                      // href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${process.env.REACT_APP_GOOGLE_SCOPE}&include_granted_scopes=true&redirect_uri=${process.env.REACT_APP_FRONTEND_REDIRECT_URL}/teacher/login&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code`}
                      href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${googleScopeClassroom.join(
                        "%20"
                      )}&include_granted_scopes=true&redirect_uri=${
                        process.env.REACT_APP_FRONTEND_REDIRECT_URL
                      }/teacher/classes&client_id=${
                        process.env.REACT_APP_GOOGLE_CLIENT_ID
                      }&response_type=code&access_type=offline&prompt=consent`}
                    >
                      <Button
                        type="primary"
                        icon={
                          <img
                            className="google-classrooms-img"
                            src={classRoomImg}
                            alt="Classroom"
                            style={{ width: "18px", marginRight: "6px" }}
                          />
                        }
                        className="mr-10"
                      >
                        Upload class list from Classroom
                      </Button>
                    </a>
                    <Button type="primary" onClick={() => handleAddclassName()} className="joyride-2">
                      Add Class <PlusOutlined />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="primary"
                      icon={
                        <img
                          className="google-classrooms-img"
                          src={classRoomImg}
                          alt="Classroom"
                          style={{ width: "18px", marginRight: "6px" }}
                        />
                      }
                      className="mr-10"
                      onClick={() => handleImportDataFromGoogle()}
                    >
                      Upload class list from Classroom
                    </Button>
                    <Button type="primary" onClick={() => handleAddclassName()} className="joyride-2">
                      Add Classes <PlusOutlined />
                    </Button>
                  </>
                )
              ) : (
                !userDetails.school_district_id && (
                  <Button type="primary" onClick={() => handleAddclassName()} className="joyride-2">
                    Add Class <PlusOutlined />
                  </Button>
                )
              )}
            </div>
          }
        >
          <ErrorBoundary>
            <ClassCodeTable
              showDeleteClassCodeDialog={handleShowDeleteClassCodePopup}
              showEditClassCodeDialog={handleShowEditClassCodePopup}
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
            />
          </ErrorBoundary>
          {/* ) : (
            ""
          )} */}

          {isShowClassCodeDeleteDialog && (
            <ErrorBoundary>
              <ConfirmationClassCodeDialog
                open={false}
                activeClassCode={activeClassCode}
                closeConfirmationDialog={handleCloseDeleteClassCodePopup}
                success={handleDeleteClassCode}
                loading={deleteClassCodeLoading}
              />
            </ErrorBoundary>
          )}

          {fetchingAllClassCodeListFromGoogleClassRoomLoading && (
            <ErrorBoundary>
              <SyncDialog contentText="Syncing with google classroom (Active classes)" />
            </ErrorBoundary>
          )}
          {fetchingClassLinkClassListLoading && (
            <ErrorBoundary>
              <SyncDialog contentText="Syncing with class link classes (Active classes)" />
            </ErrorBoundary>
          )}

          {/* //Select Classes Dailog  */}
          {isShowSelectClassDailog && (
            <ErrorBoundary>
              <SelectClassDailog
                open={isShowSelectClassDailog}
                // open={true}
                activeClassCode={activeClassCode}
                close={handleCloseClassSelectionDailog}
                loading={deleteClassCodeLoading}
              />
            </ErrorBoundary>
          )}
          {/* class link classes dialog */}
          {isShowSelectClassLinkDialog && (
            <ErrorBoundary>
              <ClassLinkClassesSelectionDialog
                open={isShowSelectClassLinkDialog}
                activeClassCode={activeClassCode}
                close={handleCloseClassLinkSelectionDailog}
                loading={deleteClassCodeLoading}
              />
            </ErrorBoundary>
          )}

          {/* //Classroom sync error  */}

          {isShowClassroomSyncErrorDialog && (
            <ErrorBoundary>
              <ClassroomSyncErrorPopup
                close={handleCloseClassroomSyncErrorDailog}
                closeSyncDailog={handleCloseClassSelectDailog}
              />
            </ErrorBoundary>
          )}
        </Section>
      </Container>
    </>
  );
};

export default TeacherClassesPage;
