import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Button } from "antd";
import { sendTeacherJoinInvitation, forgotPassword } from "../../../redux/actions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TeacherClassesDialog from "components/dashboard/TeacherClassesDialog";
import { isNormalUser } from "utils/helpers";

const TeacherTable = props => {
  const { teacherData, classCodeList } = props;

  const dispatch = useDispatch();

  const { fetchingAllTeacherDataLoading: loading } = useSelector(({ teacherData }) => teacherData);
  const { userDetails } = useSelector(({ auth }) => auth);
  // const [sortedInfo, setSortedInfo] = useState({});

  const [sortedInfo, setSortedInfo] = useState({
    column: {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      align: "center",
      showSorterTooltip: false
    },
    columnKey: "last_name",
    field: "last_name",
    order: "ascend"
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedTeacherData, setSelectedTeacherData] = useState(false);

  const handleChangeTable = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleEditTeacher = TeacherData => {
    props.showEditTeacherDialog(TeacherData);
  };

  const handleDeleteTeacher = TeacherData => {
    props.showDeleteTeacherDialog(TeacherData);
  };

  const handleResendEmailToTeacher = data => {
    const { user_id } = data;
    dispatch(sendTeacherJoinInvitation(user_id));
  };

  const handleSendResetPasswordLink = data => {
    const { email } = data;
    const body = {
      email: email
    };

    dispatch(forgotPassword(body));
  };
  const showModal = teacherUser => {
    setSelectedTeacherData(teacherUser);
    setIsModalVisible(true);
  };
  console.log("🚀 ~ file: index.js:62 ~ showModal ~ showModal:", showModal);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      isShow: true,
      title: "Name",
      dataIndex: "name1",
      key: "name1",
      width: 170,
      align: "left",
      showSorterTooltip: false,
      sorter: (a, b) => a.profile.last_name.localeCompare(b.profile.last_name),
      sortOrder: sortedInfo.columnKey === "name1" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{`${record?.profile?.last_name},  ${record?.profile?.first_name}`}</div>
        };
      }
    },

    {
      isShow: true,
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      width: 360,
      showSorterTooltip: false,
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      onCell: record => ({
        children: <div>{record.email}</div>
      })
    },
    {
      isShow: true,
      title: "Class(es)",
      dataIndex: "classes",
      key: "classes",
      align: "left",
      width: 320,
      // showSorterTooltip: false,
      // sorter: (a, b) => a.classes.localeCompare(b.classes),
      // sortOrder: sortedInfo.columnKey === "classes" && sortedInfo.order,
      render(text, record) {
        const classNames = record?.classes?.names || ""; // Get the "names" property or an empty string if it's not present
        const myClassList = classCodeList.map(c => c.name + " - " + c.class_code);
        return {
          children: (
            <div
              style={{
                maxHeight: 60,
                overflowY: "auto",
                width: "100%"
              }}
            >
              {classNames
                .split(",")
                ?.filter(className => myClassList.includes(className))
                .map((className, i) => (
                  <div key={i} className="mt-5">
                    <Tag>{className}</Tag>
                  </div>
                ))}
            </div>
          )
          // ),
        };
      }
    },

    {
      isShow: true,
      title: "Invitation/Password Reset",
      dataIndex: "is_email_verified",
      key: "is_email_verified",
      align: "left",
      width: 245,
      showSorterTooltip: false,
      sorter: (a, b) => +a.is_email_verified - +b.is_email_verified,
      sortOrder: sortedInfo.columnKey === "is_email_verified" && sortedInfo.order,
      render(text, record) {
        return {
          children: record.is_email_verified ? (
            <>
              <Tag
                color={"green"}
                style={{
                  width: "70px",
                  minWidth: "70px",
                  textAlign: "center"
                }}
              >
                Accepted
              </Tag>

              <Button type="link" onClick={() => handleSendResetPasswordLink(record)}>
                Reset
              </Button>
            </>
          ) : (
            <>
              <Tag
                color={"blue"}
                style={{
                  width: "70px",
                  minWidth: "70px",
                  textAlign: "center"
                }}
              >
                Invite sent
              </Tag>

              <Button type="link" onClick={() => handleResendEmailToTeacher(record)}>
                Resend
              </Button>
            </>
          )
        };
      }
    },
    {
      isShow: isNormalUser(userDetails) ? true : false,
      title: "Actions",
      dataIndex: "informative_actions",
      align: "center",
      width: 140,
      render(text, record) {
        return {
          props: {
            style: { align: "center" }
          },
          children: (
            <div>
              <button type="button" className="btn-icon-trans edit" onClick={() => handleEditTeacher(record)}>
                <EditOutlined />
              </button>
              <button
                style={{ marginLeft: "6px" }}
                type="button"
                className="btn-icon-trans delete"
                onClick={() => handleDeleteTeacher(record)}
              >
                <DeleteOutlined />
              </button>
            </div>
          )
        };
      }
    }
  ];
  const updatedColumList = columns.filter(column => column.isShow);
  return (
    <>
      <Table
        columns={updatedColumList}
        dataSource={teacherData}
        onChange={handleChangeTable}
        loading={loading}
        scroll={{ y: "calc(100vh - 300px)", x: "1150" }}
        pagination={false}
        rowKey={record => record.id}
      />

      <TeacherClassesDialog
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        showDeleteTeacherDialog={handleDeleteTeacher}
        activeUser={selectedTeacherData}
      />
    </>
  );
};
export default TeacherTable;
