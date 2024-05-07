import React from "react";
import _ from "lodash";

function FillInTheBlanks(props) {
  //practice question test page

  const { first_factor, second_factor, isShowHint } = props;

  let dotLength =
    first_factor >= 11 && second_factor >= 11 ? Math.ceil(first_factor * second_factor) + 1 : second_factor * 10 + 1;

  function renderNode(number) {
    let node = null;

    const modulo10 = number % 10;
    const remainder = number % second_factor;
    const answer = first_factor * second_factor;

    if (modulo10 === 0) {
      node = (
        <div className={isShowHint ? "line-10th" : "line-10th line-10th-hidden"} key={number}>
          {remainder === 0 && <div className={answer === number ? "selected selected-pulse" : "selected"}></div>}
        </div>
      );
    } else if (modulo10 === 5) {
      node = (
        <div className={isShowHint ? "line-5th" : "line-5th line-5th-hidden"} key={number}>
          {remainder === 0 && <div className={answer === number ? "selected selected-pulse" : "selected"}></div>}
        </div>
      );
    } else if (remainder === 0) {
      node = (
        <div className={isShowHint ? "dot" : "dot dot-hidden"} key={number}>
          <div className={answer === number ? "selected selected-pulse" : "selected"}></div>
        </div>
      );
    } else {
      node = <div className={isShowHint ? "dot " : "dot visiblity-hidden"} key={number}></div>;
    }
    return node;
  }

  function renderDownLabel(number) {
    let node = null;

    const modulo10 = number % 10;
    const remainder = number % second_factor;
    const answer = first_factor * second_factor;

    if (modulo10 === 0) {
      node = (
        <div className={"label-line-10th "} key={number}>
          <div className="down-label">{answer === number ? "?" : remainder === 0 ? number : ""}</div>
        </div>
      );
    } else if (modulo10 === 5) {
      node = (
        <div className={"label-line-5th"} key={number}>
          <div className="down-label">{answer === number ? "?" : remainder === 0 ? number : ""}</div>
        </div>
      );
    } else if (remainder === 0) {
      node = (
        <div className="label-dot" key={number}>
          <div className="down-label">{answer === number ? "?" : number}</div>
        </div>
      );
    } else {
      node = <div className={isShowHint ? "dot " : "dot visiblity-hidden"} key={number}></div>;
    }
    return node;
  }
  return (
    <div className="fill-in-the-blank-wrapper">
      <div className="line-wrapper">
        <div className="marker-line"></div>
        <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
          {_.range(0, dotLength).map(number => renderNode(number))}
        </div>

        {/*  Render down label */}
        <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
          {_.range(0, dotLength).map(number => renderDownLabel(number))}
        </div>
      </div>
    </div>
  );
}

export default FillInTheBlanks;
