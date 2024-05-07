import React from "react";
import addition from "assets/images/math/addition.svg";

const LevelADoublesWithDice = props => {
  const { second_factor, math_opration, isShowHint } = props;

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
    <div className="doubles-with-dice-main-outer">
      <div className="dice-one-group">
        <img
          src={require(`assets/images/dice/dice${secondFactor}.svg`)}
          alt={`Dice${secondFactor}Img`}
          className="dice-img"
        />
        <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
          <h4>{isShowHint ? secondFactor : ""}</h4>
        </div>
      </div>
      <span>
        {" "}
        <img src={mathOperationImage(math_opration)} alt="Dice1" className="opration-img" />
        <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
          <h4>{null}</h4>
        </div>
      </span>
      <div
        className="textCenter hint-text"
        style={{
          display: isShowHint ? "flex" : "none"
        }}
      ></div>
      <div className="dice-one-group">
        <img
          src={require(`assets/images/dice/dice${secondFactor}.svg`)}
          alt={`Dice${secondFactor}Img`}
          className="dice-img"
        />
        <div className={isShowHint ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
          <h4>{isShowHint ? secondFactor : ""}</h4>
        </div>
      </div>
    </div>
  );
};

export default LevelADoublesWithDice;
