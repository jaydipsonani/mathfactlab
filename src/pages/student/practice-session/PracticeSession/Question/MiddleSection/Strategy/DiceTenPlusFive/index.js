import React from "react";

import addition from "assets/images/math/addition.svg";

const DiceTenPlusFive = props => {
  const { first_factor, second_factor, math_opration, isShowHint } = props;
  const uniqueFactor = first_factor === 15 ? second_factor : first_factor;

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
  // const firstFactor = first_factor;
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

      <div className="dice-five-two-group-wrapper">
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
              className="dice-img dice-visibility-hidden"
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
              className="dice-img dice-visibility-hidden"
            />
            <img
              src={require(`assets/images/dice/dice${secondFactor}.svg`)}
              alt={`Dice${secondFactor}Img`}
              className="dice-img"
            />
            <img
              src={require(`assets/images/dice/dice${secondFactor}.svg`)}
              alt={`Dice${secondFactor}Img`}
              className="dice-img dice-visibility-hidden"
            />
          </div>
          <div>
            <img
              src={require(`assets/images/dice/dice${secondFactor}.svg`)}
              alt={`Dice${secondFactor}Img`}
              className="dice-img"
            />
            <img
              src={require(`assets/images/dice/dice${secondFactor}.svg`)}
              alt={`Dice${secondFactor}Img`}
              className="dice-img dice-visibility-hidden"
            />
            <img
              src={require(`assets/images/dice/dice${secondFactor}.svg`)}
              alt={`Dice${secondFactor}Img`}
              className="dice-img"
            />
          </div>
          <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
            <h4> {isShowHint ? `5 x ${uniqueFactor} = ${5 * uniqueFactor}` : ""}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceTenPlusFive;
