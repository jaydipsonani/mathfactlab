import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";
import _ from "lodash";
import { ArrowRightOutlined } from "@ant-design/icons";
import logo from "assets/images/logo.svg";

const Step5 = props => {
  const {
    handleNextNewUser,
    // handleBackNewUser,
    studentList,
    selectedClass,
    handleAddMoreClass
  } = props;

  const { userDetails } = useSelector(({ auth }) => auth);

  const { studentList: studentUserList } = useSelector(({ user }) => user);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  class ComponentToPrint extends React.Component {
    render() {
      let studentListByActiveClass = studentUserList.filter(std => selectedClass.class_code === std.class_code);

      const renderStudentList = _.chunk(studentListByActiveClass, 10);

      return (
        <div>
          {renderStudentList.map((studentList, i) => {
            return (
              <div key={i} style={{ pageBreakAfter: "always", pageBreakInside: "avoid" }}>
                <div
                  style={{
                    display: "flex",

                    margin: "8px 4px",
                    alignItems: "center"
                  }}
                >
                  {/* <div style={{ width: "200px", marginLeft: "4px" }}>
                    <img src={logo} alt="MathFactLab" className="login-logo" />
                  </div> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      marginLeft: "16px"
                    }}
                  >
                    <div className="font-36 text-secondary mt-10 mb-10">
                      Login cards
                      {/* Login cards - {userDetails.profile.first_name}{" "}
                      {userDetails.profile.last_name}{" "} */}
                    </div>
                    {/* <div className="font-22 mt-10">
                      Class code - {userDetails.profile.class_code}
                    </div> */}
                  </div>
                </div>
                <div data-v-1538b6bb="" className="student-card-main-wrapper">
                  {studentList.map(student => {
                    return (
                      <div key={student.id} data-v-61b73c48="" data-v-1538b6bb="" className="student-login-card">
                        {/* <div data-v-61b73c48="" className="card-header">
                          <div data-v-61b73c48="" className="card-title">
                            {student.profile.last_name}{" "}
                            {student.profile.first_name}
                          </div>
                          <div data-v-61b73c48="" className="card-subtitle">
                            {student.profile.class_code}
                          </div>
                        </div> */}
                        <ul data-v-61b73c48="" className="login-steps">
                          <li className="step">
                            <div className="card-logo">
                              <img src={logo} alt="MathFactLab" className="login-logo" />
                            </div>
                          </li>
                          <li className="card-title">
                            {student.profile.first_name} {student.profile.last_name}
                          </li>
                          <li data-v-61b73c48="" className="step">
                            <div data-v-61b73c48="" className="step-instructions">
                              <div data-v-61b73c48="" className="left-column">
                                <div data-v-61b73c48="" className="step-label">
                                  Website:
                                </div>{" "}
                                <div data-v-61b73c48="" className="step-label">
                                  Classcode:
                                </div>{" "}
                                <div data-v-61b73c48="" className="step-label">
                                  Username:
                                </div>{" "}
                                <div data-v-61b73c48="" className="step-label">
                                  Password:
                                </div>{" "}
                              </div>

                              <div className="right-column">
                                <div data-v-61b73c48="" className="field login">
                                  {window.location.host}
                                  {/* www.mathfactlab.com */}
                                </div>
                                <div data-v-61b73c48="" className="field login">
                                  {student.class_code}
                                </div>
                                <div data-v-61b73c48="" className="field login">
                                  {student.user_name}
                                </div>
                                <div data-v-61b73c48="" className="field password">
                                  {student.password}
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div style={{ margin: "100px" }}></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  const handleNext = () => {
    handleNextNewUser();
  };
  // const handleBack = () => {
  //   handleBackNewUser();
  // };
  return (
    <>
      <div style={{ width: "8.25in", display: "none" }}>
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className="step-5">
        <div className="step-5-header-text">Login Cards</div>

        <div className="step-5-sub-text">{`${studentList.length} students have been successfully added to ${selectedClass.name}.`}</div>

        <div className="actions-button">
          <div>
            <Button type="primary" size="large" className="joyride-2" onClick={handlePrint}>
              {`Print Login Card for ${selectedClass.name}`}
            </Button>
          </div>
        </div>
        <div className="sync-text">
          Login cards can also be found under ‘Actions’ in the top right of the teacher dashboard.
        </div>

        <div className="sync-button">
          <Button type="primary" size="large" className="joyride-2" onClick={() => handleAddMoreClass()}>
            {`Add students to another class`}
          </Button>
        </div>
      </div>
      <div className="welcome-step-popup-footer">
        {/* <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div> */}
        <div></div>

        {userDetails && userDetails.login_count <= 1 ? (
          <div className="next-nav-btn" onClick={handleNext}>
            Next <ArrowRightOutlined />
          </div>
        ) : (
          <div className="next-nav-btn" onClick={handleNext}>
            Exit <ArrowRightOutlined />
          </div>
        )}
      </div>
    </>
  );
};

export default Step5;
