import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Radio, Tooltip } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { addNewClassCode } from "../../../redux/actions";
import "assets/sass/components/button-ant.scss";

import { debounce } from "lodash";
const { TextArea } = Input;

const Step4 = props => {
  const {
    handleNextNewUser,
    handleBackNewUser,
    handleSelectSchool,

    selectedSchool,
    classListName,
    handleClassName
  } = props;

  const dispatch = useDispatch();

  // Error Variables
  const { schoolData } = useSelector(({ schoolData }) => schoolData);
  const [schoolNameInputText, setSchoolNameInputText] = useState("");

  const onChangeSchool = e => {
    handleSelectSchool(e.target.value);
  };

  //InputText validation
  const handleClassNameInputText = debounce(event => {
    const inputText = event.target.value;
    setSchoolNameInputText(inputText);
    const classNames = inputText.split(/\n/).filter(str => str.trim().length > 0);

    handleClassName(classNames);
  }, 1000);

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
    handleBackNewUser();
  };

  return (
    <>
      <div className="step-3">
        <div className="header-classes-text">Create Classes</div>
        <div className="step-3-inner">
          <div className="step-3-inner-left">
            <div>
              <div className="list-title">1. Select a school from the list below.</div>
              <div className="radio-grp-container">
                <Radio.Group onChange={e => onChangeSchool(e)} value={selectedSchool}>
                  {schoolData.map(school => {
                    return (
                      <Radio value={school.id} key={school.id}>
                        <span className="list-menu-text">{school.name}</span>
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </div>
            </div>
            {!selectedSchool && classListName.length > 0 ? (
              <span className="list-menu-text-error">Please select any school</span>
            ) : (
              ""
            )}
            <div className="list-title  mt-15">
              2. In the input box to the right, enter the names of all of the required classes for the selected school.
            </div>

            <div className="list-title mt-15">
              In the next step, you will be given a class code for each class that you have created.
            </div>
          </div>
          <div className="step-3-inner-right">
            <TextArea
              className="multiple-std-text-input-classes"
              placeholder={`Enter one class name per line. Teachers will be able to edit their class names later if necessary.   `}
              onChange={handleClassNameInputText}
              defaultValue={schoolNameInputText}
            ></TextArea>
          </div>
        </div>
      </div>

      <div className="welcome-step-popup-footer">
        <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div>

        {classListName.length > 0 ? (
          <div className={"next-nav-btn"} onClick={handleNext}>
            Next <ArrowRightOutlined />
          </div>
        ) : (
          <div className={"next-nav-btn disable"}>
            <Tooltip title="Please add at least one class." placement="top">
              Next <ArrowRightOutlined />
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};

export default Step4;
