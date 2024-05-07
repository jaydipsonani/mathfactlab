import React from "react";
import _ from "lodash";
import bracketBottom from "assets/images/curly/find-difference-curly-brace-bottom.svg";

import arrow4 from "assets/images/arrow/find-difference-arrow.png";

function FindDifference(props) {
  //practice question test page
  const {
    first_factor,
    second_factor,

    hintClickedCount,
    strategyDetails,
    answer
  } = props;
  let endingPoint = first_factor > 20 ? Math.ceil(first_factor / 10) * 10 + 1 : 2 * 10 + 1;
  let middlePoint = Math.ceil(second_factor / 10) * 10;
  // let divideLengthFactor = Math.round(endingPoint / 10);

  // Take 21 bcz we have to start from 0 For example : 71-21 = 50 So stating point 50 and ending point 70
  let totalDifferencePoint = 21;
  let startingPoint = endingPoint - totalDifferencePoint;

  let hintCountByQuestion = second_factor < middlePoint && first_factor > middlePoint ? 2 : 1;
  function renderNode(number) {
    let node = null;
    const modulo10 = number % 10;
    const remainder = number % 10;

    if (modulo10 === 0) {
      node = (
        <div
          // className={isShowHint ? "line-10th" : "line-10th line-10th-hidden"}
          className={hintClickedCount === hintCountByQuestion ? "line-10th" : "line-10th "}
          key={number}
        >
          {remainder === 0 && <div className="selected"></div>}
        </div>
      );
    } else if (modulo10 === 5) {
      node = (
        // className={isShowHint ? "line-5th" : "line-5th line-5th-hidden"}
        <div
          className={
            first_factor === number || second_factor === number || hintClickedCount === hintCountByQuestion
              ? "line-5th"
              : "line-5th line-5th-hidden"
          }
          key={number}
        >
          {/* <div className={isShowHint ? "line-5th" : "line-5th "} key={number}> */}
          {remainder === 0 && <div className="selected"></div>}
        </div>
      );
    } else {
      node = (
        // className={isShowHint ? "dot " : "dot visiblity-hidden"}
        <div
          className={
            first_factor === number || second_factor === number || hintClickedCount === hintCountByQuestion
              ? "dot"
              : "dot visiblity-hidden"
          }
          key={number}
        ></div>
      );
    }
    return node;
  }

  function renderDownLabel(number) {
    let node = null;
    const modulo10 = number % 10;
    const remainder = number % 10;

    if (modulo10 === 0) {
      node = (
        <div
          // className={isShowHint ? "line-10th" : "line-10th line-10th-hidden"}
          className={"label-line-10th"}
          key={number}
        >
          {remainder === 0 && <div className="selected"></div>}
          <div className="down-label"> {remainder === 0 ? number : ""}</div>
        </div>
      );
    } else if (modulo10 === 5) {
      node = (
        // className={isShowHint ? "line-5th" : "line-5th line-5th-hidden"}
        <div className={"label-line-10th"} key={number}>
          {/* <div className={isShowHint ? "line-5th" : "line-5th "} key={number}> */}
          {remainder === 0 && <div className="selected"></div>}
          <div className="down-label">{first_factor === number || second_factor === number ? number : ""}</div>
        </div>
      );
    } else {
      node = (
        // className={isShowHint ? "dot " : "dot visiblity-hidden"}
        <div className={"label-dot "} key={number}>
          <div className="down-label">{first_factor === number || second_factor === number ? number : ""}</div>
        </div>
      );
    }
    return node;
  }
  return (
    <div className="find-difference-wrapper">
      <div className="line-wrapper">
        <div className="marker-line"></div>
        <div className={"marker-wrapper-lg"}>
          {_.range(startingPoint, endingPoint).map(number => renderNode(number))}
        </div>

        <div className={"marker-wrapper-lg"}>
          {_.range(startingPoint, endingPoint).map(number => renderDownLabel(number))}
        </div>
        <div className={"marker-wrapper-lg"}>
          {[1].map(number => {
            return (
              <div
                key={number}
                style={{
                  width: "100%",
                  marginLeft: `${((second_factor - startingPoint) / 20) * 100}%`,
                  position: "relative",
                  marginRight: `${((endingPoint - first_factor - 1) / 20) * 100}%`
                }}
              >
                {/* <div className="half-circle-arrow"></div> */}
                {/* <div className={"five-half-circle visible"}>
                  <div className="five-circle-static-text-minus-one">?</div>
                </div>
                <div className={"five-start-point visible"}></div>
                <div className={"five-end-point visible"}></div> */}
                <div
                  className={
                    answer > 3
                      ? "hint-half-circle-arch-arrow visible"
                      : answer > 1
                        ? "hint-half-circle-arch-arrow md visible"
                        : "hint-half-circle-arch-arrow sm visible"
                  }
                >
                  <img src={arrow4} alt="bracketBottom" />
                  <div
                    className={
                      answer > 3
                        ? "hint-arch-text visible"
                        : answer > 1
                          ? "hint-arch-text md visible"
                          : "hint-arch-text sm visible"
                    }
                  >
                    ?
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {strategyDetails.isShowHint === 2 &&
          hintClickedCount >= 1 &&
          second_factor < middlePoint &&
          first_factor > middlePoint && (
            <div className={"marker-wrapper-lg"}>
              {[1].map(number => {
                return (
                  <div
                    key={number}
                    style={{
                      width: "100%",
                      marginLeft: `${((second_factor - startingPoint) / 20) * 100}%`,
                      position: "relative",
                      marginRight: `${((endingPoint - first_factor - 1) / 20) * 100}%`
                    }}
                  >
                    <div className={"bracket-wrapper-outer visible"}>
                      <div className="bracket-wrapper">
                        <div
                          style={{
                            width: `${(100 / (first_factor - second_factor)) * (middlePoint - second_factor)}%`,
                            opacity: 0.7
                          }}
                          className="braces"
                        >
                          <img src={bracketBottom} alt="bracketBottom" />
                          <div className="curly-braces-hint-text">{middlePoint - second_factor}</div>
                        </div>

                        <div
                          style={{
                            width: `${100 - (100 / (first_factor - second_factor)) * (middlePoint - second_factor)}%`,
                            opacity: 0.7
                          }}
                          className="braces"
                        >
                          <img src={bracketBottom} alt="bracketBottom" />
                          <div className="curly-braces-hint-text">
                            {hintClickedCount >= 2 ? first_factor - middlePoint : "?"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}
export default FindDifference;
