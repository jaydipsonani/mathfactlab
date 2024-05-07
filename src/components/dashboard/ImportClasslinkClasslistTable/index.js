import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";

const ImportClasslinkClasslistTable = props => {
  const { classesList } = props;
  // const classes = useStyles();
  // const dispatch = useDispatch();
  const { fetchingAllUserListLoading } = useSelector(({ user }) => user);

  const { allClassCodeList } = useSelector(({ classCode }) => classCode);

  let classList = classesList || allClassCodeList;

  //assign key for antd table
  classList = classList.map(classDetails => {
    return {
      ...classDetails,
      key: classDetails.google_classroom_id || classDetails.class_link_sourced_id
    };
  });

  const syncedClassCodeList = allClassCodeList
    .filter(classDetails => classDetails.is_import)
    .map(classDetails => {
      return classDetails.google_classroom_id;
    });

  const [selectedRowKeys, setSelectedRowKeys] = useState(syncedClassCodeList || []);

  //Default set last name ascend order
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

  // const [sortedInfo, setSortedInfo] = useState({});
  const handleChangeTable = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    // {
    //   title: "",
    //   dataIndex: "is_google_class",
    //   key: "is_google_class",
    //   align: "center",
    //   render(text, record) {
    //     return {
    //       children: (
    //         <div>
    //           {!!record.profile.is_imported_from_google && (
    //             <img
    //               src={googleIcon}
    //               alt="google-icon"
    //               className={classes.googleIcon}
    //             />
    //           )}
    //         </div>
    //       ),
    //     };
    //   },
    // },

    {
      title: "Class Name",
      dataIndex: "class_name",
      key: "class_name",
      align: "left",

      showSorterTooltip: false,

      sorter: (a, b) => (+a.class_name > +b.class_name ? -1 : 1),
      sortOrder: sortedInfo.columnKey === "class_name" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div style={{ letterSpacing: 1 }}>{record.class_name}</div>
        };
      }
    }
    // {
    //   title: "Classlink Sourced Id",
    //   dataIndex: "class_link_sourced_id",
    //   key: "class_link_sourced_id",
    //   align: "left",
    //   showSorterTooltip: false,
    //   sorter: (a, b) =>
    //     +a.class_link_sourced_id > +b.class_link_sourced_id ? -1 : 1,
    //   sortOrder:
    //     sortedInfo.columnKey === "class_link_sourced_id" && sortedInfo.order,
    //   render(text, record) {
    //     console.log("🚀 ~ file: index.js:108 ~ render ~ record:", record);
    //     return {
    //       children: (
    //         <div style={{ letterSpacing: 1 }}>
    //           {record.class_link_sourced_id}
    //         </div>
    //       ),
    //     };
    //   },
    // },
    // {
    //   title: "Students",
    //   dataIndex: "students",
    //   key: "students",
    //   align: "center",

    //   showSorterTooltip: false,

    //   sorter: (a, b) => (+a.students > +b.students ? -1 : 1),
    //   sortOrder: sortedInfo.columnKey === "students" && sortedInfo.order,
    //   render(text, record) {
    //     return {
    //       children: (
    //         <div>
    //           {record.is_import ? (
    //             <span style={{ opacity: "0.6" }}>Already synced</span>
    //           ) : (
    //             record.students
    //           )}
    //         </div>
    //       ),
    //     };
    //   },
    // },
  ];

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
    props.handleChangeSelectedRawKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: Boolean(record.is_import)
    })
  };

  // const handleSuccessAddSelectedClass = () => {
  //   dispatch(getClassCodeList());
  //   props.closeClassCodeSelectDailog();
  // };

  // const handleAddSelectedClass = () => {
  //   dispatch(
  //     syncSelectedClass(
  //       selectedRowKeys.toString(),
  //       handleSuccessAddSelectedClass,
  //     ),
  //   );
  // };

  // const handleCloseDailog = () => {
  //   props.closeClassCodeSelectDailog();
  // };

  return (
    <div>
      {/* <div style={{display : "flex",alignItems : "center"}}> 
      <img src={"https://edu.google.com/images/classroom/classroom-icon/hero_logo.png"} alt="googleclassroom" style={{ width : "48px",height :"48px",marginRight : "16px"}}></img>
      <div>
        <div style={{fontWeight : "600"}}>ROhit kothiya</div>
        <div>rohit.kothiay20121@gmail.com</div>
      </div>
    </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "8px 0px"
        }}
      >
        <div>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} classes` : "Selected 0 classes"}
          </span>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={classList}
        onChange={handleChangeTable}
        loading={fetchingAllUserListLoading}
        pagination={false}
        scroll={{ y: "calc(100vh - 500px)" }}
      />
    </div>
  );
};

export default ImportClasslinkClasslistTable;
