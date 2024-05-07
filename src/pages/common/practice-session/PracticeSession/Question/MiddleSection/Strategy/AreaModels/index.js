import React from "react";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";

function AreaModels(props) {
  //practice question test page

  const { first_factor, second_factor } = props;

  const isSameFactor = first_factor === second_factor;

  let boxSize = 32;
  const isBigScreen = useMediaQuery({ query: "(max-width: 1680)" });
  const isSemiMediumScreen = useMediaQuery({ query: "(max-width: 1440px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1366px)" });
  const isTabletScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  if (isBigScreen) {
    boxSize = 32;
  }
  if (isSemiMediumScreen) {
    boxSize = 30;
  }
  if (isMediumScreen) {
    boxSize = 26;
  }
  if (isTabletScreen) {
    boxSize = 30;
  }

  return (
    <div className="area-models-main-outer-wrapper">
      <div
        style={{
          width: `${boxSize * second_factor}px`,
          height: `${boxSize * first_factor}px`,
          marginRight: !isSameFactor ? "300px" : "0px"
        }}
        className="box-flex-wrapper"
      >
        <div className="vertical-wrapper">
          {_.range(1, second_factor).map((vertical, i) => {
            return <div key={i} className="vertical-line"></div>;
          })}
        </div>

        <div className="horizontal-wrapper">
          {_.range(1, first_factor).map((vertical, i) => {
            return <div key={i} className="horizontal-line"></div>;
          })}
        </div>

        <div className={second_factor === 1 ? "answer-text-sm" : "answer-text"}>?</div>
        <div className="first-factor">{first_factor}</div>
        <div className="second-factor">{second_factor}</div>
      </div>

      {!isSameFactor && (
        <div
          style={{
            width: `${boxSize * first_factor}px`,
            height: `${boxSize * second_factor}px`
          }}
          className="box-flex-wrapper"
        >
          <div className="vertical-wrapper">
            {_.range(1, first_factor).map((vertical, i) => {
              return <div key={i} className="vertical-line"></div>;
            })}
          </div>

          <div className="horizontal-wrapper">
            {_.range(1, second_factor).map((vertical, i) => {
              return <div key={i} className="horizontal-line"></div>;
            })}
          </div>

          <div className={second_factor === 1 ? "answer-text-sm" : "answer-text"}>?</div>
          <div className="first-factor">{second_factor}</div>
          <div className="second-factor">{first_factor}</div>
        </div>
      )}
    </div>
  );
}

export default AreaModels;
