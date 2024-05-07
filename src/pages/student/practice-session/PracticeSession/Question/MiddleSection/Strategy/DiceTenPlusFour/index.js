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
import Dice11 from "assets/images/dice/dice11.svg";
import Dice12 from "assets/images/dice/dice12.svg";
import Dice13 from "assets/images/dice/dice13.svg";
import Dice14 from "assets/images/dice/dice14.svg";
import Dice15 from "assets/images/dice/dice15.svg";
import Dice16 from "assets/images/dice/dice16.svg";
import Dice17 from "assets/images/dice/dice17.svg";
import Dice18 from "assets/images/dice/dice18.svg";
import Dice19 from "assets/images/dice/dice19.svg";
import Dice20 from "assets/images/dice/dice20.svg";
import addition from "assets/images/math/addition.svg";

function DiceTenPlusFour(props) {
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
      case 11:
        return (imageSrc = Dice11);
      case 12:
        return (imageSrc = Dice12);
      case 13:
        return (imageSrc = Dice13);
      case 14:
        return (imageSrc = Dice14);
      case 15:
        return (imageSrc = Dice15);
      case 16:
        return (imageSrc = Dice16);
      case 17:
        return (imageSrc = Dice17);
      case 18:
        return (imageSrc = Dice18);
      case 19:
        return (imageSrc = Dice19);
      case 20:
        return (imageSrc = Dice20);

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
    <div className="dice-ten-plus-one-wrapper">
      <div className="left-column">
        <div>
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
        </div>
        <div>
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img " />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
          <img src={imageRender(secondFactor)} alt="Dice2" className="dice-img" />
        </div>
        <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
          <h4> {isShowHint ? `10 x ${secondFactor} = ${10 * secondFactor}` : ""}</h4>
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

      <div className="dice-five-two-group-wrapper">
        <div className="left-column">
          <div>
            <img src={imageRender(secondFactor)} alt="Dice1" className="dice-img" />
            <img src={imageRender(secondFactor)} alt="Dice1" className="dice-img" />
          </div>
          <div>
            <img src={imageRender(secondFactor)} alt="Dice1" className="dice-img" />
            <img src={imageRender(secondFactor)} alt="Dice1" className="dice-img" />
            <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
              <h4> {isShowHint ? `4 x ${secondFactor} = ${4 * secondFactor}` : ""}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiceTenPlusFour;
