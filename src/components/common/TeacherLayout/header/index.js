import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Select from "components/ReactSelect";
import { useSelector, useDispatch } from "react-redux";
// import moment from "moment";
import { Layout, Dropdown, Avatar, Button, Space, Menu, Tag, Select, Input } from "antd";
import { MenuOutlined, UserOutlined, DownOutlined, ReloadOutlined } from "@ant-design/icons";
import UserMenu from "./user-menu";
import TeacherWelcomePopup from "components/dashboard/TeacherWelcomePopup";
import TutorialVideoPopup from "components/dashboard/TutorialVideoPopup";
import { userRole } from "config/const";
import { headerSearchText, headerSearchClassCode, headerSearchSchool, getUsersList } from "../../../../redux/actions";
import "assets/sass/components/header.scss";

const Header = ({ onMenuClick }) => {
  let location = useLocation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  let navigate = useNavigate();
  const teacherClassCode = +query.get("class_code");
  const schoolCode = +query.get("school_code");

  const { userDetails } = useSelector(({ auth }) => auth);

  const [isShowTutorialPopup, setIsShowTutorialPopup] = useState(false);
  const [tutorialKey, setTuTorialKey] = useState(1);

  const {
    userDetails: {
      email = "",
      profile: { first_name = "", last_name = "" },
      role_id
    }
  } = useSelector(({ auth }) => auth);

  const [isShowTeacherWelcomePopup, setIsShowTeacherWelcomePopup] = useState(false);

  useEffect(() => {
    if (!location.pathname.includes("teaching-tools")) {
      setIsShowTeacherWelcomePopup(true);
    }
  }, []); // eslint-disable-line
  // useEffect(() => {   // !! CHANGE THIS
  //   // remove condition for implement in all env
  //   if (
  //     process.env.REACT_APP_IS_HELP_SCOUT_DISABLE !== "yes" &&
  //     ((role_id === userRole.TEACHER.role_id &&
  //       !userDetails.school_district_id) ||
  //       role_id === userRole.PARENT.role_id)
  //   ) {
  //     document.getElementById("beacon-container") &&
  //       (document.getElementById("beacon-container").style.display = "block");
  //     return (
  //       <>
  //         <script type="text/javascript">
  //           {
  //             !(function (e, t, n) {
  //               function a() {
  //                 var e = t.getElementsByTagName("script")[0],
  //                   n = t.createElement("script");
  //                 // eslint-disable-next-line no-unused-expressions, no-sequences
  //                 (n.type = "text/javascript"),
  //                   (n.async = !0),
  //                   (n.src = "https://beacon-v2.helpscout.net"),
  //                   e.parentNode.insertBefore(n, e);
  //               }
  //               if (
  //                 ((e.Beacon = n =
  //                   function (t, n, a) {
  //                     e.Beacon.readyQueue.push({
  //                       method: t,
  //                       options: n,
  //                       data: a,
  //                     });
  //                   }),
  //                   (n.readyQueue = []),
  //                   "complete" === t.readyState)
  //               )
  //                 return a();
  //               e.attachEvent
  //                 ? e.attachEvent("onload", a)
  //                 : e.addEventListener("load", a, !1);
  //             })(window, document, window.Beacon || function () { })
  //           }
  //         </script>
  //         <script type="text/javascript">
  //           {window.Beacon("init", "b97acca9-dc14-4acb-ab9e-d9a7d0aee418")}
  //         </script>
  //       </>
  //     );
  //   } else {
  //     document.getElementById("beacon-container") &&
  //       (document.getElementById("beacon-container").style.display = "none");
  //   }

  //   return () => {
  //     document.getElementById("beacon-container") &&
  //       (document.getElementById("beacon-container").style.display = "none");
  //   };
  // }, [role_id]); // eslint-disable-line

  // useEffect(() => {
  //   if (role_name === "teacher") {
  //     return (
  //       <script type="text/javascript">
  //         {(function() {
  //           var script = document.createElement("script");
  //           script.setAttribute(
  //             "driftly-api",
  //             "HbmkyV1VhWWC5AlIU9BHuvZYiqy1D4MoKvhnwbmSauroS",
  //           );
  //           script.src =
  //             "https://storage.googleapis.com/driftly-cdn/driftly-loader.umd.js";
  //           document.head.appendChild(script);
  //         })()}
  //       </script>
  //     );
  //   }
  // }, [role_name]);

  // useEffect(() => { // !! CHANGE THIS
  //   if (
  //     // process.env.REACT_APP_ENV !== "development" &&
  //     (role_id === userRole.TEACHER.role_id &&
  //       !userDetails.school_district_id) ||
  //     role_id === userRole.PARENT.role_id
  //   ) {
  //     return (
  //       <>
  //         <script>
  //           {
  //             (window.usetifulTags = {
  //               userId: userDetails.id,
  //               userFirstName: userDetails.profile.first_name,
  //               signInCount: userDetails.login_count + "",
  //               isShowCheckList:
  //                 userDetails.profile.is_welcome_close === 1 ? "ON" : "OFF",
  //             })
  //           }
  //         </script>
  //         <script type="text/javascript">
  //           {(function (w, d, s) {
  //             var a = d.getElementsByTagName("head")[0];
  //             var r = d.createElement("script");
  //             r.async = 1;
  //             r.src = s;
  //             r.setAttribute("id", "usetifulScript");
  //             r.dataset.token = "363ec99b027cc7ea1798856b918f1ab8";
  //             a.appendChild(r);
  //           })(window, document, "https://www.usetiful.com/dist/usetiful.js")}
  //         </script>
  //       </>
  //     );
  //   }
  // }, [role_id]); // eslint-disable-line

  const [visibleUserMenu, setVisibleUserMenu] = React.useState(false);

  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { schoolData } = useSelector(({ schoolData }) => schoolData);
  const { searchClassCode } = useSelector(({ header }) => header);
  const [selectedClassCode, setSelectClassCode] = useState(teacherClassCode ? teacherClassCode : "");

  const [selectedSchoolCode, setSelectSchoolCode] = useState(schoolCode ? schoolCode : "");
  const classCodesList = classCodeList.map(classDetails => classDetails.class_code);
  useEffect(() => {
    if (!searchClassCode) {
      setSelectClassCode("");
    }
  }, [searchClassCode]); // eslint-disable-line

  useEffect(() => {
    if (teacherClassCode) {
      const selectedClass = classCodeList.find(classDetails => +classDetails.class_code === +teacherClassCode);
      const defaultOption = selectedClass ? `${selectedClass.name} - ${selectedClass.class_code}` : teacherClassCode;
      setSelectClassCode(defaultOption);
      dispatch(headerSearchClassCode(teacherClassCode));
    }
  }, [teacherClassCode, classCodeList]); // eslint-disable-line

  useEffect(() => {
    if (schoolCode) {
      setSelectSchoolCode(schoolCode);
      dispatch(headerSearchSchool(schoolCode));
    }
  }, [schoolCode]); // eslint-disable-line

  const sortedClassList = classCodeList
    ? [...classCodeList]?.sort((a, b) => {
        const nameA = (a.name || "").toLowerCase();
        const nameB = (b.name || "").toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0; // Names are equal
        }
      })
    : [];

  const classCodeListOption = [
    {
      label: "All Classes",
      value: ""
    },

    ...sortedClassList.map(classCode => {
      return {
        label: `${classCode.name} - ${classCode.class_code}`,
        value: classCode.class_code
      };
    })
  ];
  const schoolListOption = [
    {
      label: "All Schools",
      value: ""
    },
    ...schoolData.map(school => {
      return {
        label: school.name,
        value: school.id
      };
    })
  ];

  const handleChangeClassCode = classCode => {
    // : reset school to default on class change
    setSelectSchoolCode("");
    dispatch(headerSearchSchool(""));

    setSelectClassCode(classCode);
    dispatch(headerSearchClassCode(classCode));

    switch (role_id) {
      case userRole.SCHOOL_ADMIN.role_id:
        navigate("/admin/students");
        break;
      case userRole.PARENT.role_id:
        navigate("/parent/students");
        break;
      default:
        navigate("/teacher/students");
        break;
    }
  };

  // };
  const handleChangeSchool = schoolCode => {
    // : reset class to default on school change
    setSelectClassCode("");
    dispatch(headerSearchClassCode(""));

    // : school change
    setSelectSchoolCode(schoolCode);
    dispatch(headerSearchSchool(schoolCode));
    // history.push(`/school-admin/classes`);
  };

  const handleChangeSearchText = e => {
    dispatch(headerSearchText(e.target.value));
  };

  const handleCloseTeacherWelcomePopup = () => {
    // localStorage.setItem("is_show_welcome_popup", true);

    setIsShowTeacherWelcomePopup(false);
  };

  const tutorialsObj = {
    1: {
      itemTitle: "MathFactLab 101: Getting Started",
      tutorialIframeTitle: "MathFactLab 101: Getting Started",
      tutorialIframeURL: "https://player.vimeo.com/video/793753544?h=69ed5603ed"
    },
    2: {
      itemTitle: "The Placement Test",
      tutorialIframeTitle: "The Placement Test",
      tutorialIframeURL: "https://player.vimeo.com/video/803991930?h=0100772466"
    },
    3: {
      itemTitle: "The Student Experience",
      tutorialIframeTitle: "The Student Experience",
      tutorialIframeURL: "https://player.vimeo.com/video/800363534?h=2eee64595f"
    },
    4: {
      itemTitle: "Using Ipads and Tablets",
      tutorialIframeTitle: "Using Ipads and Tablets",
      tutorialIframeURL: "https://player.vimeo.com/video/809561434?h=64b5a19366"
    },
    5: {
      itemTitle: "Ways to Differentiate",
      tutorialIframeTitle: "Ways to Differentiate",
      tutorialIframeURL: "https://player.vimeo.com/video/854804900?h=399723031e"
    },
    6: {
      itemTitle: "Assign Button",
      tutorialIframeTitle: "Assign Button",
      tutorialIframeURL: "https://player.vimeo.com/video/849647095?h=fdb0769f95"
    }
  };
  const handleShowTutorialPopup = key => {
    setTuTorialKey(key);
    setIsShowTutorialPopup(true);
  };
  //  fetch the Student's list
  const handleFetchStudentList = () => {
    // const currentDate = moment(userDetails.profile.created_at).format(
    //   "YYYY-MM-DD",
    // );
    dispatch(getUsersList(classCodesList));
  };

  const [selectWidth, setSelectWidth] = useState(260);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth > 1440 ? 260 : 150; // Example: Adjust width based on window size
      setSelectWidth(width);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial width calculation

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Layout.Header className="dashboard-header">
        <MenuOutlined className="drawerToggle" onClick={onMenuClick} />

        <div className="tutorial" style={{ display: "flex", alignItems: "center" }}>
          <Dropdown
            overlay={
              <Menu>
                {Object.keys(tutorialsObj).map(tutorialItem => {
                  return (
                    <Menu.Item key={tutorialItem} onClick={() => handleShowTutorialPopup(tutorialItem)}>
                      {tutorialsObj[tutorialItem].itemTitle}
                    </Menu.Item>
                  );
                })}
              </Menu>
            }
          >
            <Button size="medium">
              <Space>
                Tutorials
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          {(location.pathname === "/teacher/students" || location.pathname === "/admin/students") && (
            <Button size="medium" style={{ margin: 7 }} onClick={handleFetchStudentList}>
              <Space>
                <ReloadOutlined />
              </Space>
            </Button>
          )}
        </div>

        {/* {process.env.REACT_APP_ENV === "alpha" && (
          <div className="login-count-show">
            <Tag className="ml-30">
              Login count : <b>{userDetails.login_count}</b>
            </Tag>
          </div>
        )} */}
        {userDetails && userDetails.role_id === userRole.SCHOOL_ADMIN.role_id && (
          <>
            <div className="ml-20 district-title">
              <span className="title">{userDetails.school_district.name}</span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Tag>
                  <b>
                    {+userDetails?.school_district.max_student_licenses -
                      +userDetails?.school_district.utilized_student_licenses}
                    /{userDetails?.school_district.max_student_licenses}
                  </b>{" "}
                  Licenses Available
                </Tag>
              </div>
            </div>
          </>
        )}

        <div style={{ flex: 1 }} className="class-code-dropdown" />

        {/* {location.pathname === "/school-admin/teacher" &&
          role_name !== "parent" && (
            <Select
              name="learningMode"
              className="form-control "
              value={selectedClassCode}
              options={classCodeListOption}
              onChange={handleChangeTeacherCode}
              style={{ width: 260 }}
            >
              {classCodeListOption}
            </Select>
          )} */}
        {/* location.pathname === "/school-admin/teacher" || */}

        {/* {location.pathname === "/teacher/students" &&
        userDetails.role_id === userRole.SCHOOL_ADMIN.role_id ? (
          <Select
            name="schoolCode"
            className="form-control ml-20"
            value={selectedSchoolCode}
            options={schoolListOption}
            onChange={handleChangeSchool}
            style={{ width: 260 }}
          >
            {schoolListOption}
          </Select>
        ) : null} */}

        {/* {location.pathname === "/admin/students" &&
          userDetails.role_id === userRole.SCHOOL_ADMIN.role_id ? (
          <Select
            name="schoolCode"
            style={{ width: selectWidth, height: 40 }}
            value={selectedSchoolCode}
            onChange={handleChangeSchool}
            options={schoolListOption}
          />
        ) : null} */}
        {(location.pathname === "/admin/students" || location.pathname === "/teacher/students") &&
        userDetails.role_id === userRole.SCHOOL_ADMIN.role_id ? (
          <Select
            name="schoolCode"
            style={{ width: selectWidth }}
            value={selectedSchoolCode}
            onChange={handleChangeSchool}
            options={schoolListOption}
          />
        ) : null}

        {(location.pathname === "/admin/students" || location.pathname === "/teacher/students") &&
          role_id !== userRole.PARENT.role_id && (
            <div className="ml-20">
              <Select
                name="classCode"
                style={{ width: selectWidth }}
                value={selectedClassCode}
                onChange={handleChangeClassCode}
                options={classCodeListOption}
              />
            </div>
          )}

        {[
          "/admin/classes",
          "/admin/teacher",
          "/teacher/classes",
          "/admin/schools",
          "/admin/students",
          "/teacher/students",
          "/parent/students"
        ].includes(location.pathname) && (
          <div className="search with-button">
            <Input
              type="text"
              style={{ width: selectWidth }}
              // className="form-control search with-button header-searchbar"
              placeholder="Search"
              onChange={e => handleChangeSearchText(e)}
              name="search"
            />
            <div className="btn-icon-trans">
              <i className="icon-search" aria-hidden="true"></i>
            </div>
          </div>
        )}

        {/* {location.pathname === "/school-admin/teacher" && (
          <div className="search with-button">
            <input
              type="text"
              className="form-control search with-button header-searchbar"
              placeholder="Search"
              onChange={e => handleChangeSearchText(e)}
              name="search"
            />
            <div className="btn-icon-trans">
              <i className="icon-search" aria-hidden="true"></i>
            </div>
          </div>
        )}
        {location.pathname === "/teacher/classes" && (
          <div className="search with-button">
            <input
              type="text"
              className="form-control search with-button header-searchbar"
              placeholder="Search"
              onChange={e => handleChangeSearchText(e)}
              name="search"
            />
            <div className="btn-icon-trans">
              <i className="icon-search" aria-hidden="true"></i>
            </div>
          </div>
        )}
        {location.pathname === "/school-admin/schools && (
          <div className="search with-button">
            <input
              type="text"
              className="form-control search with-button header-searchbar"
              placeholder="Search"
              onChange={e => handleChangeSearchText(e)}
              name="search"
            />
            <div className="btn-icon-trans">
              <i className="icon-search" aria-hidden="true"></i>
            </div>
          </div>
        )}
      
        {location.pathname === "/teacher/students" && (
          <div className="search with-button">
            <input
              type="text"
              className="form-control search with-button header-searchbar"
              placeholder="Search"
              onChange={e => handleChangeSearchText(e)}
              name="search"
            />
            <div className="btn-icon-trans">
              <i className="icon-search" aria-hidden="true"></i>
            </div>
          </div>
        )} */}
        <div className="user-profile-menu">
          <Dropdown
            overlay={<UserMenu closeMenu={() => setVisibleUserMenu(false)} />}
            trigger="click"
            open={visibleUserMenu}
            onOpenChange={setVisibleUserMenu}
          >
            <div className="user-menu-wrapper">
              {/* <Badge dot className="avatar"> */}
              <Avatar size={40} style={{ backgroundColor: "#2dca89" }} icon={<UserOutlined />} />
              {/* </Badge> */}

              {first_name && last_name && (
                <div className="user-profile-short ml-10">
                  <strong className="title-text font-14 font-semibold">
                    {`${first_name.charAt(0).toUpperCase() + first_name.slice(1)} ${
                      last_name.charAt(0).toUpperCase() + last_name.slice(1)
                    }`}
                  </strong>
                  <span className="font-small">{email}</span>{" "}
                </div>
              )}
            </div>
          </Dropdown>
        </div>
      </Layout.Header>
      {location.pathname === "/teacher/classes" &&
        false && ( //temp false
          <TeacherWelcomePopup
            close={handleCloseTeacherWelcomePopup}
            open={
              userDetails.role_id === userRole.TEACHER.role_id &&
              userDetails &&
              !userDetails.profile.is_disabled_welcome_banner &&
              isShowTeacherWelcomePopup
            }
          />
        )}
      {isShowTutorialPopup && (
        <TutorialVideoPopup
          isOpenPopup={isShowTutorialPopup}
          closePopup={setIsShowTutorialPopup}
          tutorial={tutorialsObj[tutorialKey]}
        />
      )}
    </>
  );
};

export default Header;
