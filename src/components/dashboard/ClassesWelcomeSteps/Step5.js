import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Table } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { addNewClassCode } from "../../../redux/actions";
import "assets/sass/components/button-ant.scss";

const EditableContext = React.createContext(null);

const Step5 = props => {
  const { handleNextNewUser, handleBackNewUser, classListName, selectedSchool, handleClassName } = props;
  const dispatch = useDispatch();
  const { schoolData } = useSelector(({ schoolData }) => schoolData);
  // Error Variables

  const handleSaveStudents = () => {
    const school = schoolData.find(scl => scl.id === selectedSchool);
    const classList = classListName.map(name => ({
      name: name,
      school_id: selectedSchool,
      school_district_id: school?.school_district_id
    }));
    const body = {
      classes: classList
    };
    dispatch(addNewClassCode(body));
    handleNextNewUser();
  };

  const handleNext = () => {
    handleSaveStudents();
  };
  const handleBack = () => {
    handleClassName([]);
    handleBackNewUser();
  };

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      if (dataIndex === "schoolName") {
        form.setFieldsValue({
          [dataIndex]: record[dataIndex]
        });
      } else {
        form.setFieldsValue({
          [dataIndex]: record[dataIndex]
        });
      }
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values
        });
      } catch (errInfo) {
        console.error("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const handleSave = row => {
    const newData = [...schoolNameString];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row
    });
    props.setClassListName(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const handleDelete = key => {
    const newData = classListName.filter((_, item) => item !== key);
    props.setClassListName(newData);
  };

  const defaultColumns = [
    {
      title: "School Name",
      dataIndex: "schoolName",
      key: "schoolName",
      editable: true
    },
    {
      title: "",
      key: "action",
      width: 50,
      align: "center",
      render: (_, record) => (
        <>
          <DeleteOutlined style={{ color: "#f92b2b" }} onClick={() => handleDelete(record.key)} />
        </>
      )
    }
  ];
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });

  // Create data for the table
  const schoolNameString = props.classListName.map((school, index) => ({
    key: index,
    schoolName: school
  }));
  // const schoolNameString = classListName.map(school => `${school}`);
  return (
    <>
      <div className="step-3">
        <div className="header-classes-text">Download Class Codes</div>
        <div className="step-3-inner">
          <div className="step-3-inner-left">
            <div>
              <div className="list-title">
                As you can see, each class that you have created has been assigned a class code.
              </div>
              <div className="list-title">
                You will use these class codes in the next steps when you import teachers and students.
              </div>
              <div className="list-title">
                Downloading the list of class codes may make it easier for you to copy and paste them into .csv files as
                needed in the next steps.
              </div>
              <div className="list-title">You can always add more classes at any time by going to the Classes tab.</div>
            </div>
          </div>
          <div className="step-3-inner-right">
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={schoolNameString}
              pagination={false}
              columns={columns}
              scroll={{ y: "calc(100vh - 650px)" }}
            />
          </div>
        </div>
      </div>

      <div className="welcome-step-popup-footer">
        <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div>
        <div className={"next-nav-btn"} onClick={handleNext}>
          Next <ArrowRightOutlined />
        </div>
      </div>
    </>
  );
};

export default Step5;

// import React, { useState, useEffect } from "react";
// import { Input } from "antd";
// import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";

// import "assets/sass/components/button-ant.scss";
// import { randomTwoDigitNumberGenerator } from "utils/helpers";
// import {
//   userRole,
//   maxTimeoutAnswerCountList,
//   studentPasswordList,
//   levelLifterWhoopsiesList,
//   studentSessionTimeLimitList,
// } from "config/const";

// import { debounce } from "lodash";
// const { TextArea } = Input;

// const Step5 = props => {
//   const {
//     handleNextNewUser,
//     handleBackNewUser,
//     selectedClass,
//     studentsName,
//     studentNameInputText,
//     handleStudentsName,
//     selectedLearningMode,

//     nameType,
//   } = props;

//   const { studentList } = useSelector(({ user }) => user);

//   // Error Variables

//   const [isNotMatchRules, setIsNotMatchRules] = useState(false);
//   const [isMultipleNamePerRawError, setIsMultipleNamePerRawError] = useState(
//     false,
//   );

//   useEffect(() => {
//     if (studentsName.length > 0) {
//       handleValidateInputText(studentsName, nameType);
//     }
//   }, []); //eslint-disable-line

//   const handleValidateInputText = (students, nameType) => {
//     if (nameType === 1) {
//       const studentSpaceValidationList = students.every(
//         std => std.split(" ").filter(str => str).length === 2,
//       );
//       const studentComaLengthCheck = students.every(
//         std => std.split(" ").filter(str => str).length > 2,
//       );

//       setIsMultipleNamePerRawError(studentComaLengthCheck);

//       !studentComaLengthCheck &&
//         setIsNotMatchRules(!studentSpaceValidationList);
//     } else {
//       const studentComaValidationList = students.every(
//         std => std.split(",").filter(str => str).length === 2,
//       );
//       const studentSpaceLengthCheck = students.every(
//         std => std.split(",").filter(str => str).length > 2,
//       );

//       setIsMultipleNamePerRawError(studentSpaceLengthCheck);

//       !studentSpaceLengthCheck &&
//         setIsNotMatchRules(!studentComaValidationList);
//     }
//   };

//   const handleStudentNameInputText = debounce(event => {
//     const students = event.target.value.split(/\n/).filter(str => str);

//     handleValidateInputText([...students], nameType);

//     handleStudentsName(students, event.target.value);

//     if (event.target.value === "") {
//       handleStudentsName([]);
//     }
//   }, 1000);

//   const handleSaveStudents = () => {
//     // eslint-disable-next-line array-callback-return

//     const students = [];

//     studentsName.map((student, i) => {
//       const name =
//         nameType === 1
//           ? student.split(" ").filter(str => str)
//           : student.split(",").map(str => str.trim());

//       const randomValue = Math.floor(
//         Math.random() * (studentPasswordList.length - 1 - 0) + 0,
//       );

//       const updatedUserNameByFnameLname =
//         nameType === 1
//           ? name[0]
//               ?.replace(/[^a-zA-Z0-9 ]/g, "")
//               .charAt(0)
//               .toLowerCase() +
//             name[1]
//               ?.replace(/[^a-zA-Z0-9 ]/g, "")
//               ?.replaceAll(" ", "")
//               .toLowerCase()
//           : name[1]
//               ?.replace(/[^a-zA-Z0-9 ]/g, "")
//               .charAt(0)
//               .toLowerCase() +
//             name[0]
//               ?.replace(/[^a-zA-Z0-9 ]/g, "")
//               ?.replaceAll(" ", "")
//               .toLowerCase();
//       const sameUserNameList = students.filter(user =>
//         user.user_name.startsWith(updatedUserNameByFnameLname),
//       );
//       const oldSameUserNameList = studentList.filter(user =>
//         user.user_name.startsWith(updatedUserNameByFnameLname),
//       );

//       let maxNum = 0;
//       [...sameUserNameList, ...oldSameUserNameList].forEach(user => {
//         if (+user.user_name.replace(/^\D+/g, "") > +maxNum) {
//           maxNum = +user.user_name.replace(/^\D+/g, "");
//         }
//       });

//       let user_name = maxNum
//         ? `${updatedUserNameByFnameLname}${maxNum + 1}`
//         : [...sameUserNameList, ...oldSameUserNameList].length
//         ? `${updatedUserNameByFnameLname}${
//             [...sameUserNameList, ...oldSameUserNameList].length
//           }`
//         : updatedUserNameByFnameLname;

//       const generatedPassword =
//         studentPasswordList[randomValue] + randomTwoDigitNumberGenerator();

//       const body = {
//         key: i,
//         user_name: user_name,
//         entered_name: name,
//         password: generatedPassword,
//         role_id: userRole.STUDENT.role_id,
//         profile: {
//           first_name: nameType === 1 ? name[0]?.replace(/,/g, "") : name[1],
//           last_name: nameType === 1 ? name[1]?.replace(/,/g, "") : name[0],
//           class_code: selectedClass.class_code,
//           student_learning_mode_id: selectedLearningMode,
//           auto_timeout_for_question: maxTimeoutAnswerCountList[2].value * 6,
//           max_retry_count_to_attempt_question: 1,
//           session_time_limit: studentSessionTimeLimitList[3].value,
//           allowed_level_lifter_whoopsies: levelLifterWhoopsiesList[2].value,
//           max_timeout_correct_ans_secs: maxTimeoutAnswerCountList[2].value,
//         },
//       };

//       students.push(body);
//       return body;
//     });

//     // message.success("Students has been saved successfully.");

//     setIsNotMatchRules(false);
//     // props.setStudentList(students);
//     handleNextNewUser();
//     // setCurrentStep(3);

//     // }
//   };

//   const handleNext = () => {
//     handleSaveStudents();
//   };
//   const handleBack = () => {
//     handleBackNewUser();
//   };

//   const isStdNameIncludeSpecialChar = studentsName.every(std => {
//     //: For all special
//     //: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]
//     //: below regex hyphens and apostrophes remove
//     const specialChars = /[`!@#$%^&*()_+\=\[\]{};:"\\|.<>\/?~]/; //eslint-disable-line

//     return !specialChars.test(std);
//   });

//   return (
//     <>
//       <div className="step-3">
//         <div className="header-classes-text">Download Class Codes</div>
//         <div className="step-3-inner">
//           <div className="step-3-inner-left">
//             <div>
//               <div className="list-title">
//                 As you can see, each class that you have created has been
//                 assigned a class code.
//               </div>
//               <div className="list-title">
//                 You will use these class codes in the next steps when you import
//                 teachers and students.
//               </div>
//               <div className="list-title">
//                 Downloading the list of class codes may make it easier for you
//                 to copy and paste them into .csv files as needed in the next
//                 steps.
//               </div>
//               <div className="list-title">
//                 You can always add more classes at any time by going to the
//                 Classes tab.
//               </div>
//             </div>
//           </div>
//           <div className="step-3-inner-right">
//             <TextArea
//               className="multiple-std-text-input-classes"
//               placeholder={
//                 nameType === 1
//                   ? `Mr. Kenny's Class               1235445
// Johnson Period 3   69857
// Franklin Grade 3-4   321456

// `
//                   : `Mr. Kenny's Class              1235445

// Johnson Period 3             1235445
// Franklin Grade 3-4.         1235445  `
//               }
//               onChange={handleStudentNameInputText}
//               defaultValue={studentsName.length > 0 ? studentNameInputText : ""}
//             ></TextArea>
//             {!isMultipleNamePerRawError && isNotMatchRules && (
//               <div className="list-menu-text-error">
//                 At least one student has more than two names listed. Please
//                 provide only the first and last name for each student.
//               </div>
//             )}
//             {isMultipleNamePerRawError && (
//               <div className="list-menu-text-error">
//                 Please enter only one name per line.
//               </div>
//             )}

//             {!isStdNameIncludeSpecialChar && (
//               <div className="list-menu-text-error">
//                 Please enter alphabetic and numeric characters only.
//               </div>
//             )}

//             {studentsName.length > 100 && (
//               <div className="list-menu-text-error">
//                 Please limit list to 100 or less names.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="welcome-step-popup-footer">
//         <div className="back-nav-btn" onClick={handleBack}>
//           <ArrowLeftOutlined /> Back
//         </div>
//         <div className={"next-nav-btn"} onClick={handleNext}>
//           Next <ArrowRightOutlined />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Step5;
