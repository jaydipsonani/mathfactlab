import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Loader from "components/common/Loader";
// import { updateTeacher } from "store/action";

const Step7 = props => {
  // const dispatch = useDispatch();
  const { handleNextNewUser, handleBackNewUser } = props;

  const { userDetails } = useSelector(({ auth }) => auth);
  const [isShowIframeLoading, setIsShowIframeLoading] = useState(true);

  const handleFirstNext = () => {
    handleNextNewUser();
    <script>
      {
        (window.usetifulTags = {
          isShowCheckList: "ON"
        })
      }
    </script>;
    // const body = {
    //   profile: {
    //     is_welcome_close: 1,
    //   },
    // };
    // dispatch(updateTeacher(body));
    // window.USETIFUL.reinitialize();
  };

  const handleNext = () => {
    handleNextNewUser();
  };
  const handleBack = () => {
    handleBackNewUser();
  };
  const handleHideLoading = () => {
    setIsShowIframeLoading(false);
  };
  return (
    <>
      <div className="step-6">
        <div className="step-6-header-classes-text">Add Students and Teachers</div>
        <div className="step-6-sub-title-text">
          From this point, you can add students and teachers by going to their respective tabs. The video below walks
          you through the steps.
        </div>
        <div className="step-6-iframe-wrapper">
          {isShowIframeLoading ? (
            <div className="iframe-loader-wrapper">
              <Loader />
            </div>
          ) : (
            " "
          )}
          <iframe
            className="welcome-popup-iframe"
            title="welcome_popup"
            src="https://player.vimeo.com/video/793753544?h=69ed5603ed"
            // width="640"
            // height="60%"
            onLoad={() => handleHideLoading()}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="welcome-step-popup-footer">
        <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div>

        {userDetails.login_count <= 1 && localStorage.getItem("is_show_student_step_popup") !== "true" ? (
          <div
            className="next-nav-btn"
            id="welcomePopupExitBtn"
            // eslint-disable-next-line react/no-unknown-property
            useful="welcomePopupExitBtn"
            onClick={handleFirstNext}
          >
            Exit <ArrowRightOutlined />
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

export default Step7;
