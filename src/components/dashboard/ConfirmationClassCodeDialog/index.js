import React from "react";
import { Modal } from "antd";
import Button from "components/common/Button";
import "assets/sass/components/button-ant.scss";

const ConfirmationClassCodeDialog = props => {
  const { activeClassCode, loading, closeConfirmationDialog, success, open } = props;

  //Close popup
  const handleCloseDialog = () => {
    closeConfirmationDialog();
  };

  //Delete User Api Call
  const handleDeleteClassCode = () => {
    success();
  };

  return (
    <>
      <>
        <Modal
          visible={open}
          title="Are you sure?"
          // title={
          //   <div className="popup-header">
          //     <h3 className="popup-title">Are you sure?</h3>
          //   </div>
          // }
          // destroyOnClose={true}
          // onOk={() => handleCloseDialog()}
          onCancel={() => handleCloseDialog()}
          // closable={false}
          // closeIcon={
          //   <span className="close" onClick={() => handleCloseDialog()}>
          //     <i className="icon-close" aria-hidden="true"></i>
          //   </span>
          // }
          footer={null}
          key="modal"
        >
          <div className="popup-content">
            <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
              Are you sure you wish to delete
              <b>{` ${activeClassCode.name}`}</b>?
            </h4>
          </div>
          <div style={{ height: "24px" }}></div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              right: "0"
              // borderBottom: "1px solid #f0f0f0",
            }}
          ></div>
          <div className="popup-footer">
            <div className="button-wrap">
              <div className="button-cols">
                <Button
                  type="button"
                  disabled={loading}
                  className="button"
                  name={"No, cancel"}
                  onClick={() => handleCloseDialog()}
                ></Button>
              </div>
              <div className="button-cols">
                <Button
                  disabled={loading}
                  type="button"
                  className="button-secondary"
                  name={"Yes, delete"}
                  onClick={() => handleDeleteClassCode()}
                ></Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default ConfirmationClassCodeDialog;
