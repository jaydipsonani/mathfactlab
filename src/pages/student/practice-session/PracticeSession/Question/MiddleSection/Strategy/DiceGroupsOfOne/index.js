import React from "react";
import Dice1 from "assets/images/dice/dice1.svg";

function DiceOneGroup(props) {
  //practice question test page

  const {
    first_factor
    // second_factor,
  } = props;

  function imageRender(image) {
    let imageSrc = null;
    switch (image) {
      case 1:
        return (
          <div className="dice-one-group">
            <img src={Dice1} alt="Dice2" className="dice-img" />
          </div>
        );
      case 2:
        return (
          <div className="dice-two-group">
            <img src={Dice1} alt="Dice2" className="dice-img" />
            <img src={Dice1} alt="Dice2" className="dice-img" />
          </div>
        );
      case 3:
        return (
          <div className="dice-three-group">
            <img src={Dice1} alt="Dice2" className="dice-img" />
            <img src={Dice1} alt="Dice2" className="dice-img" />
            <img src={Dice1} alt="Dice2" className="dice-img" />
          </div>
        );
      case 4:
        return (
          <div className="dice-four-group">
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="dice-five-group">
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img dice-visibility-hidden" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img dice-visibility-hidden " />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img dice-visibility-hidden" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="dice-six-group">
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="dice-seven-group">
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img dice-visibility-hidden" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img " />
              <img src={Dice1} alt="Dice2" className="dice-img " />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img dice-visibility-hidden" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 8:
        return (
          <div className="dice-eight-group">
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 9:
        return (
          <div className="dice-nine-group">
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>

            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 10:
        return (
          <div className="dice-ten-group">
            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>

            <div>
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
              <img src={Dice1} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );

      default:
    }
    return imageSrc;
  }

  const firstFactor = first_factor;
  return (
    <div className="dice-groups-of-one-main-outer">
      <div className="dice-groups-of-one-main-inner">{imageRender(firstFactor)}</div>
    </div>
  );
}

export default DiceOneGroup;
