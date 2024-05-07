import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import ProgressTablePopup from "components/dashboard/ProgressTablePopup";
import ProgressLevelTable from "components/student/ProgressAllLevelTable";
import StudentStatusControllerDialog from "components/dashboard/StudentStatusControllerDialog";
import StudentTable from "../../../components/dashboard/StudentTable";
import StudentDialog from "components/dashboard/StudentDailog";
import MultipleStudentEditDialog from "components/dashboard/MultipleStudentEditDialog";
import StrategyDialog from "components/student/StrategyDialog";
import StudentStatus from "components/dashboard/StudentStatusPopup";
import DeletePopup from "components/common/DeletePopup";
import { removeUserAction, editMultipleStudents } from "../../../redux/actions/userAction";
import { getSchool } from "../../../redux/actions/";
import ErrorBoundary from "components/common/ErrorBoundary";
import StudentReportDialog from "components/dashboard/StudentReportDialog";
import SessionsDetailsDialog from "components/dashboard/SessionsDetailsDialog";
import LevelLifterTestReportDialog from "components/student/LevelLifterTestFailedReportDialog";

import { getClassCodeList } from "../../../redux/actions";
import { removeBulkStudents, editStudent } from "../../../redux/actions";
import { getUsersList } from "../../../redux/actions";

function StudentPage(props) {
  const dispatch = useDispatch();
  const { userDetails } = useSelector(({ auth }) => auth);
  const { searchClassCode: selectedClassCode } = useSelector(({ header }) => header);
  const { searchSchoolId } = useSelector(({ header }) => header);

  const { studentList: studentUserList } = useSelector(({ user }) => user);

  const { searchText } = useSelector(({ header }) => header);

  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { schoolData } = useSelector(({ schoolData }) => {
    return schoolData;
  });

  const [isShowSettingDialog, setIsShowSettingDialog] = useState(false);

  const [isShowStudentDailog, setIsShowStudentDailog] = useState(false);
  const [isShowStudentDeleteDailog] = useState(false);
  const [isShowMultiStudentEditDailog, setIsShowMultiStudentEditDailog] = useState(false);

  const [isShowStrategyDialog, setIsShowStrategyDialog] = useState(false);
  const [selectedStudentIDList, setSelectedStudentIDList] = useState([]);

  const [isShowStudentReportDailog, setIsShowStudentReportDailog] = useState(false);
  const [isShowLevelLifterReportPopup, setIsShowLevelLifterReportPopup] = useState(false);

  const [isShowStudentSessionDetailsDailog, setIsShowStudentSessionDetailsDailog] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSelectedStudentIDReset, setIsSelectedStudentIDReset] = useState(false);
  const [isShowProgressTable, setShowProgressTable] = useState(false);

  //default set 1 to learning mode
  const [selectedLevelLearningMode, setSelectedLevelLearningMode] = useState(1);

  const [isShowProgressTablePopup, setIsShowProgressTablePopup] = useState(false);

  const [isShowStudentActivityStatus, setIsShowStudentActivityStatus] = useState(false);

  const [isShowStudentDetails, setIsShowStudentDetails] = useState(false);

  const [activeUser, setActiveUser] = useState(false);

  const [activeLevelLifterSubmissionID, setActiveLevelLifterSubmissionID] = useState("");
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  useEffect(() => {
    !classCodeList.length && dispatch(getClassCodeList());
  }, [classCodeList.length]); // eslint-disable-line

  useEffect(() => {
    !schoolData.length && dispatch(getSchool());
  }, []); // eslint-disable-line

  useEffect(() => {
    // const currentDate = moment(userDetails.profile.created_at).format(
    //   "YYYY-MM-DD",
    // );
    if (Object.keys(userDetails)) {
      const classCodesList = classCodeList.map(classDetails => classDetails.class_code);
      dispatch(getUsersList(classCodesList, "", "", currentPage, pageLimit));
    }
  }, [currentPage, pageLimit, classCodeList.length]); // eslint-disable-line

  const handleShowStudentDailog = () => {
    setIsShowStudentDailog(true);
    setIsEditMode(false);
    setActiveUser({});
  };
  // Setting Dialog open
  const handleShowSettingPopup = () => {
    setIsShowSettingDialog(true);
  };
  // Setting Dialog close
  const handleSettingDialog = () => {
    setIsShowSettingDialog(false);
  };

  //Edit Student Dailog Open

  const handleShowEditStudentPopup = activeUser => {
    setIsEditMode(true);
    setIsShowStudentDailog(true);
    setActiveUser(activeUser);
  };

  //Show Student Activity Status

  const handleShowStudentActivityStatusPopup = activeUser => {
    setIsShowStudentActivityStatus(true);
    setActiveUser(activeUser);
  };

  //Close Student Activity Status
  const handleCloseStudentActivityStatusPopup = () => {
    setIsShowStudentActivityStatus(false);
  };

  const handleShowStudentDetailsPopup = activeUser => {
    setIsShowStudentDetails(true);
    setActiveUser(activeUser);
  };

  //Close Student Activity Status
  const handleCloseStudentDetailsPopup = () => {
    setIsShowStudentDetails(false);
  };

  //Close Student Dailog
  const handleCloseStudentDailog = () => {
    setIsShowStudentDailog(false);
  };

  //show student  report dialog
  const handleShowStudentReportDailog = activeUser => {
    setIsShowStudentReportDailog(true);

    setActiveUser(activeUser);
  };

  const handleCloseStudentReportDailog = activeUser => {
    setIsShowStudentReportDailog(false);
    setActiveUser({});
  };

  const handleShowStudentResetDailog = row => {
    setActiveUser(row);
    // setIsShowStudentResetConfirmationDailog(true);
    Modal.confirm({
      // title: `Are you sure you want to reassess ${row.profile.first_name} ${
      //   row.profile.last_name
      // } in ${
      //   row.profile.student_learning_mode_id === 1
      //     ? "Addition/Subtraction"
      //     : "Multiplication/Division"
      // }?  If so, all ${
      //   row.profile.student_learning_mode_id === 1
      //     ? "addition/subtraction"
      //     : "multiplication/division"
      // } performance data for this student will be erased.`,
      title: (
        <div>
          <p>
            Are you sure you want to reassess{" "}
            <b>
              {row.profile.first_name} {row.profile.last_name}
            </b>{" "}
            in {row.profile.student_learning_mode_id === 1 ? "Addition/Subtraction" : "Multiplication/Division"}?
          </p>
          <p>
            If so, all{" "}
            <b> {row.profile.student_learning_mode_id === 1 ? "addition/subtraction" : "multiplication/division"} </b>
            performance data for this student will be erased.
          </p>
        </div>
      ),
      icon: <QuestionCircleOutlined />,
      okText: "Yes, reassess",
      cancelText: "No, cancel",
      onOk() {
        let body;
        if (row.profile.student_learning_mode_id === 1) {
          body = {
            profile: {
              add_sub_level_id: ""
            }
          };
        } else {
          body = {
            profile: {
              mul_div_level_id: ""
            }
          };
        }

        dispatch(editStudent(body, row));
      }
    });
  };
  // const handleShowDeleteStudentPopup = activeUser => {
  //   setSelectedStudentIDList([]);
  //   // setIsShowStudentDeleteDailog(false);
  //   setActiveUser(activeUser);

  //   Modal.confirm({
  //     title: (
  //       <div>
  //         <p>
  //           Are you sure you wish to delete{" "}
  //           <b>
  //             {activeUser.profile.first_name} {activeUser.profile.last_name}'s
  //           </b>{" "}
  //           account?
  //         </p>
  //         <p>Student data will be erased. Once deleted, this cannot be undone.</p>
  //       </div>
  //     ),
  //     icon: <DeleteOutlined style={{ color: "red" }} />,
  //     okText: "Delete",
  //     onOk() {
  //       dispatch(removeUserAction(activeUser));
  //     },
  //     onCancel() {
  //       //Close Delete Confirmation Dailog

  //       setIsSelectedStudentIDReset(!isSelectedStudentIDReset);
  //     }
  //   });
  // };

  // const handleMultiDeleteUser = selectedRowKeys => {
  //   // setIsShowStudentDeleteDailog(true);
  //   setSelectedStudentIDList(selectedRowKeys);

  //   Modal.confirm({
  //     title: (
  //       <div>
  //         <p>
  //           Are you sure you wish to delete <b>{selectedRowKeys.length}</b> selected student accounts?
  //         </p>
  //         <p>Student data will be erased. Once deleted, this cannot be undone.</p>
  //       </div>
  //     ),
  //     icon: <DeleteOutlined style={{ color: "red" }} />,
  //     okText: "Delete",
  //     onOk() {
  //       if (selectedRowKeys.length) {
  //         const body = {
  //           student_user_ids: selectedRowKeys
  //         };
  //         dispatch(removeBulkStudents(body));
  //       } else {
  //       }
  //     }
  //   });

  //   // dispatch(removeMultipleUser(ids));
  // };

  const handleStartStudenSessionDetailsDailog = row => {
    setIsShowStudentSessionDetailsDailog(true);
    setActiveUser(row);
  };

  const handleCloseStudenSessionDetailsDailog = () => {
    setIsShowStudentSessionDetailsDailog(false);
    setActiveUser({});
  };

  const handleShowLevelLifterReportPopup = (row, learning_mode) => {
    setIsShowLevelLifterReportPopup(true);
    setActiveUser(row);
    setSelectedLevelLearningMode(learning_mode);
  };

  const handleShowLevelLifterReportBySubmissionID = (levelLifterSubmissionID, learningMode) => {
    setIsShowLevelLifterReportPopup(true);
    setActiveLevelLifterSubmissionID(levelLifterSubmissionID);
    setSelectedLevelLearningMode(learningMode);
  };

  const handleCloseLevelLifterReportPopup = () => {
    setIsShowLevelLifterReportPopup(false);
    setActiveLevelLifterSubmissionID("");
  };

  const handleMultiEditUserDailog = selectedRowKeys => {
    setSelectedStudentIDList(selectedRowKeys);
    setIsShowMultiStudentEditDailog(true);
  };

  const handleCloseMultipleStudentEditDailog = () => {
    setIsShowMultiStudentEditDailog(false);
    setIsSelectedStudentIDReset(!isSelectedStudentIDReset);
  };

  const handleShowProgressTable = (user, learning_mode) => {
    setActiveUser(user);
    setSelectedLevelLearningMode(learning_mode);
    setIsShowProgressTablePopup(true);
  };

  const handleShowDeleteStudentPopup = user => {
    setSelectedStudentIDList([]);
    setActiveUser(user);
    setDeletePopupVisible(true);
  };
  const handleMultiDeleteUser = selectedRowKeys => {
    setSelectedStudentIDList(selectedRowKeys);
    setDeletePopupVisible(true);
  };

  const handleDeleteConfirm = () => {
    setDeletePopupVisible(false);

    if (selectedStudentIDList.length) {
      const body = {
        student_user_ids: selectedStudentIDList
      };
      dispatch(removeBulkStudents(body));
    } else {
      dispatch(removeUserAction(activeUser));
    }
  };
  // const handleDeleteConfirm = () => {
  //   setDeletePopupVisible(false);
  //   dispatch(removeUserAction(activeUser));
  // };

  const handleCloseDeletePopup = () => {
    setDeletePopupVisible(false);
    setSelectedStudentIDList([]);
  };
  const handleCloseProgressTable = () => {
    // setActiveUser({});
    setSelectedLevelLearningMode("");
    setIsShowProgressTablePopup(false);
    setShowProgressTable(false);
  };

  const handleShowStrategiesTable = activeUser => {
    setActiveUser(activeUser);
    setIsShowStrategyDialog(true);
  };
  const handleCloseStrategiesTable = () => {
    setIsShowStrategyDialog(false);
  };

  const handleShowProgressTablePopup = () => {
    setShowProgressTable(true);
  };

  let updatedStudentList = studentUserList;

  // filter by search bar
  if (searchText) {
    const updateStudentListBySearch = updatedStudentList.filter(std => {
      return (
        std.profile.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
        std.profile.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        std.user_name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    updatedStudentList = updateStudentListBySearch;
  }
  if (selectedClassCode) {
    const updateStudentListByClass = updatedStudentList.filter(std => {
      return std.class_code.toLowerCase().includes(selectedClassCode);
    });
    updatedStudentList = updateStudentListByClass;
  }

  if (searchSchoolId) {
    const classCodeListBySelectedSchool = classCodeList
      .filter(classCode => {
        return classCode.school_id === searchSchoolId;
      })
      .map(classData => classData.class_code);
    const updateStudentListBySchool = updatedStudentList.filter(std => {
      return classCodeListBySelectedSchool.includes(std.class_code);
    });
    updatedStudentList = updateStudentListBySchool;
  }

  const handleShowCloseAssignmentDailog = () => {
    Modal.confirm({
      title: (
        <div>
          <p>Are you sure you wish to clear the assignment column ?</p>
          <p style={{ color: "GrayText" }}>
            Assignment data <u>is saved</u> and can be found on individual and group reports (see Report Generator).
          </p>
        </div>
      ),
      icon: <DeleteOutlined style={{ color: "red" }} />,
      okText: "Yes, clear",
      cancelText: "No, cancel",
      onOk() {
        const studentKeyListByAssignment = updatedStudentList
          .filter(std => std.profile.is_assignment_on)
          .map(std => std.id);

        const body = {
          studentUserIds: studentKeyListByAssignment,

          updates: {
            profile: {
              is_assignment_on: 0
            }
          }
        };

        dispatch(editMultipleStudents(body, "", "Assignment ended successfully."));
      },
      onCancel() {}
    });
  };
  return (
    <>
      <ErrorBoundary>
        <StudentTable
          updatedStudentList={updatedStudentList}
          isSelectedStudentIDReset={isSelectedStudentIDReset}
          showDeleteStudentDailog={handleShowDeleteStudentPopup}
          showEditStudentDailog={handleShowEditStudentPopup}
          showAddStudentDialog={handleShowStudentDailog}
          showStudentReportDailog={handleShowStudentReportDailog}
          showResetStudentDailog={handleShowStudentResetDailog}
          searchClassCode={selectedClassCode}
          showSessionDetailsDailog={handleStartStudenSessionDetailsDailog}
          showLevelLifterReportDailog={handleShowLevelLifterReportPopup}
          showMultipleDeleteStudentDailog={handleMultiDeleteUser}
          showMultiEditStudentDailog={handleMultiEditUserDailog}
          showProgressTable={handleShowProgressTable}
          showStrategiesTable={handleShowStrategiesTable}
          showProgressTablePopup={handleShowProgressTablePopup}
          handleShowStudentActivityStatusPopup={handleShowStudentActivityStatusPopup}
          handleShowStudentDetailsPopup={handleShowStudentDetailsPopup}
          studentUserList={updatedStudentList}
          showSettingDialog={handleShowSettingPopup}
          handlePage={setCurrentPage}
          handlePageSize={setPageLimit}
          currentPage={currentPage}
          showCloseAssignmentDailog={handleShowCloseAssignmentDailog}
        />
      </ErrorBoundary>

      {isShowSettingDialog && (
        <ErrorBoundary>
          <StudentStatusControllerDialog open={isShowSettingDialog} closeSettingPopup={handleSettingDialog} />
        </ErrorBoundary>
      )}

      {/* {isShowStudentDailog && ( */}
      <>
        {/* <!-- Popup modal --> */}
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <ErrorBoundary>
          <StudentDialog
            closeStudentPopup={handleCloseStudentDailog}
            isEditMode={isEditMode}
            activeUser={activeUser}
            searchClassCode={selectedClassCode}
            open={isShowStudentDailog}
          />
        </ErrorBoundary>
      </>
      {/* )} */}

      {/* Multiple use edit dialog  */}
      {!isShowStudentDeleteDailog && isShowMultiStudentEditDailog && (
        <>
          <ErrorBoundary>
            <MultipleStudentEditDialog
              closeStudentPopup={handleCloseMultipleStudentEditDailog}
              activeUser={activeUser}
              searchClassCode={selectedClassCode}
              selectedStudentIDList={selectedStudentIDList}
              open={isShowMultiStudentEditDailog}
            />
          </ErrorBoundary>
        </>
      )}

      {/* {isShowStudentDeleteDailog && (
            <ErrorBoundary>
              <StudentDeleteDailog
                user={activeUser}
                 closeDeleteDailog={handleCloseDeleteStudentPopup}
                selectedStudentIDList={selectedStudentIDList}
                isShow={isShowStudentDeleteDailog}
              />
            </ErrorBoundary>
          )} */}

      {isShowStudentReportDailog && (
        <ErrorBoundary>
          <StudentReportDialog
            user={activeUser.row}
            learning_mode={activeUser.learning_mode}
            closeReportDailog={handleCloseStudentReportDailog}
          />
        </ErrorBoundary>
      )}

      {isShowStudentSessionDetailsDailog && (
        <ErrorBoundary>
          <SessionsDetailsDialog
            closeStudentSessionDailog={handleCloseStudenSessionDetailsDailog}
            showLevelLifterReportDailog={handleShowLevelLifterReportBySubmissionID}
            user={activeUser}
          />
        </ErrorBoundary>
      )}
      {isShowLevelLifterReportPopup && (
        <ErrorBoundary>
          <LevelLifterTestReportDialog
            open={isShowLevelLifterReportPopup}
            close={handleCloseLevelLifterReportPopup}
            user={activeUser}
            levelLifterSubmissionID={activeLevelLifterSubmissionID}
            // learning_mode={activeUser.profile.student_learning_mode_id}
            selectedLevelLearningMode={+selectedLevelLearningMode}
          />{" "}
        </ErrorBoundary>
      )}
      <ErrorBoundary>
        {isShowStrategyDialog && (
          <StrategyDialog
            user={activeUser}
            close={handleCloseStrategiesTable}
            isShowStrategyDialog={isShowStrategyDialog}
          />
        )}
      </ErrorBoundary>

      <ErrorBoundary>
        {isShowProgressTablePopup && (
          <ProgressTablePopup
            user={activeUser}
            selectedLearningMode={selectedLevelLearningMode}
            close={handleCloseProgressTable}
            isShowProgressTablePopup={isShowProgressTablePopup}
          />
        )}
      </ErrorBoundary>

      {isShowStudentActivityStatus && (
        <ErrorBoundary>
          <StudentStatus user={activeUser} close={handleCloseStudentActivityStatusPopup} />
        </ErrorBoundary>
      )}
      {isShowStudentDetails && (
        <ErrorBoundary>
          <StudentStatus user={activeUser} close={handleCloseStudentDetailsPopup} />
        </ErrorBoundary>
      )}
      {isShowProgressTable && (
        <>
          <ErrorBoundary>
            <ProgressLevelTable
              user={activeUser}
              close={handleCloseProgressTable}
              isShowProgressTablePopup={isShowProgressTable}
            />
          </ErrorBoundary>
        </>
      )}
      {/* {isDeletePopupVisible && (
        <DeletePopup
          open={isDeletePopupVisible}
          success={handleDeleteConfirm}
          text={
            <div>
              <p>
                Are you sure you wish to delete{" "}
                <b>
                  {activeUser?.profile?.first_name} {activeUser?.profile?.last_name}'s
                </b>{" "}
                account?
              </p>
              <p>Student data will be erased. Once deleted, this cannot be undone.</p>
            </div>
          }
          close={handleCloseDeletePopup}
        />
      )} */}
      {isDeletePopupVisible && (
        <DeletePopup
          open={isDeletePopupVisible}
          success={handleDeleteConfirm}
          text={
            selectedStudentIDList.length ? (
              <div>
                <p>
                  Are you sure you wish to delete <b>{selectedStudentIDList.length}</b> selected student accounts?
                </p>
                <p>Student data will be erased. Once deleted, this cannot be undone.</p>
              </div>
            ) : (
              <div>
                <p>
                  Are you sure you wish to delete{" "}
                  <b>
                    {activeUser?.profile?.first_name} {activeUser?.profile?.last_name}'s
                  </b>{" "}
                  account?
                </p>
                <p>Student data will be erased. Once deleted, this cannot be undone.</p>
              </div>
            )
          }
          close={handleCloseDeletePopup}
        />
      )}
    </>
  );
}

export default StudentPage;
