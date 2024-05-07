import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Form, Input } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addNewSchool } from "../../../redux/actions";
import "assets/sass/components/button-ant.scss";

const Step3 = props => {
  const {
    handleNextNewUser,
    handleBackNewUser,
    handleSchoolName,

    studentsName
    // studentNameInputText,
  } = props;
  // Error Variables
  const dispatch = useDispatch();

  const handleSaveStudents = () => {
    const schools = studentsName.map(name => ({ name }));

    const body = {
      schools
    };

    dispatch(addNewSchool(body));

    // Proceed to the next step
    handleNextNewUser();
  };

  const handleNext = () => {
    handleSaveStudents();
  };
  const handleBack = () => {
    handleSchoolName([]);
    handleBackNewUser();
  };
  const schoolNameString = studentsName.map((school, index) => ({
    key: index,
    name: school
  }));

  const handleDelete = key => {
    const newData = studentsName.filter((_, item) => item !== key);
    props.setStudentsName(newData);
  };
  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values
        });
        form.submit(); // Submit the form after handling save
      } catch (errInfo) {
        console.error("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const handleSave = row => {
    const newData = [...schoolNameString];

    const index = newData.findIndex(item => row.key === item.key);

    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row
    });
    props.setStudentsName(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true
    },
    {
      title: "Actions",
      dataIndex: "action",
      align: "center",
      render(text, record, index) {
        return {
          props: {
            style: { align: "center" }
          },
          children: (
            <div>
              {/* <button
                type="button"
                className="btn-icon-trans edit"
                // onClick={() => handleEditStudent(record)}
              >
                <EditOutlined />
              </button> */}
              <button
                style={{ marginLeft: "6px" }}
                type="button"
                className="btn-icon-trans delete"
                onClick={() => handleDelete(index)} // Pass the record key here
              >
                <DeleteOutlined />
              </button>
            </div>
          )
        };
      }
    }
  ];
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });
  // const schoolNameString = studentsName.map(school => `${school}`);
  return (
    <>
      <div className="step-3">
        <div className="header-classes-text">Download/Copy School Codes</div>
        <div className="step-3-inner">
          <div className="step-3-inner-left">
            <div>
              <div className="list-title">
                As you can see, each school that you have created has been assigned a simple letter code.
              </div>
              <div className="list-title">
                You will need these school codes if you are assigning any sub-administrators.
              </div>
              <div className="list-title">
                This list may be very short, but if longer, downloading the list of school codes may make it easier for
                you to copy and paste them into .csv files as needed in the next steps.
              </div>
              <div className="list-title">You can always add more schools at any time by going to the Schools tab</div>
            </div>
          </div>
          <div className="step-3-inner-right">
            {/* <TextArea
              className="multiple-std-text-input-classes"
              placeholder={`School 
${schoolNameString}
`}
              // onChange={handleStudentNameInputText}
              defaultValue={studentsName.length > 0 ? studentNameInputText : ""}
              disabled

            ></TextArea> */}
            <Table
              className="multiple-std-text-input-classes"
              dataSource={schoolNameString}
              rowClassName={() => "editable-row"}
              columns={columns}
              pagination={false}
              size="middle"
              components={components}
              // style={{
              //   border: "1px solid #ccc",
              //   borderRadius: "5px",
              // }}
            />
          </div>
        </div>
      </div>

      <div className="welcome-step-popup-footer">
        <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div>
        <div className={"next-nav-btn"} onClick={handleNext}>
          Next <ArrowRightOutlined />
        </div>
      </div>
    </>
  );
};

export default Step3;
