import React, { useEffect } from "react";
import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeletePopup = ({ open, text, success, close }) => {
  useEffect(() => {
    if (open) {
      Modal.confirm({
        title: <span style={{ fontWeight: "500" }}>{text}</span>,
        okText: "Delete",
        cancelText: "Cancel",
        maskClosable: true,
        okButtonProps: {
          type: "danger",
          style: { backgroundColor: "#ff4d4f", color: "white" }
        },
        onOk: success,
        cancelButtonProps: {
          // style for cancel button
          style: { defaultHoverBorderColor: "#51d69a", backgroundColor: "#ffffff" }
        },
        onCancel: close,
        icon: <DeleteOutlined style={{ color: "#fa1414" }} />
      });
    }
  }, [open, text, success, close]);

  return null;
};

export default DeletePopup;
