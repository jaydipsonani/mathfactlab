import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Steps } from "antd";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step7 from "./Step7";
import logo from "assets/images/logo.svg";
import "assets/sass/components/button-ant.scss";

const ClassesWelcomeSteps = props => {
  const { userDetails } = useSelector(({ auth }) => auth);
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedClass, setSelectedClass] = useState({});
  const [className, setClassName] = useState([]);

  const [ClassNameInputText, setClassNameInputText] = useState("");
  const [classListName, setClassListName] = useState("");

  const [selectedLearningMode, setSelectedLearningMode] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState("");

  const [nameType, setNameType] = useState(2);
  // const [studentList, setStudentList] = useState([]);

  const { closePopup, isOpenPopup } = props;

  const handleResetAllInput = () => {
    setCurrentStep(0);
    setSelectedClass({});
    setClassName([]);
    // setStudentList([]);
    setClassListName([]);
    setClassNameInputText("");
    setSelectedLearningMode(0);
    setNameType(2);
  };
  const handleNextNewUser = () => {
    if (currentStep === 5) {
      handleClose();
      // For not show again on new user
    } else {
      setCurrentStep(currentStep + 1);
    }
    // setCurrentStep(currentStep + 1);
  };

  const handleNameType = value => {
    setNameType(value);
  };

  const handleLearningMode = value => {
    setSelectedLearningMode(value);
  };

  const handleSelectSchool = value => {
    setSelectedSchool(value);
  };

  const handleStudentsName = (value, textString) => {
    setClassName(value);
    setClassNameInputText(textString);
  };
  const handleClassListName = value => {
    setClassListName(value);
  };
  const handleBackNewUser = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    // setCurrentStep(currentStep - 1);
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
      title: "Add Schools"
    },
    {
      title: "Download School Codes"
    },
    {
      title: "Create  Class"
    },
    {
      title: "Download Class Codes"
    },
    // {
    //   title: "Class list",
    // },
    {
      title: "Tutorial video"
    }
  ];

  const handleClose = () => {
    handleResetAllInput();
    closePopup();
  };

  const renderListByUserProfile = userDetails ? stepsList.slice() : stepsList;
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
          {/* <div className="popup">
            {((currentStep !== 4 && userDetails.login_count <= 1) ||
              (currentStep !== 3 && userDetails.login_count > 1)) && (
              <span className="close-text" onClick={handleClose}>
                X Close
              </span>
            )} */}
          <div className="popup">
            <span className="close-text" onClick={handleClose}>
              X Close
            </span>

            <div className="welcome-step-popup-left">
              <div className="popup-left-inner">
                <img src={logo} alt="MathFactLab" className="login-logo" />
                <Steps
                  current={currentStep}
                  direction="vertical"
                  progressDot
                  items={renderListByUserProfile.map((stepDetails, i) => ({
                    key: i,
                    title: stepDetails.title,
                    description: stepDetails.description
                  }))}
                />
              </div>
            </div>

            <div className={true ? "welcome-step-popup-right layout-content-center" : "welcome-step-popup-right"}>
              <div className="welcome-step-popup-content">
                {currentStep === 0 && (
                  <Step1
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
                    handleNextNewUser={handleNextNewUser}
                  />
                )}
                {currentStep === 1 && (
                  <Step2
                    setStudentName={setClassName}
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    handleBackAddClass={handleBackAddClass}
                    selectedClass={selectedClass}
                    handleSchoolName={handleStudentsName}
                    schoolName={className}
                    schoolNameInputText={ClassNameInputText}
                    nameType={nameType}
                    selectedLearningMode={selectedLearningMode}
                    handleNameType={handleNameType}
                    handleLearningMode={handleLearningMode}
                  />
                )}
                {currentStep === 2 && (
                  <Step3
                    setStudentsName={setClassName}
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    handleBackAddClass={handleBackAddClass}
                    selectedClass={selectedClass}
                    handleStudentsName={handleStudentsName}
                    studentsName={className}
                    studentNameInputText={ClassNameInputText}
                    nameType={nameType}
                    selectedLearningMode={selectedLearningMode}
                    handleNameType={handleNameType}
                    handleLearningMode={handleLearningMode}
                    handleSchoolName={handleStudentsName}
                    // studentList={studentList}
                  />
                )}
                {currentStep === 3 && (
                  <Step4
                    setStudentName={setClassName}
                    setClassListName={setClassListName}
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    handleBackAddClass={handleBackAddClass}
                    selectedClass={selectedClass}
                    handleStudentsName={handleStudentsName}
                    studentsName={className}
                    studentNameInputText={ClassNameInputText}
                    nameType={nameType}
                    selectedLearningMode={selectedLearningMode}
                    handleNameType={handleNameType}
                    handleLearningMode={handleLearningMode}
                    handleSelectSchool={handleSelectSchool}
                    handleClassName={handleClassListName}
                    classListName={classListName}
                    selectedSchool={selectedSchool}
                  />
                )}
                {currentStep === 4 && (
                  <Step5
                    setClassListName={setClassListName}
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    handleBackAddClass={handleBackAddClass}
                    selectedClass={selectedClass}
                    handleStudentsName={handleStudentsName}
                    studentsName={className}
                    studentNameInputText={ClassNameInputText}
                    nameType={nameType}
                    selectedLearningMode={selectedLearningMode}
                    handleNameType={handleNameType}
                    handleLearningMode={handleLearningMode}
                    selectedSchool={selectedSchool}
                    classListName={classListName}
                    handleClassName={handleClassListName}
                  />
                )}
                {/* {currentStep === 5 && (
                  <Step6
                    // studentList={studentList}
                    selectedClass={selectedClass}
                    // setStudentList={setStudentList}
                    handleNextNewUser={handleNextNewUser}
                    handleBackNewUser={handleBackNewUser}
                    handleBackAddClass={handleBackAddClass}
                  />
                )} */}

                {currentStep === 5 && (
                  <Step7 handleNextNewUser={handleNextNewUser} handleBackNewUser={handleBackNewUser} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={isOpenPopup ? "twoLayout-popup-backface open" : "twoLayout-popup-backface "}></div>
      </section>
    </>
  );
};

export default ClassesWelcomeSteps;
