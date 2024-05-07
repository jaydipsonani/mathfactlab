import React from "react";
import tenFramesRedDotImage from "assets/images/ten-frames/red.png";
import tenFramesYellowDotImage from "assets/images/ten-frames/yellow.png";
import tenFramesPurpleDotImage from "assets/images/ten-frames/purple.png";

function LevelGTenFrames(props) {
  //practice question test page
  const { first_factor, second_factor, hintClickedCount, isLowZoomLevel } = props;

  const renderFirstColumn = number => {
    if (hintClickedCount === 1) {
      if (number <= first_factor) {
        if (first_factor - 1 === second_factor) {
          if (number <= first_factor - 1) {
            return (
              <div className="circle-wrapper" key={number}>
                <div>
                  <div className="circle first-col visible">
                    <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                  </div>
                  <div className="circle second-col">
                    <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="circle-wrapper" key={number}>
                <div>
                  <div className="circle second-col">
                    <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                  </div>
                  <div className="circle first-col visible">
                    <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                  </div>
                </div>
              </div>
            );
          }
        } else {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col visible">
                  <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                </div>
                <div className="circle second-col">
                  <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                </div>
              </div>
            </div>
          );
        }
      }
      if (number <= first_factor + second_factor - 1) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col visible">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= first_factor + second_factor) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col visible-slow">
                {" "}
                <img src={tenFramesPurpleDotImage} alt="tenFramesPurpleDotImage"></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (number <= first_factor) {
        if (number <= first_factor - 1) {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col visible">
                  <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                </div>
                <div className="circle second-col">
                  <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                </div>
              </div>
            </div>
          );
        } else {
          if (first_factor - 1 === second_factor) {
            return (
              <div className="circle-wrapper" key={number}>
                <div>
                  <div className="circle first-col">
                    <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                  </div>
                  <div className="circle second-col">
                    {" "}
                    <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                  </div>
                  <div className="circle fifth-col visible-slow">
                    {" "}
                    <img src={tenFramesPurpleDotImage} alt="tenFramesPurpleDotImage"></img>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="circle-wrapper" key={number}>
                <div>
                  <div className="circle first-col visible">
                    <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                  </div>
                  <div className="circle second-col">
                    <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                  </div>
                </div>
              </div>
            );
          }
        }
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  //if face issue of colur while hint then put their color div like line 117 we have put red because there we are facing issue on hint clicked
  const renderSecondColumn = number => {
    if (hintClickedCount === 1 || hintClickedCount === 2) {
      if (number <= first_factor + second_factor - 10 - 1) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col visible">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      }
      if (first_factor + second_factor > 10 && number === first_factor + second_factor - 10) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col visible-slow">
                <img src={tenFramesPurpleDotImage} alt="tenFramesPurpleDotImage"></img>
              </div>
              <div className="circle second-col">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>

              <div className="circle first-col ">
                {" "}
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (number <= second_factor - 1) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col visible">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      }
      if (number === second_factor) {
        if (second_factor - 1 === first_factor) {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                </div>
                <div className="circle second-col">
                  {" "}
                  <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                </div>

                <div className="circle fifth-col visible-slow">
                  {" "}
                  <img src={tenFramesPurpleDotImage} alt="tenFramesPurpleDotImage"></img>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                </div>

                <div className="circle fifth-col visible">
                  {" "}
                  <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                </div>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="ten-frames-with-double-dices">
      <>
        <div className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => renderFirstColumn(number))}
        </div>

        <div className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => renderSecondColumn(number))}
        </div>
      </>
    </div>
  );
}

export default LevelGTenFrames;
