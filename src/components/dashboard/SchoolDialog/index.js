import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewSchool, editSchool } from "../../../redux/actions/schoolAction";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";

const SchoolDialog = props => {
  const dispatch = useDispatch();

  const { open, isEditMode, loading, activeSchool } = props;

  const [form] = Form.useForm();

  const { addNewSchoolError } = useSelector(({ schoolData }) => schoolData);

  const userDetails = useSelector(state => state.auth.userDetails);

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue(isEditMode ? { name: activeSchool.name } : { name: "" });
    }
  }, [open, isEditMode, activeSchool, form]); // eslint-disable-line

  const handleCloseSchoolDialog = () => {
    props.closeClassCodePopup();
  };

  const handleSuccess = () => {
    props.closeClassCodePopup();
  };

  const handleSubmit = values => {
    const { name } = form.getFieldsValue();

    if (isEditMode) {
      const { name: old_name } = activeSchool;

      const body = {
        ...(name !== old_name && { name })
      };

      if (!!Object.keys(body).length) {
        dispatch(editSchool(activeSchool, body, handleSuccess));
      } else {
        handleSuccess();
      }
    } else {
      const body = {
        name,
        school_district_id: userDetails.school_district_id
      };
      dispatch(addNewSchool(body, handleSuccess));
    }
  };

  return (
    <Drawer
      destroyOnClose
      closable={true}
      footer={null}
      title={isEditMode ? "Edit School" : "New School"}
      width={450}
      onClose={handleCloseSchoolDialog}
      open={open}
      extra={
        <Space>
          <Button onClick={handleCloseSchoolDialog} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" form="school" disabled={loading} onClick={() => form.submit()}>
            {isEditMode ? "Save" : "Add School"}
          </Button>
        </Space>
      }
    >
      <Form id="school" form={form} disabled={loading} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="School name"
              name="name"
              rules={[{ required: true, message: "Please enter school name" }]}
            >
              <Input placeholder="Please enter school name" autoFocus />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {!!addNewSchoolError && (
        <div className="error-text" style={{ paddingBottom: "0px" }}>
          <span>{addNewSchoolError}</span>
        </div>
      )}
    </Drawer>
  );
};

export default SchoolDialog;
