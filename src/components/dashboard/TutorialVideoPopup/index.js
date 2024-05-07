import React, { useState } from "react";
import Loader from "components/common/Loader";

const TutorialVideoPopup = props => {
  const {
    isOpenPopup,
    closePopup,
    tutorial: { tutorialIframeURL, tutorialIframeTitle }
  } = props;
  const [isShowIframeLoading, setIsShowIframeLoading] = useState(true);
  const handleClose = () => {
    closePopup(false);
  };

  const handleHideLoading = () => {
    setIsShowIframeLoading(false);
  };
  return (
    <>
      <section className="tutorial-video-layout">
        <div
          className={
            isOpenPopup ? "custom-popup open tutorial-popup ease-in-popup" : "custom-popup tutorial-popup ease-in-popup"
          }
        >
          <div className="popup">
            <div className="popup-header">
              <div className="header-text">{tutorialIframeTitle}</div>

              <span className="close-text" onClick={handleClose}>
                X Close
              </span>
            </div>

            <div className={true ? "tutorial-video-popup layout-content-center" : "tutorial-video-popup"}>
              <div className="tutorial-video-popup-content">
                <div className="tutorial-video">
                  <div className="tutorial-video-iframe-wrapper">
                    {isShowIframeLoading ? (
                      <div className="iframe-loader-wrapper">
                        <Loader />
                      </div>
                    ) : (
                      " "
                    )}
                    <iframe
                      className="tutorial-video-popup-iframe"
                      title="welcome_popup"
                      src={tutorialIframeURL}
                      onLoad={() => handleHideLoading()}
                      // width="640"
                      // height="60%"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={isOpenPopup ? "twoLayout-popup-backface open" : "twoLayout-popup-backface "}></div>
    </>
  );
};

export default TutorialVideoPopup;
