import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTeacher } from "../../../redux/actions";
import teacherWelcomeImgOne from "assets/images/teacher-welcome-1.svg";
import teacherWelcomeImgTwo from "assets/images/teacher-welcome-2.svg";
import teacherWelcomeImgThree from "assets/images/teacher-welcome-3.svg";

const TeacherWelcomePopup = props => {
  const { open } = props;

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  // const [
  //   isEnabledDoNotShowWelcomeBanner,
  //   setIsEnabledDoNotShowWelcomeBanner,
  // ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(open);
    }, 300);
  }, [open]);

  // const handleChangeCheckbox = () => {
  //   setIsEnabledDoNotShowWelcomeBanner(!isEnabledDoNotShowWelcomeBanner);
  // };

  const handleCloseStudentDialog = () => {
    props.close();

    // if (isEnabledDoNotShowWelcomeBanner) {
    const body = {
      role_id: 2,
      profile: {
        // "email": "albtiros.1@gmail.com",
        // "first_name": "albtrios.1",
        // "last_name": "teacher",
        is_disabled_welcome_banner: 1
      }
    };
    dispatch(updateTeacher(body));
    // }
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className={visible ? "custom-popup open primary-popup" : "custom-popup primary-popup"}>
          <div className="popup">
            <div className="popup-content">
              <div className="font-24 text-center popupStaticText">
                <p className="popupinner-text">
                  MathFactLab is based on the idea that pattern recognition makes math easier to learn.
                </p>
                <p className="popupinner-text">
                  By engaging with number lines, ten frames, area models, dice, beads etc, your students will enhance
                  their number sense as they construct a deep understanding of the basic math facts.
                </p>
              </div>
              <div className="popup-grid">
                <div className="popup-grid-cols">
                  <div className="popup-grid-image">
                    <img src={teacherWelcomeImgOne} alt="teacherWelcomeImgOne" />
                  </div>
                  <div className="popup-grid-content">Begin by creating a class and adding students.</div>
                </div>
                <div className="popup-grid-cols">
                  <div className="popup-grid-image">
                    <img src={teacherWelcomeImgTwo} alt="teacherWelcomeImgTwo" />
                  </div>
                  <div className="popup-grid-content">Monitor progress.</div>
                </div>
                <div className="popup-grid-cols">
                  <div className="popup-grid-image">
                    <img src={teacherWelcomeImgThree} alt="teacherWelcomeImgThree" />
                  </div>
                  <div className="popup-grid-content">Edit, remove, reassess or reassign students with ease.</div>
                </div>
              </div>
              {/* <div className="popup-checkbox">
                <input
                  className="mfl-input-checkbox-td-0 "
                  type="checkbox"
                  id="checki-2"
                  onChange={() => handleChangeCheckbox()}
                  // disabled
                  checked={isEnabledDoNotShowWelcomeBanner}
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="checki-2"
                  style={{ transitionDelay: "0" }}
                >
                  Do not show this message again.
                </label>
              </div> */}
              <div className="popup-grid-button text-center" onClick={() => handleCloseStudentDialog()}>
                <button className="btn btn-test">Let’s Get Started</button>
              </div>
            </div>
          </div>
        </div>
        <div className={visible ? "popup-backface open" : "popup-backface"}></div>
      </>
    </>
  );
};

export default TeacherWelcomePopup;
