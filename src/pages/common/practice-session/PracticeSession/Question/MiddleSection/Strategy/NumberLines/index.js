import React from "react";
import { numberToStringNumber, pluralOfWords } from "utils/helpers";

function NumberLines(props) {
  //practice question test page

  const { first_factor, second_factor, hintClickedCount } = props;

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
        <div className={"line-10th"} key={number}>
          <div className="down-label">
            {/* {remainder === 0 &&
            (number === second_factor * 10 || number === second_factor * 0)
              ? number
              : ""} */}
            {number}
          </div>
        </div>
      );
    } else if (modulo10 === 5) {
      node = (
        <div className="line-5th" key={number}>
          {/* <div className="down-label">{remainder === 0 ? number : ""}</div> */}
        </div>
      );
    } else if (remainder === 0) {
      node = (
        <div className={"dot"} key={number}>
          {/* <div className="down-label">{number}</div> */}
        </div>
      );
    } else {
      node = <div className={"dot"} key={number}></div>;
    }
    return node;
  }
  return (
    <>
      <div className="number-line-wrapper">
        <div className="line-wrapper">
          <div className="marker-line"></div>
          <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
            {renderArray.map(number => renderNode(number))}
          </div>

          {/* // single arch */}
          {first_factor !== 9 && (
            <>
              <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number, i) => {
                  return (
                    <div key={number} style={{ width: "10%", position: "relative" }}>
                      <div
                        className={
                          (hintClickedCount === 1 && i < first_factor && i < 5) ||
                          (hintClickedCount === 2 && i < first_factor) ||
                          (hintClickedCount === 2 && i >= 5 && number * second_factor <= first_factor * second_factor)
                            ? // ? number * second_factor >=
                              //     (first_factor * second_factor) / 2 ||
                              //   number * second_factor === 100
                              //   ? "half-circle visible disable"
                              //   : "half-circle visible"
                              // : "half-circle"
                              "half-circle visible"
                            : "half-circle"
                        }
                      >
                        {" "}
                        <div className="static-text-minus-one">+{second_factor}</div>
                      </div>
                      <div
                        className={
                          (hintClickedCount === 1 &&
                            first_factor <= 5 &&
                            number * second_factor === first_factor * second_factor) ||
                          (hintClickedCount === 2 &&
                            first_factor <= 5 &&
                            number * second_factor === first_factor * second_factor) ||
                          (hintClickedCount === 2 &&
                            first_factor >= 5 &&
                            number * second_factor === first_factor * second_factor)
                            ? "point visible"
                            : "point"
                        }
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* 5 circle arch */}
              <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
                {[5, 10].map(number => {
                  return (
                    <div key={number} style={{ width: "50%", position: "relative" }}>
                      <div
                        className={
                          (hintClickedCount === 1 &&
                            number < 6 &&
                            first_factor > 5 &&
                            first_factor * second_factor >= number * second_factor) ||
                          (hintClickedCount === 2 &&
                            first_factor > 5 &&
                            first_factor * second_factor >= number * second_factor) ||
                          (hintClickedCount === 2 &&
                            first_factor > 5 &&
                            number * second_factor === first_factor * second_factor)
                            ? "five-half-circle visible"
                            : "five-half-circle "
                        }
                      >
                        {" "}
                        <div className="five-circle-static-text-minus-one">
                          5 jumps of {numberToStringNumber(second_factor)}
                        </div>
                      </div>

                      <div
                        className={
                          (hintClickedCount === 1 &&
                            number < 6 &&
                            first_factor > 5 &&
                            first_factor * second_factor >= number * second_factor) ||
                          (hintClickedCount === 2 &&
                            first_factor > 5 &&
                            first_factor * second_factor >= number * second_factor) ||
                          (hintClickedCount === 2 &&
                            first_factor > 5 &&
                            number * second_factor === first_factor * second_factor)
                            ? "five-point visible"
                            : "five-point"
                        }
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* text more jumps */}
              <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
                {[5, 10].map(number => {
                  let remainJumps = first_factor - 5;
                  return (
                    <div
                      key={number}
                      style={{
                        width: `50%`,
                        position: "relative"
                      }}
                      className={
                        first_factor > 5 && first_factor !== 10 && number > 5 && hintClickedCount
                          ? "hint-text-wrapper visible"
                          : "hint-text-wrapper"
                      }
                    >
                      {hintClickedCount === 1 ? (
                        <div
                          className="five-circle-static-text-minus-one"
                          // style={{
                          //   width: `${remainJumps * 20}%`,
                          // }}
                        >
                          How many more jumps to make {first_factor} jumps ?
                        </div>
                      ) : (
                        <div
                          className="five-circle-static-text-minus-one"
                          // style={{
                          //   width: `${remainJumps * 20}%`,
                          // }}
                        >
                          +{remainJumps} more {remainJumps > 1 ? "jumps" : "jump"} of{" "}
                          {numberToStringNumber(second_factor)}
                        </div>
                      )}{" "}
                    </div>
                  );
                })}
              </div>

              <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
                <div
                  // className="half-curly-brace"
                  className={
                    hintClickedCount === 2
                      ? "half-curly-brace hint-text-wrapper visible"
                      : "half-curly-brace hint-text-wrapper"
                  }
                  style={{ width: `${first_factor * 10}%` }}
                >
                  <div id="left" className="brace"></div>
                  <div id="right" className="brace"></div>
                </div>
                <div
                  className={hintClickedCount === 2 ? "hint-text-wrapper visible" : "hint-text-wrapper"}
                  style={{
                    position: "absolute",
                    marginTop: "10%",
                    fontSize: "28px",
                    width: `${first_factor * 10}%`,
                    left: "0px",
                    top: "8px",
                    textAlign: "center"
                  }}
                >
                  {first_factor} {first_factor > 1 ? "jumps" : "jump"} of {numberToStringNumber(second_factor)}
                </div>
              </div>
            </>
          )}

          {first_factor === 9 && (
            <>
              <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number, i) => {
                  return (
                    <div key={number} style={{ width: "10%", position: "relative" }}>
                      <div className={hintClickedCount === 2 && i === 9 ? "half-circle visible" : "half-circle"}>
                        <div className="bottom-static-text-minus-one">
                          -1 jump of {numberToStringNumber(second_factor)}
                        </div>
                      </div>
                      <div className={hintClickedCount === 2 && i === 9 ? "left-point visible" : "point"}></div>
                    </div>
                  );
                })}
              </div>

              {/* 5 circle arch */}
              <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
                {[10].map(number => {
                  return (
                    <div key={number} style={{ width: "100%", position: "relative" }}>
                      <div className={hintClickedCount >= 1 ? "five-half-circle visible" : "five-half-circle "}>
                        <div className="five-circle-static-text-minus-one">
                          10 jumps of {numberToStringNumber(second_factor)}
                        </div>
                      </div>

                      <div className={hintClickedCount >= 1 ? "five-point visible" : "five-point"}></div>
                    </div>
                  );
                })}
              </div>

              <div className={second_factor > 6 ? "marker-wrapper-sm" : "marker-wrapper-lg"}>
                <div
                  // className="half-curly-brace"
                  className={
                    hintClickedCount === 2
                      ? "half-curly-brace hint-text-wrapper visible"
                      : "half-curly-brace hint-text-wrapper"
                  }
                  style={{ width: `${first_factor * 10}%` }}
                >
                  <div id="left" className="brace"></div>
                  <div id="right" className="brace"></div>
                </div>
                <div
                  className={hintClickedCount === 2 ? "hint-text-wrapper visible" : "hint-text-wrapper"}
                  style={{
                    position: "absolute",
                    marginTop: "10%",
                    fontSize: "28px",
                    width: `${first_factor * 10}%`,
                    left: "0px",
                    top: "8px",
                    textAlign: "center"
                  }}
                >
                  {first_factor} {numberToStringNumber(second_factor)}
                  {pluralOfWords(second_factor)} = 10 {numberToStringNumber(second_factor)}
                  {pluralOfWords(second_factor)} - 1 {numberToStringNumber(second_factor)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* {hintClickedCount === 1 && (
        <div style={{ textAlign: "center" }}>How many more juns to need ?</div>
      )}*/}
    </>
  );
}

export default NumberLines;
