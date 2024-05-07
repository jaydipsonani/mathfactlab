import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getClassCodeList } from "../../../redux/actions/classCodeAction";
import { userRole } from "config/const";
import { removeInvitedEmail, roundToTwoDecimals, isNormalUser } from "utils/helpers";

const SchoolTable = props => {
  const dispatch = useDispatch();
  const { schoolData } = props;

  const { classCodeList } = useSelector(({ classCode }) => classCode);
  // const classCodeList = useSelector((state) => state.classCodeList);
  // const [width, height] = useWindowSize();

  const updateSchoolData = schoolData.map((school, index) => {
    const classListBySchool = classCodeList.filter(classItem => classItem.school_id === school.id);
    const totalStudentCount = classListBySchool.reduce((acc, current) => acc + current.students_count, 0);

    // session count ratio

    const totalSessionsCount = classListBySchool.reduce((acc, current) => acc + +current.students_sessions_count, 0);

    let studentSessionCountRatio = 0;

    if (totalSessionsCount && totalStudentCount) {
      studentSessionCountRatio = roundToTwoDecimals(totalSessionsCount / totalStudentCount);
    }

    //   // session mins ratio

    const totalTimeSpent = classListBySchool.reduce(
      (acc, current) => acc + +current.students_total_time_spent_in_mins,
      0
    );
    let studentTotalSessionMinRatio = 0;

    if (totalTimeSpent && totalStudentCount) {
      studentTotalSessionMinRatio = roundToTwoDecimals(totalTimeSpent / totalStudentCount);
    }
    // passed level lifter ration
    const passedLevelLifterCount = classListBySchool.reduce(
      (acc, current) => acc + +current.passed_level_lifter_submissions_count,
      0
    );
    let passedLevelLifterRatio = 0;

    if (passedLevelLifterCount && totalStudentCount) {
      passedLevelLifterRatio = roundToTwoDecimals(passedLevelLifterCount / totalStudentCount);
    }
    //CHANGE_THIS
    return Object.assign(
      { ...school },
      {
        classes_count: classListBySchool.length,
        students_count: totalStudentCount,
        students_sessions_count: studentSessionCountRatio,
        students_total_time_spent_in_mins: studentTotalSessionMinRatio,
        passed_level_lifter_submissions_count: passedLevelLifterRatio
      }
    );
  });

  // const history = useHistory();
  const { fetchingAllSchoolDataLoading: loading } = useSelector(({ schoolData }) => schoolData);
  // const { fetchingAllSchoolDataLoading: loading } = useSelector(
  //   (state) => state.schoolData
  // );

  const { userDetails } = useSelector(({ auth }) => auth);

  const [sortedInfo, setSortedInfo] = useState({});

  const handleChangeTable = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleEditSchool = activeSchool => {
    props.showEditSchoolDialog(activeSchool);
  };

  const handleDeleteSchool = activeSchool => {
    props.showDeleteSchoolDialog(activeSchool);
  };
  //show TeacherList
  // const handleShowTeacherList = record => {
  //   history.push(
  //     `/school-admin/teacher?school_code=${record.school_code_identifier}`,
  //   );
  // };

  //show ClassList
  // const handleShowClassesList = record => {
  //   history.push(
  //     `/school-admin/classes?school_code=${record.school_code_identifier}`,
  //   );
  // };

  //show StudentLists
  // const handleShowStudentList = record => {
  //   history.push(
  //     `/teacher/students?school_code=${record.school_code_identifier}`,
  //   );
  // };

  useEffect(() => {
    dispatch(getClassCodeList());
  }, [classCodeList.length]); // eslint-disable-line

  const columns = [
    {
      isShow: true,
      title: "School Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 250,
      showSorterTooltip: false,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.name}</div>
        };
      }
    },
    {
      isShow: true,
      title: "School Code",
      width: 140,
      dataIndex: "school_code_identifier",
      key: "school_code_identifier",
      align: "center",
      showSorterTooltip: false,
      sorter: (a, b) => a.school_code_identifier - b.school_code_identifier,
      sortOrder: sortedInfo.columnKey === "school_code_identifier" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.school_code_identifier}</div>
        };
      }
    },
    {
      isShow: true,
      title: "Administrator(s)",
      dataIndex: "administrator",
      key: "administrator",
      align: "left",
      width: 300,
      showSorterTooltip: false,
      // sorter: (a, b) => a.administrator.localeCompare(b.administrator),
      // sortOrder: sortedInfo.columnKey === "administrator" && sortedInfo.order,
      render(text, record) {
        const { role_id, email } = userDetails;
        let assignedAdminEmailList = record?.access_user_emails?.split(",");

        if (role_id === userRole.SCHOOL_ADMIN.role_id) {
          assignedAdminEmailList = assignedAdminEmailList.filter(userEmail => !userEmail.includes(email));
        }

        return {
          children: (
            <div
              style={{
                maxHeight: "60px",
                overflowY: "auto"
              }}
            >
              {assignedAdminEmailList?.map((email, i) => (
                <div key={i} className="mt-5">
                  <Tag>{email && removeInvitedEmail(email)}</Tag>
                </div>
              ))}
            </div>
          )
        };
      }
    },
    // {
    //   isShow: process.env.REACT_APP_ENV === "development",
    //   title: "Teachers",
    //   dataIndex: "teachers_count",
    //   key: "teachers_count",
    //   align: "center",
    //   showSorterTooltip: false,
    //   sorter: (a, b) => a.teachers_count - b.teachers_count,
    //   sortOrder: sortedInfo.columnKey === "teachers_count" && sortedInfo.order,
    //   render(text, record) {
    //     return {
    //       children: (
    //         <div
    //           // onClick={() => handleShowTeacherList(record)}
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           {record.teachers_count}
    //           {/* <span style={{ color: "#2b95f9" }}>{record.student_count} </span> */}
    //         </div>
    //       ),
    //     };
    //   },
    // },
    {
      isShow: true,
      title: "Classes",
      dataIndex: "classes_count",
      key: "classes_count",
      width: 100,
      align: "center",
      showSorterTooltip: false,
      sorter: (a, b) => a.classes_count - b.classes_count,
      sortOrder: sortedInfo.columnKey === "classes_count" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <div
              // onClick={() => handleShowClassesList(record)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {record.classes_count}
              {/* <span style={{ color: "#2b95f9" }}>{record.student_count} </span> */}
            </div>
          )
        };
      }
    },
    {
      isShow: true,
      title: "Students",
      dataIndex: "students_count",
      key: "students_count",
      width: 100,

      showSorterTooltip: false,
      sorter: (a, b) => a.students_count - b.students_count,
      sortOrder: sortedInfo.columnKey === "students_count" && sortedInfo.order,
      align: "center",
      render(text, record) {
        return {
          children: (
            <div
              // onClick={() => handleShowStudentList(record)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* <button type="button" className="btn-icon-trans edit">
                <i className="icon-students" aria-hidden="true"></i>
              </button>{" "} */}
              <span>{record.students_count} </span>
            </div>
          )
        };
      }
    },
    {
      title: "Available Licenses",
      dataIndex: "available_Licenses",
      key: "available_Licenses",
      align: "center",
      width: 240,
      sorter: (a, b) => a.available_Licenses - b.available_Licenses,
      sortOrder: sortedInfo.columnKey === "available_Licenses" && sortedInfo.order,
      render(text, record) {
        return {
          children: (
            <div
              // onClick={() => handleShowStudentListByClassCode(record)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {record.available_Licenses}
              {/* <span style={{ color: "#2b95f9" }}>{record.student_count} </span> */}
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
      sorter: (a, b) => a.passed_level_lifter_submissions_count - b.passed_level_lifter_submissions_count,
      sortOrder: sortedInfo.columnKey === "passed_level_lifter_submissions_count" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record?.passed_level_lifter_submissions_count}</div>
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
      sorter: (a, b) => a.students_sessions_count - b.students_sessions_count,
      sortOrder: sortedInfo.columnKey === "students_sessions_count" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.students_sessions_count}</div>
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
      sorter: (a, b) => a.students_total_time_spent_in_mins - b.students_total_time_spent_in_mins,
      sortOrder: sortedInfo.columnKey === "students_total_time_spent_in_mins" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.students_total_time_spent_in_mins}</div>
        };
      }
    },

    // informative actions
    {
      // isShow: userDetails.profile.type === 'primary',
      isShow: userDetails.profile.type === "primary" && isNormalUser(userDetails),
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
              <button type="button" className="btn-icon-trans edit" onClick={() => handleEditSchool(record)}>
                <EditOutlined />
              </button>
              <button
                style={{ marginLeft: "6px" }}
                type="button"
                className="btn-icon-trans delete"
                onClick={() => handleDeleteSchool(record)}
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
    <Table
      columns={updatedColumList}
      dataSource={updateSchoolData}
      onChange={handleChangeTable}
      loading={loading}
      scroll={{ y: 600, virtual: true }} // Enable virtual scrolling
      pagination={false}
      rowKey={record => record.id}
      virtual
    />
  );
};
export default SchoolTable;
