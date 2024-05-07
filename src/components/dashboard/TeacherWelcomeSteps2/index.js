import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Steps } from "antd";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import logo from "assets/images/logo.svg";
import "assets/sass/components/button-ant.scss";

const { Step } = Steps;

const TeacherWelcomeSteps2 = props => {
  const { userDetails } = useSelector(({ auth }) => auth);
  const [currentStep, setCurrentStep] = useState(3);
  const [studentList, setStudentList] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [studentsName, setStudentsName] = useState([]);

  const [studentNameInputText, setStudentNameInputText] = useState("");

  const [selectedLearningMode, setSelectedLearningMode] = useState(0);
  const [nameType, setNameType] = useState(2);

  const { closePopup, isOpenPopup, studentUserList } = props;

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
    if (currentStep === 5 || (userDetails.login_count > 1 && currentStep === 3)) {
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
    handleResetAllInput();
    closePopup();
    localStorage.setItem("is_show_student_step_popup", true);
  };

  useEffect(() => {
    if (isOpenPopup) {
      setCurrentStep(3);
    }
  }, [isOpenPopup]);

  const renderListByUserProfile = userDetails && userDetails.login_count > 1 ? stepsList.slice(1, -1) : stepsList;
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
                {currentStep === 0 && userDetails.login_count === 1 && (
                  <Step1 setCurrentStep={setCurrentStep} currentStep={currentStep} />
                )}
                {((currentStep === 1 && userDetails.login_count === 1) ||
                  (currentStep === 0 && userDetails.login_count > 1)) && (
                  <Step2
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    selectedClass={selectedClass}
                    handleSelectedClassCode={handleSelectedClassCode}
                    isOpenPopup={isOpenPopup}
                  />
                )}
                {((currentStep === 2 && userDetails.login_count === 1) ||
                  (currentStep === 1 && userDetails.login_count > 1)) && (
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
                {((currentStep === 3 && userDetails.login_count === 1) ||
                  (currentStep === 2 && userDetails.login_count > 1)) && (
                  <Step4
                    studentList={studentUserList}
                    selectedClass={selectedClass}
                    setStudentList={setStudentList}
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    handleBackAddClass={handleBackAddClass}
                  />
                )}
                {(currentStep === 4 || (currentStep === 3 && userDetails.login_count > 1)) && (
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

export default TeacherWelcomeSteps2;
