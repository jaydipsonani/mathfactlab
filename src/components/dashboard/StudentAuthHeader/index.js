import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useIdleTimer } from "react-idle-timer";
import i18n from "../../../config/i18n";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Popover } from "antd";
import { isTablet } from "react-device-detect";
import LogoutConfirmationPopup from "components/student/LogoutConfirmationPopup";
import TabletBanner from "components/student/TabletBanner";
import Button from "components/common/Button";
import ProgressTablePopup from "components/dashboard/ProgressTablePopup";
import { logout } from "../../../redux/actions/authAction";
import { endSession } from "../../../redux/actions/practiceAction";
import { mulSubLevelList, addSubLevelList, MATH_OPERATION, studentSessionTimeLimitList, userRole } from "config/const";
import logo from "assets/images/logo.svg";

const StudentAuthHeader = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();
  const { pathname } = location;
  const { userDetails } = useSelector(state => state.auth);
  // const { levelList } = useSelector(({ quiz }) => quiz);
  // const { levelList } = useSelector((state) => state.quiz);

  const {
    profile: { student_learning_mode_id, mul_div_level_id, add_sub_level_id },
    role_id
  } = userDetails;

  const activeLevelId = student_learning_mode_id === 1 ? +add_sub_level_id : +mul_div_level_id;
  const query = new URLSearchParams(location.search);

  const learning_mode = query.get("learning_mode_id");

  const level_id = query.get("level_id");
  const [isShowLogoutConfirmationPopup, setIsShowLogoutConfirmationPopup] = useState(false);

  const [isShowUserLevel, setShowUserLevel] = useState(false);
  const [isShowTabletBanner, setIsShowTabletBanner] = useState(false);

  //Get Level List
  useEffect(() => {
    setTimeout(() => {
      if (sessionStorage.getItem("is_show_tablet_banner") !== "1") {
        setIsShowTabletBanner(true);
      }
    }, 1000);
  }, []); // eslint-disable-line

  useEffect(() => {
    document.getElementById("beacon-container") && (document.getElementById("beacon-container").style.display = "none");
  }, []); // eslint-disable-line

  useEffect(() => {
    if (userDetails.role_id === userRole.TEACHER.role_id) {
      setShowUserLevel(true);
    }
  }, []); // eslint-disable-line

  let userLevelDetails = learning_mode
    ? +learning_mode === MATH_OPERATION.ADDITION
      ? addSubLevelList[level_id]
      : mulSubLevelList[level_id]
    : student_learning_mode_id === MATH_OPERATION.ADDITION
      ? addSubLevelList[add_sub_level_id]
      : mulSubLevelList[mul_div_level_id];

  //Logout success redirection to login page
  const authLogoutSuccess = () => {
    //  Not clearing all storage for class code
    localStorage.removeItem("practice_test_submissions_id");
    localStorage.removeItem("user-token");
    localStorage.removeItem("isSessionStarted");
    localStorage.removeItem("session_id");
    localStorage.removeItem("is_show_welcome_popup");
    localStorage.removeItem("is_teacher_login");
    sessionStorage.clear();
    navigate("/login");
  };
  const handleLogout = () => {
    dispatch(logout(authLogoutSuccess));
  };
  const idleTimeOutMinCount = 2;
  // Logout user
  const handleLogoutUser = () => {
    //check if session started then end and logout user
    let duration = moment.duration(moment().diff(sessionStorage.getItem("session_start_date")));
    let sessionTimeRemaining = Math.round(duration.asMinutes());

    if (sessionStorage.getItem("session_id")) {
      const body = {
        time_taken_in_min: sessionTimeRemaining,
        end_time: moment().format("YYYY-MM-DD HH:mm"),
        status: 1,

        ending_level_id: activeLevelId,
        updated_by: "STUDENT"
      };

      dispatch(endSession(sessionStorage.getItem("session_id"), body, handleLogout));
    } else {
      //only logout
      handleLogout();
    }
  };

  const handleToggleLogoutConfirmationDailog = () => {
    if (userDetails.role_id === userRole.STUDENT.role_id) {
      setIsShowLogoutConfirmationPopup(!isShowLogoutConfirmationPopup);
    } else {
      handleLogoutUser();
    }
  };

  let isShowUserLevelByPath = pathname.includes("/student/practice-select-activity");

  //Logo click redirection
  const handleRedirection = () => {
    switch (userDetails.role_id) {
      case userRole.TEACHER.role_id:
        return "/teacher/students";
      case userRole.SCHOOL_ADMIN.role_id:
        return "/admin/students";
      default:
        return handleStudentRedirection();
    }
  };
  const handleStudentRedirection = () => {
    if (
      (student_learning_mode_id === 1 && !!add_sub_level_id) ||
      (student_learning_mode_id === 2 && !!mul_div_level_id)
    ) {
      return "/student/practice-select-activity";
    } else {
      return "/student/placement-test";
    }
  };

  const handleOnIdle = async event => {
    let duration = moment.duration(moment().diff(sessionStorage.getItem("session_start_date"), "YYYY-MM-DD HH:mm"));

    const durationMinuteCount = Math.round(duration.asMinutes());

    const counter =
      durationMinuteCount > idleTimeOutMinCount ? durationMinuteCount - idleTimeOutMinCount : durationMinuteCount;
    const maxSessionLimit = studentSessionTimeLimitList.find(
      (limit, index) => index + 1 === studentSessionTimeLimitList.length
    ).value;
    let sessionID = sessionStorage.getItem("session_id");
    if (sessionID) {
      const body = {
        time_taken_in_min: counter > maxSessionLimit ? maxSessionLimit : counter,
        end_time: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
        status: 1,
        ending_level_id: activeLevelId,
        updated_by: "AUTO_LOGOUT"
      };

      await dispatch(endSession(sessionID, body, handleLogout));
    }
  };

  const handleCloseTabletBanner = () => {
    setIsShowTabletBanner(false);

    // let sessionStartInterval;
    // if session is not started then show progress table popup
    // if (
    //   sessionStorage.getItem("is_show_std_progress_table") !== "true" &&
    //   pathname === "/student/practice-select-activity"
    // ) {
    //   sessionStartInterval = setTimeout(() => {
    //     setIsShowProgressTablePopup(true);
    //   }, 1000);
    //   return () => clearInterval(sessionStartInterval);
    // }
  };
  //Show Progress Table  Popup
  if (process.env.REACT_APP_ENV !== "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIdleTimer({
      timeout: 1000 * 60 * idleTimeOutMinCount,
      onIdle: handleOnIdle,
      debounce: 500
    });
  }

  const [isShowProgressTablePopup, setIsShowProgressTablePopup] = useState(false);
  // const popupDelayTime = userDetails.is_show_tablet_banner ? 500 : 3000;
  const isVisibleTabletBanner = sessionStorage.getItem("is_show_tablet_banner") === "1";

  useEffect(() => {
    let sessionStartInterval;
    if (
      (sessionStorage.getItem("is_show_std_progress_table") !== "true" &&
        !isShowTabletBanner &&
        pathname === "/student/practice-select-activity" &&
        !isTablet) ||
      (sessionStorage.getItem("is_show_std_progress_table") !== "true" &&
        !isShowTabletBanner &&
        pathname === "/student/practice-select-activity" &&
        isTablet &&
        userDetails.profile.is_show_tablet_banner) ||
      (sessionStorage.getItem("is_show_std_progress_table") !== "true" &&
        !isShowTabletBanner &&
        pathname === "/student/practice-select-activity" &&
        isTablet &&
        !userDetails.profile.is_show_tablet_banner &&
        isVisibleTabletBanner)
    ) {
      sessionStartInterval = setTimeout(() => {
        setIsShowProgressTablePopup(true);
      }, 1000);
      return () => clearInterval(sessionStartInterval);
    }
  }, [isShowTabletBanner, pathname]); // eslint-disable-line

  const handleCloseProgressTablePopup = () => {
    sessionStorage.setItem("is_show_std_progress_table", true);
    setIsShowProgressTablePopup(false);
    handleStartSessionTimer();
  };
  // handle Start Session
  const handleStartSessionTimer = () => {
    sessionStorage.setItem("session_start_date", moment().format("YYYY-MM-DD HH:mm"));
  };
  return (
    <>
      {isTablet && role_id === userRole.STUDENT.role_id && (
        <TabletBanner
          close={handleCloseTabletBanner}
          open={userDetails && !userDetails.profile.is_show_tablet_banner && isShowTabletBanner}
        />
      )}

      <ProgressTablePopup close={handleCloseProgressTablePopup} isShowProgressTablePopup={isShowProgressTablePopup} />

      {/* {!isTablet && isShowTabletBanner && (
        <ProgressTablePopup
          close={handleCloseProgressTablePopup}
          isShowProgressTablePopup={isShowProgressTablePopup}
        />
      )} */}

      <header className="alt-header">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="header-flex">
                <div className="header-cols">
                  <Link to={handleRedirection()}>
                    <img src={logo} className="login-logo" alt="Math Fact Lab" />{" "}
                    {/* <span className="userModule">Student</span> */}
                  </Link>
                </div>
                {process.env.REACT_APP_ENV === "local" && (
                  <div className="App-header">
                    <button onClick={() => changeLanguage("es")}>de</button>
                    <button onClick={() => changeLanguage("en")}>en</button>
                  </div>
                )}
                {pathname === "/student/practice-select-activity" ||
                pathname === "/teacher/practice-select-activity" ? (
                  <div style={{ marginLeft: "145px" }}>
                    <h4 className="fm-activity-title">
                      {userDetails.role_id === userRole.TEACHER.role_id
                        ? t("practice-select-activity.SelectPracticeWord")
                        : t("practice-select-activity.selectNextActivityText")}
                    </h4>
                  </div>
                ) : (
                  ""
                )}

                <div className="header-cols">
                  <div className="user-profile-flex">
                    {isShowUserLevelByPath && !!userLevelDetails && (
                      <>
                        <div className={"user-level-wrapper"} onClick={() => setShowUserLevel(!isShowUserLevel)}>
                          {/* <div className="user-level bg-green">
                            <span>
                              {`${userLevelDetails.label}
                              ${userLevelDetails.descriptors}`}
                            </span>
                          </div> */}
                          <button className="user-profile-link bg-green">
                            Level{" "}
                            <span className="user-profile-grade">
                              {userLevelDetails.sort} {userLevelDetails.descriptors}
                            </span>
                          </button>

                          <button
                            className={isShowUserLevel ? "user-profile-link bg-blue show" : "user-profile-link bg-blue"}
                          >
                            {t("practice-select-activity.LevelText")}
                          </button>
                        </div>
                      </>
                    )}
                    {/* {isShowUserLevelByPath ? (
                      <div className="user-profile">
                        <button className="user-profile-link">
                          Level{" "}
                          <span className="user-profile-grade">
                            {userLevelDetails.sort}
                            {userLevelDetails.descriptors}
                          </span>
                        </button>
                      </div>
                    ) : (
                      ""
                    )} */}
                    <Popover
                      placement="bottom"
                      title={""}
                      overlayClassName="header-logout-popover"
                      content={
                        <li className="submenu-item">
                          <div className="sublink" onClick={() => handleToggleLogoutConfirmationDailog()}>
                            {/* <img
                              src={powerButtonImg}
                              alt="powerButtonImg"
                              style={{ width: "18px", marginRight: "10px" }}
                            />{" "} */}
                            <div>Log out</div>
                          </div>
                        </li>
                      }
                      trigger="click"
                    >
                      <div className="user-account">
                        <Button
                          className="user-acc-img "
                          name={`${userDetails.profile.first_name
                            .charAt(0)
                            .toUpperCase()} ${userDetails.profile.last_name.charAt(0).toUpperCase()}`}
                        />

                        {Object.keys(userDetails).length > 0
                          ? `${userDetails.profile.first_name} ${userDetails.profile.last_name}`
                          : ""}
                      </div>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isShowLogoutConfirmationPopup && (
        <LogoutConfirmationPopup close={handleToggleLogoutConfirmationDailog} open={isShowLogoutConfirmationPopup} />
      )}
    </>
  );
};

export default StudentAuthHeader;
