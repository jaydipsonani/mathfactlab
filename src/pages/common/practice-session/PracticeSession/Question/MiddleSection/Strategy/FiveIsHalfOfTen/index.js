import React from "react";
import bracketBottom from "assets/images/curly/five-is-half-ten-bracket-bottom.svg";
import bracketTop from "assets/images/curly/five-is-half-ten-bracket-top.svg";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";
function FiveIsHalfOfTen(props) {
  // practice question test page
  const { first_factor, second_factor, isShowHint } = props;
  let uniqueFactor = first_factor === 5 ? second_factor : first_factor;
  let renderArray = [];
  (function () {
    let i = 0;
    while (i < first_factor * 10) {
      renderArray.push(i);
      i++;
    }
    return renderArray;
  })();
  // below size indicates on box in px
  let boxSize = 32;
  const isBigScreen = useMediaQuery({ query: "(max-height: 1050px)" });
  const isSemiMediumScreen = useMediaQuery({ query: "(max-height: 980px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-height: 750px)" });
  const isTabletScreen = useMediaQuery({ query: "(max-height: 650px)" });
  if (isBigScreen) {
    boxSize = 32;
  }
  if (isSemiMediumScreen) {
    boxSize = 30;
  }
  if (isMediumScreen) {
    boxSize = 22;
  }
  if (isTabletScreen) {
    boxSize = 20;
  }
  return uniqueFactor <= 10 ? (
    <div className="five-is-half-of-ten-wrapper-single">
      <div
        style={{
          width: `${boxSize * 10}px`,
          height: `${boxSize * first_factor}px`
        }}
        className="box-flex-wrapper"
      >
        <div className="vertical-wrapper">
          {_.range(1, 11).map((vertical, i) => {
            return <div key={i} className={i < 5 ? "vertical-line bg-green" : "vertical-line"}></div>;
          })}
        </div>
        <div className="horizontal-wrapper">
          {_.range(1, first_factor).map((vertical, i) => {
            return <div key={i} className="horizontal-line"></div>;
          })}
        </div>
        <div className="answer-text">{10}</div>
        <div className="full-curly-brace">
          <img src={bracketTop} alt="bracketTop"></img>
          {/* <div id="left" className="brace"></div>
          <div id="right" className="brace"></div> */}
        </div>
        <div className="first-factor">{first_factor}</div>
        <div className="second-factor">{second_factor}</div>
        <div className="half-curly-brace">
          <img src={bracketBottom} alt="bracketBottom"></img>
          {/* <div id="left" className="brace"></div>
          <div id="right" className="brace"></div> */}
        </div>
        <div className={isShowHint ? "hint-text-box-wrapper visible" : "hint-text-box-wrapper"}>
          <div className={"textCenter hint-text-box"}>
            <h4>There are {first_factor * 10} squares.</h4>
            <h4>Half are green.</h4>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="five-is-half-of-ten-wrapper-multi">
      <div
        style={{
          display: "flex",
          position: "relative",
          width: `${boxSize * second_factor + 10}px`
        }}
      >
        {/* First box wrapper */}
        <div
          style={{
            width: `${boxSize * 10}px`,
            height: `${boxSize * 10}px`,
            display: "flex"
          }}
          className="box-flex-wrapper mr-10"
        >
          <div className="vertical-wrapper">
            {_.range(1, 11).map((vertical, i) => {
              return <div key={i} className={i < 5 ? "vertical-line bg-green" : "vertical-line"}></div>;
            })}
          </div>
          <div className="horizontal-wrapper">
            {_.range(1, 10).map((vertical, i) => {
              return <div key={i} className="horizontal-line"></div>;
            })}
            <div className="left-full-curly-brace">
              <div id="half-curly-brace">
                <div id="left" className="brace"></div>
                <div id="right" className="brace"></div>
              </div>
            </div>
            <div className="left-factor-text">10</div>
          </div>
        </div>
        {/* Second box wrapper */}
        <div
          style={{
            width: `${boxSize * (second_factor - 10)}px`,
            height: `${boxSize * 10}px`,
            display: "flex"
          }}
          className="box-flex-wrapper"
        >
          <div className="vertical-wrapper">
            {_.range(1, 11).map((vertical, i) => {
              return <div key={i} className={i < 5 ? "vertical-line bg-green" : "vertical-line"}></div>;
            })}
          </div>
          <div className="horizontal-wrapper">
            {_.range(1, second_factor - 10).map((vertical, i) => {
              return <div key={i} className="horizontal-line"></div>;
            })}
            <div
              className="right-full-curly-brace"
              style={{
                width: `${boxSize * 5}px`
              }}
            >
              <div id="curly-brace">
                <div id="left" className="brace"></div>
                <div id="right" className="brace"></div>
              </div>
            </div>
            <div
              className="right-factor-text"
              style={{
                width: `${boxSize * 5}px`
              }}
            >
              5
            </div>
          </div>
        </div>
        <div className={isShowHint ? "half-of-ten-hint-text-box-wrapper visible" : "half-of-ten-hint-text-box-wrapper"}>
          <div className={"textCenter hint-text-box"}>
            <div>There are {second_factor * 10} squares.</div>
            <div>Half are green.</div>
          </div>
        </div>
        {/*  Top arrow and text */}
        <div className="full-curly-brace">
          <div className="curly-brace">
            <div id="left" className="brace"></div>
            <div id="right" className="brace"></div>
          </div>
          {/* <img src={bracketTop} alt="bracketTop"></img> */}
        </div>
        <div className="top-factor-text">{second_factor}</div>
      </div>
    </div>
  );
}
export default FiveIsHalfOfTen;
