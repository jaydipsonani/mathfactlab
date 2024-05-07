import React from "react";
import { checkedObjList } from "config/const";
import { useMediaQuery } from "react-responsive";
import _ from "lodash";

// import bracketTop from "assets/images/curly/bar-diagram-bracket-top.svg";

const OpenArrays = props => {
  //practice question test page

  const { first_factor, second_factor, isShowHint, checkedField } = props;

  let boxSize = 32;
  const isBigScreen = useMediaQuery({ query: "(max-width: 1680)" });
  const isSemiMediumScreen = useMediaQuery({ query: "(max-width: 1440px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1366px)" });
  const isTabletScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  if (isBigScreen) {
    boxSize = 32;
  }
  if (isSemiMediumScreen) {
    boxSize = 30;
  }
  if (isMediumScreen) {
    boxSize = 26;
  }
  if (isTabletScreen) {
    boxSize = 30;
  }

  // switch (strategyDetails.slug) {
  //   case "group-of-17":
  //     switch (first_factor) {
  //       case 7:
  //         return (
  //           <div className="open-arrays-wrapper">
  //             <div
  //               style={{
  //                 width: `${boxSize * second_factor}px`,
  //                 height: `${boxSize * first_factor}px`,
  //               }}
  //               className="box-flex-wrapper"
  //             >
  //               <div className="answer-text-group-17">{10}</div>
  //               <div className="full-curly-brace">
  //                 <img src={bracketTop} alt="bracketTop"></img>

  //                 {/* <div id="left" className="brace"></div>
  //         <div id="right" className="brace"></div> */}
  //               </div>
  //               <div
  //                 className="vertical-wrapper"
  //                 style={{ width: `${boxSize * 20}px` }}
  //               >
  //                 <div className="vertical-line"></div>
  //               </div>
  //               <div
  //                 className={
  //                   second_factor === 1 ? "first-factor-sm" : "first-factor"
  //                 }
  //               >
  //                 {checkedField === checkedObjList[0] ? (
  //                   <span className="question-mark-text">?</span>
  //                 ) : (
  //                   first_factor
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         );

  //       default:
  //         return "";
  //     }

  //   default:
  return (
    <div className="open-arrays-wrapper">
      <div
        style={{
          width: `${boxSize * second_factor}px`,
          height: `${boxSize * first_factor}px`
        }}
        className="box-flex-wrapper"
      >
        {isShowHint && (
          <div className="vertical-wrapper">
            {_.range(1, second_factor).map((vertical, i) => {
              return <div key={i} className="vertical-line"></div>;
            })}
          </div>
        )}
        {isShowHint && (
          <div className="horizontal-wrapper">
            {_.range(1, first_factor).map((vertical, i) => {
              return <div key={i} className="horizontal-line"></div>;
            })}
          </div>
        )}
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
};

export default OpenArrays;
