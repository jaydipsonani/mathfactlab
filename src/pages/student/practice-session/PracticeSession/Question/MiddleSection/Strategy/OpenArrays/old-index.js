import React from "react";
import { checkedObjList } from "config/const";
function OpenArrays(props) {
  //practice question test page

  const { first_factor, second_factor, isShowHint, checkedField } = props;
  let renderArray = [];

  (function () {
    let i = 0;
    while (i < first_factor * second_factor) {
      renderArray.push(i);
      i++;
    }
    return renderArray;
  })();

  function renderNodeOfFirstFactor(number) {
    let node = null;

    node = <div className="grid-item" key={number}></div>;

    return node;
  }

  return (
    <div className="open-arrays-wrapper">
      <div className="grid-wrapper">
        <div
          //classname based on second factor because as per second factor width will be decided

          className={`${
            isShowHint ? `grid-container-contain-${second_factor} grid-gap` : `grid-container-contain-${second_factor}`
          }`}
        >
          {renderArray.map(number => renderNodeOfFirstFactor(number + 1))}
        </div>
        <div className={second_factor === 1 ? "answer-text-sm" : "answer-text"}>{first_factor * second_factor}</div>
        <div className={second_factor === 1 ? "first-factor-sm" : "first-factor"}>
          {checkedField === checkedObjList[0] ? <span className="question-mark-text">?</span> : first_factor}
        </div>
        <div className={second_factor === 1 ? "second-factor-sm" : "second-factor"}>
          {checkedField === checkedObjList[1] ? <span className="question-mark-text">?</span> : second_factor}
        </div>
      </div>
    </div>
  );
}

export default OpenArrays;
