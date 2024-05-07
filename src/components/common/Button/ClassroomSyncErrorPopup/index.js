import React from "react";
import { Modal } from "antd";
import Button from "components/common/Button";
import { googleLoginScope, googleScopeClassroom } from "config/const";

const ClassroomSyncErrorPopup = props => {
  let googleScope = [...googleLoginScope, ...googleScopeClassroom];
  return (
    <Modal
      visible={true}
      footer={null}
      width={650}
      // close={props.closeSyncDailog()}
      onCancel={() => props.closeSyncDailog()}
    >
      {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}

      <div className="custom-popup open custom-poppup-body mt-20 ">
        <div className="popup">
          <div className="text-center">
            {/* <img src={congratulationImg} alt="bubbles" /> */}
            <h4 className="mb-10 font-22 font-bold">We don't have access to import your google classrooms.</h4>
            <h4 className="font-22 font-bold">Please grant us permission.</h4>
          </div>
          <div className="popup-footer">
            <div className="button-wrap" style={{ justifyContent: "center", marginBottom: "24px" }}>
              <div className="button-cols">
                <a
                  // className="search with-button btn-google-classroom js-sync-google-classrooms"
                  // href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${process.env.REACT_APP_GOOGLE_SCOPE}&include_granted_scopes=true&redirect_uri=${process.env.REACT_APP_FRONTEND_REDIRECT_URL}/teacher/login&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code`}
                  href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${googleScope.join(
                    "%20"
                  )}&include_granted_scopes=true&redirect_uri=${
                    process.env.REACT_APP_FRONTEND_REDIRECT_URL
                  }/teacher/classes&client_id=${
                    process.env.REACT_APP_GOOGLE_CLIENT_ID
                  }&response_type=code&access_type=offline&prompt=consent`}
                  style={{ height: "44px" }}
                >
                  <Button
                    type="button"
                    className="button-secondary mt-20"
                    name={"Connect Google Classroom Account"}
                    // onClick={() => handleEndSession()}
                  ></Button>{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ClassroomSyncErrorPopup;
