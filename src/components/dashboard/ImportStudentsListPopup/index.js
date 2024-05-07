import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Papa from "papaparse";
import { InboxOutlined } from "@ant-design/icons";
import { isEmpty, drop } from "lodash";
import { message, Modal, Upload } from "antd";
import { addBulkStudents } from "../../../redux/actions/userAction";
import {
  userRole,
  maxTimeoutAnswerCountList,
  studentPasswordList,
  levelLifterWhoopsiesList,
  studentSessionTimeLimitList
} from "config/const";
import { randomTwoDigitNumberGenerator, addLeadingZeros } from "utils/helpers";
import sampleStudentList from "assets/xls/MathFactLab_Student_Import_Template.xlsx";

const { Dragger } = Upload;

const ImportStudentListPopup = props => {
  const maxStudentAddBulkLimit = 2000;
  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { studentList: studentUserList, addNewUsersError, addNewStudentsLoading } = useSelector(({ user }) => user);
  const { userDetails } = useSelector(({ auth }) => auth);

  const [isCSVclassCreated, setIsCSVclassCreated] = useState(false);
  const [isClassCodeMissing, setIsClassCodeMissing] = useState(false);
  const [isValuesMissing, setIsValuesMissing] = useState(false);
  const [isRequiredColumnsMissing, setIsRequiredColumnsMissing] = useState(false);
  const [isShowCSVError, setIsShowCSVError] = useState(false);
  const [isStudentMaxLimitError, setIsStudentMaxLimitError] = useState(false);
  const [isSpecialCharError, setIsSpecialCharError] = useState(false);

  const dispatch = useDispatch();

  const handleCloseDailog = () => {
    props.closePopup();
  };

  const classCodeListOption = [
    ...classCodeList.map(classCode => {
      return {
        label: `${classCode.name} - ${classCode.class_code}`,
        value: classCode.class_code
      };
    })
  ];

  const handleSuccess = () => {
    props.closePopup();
  };

  const changeHandler = async info => {
    const { status } = info.file;

    if (status === "done") {
      if (info.file) {
        Papa.parse(info.file.originFileObj, {
          skipEmptyLines: true,
          complete: async function (results) {
            const CSVResult = results.data;

            if (CSVResult.length > 0) {
              // Function to replace invalid characters with spaces
              const replaceInvalidCharacters = str => {
                return str.replace(/�/g, " "); // Replace "�" with space
              };

              // Process the parsed data to replace invalid characters in all columns
              const processedCSVData = CSVResult.map(row => {
                // Iterate over each column and apply the replacement function
                let updatedRaw = [];
                for (const key in row) {
                  if (Object.hasOwnProperty.call(row, key)) {
                    updatedRaw.push(replaceInvalidCharacters(row[key]));
                  }
                }
                return updatedRaw;
              });

              const students = [];
              const data = processedCSVData.filter(da => !da.slice(1).every(value => !value));

              const requiredFields = ["Class Code", "Student First Name", "Student Last Name"];
              const checkFields = requiredFields.filter(da => !data[2].find(field => field.includes(da)));

              let updatedClassCode = "";

              const studentData = drop(data, 6).map(d => {
                if (d[1]) {
                  // update classcode if less than 6 digit
                  updatedClassCode = addLeadingZeros(d[1], 6);
                } else {
                  updatedClassCode = "";
                }

                return {
                  class_code: updatedClassCode,
                  first_name: d[2]?.trim() || "",
                  last_name: d[3]?.trim() || "",
                  user_name: d[4]?.trim() || "",
                  password: d[5]?.trim() || "",
                  learning_mode: d[6] || ""
                };
              });

              if (checkFields.length > 0) {
                setIsRequiredColumnsMissing(true);
                // setErrorMessage(
                //   checkFields.length <= 1
                //     ? `A1Please check your .csv ${checkFields.join(
                //         "",
                //       )} column is missing`
                //     : `A2Please check your .csv ${checkFields.join(
                //         " and ",
                //       )} columns is missing`,
                // );
              } else {
                setIsRequiredColumnsMissing(false);
              }
              if (isEmpty(studentData)) {
                setIsCSVclassCreated(true);
                setIsClassCodeMissing(true);
                setIsValuesMissing(true);
              } else {
                const classCodeList = classCodeListOption.map(classCode => classCode.value);

                const isClassCodeAvailable = studentData
                  .filter(std => !!std.class_code)
                  .every(std => std.class_code && classCodeList.includes(std.class_code));

                // wrong class code available error
                if (isClassCodeAvailable) {
                  setIsCSVclassCreated(false);
                } else {
                  setIsCSVclassCreated(true);
                }

                // missing class code error
                const isMissingClassCode = studentData.some(data => {
                  return !data.class_code;
                });

                if (isMissingClassCode) {
                  setIsClassCodeMissing(true);
                } else {
                  setIsClassCodeMissing(false);
                }
                // remove spaces
                const missingValues = studentData.some(data => !data.first_name.trim() || !data.last_name.trim());

                // if first name and last name value missing
                if (missingValues) {
                  setIsValuesMissing(true);
                } else {
                  setIsValuesMissing(false);
                }
                // older
                // const specialCharsExAphoHyPh = /[`!@#$%^&*()_+\=\[\]{};:"\\|.<>\/?~]/; //eslint-disable-line
                const specialCharsExAphoHyPh = /[;,:".]/; //eslint-disable-line

                const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/; //eslint-disable-line
                // remove spaces
                const isIncludeSpecialChar = studentData.some(
                  data =>
                    specialCharsExAphoHyPh.test(data.first_name) ||
                    specialCharsExAphoHyPh.test(data.last_name) ||
                    specialChars.test(data.user_name)
                );

                if (isIncludeSpecialChar) {
                  setIsSpecialCharError(true);
                } else {
                  setIsSpecialCharError(false);
                }

                let isMaxError = false;
                if (studentData.length > maxStudentAddBulkLimit) {
                  isMaxError = true;
                  setIsStudentMaxLimitError(true);
                } else {
                  isMaxError = false;
                  setIsStudentMaxLimitError(false);
                }
                if (
                  !missingValues &&
                  isClassCodeAvailable &&
                  isEmpty(checkFields) &&
                  !isMissingClassCode &&
                  !isIncludeSpecialChar &&
                  studentData.length &&
                  !isMaxError
                ) {
                  let usernameCounts = new Map(); // Keep track of username counts

                  studentUserList.map(std => {
                    const count = usernameCounts.get(std.user_name) ? usernameCounts.get(std.user_name) + 1 : 0;
                    usernameCounts.set(std.user_name, count);
                    return count;
                  });

                  studentData.map(user => {
                    let updatedUserNameByFnameLname =
                      user["user_name"] === ""
                        ? user["first_name"]
                            .replace(/[^a-zA-Z0-9 ]/g, "")
                            .charAt(0)
                            .toLowerCase() + user["last_name"].replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()
                        : user["user_name"];
                    updatedUserNameByFnameLname = updatedUserNameByFnameLname?.trim().replace(/\s+/g, "-");
                    // const sameUserNameList = studentUserList.filter(std =>
                    //   std["user_name"].startsWith(updatedUserNameByFnameLname),
                    // );
                    // const currentSameUserNameList = students.filter(std =>
                    //   std["user_name"].startsWith(updatedUserNameByFnameLname),
                    // );
                    // let maxNum = 0;
                    // [...sameUserNameList, ...currentSameUserNameList].forEach(
                    //   std => {
                    //     if (+std["user_name"].replace(/^\D+/g, "") > +maxNum) {
                    //       updatedUserNameByFnameLname = updatedUserNameByFnameLname.replace(
                    //         /\d+$/,
                    //         "",
                    //       );
                    //       console.log(
                    //         "🚀 ~ file: index.js:333 ~ complete:function ~ maxNum:",
                    //         +std["user_name"].replace(/^\D+/g, ""),
                    //       );
                    //       maxNum = +std["user_name"].replace(/^\D+/g, "");
                    //     }
                    //   },
                    // );
                    // console.log(
                    //   "🚀 ~ file: index.js:444 ",
                    //   `${updatedUserNameByFnameLname}${+maxNum + 1}`,
                    // );

                    // let user_name = +maxNum
                    //   ? `${updatedUserNameByFnameLname}${+maxNum + 1}`
                    //   : [...sameUserNameList, ...currentSameUserNameList].length
                    //   ? `${updatedUserNameByFnameLname}${
                    //       [...sameUserNameList, ...currentSameUserNameList]
                    //         .length
                    //     }`
                    //   : updatedUserNameByFnameLname;

                    // Generate a potential username

                    // Check if the potential username already exists
                    if (usernameCounts.has(updatedUserNameByFnameLname)) {
                      const count = usernameCounts.get(updatedUserNameByFnameLname)
                        ? usernameCounts.get(updatedUserNameByFnameLname) + 1
                        : 0;
                      usernameCounts.set(updatedUserNameByFnameLname, count);
                      updatedUserNameByFnameLname = `${updatedUserNameByFnameLname}${count}`;
                    } else {
                      usernameCounts.set(updatedUserNameByFnameLname, 1);
                    }

                    const randomValue = Math.floor(Math.random() * (studentPasswordList.length - 1 - 0) + 0);
                    const generatedPassword =
                      user.password.length >= 5
                        ? user.password
                        : studentPasswordList[randomValue] + randomTwoDigitNumberGenerator();

                    students.push({
                      user_name: updatedUserNameByFnameLname,
                      password: generatedPassword?.trim(),
                      role_id: userRole.STUDENT.role_id,
                      school_district_id: userDetails.school_district_id,
                      class_code: user["class_code"],
                      profile: {
                        first_name: user["first_name"],
                        last_name: user["last_name"],

                        student_learning_mode_id:
                          user["learning_mode"] !== "" ? (+user["learning_mode"] > 0 ? 2 : 1) : 2,
                        auto_timeout_for_question: maxTimeoutAnswerCountList[2].value * 6,
                        max_retry_count_to_attempt_question: 1,
                        session_time_limit: studentSessionTimeLimitList[3].value,
                        allowed_level_lifter_whoopsies: levelLifterWhoopsiesList[2].value,
                        max_timeout_correct_ans_secs: maxTimeoutAnswerCountList[2].value,
                        is_super_level_lifter_lock: 1
                      }
                    });
                    return true;
                  });
                  setIsShowCSVError(true);
                  dispatch(addBulkStudents(students, handleSuccess));
                }
              }
            }
          }
        });
      }
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleReadCSVFile = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <Modal
      open={true}
      footer={null}
      onCancel={() => handleCloseDailog()}
      width={"50%"}
      title={
        <>
          Import Students list <sup> Beta</sup>
        </>
      }
    >
      {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}

      <div className="import-csv-popup">
        <div className="import-csv-popup-content">
          <div className="import-csv-info">
            <div className="import-csv-info-sub-text">
              1.{" "}
              <a
                href={sampleStudentList}
                download
                style={{
                  color: "#51d69a",
                  borderBottom: "1px solid",
                  cursor: "pointer"
                }}
              >
                {" "}
                Download
              </a>{" "}
              the MathFactLab Student Import Template.
            </div>
            <div className="import-csv-info-sub-text">2. Complete all required fields.</div>
            <div className="import-csv-info-sub-text ">
              3. <span className="border-bottom">Save as CSV</span>.
            </div>
            <div className="import-csv-info-sub-text">4. Upload using the field below.</div>

            <div className="import-csv-block">
              <Dragger
                name="file"
                multiple={false}
                onChange={changeHandler}
                accept={".csv"}
                customRequest={handleReadCSVFile}
                maxCount={1}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload.</p>
              </Dragger>
            </div>
            {(isRequiredColumnsMissing ||
              isCSVclassCreated ||
              isClassCodeMissing ||
              isValuesMissing ||
              isSpecialCharError) && (
              <div className="csv-error-text mt-5">Please check your .csv file for accuracy.</div>
            )}
            {isRequiredColumnsMissing && <div className="csv-error-text ">You have missing columns</div>}
            {isClassCodeMissing && (
              <div className="csv-error-text ">You have at least one missing value in the class code column.</div>
            )}
            {isCSVclassCreated && (
              <div className="csv-error-text ">You have at least one class code entered which does not exist.</div>
            )}
            {isValuesMissing && (
              <div className="csv-error-text ">You have at least one missing first and/or last name.</div>
            )}
            {isSpecialCharError && (
              <div className="csv-error-text ">
                You have at least one first, last name and/or username which has Special char.
              </div>
            )}

            {isStudentMaxLimitError && (
              <div className="csv-error-text ">{`Please limit list to ${maxStudentAddBulkLimit} or less names.`}</div>
            )}

            {isShowCSVError && !addNewStudentsLoading && addNewUsersError && (
              <div className="csv-error-text ">{addNewUsersError} </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImportStudentListPopup;
