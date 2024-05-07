import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { ArrowRightOutlined } from "@ant-design/icons";
import ErrorBoundary from "components/common/ErrorBoundary";
import SyncDialog from "components/common/SyncDialog";
import ClassListSelectionDialog from "components/dashboard/ClassListSelectionDialog";
import ClassroomSyncErrorPopup from "components/common/Button/ClassroomSyncErrorPopup";
import { getUsersList } from "../../../redux/actions";
import { getClassCodeListFromGoogleClassRoom } from "../../../redux/actions/classCodeAction";
import { userRole } from "config/const";

const Step1 = props => {
  const dispatch = useDispatch();
  let location = useLocation();

  const query = new URLSearchParams(location.search);

  const code = query.get("code");
  const { userDetails } = useSelector(({ auth }) => auth);
  const [isShowClassroomSyncErrorDialog, setIsShowClassroomSyncErrorDialog] = useState(false);
  const [isShowSelectClassDailog, setIsShowSelectClassDailog] = useState(false);

  const { deleteClassCodeLoading, fetchingAllClassCodeListFromGoogleClassRoomLoading } = useSelector(
    ({ classCode }) => classCode
  );

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
  const currentDate = moment(userDetails.profile.created_at).format("YYYY-MM-DD");
  const handleCloseClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(false);
  };
  const handleSuccessSyncClass = () => {
    dispatch(getUsersList(userRole.STUDENT.role_id, currentDate, currentDate));
    props.setCurrentStep(4);
  };

  const handleNext = () => {
    if (props.currentStep === 3) {
      props.setCurrentStep(1);
    } else {
      props.setCurrentStep(props.currentStep + 1);
    }
  };
  return (
    <>
      <div className="step-1">
        <div className="welcome-classes-text">Welcome</div>

        <div className="center">
          <div className="begin-text">
            To help make rostering your school's students as simple of a process as possible, we encourage you to
            download our
            <a
              href="https://mathfactlab.helpscoutdocs.com/article/58-administrators-quick-start-guide"
              target="_blank"
              rel="noreferrer"
            >
              <u
                style={{
                  color: "green"
                }}
              >
                Administrator's Quick Startup Guide.
              </u>
            </a>
          </div>
          <div className="begin-text">
            Note: MathFactLab School Accounts allow only administrators to create classes or to add teachers and
            students.
          </div>
        </div>
        <div className="classes-box-container">
          <div className="classes-box">
            The process for rostering students and teachers into classes is as follows:
            <ol className="class-list">
              <li>
                Create a list of all <b>schools</b>
              </li>
              <li>
                Create a list of all <b>classes</b>
              </li>
              <li>
                Add/Import <b> teachers/administrators</b> and assign to classes/schools
              </li>
              <li>
                Add/Import <b>students</b> and assign to classes
              </li>
            </ol>
          </div>
        </div>
        <div className="welcome-step-popup-footer">
          <div className="back-nav-btn"></div>
          <div className={"next-nav-btn"} onClick={handleNext}>
            Next <ArrowRightOutlined />
          </div>
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
          <ClassListSelectionDialog
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
