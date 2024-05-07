import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Tooltip } from "antd";
import { debounce } from "lodash";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { addNewSchool } from "../../../redux/actions";
import "assets/sass/components/button-ant.scss";

const { TextArea } = Input;

const Step2 = props => {
  const {
    handleNextNewUser,
    handleBackNewUser,
    schoolName,

    handleSchoolName
  } = props;

  // Error Variables
  const dispatch = useDispatch();

  const [schoolNameInputText, setSchoolNameInputText] = useState("");

  //InputText validation
  const handleSchoolNameInputText = debounce(event => {
    const inputText = event.target.value;
    setSchoolNameInputText(inputText);
    const schools = inputText.split(/\n/).filter(str => str.trim().length > 0);

    handleSchoolName(schools);
  }, 1000);

  //create school api call
  const handleSaveStudents = () => {
    const schools = schoolName.map(name => ({ name }));

    const body = {
      schools
    };
    dispatch(addNewSchool(body));
    // Proceed to the next step
    handleNextNewUser();
  };

  const handleNext = () => {
    handleSaveStudents();
  };
  const handleBack = () => {
    handleBackNewUser();
  };

  return (
    <>
      <div className="step-3">
        <div className="header-classes-text">Add Schools</div>
        <div className="step-3-inner">
          <div className="step-3-inner-left">
            <div>
              <div className="list-title">
                In the input box to the right, enter the name(s) of the school(s) that will be part of this MathFactLab
                account.
              </div>
              <div className="list-title">
                In the next step, you will be given a school code for each school that you have created.
              </div>
            </div>
          </div>
          <div className="step-3-inner-right">
            <TextArea
              className="multiple-std-text-input-classes"
              placeholder={`Enter one school name per line. You will be able to edit school names later if necessary. 
 Fleming School
 Kennedy Elementary School       
 etc.`}
              onChange={handleSchoolNameInputText}
              defaultValue={schoolNameInputText}
            ></TextArea>
          </div>
        </div>
      </div>

      <div className="welcome-step-popup-footer">
        <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div>

        {schoolName.length > 0 ? (
          <div className={"next-nav-btn"} onClick={handleNext}>
            Next <ArrowRightOutlined />
          </div>
        ) : (
          <div className={"next-nav-btn disable"}>
            <Tooltip title="Please add at least one school." placement="left">
              Next <ArrowRightOutlined />
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};

export default Step2;
