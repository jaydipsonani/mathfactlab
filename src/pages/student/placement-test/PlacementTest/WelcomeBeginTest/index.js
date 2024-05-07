import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import useKeypress from "react-use-keypress";
import beakerImg from "../../../../../assets/images/other/beaker.svg";
import studentWelcomeImgOne from "../../../../../assets/images/student-welcome-1.svg";
import studentWelcomeImgTwo from "../../../../../assets/images/student-welcome-2.svg";
import studentWelcomeImgThree from "../../../../../assets/images/student-welcome-3.svg";
import studentWelcomeImgFour from "../../../../../assets/images/student-welcome-4.svg";
import arrowBlueImg from "../../../../../assets/images/other/arrow-blue.svg";
import { createNewSubmission, getSubmissionDetails } from "../../../../../redux/actions/quizAction";
import { useTranslation } from "react-i18next";

const BeginTest = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userDetails } = useSelector(({ auth }) => auth);
  const handleFetchLastSubmissionDetails = () => {
    dispatch(getSubmissionDetails(userDetails));
    props.isShowTest();
  };

  // Key press Event
  // useKeypress("Enter", () => {
  //   // Do something when the user has pressed the Space and Enter key
  //   handleClickBeginTest();
  // });

  const handleClickBeginTest = () => {
    const body = {
      status_id: "pss_28a554bd3456204632dde438",
      assigned_level_id: "1",
      learning_mode_id: userDetails.profile.student_learning_mode_id
    };
    async function fetchData() {
      // You can await here
      await dispatch(createNewSubmission(body, handleFetchLastSubmissionDetails));
      // ...
    }
    fetchData();

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  };

  return (
    <>
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    <span className="watermark-text op-8">{t("placement-test.title")}</span>
                    <p className="spotlight-text">
                      <span>{t("placement-test.subTitle")}</span>
                    </p>
                    <h1 className="bigger-text">{t("placement-test.mathFactLabTitle")}</h1>
                    <div className="student-welcome-grid">
                      <div className="student-welcome-grid-cols">
                        <div className="student-welcome-grid-inner">
                          <div className="student-welcome-grid-image first">
                            <img src={studentWelcomeImgOne} alt="Student-1" className="student-img" />
                            <div className="animated-arrow">
                              <div className="borderAnim"></div>
                              <img src={arrowBlueImg} className="arrow-right first" alt="Arrow" />
                            </div>
                          </div>
                          <div className="student-welcome-grid-text first">{t("placement-test.beginText")}</div>
                        </div>
                      </div>

                      <div className="student-welcome-grid-cols">
                        <div className="student-welcome-grid-inner">
                          <div className="student-welcome-grid-image second">
                            <img src={studentWelcomeImgTwo} alt="Student-1" className="student-img" />
                            <div className="animated-arrow">
                              <div className="borderAnim"></div>
                              <img src={arrowBlueImg} className="arrow-right second" alt="Arrow" />
                            </div>
                          </div>
                          <div className="student-welcome-grid-text second">{t("placement-test.secondText")}</div>
                        </div>
                      </div>

                      <div className="student-welcome-grid-cols">
                        <div className="student-welcome-grid-inner">
                          <div className="student-welcome-grid-image third">
                            <img src={studentWelcomeImgThree} alt="Student-1" className="student-img" />
                            <div className="animated-arrow">
                              <div className="borderAnim"></div>
                              <img src={arrowBlueImg} className="arrow-right third" alt="Arrow" />
                            </div>
                          </div>
                          <div className="student-welcome-grid-text third">{t("placement-test.thirdText")}</div>
                        </div>
                      </div>

                      <div className="student-welcome-grid-cols">
                        <div className="student-welcome-grid-inner">
                          <div className="student-welcome-grid-image fourth">
                            <img src={studentWelcomeImgFour} alt="Student-1" className="student-img " />
                          </div>
                          <div className="student-welcome-grid-text fourth">{t("placement-test.fourthText")}</div>
                        </div>
                      </div>
                    </div>

                    <div className="test-button-wrap wrap mt-5 mb-0">
                      <button className="btn btn-test start-button-fade-in" onClick={() => handleClickBeginTest()}>
                        {t("placement-test.startedButton")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    <img src={beakerImg} className="vec-img" alt="beakerImg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BeginTest;

// import React from "react";
// import beakerImg from "assets/images/beaker.svg";
// import { createNewSubmission, getSubmissionDetails } from "store/action";
// import { useDispatch, useSelector } from "react-redux";
// const BeginTest = props => {
//   const dispatch = useDispatch();
//   const { userDetails } = useSelector(({ auth }) => auth);
//   const handleFetchLastSubmissionDetails = () => {
//     dispatch(getSubmissionDetails(userDetails));
//     props.isShowTest();
//   };
//   const handleClickBeginTest = () => {
//     const body = {
//       status_id: "pss_28a554bd3456204632dde438",
//       assigned_level_id: "1",
//       title: "dummxaaysas1",
//     };
//     async function fetchData() {
//       // You can await here
//       await dispatch(
//         createNewSubmission(body, handleFetchLastSubmissionDetails),
//       );
//       // ...
//     }
//     fetchData();
//   };

//   return (
//     <>
//       <section className="main-test-screen">
//         <div className="col-xs-12">
//           <div className="row">
//             <div className="container">
//               <div className="main-test-wrap">
//                 <div className="main-test-left main-test-cols">
//                   <div className="centered-wrap wrap position-relative">
//                     <span className="watermark-text op-8">Welcome</span>
//                     <p className="spotlight-text">
//                       <span>Welcome to</span>
//                     </p>
//                     <h1 className="bigger-text">MathFactLab!</h1>
//                     <div className="test-button-wrap">
//                       <button
//                         className="btn btn-test"
//                         onClick={() => handleClickBeginTest()}
//                       >
//                         Begin
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="main-test-right main-test-cols">
//                   <div className="test-vector">
//                     <img src={beakerImg} className="vec-img" alt="vec-img" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//     </>
//   );
// };

// export default BeginTest;
