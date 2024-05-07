import React from "react";
import { checkedObjList } from "config/const";

function LevelKDoubleFoursIsEightWithDice(props) {
  //practice question test page
  const { first_factor, second_factor, isShowHint, checkedField } = props;
  let renderArray = [];

  (function () {
    let i = 0;
    while (i <= 2 * 10) {
      renderArray.push(i);
      i++;
    }
    return renderArray;
  })();

  function renderNode(number) {
    let node = null;

    const remainder = number / 5;

    if (remainder % 2 === 0) {
      node = (
        <div className="line-10th" key={number}>
          <div className="down-label">{number}</div>
        </div>
      );
    } else if (remainder % 2 === 1) {
      node = (
        <div className={isShowHint ? "line-5th" : "line-5th visiblity-hidden"} key={number}>
          {" "}
          <div className="down-label">{isShowHint ? number : ""}</div>
        </div>
      );
    } else {
      node = <div className={isShowHint ? "dot " : "dot visiblity-hidden"} key={number}></div>;
    }
    return node;
  }

  return (
    <div className="double-bar-diagram-wrapper">
      <div className="line-wrapper">
        <div className="marker-wrapper-bar">
          <div
            className={
              first_factor > second_factor ? "bottom-bar yellow-width left-bar" : "bottom-bar yellow-width left-bar"
            }
            style={{ width: `${first_factor * 5}%` }}
          >
            {checkedObjList[0] === checkedField ? "?" : first_factor}
          </div>
          <div
            className={
              first_factor > second_factor ? "bottom-bar purple-width right-bar" : "bottom-bar purple-width right-bar"
            }
            style={{ width: `${second_factor * 5}%` }}
          >
            {checkedObjList[1] === checkedField ? "?" : second_factor}
          </div>
        </div>
        <div className="marker-wrapper-bar-answer">
          <div className="bottom-bar " style={{ width: `${(first_factor + second_factor) * 5}%` }}>
            {checkedObjList[2] === checkedField ? "?" : first_factor + second_factor}
          </div>
        </div>
        <div className="marker-line-wrapper">
          <div className="marker-line"></div>

          <div className={"marker-wrapper"}>{renderArray.map(number => renderNode(number))}</div>
        </div>
      </div>
    </div>
  );
}

export default LevelKDoubleFoursIsEightWithDice;
