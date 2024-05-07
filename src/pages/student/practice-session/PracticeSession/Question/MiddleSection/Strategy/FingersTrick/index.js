import React from "react";

import oneFactorFingerImage from "assets/images/finger/hand1.png";
import oneFactorFingerImageWitHint from "assets/images/finger/hand1-with-hint.png";
import twoFactorFingerImage from "assets/images/finger/hand2.png";
import twoFactorFingerImageWitHint from "assets/images/finger/hand2-with-hint.png";
import threeFactorFingerImage from "assets/images/finger/hand3.png";
import threeFactorFingerImageWitHint from "assets/images/finger/hand3-with-hint.png";
import fourFactorFingerImage from "assets/images/finger/hand4.png";
import fourFactorFingerImageWitHint from "assets/images/finger/hand4-with-hint.png";
import fifthFactorFingerImage from "assets/images/finger/hand5.png";
import fifthFactorFingerImageWitHint from "assets/images/finger/hand5-with-hint.png";
import sixFactorFingerImage from "assets/images/finger/hand6.png";
import sixFactorFingerImageWitHint from "assets/images/finger/hand6-with-hint.png";
import sevenFactorFingerImage from "assets/images/finger/hand7.png";
import sevenFactorFingerImageWitHint from "assets/images/finger/hand7-with-hint.png";
import eightFactorFingerImage from "assets/images/finger/hand8.png";
import eightFactorFingerImageWitHint from "assets/images/finger/hand8-with-hint.png";
import nineFactorFingerImage from "assets/images/finger/hand9.png";
import nineFactorFingerImageWitHint from "assets/images/finger/hand9-with-hint.png";
import tenFactorFingerImage from "assets/images/finger/hand10.png";
import tenFactorFingerImageWitHint from "assets/images/finger/hand10-with-hint.png";

function FingersTrick(props) {
  //practice question test page

  const { first_factor, isShowHint } = props;

  function fingersImgRenderer(image) {
    let imageSrc = null;
    switch (image) {
      case 1:
        return (imageSrc = isShowHint ? oneFactorFingerImageWitHint : oneFactorFingerImage);
      case 2:
        return (imageSrc = isShowHint ? twoFactorFingerImageWitHint : twoFactorFingerImage);
      case 3:
        return (imageSrc = isShowHint ? threeFactorFingerImageWitHint : threeFactorFingerImage);
      case 4:
        return (imageSrc = isShowHint ? fourFactorFingerImageWitHint : fourFactorFingerImage);
      case 5:
        return (imageSrc = isShowHint ? fifthFactorFingerImageWitHint : fifthFactorFingerImage);
      case 6:
        return (imageSrc = isShowHint ? sixFactorFingerImageWitHint : sixFactorFingerImage);
      case 7:
        return (imageSrc = isShowHint ? sevenFactorFingerImageWitHint : sevenFactorFingerImage);
      case 8:
        return (imageSrc = isShowHint ? eightFactorFingerImageWitHint : eightFactorFingerImage);
      case 9:
        return (imageSrc = isShowHint ? nineFactorFingerImageWitHint : nineFactorFingerImage);
      case 10:
        return (imageSrc = isShowHint ? tenFactorFingerImageWitHint : tenFactorFingerImage);

      default:
        imageSrc = oneFactorFingerImageWitHint;
    }
    return imageSrc;
  }
  return (
    <div className="finger-trick-wrapper">
      <div>
        <div className="finger-wrapper">
          <img src={fingersImgRenderer(first_factor)} alt="leftSideImgRender" className="finger-img"></img>
          {/* <img
            src={leftSideImgRender(first_factor)}
            alt="leftSideImgRender"
            className="finger-img"
          ></img>
          <img
            alt="rightSideImgRender"
            src={rightSideImgRender(first_factor)}
            className="finger-img"
          ></img> */}
        </div>
      </div>
    </div>
  );
}

export default FingersTrick;
