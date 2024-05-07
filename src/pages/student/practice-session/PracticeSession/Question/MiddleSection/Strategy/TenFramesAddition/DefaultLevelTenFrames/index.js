import React from "react";
import tenFramesRedDotImage from "assets/images/ten-frames/red.png";
import tenFramesYellowDotImage from "assets/images/ten-frames/yellow.png";
function DefaultLevelTenFrames(props) {
  //practice question test page
  const { first_factor, second_factor, hintClickedCount, isLowZoomLevel } = props;

  // const renderFirstColumn = (number) => {
  //   if (hintClickedCount === 1) {
  //     if (number <= first_factor) {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col visible">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //             <div className="circle second-col">
  //               <img
  //                 src={tenFramesYellowDotImage}
  //                 alt="tenFramesYellowDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }
  //     if (number <= first_factor + second_factor) {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //             <div className="circle second-col visible">
  //               <img
  //                 src={tenFramesYellowDotImage}
  //                 alt="tenFramesYellowDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //             <div className="circle second-col">
  //               <img
  //                 src={tenFramesYellowDotImage}
  //                 alt="tenFramesYellowDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }
  //   } else {
  //     if (number <= first_factor) {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col visible">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //             <div className="circle second-col">
  //               <img
  //                 src={tenFramesYellowDotImage}
  //                 alt="tenFramesYellowDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //             <div className="circle second-col">
  //               <img
  //                 src={tenFramesYellowDotImage}
  //                 alt="tenFramesYellowDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }
  //   }
  // };
  // const redendSecondColumn = (number) => {
  //   if (hintClickedCount === 1 || hintClickedCount === 2) {
  //     if (number <= second_factor + first_factor - 10) {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //             <div className="circle second-col visible">
  //               <img
  //                 src={tenFramesYellowDotImage}
  //                 alt="tenFramesYellowDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }
  //   } else {
  //     if (number <= second_factor) {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //             <div className="circle second-col visible">
  //               <img
  //                 src={tenFramesYellowDotImage}
  //                 alt="tenFramesYellowDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div className="circle-wrapper" key={number}>
  //           <div>
  //             <div className="circle first-col">
  //               <img
  //                 src={tenFramesRedDotImage}
  //                 alt="tenFramesRedDotImage"
  //               ></img>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }
  //   }
  // };
  return (
    <>
      {/* First Factor Frames */}
      {/* Take 1 frames if number is 0 */}
      {[...Array(Math.ceil(first_factor === 0 ? 1 : first_factor / 10))].map((frames, index) => {
        let totalLength = first_factor + second_factor;
        return (
          <div key={frames} className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
              return number + index * 10 <= first_factor ? (
                <div className="circle-wrapper" key={number}>
                  <div>
                    <div className="circle first-col  visible">
                      <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                    </div>
                    <div className="circle second-col">
                      <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="circle-wrapper" key={number}>
                  <div>
                    <div className="circle first-col">
                      <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                    </div>
                    <div
                      className={
                        hintClickedCount === 1 && number + index * 10 <= totalLength
                          ? "circle second-col visible"
                          : "circle second-col"
                      }
                    >
                      <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/*  Second Factor Frames */}
      {/* Take 1 frames if number is 0 */}

      {[...Array(Math.ceil(second_factor === 0 ? 1 : second_factor / 10))].map((frames, index) => {
        let totalLength = first_factor + second_factor;
        return (
          <div key={frames} className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
              return number + index * 10 <= second_factor ? (
                <div className="circle-wrapper" key={number}>
                  <div>
                    <div className="circle first-col  ">
                      <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                    </div>
                    <div
                      className={
                        hintClickedCount === 1
                          ? number + index * 10 <= totalLength - Math.ceil(first_factor / 10) * 10
                            ? "circle second-col visible"
                            : "circle second-col "
                          : "circle second-col visible "
                      }
                    >
                      <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="circle-wrapper" key={number}>
                  <div>
                    <div className="circle first-col">
                      <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                    </div>
                    <div className="circle second-col">
                      <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default DefaultLevelTenFrames;
