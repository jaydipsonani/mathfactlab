import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Button, Divider, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { editTeacher } from "../../../redux/actions";
// import { editTeacher } from "store/action"; CHANGE THIS REQUIRED

const TeacherClassesDialog = props => {
  const { isModalVisible, handleCancel, activeUser } = props;

  const dispatch = useDispatch();
  const { classCodeList } = useSelector(({ classCode }) => classCode);

  const [assignedClassList, setAssignedClassList] = useState([]);
  const [selectedClassList, setSelectedClassList] = useState([]);

  const handleDeleteTeacher = TeacherData => {
    // setDeletedClasses(prevDeletedClasses => [
    //   ...prevDeletedClasses,
    //   TeacherData.class_id,
    // ]);
    // setSelectedValues(selectedValues.filter(id => id !== TeacherData.class_id));
  };

  // const filteredMoreClasses = filteredClassCodeList.filter(
  //   classItem => !deletedClasses.includes(classItem.id),
  // );

  useEffect(() => {
    if (activeUser && activeUser.classes) {
      setAssignedClassList([...activeUser.classes]);
    }
  }, [activeUser]);

  const handleSelectRow = record => {
    if (selectedClassList.filter(classCode => classCode.id === record.id)) {
      const updatedSelectedClassList = selectedClassList.filter(classCode => classCode.id !== record.id);
      setSelectedClassList([...updatedSelectedClassList]);
    } else {
      setSelectedClassList([...selectedClassList, record]);
    }
  };

  const handleSaveClasses = () => {
    const body = {
      class_ids: selectedClassList
    };

    dispatch(editTeacher(activeUser.user_id, body));
    handleCancel();
  };

  const modalColumns = [
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Class code",
      dataIndex: "class_code",
      key: "class_code",
      align: "center",

      render(text, record) {
        return {
          children: <div style={{ letterSpacing: 1 }}>{record.class_code}</div>
        };
      },
      width: 120
    },

    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      render(text, record) {
        return {
          children: (
            <button type="button" className="btn-icon-trans delete" onClick={() => handleDeleteTeacher(record)}>
              <DeleteOutlined />
            </button>
          )
        };
      }
    }
  ];

  const moreClassesColumn = [
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Class code",
      dataIndex: "class_code",
      key: "class_code",
      align: "center",
      width: 120,
      render(text, record) {
        return {
          children: <div style={{ letterSpacing: 1 }}>{record.class_code}</div>
        };
      }
    },

    {
      title: "Add",
      dataIndex: "add",
      key: "add",
      align: "center",
      render(text, record) {
        return {
          children: <Radio value={record.id} onChange={() => handleSelectRow(record)} />
        };
      }
    }
  ];

  return (
    <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Classes assigned to {activeUser?.last_name} {activeUser?.first_name}
      </Divider>
      <Table columns={modalColumns} dataSource={assignedClassList} pagination={false} size="middle" />
      <Divider orientation="left" style={{ fontWeight: "bold", marginTop: "40px" }}>
        Assign more classes
      </Divider>

      <Table
        columns={moreClassesColumn}
        dataSource={classCodeList.filter(code => !assignedClassList.some(selected => selected.name === code.name))}
        pagination={false}
        size="middle"
      />
      <div className="popup-footer">
        <div className="button-wrap">
          <div className="button-cols">
            <div className="button-cols">
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          </div>

          <div className="button-cols">
            <Button type="primary" htmlType="submit" onClick={handleSaveClasses} disabled={!selectedClassList.length}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TeacherClassesDialog;
