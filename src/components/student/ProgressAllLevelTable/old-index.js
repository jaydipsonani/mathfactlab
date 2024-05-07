import React, { useState } from "react";
import { Modal } from "antd";
import { mulSubLevelList, addSubLevelList } from "config/const";
import Select from "components/common/ReactSelect";
import { studentLearningModeList } from "config/const";

import { mathOperationList } from "config/const";

function ProgressLevelPopup(props) {
  const { learning_mode, handleCloseProgressTablePopup, changeLearningMode } = props;

  const [selectedLearningMode, setSelectedLearningMode] = useState(studentLearningModeList[0].value);

  let learningMode = learning_mode;
  let userCurrentModeList = learningMode === "1" ? addSubLevelList : mulSubLevelList;

  let levelListByLearningMode = Object.values(userCurrentModeList);

  // remove first and last element of warm up and graduate level
  levelListByLearningMode.shift(); // Removes the first element from an array and returns only that element.
  // levelListByLearningMode.pop();

  if (+learningMode === 1) {
    levelListByLearningMode.pop();
  }

  const basicLevelCount = learningMode === "1" ? 11 : 12;

  const handleChangeLearningMode = e => {
    setSelectedLearningMode(e.target.value);
    changeLearningMode(e.target.value);
  };

  return (
    <>
      <Modal
        footer={null}
        visible={true}
        onCancel={handleCloseProgressTablePopup}
        width={1200}
        closeIcon={<span className="close progress-popup-close">×</span>}
        bodyStyle={{ padding: "0" }}
      >
        <div className="progress-table-card progress-table-background">
          <div className="search with-button ml-auto mr-0">
            <Select
              name="learningMode"
              value={selectedLearningMode}
              options={studentLearningModeList}
              onChange={handleChangeLearningMode}
              placeholder="Select Learning Mode..."
            />
          </div>

          <div
            className="progress-level-wrapper"
            style={{
              padding: "0",
              margin: "0",
              maxHeight: "67vh",
              overflow: "auto"
            }}
          >
            <div className="twoLayout-popup-content">
              {levelListByLearningMode.reverse().map((lvl, i) => {
                return (
                  <div className="inline-table-count" key={Math.random()}>
                    <div className="inline-table-button">
                      <button className="btn btn-green">{`${
                        lvl.sort === "GR" ? "Graduate" : lvl.sort
                      } ${lvl.descriptors}`}</button>
                    </div>
                    {lvl.sort !== "GR" ? (
                      learningMode === "1" && lvl.value >= basicLevelCount ? (
                        <div className={`inline-table-raw-outer-wrap bg-green`}>
                          {"Example Problems :   "}
                          {lvl.studentProgressPopupQnsList.map((qns, i) => {
                            return (
                              <div key={`${qns.first_factor}_${qns.second_factor}_${i}_${Math.random()}`}>
                                {/* For extra space */}
                                {i === 0 ? <span style={{ visibility: "hidden" }}>0</span> : ""}
                                <span className="tc-top">{qns.correct_answer}</span>
                                <span className="tc-top">{mathOperationList[qns.math_opration]}</span>
                                <span className="tc-left">{qns.first_factor}</span>

                                {/* For extra space */}
                                {lvl.studentProgressPopupQnsList.length === i + 1 ? (
                                  " "
                                ) : (
                                  <>
                                    <span>,</span>
                                    <span style={{ visibility: "hidden" }}>0</span>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="inline-table-count-wrap">
                          <div className="inline-table-count-wrap">
                            {lvl.studentProgressPopupQnsList.map(qns => {
                              return (
                                <div
                                  className="inline-table-count-item  count-green"
                                  key={`${qns.first_factor}_${i}_${Math.random()}`}
                                >
                                  <span className="tc-top">{qns.correct_answer}</span>
                                  <span className="tc-left">{qns.first_factor}</span>
                                  <span className="tc-right">{qns.second_factor}</span>
                                </div>
                              );
                            })}{" "}
                          </div>
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProgressLevelPopup;
