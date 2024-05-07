import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space, Select, Divider, Card, Checkbox, Input, Form, Row, Col, Drawer, Flex } from "antd";
import { addSubSchoolAdmin, updateSubSchoolAdminByAdmin } from "../../../../redux/actions/subSchoolAdminAction";
import { getSchool } from "../../../../redux/actions";
import { userRole } from "config/const";

const SubSchoolAdminDialog = props => {
  const dispatch = useDispatch();
  const { user: activeUser = {}, isEdit: isEditMode = false, open } = props;
  const [form] = Form.useForm(); // Create form instance

  const { userDetails } = useSelector(({ auth }) => auth);
  const { addSubSchoolAdminListLoading, editSubSchoolAdminListLoading } = useSelector(
    ({ subSchoolAdminList }) => subSchoolAdminList
  );
  const loading = addSubSchoolAdminListLoading || editSubSchoolAdminListLoading;
  const { schoolData } = useSelector(({ schoolData }) => schoolData);

  const schoolListOption = [...schoolData.map(school => ({ label: school.name, value: school.id }))];

  const [selectedSchoolsValues, setSelectedSchoolsValues] = useState([]);

  const handleClose = () => {
    props.handleClose();
  };

  const handleSuccess = () => {
    props.handleClose();
  };

  const handleSchoolCheckboxChange = values => {
    setSelectedSchoolsValues(values);
    form.setFieldsValue({ school_ids: values });
  };

  const handleSubmitForm = () => {
    const { last_name, first_name, email, school_ids = [] } = form.getFieldsValue();

    // if (!school_ids || !school_ids.length) {
    //   school_ids = [];
    // }

    if (isEditMode) {
      // TODO Stop not needed API call if nothing is changed
      // const {
      //   profile: { first_name: old_first_name, last_name: old_last_name },
      //   schools: { ids: old_school_ids }
      // } = activeUser;

      // For local updates
      const assignedAssignedSchool = schoolData.filter(school => selectedSchoolsValues.includes(school.id));
      const updatedSchoolList = {
        ids: assignedAssignedSchool.map(item => item.id).join(","),
        names: assignedAssignedSchool.map(item => item.name).join(",")
      };

      const updatedUserOnLocal = Object.assign({}, activeUser, {
        schools: updatedSchoolList
      });

      // const body = {
      //   profile: {
      //     ...(last_name !== old_last_name && { last_name }),
      //     ...(first_name !== old_first_name && { first_name })
      //   },
      //   ...(school_ids !== old_school_ids && { school_ids })
      // };

      const body = {
        profile: {
          last_name,
          first_name
        },
        school_ids
      };

      dispatch(updateSubSchoolAdminByAdmin(updatedUserOnLocal, body, handleSuccess));
    } else {
      const body = {
        email,
        role_id: userRole.SCHOOL_ADMIN,
        school_district_id: userDetails.school_district_id,
        profile: {
          first_name,
          last_name,
          type: "secondary"
        },
        school_ids
      };

      dispatch(addSubSchoolAdmin(body, handleSuccess));
    }
  };

  const [searchSchool, setSearchSchool] = useState("");

  const filteredSchoolList = schoolListOption.filter(option =>
    option.label.toLowerCase().includes(searchSchool.toLowerCase())
  );

  useEffect(() => {
    if (!schoolData.length) {
      dispatch(getSchool());
    }
  }, [schoolData.length]); // eslint-disable-line

  useEffect(() => {
    if (open) {
      form.resetFields();
      setSelectedSchoolsValues([]);
      if (isEditMode && activeUser) {
        const { profile, email, schools } = activeUser;
        const { first_name, last_name } = profile || {};

        form.setFieldsValue({
          first_name,
          last_name,
          email,
          school_ids: schools ? schools.ids?.split(",").filter(id => id !== "") : []
        });

        setSelectedSchoolsValues(schools?.ids?.split(",").filter(id => id !== "") || []);
      }
      // else {
      //   form.setFieldsValue({
      //     first_name: "",
      //     last_name: "",
      //     email: "",
      //     school_ids: []
      //   });
      // }
    }
  }, [isEditMode, activeUser, form, open]); // eslint-disable-line

  return (
    <>
      <Drawer
        closable={true}
        footer={null}
        open={open}
        title={isEditMode ? "Edit Sub-Admin" : "New Sub-Admin"}
        width={550}
        onClose={handleClose}
        destroyOnClose={true}
        extra={
          <Space>
            <Button onClick={handleSuccess} disabled={loading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" form="student-form" disabled={loading}>
              {isEditMode ? "Save" : "Add Sub-Admin"}
            </Button>
          </Space>
        }
      >
        <Form disabled={loading} layout="vertical" id="student-form" form={form} onFinish={handleSubmitForm}>
          <Divider orientation="left" style={{ fontWeight: "bold" }} orientationMargin="0">
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
                    message: "Please enter alphabetic and numeric characters only."
                  }
                ]}
              >
                <Input type="text" id="lname" placeholder="Please enter last name" autoFocus name="last_name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="First name"
                name="first_name"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9'-]*$/,
                    message: "Please enter alphabetic and numeric characters only."
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
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address."
                  }
                ]}
              >
                <Input placeholder="Please enter email" disabled={isEditMode} />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left" style={{ fontWeight: "bold" }} orientationMargin="0">
            Schools
          </Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={
                  <Flex gap="middle" justify="space-between" style={{ width: "100%" }}>
                    <div>Select schools</div>
                    <Checkbox
                      checked={schoolListOption.length === selectedSchoolsValues.length}
                      onChange={e => {
                        if (e.target.checked) {
                          const selectedAllSchoolIds = schoolListOption.map(item => item.value);
                          setSelectedSchoolsValues(selectedAllSchoolIds);
                          form.setFieldsValue({ school_ids: selectedAllSchoolIds });
                        } else {
                          setSelectedSchoolsValues([]);
                          form.setFieldsValue({ school_ids: [] });
                        }
                      }}
                    >
                      Select All
                    </Checkbox>
                  </Flex>
                }
                name="school_ids"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select at least one school."
                //   }
                // ]}
              >
                <Select
                  id="school_list"
                  mode="multiple"
                  placeholder="Please select"
                  maxTagCount="responsive"
                  style={{ width: "100%" }}
                  options={schoolListOption}
                  onChange={values => setSelectedSchoolsValues(values)}
                />
              </Form.Item>
              <Form.Item label="" name="school_list_">
                <Card
                  title="School List"
                  size="small"
                  className="mt-10"
                  extra={
                    <Input.Search
                      placeholder="Search school"
                      value={searchSchool}
                      onChange={e => setSearchSchool(e.target.value)}
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
                    {filteredSchoolList.map(option => (
                      <div key={option.value} className="mb-5">
                        <Checkbox
                          value={option.value}
                          checked={selectedSchoolsValues?.includes(option.value)}
                          onChange={e =>
                            handleSchoolCheckboxChange(
                              e.target.checked
                                ? [...selectedSchoolsValues, option.value]
                                : selectedSchoolsValues.filter(value => value !== option.value)
                            )
                          }
                        >
                          {option.label}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </Card>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default SubSchoolAdminDialog;
