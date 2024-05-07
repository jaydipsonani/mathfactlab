import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input, Radio, message, Tooltip } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { randomTwoDigitNumberGenerator } from "utils/helpers";
import {
  userRole,
  maxTimeoutAnswerCountList,
  studentPasswordList,
  levelLifterWhoopsiesList,
  studentSessionTimeLimitList
} from "config/const";
import "assets/sass/components/button-ant.scss";
import { debounce } from "lodash";
const { TextArea } = Input;

const Step3 = props => {
  const {
    handleNextNewUser,
    handleBackNewUser,
    selectedClass,
    studentsName,
    studentNameInputText,
    handleStudentsName,
    selectedLearningMode,
    handleLearningMode,
    handleNameType,
    nameType
  } = props;

  const maxStudentAddBulkLimit = 50;
  const { studentList } = useSelector(({ user }) => user);
  const { userDetails } = useSelector(({ auth }) => auth);

  // Error Variables

  const [isNotMatchRules, setIsNotMatchRules] = useState(false);
  const [isMultipleNamePerRawError, setIsMultipleNamePerRawError] = useState(false);

  useEffect(() => {
    if (studentsName.length > 0) {
      handleValidateInputText(studentsName, nameType);
    }
  }, []); //eslint-disable-line
  const onChangeNameType = e => {
    handleNameType(e.target.value);
    handleValidateInputText(studentsName, e.target.value);
  };

  const handleValidateInputText = (students, nameType) => {
    if (nameType === 1) {
      const studentSpaceValidationList = students.every(std => std.split(" ").filter(str => str).length === 2);
      const studentComaLengthCheck = students.some(std => std.split(" ").filter(str => str).length > 2);

      setIsMultipleNamePerRawError(studentComaLengthCheck);

      setIsNotMatchRules(!studentSpaceValidationList);
    } else {
      const studentComaValidationList = students.every(std => std.split(",").filter(str => str).length === 2);

      const studentSpaceLengthCheck = students.some(std => std.split(",").filter(str => str).length > 2);

      setIsMultipleNamePerRawError(studentSpaceLengthCheck);

      setIsNotMatchRules(!studentComaValidationList);
    }
  };

  const onChangeSelectLearningMode = e => {
    handleLearningMode(e.target.value);
  };

  const handleStudentNameInputText = debounce(event => {
    const students = event.target.value.split(/\n/).filter(str => str);

    handleValidateInputText([...students], nameType);
    // students.forEach(name => {

    //   let separatedNameList;
    //   if (nameType === 1) {

    //     !!name.includes(",") && setIsNotMatchRules(true);
    //     // separatedNameList = name.split(" ").filter(str => str);

    //   } else {

    //     name.includes(" ") && !isNotMatchRules && setIsNotMatchRules(true);
    //     // separatedNameList = name.split(",").filter(str => str);

    //   }

    // if (!nameType || !selectedLearningMode || studentsName.length === 0) {
    //   setIsValidError(true);
    //   if (
    //     (nameType === 1 && separatedBySpaceList.length > 2) ||
    //     (nameType === 2 && separatedByComaList.length > 2)
    //   ) {
    //     setIsValidError(true);
    //     setIsMultipleNameInRaw(true);
    //   }
    //   if (
    //     (nameType === 1 && separatedBySpaceList.length !== 2) ||
    //     (nameType === 2 && separatedByComaList.length !== 2)
    //   ) {
    //     // setIsTextAreaError(false);
    //     setIsValidError(true);
    //     setIsNotMatchRules(true);
    //   }
    //   // setIsTextAreaError(true);
    // } else if (
    //   separatedBySpaceList.length > 2 ||
    //   separatedByComaList.length > 2
    // ) {
    //   setIsValidError(true);
    //   setIsMultipleNameInRaw(true);
    // } else if (
    //   (nameType === 1 && separatedBySpaceList.length !== 2) ||
    //   (nameType === 2 && separatedByComaList.length !== 2)
    // ) {
    //   // setIsTextAreaError(false);
    //   setIsValidError(true);
    //   setIsNotMatchRules(true);
    // } else if (studentsName.length > 100) {
    //   // setIsTextAreaError(false);
    //   setIsValidError(true);
    //   setIsMoreStudentsName(true);
    // } else {
    //   // setIsTextAreaError(false);
    //   setIsNotMatchRules(false);
    //   setIsValidError(false);
    //   setIsAtLeastStudentError(false);
    //   setIsMultipleNameInRaw(false);
    //   setIsMoreStudentsName(false);
    // }

    //   return name;
    // });

    handleStudentsName(students, event.target.value);

    if (event.target.value === "") {
      handleStudentsName([]);
    }
  }, 1000);

  const handleSaveStudents = () => {
    // eslint-disable-next-line array-callback-return

    const students = [];

    studentsName.map((student, i) => {
      const name = nameType === 1 ? student.split(" ").filter(str => str) : student.split(",").map(str => str.trim());

      const randomValue = Math.floor(Math.random() * (studentPasswordList.length - 1 - 0) + 0);

      const updatedUserNameByFnameLname =
        nameType === 1
          ? name[0]
              ?.replace(/[^a-zA-Z0-9 ]/g, "")
              .charAt(0)
              .toLowerCase() +
            name[1]
              ?.replace(/[^a-zA-Z0-9 ]/g, "")
              ?.replaceAll(" ", "")
              .toLowerCase()
          : name[1]
              ?.replace(/[^a-zA-Z0-9 ]/g, "")
              .charAt(0)
              .toLowerCase() +
            name[0]
              ?.replace(/[^a-zA-Z0-9 ]/g, "")
              ?.replaceAll(" ", "")
              .toLowerCase();
      const sameUserNameList = students.filter(user => user.user_name.startsWith(updatedUserNameByFnameLname));
      const oldSameUserNameList = studentList.filter(user => user.user_name.startsWith(updatedUserNameByFnameLname));

      let maxNum = 0;
      [...sameUserNameList, ...oldSameUserNameList].forEach(user => {
        if (+user.user_name.replace(/^\D+/g, "") > +maxNum) {
          maxNum = +user.user_name.replace(/^\D+/g, "");
        }
      });

      let user_name = maxNum
        ? `${updatedUserNameByFnameLname}${maxNum + 1}`
        : [...sameUserNameList, ...oldSameUserNameList].length
          ? `${updatedUserNameByFnameLname}${[...sameUserNameList, ...oldSameUserNameList].length}`
          : updatedUserNameByFnameLname;

      user_name = user_name?.trim().replace(/\s+/g, "-");
      const generatedPassword = studentPasswordList[randomValue] + randomTwoDigitNumberGenerator();

      const body = {
        key: i,
        entered_name: name,
        user_name: user_name,
        password: generatedPassword?.trim(),
        role_id: userRole.STUDENT.role_id,
        school_district_id: userDetails.school_district_id,
        class_code: selectedClass.class_code,
        // profile: {
        //   first_name: nameType === 1 ? name[0]?.replace(/,/g, "") : name[1],
        //   last_name: nameType === 1 ? name[1]?.replace(/,/g, "") : name[0],
        //   class_code: selectedClass.class_code,
        //   student_learning_mode_id: selectedLearningMode,
        //   auto_timeout_for_question: maxTimeoutAnswerCountList[2].value * 6,
        //   max_retry_count_to_attempt_question: 1,
        //   session_time_limit: studentSessionTimeLimitList[3].value,
        //   allowed_level_lifter_whoopsies: levelLifterWhoopsiesList[2].value,
        //   max_timeout_correct_ans_secs: maxTimeoutAnswerCountList[2].value,
        // },
        profile: {
          first_name: nameType === 1 ? name[0]?.replace(/,/g, "") : name[1],
          last_name: nameType === 1 ? name[1]?.replace(/,/g, "") : name[0],

          student_learning_mode_id: selectedLearningMode,
          auto_timeout_for_question: maxTimeoutAnswerCountList[2].value * 6,
          max_retry_count_to_attempt_question: 1,
          session_time_limit: studentSessionTimeLimitList[3].value,
          allowed_level_lifter_whoopsies: levelLifterWhoopsiesList[2].value,
          max_timeout_correct_ans_secs: maxTimeoutAnswerCountList[2].value,
          is_super_level_lifter_lock: 1
        }
      };

      students.push(body);
      return body;
    });

    message.success("Students have been saved successfully.");

    setIsNotMatchRules(false);
    props.setStudentList(students);
    handleNextNewUser();
    // setCurrentStep(3);

    // }
  };

  const handleNext = () => {
    handleSaveStudents();
  };
  const handleBack = () => {
    handleBackNewUser();
  };

  const isStdNameIncludeSpecialChar = studentsName.every(std => {
    //: For all special
    //: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]
    //: below regex hyphens and apostrophes remove
    const specialChars = /^[a-zA-Z0-9!@#$%^&*()_+{},~|\/?\-= ]+$/; //eslint-disable-line

    return specialChars.test(std);
  });

  const isMaxStudentCountReached = studentList.length + studentsName.length > userDetails.profile.max_students_license;

  return (
    <>
      <div className="step-3">
        <div className="header-text">Enter Student Names</div>
        <div className="step-3-inner">
          <div className="step-3-inner-left">
            <div>
              <div className="selected-class">{`${selectedClass.name}-${selectedClass.class_code}`}</div>
            </div>

            <div>
              <div className="list-title">1. Select your preferred entry option.</div>
              <div className="radio-grp-container">
                <Radio.Group onChange={e => onChangeNameType(e)} value={nameType}>
                  <Radio value={2}>
                    <span className="list-menu-text">Enter one name per line: LastName, FirstName</span>
                    <p className="list-menu-sub-text">(Names separated by a comma.)</p>
                  </Radio>
                  <Radio value={1}>
                    <span className="list-menu-text">Enter one name per line: FirstName LastName</span>
                    <p className="list-menu-sub-text">(Names separated by a space. No commas.)</p>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {!nameType && studentsName.length > 0 ? (
              <span className="list-menu-text-error">Please select an entry option</span>
            ) : (
              ""
            )}
            <div>
              <Radio.Group onChange={onChangeSelectLearningMode} value={selectedLearningMode}>
                <span className="list-title">2. Most of the students in this class will start by studying:</span>

                <div className="radio-grp-container">
                  <Radio value={1}>
                    <p className="list-menu-text">Addition/Subtraction</p>
                  </Radio>
                  <br />
                  <Radio value={2}>
                    <p className="list-menu-text">Multiplication/Division</p>
                  </Radio>
                </div>
              </Radio.Group>
            </div>
            {!selectedLearningMode && studentsName.length > 0 ? (
              <span className="list-menu-text-error">Please select one of the above learning modes.</span>
            ) : (
              ""
            )}

            <div className="list-menu-sub-text-disable mt-15">
              You'll be able to make individual adjustments in the next step.
            </div>
          </div>
          <div className="step-3-inner-right">
            <TextArea
              className="multiple-std-text-input"
              placeholder={
                nameType === 1
                  ? `Anna Rodriguez
James Middleton
etc.  
`
                  : `Griffiths, Kiante
Keller, Samantha
etc. `
              }
              onChange={handleStudentNameInputText}
              defaultValue={studentsName.length > 0 ? studentNameInputText : ""}
            ></TextArea>
            {!isMultipleNamePerRawError &&
              isNotMatchRules &&
              (nameType === 1 ? (
                <div className="list-menu-text-error">At least one name is missing a space.</div>
              ) : (
                <div className="list-menu-text-error">At least one name is missing a comma.</div>
              ))}
            {isMultipleNamePerRawError &&
              (nameType === 1 ? (
                <div className="list-menu-text-error">
                  Double last names need to be hyphenated. To avoid this, add students with double last names using the
                  LastName, FirstName option.
                </div>
              ) : (
                <div className="list-menu-text-error">
                  At least one student has more than two names listed. Please provide only the first and last name for
                  each student.
                </div>
              ))}

            {isMaxStudentCountReached && (
              <div className="list-menu-text-error">Maximum student count reached. You cannot add more students.</div>
            )}
            {!isStdNameIncludeSpecialChar && (
              <div className="list-menu-text-error">Please enter alphabetic and numeric characters only.</div>
            )}

            {/* {isTextAreaError && studentsName.length === 0 && (
              <span className="list-menu-text-error">
                Please enter at least one name.
              </span>
            )} */}
            {/* {isMultipleNameInRaw && (
              <span className="list-menu-text-error">
                Please enter only one name per line.
              </span>
            )} */}
            {studentsName.length > maxStudentAddBulkLimit && (
              <div className="list-menu-text-error">
                {`Please limit list to ${maxStudentAddBulkLimit} or less names.`}
              </div>
            )}

            {/* <div className="step-3-actions-button">
              <Button
                type="primary"
                size="large"
                className="joyride-2"
                onClick={handleSaveStudents}
              >
                Save and Add More Students
              </Button>
            </div> */}

            {/* {isAtLeastStudentError && (
              <span className="list-menu-text-error">
                Please add at least one student.
              </span>
            )} */}
            <div className="list-menu-sub-text-disable mt-15">
              Students can also be added at any time on the teacher dashboard.
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-step-popup-footer">
        <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div>
        {studentsName.length > 0 &&
        studentsName.length <= 100 &&
        nameType &&
        selectedLearningMode &&
        !isNotMatchRules &&
        !isMultipleNamePerRawError &&
        isStdNameIncludeSpecialChar &&
        !isMaxStudentCountReached ? (
          <div className={"next-nav-btn"} onClick={handleNext}>
            Next <ArrowRightOutlined />
          </div>
        ) : (
          <div className={"next-nav-btn disable"}>
            <Tooltip title="Please add at least one student." placement="top">
              Next <ArrowRightOutlined />
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};

export default Step3;
