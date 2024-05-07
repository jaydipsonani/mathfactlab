import React from "react";
import tenFramesRedDotImage from "assets/images/ten-frames/red.png";
import tenFramesYellowDotImage from "assets/images/ten-frames/yellow.png";

function TenFramesWithDoubles(props) {
  //practice question test page
  const { second_factor, hintClickedCount } = props;

  let isLowZoomLevel = false;

  if (window.devicePixelRatio * 100 < 100) {
    isLowZoomLevel = true;
  }
  const renderFirstColumn = number => {
    if (hintClickedCount === 1) {
      if (number <= second_factor) {
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
      }
      if (number <= second_factor * 2) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col ">
                {" "}
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col visible">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
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
      if (number <= second_factor) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col visible">
                {" "}
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
  const redendSecondColumn = number => {
    if (hintClickedCount === 1 || hintClickedCount === 2) {
      if (number <= second_factor * 2 - 10) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col visible">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
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
      if (number <= second_factor) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
              </div>
              <div className="circle second-col visible">
                <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
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
      <div className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => renderFirstColumn(number))}
      </div>

      <div className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => redendSecondColumn(number))}
      </div>
    </div>
  );
}

export default TenFramesWithDoubles;
