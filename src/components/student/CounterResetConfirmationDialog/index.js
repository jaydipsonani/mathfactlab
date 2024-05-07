import React from "react";
import Button from "components/common/Button";
import { useDispatch } from "react-redux";
import { userRole } from "config/const";
import { editMultipleStudents } from "../../../redux/actions";
// import { editMultipleUser } from "store/action";CHANGE THIS REQUIRED

const CounterResetConfirmationDialog = props => {
  const { allStudentIDList, selectedLevelLearningMode } = props;

  const dispatch = useDispatch();

  const handleCloseDailog = () => {
    props.close();
  };

  const handleResetCounter = () => {
    if (selectedLevelLearningMode === 1) {
      const body = {
        role_id: userRole.STUDENT.role_id,
        profile: {
          add_sub_increment_count: 0
        }
      };
      dispatch(editMultipleStudents(allStudentIDList, body, handleCloseDailog));
    } else {
      const body = {
        role_id: userRole.STUDENT.role_id,
        profile: {
          mul_div_increment_count: 0
        }
      };
      dispatch(editMultipleStudents(allStudentIDList, body, handleCloseDailog));
    }
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open" style={{ zIndex: "1555555" }}>
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">
                Reset{" "}
                <i
                  style={{ fontSize: "24px" }}
                  className={
                    selectedLevelLearningMode === 1
                      ? "icon-addition-subtraction ml-5 mr-5"
                      : "icon-multiplication-division ml-5 mr-5"
                  }
                  aria-hidden="true"
                />{" "}
                counter
              </h3>
              <span className="close" onClick={() => handleCloseDailog()}>
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>

            <div className="popup-content">
              <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
                Are you sure you wish to reset the{" "}
                <i
                  style={{ fontSize: "24px" }}
                  className={
                    selectedLevelLearningMode === 1 ? "icon-addition-subtraction" : "icon-multiplication-division"
                  }
                  aria-hidden="true"
                />{" "}
                counter?
              </h4>
            </div>
            <div className="popup-footer">
              <div className="button-wrap">
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-gray"
                    name={"No, cancel"}
                    onClick={() => handleCloseDailog()}
                  ></Button>
                </div>
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    name={" Yes, continue"}
                    onClick={() => handleResetCounter()}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popup-backface open" style={{ zIndex: "999" }}></div>
      </>
    </>
  );
};

export default CounterResetConfirmationDialog;
