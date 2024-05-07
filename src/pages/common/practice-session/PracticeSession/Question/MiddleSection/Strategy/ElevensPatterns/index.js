import React from "react";
import TenOnPlaceValueChart from "../TenOnPlaceValueChart";
import NinePatternsStageTwo from "../NinePatternsStageTwo";
import DiceTenPlusOne from "../DiceTenPlusOne";
import DiceTenPlusTwo from "../DiceTenPlusTwo";

function ElevensPatterns(props) {
  //practice question test page
  const { first_factor } = props;

  const renderStrategy = first_factor => {
    switch (first_factor) {
      case 10:
        return <TenOnPlaceValueChart {...props} key="is equal ten" />;
      case 11:
        return <DiceTenPlusOne {...props} key="is equal eleven" />;
      case 12:
        return <DiceTenPlusTwo {...props} key="is equal twelve" />;
      default:
        return <NinePatternsStageTwo {...props} key="is less ten" />;
    }
  };

  return <div>{renderStrategy(first_factor)}</div>;
}

export default ElevensPatterns;
