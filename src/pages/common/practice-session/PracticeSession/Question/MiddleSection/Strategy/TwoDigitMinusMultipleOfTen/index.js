import React from "react";
import _ from "lodash";

import arrowLeft from "assets/images/arrow/find-difference-arrow-left.png";

function TwoDigitMinusMultipleOfTen(props) {
  const { first_factor, second_factor, answer } = props;
  let endingPoint = 22;
  // let divideLengthFactor = Math.round(endingPoint / 10);

  // Take 21 bcz we have to start from 0 For example : 71-21 = 50 So stating point 50 and ending point 70
  let startingPoint = 1;

  function renderNode(number) {
    let node = null;

    node = (
      <div className={number === 7 || number === 13 ? "line-5th" : "line-5th line-5th-hidden"} key={number}>
        <div className="down-label">{number === 7 ? "?" : number === 13 ? first_factor : ""}</div>
      </div>
    );

    return node;
  }

  return (
    <div className="find-difference-wrapper">
      <div className="line-wrapper">
        <div className="marker-line"></div>
        <div className={"marker-wrapper-lg"}>
          {_.range(startingPoint, endingPoint).map(number => renderNode(number))}
        </div>
        <div className={"marker-wrapper-lg"}>
          {[1].map(number => {
            return (
              <div
                key={number}
                style={{
                  width: "100%",
                  marginLeft: `${((7 - startingPoint) / 20) * 100}%`,
                  position: "relative",
                  marginRight: `${((endingPoint - 13 - 1) / 20) * 100}%`
                }}
              >
                <div
                  className={
                    answer > 3
                      ? "hint-half-circle-arch-arrow visible"
                      : answer > 1
                        ? "hint-half-circle-arch-arrow md visible"
                        : "hint-half-circle-arch-arrow sm visible"
                  }
                >
                  <img src={arrowLeft} alt="bracketBottom" />
                  <div
                    className={
                      answer > 3
                        ? "hint-arch-text visible"
                        : answer > 1
                          ? "hint-arch-text md visible"
                          : "hint-arch-text sm visible"
                    }
                  >
                    - {second_factor}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TwoDigitMinusMultipleOfTen;
