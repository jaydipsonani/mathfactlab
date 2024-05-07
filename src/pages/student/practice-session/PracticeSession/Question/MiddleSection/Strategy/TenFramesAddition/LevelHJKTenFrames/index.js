import React from "react";
import tenFramesRedDotImage from "assets/images/ten-frames/red.png";
import tenFramesYellowDotImage from "assets/images/ten-frames/yellow.png";
function LevelHJKTenFrames(props) {
  //practice question test page
  const { first_factor, second_factor, hintClickedCount, isLowZoomLevel } = props;

  //there is two possibility either 9 comes as first factor or second factor
  // const renderFirstColumn = (number) => {
  //   if (first_factor === 9) {
  //     if (hintClickedCount === 1) {
  //       if (number <= 10) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col visible">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //     } else {
  //       if (number <= first_factor) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col visible">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //     }
  //   } else {
  //     if (hintClickedCount === 1) {
  //       if (number <= first_factor - 1) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col visible">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //     } else {
  //       if (number <= first_factor - 1) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col visible">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //       if (number <= first_factor) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col ">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col visible">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //     }
  //   }
  // };
  // const renderSecondColumn = (number) => {
  //   if (first_factor === 9) {
  //     if (hintClickedCount === 1 || hintClickedCount === 2) {
  //       let greenCount = 10 - first_factor;
  //       if (number <= second_factor - greenCount) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col visible">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //     } else {
  //       let greenCount = 10 - first_factor;
  //       if (number <= second_factor - greenCount) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col visible">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //       if (number <= second_factor) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col visible">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //     }
  //   } else {
  //     if (hintClickedCount === 1 || hintClickedCount === 2) {
  //       if (number <= second_factor + first_factor) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col visible">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //     } else {
  //       if (number <= second_factor) {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col visible">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className="circle-wrapper" key={number}>
  //             <div>
  //               <div className="circle first-col">
  //                 <img
  //                   src={tenFramesRedDotImage}
  //                   alt="tenFramesRedDotImage"
  //                 ></img>
  //               </div>
  //               <div className="circle second-col">
  //                 <img
  //                   src={tenFramesYellowDotImage}
  //                   alt="tenFramesYellowDotImage"
  //                 ></img>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       }
  //     }
  //   }
  // };

  return (
    <div className="ten-frames-with-double-dices">
      <>
        {/* First Factor Frames */}
        {[...Array(Math.ceil(first_factor / 10))].map((frames, index) => {
          let totalLength = first_factor === 9 && hintClickedCount > 1 ? first_factor + second_factor : first_factor;

          return (
            <div key={frames} className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
                return number + index * 10 <= totalLength ? (
                  <div className="circle-wrapper" key={number}>
                    <div>
                      {second_factor === 9 && number + index * 10 === first_factor ? (
                        hintClickedCount >= 1 ? (
                          <div className={hintClickedCount > 1 ? "circle first-col " : "circle first-col visible"}>
                            <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                          </div>
                        ) : (
                          <div className={"circle second-col visible"}>
                            <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                          </div>
                        )
                      ) : (
                        <div className="circle first-col  visible">
                          <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                        </div>
                      )}

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
                      <div className={"circle second-col"}>
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

        {[...Array(Math.ceil(second_factor / 10))].map((frames, index) => {
          let totalLength = second_factor === 9 && hintClickedCount > 1 ? first_factor + second_factor : second_factor;
          return (
            <div key={frames} className={isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
                return number + index * 10 <= totalLength ? (
                  <div className="circle-wrapper" key={number}>
                    <div>
                      {first_factor === 9 && number + index * 10 === second_factor ? (
                        hintClickedCount >= 1 ? (
                          <div className={hintClickedCount > 1 ? "circle first-col " : "circle first-col visible"}>
                            <img src={tenFramesRedDotImage} alt="tenFramesRedDotImage"></img>
                          </div>
                        ) : (
                          <div className={"circle first-col visible"}>
                            <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                          </div>
                        )
                      ) : (
                        <div className="circle second-col  visible">
                          <img src={tenFramesYellowDotImage} alt="tenFramesYellowDotImage"></img>
                        </div>
                      )}

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
        {/* <div
          className={
            isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"
          }
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) =>
            renderFirstColumn(number),
          )}
        </div>
        <div
          className={
            isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"
          }
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) =>
            renderSecondColumn(number),
          )}
        </div> */}
      </>
    </div>
  );
}

export default LevelHJKTenFrames;
