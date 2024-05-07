import React from "react";
import Button from "components/common/Button";

const LevelLifterReportCloseDialog = props => {
  const { close } = props;

  const handleCloseStudentDeleteDailog = () => {
    close();
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open" style={{ zIndex: "1020" }}>
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Close Report</h3>
              <span className="close" onClick={() => handleCloseStudentDeleteDailog()}>
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>

            <div className="popup-content">
              <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
                Please first select ‘Level up!’ or ‘Not yet’ before closing this report.
              </h4>
            </div>
            <div className="popup-footer">
              <div className="button-wrap">
                <div className="button-cols">
                  <Button
                    className="btn btn-gray"
                    name={"Cancel"}
                    onClick={() => handleCloseStudentDeleteDailog()}
                  ></Button>
                </div>
                <div className="button-cols">
                  <Button
                    className="btn btn-secondary"
                    name={"Close"}
                    onClick={() => handleCloseStudentDeleteDailog()}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popup-backface open" style={{ zIndex: "1015" }}></div>
      </>
    </>
  );
};

export default LevelLifterReportCloseDialog;
