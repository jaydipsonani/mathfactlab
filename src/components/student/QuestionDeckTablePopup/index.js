import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { mathOperationSymbol } from "config/const";

const QuestionDeckTablePopup = props => {
  const { questionList, close, loading } = props;
  const handleCloseStudentDeleteDailog = () => {
    close();
  };
  const { userDetails } = useSelector(({ auth }) => auth);

  let location = useLocation();
  const query = new URLSearchParams(location.search);
  let strategyType = query.get("strategy-type");
  // const questionSlugGroupBy = _.groupBy(questionList, "slug");

  const questionByPr = questionList.reduce(
    (acc, cur) => {
      strategyType.replace(" ", "+") === cur.slug
        ? acc[`${strategyType.replace(" ", "+")}`].push(cur)
        : acc.other.push(cur);

      return acc;
    },
    {
      [`${strategyType.replace(" ", "+")}`]: [],
      other: []
    }
  );

  let userLevelId =
    userDetails.profile.student_learning_mode_id === 1
      ? +userDetails.profile.add_sub_level_id
      : +userDetails.profile.mul_div_level_id;

  //Current Level
  const currentLevelQnsList = questionList.filter(qns => qns.level_id === userLevelId);

  // const moreWeightedCurrentLevelQnsList = currentLevelQnsList.filter(
  //   qns => qns.weightage === 1,
  // );
  // const firstIntroducedCurrentLevelQnsList = currentLevelQnsList.filter(
  //   qns => qns.is_first_introduced === 1,
  // );

  // const regularCurrentLevelQnsList = currentLevelQnsList.filter(
  //   qns => qns.is_first_introduced === 0 && qns.weightage === 0,
  // );

  //Previous Level

  const previousLevelQnsList = questionList.filter(qns => qns.level_id < userLevelId);

  // const moreWeightedPreviousLevelQnsList = previousLevelQnsList.filter(
  //   qns => qns.weightage === 1,
  // );
  // const firstIntroducedPreviousLevelQnsList = previousLevelQnsList.filter(
  //   qns => qns.is_first_introduced === 1,
  // );
  // const regularpPreviousLevelQnsList = previousLevelQnsList.filter(
  //   qns => qns.is_first_introduced === 0 && qns.weightage === 0,
  // );

  return (
    <>
      {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
      <div className="custom-popup open">
        <div className="popup" style={{ maxWidth: "1010px" }}>
          <div className="popup-header">
            <h3 className="popup-title"> Total Question Length :: {questionList.length}</h3>
            <span className="close" onClick={() => handleCloseStudentDeleteDailog()}>
              <i className="icon-close" aria-hidden="true"></i>
            </span>
          </div>

          {questionByPr && (
            <div
              style={{
                paddingTop: "30px"
              }}
            >
              <div className="testing-qns-list-table-outer">
                <div
                  className="grid-container"
                  style={{
                    height: "auto",
                    width: "600px"
                  }}
                >
                  <div className="circle-wrapper">
                    <div className="first-col">Level</div>
                    <div className="second-col">Length</div>
                    <div className="third-col">PR</div>
                  </div>

                  <div className="circle-wrapper" key={Math.random()}>
                    <div
                      className="first-col"
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <div>{"Current Level"}</div>
                    </div>
                    <div className="second-col">{currentLevelQnsList.length}</div>
                    <div className="third-col">
                      {((currentLevelQnsList.length * 100) / questionList.length).toFixed(2) + "%"}
                    </div>
                    {/* <div className="second-col">
                      {" "}
                      {(
                        (moreWeightedCurrentLevelQnsList.length * 100) /
                        currentLevelQnsList.length
                      ).toFixed(2) + "%"}
                      -{moreWeightedCurrentLevelQnsList.length}
                    </div>
                    <div className="third-col">
                      {" "}
                      {(
                        (firstIntroducedCurrentLevelQnsList.length * 100) /
                        currentLevelQnsList.length
                      ).toFixed(2) + "%"}
                      -{firstIntroducedCurrentLevelQnsList.length}
                    </div>
                    <div className="third-col">
                      {" "}
                      {(
                        (regularCurrentLevelQnsList.length * 100) /
                        currentLevelQnsList.length
                      ).toFixed(2) + "%"}
                      -{regularCurrentLevelQnsList.length}
                    </div> */}
                  </div>
                  <div className="circle-wrapper" key={Math.random()}>
                    <div
                      className="first-col"
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <div>{"Previous Level"}</div>
                    </div>
                    <div className="second-col">{previousLevelQnsList.length}</div>
                    <div className="third-col">
                      {((previousLevelQnsList.length * 100) / questionList.length).toFixed(2) + "%"}
                    </div>
                    {/* <div className="second-col">
                      {" "}
                      {(
                        (moreWeightedPreviousLevelQnsList.length * 100) /
                        previousLevelQnsList.length
                      ).toFixed(2) + "%"}
                      -{moreWeightedPreviousLevelQnsList.length}
                    </div>
                    <div className="second-col">
                      {" "}
                      {(
                        (firstIntroducedPreviousLevelQnsList.length * 100) /
                        previousLevelQnsList.length
                      ).toFixed(2) + "%"}
                      -{firstIntroducedPreviousLevelQnsList.length}
                    </div>

                    <div className="third-col">
                      {" "}
                      {(
                        (regularpPreviousLevelQnsList.length * 100) /
                        previousLevelQnsList.length
                      ).toFixed(2) + "%"}
                      -{regularpPreviousLevelQnsList.length}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="popup-content">
            {!loading ? (
              <>
                <div
                  style={{
                    padding: "12px"
                  }}
                >
                  <div className="testing-qns-list-table-outer">
                    <div className="grid-container">
                      <div className="circle-wrapper">
                        <div className="index-col">No</div>
                        <div className="first-col">Slug</div>
                        <div className="second-col">Qns</div>
                        <div
                          className="third-col"
                          style={{
                            fontSize: "14px",
                            lineHeight: "1"
                          }}
                        >
                          Weight-Level
                        </div>
                      </div>
                      {questionList.slice(0, 10).map((qns, index) => (
                        <div className="circle-wrapper" key={Math.random()}>
                          <div className="index-col">{index + 1}</div>
                          <div
                            className="first-col"
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                lineHeight: "1",
                                minWidth: "50px"
                              }}
                              title={qns.slug}
                            >
                              {qns.slug}
                            </div>
                          </div>
                          <div className="second-col">{`${qns.first_factor} ${
                            mathOperationSymbol[qns.math_operation_id]
                          } ${qns.second_factor}`}</div>
                          <div className="third-col">
                            {qns.weightage}-{qns.level_id}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid-container">
                      <div className="circle-wrapper">
                        <div className="index-col">No</div>
                        <div className="first-col">Slug</div>
                        <div className="second-col">Qns</div>
                        <div
                          className="third-col"
                          style={{
                            fontSize: "14px",
                            lineHeight: "1"
                          }}
                        >
                          Weight-Level
                        </div>
                      </div>
                      {questionList.slice(10, 20).map((qns, index) => (
                        <div className="circle-wrapper" key={Math.random()}>
                          <div className="index-col">{index + 11}</div>
                          <div
                            className="first-col"
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                lineHeight: "1",
                                minWidth: "50px"
                              }}
                              title={qns.slug}
                            >
                              {qns.slug}
                            </div>
                          </div>
                          <div className="second-col">{`${qns.first_factor} ${
                            mathOperationSymbol[qns.math_operation_id]
                          } ${qns.second_factor}`}</div>

                          <div className="third-col">
                            {qns.weightage}-{qns.level_id}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid-container">
                      <div className="circle-wrapper">
                        <div className="index-col">No</div>
                        <div className="first-col">Slug</div>
                        <div className="second-col">Qns</div>
                        <div
                          className="third-col"
                          style={{
                            fontSize: "14px",
                            lineHeight: "1"
                          }}
                        >
                          Weight-Level
                        </div>
                      </div>
                      {questionList.slice(20, 30).map((qns, index) => (
                        <div className="circle-wrapper" key={Math.random()}>
                          <div className="index-col">{index + 21}</div>
                          <div
                            className="first-col"
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                lineHeight: "1",
                                minWidth: "50px"
                              }}
                              title={qns.slug}
                            >
                              {qns.slug}
                            </div>
                          </div>
                          <div className="second-col">{`${qns.first_factor} ${
                            mathOperationSymbol[qns.math_operation_id]
                          } ${qns.second_factor}`}</div>
                          <div className="third-col">
                            {qns.weightage}-{qns.level_id}
                          </div>
                        </div>
                      ))}
                    </div>
                    {questionList.length > 30 && (
                      <div className="grid-container">
                        <div className="circle-wrapper">
                          <div className="index-col">No</div>
                          <div className="first-col">Slug</div>
                          <div className="second-col">Qns</div>
                          <div
                            className="third-col"
                            style={{
                              fontSize: "14px",
                              lineHeight: "1"
                            }}
                          >
                            Weight-Level
                          </div>
                        </div>

                        {questionList.slice(30, 40).map((qns, index) => (
                          <div className="circle-wrapper" key={Math.random()}>
                            <div className="index-col">{index + 31}</div>
                            <div
                              className="first-col"
                              style={{
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "1",
                                  minWidth: "50px"
                                }}
                                title={qns.slug}
                              >
                                {qns.slug}
                              </div>
                            </div>
                            <div className="second-col">{`${qns.first_factor} ${
                              mathOperationSymbol[qns.math_operation_id]
                            } ${qns.second_factor}`}</div>
                            <div className="third-col">
                              {qns.weightage}-{qns.level_id}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
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

export default QuestionDeckTablePopup;
