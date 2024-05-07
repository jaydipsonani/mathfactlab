import React from "react";
import LevelFTenFrames from "./LevelFTenFrames";
import LevelGTenFrames from "./LevelGTenFrames";
import LevelHJKTenFrames from "./LevelHJKTenFrames";

import DefaultLevelTenFrames from "./DefaultLevelTenFrames";

function TenFramesAddition(props) {
  //practice question test page
  const { level_title } = props;

  let isLowZoomLevel = false;

  if (window.devicePixelRatio * 100 < 100) {
    isLowZoomLevel = true;
  }

  const renderTenFrames = levelTitle => {
    switch (levelTitle) {
      // Without Hint Case

      case "Level F":
        return <LevelFTenFrames {...props} key="level F" isLowZoomLevel={isLowZoomLevel} />;

      // Near doubles cases
      case "Level G":
        return <LevelGTenFrames {...props} key="level G" isLowZoomLevel={isLowZoomLevel} />;

      case "Level H":
        return <LevelHJKTenFrames {...props} key="level H" isLowZoomLevel={isLowZoomLevel} />;

      default:
        return <DefaultLevelTenFrames {...props} key="default" isLowZoomLevel={isLowZoomLevel} />;
    }

    // switch (true) {
    //   // Without Hint Case

    //   case first_factor === 10 || second_factor === 10:

    //     return (
    //       <LevelFTenFrames
    //         {...props}
    //         key="level F"
    //         isLowZoomLevel={isLowZoomLevel}
    //       />
    //     );

    //   // Near doubles cases
    //   case first_factor + 1 === second_factor ||
    //     second_factor + 1 === first_factor:

    //     return (
    //       <LevelGTenFrames
    //         {...props}
    //         key="level G"
    //         isLowZoomLevel={isLowZoomLevel}
    //       />
    //     );
    //   case "Level H":

    //     return (
    //       <LevelHJKTenFrames
    //         {...props}
    //         key="level H"
    //         isLowZoomLevel={isLowZoomLevel}
    //       />
    //     );

    //   default:

    //     return (
    //       <DefaultLevelTenFrames
    //         {...props}
    //         key="default"
    //         isLowZoomLevel={isLowZoomLevel}
    //       />
    //     );
    // }
  };
  return <div className="ten-frames-addition">{renderTenFrames(level_title)}</div>;
}

export default TenFramesAddition;
