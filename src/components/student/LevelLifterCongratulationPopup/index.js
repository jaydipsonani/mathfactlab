import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { getLastLevelByLearningMode } from "utils/helpers";
// import { logout } from "store/action";
import { useSelector } from "react-redux";
import AnimatedStar from "components/student/AnimatedStar";
import { mulSubLevelList, addSubLevelList } from "config/const";
import leftSideAnimatedStarImg from "assets/images/left-side-animated-star.svg";
import rightSideAnimatedStarImg from "assets/images/right-side-animated-star.svg";
import congratulationImg from "assets/images/other/congratulation.png";
import thumbsupImg from "assets/images/thumbs-up.svg";

const LevelLifterCongratulationPopup = props => {
  // const dispatch = useDispatch();
  // let history = useHistory();
  const { width, height } = useWindowSize();

  const { userDetails } = useSelector(({ auth }) => auth);
  const {
    profile: { add_sub_level_id, student_learning_mode_id, mul_div_level_id }
  } = userDetails;

  // const authLogoutSuccess = () => {
  //   localStorage.removeItem("practice_test_submissions_id");
  //   localStorage.removeItem("user-token");
  //   localStorage.removeItem("isSessionStarted");
  //   sessionStorage.clear();
  //   history.push("/student/login");
  // };
  let updatedUserLevel =
    student_learning_mode_id === 1 ? addSubLevelList[add_sub_level_id] : mulSubLevelList[mul_div_level_id];

  let userLevelLifterCount =
    student_learning_mode_id === 1
      ? userDetails.profile.is_add_sub_level_lifter
      : userDetails.profile.is_mul_div_level_lifter;

  const maxLevelCountByLearningMode = getLastLevelByLearningMode(student_learning_mode_id);

  const handleClose = () => {
    // const lastLevel = getLastLevelByLearningMode(student_learning_mode_id);

    // if (updatedUserLevel.value === lastLevel && userLevelLifterCount > 0) {
    //   dispatch(logout(authLogoutSuccess));
    // }

    props.close();
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open" style={{ zIndex: "1555555" }}>
          <Confetti
            recycle={false}
            numberOfPieces={100}
            width={width}
            height={height}
            // by increase areaof x and y  will be increase
            initialVelocityX={{ min: -10, max: 10 }}
            initialVelocityY={{ min: -10, max: 10 }}
            confettiSource={{
              w: 10,
              h: 10,
              x: width / 2,
              y: height / 2
            }}
          >
            {" "}
          </Confetti>{" "}
          <div className="popup">
            <div className="popup-header" style={{ borderBottom: "none" }}>
              <h3 className="popup-title">{null}</h3>
              <span className="close" onClick={() => handleClose()} style={{ marginTop: "8px", zIndex: 100001 }}>
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>{" "}
            <div className="content-wrapper">
              <div>
                <img
                  src={updatedUserLevel.value === maxLevelCountByLearningMode ? thumbsupImg : congratulationImg}
                  alt="bubbles"
                  style={{ height: "200px" }}
                />
              </div>

              <h4 className="title-text">Congratulations!</h4>

              {updatedUserLevel.value === maxLevelCountByLearningMode && userLevelLifterCount > 0 ? (
                <>
                  <h5>
                    You are still fluent with all of the {/* You have mastered all of the advanced{" "} */}
                    <b>
                      {student_learning_mode_id === 1 ? "addition and subtraction" : "multiplication and division"}
                    </b>{" "}
                    facts.
                  </h5>
                  <h5>Regular practice is the key to keeping sharp.</h5>
                  {/* You are now{" "}
                    {student_learning_mode_id === 1 ? "an" : "a"}{" "}
                    <b>
                      {student_learning_mode_id === 1
                        ? "addition/subtraction"
                        : "multiplication/division"}
                    </b>{" "}
                    graduate of MathFactLab!
                    <br />
                  </h5>
                  <h5> Please login regularly to keep your skills sharp.</h5> */}
                </>
              ) : (
                <h5>
                  You are now ready for {updatedUserLevel && updatedUserLevel.label}{" "}
                  {updatedUserLevel && updatedUserLevel.descriptors}.{" "}
                </h5>
              )}
            </div>{" "}
            <img className="left-animated-star" src={leftSideAnimatedStarImg} alt="AnimatedStarImg" />
            <img className="right-animated-star" src={rightSideAnimatedStarImg} alt="AnimatedStarImg" />
            <AnimatedStar />
          </div>
        </div>

        <div className="popup-backface open" style={{ zIndex: "999" }}></div>
      </>
    </>
  );
};

export default LevelLifterCongratulationPopup;
