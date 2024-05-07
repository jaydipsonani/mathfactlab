import React from "react";
import Button from "components/common/Button";
import { Modal } from "antd";

const ConfirmationDialog = ({ user, changedField, onOk, onCancel }) => {
  return (
    <Modal visible={true} title="Are you sure?" onCancel={onCancel} footer={null} key="modal">
      <div className="popup-content">
        <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
          Are you sure you wish to change <b>{`${user.profile.first_name} ${user.profile.last_name}'s `}</b>
          level in the {`${changedField === "add_sub_level_id" ? "Addition/Subtraction" : "Multiplication/Division"}`}{" "}
          mode?
        </h4>
      </div>

      <div className="popup-footer">
        <div className="button-wrap">
          <div className="button-cols">
            <Button type="button" className="button" name={"No, cancel"} onClick={onCancel} />
          </div>
          <div className="button-cols">
            <Button type="button" className="button-secondary" name={"Yes, change"} onClick={onOk} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
