import React from "react";
import { mathOperationSymbol } from "config/const";

const PracticeQuestionDeckTablePopup = props => {
  const { questionList, close, loading } = props;
  const handleCloseStudentDeleteDailog = () => {
    close();
  };
  return (
    <>
      {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
      <div className="custom-popup open">
        <div className="popup" style={{ maxWidth: "1010px" }}>
          <div className="popup-header">
            <h3 className="popup-title"> PracticeTestQuestionList Length :: {questionList.length}</h3>
            <span className="close" onClick={() => handleCloseStudentDeleteDailog()}>
              <i className="icon-close" aria-hidden="true"></i>
            </span>
          </div>
          <div className="popup-content">
            {!loading ? (
              <>
                <div style={{ padding: "12px" }}>
                  <div className="testing-qns-list-table-outer">
                    <div className="grid-container">
                      <div className="circle-wrapper">
                        <div className="index-col">No</div>
                        <div className="second-col">Qns</div>
                        <div className="third-col">Weight</div>
                      </div>
                      {questionList.slice(0, 12).map((qns, index) => (
                        <div className="circle-wrapper" key={qns.id}>
                          <div className="index-col">{index + 1}</div>
                          <div className="second-col">{`${qns.first_factor} ${
                            mathOperationSymbol[qns.math_operation_id]
                          } ${qns.second_factor}`}</div>
                          <div className="third-col">{qns.weightage}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid-container">
                      <div className="circle-wrapper">
                        <div className="index-col">No</div>
                        <div className="second-col">Qns</div>
                        <div className="third-col">Weight</div>
                      </div>
                      {questionList.slice(12, 24).map((qns, index) => (
                        <div className="circle-wrapper" key={qns.id}>
                          <div className="index-col">{index + 13}</div>
                          <div className="second-col">{`${qns.first_factor}  ${
                            mathOperationSymbol[qns.math_operation_id]
                          } ${qns.second_factor}`}</div>
                          <div className="third-col">{qns.weightage}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid-container">
                      <div className="circle-wrapper">
                        <div className="index-col">No</div>
                        <div className="second-col">Qns</div>
                        <div className="third-col">Weight</div>
                      </div>
                      {questionList.slice(24, 36).map((qns, index) => (
                        <div className="circle-wrapper" key={qns.id}>
                          <div className="index-col">{index + 25}</div>
                          <div className="second-col">{`${qns.first_factor}  ${
                            mathOperationSymbol[qns.math_operation_id]
                          } ${qns.second_factor}`}</div>
                          <div className="third-col">{qns.weightage}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid-container">
                      <div className="circle-wrapper">
                        <div className="index-col">No</div>
                        <div className="second-col">Qns</div>
                        <div className="third-col">Weight</div>
                      </div>
                      {questionList.slice(36, 48).map((qns, index) => (
                        <div className="circle-wrapper" key={qns.id}>
                          <div className="index-col">{index + 37}</div>
                          <div className="second-col">{`${qns.first_factor}  ${
                            mathOperationSymbol[qns.math_operation_id]
                          } ${qns.second_factor}`}</div>
                          <div className="third-col">{qns.weightage}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30vh",
                  width: "100%"
                }}
              >
                <div className="lds-dual-ring"></div>
                {/* <Spinner color="primary" /> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="popup-backface open"></div>
    </>
  );
};
export default PracticeQuestionDeckTablePopup;
