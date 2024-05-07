import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Papa from "papaparse";
import { message, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { isEmpty, drop } from "lodash";
import { addTeachers } from "../../../redux/actions/teacherAction";
import { addLeadingZeros, isValidEmail } from "utils/helpers";
import sampleTeacherList from "assets/xls/MathFactLab_Teacher_Import_Template.xlsx";

const { Dragger } = Upload;

const ImportTeacherListPopup = props => {
  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { userDetails } = useSelector(({ auth }) => auth);
  const [isCSVclassCreated, setIsCSVclassCreated] = useState(false);
  const [isClassCodeMissing, setIsClassCodeMissing] = useState(false);
  const [isValuesMissing, setIsValuesMissing] = useState(false);
  const [isRequiredColumnsMissing, setIsRequiredColumnsMissing] = useState(false);
  const [isStudentMaxLimitError, setIsStudentMaxLimitError] = useState(false);
  const [isSpecialCharError, setIsSpecialCharError] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

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
              const teachers = [];
              const data = CSVResult.filter(da => !da.slice(1).every(value => !value));

              const requiredFields = ["Teacher First Name", "Teacher Last Name", "Email", "Class Code(s)"];
              const checkFields = requiredFields.filter(da => !data[4].find(field => field.includes(da)));
              let updatedClassCode = "";
              const teachersData = drop(data, 6).map(d => {
                if (d[4]) {
                  // update class-code if less than 6 digit

                  updatedClassCode = d[4]
                    .split(",")
                    .map(code => (d[4] ? code.replace(/\s+/g, "") : ""))
                    .map(code => addLeadingZeros(code, 6))
                    .join(",");
                } else {
                  updatedClassCode = "";
                }
                return {
                  first_name: d[1]?.trim() || "",
                  last_name: d[2]?.trim() || "",
                  email: d[3]?.trim() || "",
                  class_code: updatedClassCode
                };
              });

              if (checkFields.length > 0) {
                setIsRequiredColumnsMissing(true);
              } else {
                setIsRequiredColumnsMissing(false);
              }

              if (isEmpty(teachersData)) {
                setIsCSVclassCreated(true);
                setIsClassCodeMissing(true);
                setIsValuesMissing(true);
              } else {
                const classCodeValueList = classCodeListOption.map(classCode => classCode.value);

                const isClassCodeAvailable = teachersData
                  .filter(cls => !!cls.class_code)
                  .every(
                    cls =>
                      cls.class_code &&
                      cls.class_code.split(",").every(oneClassCode => classCodeValueList.includes(oneClassCode))
                  );

                // wrong class code available error
                if (isClassCodeAvailable) {
                  setIsCSVclassCreated(false);
                } else {
                  setIsCSVclassCreated(true);
                }

                // missing class code error
                // const isMissingClassCode = teachersData.some(data => {
                //   return !data.class_code;
                // });

                // if (isMissingClassCode) {
                //   setIsClassCodeMissing(true);
                // } else {
                //   setIsClassCodeMissing(false);
                // }
                // remove spaces

                const missingValues = teachersData.some(data => !data.first_name.trim() || !data.last_name.trim());
                // if first name and last name value missing
                if (missingValues) {
                  setIsValuesMissing(true);
                } else {
                  setIsValuesMissing(false);
                }

                const specialCharsExAphoHyPh = /[`!@#$%^&*()_+\=\[\]{};:"\\|.<>\/?~]/; // eslint-disable-line

                const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/; // eslint-disable-line

                // remove spaces
                const isIncludeSpecialChar = teachersData.some(
                  data =>
                    specialCharsExAphoHyPh.test(data.first_name) ||
                    specialCharsExAphoHyPh.test(data.last_name) ||
                    specialChars.test(data.user_name) // Assuming user_name is a field in the CSV file
                );

                if (isIncludeSpecialChar) {
                  setIsSpecialCharError(true);
                } else {
                  setIsSpecialCharError(false);
                }

                const isValidEmails = teachersData.every(data => isValidEmail(data.email));
                if (!isValidEmails) {
                  // If any email is invalid, set an error state or handle it accordingly
                  setIsEmailInvalid(true);
                } else {
                  setIsEmailInvalid(false);
                }
                let isMaxError = false;
                if (teachersData.length > 100) {
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
                  // !isMissingClassCode &&
                  !isIncludeSpecialChar &&
                  isValidEmails &&
                  teachersData.length &&
                  !isMaxError
                ) {
                  teachersData.map(user => {
                    // const classCode = classCodeList.find(
                    //   classCode => classCode.value === user["class_ids"],
                    // );
                    let classCodeIDList = [];
                    if (user["class_code"]) {
                      classCodeIDList = user["class_code"].split(",").map(classId => {
                        const classCode = classCodeList.find(classCode => classCode.class_code === classId);
                        return classCode.id;
                      });
                    }

                    teachers.push({
                      email: user["email"],
                      profile: {
                        first_name: user["first_name"],
                        last_name: user["last_name"]
                      },
                      class_ids: classCodeIDList.length ? classCodeIDList : [],
                      school_district_id: userDetails.school_district_id
                      //  class_ids: [classCode.id],
                    });
                    return true;
                  });

                  dispatch(addTeachers(teachers, handleSuccess));
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
          Import Teacher list <sup> Beta</sup>
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
                href={sampleTeacherList}
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
              the MathFactLab Teacher Import Template.
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
              isEmailInvalid ||
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
            {isEmailInvalid && <div className="csv-error-text ">You have at least one email is not valid.</div>}
            {isStudentMaxLimitError && <div className="csv-error-text ">Please limit list to 100 or less names.</div>}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImportTeacherListPopup;
