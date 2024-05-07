import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { isEmpty, drop } from "lodash";
import { message, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { isValidEmail } from "utils/helpers";
import { addSubSchoolAdmin } from "../../../redux/actions/subSchoolAdminAction";
import sampleSchoolAdminList from "assets/xls/MathFactLab_Sub_Admin_Import_Template.xlsx";

const { Dragger } = Upload;

const ImportSubSchoolAdminListPopup = props => {
  const [isCSVclassCreated, setIsCSVclassCreated] = useState(false);
  const [isSchoolCodeMissing, setIsSchoolCodeMissing] = useState(false);
  const [isValuesMissing, setIsValuesMissing] = useState(false);
  const [isRequiredColumnsMissing, setIsRequiredColumnsMissing] = useState(false);

  const [isSchoolAdminMaxLimitError, setIsSchoolAdminMaxLimitError] = useState(false);
  const [isSpecialCharError, setIsSpecialCharError] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const { userDetails } = useSelector(({ auth }) => auth);
  const { schoolData } = useSelector(({ schoolData }) => schoolData);
  const dispatch = useDispatch();

  const handleCloseDailog = () => {
    props.closePopup();
  };

  const handleSuccess = () => {
    props.closePopup();
  };
  const schoolListOption = [
    ...schoolData.map(school => {
      return {
        label: school.name,
        value: school.school_code_identifier
      };
    })
  ];
  const changeHandler = async info => {
    const { status } = info.file;

    if (status === "done") {
      if (info.file) {
        Papa.parse(info.file.originFileObj, {
          skipEmptyLines: true,
          complete: async function (results) {
            const CSVResult = results.data;

            if (CSVResult.length > 0) {
              const admins = [];
              const data = CSVResult.filter(da => {
                return !da.slice(1).every(value => !value);
              });

              const requiredFields = ["Sub-Admin First Name", "Sub-Admin Last Name", "Email", "School Code(s)"];

              const checkFields = requiredFields.filter(da => !data[4].find(field => field.includes(da)));

              const schoolAdminData = drop(data, 6).map(d => {
                return {
                  first_name: d[1]?.trim() || "",
                  last_name: d[2]?.trim() || "",
                  email: d[3]?.trim() || "",
                  school_list: d[4] || ""
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
              if (isEmpty(schoolAdminData)) {
                setIsCSVclassCreated(true);
                setIsSchoolCodeMissing(true);
                setIsValuesMissing(true);
              } else {
                const schoolCodeList = schoolListOption.map(school => school.value);

                const isSchoolCodeAvailable = schoolAdminData
                  .filter(school => !!school.school_list)
                  .every(
                    school =>
                      school.school_list &&
                      school.school_list.split(",").every(schoolCode => schoolCodeList.includes(+schoolCode))
                  );

                // wrong school code available error
                if (isSchoolCodeAvailable) {
                  setIsCSVclassCreated(false);
                } else {
                  setIsCSVclassCreated(true);
                }
                // missing school code  error
                // const isMissingSchoolCode = schoolAdminData.some(data => {
                //   return !data.school_list;
                // });

                // if (isMissingSchoolCode) {
                //   setIsSchoolCodeMissing(true);
                // } else {
                //   setIsSchoolCodeMissing(false);
                // }

                // remove spaces
                const missingValues = schoolAdminData.some(
                  data => !data.first_name.trim() || !data.last_name.trim() || !data.email?.trim()
                );

                // if first name and last name value missing
                if (missingValues) {
                  setIsValuesMissing(true);
                } else {
                  setIsValuesMissing(false);
                }

                const specialCharsExAphoHyPh = /[`!@#$%^&*()_+\=\[\]{};:"\\|.<>\/?~]/; //eslint-disable-line

                const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/; //eslint-disable-line
                // remove spaces
                const isIncludeSpecialChar = schoolAdminData.some(
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

                const isValidEmails = schoolAdminData.every(data => isValidEmail(data.email));

                if (!isValidEmails) {
                  // If any email is invalid, set an error state or handle it accordingly
                  setIsEmailInvalid(true);
                } else {
                  setIsEmailInvalid(false);
                }

                let isMaxError = false;
                if (schoolAdminData.length > 100) {
                  isMaxError = true;
                  setIsSchoolAdminMaxLimitError(true);
                } else {
                  isMaxError = false;
                  setIsSchoolAdminMaxLimitError(false);
                }
                if (
                  !missingValues &&
                  isSchoolCodeAvailable &&
                  isEmpty(checkFields) &&
                  // !isMissingSchoolCode &&
                  schoolAdminData.length &&
                  isValidEmails &&
                  !isMaxError
                ) {
                  schoolAdminData.map(user => {
                    let schoolCodeIDList = [];
                    if (user["school_list"]) {
                      schoolCodeIDList = user["school_list"].split(",").map(schoolCode => {
                        const schoolIds = schoolData.find(school => school.school_code_identifier === +schoolCode);

                        return schoolIds.id;
                      });
                    }
                    admins.push({
                      email: user["email"],
                      role_id: 5,
                      school_district_id: userDetails.school_district_id,
                      profile: {
                        first_name: user["first_name"],
                        last_name: user["last_name"],
                        type: "secondary"
                      },
                      school_ids: schoolCodeIDList.length ? schoolCodeIDList : []
                    });

                    return true;
                  });

                  dispatch(addSubSchoolAdmin(admins, handleSuccess));
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
          Import Sub-Admin list <sup> Beta</sup>
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
                href={sampleSchoolAdminList}
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
              the MathFactLab School Admin Import Template.
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
              isSchoolCodeMissing ||
              isValuesMissing ||
              isSpecialCharError ||
              isEmailInvalid) && <div className="csv-error-text mt-5">Please check your .csv file for accuracy.</div>}
            {isRequiredColumnsMissing && <div className="csv-error-text ">You have missing columns</div>}
            {isSchoolCodeMissing && (
              <div className="csv-error-text ">You have at least one missing value in the school code column.</div>
            )}
            {isCSVclassCreated && (
              <div className="csv-error-text ">You have at least one school code entered which does not exist.</div>
            )}
            {isValuesMissing && (
              <div className="csv-error-text ">You have at least one missing first and/or last name.</div>
            )}

            {isSpecialCharError && (
              <div className="csv-error-text ">You have at least one first, last name which has Special char.</div>
            )}

            {isEmailInvalid && <div className="csv-error-text ">You have at least one email is not valid.</div>}

            {isSchoolAdminMaxLimitError && (
              <div className="csv-error-text ">Please limit list to 100 or less names.</div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImportSubSchoolAdminListPopup;
