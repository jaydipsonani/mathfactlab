import React from "react";
import useKeypress from "react-use-keypress";

const KeyPressHook = props => {
  // // Key press Event
  useKeypress("Enter", () => {
    // Do something when the user has pressed the Enter key
    props.startTimer();
  });

  return <></>;
};

export default KeyPressHook;
