import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { roundToTwoDecimals, isNormalUser } from "utils/helpers";
import { userRole } from "config/const";

const SchoolAdminTable = props => {
  const { classCodeList } = props;
  const navigate = useNavigate();
  // const { fetchingAllClassCodeListLoading: loading } = useSelector(
  //   state => state.classCode,
  // );
  const { fetchingAllClassCodeListLoading: loading = false } = useSelector(state => state.classCode || {});

  const [sortedInfo, setSortedInfo] = useState({});
  const [width, height] = useWindowSize();
  const {
    userDetails: { role_id },
    userDetails
  } = useSelector(({ auth }) => auth);

  const { schoolData } = useSelector(({ schoolData }) => schoolData);
  const handleChangeTable = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleEditTeacher = TeacherData => {
    props.showEditSchoolDialog(TeacherData);
  };

  const handleDeleteTeacher = TeacherData => {
    props.showDeleteSchoolDialog(TeacherData);
  };

  //show StudentLists
  const handleShowStudentList = record => {
    navigate(`/teacher/students?class_code=${record.class_code}`);
  };

  const columns = [
    {
      isShow: true,
      title: "Class Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 260,
      showSorterTooltip: false,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.name} </div>
        };
      }
      // width: width > 1300 ? undefined : 250,
    },
    {
      isShow: true,
      title: "Class Code",
      dataIndex: "class_code",
      key: "class_code",
      align: "left",
      width: 140,
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
      isShow: true,
      title: "School",
      dataIndex: "school",
      key: "school",
      align: "left",
      width: 140,
      showSorterTooltip: false,
      sorter: (a, b) => a.school.name.localeCompare(b.school.name),
      sortOrder: sortedInfo.columnKey === "school" && sortedInfo.order,
      render(text, record) {
        const getSchoolName = schoolData.find(school => school.id === record.school_id)?.name;
        return {
          children: (
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "250px"
              }}
            >
              {record.school?.name ? record.school?.name : getSchoolName}
            </div>
          )
        };
      },

      ellipsis: true
    },
    // {
    //   title: "Teacher(s)",
    //   dataIndex: "Teacher(s)",
    //   key: "Teacher(s)",
    //   align: "center",
    //   showSorterTooltip: false,
    //   sorter: (a, b) => a.user_name.localeCompare(b.Email),
    //   sortOrder: sortedInfo.columnKey === "Teacher(s)" && sortedInfo.order,
    // },
    {
      isShow: true,
      title: "Students",
      dataIndex: "students_count",
      key: "students_count",
      align: "center",
      width: 100,
      showSorterTooltip: false,
      sorter: (a, b) => a.students_count - b.students_count,
      sortOrder: sortedInfo.columnKey === "students_count" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <div
              onClick={() => handleShowStudentList(record)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* <button type="button" className="btn-icon-trans edit">
                <i className="icon-students" aria-hidden="true"></i>
              </button>{" "} */}
              <span>{record.students_count ? record.students_count : 0} </span>
            </div>
          )
        };
      }
    },
    {
      isShow: true,
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "24px"
          }}
        >
          <i
            style={{ fontSize: "16px", minWidth: "44px", padding: "4px" }}
            className="icon-add-sub"
            aria-hidden="true"
          ></i>
          <span>Students</span>
        </div>
      ),

      dataIndex: "students_with_add_sub_learning_mode_count",
      key: "students_with_add_sub_learning_mode_count",
      align: "center",
      width: 100,
      showSorterTooltip: false,
      sorter: (a, b) => a.students_with_add_sub_learning_mode_count - b.students_with_add_sub_learning_mode_count,

      sortOrder: sortedInfo.columnKey === "students_with_add_sub_learning_mode_count" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <div>
              {record.students_with_add_sub_learning_mode_count ? record.students_with_add_sub_learning_mode_count : 0}
            </div>
          )
        };
      }
    },
    {
      isShow: true,
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "24px"
          }}
        >
          <i
            style={{ fontSize: "16px", minWidth: "44px", padding: "4px" }}
            className="icon-mul-div "
            aria-hidden="true"
          ></i>
          <span>Students</span>
        </div>
      ),
      dataIndex: "students_with_mul_div_learning_mode_count",
      key: "students_with_mul_div_learning_mode_count",
      align: "center",
      showSorterTooltip: false,
      sorter: (a, b) => a.students_with_mul_div_learning_mode_count - b.students_with_mul_div_learning_mode_count,
      width: 100,
      sortOrder: sortedInfo.columnKey === "students_with_mul_div_learning_mode_count" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <div>
              {record.students_with_mul_div_learning_mode_count ? record.students_with_mul_div_learning_mode_count : 0}
            </div>
          )
        };
      }
    },
    {
      isShow: true,
      title: "Passed levels per student",
      dataIndex: "passed_level_lifter_submissions_count",
      key: "passed_level_lifter_submissions_count",
      align: "center",
      width: 150,
      showSorterTooltip: false,
      sorter: (recordA, recordB) => {
        let a = 0;
        let b = 0;

        if (+recordA.passed_level_lifter_submissions_count && recordA.students_count) {
          a = roundToTwoDecimals(+recordA.passed_level_lifter_submissions_count / recordA.students_count);
        }
        if (+recordB.passed_level_lifter_submissions_count && recordB.students_count) {
          b = roundToTwoDecimals(+recordB.passed_level_lifter_submissions_count / recordB.students_count);
        }
        return a - b;
      },

      sortOrder: sortedInfo.columnKey === "passed_level_lifter_submissions_count" && sortedInfo.order,
      render(text, record) {
        const { passed_level_lifter_submissions_count, students_count } = record;

        let passedLevelLifterRatio = 0;

        if (+passed_level_lifter_submissions_count && students_count) {
          passedLevelLifterRatio = roundToTwoDecimals(+passed_level_lifter_submissions_count / students_count);
        }

        return {
          children: <div>{passedLevelLifterRatio}</div>
        };
      }
    },
    {
      isShow: true,
      title: "Sessions per student",
      dataIndex: "students_sessions_count",
      key: "students_sessions_count",
      align: "center",
      width: 150,
      showSorterTooltip: false,
      sorter: (recordA, recordB) => {
        let a = 0;
        let b = 0;

        if (+recordA.students_sessions_count && recordA.students_count) {
          a = roundToTwoDecimals(+recordA.students_sessions_count / recordA.students_count);
        }
        if (+recordB.students_sessions_count && recordB.students_count) {
          b = roundToTwoDecimals(+recordB.students_sessions_count / recordB.students_count);
        }
        return a - b;
      },
      sortOrder: sortedInfo.columnKey === "students_sessions_count" && sortedInfo.order,
      render(text, record) {
        const { students_sessions_count, students_count } = record;

        let studentSessionCountRatio = 0;

        if (+students_sessions_count && students_count) {
          studentSessionCountRatio = roundToTwoDecimals(+students_sessions_count / students_count);
        }
        return {
          children: <div>{studentSessionCountRatio}</div>
        };
      }
    },
    {
      isShow: true,
      title: "Minutes per student",
      dataIndex: "students_total_time_spent_in_mins",
      key: "students_total_time_spent_in_mins",
      align: "center",
      width: 150,
      showSorterTooltip: false,
      sorter: (recordA, recordB) => {
        let a = 0;
        let b = 0;

        if (+recordA.students_total_time_spent_in_mins && recordA.students_count) {
          a = roundToTwoDecimals(+recordA.students_total_time_spent_in_mins / recordA.students_count);
        }
        if (+recordB.students_total_time_spent_in_mins && recordB.students_count) {
          b = roundToTwoDecimals(+recordB.students_total_time_spent_in_mins / recordB.students_count);
        }
        return a - b;
      },

      sortOrder: sortedInfo.columnKey === "students_total_time_spent_in_mins" && sortedInfo.order,
      render(text, record) {
        const { students_total_time_spent_in_mins, students_count } = record;

        let studentTotalSessionMinRatio = 0;

        if (+students_total_time_spent_in_mins && students_count) {
          studentTotalSessionMinRatio = roundToTwoDecimals(+students_total_time_spent_in_mins / students_count);
        }
        return {
          props: {
            style: { align: "center" }
          },
          children: <div>{studentTotalSessionMinRatio}</div>
        };
      }
    },
    {
      isShow: isNormalUser(userDetails) ? true : false,
      title: "Actions",
      dataIndex: "informative_actions",
      key: "informative_actions",
      align: "center",
      width: 160,
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
              {role_id === userRole.SCHOOL_ADMIN.role_id ? (
                <button
                  style={{ marginLeft: "6px" }}
                  type="button"
                  className="btn-icon-trans delete"
                  onClick={() => handleDeleteTeacher(record)}
                >
                  <DeleteOutlined />
                </button>
              ) : (
                ""
              )}
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
        dataSource={classCodeList}
        onChange={handleChangeTable}
        loading={loading}
        // scroll={{ y: "calc(100vh - 300px)" }}
        scroll={{
          y: height - 325,
          x: width - 400
        }}
        pagination={false}
        rowKey={record => record.id}
        virtual
      />
    </>
  );
};

export default SchoolAdminTable;
