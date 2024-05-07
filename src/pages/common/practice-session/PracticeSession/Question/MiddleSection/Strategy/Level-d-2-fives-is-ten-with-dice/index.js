import React from "react";
import Dice5 from "assets/images/dice/dice5.svg";

function LeveD2FivesIsTenWithDice(props) {
  //practice question test page

  const {
    first_factor,
    // second_factor,
    isShowHint
  } = props;
  function imageRender(image) {
    let imageSrc = null;
    switch (image) {
      case 1:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-one">
            <img src={Dice5} alt="Dice2" className="dice-img" />
          </div>
        );
      case 2:
        return (
          <div
            className={`level-d-2-fives-is-ten-with-dice-two outside-border ${
              isShowHint ? "outside-border-visible" : ""
            }`}
          >
            <img src={Dice5} alt="Dice2" className="dice-img" />
            <img src={Dice5} alt="Dice2" className="dice-img" />
          </div>
        );
      case 3:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-three">
            <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
              <img src={Dice5} alt="Dice2" className="dice-img" />
              <img src={Dice5} alt="Dice2" className="dice-img" />
            </div>
            <div>
              <img src={Dice5} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-four">
            <div className={`top-row outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
              <img src={Dice5} alt="Dice2" className="dice-img" />
              <img src={Dice5} alt="Dice2" className="dice-img" />
            </div>

            <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
              <img src={Dice5} alt="Dice2" className="dice-img" />
              <img src={Dice5} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-five">
            <div className="dice-left-section">
              <div className={`top-row outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>

            <div>
              <img src={Dice5} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-six">
            <div className="dice-left-section">
              <div className={`outside-border dice-wrapper-margin ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>

            <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
              <img src={Dice5} alt="Dice2" className="dice-img" />
              <img src={Dice5} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-seven">
            <div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>

            <div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div>
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-eight">
            <div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>

            <div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-nine">
            <div className="dice-left-section">
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>
            <div className="dice-left-section">
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>
            <div>
              <img src={Dice5} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );
      case 10:
        return (
          <div className="level-d-2-fives-is-ten-with-dice-ten">
            <div className="dice-left-section">
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>
            <div className="dice-left-section">
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
              <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
                <img src={Dice5} alt="Dice2" className="dice-img" />
                <img src={Dice5} alt="Dice2" className="dice-img" />
              </div>
            </div>
            <div className={`outside-border ${isShowHint ? "outside-border-visible" : ""}`}>
              <img src={Dice5} alt="Dice2" className="dice-img" />
              <img src={Dice5} alt="Dice2" className="dice-img" />
            </div>
          </div>
        );

      default:
    }
    return imageSrc;
  }

  // const secondFactor = second_factor;
  const firstFactor = first_factor;
  return (
    <div className="level-d-2-fives-is-ten-with-dice-main-outer">
      <div className="level-d-2-fives-is-ten-with-dice-main-inner">{imageRender(firstFactor)}</div>
    </div>
  );
}

export default LeveD2FivesIsTenWithDice;
