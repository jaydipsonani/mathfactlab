import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Drawer, Button, Space, Select, Card, Checkbox, Input, Row, Col, Divider, Flex } from "antd";
import { addTeacher, editTeacher } from "../../../redux/actions/teacherAction";

const TeacherDialog = props => {
  const dispatch = useDispatch();
  const { isEditMode, activeUser, open } = props;
  const [form] = Form.useForm(); // Using Form.useForm() instead of useForm hook

  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { userDetails } = useSelector(({ auth }) => auth);

  const classCodeListOption = [
    ...(Array.isArray(classCodeList)
      ? classCodeList.map(classCode => {
          return {
            label: `${classCode.name} - ${classCode.class_code}`,
            value: `${classCode.id}`,
            key: `${classCode.id}`
          };
        })
      : [])
  ];

  const { addNewTeacherLoading, editNewTeacherLoading } = useSelector(({ teacherData }) => teacherData);
  const loading = addNewTeacherLoading || editNewTeacherLoading;

  const [selectedClassesValues, setSelectedClassesValues] = useState([]);
  const [searchClass, setSearchClass] = useState("");

  useEffect(() => {
    if (open) {
      form.resetFields();
      setSelectedClassesValues([]);

      if (isEditMode && activeUser) {
        const { profile, email, classes } = activeUser;
        const { first_name, last_name } = profile || {};

        form.setFieldsValue({
          first_name,
          last_name,
          email,
          class_ids: classes ? classes.ids?.split(",").filter(id => id !== "") : []
        });

        setSelectedClassesValues(classes?.ids?.split(",").filter(id => id !== "") || []);
      }
    }
  }, [isEditMode, activeUser, form, open]);

  const handleClose = () => {
    props.closeTeacherDialog();
  };

  const handleSuccess = data => {
    props.closeTeacherDialog();
  };

  const handleChangeClassSearchText = e => {
    setSearchClass(e.target.value);
  };

  const handleClassCheckboxChange = values => {
    setSelectedClassesValues(values);
    form.setFieldsValue({ class_ids: values });
  };

  const handleSubmitForm = data => {
    const { last_name, first_name, email, class_ids = [] } = form.getFieldsValue();

    if (isEditMode) {
      const { first_name, last_name } = data;

      const assignedClassList = Array.isArray(classCodeList)
        ? classCodeList.filter(classDetails => selectedClassesValues.includes(classDetails.id))
        : [];

      const updatedClassList = {
        ids: assignedClassList.map(item => item.id).join(","),
        names: assignedClassList.map(item => `${item.name} - ${item.class_code}`).join(",")
      };

      const updatedUserOnLocal = { ...activeUser, classes: updatedClassList };
     

      const body = {
        profile: {
          first_name,
          last_name
        },
        class_ids: class_ids
      };

      dispatch(editTeacher(updatedUserOnLocal, body, handleSuccess));
    } else {
      const body = {
        email: email,
        profile: {
          first_name: first_name,
          last_name: last_name
        },
        class_ids: class_ids,
        school_district_id: userDetails.school_district_id
      };

      dispatch(addTeacher(body, handleSuccess));
    }
  };

  const filteredClassCodeList = classCodeListOption.filter(option =>
    option.label.toLowerCase().includes(searchClass.toLowerCase())
  );

  return (
    <div>
      <Drawer
        closable={true}
        footer={null}
        title={isEditMode ? "Edit Teacher " : "New Teacher"}
        width={550}
        onClose={handleClose}
        open={open}
        destroyOnClose={true}
        extra={
          <>
            <Space>
              <Button onClick={() => handleClose()} disabled={loading}>
                Cancel
              </Button>

              <Button type="primary" htmlType="submit" disabled={loading} form="teacher-form">
                {isEditMode ? "Save" : "Add Teacher"}
              </Button>
            </Space>
          </>
        }
      >
        <Form
          form={form} // Pass the form instance to the Form component
          layout="vertical"
          onFinish={handleSubmitForm} // Using onFinish instead of onSubmit
          autoComplete="off"
          id="teacher-form"
          disabled={loading}
        >
          <Divider orientation="left" orientationMargin="0" style={{ fontWeight: "bold" }}>
            Profile
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Last name"
                name="last_name"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9'-]*$/,
                    message: "Please enter last name."
                  }
                ]}
              >
                <Input type="text" id="lname" placeholder="Please enter last name" autoFocus name="last_name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="first_name"
                label="First name"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9'-]*$/,
                    message: "Please enter first name."
                  }
                ]}
              >
                <Input type="text" id="fname" placeholder="Please enter first name" name="first_name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter email."
                  }
                ]}
              >
                <Input type="text" id="email" placeholder="Please enter email" name="email" disabled={isEditMode} />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left" style={{ fontWeight: "bold", marginTop: "40px" }} orientationMargin="0">
            Classes
          </Divider>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={
                  <Flex gap="middle" justify="space-between" style={{ width: "100%" }}>
                    <div>Select Class</div>
                    <Checkbox
                      checked={classCodeListOption.length === selectedClassesValues.length}
                      onChange={e => {
                        if (e.target.checked) {
                          const selectedAllClassIds = classCodeListOption.map(item => item.value);
                          setSelectedClassesValues(selectedAllClassIds);
                          form.setFieldsValue({ class_ids: selectedAllClassIds });
                        } else {
                          setSelectedClassesValues([]);
                          form.setFieldsValue({ class_ids: [] });
                        }
                      }}
                    >
                      Select All
                    </Checkbox>
                  </Flex>
                }
                name="class_ids"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select at least one class."
                //   }
                // ]}
              >
                <Select
                  id="class_list"
                  mode="multiple"
                  placeholder="Please select"
                  maxTagCount="responsive"
                  onChange={values => setSelectedClassesValues(values)}
                  style={{ width: "100%" }}
                  options={classCodeListOption}
                />
              </Form.Item>
              <Card
                title="Class Code List"
                style={{ marginTop: 26 }}
                extra={
                  <Input
                    type="text"
                    placeholder="Search class code"
                    value={searchClass}
                    onChange={e => handleChangeClassSearchText(e)}
                    suffix={<i className="icon-search" aria-hidden="true"></i>}
                  />
                }
              >
                <div
                  style={{
                    height: "100px",
                    overflowY: "scroll",
                    overflow: "auto"
                  }}
                >
                  {filteredClassCodeList.map(option => (
                    <div key={option.value} className="mb-5">
                      <Checkbox
                        value={option.value}
                        checked={selectedClassesValues.includes(option.value)}
                        onChange={e =>
                          handleClassCheckboxChange(
                            e.target.checked
                              ? [...selectedClassesValues, option.value]
                              : selectedClassesValues.filter(value => value !== option.value)
                          )
                        }
                      >
                        {option.label}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default TeacherDialog;
