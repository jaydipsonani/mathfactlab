import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Button from "components/Button";
import { groupBy, orderBy } from "lodash";
import Section from "components/common/Section";
import Container from "components/common/Container";
import { mulSubLevelList, addSubLevelList } from "config/const";
import { getLevelsLearningModeList } from "../../../redux/actions/quizAction";
import { Link } from "react-router-dom";
import "assets/sass/components/button-ant.scss";
import "assets/sass/components/teaching-tools.scss";
import { Space, Typography, Spin, Card, Tooltip } from "antd";
import ErrorBoundary from "components/common/ErrorBoundary";

const { Title } = Typography;

function TeacherTeachingToolsPage(props) {
  const dispatch = useDispatch();

  const { levelLearningModeList, fetchingLevelLearningModeListLoading } = useSelector(({ quiz }) => quiz);

  const [addSubLevels, setAddSubLevels] = useState([]);
  const [mulDivLevels, setMULDivLevels] = useState([]);

  useEffect(() => {
    !levelLearningModeList.length && dispatch(getLevelsLearningModeList());

    setAddSubLevels(orderBy(groupBy(levelLearningModeList, "learning_mode_id")[1], ["title"], ["asc"]));
    setMULDivLevels(orderBy(groupBy(levelLearningModeList, "learning_mode_id")[2], ["title"], ["asc"]));
  }, [levelLearningModeList]); // eslint-disable-line

  return (
    <>
      <ErrorBoundary>
        <Container fluid>
          <Section
            title={
              <>
                <Title level={4} className={"tab-heading"}>
                  Teaching Tools :{" "}
                  <span style={{ fontWeight: "500" }}>Select the level you wish to review with your students.</span>
                  <Tooltip
                    placement="bottom"
                    overlayClassName="ant-tooltip-reset-counter"
                    title="Teaching Tools provides easy access to all of our strategies at each level -  allowing you to use MathFactLab for direct instruction to the whole class, a small group, or an individual student."
                  >
                    <span className="teaching-tool-info-icon">?</span>
                  </Tooltip>
                </Title>
              </>
            }
          >
            {/* <div>
              <h6 className="mb-20 teaching-tool-sub-title">
                Select the level you wish to review with your students.
              </h6>
            </div> */}

            {/* <div className="mfl-accordions-wrapper"> */}
            {fetchingLevelLearningModeListLoading ? (
              <div className="loader-wrapper">
                <Spin />
              </div>
            ) : !!levelLearningModeList?.length ? (
              <div className="math-operation-wrapper">
                <div className="learning-mode-level">
                  <Space direction="vertical">
                    <Title level={5}>
                      Addition / Subtraction Levels {/* <i className={"icon-add-sub ml-10"} aria-hidden="true" /> */}
                    </Title>
                    <div
                      style={{
                        // display: "grid",
                        // gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                        // gridGap: "16px",
                        display: "flex",
                        flexWrap: "wrap"
                      }}
                    >
                      {addSubLevels &&
                        addSubLevels.map((level, i) =>
                          addSubLevelList[level.level_index] && addSubLevelList[level.level_index]["descriptors"] ? (
                            <div key={i} className="level-card">
                              <Link
                                to={
                                  "/teacher/practice-select-activity?learning_mode_id=" +
                                  level.learning_mode_id +
                                  "&level_id=" +
                                  level.level_index
                                }
                              >
                                <Card
                                  type="primary"
                                  bodyStyle={{ display: "none" }}
                                  title={
                                    <div>
                                      {addSubLevelList[level.level_index]["sort"]}
                                      <span className="subtitle-text">
                                        {addSubLevelList[level.level_index]["sortDescriptor"]
                                          ? addSubLevelList[level.level_index]["sortDescriptor"]
                                          : addSubLevelList[level.level_index]["descriptors"]}
                                      </span>
                                    </div>
                                  }
                                  // title={`${
                                  //   addSubLevelList[level.level_id]["sort"]
                                  // } ${
                                  //   addSubLevelList[level.level_id][
                                  //     "descriptors"
                                  //   ]
                                  // }`}
                                >
                                  {/* {" "}
                                  <Tag
                                    style={{
                                      background: "#e0f7ed",
                                      color: "#2dcc89",
                                      border: "none",
                                    }}
                                  >
                                    3 x 3
                                  </Tag>
                                  <Tag
                                    style={{
                                      background: "#e0f7ed",
                                      color: "#2dcc89",
                                      border: "none",
                                    }}
                                  >
                                    3 x 3
                                  </Tag>
                                  <Tag
                                    style={{
                                      background: "#e0f7ed",
                                      color: "#2dcc89",
                                      border: "none",
                                    }}
                                  >
                                    3 x 3
                                  </Tag> */}
                                </Card>
                                {/* {showActivityPage ? <TeacherSelectActivityPage /> : ""} */}
                              </Link>
                            </div>
                          ) : (
                            ""
                          )
                        )}
                    </div>
                  </Space>
                </div>

                <div className="learning-mode-level">
                  <Space direction="vertical">
                    <Title level={5}>
                      Multiplication / Division Levels {/* <i className={"icon-mul-div ml-10"} aria-hidden="true" /> */}
                    </Title>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap"
                      }}
                    >
                      {mulDivLevels &&
                        mulDivLevels.map((level, i) =>
                          mulSubLevelList[level.level_index] && mulSubLevelList[level.level_index]["descriptors"] ? (
                            <div key={i} className="level-card">
                              <Link
                                to={
                                  "/teacher/practice-select-activity?learning_mode_id=" +
                                  level.learning_mode_id +
                                  "&level_id=" +
                                  level.level_index
                                }
                              >
                                <Card
                                  type="primary"
                                  bodyStyle={{ display: "none" }}
                                  title={
                                    <div>
                                      {mulSubLevelList[level.level_index]["sort"]}
                                      <span className="subtitle-text">
                                        {mulSubLevelList[level.level_index]["sortDescriptor"]
                                          ? mulSubLevelList[level.level_index]["sortDescriptor"]
                                          : mulSubLevelList[level.level_index]["descriptors"]}
                                      </span>
                                    </div>
                                  }
                                  // title={`${
                                  //   mulSubLevelList[level.level_id]["sort"]
                                  // }  ${
                                  //   mulSubLevelList[level.level_id][
                                  //     "descriptors"
                                  //   ]
                                  // }`}
                                >
                                  {/* <Tag
                                    style={{
                                      background: "#e0f7ed",
                                      color: "#2dcc89",
                                      border: "none",
                                    }}
                                  >
                                    3 x 3
                                  </Tag>
                                  <Tag
                                    style={{
                                      background: "#e0f7ed",
                                      color: "#2dcc89",
                                      border: "none",
                                    }}
                                  >
                                    3 x 3
                                  </Tag>
                                  <Tag
                                    style={{
                                      background: "#e0f7ed",
                                      color: "#2dcc89",
                                      border: "none",
                                    }}
                                  >
                                    3 x 3
                                  </Tag> */}
                                </Card>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )
                        )}
                    </div>
                  </Space>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* </div> */}
          </Section>
        </Container>
      </ErrorBoundary>
    </>
  );
}

export default TeacherTeachingToolsPage;
