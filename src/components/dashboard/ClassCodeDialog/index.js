import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Drawer, Space, Select, Form, Col, Row } from "antd";
import { userRole } from "config/const";
import { editClassCode, addNewClassCode } from "../../../redux/actions/classCodeAction";
import { getSchool } from "../../../redux/actions/schoolAction";

const ClassCodeDialog = props => {
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Create Form instance
  const location = useLocation();

  const { open, isEditMode, activeClassCode } = props;

  const { schoolData } = useSelector(({ schoolData }) => schoolData);
  const { addNewClassCodeLoading, editClassCodeDetailsLoading } = useSelector(({ classCode }) => classCode);
  const loading = addNewClassCodeLoading || editClassCodeDetailsLoading;
  const { userDetails } = useSelector(({ auth }) => auth);

  const schoolListOption = [
    ...schoolData.map(school => {
      return {
        label: school.name,
        value: school.id
      };
    })
  ];

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (isEditMode) {
        form.setFieldsValue({
          name: activeClassCode.name,
          school_id: activeClassCode.school_id
        });
      } else {
        form.setFieldsValue({
          name: "",
          school_id: schoolListOption ? schoolListOption[0]?.value : undefined
        });
      }
    }
  }, [isEditMode, activeClassCode, open]); // eslint-disable-line

  useEffect(() => {
    if (location.pathname === "/admin/classes") {
      if (!schoolData.length) {
        dispatch(getSchool());
      }
    }
  }, [schoolData.length, location.pathname]); // eslint-disable-line

  const handleCloseClassCodeDialog = () => {
    props.closeClassCodePopup();
  };

  const handleSubmit = () => {
    const { name, school_id } = form.getFieldsValue();

    if (isEditMode) {
      const { name: old_name, school_id: old_school_id } = activeClassCode;

      let body;

      let updatedClassCode = activeClassCode;

      if (userDetails.role_id === userRole.SCHOOL_ADMIN.role_id) {
        const school = schoolData.find(scl => scl.id === school_id);
        updatedClassCode = Object.assign({}, updatedClassCode, {
          school: { name: school.name }
        });
        body = {
          ...(name !== old_name && { name }),
          ...(school_id !== old_school_id && { school_id })
        };
      } else {
        body = {
          ...(name !== old_name && { name })
        };
      }

      if (!!Object.keys(body).length) {
        dispatch(editClassCode(updatedClassCode, body, handleSuccess));
      } else {
        handleSuccess();
      }
    } else {
      const body = {
        name,
        school_id,
        school_district_id: userDetails.school_district_id
      };
      dispatch(addNewClassCode(body, handleSuccess));
    }
  };

  const handleSuccess = () => {
    props.closeClassCodePopup();
  };

  return (
    <Drawer
      title={isEditMode ? "Edit Class" : "New Class"}
      width={450}
      onClose={handleCloseClassCodeDialog}
      open={open}
      extra={
        <Space>
          <Button onClick={handleCloseClassCodeDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            form="class"
            disabled={loading}
            onClick={() => form.submit()} // Submit the form using Form instance
          >
            {isEditMode ? "Save" : "Add Class"}
          </Button>
        </Space>
      }
    >
      <Form id="class" form={form} layout="vertical" onFinish={handleSubmit} disabled={loading}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Class name" name="name" rules={[{ required: true, message: "Please enter class name" }]}>
              <Input placeholder="Please enter class name" autoFocus />
            </Form.Item>
          </Col>
        </Row>
        {userDetails.role_id === userRole.SCHOOL_ADMIN.role_id && (
          <>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="School"
                  name="school_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select at least one school."
                    }
                  ]}
                >
                  <Select
                    defaultActiveFirstOption
                    name="selectedSchool"
                    style={{ width: "100%" }}
                    options={schoolListOption}
                    placeholder="Select school..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </Form>
    </Drawer>
  );
};

export default ClassCodeDialog;
