import React from "react";
import { Modal } from "antd";

const SyncDialog = props => {
  const { contentText } = props;

  return (
    <Modal visible={true} footer={null} closable={false} width={685}>
      <div className="custom-popup open custom-poppup-body">
        <div className="popup">
          <div className="popup-content">
            <div className="sync-popup-wrapper">
              <div className="lds-dual-ring lds-dual-primary"></div>
              <span className="sync-popup-title">{contentText}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SyncDialog;
