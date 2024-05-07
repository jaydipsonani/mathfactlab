import React from "react";
import whiteBeadImg from "assets/images/beads/bead-white.svg";
import redBeadImg from "assets/images/beads/bead-red.svg";
import rod from "assets/images/rod.svg";

function BeadsAddition(props) {
  const { first_factor, second_factor, isShowHint } = props;
  const totalBeads = 20;
  const totalVisibleBeads = first_factor + second_factor;

  function renderNodeOfFirstFactor(number) {
    let node = null;
    const bgColor = (0 <= number && number <= 5) || (11 <= number && number <= 15) ? redBeadImg : whiteBeadImg;
    //add selected-pulse  after result for pulse animation
    const isShowResult = isShowHint ? "result" : "";

    if (number > totalVisibleBeads) {
      node = (
        <div className={`ellipse ellipse-hidden`} key={number}>
          {" "}
          <img src={bgColor} alt="" />
        </div>
      );
    } else if (isShowHint ? number === totalVisibleBeads : number === first_factor) {
      node = (
        <div className={`ellipse ${bgColor} mr ${isShowResult} `} key={number}>
          <img src={bgColor} alt="" />
        </div>
      );
    } else {
      node = (
        <div className={`ellipse ${bgColor} ${isShowResult} `} key={number}>
          {" "}
          <img src={bgColor} alt="" />
        </div>
      );
    }
    return node;
  }

  return (
    <div className="beads-addition-wrapper">
      <div className="line-wrapper">
        <div className="marker-line">
          {" "}
          <img src={rod} alt="rod" />
        </div>
        <div className="marker-wrapper">
          {[...Array(totalBeads).keys()].map(number => renderNodeOfFirstFactor(number + 1))}
        </div>
      </div>
    </div>
  );
}

export default BeadsAddition;
