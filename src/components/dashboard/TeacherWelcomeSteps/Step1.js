import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ErrorBoundary from "components/common/ErrorBoundary";
import SyncDialog from "components/common/SyncDialog";
import WelcomePopupClassListSelectional from "components/dashboard/WelcomePopupClassListSelectionalDialog";
import ClassroomSyncErrorPopup from "components/common/Button/ClassroomSyncErrorPopup";
import { getClassCodeListFromGoogleClassRoom } from "../../../redux/actions";
import { getUsersList } from "../../../redux/actions";
import { googleScopeClassroom } from "config/const";
import classRoomImg from "assets/images/google-classroom.svg";


const Step1 = props => {
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const code = query.get("code");
  const { userDetails } = useSelector(({ auth }) => auth);
  const [isShowClassroomSyncErrorDialog, setIsShowClassroomSyncErrorDialog] = useState(false);
  const [isShowSelectClassDailog, setIsShowSelectClassDailog] = useState(false);
  const { classCodeList } = useSelector(({ classCode }) => classCode);

  const classCodesList = classCodeList.map(classDetails => classDetails.class_code);
  const { deleteClassCodeLoading, fetchingAllClassCodeListFromGoogleClassRoomLoading } = useSelector(
    ({ classCode }) => classCode
  );
  const handleCreateClass = () => {
    if (props.currentStep === 3) {
      props.setCurrentStep(1);
    } else {
      props.setCurrentStep(props.currentStep + 1);
    }
  };
  const handleShowClassSelectDailog = () => {
    handleCloseClassroomSyncErrorDailog(false);
    setIsShowSelectClassDailog(true);
  };
  const handleCallBackSyncToGoogle = message => {
    handleShowClassroomSyncErrorDailog();
  };
  const handleShowClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(true);
  };
  const handleCloseClassSelectionDailog = () => {
    setIsShowSelectClassDailog(false);
  };
  useEffect(() => {
    if (code) {
      handleImportDataFromGoogle({
        code: code,
        requested_url: location.pathname
      });
    }
  }, [code]); // eslint-disable-line
  const handleImportDataFromGoogle = body => {
    dispatch(getClassCodeListFromGoogleClassRoom(body, handleShowClassSelectDailog, handleCallBackSyncToGoogle));
  };
  // const currentDate = moment(userDetails.profile.created_at).format(
  //   "YYYY-MM-DD",
  // );
  const handleCloseClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(false);
  };
  const handleSuccessSyncClass = () => {
    dispatch(getUsersList(classCodesList));
    props.setCurrentStep(4);
  };
  const handleSetGoogleClassroomWelcomePopupSync = () => {
    localStorage.setItem("is_welcome_popup_google_sync", true);
  };
  return (
    <>
      <div className="step-1">
        <div className="welcom-text">Welcome</div>

        <div className="welcom-sub-text">You’re just a few short steps away from being ready to use MathFactLab.</div>
        <div className="begin-text">
          {!userDetails.google_user_id
            ? "To begin, click Create a class."
            : "To begin, create your first class or sync with your Google Classroom."}
        </div>
        <div className="actions-button">
          {!!userDetails.google_user_id && !userDetails.school_district_id ? (
            !userDetails.google_access_token_id ? (
              <>
                <div className="sync-button">
                  <a
                    href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${googleScopeClassroom.join(
                      "%20"
                    )}&include_granted_scopes=true&redirect_uri=${
                      process.env.REACT_APP_FRONTEND_REDIRECT_URL
                    }/teacher/classes&client_id=${
                      process.env.REACT_APP_GOOGLE_CLIENT_ID
                    }&response_type=code&access_type=offline&prompt=consent&is_show_google_welcome_popup=true`}
                  >
                    <Button
                      size="large"
                      icon={
                        <img
                          className="google-classrooms-img"
                          src={classRoomImg}
                          alt="Classroom"
                          style={{
                            width: "18px",
                            marginRight: "6px"
                          }}
                        />
                      }
                      className="mr-10"
                      onClick={() => handleSetGoogleClassroomWelcomePopupSync()}
                    >
                      Upload class list from Classroom
                    </Button>
                  </a>
                  <div className="sync-text">
                    Use this option only if your students are in a Google Classroom that you manage.
                  </div>
                </div>
                <Button type="primary" size="large" className="joyride-2" onClick={handleCreateClass}>
                  Create a class <PlusOutlined />
                </Button>
              </>
            ) : (
              <>
                <div className="sync-button">
                  <Button
                    size="large"
                    icon={
                      <img
                        className="google-classrooms-img"
                        src={classRoomImg}
                        alt="Classroom"
                        style={{
                          width: "18px",
                          marginRight: "6px"
                        }}
                      />
                    }
                    className="mr-10"
                    onClick={() => handleImportDataFromGoogle()}
                  >
                    Upload class list from Classroom
                  </Button>

                  <div className="sync-text">
                    Use this option only if your students are in a Google Classroom that you manage.
                  </div>
                </div>

                <Button type="primary" size="large" className="joyride-2" onClick={handleCreateClass}>
                  Create a class <PlusOutlined />
                </Button>
              </>
            )
          ) : (
            <Button type="primary" size="large" className="joyride-2" onClick={handleCreateClass}>
              Create a class <PlusOutlined />
            </Button>
          )}
        </div>
      </div>
      {fetchingAllClassCodeListFromGoogleClassRoomLoading && (
        <ErrorBoundary>
          <SyncDialog contentText="Syncing with google classroom (Active classes)" />
        </ErrorBoundary>
      )}

      {/* //Select Classes Dailog  */}
      {isShowSelectClassDailog && (
        <ErrorBoundary>
          <WelcomePopupClassListSelectional
            open={isShowSelectClassDailog}
            // open={true}
            close={handleCloseClassSelectionDailog}
            success={handleSuccessSyncClass}
            loading={deleteClassCodeLoading}
          />
        </ErrorBoundary>
      )}
      {isShowClassroomSyncErrorDialog && (
        <ErrorBoundary>
          <ClassroomSyncErrorPopup close={handleCloseClassroomSyncErrorDailog} />
        </ErrorBoundary>
      )}
    </>
  );
};

export default Step1;
