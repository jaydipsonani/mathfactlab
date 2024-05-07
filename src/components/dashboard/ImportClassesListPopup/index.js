import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { message, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { isEmpty, drop } from "lodash";
import { addNewClassCode } from "../../../redux/actions/classCodeAction";
import sampleClassesList from "assets/xls/MathFactLab_Classes_Import_Template.xlsx";

const { Dragger } = Upload;

const ImportClassesListPopup = props => {
  const [isCSVclassCreated, setIsCSVclassCreated] = useState(false);
  const [isSchoolCodeMissing, setIsSchoolCodeMissing] = useState(false);
  const [isValuesMissing, setIsValuesMissing] = useState(false);
  const [isRequiredColumnsMissing, setIsRequiredColumnsMissing] = useState(false);

  const [isCLassesMaxLimitError, setIsClassesMaxLimitError] = useState(false);
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
              const classes = [];
              const data = CSVResult.filter(da => !da.slice(1).every(value => !value));

              const requiredFields = ["Class Name", "Assigned School"];

              const checkFields = requiredFields.filter(da => !data[4].find(field => field.includes(da)));

              const classesData = drop(data, 6).map(d => {
                return {
                  class_name: d[1]?.trim() || "",
                  school_list: d[2] || ""
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
              if (isEmpty(classesData)) {
                setIsCSVclassCreated(true);
                setIsSchoolCodeMissing(true);
                setIsValuesMissing(true);
              } else {
                const schoolCodeList = schoolListOption.map(school => school.value);

                const isSchoolCodeAvailable = classesData
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
                const isMissingSchoolCode = classesData.some(data => {
                  return !data.school_list;
                });

                if (isMissingSchoolCode) {
                  setIsSchoolCodeMissing(true);
                } else {
                  setIsSchoolCodeMissing(false);
                }

                // remove spaces
                const missingValues = classesData.some(data => !data.class_name.trim());

                // if first name and last name value missing
                if (missingValues) {
                  setIsValuesMissing(true);
                } else {
                  setIsValuesMissing(false);
                }

                // remove spaces

                let isMaxError = false;
                if (classesData.length > 100) {
                  isMaxError = true;
                  setIsClassesMaxLimitError(true);
                } else {
                  isMaxError = false;
                  setIsClassesMaxLimitError(false);
                }
                if (
                  !missingValues &&
                  isSchoolCodeAvailable &&
                  isEmpty(checkFields) &&
                  !isMissingSchoolCode &&
                  classesData.length &&
                  !isMaxError
                ) {
                  classesData.map(user => {
                    const schoolCode = schoolData.find(
                      school => school.school_code_identifier === +user["school_list"]
                    );

                    classes.push({
                      name: user["class_name"],
                      school_id: schoolCode.id,
                      school_district_id: userDetails.school_district_id
                    });

                    return true;
                  });

                  dispatch(addNewClassCode([...classes], handleSuccess));
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
          Import Class list <sup> Beta</sup>
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
                href={sampleClassesList}
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
              the MathFactLab Class Import Template.
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
            {(isRequiredColumnsMissing || isCSVclassCreated || isSchoolCodeMissing || isValuesMissing) && (
              <div className="csv-error-text mt-5">Please check your .csv file for accuracy.</div>
            )}
            {isRequiredColumnsMissing && <div className="csv-error-text ">You have missing columns</div>}
            {isSchoolCodeMissing && (
              <div className="csv-error-text ">You have at least one missing value in the school code column.</div>
            )}
            {isCSVclassCreated && (
              <div className="csv-error-text ">You have at least one school code entered which does not exist.</div>
            )}
            {isValuesMissing && <div className="csv-error-text ">You have at least one missing name.</div>}

            {isCLassesMaxLimitError && <div className="csv-error-text ">Please limit list to 100 or less names.</div>}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImportClassesListPopup;
