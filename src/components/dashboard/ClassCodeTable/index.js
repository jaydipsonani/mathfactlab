import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import googleIcon from "assets/images/google-icon.svg";

const ClassCodeTable = props => {
  let navigate = useNavigate();

  const { classCodeList } = props;
  const { fetchingAllClassCodeListLoading: loading } = useSelector(({ classCode }) => classCode);

  const [sortedInfo, setSortedInfo] = useState({});

  // if (!classCodeList.length) {
  //   return (
  //     <div className="empty-data-table">
  //       There are currently no students assigned to this class.
  //     </div>
  //   );
  // }

  const handleChangeTable = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleShowStudentListByClassCode = row => {
    navigate(`/teacher/students?class_code=${row.class_code}`);
  };

  const handleEditClassCode = activeClassCode => {
    props.showEditClassCodeDialog(activeClassCode);
  };

  const handleDeleteStudent = activeClassCode => {
    props.showDeleteClassCodeDialog(activeClassCode);
  };

  const columns = [
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      showSorterTooltip: false,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <div>
              {record.name}{" "}
              {!!record.is_google_class && (
                <img style={{ width: "12px", height: "12px" }} src={googleIcon} alt="google-icon" />
              )}
            </div>
          )
        };
      }
    },
    {
      title: "Class Code",
      dataIndex: "class_code",
      key: "class_code",
      align: "left",
      showSorterTooltip: false,
      sorter: (a, b) => a.class_code.localeCompare(b.class_code),
      sortOrder: sortedInfo.columnKey === "class_code" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.class_code}</div>
        };
      }
    },
    {
      title: "Students",
      dataIndex: "student",
      key: "student",
      align: "center",
      render(text, record) {
        return {
          children: (
            <div
              onClick={() => handleShowStudentListByClassCode(record)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <button type="button" className="btn-icon-trans edit">
                <i className="icon-students" aria-hidden="true"></i>
              </button>{" "}
              {/* <span style={{ color: "#2b95f9" }}>{record.student_count} </span> */}
            </div>
          )
        };
      }
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      render(text, record) {
        return {
          children: (
            <button type="button" className="btn-icon-trans edit" onClick={() => handleEditClassCode(record)}>
              {/* <i className="icon-edit" aria-hidden="true"></i> */}
              <EditOutlined />
            </button>
          )
        };
      }
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      render(text, record) {
        return {
          children: (
            <button type="button" className="btn-icon-trans delete" onClick={() => handleDeleteStudent(record)}>
              {/* <i className="icon-delete" aria-hidden="true"></i> */}
              <DeleteOutlined />
            </button>
          )
        };
      }
    }
  ];
  return (
    <Table
      columns={columns}
      dataSource={classCodeList}
      onChange={handleChangeTable}
      loading={loading}
      scroll={{ y: "calc(100vh - 300px)" }}
      pagination={false}
      rowKey={record => record.id}
    />
  );
};

export default ClassCodeTable;
