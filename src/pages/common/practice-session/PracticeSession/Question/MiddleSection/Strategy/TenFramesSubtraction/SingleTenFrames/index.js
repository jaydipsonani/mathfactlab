import React from "react";
import cross from "assets/images/other/cross.svg";
import tenFramesYellowDotImage from "assets/images/ten-frames/yellow.png";
import tenFramesBlueDotImage from "assets/images/ten-frames/blue.png";
function SingleTenFrames(props) {
  //practice question test page
  const { first_factor, second_factor, hintClickedCount, isLowZoomLevel } = props;

  const renderFirstColumn = number => {
    if (hintClickedCount) {
      if (number <= first_factor - second_factor) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle fourth-col visible">
                <img src={tenFramesBlueDotImage} alt="tenFramesBlueDotImage"></img>
              </div>
              <div className="circle second-col">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= first_factor) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle fourth-col visible">
                <img src={tenFramesBlueDotImage} alt="tenFramesBlueDotImage"></img>
              </div>
              <div className="circle second-col">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
              <img src={cross} alt="Dice1" className="dice-img cross-img" />
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle fourth-col ">
                {" "}
                <img src={tenFramesBlueDotImage} alt="tenFramesBlueDotImage"></img>
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
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle fourth-col visible">
                <img src={tenFramesBlueDotImage} alt="tenFramesBlueDotImage"></img>
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
              <div className="circle fourth-col ">
                {" "}
                <img src={tenFramesBlueDotImage} alt="tenFramesBlueDotImage"></img>
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
    <>
      {[...Array(Math.ceil(first_factor / 10))].map((frames, index) => {
        return (
          <div key={frames} className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
              return number + index * 10 <= first_factor ? (
                <div className="circle-wrapper" key={number}>
                  <div>
                    <div className="circle first-col  visible">
                      <img src={tenFramesBlueDotImage} alt="tenFramesBlueDotImage"></img>
                    </div>
                    <div className="circle second-col">
                      <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                    </div>
                    {hintClickedCount === 1 && number + index * 10 > first_factor - second_factor && (
                      <img src={cross} alt="Dice1" className="dice-img cross-img" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="circle-wrapper" key={number}>
                  <div>
                    <div className="circle first-col">
                      <img src={tenFramesBlueDotImage} alt="tenFramesBlueDotImage"></img>
                    </div>
                    <div className="circle second-col">
                      <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => renderFirstColumn(number))}
      </div>
    </>
  );
}

export default SingleTenFrames;
