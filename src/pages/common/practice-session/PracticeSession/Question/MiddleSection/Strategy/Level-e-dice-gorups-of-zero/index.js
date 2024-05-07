import React from "react";
import Dice0 from "assets/images/dice/dice0.svg";

function LevelEDiceGorupsOfZero(props) {
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
          <div className="dice-groups-of-zero-one">
            <img src={Dice0} alt="Dice2" className="dice-img" />
          </div>
        );
      case 2:
        return (
          <div className="dice-groups-of-zero-two">
            <img src={Dice0} alt="Dice2" className="dice-img" />
            <img src={Dice0} alt="Dice2" className="dice-img" />
          </div>
        );
      case 3:
        return (
          <div className="dice-groups-of-zero-three">
            <img src={Dice0} alt="Dice2" className="dice-img" />
            <img src={Dice0} alt="Dice2" className="dice-img" />
            <img src={Dice0} alt="Dice2" className="dice-img" />
          </div>
        );
      case 4:
        return (
          <div className="dice-groups-of-zero-four">
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="dice-groups-of-zero-five">
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img dice-visibility-hidden" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img dice-visibility-hidden " />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img dice-visibility-hidden" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="dice-groups-of-zero-six">
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="dice-groups-of-zero-seven">
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img dice-visibility-hidden" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img " />
              <img src={Dice0} alt="Dice2" className="dice-img " />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img dice-visibility-hidden" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 8:
        return (
          <div className="dice-groups-of-zero-eight">
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>

            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 9:
        return (
          <div className="dice-groups-of-zero-nine">
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>

            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 10:
        return (
          <div className="dice-groups-of-zero-ten">
            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>

            <div>
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
              <img src={Dice0} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );

      default:
    }
    return imageSrc;
  }

  const firstFactor = first_factor;
  return (
    <div className="dice-groups-of-zero-main-outer">
      <div className="dice-groups-of-zero-main-inner">{imageRender(firstFactor)}</div>
    </div>
  );
}

export default LevelEDiceGorupsOfZero;
