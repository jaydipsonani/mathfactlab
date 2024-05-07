import React from "react";
import LoadingBar from "react-top-loading-bar";

const ProgressBar = props => {
  return (
    <LoadingBar
      progress={props.studentPracticeTestProgressBarPercentage}
      shadow={false}
      color="#50be81"
      height={6}
      containerStyle={{ position: "revert" }}
    />
  );
};

export default ProgressBar;
