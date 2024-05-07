import React from "react";
import Dice0 from "assets/images/dice/dice0.svg";
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
import disabled from "assets/images/other/disabled.svg";
function LevelEDiceZeroGroups(props) {
  //practice question test page

  const {
    // first_factor,
    second_factor
    // math_opration,
  } = props;

  function imageRender(image) {
    let imageSrc = null;
    switch (image) {
      case 0:
        return (imageSrc = Dice0);
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

  // const firstFactor = first_factor;
  const secondFactor = second_factor;
  return (
    <div className="dice-zero-groups-main-outer-wrapper">
      <div className="column">
        <img src={imageRender(secondFactor)} alt="Dice1" className="dice-img" />
        <img src={disabled} alt="Dice1" className="disabled-img" />
      </div>
    </div>
  );
}

export default LevelEDiceZeroGroups;
