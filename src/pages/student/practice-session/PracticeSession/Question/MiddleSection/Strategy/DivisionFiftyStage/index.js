import React from "react";

import { mathOperationSymbol } from "config/const";

const DivisionFiftyStage = props => {
  const { second_factor, hintClickedCount, math_opration } = props;

  return (
    <div className="fifty-groups-stage-1-wrapper">
      <span className="count-text">
        <span className="font-150">
          <div>
            {`${100} 
          ${mathOperationSymbol[math_opration]}
         ${second_factor}`}

            <div className={hintClickedCount ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
              <h4>{hintClickedCount ? `100 x ${second_factor} = ${100 * second_factor}` : ""}</h4>
            </div>
          </div>
        </span>
      </span>
      <span className="count-text">
        <span className="font-150">
          {`${mathOperationSymbol[4]} ${2}`}

          <div className={hintClickedCount ? "textCenter hint-text-visible" : "textCenter hint-text-hidden"}>
            <h4>{""}</h4>
          </div>
        </span>
      </span>
    </div>
  );
};

export default DivisionFiftyStage;
