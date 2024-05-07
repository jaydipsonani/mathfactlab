import React from "react";

import addition from "assets/images/math/addition.svg";

const DiceTenPlusOne = props => {
  const { second_factor, math_opration, isShowHint } = props;

  function mathOperationImage(image) {
    let imageSrc = null;
    switch (image) {
      case 1:
        return (imageSrc = addition);
      case 2:
        return (imageSrc = addition);
      case 3:
        return (imageSrc = addition);
      case 4:
        return (imageSrc = addition);

      default:
    }
    return imageSrc;
  }
  const secondFactor = second_factor;
  return (
    <div className="dice-ten-plus-one-wrapper">
      <div className="left-column">
        <div>
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
        </div>
        <div>
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img "
          />
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
        </div>
        <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
          <h4> {isShowHint ? `10 x ${secondFactor} = ${10 * secondFactor}` : ""}</h4>
        </div>
      </div>

      <div className="middle-column">
        <span>
          {" "}
          <img src={mathOperationImage(math_opration)} alt="Dice1" className="opration-img" />
          <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
            <h4>{null}</h4>
          </div>
        </span>
      </div>

      <div className="dice-one-group">
        <div>
          <img
            src={require(`assets/images/dice/dice${secondFactor}.svg`)}
            alt={`Dice${secondFactor}Img`}
            className="dice-img"
          />
        </div>

        <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
          <h4> {isShowHint ? `1 x ${secondFactor} = ${1 * secondFactor}` : ""}</h4>
        </div>
      </div>
    </div>
  );
};

export default DiceTenPlusOne;
