import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Button from "components/common/Button";
import { endSession } from "../../../redux/actions/practiceAction";
import { logout } from "../../../redux/actions/authAction";
import { studentSessionTimeLimitList } from "config/const";

// close session dialog
const AbortSessionDialog = props => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { updateSessionLoading } = useSelector(({ strategy }) => strategy);
  const { userDetails, logoutLoading } = useSelector(({ auth }) => auth);

  const {
    profile: { student_learning_mode_id, mul_div_level_id, add_sub_level_id }
  } = userDetails;

  const authLogoutSuccess = () => {
    localStorage.removeItem("practice_test_submissions_id");
    localStorage.removeItem("user-token");
    localStorage.removeItem("isSessionStarted");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleCallBackEndSession = () => {
    props.close();

    dispatch(logout(authLogoutSuccess));
  };

  const maxSessionLimit = studentSessionTimeLimitList.find(
    (limit, index) => index + 1 === studentSessionTimeLimitList.length
  ).value;

  const handleEndSession = async () => {
    let sessionID = sessionStorage.getItem("session_id");
    if (sessionID) {
      let duration = moment.duration(moment().diff(sessionStorage.getItem("session_start_date"), "YYYY-MM-DD HH:mm"));

      const counter = Math.round(duration.asMinutes());
      const activeLevelId = student_learning_mode_id === 1 ? +add_sub_level_id : +mul_div_level_id;
      const body = {
        time_taken_in_min: counter > maxSessionLimit ? maxSessionLimit : counter,
        end_time: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
        status: 1,
        student_learning_mode_id: student_learning_mode_id,
        ending_level_id: activeLevelId,
        updated_by: "STUDENT"
      };
      await dispatch(endSession(sessionID, body, handleCallBackEndSession));
    }
    // handleCallBackEndSession();
  };
  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open " style={{ zIndex: "14444" }}>
          <div className="popup">
            <div className="popup-header" style={{ borderBottom: "none" }}>
              <h3 className="popup-title">{null}</h3>
            </div>{" "}
            <div style={{ padding: "0px 24px 24px 24px", textAlign: "center" }}>
              {/* <img src={congratulationImg} alt="bubbles" /> */}
              <h4 className="mb-10">Well done. That’s it for today’s session.</h4>
              <h5>Remember, regular practice is the key to success.</h5>
              <span>Keep up the good work and log in again to MathFactLab soon!</span>
            </div>{" "}
            <div className="popup-footer">
              <div className="button-wrap" style={{ justifyContent: "center", marginBottom: "24px" }}>
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    name={"See you tomorrow!!"}
                    onClick={() => handleEndSession()}
                    disabled={updateSessionLoading || logoutLoading}
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

export default AbortSessionDialog;
