import React from "react";
import landmarkImg from "assets/images/landmark.svg";

function NumberLinesDivision(props) {
  //practice question test page

  const { second_factor, isShowHint, hintClickedCount } = props;

  let renderArray = [];
  (function () {
    let i = 0;
    while (i <= second_factor * 10) {
      renderArray.push(i);
      i++;
    }
    return renderArray;
  })();

  function renderNode(number) {
    let node = null;

    const modulo10 = number % 10;
    const remainder = number % second_factor;

    if (modulo10 === 0) {
      node = (
        <>
          <div
            className={
              isShowHint && (number === 0 || number === second_factor * 10 || number === (second_factor * 10) / 2)
                ? "line-10th "
                : "line-10th line-10th-hidden"
            }
            key={number}
          >
            {remainder === 0 && (
              <>
                <div className="selected"></div>
              </>
            )}
            <div
              className={
                number === 0 || number === second_factor * 10 || hintClickedCount === 1 || hintClickedCount === 2
                  ? "down-label"
                  : "down-label visiblity-hidden"
              }
            >
              {remainder === 0 ? number : ""}
            </div>
            {/* <div
              className={
                number === 0 ||
                number === second_factor * 10 ||
                hintClickedCount === 1 ||
                hintClickedCount === 2
                  ? "down-label"
                  : "down-label visiblity-hidden"
              }
            >
              {number}
            </div> */}
          </div>
        </>
      );
    } else if (modulo10 === 5) {
      node = (
        <>
          <div className={isShowHint ? "line-5th line-5th-hidden" : "line-5th line-5th-hidden"} key={number}>
            {remainder === 0 && (
              <>
                <div className="selected"></div>
              </>
            )}
            <div
              className={
                hintClickedCount === 1 || hintClickedCount === 2 ? "down-label" : "down-label visiblity-hidden"
              }
            >
              {remainder === 0 ? number : ""}
            </div>
          </div>
        </>
      );
    } else if (remainder === 0) {
      node = (
        <>
          {/* dot hidden class added for not show inner dot  */}
          <div className={isShowHint ? "dot " : "dot dot-hidden"} key={number}>
            <div className="selected"></div>
            <div
              className={
                hintClickedCount === 1 || hintClickedCount === 2 ? "down-label" : "down-label visiblity-hidden"
              }
            >
              {remainder === 0 ? number : ""}
            </div>
          </div>
        </>
      );
    } else {
      node = (
        <div
          // className={isShowHint ? "dot  dot-hidden" : "dot visiblity-hidden"}
          key={number}
        ></div>
      );
    }
    return node;
  }
  function renderLandMarkNode(number) {
    let node = null;

    const modulo10 = number % 10;
    const remainder = number % second_factor;

    if (modulo10 === 0) {
      node = (
        <>
          <div className={"line-5th line-5th-hidden"} key={number}>
            {remainder === 0 && (
              <>
                <div
                  className={
                    number === 0 ||
                    number === second_factor * 10 ||
                    number === Math.floor((second_factor * 10) / 2) ||
                    hintClickedCount === 2
                      ? "landmarks "
                      : "landmarks visiblity-hidden"
                  }
                >
                  <img src={landmarkImg} alt="landmarkImg" />
                </div>

                <div
                  className={
                    number === 0 ||
                    number === second_factor * 10 ||
                    number === Math.floor((second_factor * 10) / 2) ||
                    hintClickedCount === 2
                      ? "landmark-text"
                      : "landmark-text visiblity-hidden"
                  }
                >
                  {number / second_factor} x {second_factor}
                </div>
              </>
            )}
          </div>
        </>
      );
    } else if (modulo10 === 5) {
      node = (
        <>
          <div className={"line-5th line-5th-hidden"} key={number}>
            {remainder === 0 && (
              <>
                <div
                  className={
                    number === 0 ||
                    number === second_factor * 10 ||
                    number === Math.floor((second_factor * 10) / 2) ||
                    hintClickedCount === 2
                      ? "landmarks"
                      : "landmarks visiblity-hidden"
                  }
                >
                  <img src={landmarkImg} alt="landmarkImg" />
                </div>
                <div
                  className={
                    number === 0 ||
                    number === second_factor * 10 ||
                    number === Math.floor((second_factor * 10) / 2) ||
                    hintClickedCount === 2
                      ? "landmark-text"
                      : "landmark-text visiblity-hidden"
                  }
                >
                  {number / second_factor} x {second_factor}
                </div>
              </>
            )}
          </div>
        </>
      );
    } else if (remainder === 0) {
      node = (
        <>
          <div className={"line-5th line-5th-hidden"} key={number}>
            <div
              className={
                isShowHint && hintClickedCount === 1
                  ? number === 0 || number === second_factor * 10 || number === Math.floor((second_factor * 10) / 2)
                    ? "landmarks"
                    : "landmarks visiblity-hidden"
                  : hintClickedCount === 2
                    ? "landmarks"
                    : "landmarks visiblity-hidden"
              }
              style={{ marginTop: "18px" }}
            >
              <img src={landmarkImg} alt="landmarkImg" />
            </div>
            <div
              className={
                isShowHint && hintClickedCount === 1
                  ? number === 0 || number === second_factor * 10 || number === Math.floor((second_factor * 10) / 2)
                    ? "landmark-text"
                    : "landmark-text visiblity-hidden"
                  : hintClickedCount === 2
                    ? "landmark-text"
                    : "landmark-text visiblity-hidden"
              }
            >
              {number / second_factor} x {second_factor}
            </div>
          </div>
        </>
      );
    } else {
      node = <div className={"dot visiblity-hidden"} key={number}></div>;
    }
    return node;
  }
  return (
    <div className="number-lines-division-wrapper">
      <div className="line-wrapper">
        <div className="marker-line"></div>
        <div className={second_factor > 6 ? "marker-wrapper-lg" : "marker-wrapper-lg"}>
          {renderArray.map(number => renderNode(number))}
        </div>
        <div className={second_factor > 6 ? "marker-wrapper-lg" : "marker-wrapper-lg"}>
          {renderArray.map(number => renderLandMarkNode(number))}
        </div>
      </div>
    </div>
  );
}

export default NumberLinesDivision;
