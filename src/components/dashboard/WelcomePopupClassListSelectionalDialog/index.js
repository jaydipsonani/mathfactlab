import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import ClassTable from "components/dashboard/ClassTable";
import Button from "components/common/Button";
import { syncSelectedClass, getClassCodeList } from "../../../redux/actions";
import "assets/sass/components/button-ant.scss";

function WelcomePopupClassListSelectionalDialog(props) {
  const { close, success } = props;

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { allClassCodeList, syncGoogleClassLoading } = useSelector(({ classCode }) => classCode);

  const syncedClassCodeList = allClassCodeList
    .filter(classDetails => classDetails.is_import)
    .map(classDetails => {
      return classDetails.class_id;
    });
  const [selectedRowKeys, setSelectedRowKeys] = useState(syncedClassCodeList || []);

  const handleCloseDailog = () => {
    close();
    // history.replace(`/teacher/classes`);
  };

  const handleChangeSelectedRawKeys = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const handleSuccessAddSelectedClass = () => {
    localStorage.removeItem("is_welcome_popup_google_sync");
    dispatch(getClassCodeList());
    handleCloseDailog();
    success && success();
    // history.replace(`/teacher/classes`);
  };

  const handleAddSelectedClass = () => {
    const body = {
      class_ids: selectedRowKeys
    };
    dispatch(syncSelectedClass(body, handleSuccessAddSelectedClass));

    navigate(`/teacher/students?is_show_student_welcome_popup=true`);
  };

  return (
    <>
      <Modal
        visible={true}
        title="Select Classes to Import new"
        // destroyOnClose={true
        onCancel={() => handleCloseDailog()}
        // closable={false}

        footer={null}
        key="modal"
      >
        <form className="popup">
          <div className="popup-content">
            <div className="popup-content-inner">
              <ClassTable
                closeClassCodeSelectDailog={handleCloseDailog}
                handleChangeSelectedRawKeys={handleChangeSelectedRawKeys}
              />
            </div>
          </div>

          <div className="popup-footer">
            <div className="button-wrap">
              <div className="button-cols">
                <Button type="button" className="button" name={"Cancel"} onClick={() => handleCloseDailog()} />
              </div>

              <div className="button-cols">
                <Button
                  type="button"
                  className="button-secondary"
                  name={syncGoogleClassLoading ? "Syncing..." : "Sync"}
                  onClick={() => handleAddSelectedClass()}
                  disabled={syncGoogleClassLoading || (selectedRowKeys && !selectedRowKeys.length)}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default WelcomePopupClassListSelectionalDialog;

// function LevelLifterTestReportDailog(props) {
//   const { errorCount = "", user, close } = props;
//   let history = useHistory();

//   const { userDetails } = useSelector(({ auth }) => auth);

//   const userData = user || userDetails;

//   const handleCloseDailog = () => {
//     close();
//     history.replace(`/teacher/classes`);
//   };

//   return (
//     <>
//       <>
//         {/* <!-- Popup modal --> */}
//         {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
//         <div className="custom-popup open student-report-popup">
//           {/* <Scrollbar className="popup student-report-popup-inner"> */}
//           {/* id="style-4" */}
//           <div className="popup student-report-popup-inner" id="style-4">
//             <div className="popup-header pb-0">
//               <div className="popup-header-top bd-none pb-0">
//                 <div className="popup-header-left">
//                   <h2 className="popup-title">Class Selection</h2>
//                 </div>
//               </div>
//               {userDetails.role_id === userRole.STUDENT.role_id &&
//                 errorCount &&
//                 errorCount <= 3 && (
//                   <div
//                     className="popup-header-bottom mb-10"
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       width: "100%",
//                     }}
//                   >
//                     <div className={"popup-box-wrapper "}>
//                       <h6
//                         style={{
//                           textAlign: "center",
//                           fontSize: "24px",
//                           padding: "24px 24px",
//                           background: "white",
//                           borderBottom: "4px solid #50be81",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         {
//                           "You are very close to passing this level.  Keep up the good work."
//                         }
//                       </h6>{" "}
//                     </div>
//                   </div>
//                 )}

//               <span className="close" onClick={() => handleCloseDailog()}>
//                 &times;
//               </span>
//             </div>

//             <div className="popup-content">
//               <div className="popup-content-inner">
//                 <ClassTable closeClassCodeSelectDailog={handleCloseDailog} />
//               </div>
//             </div>
//           </div>
//           {/* </Scrollbar> */}
//         </div>
//         <div className="popup-backface open"></div>
//       </>
//     </>
//   );
// }

// export default LevelLifterTestReportDailog;
