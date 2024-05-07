import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Loader from "components/common/Loader";
import { startSession, teacherLoginClassLink } from "../../../redux/actions";
import { userRole } from "config/const";

const ClassLink = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);

  const code = query.get("code");

  const handleSuccess = response => {
    localStorage.setItem("data", JSON.stringify(response));

    if (response.user.role_id === userRole.STUDENT.role_id) {
      const {
        profile: {
          student_learning_mode_id,
          add_sub_level_id,
          mul_div_level_id,
          // is_assignment_on,
          session_time_limit,
          current_assignment_id
        }
      } = response.user;
      const activeLevelIndex = student_learning_mode_id === 1 ? +add_sub_level_id : +mul_div_level_id;

      const body = {
        start_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        student_learning_mode_id: student_learning_mode_id,
        level_index: activeLevelIndex === 0 ? "" : activeLevelIndex,
        starting_level_index: activeLevelIndex === 0 ? "" : activeLevelIndex,
        // is_assignment_session: is_assignment_on,
        assignment_id: current_assignment_id,
        session_timeout: session_time_limit,
        ending_level_index: activeLevelIndex === 0 ? "" : activeLevelIndex
      };
      sessionStorage.setItem("user-token", response.token);
      sessionStorage.setItem("user-role", response.user.role_id);
      dispatch(startSession(body));
      sessionStorage.setItem("isSessionStarted", true);
      sessionStorage.setItem("session_start_date", moment().format("YYYY-MM-DD HH:mm"));
      if (
        (student_learning_mode_id === 1 && !!add_sub_level_id) ||
        (student_learning_mode_id === 2 && !!mul_div_level_id)
      ) {
        navigate("/student/practice-select-activity");
      } else {
        navigate("/student/placement-test");
      }
    } else {
      localStorage.setItem("user-token", response.token);
      localStorage.setItem("user-role", response.user.role_id);
      navigate("/teacher/student");
    }
  };
  const handleFailed = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (code) {
      const body = { code: code };
      dispatch(teacherLoginClassLink(body, handleSuccess, handleFailed));
    }
  }, [code]); // eslint-disable-line

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 244px)",
          width: "100%"
        }}
      >
        <Loader />
      </div>
    </>
  );
};

export default ClassLink;
