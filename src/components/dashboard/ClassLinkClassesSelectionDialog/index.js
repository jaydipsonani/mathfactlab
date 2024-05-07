import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import ClassTable from "../../dashboard/ImportClasslinkClasslistTable";
import Button from "components/common/Button";
import { getClassCodeList, syncSelectedClassLinkStudents } from "../../../redux/actions/classCodeAction";
import "assets/sass/components/button-ant.scss";

const ClassLinkClassesSelectionDialog = props => {
  const { close, success } = props;
  const dispatch = useDispatch();

  const { classLinkClassList, syncClassLinkClassLoading } = useSelector(({ classCode }) => classCode);

  const syncedClassCodeList = classLinkClassList
    .filter(classDetails => classDetails.is_import)
    .map(classDetails => {
      return classDetails.class_link_sourced_id;
    });
  const [selectedRowKeys, setSelectedRowKeys] = useState(syncedClassCodeList || []);

  const handleCloseDialog = () => {
    close();
  };

  const handleChangeSelectedRawKeys = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const handleSuccessAddSelectedClass = () => {
    dispatch(getClassCodeList());
    handleCloseDialog();
    success && success();
  };

  const handleAddSelectedClass = () => {
    const body = {
      class_link_sourced_ids: selectedRowKeys
    };
    dispatch(syncSelectedClassLinkStudents(body, handleSuccessAddSelectedClass));
  };

  return (
    <>
      <Modal
        visible={true}
        title="Select Classes to Import new"
        onCancel={() => handleCloseDialog()}
        footer={null}
        key="modal"
      >
        <form className="popup">
          <div className="popup-content">
            <div className="popup-content-inner">
              <ClassTable
                closeClassCodeSelectDailog={handleCloseDialog}
                handleChangeSelectedRawKeys={handleChangeSelectedRawKeys}
                classesList={classLinkClassList}
              />
            </div>
          </div>

          <div className="popup-footer">
            <div className="button-wrap">
              <div className="button-cols">
                <Button type="button" className="button" name={"Cancel"} onClick={() => handleCloseDialog()} />
              </div>

              <div className="button-cols">
                <Button
                  type="button"
                  className="button-secondary"
                  name={syncClassLinkClassLoading ? "Syncing..." : "Sync"}
                  onClick={() => handleAddSelectedClass()}
                  disabled={syncClassLinkClassLoading || (selectedRowKeys && !selectedRowKeys.length)}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ClassLinkClassesSelectionDialog;
