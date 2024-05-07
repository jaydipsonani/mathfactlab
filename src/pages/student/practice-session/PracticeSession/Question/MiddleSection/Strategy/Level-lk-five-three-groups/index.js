import React from "react";
import Dice1 from "assets/images/dice/dice1.svg";
import Dice2 from "assets/images/dice/dice2.svg";
import Dice3 from "assets/images/dice/dice3.svg";
import Dice4 from "assets/images/dice/dice4.svg";
import Dice5 from "assets/images/dice/dice5.svg";
import Dice6 from "assets/images/dice/dice6.svg";
import Dice7 from "assets/images/dice/dice7.svg";
import Dice8 from "assets/images/dice/dice8.svg";
import Dice9 from "assets/images/dice/dice9.svg";
import Dice10 from "assets/images/dice/dice10.svg";
import addition from "assets/images/math/addition.svg";

function LevelLKFiveThreeGropus(props) {
  //practice question test page

  const {
    // first_factor,
    second_factor,
    math_opration,
    isShowHint
  } = props;

  function imageRender(image) {
    let imageSrc = null;
    switch (image) {
      case 1:
        return (imageSrc = Dice1);
      case 2:
        return (imageSrc = Dice2);
      case 3:
        return (imageSrc = Dice3);
      case 4:
        return (imageSrc = Dice4);
      case 5:
        return (imageSrc = Dice5);
      case 6:
        return (imageSrc = Dice6);
      case 7:
        return (imageSrc = Dice7);
      case 8:
        return (imageSrc = Dice8);
      case 9:
        return (imageSrc = Dice9);
      case 10:
        return (imageSrc = Dice10);

      default:
    }
    return imageSrc;
  }
  function mathOprationImage(image) {
    let imageSrc = null;
    switch (image) {
      case 1:
        return (imageSrc = addition);
      case 2:
        return (imageSrc = Dice2);
      case 3:
        return (imageSrc = addition);
      case 4:
        return (imageSrc = Dice4);

      default:
    }
    return imageSrc;
  }
  // const firstFactor = first_factor;
  const secondFactor = second_factor;
  return (
    <div className="dice-five-three-group-wrapper">
      <div className="left-column">
        <div>
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img dice-visibility-hidden" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
        </div>
        <div>
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img dice-visibility-hidden " />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
        </div>
        <div>
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img dice-visibility-hidden" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
        </div>
        <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
          <h4>{isShowHint ? `5 x ${secondFactor} = ${5 * secondFactor}` : ""}</h4>
        </div>
      </div>
      <div className="middle-column">
        <span>
          {" "}
          <img src={mathOprationImage(math_opration)} alt="Dice1" className="opration-img" />
          <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
            <h4>{null}</h4>
          </div>
        </span>
      </div>
      <div className="right-column">
        <div>
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img " />
        </div>

        <div>
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />

          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
        </div>
        <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
          <h4>{isShowHint ? `3 x ${secondFactor} = ${3 * secondFactor}` : ""}</h4>
        </div>
      </div>
      {/* <div className="column">
        <div>
          <img
            src={imageRender(secondFactor)}
            alt="Dice1"
            className="dice-img"
          />
          <img
            src={imageRender(secondFactor)}
            alt="Dice1"
            className="dice-img"
          />
          <img
            src={imageRender(secondFactor)}
            alt="Dice1"
            className="dice-img"
          />
        </div>
        <div
          className={
            isShowHint
              ? "textCenter hint-text-visible"
              : "textCenter hint-text-hidden"
          }
        >
          <h4>
            {isShowHint ? `3 x ${secondFactor} = ${3 * secondFactor}` : ""}
          </h4>
        </div>
      </div> */}
    </div>
  );
}

export default LevelLKFiveThreeGropus;
