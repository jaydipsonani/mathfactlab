import React from "react";
import { checkedObjList } from "config/const";
import arrowTopHintImg from "assets/images/arrow/nine-pattern-arrow-hint-top.png";
import arrowBottomHIntImg from "assets/images/arrow/nine-pattern-arrow-hint-bottom.png";

function NinePatterns(props) {
  //practice question test page
  const { second_factor, checkedField, answer, hintClickedCount } = props;

  const renderFirstColumn = number => {
    let multiplyNumber = number * second_factor;
    let tensDigit = multiplyNumber >= 10 ? +(multiplyNumber + "").slice(0, 1) : 0;

    let onesDigit = multiplyNumber < 10 ? multiplyNumber : +(multiplyNumber + "").slice(-1);

    return (
      <div className="circle-wrapper" key={Math.random()}>
        <div className="first-col" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "60%" }}>{`${number} x ${second_factor}`}</div>
          <div>=</div>
        </div>
        <div className="second-col" style={{ position: "relative" }}>
          {number * second_factor === +answer && checkedField === checkedObjList[3] ? (
            <div className="blank-text"></div>
          ) : (
            tensDigit
          )}
          {number === 1 && (
            <div className={hintClickedCount ? "hint-bottom-arrow visible" : "hint-bottom-arrow "}>
              <img src={arrowBottomHIntImg} alt="arrowBottomHIntImg"></img>
            </div>
          )}
        </div>
        <div className="third-col" style={{ position: "relative" }}>
          {number * second_factor === +answer && checkedField === checkedObjList[4] ? (
            <div className="blank-text"></div>
          ) : (
            onesDigit
          )}
          {number === 1 && (
            <div className={hintClickedCount ? "hint-top-arrow visible" : "hint-top-arrow"}>
              <img src={arrowTopHintImg} alt="arrowTopHintImg"></img>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="nine-frames-main-outer-wrapper">
      <div className="grid-container">
        <div className="circle-wrapper">
          <div className="first-col"></div>
          <div className="second-col">10 s</div>
          <div className="third-col">1 s</div>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => renderFirstColumn(number))}
      </div>
    </div>
  );
}

export default NinePatterns;
