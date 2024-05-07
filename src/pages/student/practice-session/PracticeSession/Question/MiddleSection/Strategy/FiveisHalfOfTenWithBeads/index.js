import React from "react";
import bracketBottom from "assets/images/curly/five-is-half-ten-bracket-bottom.svg";
import bracketTop from "assets/images/curly/five-is-half-ten-bracket-top.svg";

function FiveisHalfOfTenWithBeads(props) {
  const { first_factor, isShowHint } = props;

  let renderArray = [];

  (function () {
    let i = 0;
    while (i < first_factor) {
      renderArray.push(i);
      i++;
    }
    return renderArray;
  })();
  const totalBeads = 10;

  function renderNodeOfFirstFactor(number) {
    const bgColor = (0 <= number && number <= 5) || (11 <= number && number <= 15) ? "bg-red" : "bg-white";

    return <div className={`ellipse ${bgColor} `} key={number}></div>;
  }

  return (
    <>
      <div className="five-is-half-of-ten-wrapper-with-beads">
        {renderArray.map(number => {
          return (
            <div className="line-wrapper" key={number}>
              <div className="marker-line"></div>
              <div className="marker-wrapper">
                {[...Array(totalBeads).keys()].map(number => renderNodeOfFirstFactor(number + 1))}
                {number === 0 && (
                  <>
                    <div className="answer-text">{10}</div>
                    {/* <div className="full-curly-brace" key={number}>
                      <div id="left" className="brace"></div>
                      <div id="right" className="brace"></div>
                    </div> */}
                    <div className="full-curly-brace">
                      <img src={bracketTop} alt="bracketTop"></img>

                      {/* <div id="left" className="brace"></div>
          <div id="right" className="brace"></div> */}
                    </div>
                  </>
                )}
                {number + 1 === first_factor && (
                  <>
                    <div className="second-factor">{5}</div>
                    {/* <div className="half-curly-brace" key={number}>
                      <div id="left" className="brace"></div>
                      <div id="right" className="brace"></div>
                    </div> */}

                    <div className="half-curly-brace">
                      <img src={bracketBottom} alt="bracketBottom"></img>

                      {/* <div id="left" className="brace"></div>
          <div id="right" className="brace"></div> */}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        <div className={isShowHint ? "hint-text-box-wrapper visible" : "hint-text-box-wrapper"}>
          <div className={"textCenter hint-text-box"}>
            <div>There are {first_factor * 10} beads.</div>
            <div>Half are red.</div>
          </div>
        </div>
        {/* <div
          style={{ position: "absolute", bottom: "-70px" }}
          className={
            isShowHint
              ? "textCenter hint-text-visible"
              : "textCenter hint-text-hidden"
          }
        >
          <h4>There are {first_factor * 10} beads in total. Half are red. </h4>
        </div> */}
      </div>
    </>
  );
}

export default FiveisHalfOfTenWithBeads;
