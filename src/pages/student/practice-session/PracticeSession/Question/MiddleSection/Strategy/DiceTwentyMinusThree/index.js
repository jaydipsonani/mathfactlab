import React from "react";
import _ from "lodash";
import cross from "assets/images/other/cross.svg";

const DiceTwentyMinusThree = props => {
  const { second_factor, hintClickedCount } = props;

  const secondFactor = second_factor;

  // base on minus count cross image element will be render
  return (
    <div className="dice-ten-minus-one-main-outer-stage-one">
      <div className="column">
        <div className="img-group">
          {_.range(1, 11).map(element => {
            return (
              <span className="img-wrapper" key={element}>
                <img
                  src={require(`assets/images/dice/dice${secondFactor}.svg`)}
                  alt={`Dice${secondFactor}Img`}
                  className="dice-img"
                />
              </span>
            );
          })}
        </div>
        <div className="img-group">
          {_.range(1, 11).map(element => {
            const showCrossOnElementCount = 7;
            return (
              <span className="img-wrapper" key={element}>
                <img
                  src={require(`assets/images/dice/dice${secondFactor}.svg`)}
                  alt={`Dice${secondFactor}Img`}
                  className="dice-img"
                />
                {element > showCrossOnElementCount ? (
                  <>
                    <img src={cross} alt="Dice1" className="dice-img cross-img" />
                  </>
                ) : (
                  ""
                )}
              </span>
            );
          })}
        </div>
        <div
          className={
            hintClickedCount === 1 || hintClickedCount === 2
              ? "textCenter hint-text-visible"
              : "textCenter hint-text-hidden"
          }
        >
          <h4>{hintClickedCount === 1 ? `(20 x ${secondFactor}) - (${secondFactor} x 3) ` : ""}</h4>
          <h4
            className={hintClickedCount === 2 ? "textCenter hint-text-fade-in active" : "textCenter hint-text-fade-in "}
          >
            {hintClickedCount === 2 ? `${20 * secondFactor} - ${secondFactor * 3} = ?` : ""}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DiceTwentyMinusThree;
