import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Radio, Tooltip } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { addNewClassCode } from "../../../redux/actions";

const Step2 = props => {
  const { handleNextNewUser, handleBackNewUser, handleSelectedClassCode, selectedClass } = props;
  const [newClassName, setNewClassName] = useState("");
  const [isCreateClassError, setIsCreateClassError] = useState(false);

  const dispatch = useDispatch();
  const onChangeSelectClass = e => {
    handleSelectedClassCode(e.target.value);
    setNewClassName("");
  };
  const { classCodeList, addNewClassCodeLoading } = useSelector(({ classCode }) => classCode);

  const { userDetails } = useSelector(({ auth }) => auth);
  const handleClassName = event => {
    setNewClassName(event.target.value);
    setIsCreateClassError(false);
  };

  const handleSuccess = data => {
    if (!addNewClassCodeLoading) {
      setNewClassName("");
      handleSelectedClassCode(data);
      handleNextNewUser();
    }
  };

  const handleCreateNewClass = () => {
    const body = {
      name: newClassName
    };

    dispatch(addNewClassCode(body, handleSuccess));
  };

  const handleNext = () => {
    if (newClassName !== "") {
      handleCreateNewClass();
    } else {
      handleNextNewUser();
    }
  };
  const handleBack = () => {
    handleBackNewUser();
  };

  return (
    <>
      <div className="step-2">
        <div className="step-2-left">
          <div className="step-2-sub-text">Current Classes</div>
          <div className="class-list-container">
            {classCodeList.length < 1 ? (
              <div className="no-class-list"> No current classes</div>
            ) : (
              <Radio.Group onChange={onChangeSelectClass} value={selectedClass}>
                <Radio value={""}>
                  <span className="list-menu-text"> Create class</span>
                </Radio>
                <br />
                {classCodeList.map((cls, i) => {
                  return (
                    <>
                      <Radio value={cls}>
                        <span className="list-menu-text">
                          {cls.name}-{cls.class_code}
                        </span>
                      </Radio>
                      <br />
                    </>
                  );
                })}
              </Radio.Group>
            )}
          </div>
        </div>
        <div className="step-2-right">
          <div className="step-2-header-text">Create or Select a Class</div>
          <div className="step-2-sub-text">In MathFactLab, students are organized by class.</div>
          <div className="step-2-sub-text-2">To add students, create a new class below or select a current class.</div>
          <div className="step-2-input">
            <Input.Group compact>
              <Input
                className="input-text"
                style={{ width: "30%", height: "50px" }}
                prefix={
                  <div>
                    <i className="icon-classroom" aria-hidden="true"></i> Class Name
                  </div>
                }
              />
              <Input
                className="input-text"
                style={{ width: "70%", height: "50px" }}
                placeholder={classCodeList.length > 0 ? "To add students, select Create class" : ""}
                onChange={handleClassName}
                value={newClassName}
                disabled={classCodeList.length > 0 && selectedClass}
              />
            </Input.Group>
          </div>
          {isCreateClassError && <div className="create-class-error">Please enter the class name.</div>}
          <div className="create-class-info-text">
            If needed, you can create additional classes after you have finished adding students to this class.Classes
            can also be created at any time on the teacher dashboard.
          </div>
          {/* <div className="create-class-info-text"></div> */}
          {/* <div className="step-2-actions-button">
            <Button type="primary" size="large" onClick={handleCreateNewClass}>
              Save and Create Another Class
            </Button>
          </div> */}
        </div>
        <div className="welcome-step-popup-footer">
          {userDetails.login_count === 1 ? (
            <div className="back-nav-btn" onClick={handleBack}>
              <ArrowLeftOutlined /> Back
            </div>
          ) : (
            <div></div>
          )}
          {selectedClass.class_code || newClassName !== "" ? (
            <div
              className={
                selectedClass.class_code || newClassName !== "" || addNewClassCodeLoading
                  ? "next-nav-btn"
                  : "next-nav-btn disable"
              }
              onClick={selectedClass.class_code || newClassName !== "" || addNewClassCodeLoading ? handleNext : ""}
            >
              {addNewClassCodeLoading ? "Adding Class..." : "Next "}
              <ArrowRightOutlined />
            </div>
          ) : (
            <div className={"next-nav-btn disable"}>
              <Tooltip title="Please select any class or enter class name to create new class" placement="leftTop">
                Next <ArrowRightOutlined />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Step2;
