import React from "react";
import _ from "lodash";

const ClockFaces = props => {
  const { first_factor } = props;

  return (
    <div className="clock-faces-wrapper">
      <div className="clock-img-wrapper">
        {_.range(1, 11).map(element => {
          return (
            <img
              key={element}
              src={require(`assets/images/clock-face/clock-${element}.svg`)}
              style={{ display: first_factor === element ? "block" : "none" }}
              alt="leftSideImgRender"
              className="finger-img"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClockFaces;
