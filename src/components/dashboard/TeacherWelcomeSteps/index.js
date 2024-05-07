import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Steps } from "antd";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { userRole } from "config/const";
import logo from "assets/images/logo.svg";
import "assets/sass/components/button-ant.scss";

const { Step } = Steps;

const TeacherWelcomeSteps = props => {
  const location = useLocation();

  let navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const isShowWelcomePopup = query.get("is_show_student_welcome_popup") === "true";
  const { userDetails } = useSelector(({ auth }) => auth);
  const [currentStep, setCurrentStep] = useState(0);

  const [studentList, setStudentList] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [studentsName, setStudentsName] = useState([]);

  const [studentNameInputText, setStudentNameInputText] = useState("");

  const [selectedLearningMode, setSelectedLearningMode] = useState(0);
  const [nameType, setNameType] = useState(2);

  const { closePopup, isOpenPopup } = props;

  const handleResetAllInput = () => {
    setCurrentStep(0);
    setStudentList([]);
    setSelectedClass({});
    setStudentsName([]);
    setStudentNameInputText("");
    setSelectedLearningMode(0);
    setNameType(2);
  };
  const handleNextNewUser = () => {
    if (
      currentStep === 5 ||
      (userDetails.login_count > 1 && currentStep === 3) ||
      (userDetails.role_id !== userRole.TEACHER.role_id && currentStep === 3)
    ) {
      handleClose();

      // For not show again on new user
    } else if (currentStep === 3 || (userDetails.login_count > 1 && currentStep === 2)) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSelectedClassCode = class_code => {
    setSelectedClass(class_code);
  };

  const handleNameType = value => {
    setNameType(value);
  };

  const handleLearningMode = value => {
    setSelectedLearningMode(value);
  };

  const handleStudentsName = (value, textString) => {
    setStudentsName(value);
    setStudentNameInputText(textString);
  };

  const handleBackNewUser = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackAddClass = () => {
    if (userDetails.login_count === 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  };

  const stepsList = [
    {
      title: "Welcome"
    },
    {
      title: "Create/Select  Class"
    },
    {
      title: "Add Students"
    },
    {
      title: "Edit Student Details"
    },
    {
      title: "Print Login Cards"
    },
    {
      title: "Watch Intro Video"
    }
  ];

  const handleAddMoreClass = () => {
    handleResetAllInput();
    if (userDetails.login_count > 1) {
      setCurrentStep(0);
    } else {
      setCurrentStep(1);
    }
  };

  const handleClose = () => {
    const { pathname, search } = navigate.location || {};
    // Remove the query parameter
    // const newSearch = search.replace("?is_show_student_welcome_popup=true", "");
    const newSearch = search && search.replace("?is_show_student_welcome_popup=true", "");

    // Redirect to the new path without the query parameter
    navigate({ pathname, search: newSearch });

    handleResetAllInput();
    closePopup();
    localStorage.setItem("is_show_student_step_popup", true);
  };

  const renderListByUserProfile =
    (userDetails && userDetails.login_count > 1) || (userDetails && userDetails.role_id !== userRole.TEACHER.role_id)
      ? stepsList.slice(1, -1)
      : stepsList;

  useEffect(() => {
    if (isShowWelcomePopup) {
      setCurrentStep(5);
    }
  }, []); //eslint-disable-line

  return (
    <>
      <section className="welcome-step-layout">
        <div
          className={
            isOpenPopup
              ? "custom-popup open welcome-step-popup ease-in-popup"
              : "custom-popup  welcome-step-popup ease-in-popup"
          }
        >
          <div className="popup">
            {((currentStep !== 4 && userDetails.login_count <= 1) ||
              (currentStep !== 3 && userDetails.login_count > 1)) && (
              <span className="close-text" onClick={handleClose}>
                X Close
              </span>
            )}
            <div className="welcome-step-popup-left">
              <div className="popup-left-inner">
                <img src={logo} alt="MathFactLab" className="login-logo" />
                <Steps current={currentStep} direction="vertical" progressDot>
                  {renderListByUserProfile.map((stepDetails, i) => {
                    return <Step key={i} title={stepDetails.title} description={stepDetails.description} />;
                  })}
                </Steps>
              </div>
            </div>

            <div className={true ? "welcome-step-popup-right layout-content-center" : "welcome-step-popup-right"}>
              <div className="welcome-step-popup-content">
                {currentStep === 0 &&
                  userDetails.login_count === 1 &&
                  userDetails.role_id === userRole.TEACHER.role_id && (
                    <Step1 setCurrentStep={setCurrentStep} currentStep={currentStep} />
                  )}
                {((currentStep === 1 &&
                  userDetails.login_count === 1 &&
                  userDetails.role_id === userRole.TEACHER.role_id) ||
                  (currentStep === 0 &&
                    userDetails.login_count > 1 &&
                    userDetails.role_id === userRole.TEACHER.role_id) ||
                  (currentStep === 0 && userDetails.role_id !== userRole.TEACHER.role_id)) && (
                  <Step2
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    selectedClass={selectedClass}
                    handleSelectedClassCode={handleSelectedClassCode}
                    isOpenPopup={isOpenPopup}
                  />
                )}
                {((currentStep === 2 &&
                  userDetails.login_count === 1 &&
                  userDetails.role_id === userRole.TEACHER.role_id) ||
                  (currentStep === 1 &&
                    userDetails.login_count > 1 &&
                    userDetails.role_id === userRole.TEACHER.role_id) ||
                  (currentStep === 1 && userDetails.role_id !== userRole.TEACHER.role_id)) && (
                  <Step3
                    setStudentList={setStudentList}
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    handleBackAddClass={handleBackAddClass}
                    selectedClass={selectedClass}
                    handleStudentsName={handleStudentsName}
                    studentsName={studentsName}
                    studentNameInputText={studentNameInputText}
                    nameType={nameType}
                    selectedLearningMode={selectedLearningMode}
                    handleNameType={handleNameType}
                    handleLearningMode={handleLearningMode}
                  />
                )}
                {((currentStep === 3 &&
                  userDetails.login_count === 1 &&
                  userDetails.role_id === userRole.TEACHER.role_id) ||
                  (currentStep === 2 &&
                    userDetails.login_count > 1 &&
                    userDetails.role_id === userRole.TEACHER.role_id) ||
                  (currentStep === 2 && userDetails.role_id !== userRole.TEACHER.role_id)) && (
                  <Step4
                    studentList={studentList}
                    selectedClass={selectedClass}
                    setStudentList={setStudentList}
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    handleBackAddClass={handleBackAddClass}
                  />
                )}
                {((currentStep === 4 && userDetails.role_id === userRole.TEACHER.role_id) ||
                  (currentStep === 3 &&
                    userDetails.login_count > 1 &&
                    userDetails.role_id === userRole.TEACHER.role_id) ||
                  (currentStep === 3 && userDetails.role_id !== userRole.TEACHER.role_id)) && (
                  <Step5
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    selectedClass={selectedClass}
                    studentList={studentList}
                    handleAddMoreClass={handleAddMoreClass}
                  />
                )}

                {currentStep === 5 && userDetails.login_count <= 1 && (
                  <Step6 handleNextNewUser={handleNextNewUser} handleBackNewUser={handleBackNewUser} />
                )}
                {/* {currentStep > 0 && userDetails.login_count <= 1 && (
                  <div className="welcome-step-popup-footer">
                    <div className="back-nav-btn" onClick={handleBack}>
                      <ArrowLeftOutlined /> Back NEW
                    </div>
                    <div className="next-nav-btn" onClick={handleNextNewUser}>
                      Next NEW <ArrowRightOutlined />
                    </div>
                  </div>
                )} */}
                {/* {userDetails.login_count > 1 && (
                  <div className="welcome-step-popup-footer">
                    <div className="back-nav-btn" onClick={handleBackNewUser}>
                      <ArrowLeftOutlined /> Back OLD
                    </div>
                    <div className="next-nav-btn" onClick={handleNextOldUser}>
                      Next OLD <ArrowRightOutlined />
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>

        <div className={isOpenPopup ? "twoLayout-popup-backface open" : "twoLayout-popup-backface "}></div>
      </section>
    </>
  );
};

export default TeacherWelcomeSteps;
