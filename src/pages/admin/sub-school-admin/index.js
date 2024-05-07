import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
import moment from "moment";
import DeletePopup from "components/common/DeletePopup";
import { Table, Tag, Typography, Button, Dropdown, Menu, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  DownOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import Section from "components/common/Section";
import Container from "components/common/Container";
// import PasswordDialog from "components/PasswordDialog";
import SubSchoolAdminDialog from "components/dashboard/Admin/SubSchoolAdminDialog";
import SchoolDialog from "components/dashboard/SchoolDialog";
import DownloadCSV from "components/common/GenerateCSV";
import ErrorBoundary from "components/common/ErrorBoundary";
import ImportSubSchoolAdminListPopup from "components/dashboard/ImportSubSchoolAdminListPopup";
import { getSchool } from "../../../redux/actions/schoolAction";
import { forgotPassword } from "../../../redux/actions/authAction";
import { getSubSchoolAdmin, removeSubSchoolAdmin, sendInvitations } from "../../../redux/actions/subSchoolAdminAction";
import { isEmpty } from "lodash";
import { isNormalUser } from "utils/helpers";
import "assets/sass/components/button-ant.scss";

const { Title } = Typography;

// moment fremont text changes
moment.updateLocale("en", {
  relativeTime: {
    s: "Seconds"
  }
});

export default function SchoolAdminSubSchoolAdminPage(props) {
  const dispatch = useDispatch();

  const { subSchoolAdminList, fetchSubSchoolAdminListLoading: loading } = useSelector(
    ({ subSchoolAdminList }) => subSchoolAdminList
  );
  const { userDetails } = useSelector(({ auth }) => auth);

  const { schoolData, addNewSchoolLoading } = useSelector(({ schoolData }) => schoolData);
  const [width, height] = useWindowSize();
  // const [filteredInfo, setFilteredInfo] = useState({});

  const [selectedUser, setSelectedUser] = useState({});

  // const [isOpenPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [isOpenSubSchoolAdminDialog, setOpenSubSchoolAdminDialog] = useState(false);
  const [isShowImportStudentPopup, setIsShowImportStudentPopup] = useState(false);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  //Default set last name ascend order
  const [sortedInfo, setSortedInfo] = useState({});
  const [isShowSchoolDialog, setIsShowSchoolDialog] = useState(false);

  useEffect(() => {
    dispatch(getSubSchoolAdmin());
  }, []); // eslint-disable-line

  useEffect(() => {
    !schoolData.length && dispatch(getSchool());
  }, [schoolData.length]); // eslint-disable-line

  // const [sortedInfo, setSortedInfo] = useState({});
  const handleChangeTable = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleEditSubSchoolAdmin = data => {
    setOpenSubSchoolAdminDialog(true);
    setSelectedUser(data);
  };
  const handleCloseSubSchoolAdminDialog = () => {
    setOpenSubSchoolAdminDialog(false);
    setSelectedUser({});
    setIsShowSchoolDialog(false);
  };

  const isShowSchoolPopUp = () => {
    setIsShowSchoolDialog(!isShowSchoolDialog);
  };
  // Show teacher popup
  const handleShowTeacherDialog = () => {
    setOpenSubSchoolAdminDialog(true);
  };
  const handleResendInvitation = data => {
    const { id } = data;

    dispatch(sendInvitations(id));
  };

  const handleSendResetPasswordLink = data => {
    const { email } = data;
    const body = {
      email: email
    };

    dispatch(forgotPassword(body));
  };
  const addStudentMenu = (
    <Menu>
      <Menu.Item onClick={() => handleShowTeacherDialog()}>
        <UserAddOutlined className="mr-5" /> Create Single Sub-Admin
      </Menu.Item>

      {/* <Menu.Item onClick={() => setOpenWelcomeStepPopup(true)}>
        <UsergroupAddOutlined className="mr-5" /> Add Multiple Teachers
      </Menu.Item> */}

      <Menu.Item onClick={() => setIsShowImportStudentPopup(true)}>
        <UsergroupAddOutlined className="mr-5" /> Import Sub-Admin List
      </Menu.Item>
    </Menu>
  );
  const handleCloseUploadCSVPopup = () => {
    setIsShowImportStudentPopup(false);
  };

  const handleConfirmDeleteClass = subAdmin => {
    setSelectedSubAdmin(subAdmin);
    setDeletePopupVisible(true);
  };

 
  const handleDeleteConfirmation = () => {
    const { id } = selectedSubAdmin;
    dispatch(removeSubSchoolAdmin(id));
    setDeletePopupVisible(false);
  };

  const handleCancelDelete = () => {
    setDeletePopupVisible(false);
  };

  // const handleConfirmDeleteClass = SubSchoolAdmin => {
  //   const { id } = SubSchoolAdmin;
  //   Modal.confirm({
  //     title: (
  //       <>
  //         <span style={{ fontWeight: "500" }}>
  //           Are you sure you wish to delete{" "}
  //           <b>
  //             {SubSchoolAdmin.profile.first_name} {SubSchoolAdmin.profile.last_name}’s{" "}
  //           </b>
  //         </span>
  //         sub-admin account?
  //       </>
  //     ),
  //     width: 500,
  //     icon: <DeleteOutlined style={{ color: "#fa1414" }} />,
  //     okText: "Delete",
  //     cancelText: "Cancel",
  //     maskClosable: true,
  //     // okButtonProps: { size: "small", type: "danger" },
  //     // cancelButtonProps: { size: "small" },

  //     onOk() {
  //       dispatch(removeSubSchoolAdmin(id));
  //     }
  //   });
  // };
  const actionButtonMenu = (
    <Menu>
      <Menu.Item
        onClick={() => handleExportToCsv()}
        id="actionBtnExportCSV"
        // eslint-disable-next-line react/no-unknown-property
        useful="actionBtnExportCSV"
      >
        <DownloadOutlined className="mr-5" />
        Export CSV
      </Menu.Item>
    </Menu>
  );
  //csv download data
  const handleExportToCsv = () => {
    const csvData = !!subSchoolAdminList.length
      ? subSchoolAdminList.map((schoolAdmin, i) => {
          const first_name = "Name";
          const email = "Email";
          const is_email_verified = "Invitation";

          return {
            [first_name]: `${schoolAdmin?.profile?.first_name}, ${schoolAdmin?.profile?.last_name}` || "",
            [email]: schoolAdmin.email || "",
            [is_email_verified]: schoolAdmin.is_email_verified === 1 ? "Accepted" : "Invite Sent" || ""
          };
        })
      : [];
    DownloadCSV({
      csvData,
      exportFileName: `Sub School Admin`
    });
  };
  const columns = [
    {
      isShow: true,
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      align: "left",
      showSorterTooltip: false,
      sorter: (a, b) => a.profile.first_name.localeCompare(b.profile.first_name),
      sortOrder: sortedInfo.columnKey === "first_name" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <>
              <div>{`${record?.profile?.last_name},  ${record?.profile?.first_name}`}</div>
            </>
          )
        };
      },
      width: width > 1300 ? undefined : 180
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
      render(text, record) {
        return {
          children: <div>{record.email}</div>
        };
      }
    },
    // {
    //   title: "School District Name",
    //   dataIndex: "school_district_name",
    //   key: "school_district_name",
    //   align: "left",
    //   showSorterTooltip: false,
    //   sorter: (a, b) =>
    //     a.school_district_name.localeCompare(b.school_district_name),
    //   sortOrder:
    //     sortedInfo.columnKey === "school_district_name" && sortedInfo.order,
    //   render(text, record) {
    //     return {
    //       children: <div>{record.school_district_name}</div>,
    //     };
    //   },
    // },
    {
      isShow: true,
      title: "Invitation/Password Reset",
      dataIndex: "is_email_verified",
      key: "is_email_verified",
      align: "left",
      width: 250,
      showSorterTooltip: false,
      sorter: (a, b) => +a.is_email_verified - +b.is_email_verified,
      sortOrder: sortedInfo.columnKey === "is_email_verified" && sortedInfo.order,
      render(text, record, index) {
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

              <Button type="link" onClick={() => handleResendInvitation(record)}>
                Resend
              </Button>
            </>
          )
        };
      }
    },
    // {
    //   title: "School License",
    //   dataIndex: "school_license",
    //   key: "school_license",
    //   align: "left",
    //   showSorterTooltip: false,
    //   sorter: (a, b) => a.max_schools_license - b.max_schools_license,
    //   render(text, record) {
    //     return {
    //       children: (
    //         <div>
    //           <Progress
    //             percent={round(
    //               (record.created_schools_count / record.max_schools_license) *
    //                 100,
    //             )}
    //           />
    //           <span>
    //             {record.created_schools_count} /{record.max_schools_license}
    //           </span>
    //         </div>
    //       ),
    //     };
    //   },
    // },
    // {
    //   title: "License",
    //   dataIndex: "teacher_license",
    //   key: "teacher_license",
    //   align: "left",
    //   showSorterTooltip: false,
    //   sorter: (a, b) => a.max_teachers_license - b.max_teachers_license,
    //   render(text, record) {
    //     return {
    //       children: (
    //         <div>
    //           <Progress
    //             percent={round(
    //               (record.created_teachers_count /
    //                 record.max_teachers_license) *
    //                 100,
    //             )}
    //           />
    //           <span>
    //             {record.created_teachers_count} /{record.max_teachers_license}
    //           </span>
    //         </div>
    //       ),
    //     };
    //   },
    // },

    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    //   align: "center",
    //   showSorterTooltip: false,
    //   sorter: (a, b) => a.password.localeCompare(b.password),
    //   sortOrder: sortedInfo.columnKey === "password" && sortedInfo.order,
    //   render(text, record) {
    //     return {
    //       children: <div>{record.password}</div>,
    //     };
    //   },
    // },

    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    //   align: "center",
    //   showSorterTooltip: false,
    //   render(text, record) {
    //     return {
    //       children: (
    //         <div>
    //           <button
    //             type="button"
    //             className="btn-icon-trans edit"
    //             onClick={() => handleEditPassword(record)}
    //           >
    //             {/* <i className="icon-edit" aria-hidden="true"></i> */}
    //             <EditOutlined />
    //           </button>
    //         </div>
    //       ),
    //     };
    //   },
    // },
    // informative actions
    {
      isShow: isNormalUser(userDetails) ? true : false,
      title: "Actions",
      dataIndex: "informative_actions",
      key: "informative_actions",
      align: "center",
      showSorterTooltip: false,
      render(text, record) {
        return {
          props: {
            style: { align: "center" }
          },
          children: (
            <div>
              <button type="button" className="btn-icon-trans edit" onClick={() => handleEditSubSchoolAdmin(record)}>
                <EditOutlined />
              </button>
              <button
                style={{ marginLeft: "6px" }}
                type="button"
                className="btn-icon-trans delete"
                onClick={() => handleConfirmDeleteClass(record)}
              >
                <DeleteOutlined />
              </button>
            </div>
          )
        };
      },
      width: width > 1300 ? undefined : 180
    }
    // {
    //   title: "Resend Invitation",
    //   dataIndex: "Send",
    //   key: "Send",
    //   align: "center",
    //   showSorterTooltip: false,
    //   render(text, record) {
    //     return {
    //       children:
    //         record.is_email_verified === 0 ? (
    //           <div>
    //             <Button
    //               onClick={() => handleResendInvitation(record)}
    //               type="text"
    //               style={{ color: "#1890ff" }}
    //             >
    //               Send
    //             </Button>
    //           </div>
    //         ) : null,
    //     };
    //   },
    // },
  ];
  const updatedColumList = columns.filter(column => column.isShow);
  return (
    <Container fluid>
      <Section
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4} className={"tab-heading"}>
              Sub Admins
              <span className="table-header-counter">
                <Tag> {subSchoolAdminList?.length}</Tag>
              </span>
            </Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 20 }}>
                <Dropdown type="primary" overlay={actionButtonMenu} trigger={["click"]}>
                  <Button>
                    <Space>
                      Actions
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>

              <div className="joyride-4">
                <Dropdown type="primary" overlay={addStudentMenu} trigger={["hover"]}>
                  <Button type="primary">
                    Add Sub-Admins <PlusOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            {/* <Button
              type="primary"
              onClick={() => handleEditSubSchoolAdmin({})}
            >
              Add Sub Admins
              <PlusOutlined />
            </Button> */}
          </div>
        }
      >
        {/* CHANGE THIS REQUIRED */}
        <Table
          columns={updatedColumList}
          dataSource={subSchoolAdminList}
          onChange={handleChangeTable}
          loading={loading}
          // scroll={{ y: "calc(100vh - 300px)", x: "1150" }}
          scroll={{
            y: height - 300,
            x: width - 300
          }}
          pagination={false}
          size="middle"
          virtual
        />
        {/* {isOpenPasswordDialog && (
          <PasswordDialog
            open={isOpenPasswordDialog}
            user={selectedUser}
            handleClose={handleClosePasswordDialog}
          />
        )} */}

        {/* {isOpenSubSchoolAdminDialog && ( */}
        <SubSchoolAdminDialog
          open={isOpenSubSchoolAdminDialog}
          handleClose={handleCloseSubSchoolAdminDialog}
          user={selectedUser}
          isEdit={!isEmpty(selectedUser)}
          setIsShowSchoolDialog={isShowSchoolPopUp}
          maskClosable={false}
          isShowSchoolDialog={isShowSchoolDialog}
        />
        {/* )} */}
        {isShowImportStudentPopup && (
          <ImportSubSchoolAdminListPopup
            isOpenPopup={isShowImportStudentPopup}
            closePopup={handleCloseUploadCSVPopup}
          />
        )}

        {/* {isShowSchoolDialog ? ( */}
        <ErrorBoundary>
          <SchoolDialog
            open={isShowSchoolDialog}
            closeClassCodePopup={handleCloseSubSchoolAdminDialog}
            isEditMode={false}
            activeSchool={null}
            loading={addNewSchoolLoading}
          />
        </ErrorBoundary>
        {/* ) : (
          ""
        )} */}
        {isDeletePopupVisible && (
          <DeletePopup
            open={isDeletePopupVisible}
            success={handleDeleteConfirmation}
            text={
              <>
                <span style={{ fontWeight: "500" }}>
                  Are you sure you wish to delete{" "}
                  <b>
                    {selectedSubAdmin.profile.first_name} {selectedSubAdmin.profile.last_name}’s{" "}
                  </b>
                </span>
                sub-admin account?
              </>
            }
            close={handleCancelDelete}
          />
        )}
      </Section>
    </Container>
  );
}
