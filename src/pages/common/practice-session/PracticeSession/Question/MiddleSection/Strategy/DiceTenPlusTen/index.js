import React from "react";

import addition from "assets/images/math/addition.svg";

const DiceTenPlusTen = props => {
  const {
    // first_factor,
    second_factor,
    math_opration,
    isShowHint
  } = props;

  const mathOperationImage = image => {
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
  };
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
    </div>
  );
};

export default DiceTenPlusTen;
