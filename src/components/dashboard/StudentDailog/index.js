import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Drawer, Button, Typography, Tooltip, Switch, Row, Col, Form, Input, Select, Flex } from "antd";
import ConfirmationDialog from "components/student/ConfirmationDialog";
import { addStudent, editStudent } from "../../../redux/actions/userAction";
import {
  maxTimeoutAnswerCountList,
  studentLearningModeList,
  mulSubLevelList,
  addSubLevelList,
  studentPasswordList,
  levelLifterWhoopsiesList,
  devSessionTimeLimitList, // FOR JUST TESTING PURPOSE
  studentSessionTimeLimitList,
  userRole
} from "config/const";
import { randomTwoDigitNumberGenerator, capitalizeFirstLetter } from "utils/helpers";

const { Text } = Typography;

// import "assets/sass/components/button-ant.scss"; #TODO

function StudentDialog(props) {
  const dispatch = useDispatch();
  const { isEditMode, activeUser, open } = props;

  const [form] = Form.useForm();

  const { classCodeList } = useSelector(({ classCode }) => classCode);

  const addSubLevelOptionsList = Object.values(addSubLevelList).filter(level => level.isAvailable === true);
  const mulDivLevelOptionsList = Object.values(mulSubLevelList).filter(level => level.isAvailable === true);
  const sessionTimeLimitList =
    process.env.REACT_APP_ENV === "development" ? devSessionTimeLimitList : studentSessionTimeLimitList;

  const addSubLevelListOption = Object.values(addSubLevelOptionsList).map(lvl => {
    return {
      label: `${lvl.label}  ${lvl.descriptors}`,
      value: lvl.value
    };
  });
  const mulDivLevelListOption = Object.values(mulDivLevelOptionsList).map(lvl => {
    return {
      label: `${lvl.label}  ${lvl.descriptors}`,
      value: lvl.value
    };
  });
  const classCodeListOption = useMemo(() => {
    return classCodeList.map(classCode => ({
      label: `${classCode.name} - ${classCode.class_code}`,
      value: classCode.class_code
    }));
  }, [classCodeList]);

  const { addNewStudentLoading, editUserDetailsLoading, studentList } = useSelector(({ user }) => user);

  const { userDetails } = useSelector(({ auth }) => auth);

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [changedValue, setChangedValue] = useState(null);
  const [changedField, setChangedField] = useState(null);

  const handleChangeValue = (value, field) => {
    setChangedValue(value);
    setChangedField(field);
    setIsConfirmationVisible(true);
  };

  const handleConfirmChange = () => {
    form.setFieldsValue({ [changedField]: changedValue });
    setIsConfirmationVisible(false);
  };

  const handleCancelChange = () => {
    setChangedValue(null);
    setChangedField(null);
    setIsConfirmationVisible(false);
    form.setFieldsValue({ [changedField]: activeUser?.profile[changedField] });
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue(
        isEditMode
          ? {
              last_name: activeUser.profile.last_name,
              first_name: activeUser.profile.first_name,
              user_name: activeUser.user_name,
              password: activeUser.password,
              class_code: activeUser.class_code,
              student_learning_mode_id: +activeUser.profile?.student_learning_mode_id,
              max_timeout_correct_ans_secs: +activeUser.profile.max_timeout_correct_ans_secs,
              allowed_level_lifter_whoopsies: activeUser.profile.allowed_level_lifter_whoopsies,
              session_time_limit: +activeUser.profile.session_time_limit,
              add_sub_level_id: activeUser.profile.add_sub_level_id,
              mul_div_level_id: activeUser.profile.mul_div_level_id,
              is_super_level_lifter_lock: Boolean(activeUser.profile.is_super_level_lifter_lock)
            }
          : {
              last_name: "",
              first_name: "",
              user_name: "",
              password: "",
              student_learning_mode_id: studentLearningModeList[0].value,
              // class_code: classCodeListOption.length && classCodeListOption[0] && classCodeListOption[0].value,
              class_code:classCodeListOption.length ? classCodeListOption[0].value : null,
              add_sub_level_id: null,
              mul_div_level_id: null
            }
      );
    }
  }, [open, isEditMode, activeUser, classCodeListOption, form]);

  const handleCloseStudentDialog = () => {
    props.closeStudentPopup();
  };

  const handleSuccess = () => {
    props.closeStudentPopup();
  };

  const loading = addNewStudentLoading || editUserDetailsLoading;

  const handleSubmitLoginForm = () => {
    const {
      user_name,
      class_code,
      password,

      last_name,
      first_name,
      student_learning_mode_id,
      max_timeout_correct_ans_secs,
      session_time_limit,
      allowed_level_lifter_whoopsies,
      add_sub_level_id = null,
      mul_div_level_id = null,
      is_super_level_lifter_lock
    } = form.getFieldsValue();

    if (isEditMode) {
      const {
        user_name: old_user_name,
        class_code: old_class_code,
        password: old_password,

        profile: {
          last_name: old_last_name,
          first_name: old_first_name,
          student_learning_mode_id: old_student_learning_mode_id,
          max_timeout_correct_ans_secs: old_max_timeout_correct_ans_secs,
          session_time_limit: old_session_time_limit,
          allowed_level_lifter_whoopsies: old_allowed_level_lifter_whoopsies,
          add_sub_level_id: old_add_sub_level_id,
          mul_div_level_id: old_mul_div_level_id,
          is_super_level_lifter_lock: old_is_super_level_lifter_lock
        }
      } = activeUser;
      const updatedClassCode = classCodeList.find(classCode => {
        return classCode.class_code === class_code;
      });
      const body = {
        ...(user_name !== old_user_name && { user_name }),
        ...(class_code !== old_class_code && { class_code }),
        ...(class_code !== old_class_code && {
          class_name: updatedClassCode.name
        }),
        ...(password !== old_password && { password: password?.trim() }),
        profile: {
          ...(last_name !== old_last_name && { last_name }),
          ...(first_name !== old_first_name && { first_name }),
          ...(student_learning_mode_id !== old_student_learning_mode_id && { student_learning_mode_id }),
          ...(max_timeout_correct_ans_secs !== old_max_timeout_correct_ans_secs && { max_timeout_correct_ans_secs }),
          ...(max_timeout_correct_ans_secs !== old_max_timeout_correct_ans_secs && {
            auto_timeout_for_question: max_timeout_correct_ans_secs * 6
          }),
          ...(session_time_limit !== old_session_time_limit && { session_time_limit }),
          ...(allowed_level_lifter_whoopsies !== old_allowed_level_lifter_whoopsies && {
            allowed_level_lifter_whoopsies
          }),
          ...(add_sub_level_id !== old_add_sub_level_id && { add_sub_level_id }),
          ...(mul_div_level_id !== old_mul_div_level_id && { mul_div_level_id }),
          ...(+is_super_level_lifter_lock !== old_is_super_level_lifter_lock && {
            is_super_level_lifter_lock: +is_super_level_lifter_lock
          })
        }
      };

      // #TODO Stop API call if there isn't any change in edit
      // if (!!Object.keys(body.profile).length && !!Object.keys(body.omit("profile")).length) {
      dispatch(editStudent(body, activeUser, handleSuccess));
      // } else {
      // handleSuccess();
      // }
    } else {
      const body = {
        user_name,
        password: password?.trim(),
        role_id: userRole.STUDENT.role_id,
        school_district_id: userDetails.school_district_id,
        class_code,
        profile: {
          first_name,
          last_name,
          student_learning_mode_id: student_learning_mode_id,
          max_timeout_correct_ans_secs: maxTimeoutAnswerCountList[2].value,
          auto_timeout_for_question: maxTimeoutAnswerCountList[2].value * 6,
          max_retry_count_to_attempt_question: 1,
          session_time_limit: sessionTimeLimitList[3].value,
          allowed_level_lifter_whoopsies: levelLifterWhoopsiesList[3].value,
          is_super_level_lifter_lock: 1
        }
      };

      dispatch(addStudent(body, handleSuccess));
    }
  };

  const handleSetUserNamePassword = () => {
    const { getFieldValue, setFieldsValue } = form;

    const { first_name: firstName, last_name: lastName, password, user_name: userName } = getFieldValue();

    if (firstName && lastName && !userName && !isEditMode) {
      const sanitizedFirstName = firstName.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
      const sanitizedLastName = lastName.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();

      const updatedUserNameByFnameLname = `${sanitizedFirstName.charAt(0)}${sanitizedLastName.replace(/ /g, "")}`;

      const sameUserNameList = studentList.filter(user => user.user_name.startsWith(updatedUserNameByFnameLname));

      let user_name = updatedUserNameByFnameLname;
      if (sameUserNameList.length > 0) {
        user_name += sameUserNameList.length + 1;
      }

      setFieldsValue({ user_name });
    }

    if (firstName && lastName && !password && !isEditMode) {
      const randomValue = Math.floor(Math.random() * studentPasswordList.length);
      const randomPassword = studentPasswordList[randomValue] + randomTwoDigitNumberGenerator();
      setFieldsValue({ password: randomPassword });
    }
  };

  return (
    <>
      <Drawer
        destroyOnClose
        closable={true}
        // className="class-code-popup"
        title={isEditMode ? "Edit Student " : "New Student"}
        open={open}
        onClose={handleCloseStudentDialog}
        footer={null}
        width={700}
        extra={
          <>
            <Flex gap="middle" justify="flex-end">
              <Button onClick={() => handleCloseStudentDialog()} disabled={loading}>
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                // loading={loading}
                form="student"
                onClick={() => form.submit()} // Submit the form using Form instance
              >
                {isEditMode ? "Save" : "Add Student"}
              </Button>
            </Flex>
          </>
        }
      >
        <Divider orientation="left" orientationMargin="0" style={{ fontWeight: "bold" }}>
          Profile
        </Divider>
        <Form id="student" layout="vertical" disabled={loading} onFinish={handleSubmitLoginForm} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Last name"
                name="last_name"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9!@#$%^&*()_+{}~|/?\-= ]+$/,
                    setValueAs: value => capitalizeFirstLetter(value),
                    message: "Please enter last name."
                  }
                ]}
              >
                <Input
                  type="text"
                  id="last_name"
                  placeholder="Please enter last name"
                  autoFocus
                  name="last_name"
                  onBlur={() => handleSetUserNamePassword()}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="first_name"
                label="First name"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9!@#$%^&*()_+{}~|/?\-= ]+$/,
                    setValueAs: value => capitalizeFirstLetter(value)
                  }
                ]}
              >
                <Input
                  type="text"
                  id="fname"
                  placeholder="Please enter first name"
                  name="first_name"
                  onBlur={() => handleSetUserNamePassword()}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="user_name"
                label="Username"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9]*$/
                  },
                  {
                    validator: (_, value) => {
                      console.log("🚀 ~ StudentDialog ~ activeUser:", activeUser);

                      console.log("🚀 ~ StudentDialog ~ value:", value);
                      const classCode = form.getFieldValue("class_code");
                      const isUserNameExists = studentList.some(
                        student => student.user_name === value && student.class_code === classCode
                      );
                      console.log("🚀 ~ StudentDialog ~ isUserNameExists:", isUserNameExists);
                      if ((isUserNameExists && activeUser?.user_name !== value) || (isUserNameExists && !isEditMode)) {
                        return Promise.reject(new Error("Username already exists in this class."));
                      } else {
                        return Promise.resolve();
                      }
                    }
                  }
                ]}
              >
                <Input type="text" id="user_name" placeholder="Please enter user name" name="user_name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    min: 5
                  }
                ]}
              >
                <Input type="text" id="password" placeholder="Please enter password" name="password" />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left" style={{ fontWeight: "bold", marginTop: "30px" }} orientationMargin="0">
            Settings
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="class_code"
                label="Class code"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                {/* <Button
//                 type="primary"
//                 onClick={handleCreateClass}
//                 style={{ marginBottom: 5 }}
//               >
//                 Create Class
//                 <PlusOutlined />
//               </Button> */}
                <Select
                  name="class_code"
                  style={{ width: "100%" }}
                  options={classCodeListOption}
                  placeholder="Select class code..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="student_learning_mode_id"
                label={
                  <>
                    Student learning mode
                    <Tooltip
                      overlayClassName="ant-tooltip-right-input"
                      title="In MathFactLab, students learn addition and subtraction together or multiplication and division together.  We call these ‘learning modes’.  Select the mode you would like this student to work on currently.  Learning modes can be switched at any time without loss of data."
                    >
                      <b>?</b>
                    </Tooltip>
                  </>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter student learning mode"
                  }
                ]}
              >
                <Select
                  name="learningMode"
                  style={{ width: "100%" }}
                  options={studentLearningModeList}
                  placeholder="Select Learning Mode..."
                />
              </Form.Item>
            </Col>
          </Row>

          {isEditMode && (
            <>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="max_timeout_correct_ans_secs"
                    label={
                      <>
                        Required fluency rate
                        <Tooltip
                          overlayClassName="ant-tooltip-reset-counter"
                          title="This option allows you to change the number of seconds by which a student must accurately and consistently respond to a math fact prompt to be considered fluent.  Our default setting for this is 4 seconds.  See our FAQ for further details and suggestions."
                        >
                          <b>?</b>
                        </Tooltip>
                      </>
                    }
                    rules={[
                      {
                        required: "true",
                        message: "Please enter required fluency rate."
                      }
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      name="max_timeout_correct_ans_secs"
                      options={maxTimeoutAnswerCountList}
                      placeholder="Select Timeout..."
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="session_time_limit"
                    label={
                      <>
                        Session length
                        <Tooltip
                          overlayClassName="ant-tooltip-reset-counter"
                          title="This determines how many minutes a student can practice on MathFactLab before being logged off.  Like with most things, we believe short and frequent practice is the key to success.  When the time runs out, students will be able to finish the activity they are working on."
                        >
                          <b>?</b>
                        </Tooltip>
                      </>
                    }
                    rules={[
                      {
                        required: "true",
                        message: "Please enter session time limit."
                      }
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      name="maxTimeout"
                      options={sessionTimeLimitList}
                      placeholder="Select Session Limit..."
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="allowed_level_lifter_whoopsies"
                    label={
                      <>
                        Level Lifter Whoopsies
                        <Tooltip
                          title={
                            <div>
                              <p>
                                A ‘whoopsie’ is an error on a Level Lifter.
                                <span style={{ marginRight: "2px" }}></span> A late response counts as 1 whoopsie, while
                                an incorrect response counts as 2 whoopsies.
                                <span style={{ marginRight: "4px" }}></span>
                                Allowing, for example, 4 whoopsies means that a student could respond late to up to 4
                                prompts or answer 2 incorrectly (or a combination totalling up to 4 whoopsies) and still
                                pass the Level Lifter.
                              </p>
                              <p>
                                For most students,
                                <span style={{ fontWeight: "800" }}>
                                  <span style={{ marginRight: "4px" }}></span>
                                  we recommend 2 or less whoopsies.
                                </span>
                              </p>
                              <p>
                                The ‘Staggered’ option increases the number of allowed ‘whoopsies’ by 2 with each Level
                                Lifter attempt - up to a total of 8 on the fourth or more Level Lifter attempt.
                              </p>
                              <p>
                                Providing flexibility in passing requirements helps struggling students stay motivated.
                              </p>
                            </div>
                          }
                          overlayClassName="ant-tooltip-whoopsies"
                        >
                          <b>?</b>
                        </Tooltip>
                      </>
                    }
                    rules={[
                      {
                        required: "true",
                        message: "Please select whoopsies limit"
                      }
                    ]}
                  >
                    <Select
                      name="allowed_whoopsies"
                      options={levelLifterWhoopsiesList}
                      placeholder="Select Whoopsies..."
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          {isEditMode && (
            <>
              {activeUser?.profile?.add_sub_level_id ? (
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="add_sub_level_id"
                      label={
                        <>
                          +/- Level
                          <Tooltip
                            overlayClassName="ant-tooltip-right-input"
                            title="Select this option if you wish to override the student’s current placement in the multiplication/division mode."
                          >
                            <b>?</b>
                          </Tooltip>
                        </>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter +/- level."
                        }
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        options={addSubLevelListOption}
                        name="add_sub_level_id"
                        placeholder="+/- Level"
                        onChange={value => {
                          handleChangeValue(value, "add_sub_level_id");
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {activeUser?.profile?.mul_div_level_id !== null ? (
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="mul_div_level_id"
                      label={
                        <>
                          x/÷ Level
                          <Tooltip
                            overlayClassName="ant-tooltip-right-input"
                            title="Select this option if you wish to override the student’s current placement in the multiplication/division mode."
                          >
                            <b>?</b>
                          </Tooltip>
                        </>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter x/÷ level."
                        }
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        options={mulDivLevelListOption}
                        name="mul_div_level_id"
                        placeholder="x/÷ Level"
                        onChange={value => {
                          handleChangeValue(value, "mul_div_level_id");
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                ""
              )}

              <Row gutter={16}>
                <Col span={12}>
                  <Flex gap={12} align="top">
                    <Form.Item>
                      <Text strong>Super-Advanced Level Lifters </Text>
                      <Tooltip
                        overlayClassName="ant-tooltip-reset-counter"
                        title="By default, students are not given Level Lifters on Super-Advanced and Super-Duper Advanced stages. This is to make these stages accessible and passable for most students. For gifted students, who need a real challenge, we recommend turning these on. You could also turn on these Level Lifters after students have reached the graduate level once without them."
                      >
                        <b>?</b>
                      </Tooltip>
                    </Form.Item>
                    <Form.Item name="is_super_level_lifter_lock" valuePropName="checked">
                      <Switch checkedChildren="on" unCheckedChildren="off" />
                    </Form.Item>
                  </Flex>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Drawer>

      {isConfirmationVisible && (
        <ConfirmationDialog
          changedField={changedField}
          user={activeUser}
          visible={isConfirmationVisible}
          onOk={handleConfirmChange}
          onCancel={handleCancelChange}
        />
      )}
    </>
  );
}

export default StudentDialog;
