import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Button from "components/common/Button";
import { endSession } from "../../../redux/actions/practiceAction";
import { logout } from "../../../redux/actions/authAction";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { studentSessionTimeLimitList } from "config/const";

// close session dialog
const LogoutConfirmationPopup = props => {
  let navigate = useNavigate();
  let location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();

  const authLogoutSuccess = () => {
    localStorage.removeItem("practice_test_submissions_id");
    localStorage.removeItem("user-token");
    localStorage.removeItem("isSessionStarted");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleCallBackEndSession = () => {
    dispatch(logout(authLogoutSuccess));
  };
  const maxSessionLimit = studentSessionTimeLimitList.find(
    (limit, index) => index + 1 === studentSessionTimeLimitList.length
  ).value;
  const { userDetails } = useSelector(({ auth }) => auth);

  const {
    profile: { student_learning_mode_id, mul_div_level_id, add_sub_level_id }
  } = userDetails;
  const activeLevelId = student_learning_mode_id === 1 ? +add_sub_level_id : +mul_div_level_id;
  const handleEndSession = async () => {
    let sessionID = sessionStorage.getItem("session_id");

    if (sessionID) {
      let duration = moment.duration(moment().diff(sessionStorage.getItem("session_start_date"), "YYYY-MM-DD HH:mm"));

      const counter = Math.round(duration.asMinutes());

      const body = {
        time_taken_in_min: counter > maxSessionLimit ? maxSessionLimit : counter,
        end_time: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
        status: 1,

        ending_level_id: activeLevelId,
        updated_by: "STUDENT"
      };

      dispatch(endSession(sessionID, body));
    }
    await handleCallBackEndSession();
    props.close();
  };
  const handleClose = () => {
    props.close();
  };
  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open " style={{ zIndex: "1555555" }}>
          <div className="popup" style={{ maxWidth: "500px", padding: "12PX" }}>
            <div className="modal-content-text">
              {/* <img src={congratulationImg} alt="bubbles" /> */}
              <h4 className="" style={{ marginBottom: "40px" }}>
                <QuestionCircleOutlined style={{ color: "#faad14", marginRight: "6px" }} /> Are you sure you want to log
                off?
              </h4>

              {pathname === "/student/practice-test" ? (
                <p className="font-18" style={{ marginBottom: "40px" }}>
                  If you log off, your Level Lifter results will not be saved. You will need to complete the steps to
                  unlock the Level Lifter again.
                </p>
              ) : (
                ""
              )}
            </div>{" "}
            <div className="popup-footer" style={{ paddingTop: "0px" }}>
              <div className="button-wrap" style={{ justifyContent: "flex-end" }}>
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-secondary-outline"
                    name={"Cancel"}
                    onClick={() => handleClose()}
                  ></Button>
                </div>
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    name={"Logout"}
                    onClick={() => handleEndSession()}
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

export default LogoutConfirmationPopup;
