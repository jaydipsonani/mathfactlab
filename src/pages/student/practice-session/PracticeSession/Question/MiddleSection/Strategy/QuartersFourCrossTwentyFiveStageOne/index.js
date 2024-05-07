import React from "react";
import chunk from "lodash/chunk";
import coin from "assets/images/coin.svg";
function QuartersFourCrossTwentyFiveStageOne(props) {
  const { first_factor, hintClickedCount } = props;
  const nodeArray = chunk(Array.apply(null, { length: first_factor }), 4);
  return (
    <div className="quarters-four-cross-twenty-five">
      <div className="coin-wrapper">
        {nodeArray.map((array, i) => {
          return (
            <div
              className={`outside-border-quater ${
                hintClickedCount && array.length === 4 ? "outside-border-quater-visible" : ""
              }`}
              key={Math.random()}
            >
              {array.map(el => {
                return (
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    key={el}
                  >
                    <img src={coin} alt="25" className="coin-img" key={i}></img>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default QuartersFourCrossTwentyFiveStageOne;
