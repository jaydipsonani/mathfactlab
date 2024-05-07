import React from "react";
import redArrowImg from "assets/images/red-arrow.svg";
const TenOnPlaceValueChart = props => {
  const { first_factor, isShowHint, second_factor } = props;
  let uniqueFactor = first_factor === 10 ? second_factor : first_factor;
  const renderFirstShiftingElement = factor => {
    if (factor >= 10 && factor < 20) {
      return factor - 10;
    } else if (factor === 20) {
      return 0;
    } else {
      return factor;
    }
  };
  const renderSecondShiftingElement = factor => {
    if (factor >= 10 && factor < 20) {
      return 1;
    } else if (factor === 20) {
      return 2;
    } else {
      return;
    }
  };
  return (
    <div className="ten-on-place-value-chart" key={uniqueFactor}>
      <div className="table-box">
        <div className="table-box-header">
          <div className="table-box-row">100s</div>
          <div className="table-box-row">10s</div>
          <div className="table-box-row">1s</div>
        </div>
        <div className="table-box-body">
          <div className="table-box-row"></div>
          <div className="table-box-row">
            {renderSecondShiftingElement(uniqueFactor)}
            <img
              src={redArrowImg}
              alt="Arrow"
              className={
                // isShowHint && renderSecondShiftingElement(uniqueFactor)
                renderSecondShiftingElement(uniqueFactor) ? "boxed-arrow visible" : "boxed-arrow "
              }
            />
          </div>
          <div className="table-box-row">
            {renderFirstShiftingElement(uniqueFactor)}
            <img
              src={redArrowImg}
              alt="Arrow"
              // className={isShowHint ? "boxed-arrow visible" : "boxed-arrow "}
              className={"boxed-arrow visible"}
            />
          </div>
        </div>
        <div className="table-box-body">
          <div className="table-box-row">
            <div className={isShowHint ? "hint-show-visible fadeIn-animation" : "hint-show-hidden"}>
              {renderSecondShiftingElement(uniqueFactor)}
            </div>
          </div>
          <div className="table-box-row">
            <div className={isShowHint ? "hint-show-visible " : "hint-show-hidden"}>
              {renderFirstShiftingElement(uniqueFactor)}
            </div>{" "}
          </div>
          <div className="table-box-row">
            <div className={isShowHint ? "hint-show-visible " : "hint-show-hidden"}>0</div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TenOnPlaceValueChart;
