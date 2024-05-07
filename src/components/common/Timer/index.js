import React, { useEffect, useState } from "react";

const Timer = props => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds => seconds - 1);
      }
      if (seconds === 1) {
        props.closeTimer();
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [seconds, props]); // eslint-disable-line

  return (
    <>
      <div className="timer-seconds">
        <span>{seconds}</span>
      </div>
    </>
  );
};

export default Timer;
