import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTeacher } from "../../../redux/actions/authAction";
import teacherWelcomeImgOne from "assets/images/tablet-banner-toolbar.svg";
import teacherWelcomeImgTwo from "assets/images/tablet-banner-landscape.svg";

const TabletBanner = props => {
  const { open } = props;

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const [isEnabledDoNotShowWelcomeBanner, setIsEnabledDoNotShowWelcomeBanner] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(open);
    }, 300);
  }, [open]);

  const handleChangeCheckbox = () => {
    setIsEnabledDoNotShowWelcomeBanner(!isEnabledDoNotShowWelcomeBanner);
  };

  const handleCloseStudentDialog = () => {
    props.close();
    sessionStorage.setItem("is_show_tablet_banner", 1);
    if (isEnabledDoNotShowWelcomeBanner) {
      const body = {
        profile: {
          is_show_tablet_banner: 1
        }
      };
      dispatch(updateTeacher(body));
    }
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className={visible ? "custom-popup open tablet-popup" : "custom-popup tablet-popup"}>
          <div className="popup">
            <div className="popup-content">
              <div className="font-24 text-center popupStaticText">
                <p className="popupinner-text">When using MathFactLab on an iPad</p>
                <p className="popupinner-text">remember to do the following:</p>
              </div>
              <div className="popup-grid">
                <div className="popup-grid-cols">
                  <div className="popup-grid-image">
                    <img src={teacherWelcomeImgTwo} alt="teacherWelcomeImgTwo" />
                  </div>
                  <div className="popup-grid-content">Use the iPad in landscape mode.</div>
                </div>
                <div className="popup-grid-cols">
                  <div className="popup-grid-image">
                    <img src={teacherWelcomeImgOne} alt="teacherWelcomeImgOne" />
                  </div>
                  <div className="popup-grid-content">
                    <div>Hide the toolbar</div>
                    <div className="hide-toolbar-steps">
                      <div className="hide-toolbar-steps">
                        <span>1. Touch the AA in top left corner.</span>
                        <br />
                        <span>2. Select 'Hide Toolbar' </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="popup-checkbox">
                <input
                  className="mfl-input-checkbox-td-0 "
                  type="checkbox"
                  id="checki-2"
                  onChange={() => handleChangeCheckbox()}
                  // disabled
                  checked={isEnabledDoNotShowWelcomeBanner}
                />
                <label className="mfl-input-checkbox-label" htmlFor="checki-2" style={{ transitionDelay: "0" }}>
                  Do not show this message again.
                </label>
              </div>
            </div>
            <div className="close-icon" onClick={handleCloseStudentDialog}>
              X Close
            </div>
          </div>
        </div>
        <div className={visible ? "popup-backface open" : "popup-backface"}></div>
      </>
    </>
  );
};

export default TabletBanner;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const TabletBanner = () => {
//   const [isShowTabletBanner, setIsShowTabletBanner] = useState(false);
//   const { userDetails } = useSelector(({ auth }) => auth);
//   //show cookies consent after time interval
//   useEffect(() => {
//     if (
//       sessionStorage.getItem("is_show_tablet_banner") !== "false" &&
//       userDetails.login_count <= 1
//     ) {
//       setTimeout(() => {
//         setIsShowTabletBanner(true);
//       }, 2000);
//     }
//   }, []); //eslint-disable-line

//   const handleCloseTableBanner = () => {
//     sessionStorage.setItem("is_show_tablet_banner", false);
//     setIsShowTabletBanner(false);
//   };
//   return (
//     <div className={isShowTabletBanner ? "tablet-banner" : "hidden"}>
//       MathFactLab looks much better on a tablet if you hold it horizontally
//       (side-to-side).
//       <span className="close" onClick={() => handleCloseTableBanner()}>
//         X
//       </span>
//     </div>
//   );
// };

// export default TabletBanner;
