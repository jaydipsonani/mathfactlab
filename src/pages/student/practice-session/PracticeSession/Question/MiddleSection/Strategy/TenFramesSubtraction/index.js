import React from "react";
import DoubleTenFrames from "./DoubleTenFrames";
// import SingleTenFrames from "./SingleTenFrames";
import LevelFTenFrames from "./LevelFTenFrames";

const TenFramesSubtraction = props => {
  const { second_factor } = props;

  let isLowZoomLevel = false;

  if (window.devicePixelRatio * 100 < 100) {
    isLowZoomLevel = true;
  }

  const renderTenFrames = () => {
    switch (true) {
      // Exceptional case for Level F
      case second_factor === 10:
        return <LevelFTenFrames {...props} isLowZoomLevel={isLowZoomLevel} />;

      default:
        return <DoubleTenFrames {...props} isLowZoomLevel={isLowZoomLevel} />;
    }
  };

  return <div className="ten-frames-subtraction">{renderTenFrames()}</div>;
};

export default TenFramesSubtraction;
