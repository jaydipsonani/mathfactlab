import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Row, Col, Typography, message, Empty, Card, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Section from "components/common/Section";
import Container from "components/common/Container";
import Button from "components/common/Button";
import { updateTeacher, updateTeacherPassword, removeUserDetails } from "../../../redux/actions";
import { userRole } from "config/const";
import "assets/sass/components/button-ant.scss";

const { Title } = Typography;

const UpdateProfile = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { userDetails, deleteUserDetailsLoading } = useSelector(({ auth }) => auth);

  const [showPassword, setShowPassword] = useState(false);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");

  const handleToggleShowPassword = inputFieldID => {
    setActiveInputFieldID(inputFieldID);
    setShowPassword(!showPassword);
  };

  const { first_name, last_name } = userDetails?.profile;

  const { email } = userDetails;

  const {
    register: registerProfile,
    watch: watchProfile,
    errors: errorsProfile,
    handleSubmit: handleSubmitProfile
  } = useForm({
    defaultValues: {
      first_name,
      last_name,
      email
    }
  });

  // Form 2 for updating password
  const {
    register: registerPassword,
    watch: watchPassword,
    errors: errorsPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword
  } = useForm();

  const handleSubmitUpdateForm = data => {
    const { first_name, last_name } = data;

    const body = {
      profile: {
        first_name,
        last_name
      }
    };
    dispatch(updateTeacher(body))
      .then(() => {
        message.success("Your profile has been updated successfully.");
      })
      .catch(() => {
        message.error("Something went wrong!");
      });
  };

  const handleUpdatePasswordForm = data => {
    const { new_password, old_password } = data;

    const body = {
      old_password,
      new_password
    };

    dispatch(updateTeacherPassword(body))
      .then(() => {
        message.success("Your password has been successfully updated.");
      })
      .catch(() => {
        message.error("Old password is not valid.");
      });
    resetPassword();
  };

  const handleRemoveAccount = () => {
    Modal.confirm({
      title: (
        <>
          <div>Are you sure you want to cancel your account?</div>
          <div className="mt-10">
            This will permanently delete your teacher/parent account and all associated student accounts. Once selected,
            this cannot be undone.{" "}
          </div>
        </>
      ),
      icon: <QuestionCircleOutlined />,
      okText: "Permanently delete account",
      width: 500,
      okButtonProps: {
        danger: true,
        loading: deleteUserDetailsLoading
      },
      onOk() {
        handleRemoveUserAccount();
      }
    });
  };

  const handleRemoveAccountSuccess = () => {
    //  Not clearing all storage for class code
    localStorage.removeItem("user-token");

    sessionStorage.clear();
    navigate("/login");
  };
  const handleRemoveUserAccount = () => {
    dispatch(removeUserDetails(handleRemoveAccountSuccess));
  };

  const isGoogleUser = userDetails && !!userDetails.google_user_id;

  return (
    <>
      <Row gutter={30}>
        <Col lg={isGoogleUser ? 12 : 10} xs={24} style={{ marginBottom: "30px" }}>
          <Container fluid>
            <Section
              title={
                <>
                  <Title level={4} className={"tab-heading"}>
                    Update profile
                  </Title>
                </>
              }
            >
              <form
                name="update-profile-form"
                // className="edit-student-form"
                onSubmit={handleSubmitProfile(handleSubmitUpdateForm)}
                className="user-profile-wrapper"
              >
                <div className="popup-content">
                  <div>
                    <Row gutter={30}>
                      <Col lg={12} xs={12}>
                        <div className="form-group">
                          <div
                            className={
                              errorsProfile &&
                              errorsProfile.first_name &&
                              (errorsProfile.first_name.type === "required" ||
                                errorsProfile.first_name.type === "pattern")
                                ? "form-input input-error"
                                : "form-input"
                            }
                          >
                            <label className="input-label" htmlFor="fname">
                              First name
                            </label>
                            <input
                              type="text"
                              id="fname"
                              autoFocus
                              className={
                                watchProfile("first_name") &&
                                errorsProfile &&
                                errorsProfile.first_name &&
                                errorsProfile.first_name.type !== "pattern"
                                  ? "form-control"
                                  : "form-control input-error"
                              }
                              style={{
                                textTransform: "capitalize"
                              }}
                              placeholder="Please enter first name"
                              name="first_name"
                              // ref={register({
                              //   required: true,
                              //   // setValueAs: value => capitalizeFirstLetter(value),
                              //   pattern: /^[a-zA-Z0-9]*$/,
                              // })}
                              {...registerProfile("first_name", {
                                pattern: /^[a-zA-Z0-9'-]*$/,
                                required: true
                              })}

                              // onBlur={() => handleSetUserNamePassword()}
                            />
                            {errorsProfile &&
                              errorsProfile.first_name &&
                              errorsProfile.first_name.type === "required" && (
                                <span className="error"> Please enter first name.</span>
                              )}
                            {errorsProfile &&
                              errorsProfile.first_name &&
                              errorsProfile.first_name.type === "pattern" && (
                                <span className="error">Please enter alphabetic and numeric characters only.</span>
                              )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={12} xs={12}>
                        <div className="form-group">
                          <div
                            className={
                              errorsProfile &&
                              errorsProfile.last_name &&
                              (errorsProfile.last_name.type === "required" ||
                                errorsProfile.last_name.type === "pattern")
                                ? "form-input input-error"
                                : "form-input"
                            }
                          >
                            <label className="input-label" htmlFor="lname">
                              Last name
                            </label>
                            <input
                              type="text"
                              id="lname"
                              className={
                                watchProfile("last_name") &&
                                errorsProfile &&
                                errorsProfile.last_name &&
                                errorsProfile.last_name.type !== "pattern"
                                  ? "form-control"
                                  : "form-control input-error"
                              }
                              // style={{ textTransform: "uppercase" }}
                              placeholder="Please enter last name"
                              style={{
                                textTransform: "capitalize"
                              }}
                              name="last_name"
                              // ref={register({
                              //   required: true,
                              //   // setValueAs: value => capitalizeFirstLetter(value),
                              //   pattern: /^[a-zA-Z0-9]*$/,
                              // })}
                              {...registerProfile("last_name", {
                                pattern: /^[a-zA-Z0-9'-]*$/,
                                required: true
                              })}

                              // onBlur={() => handleSetUserNamePassword()}
                            />
                            {errorsProfile &&
                              errorsProfile.last_name &&
                              errorsProfile.last_name.type === "required" && (
                                <span className="error">Please enter last name.</span>
                              )}
                            {errorsProfile && errorsProfile.last_name && errorsProfile.last_name.type === "pattern" && (
                              <span className="error">Please enter alphabetic and numeric characters only.</span>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="form-group">
                      <div
                        className={
                          errorsProfile &&
                          errorsProfile.email &&
                          (errorsProfile.email.type === "required" || errorsProfile.email.type === "pattern")
                            ? "form-input input-error"
                            : "form-input"
                        }
                      >
                        <label className="input-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          disabled
                          className={
                            watchProfile("email") &&
                            errorsProfile &&
                            errorsProfile.email &&
                            errorsProfile.email.type !== "pattern"
                              ? "form-control"
                              : "form-control input-error"
                          }
                          // style={{ textTransform: "uppercase" }}
                          // placeholder="Please enter email"
                          // autoFocus
                          // style={{
                          //   textTransform: "capitalize",
                          // }}
                          name="email"
                          // ref={register({
                          //   required: true,
                          //   // setValueAs: value => capitalizeFirstLetter(value),
                          //   // pattern: /^[a-zA-Z]*$/,
                          // })}
                          {...registerProfile("email", { required: true })}

                          // onBlur={() => handleSetUserNamePassword()}
                        />
                        {errorsProfile && errorsProfile.email && errorsProfile.email.type === "required" && (
                          <span className="error">Please enter email.</span>
                        )}
                        {errorsProfile && errorsProfile.email && errorsProfile.email.type === "pattern" && (
                          <span className="error"> Please enter correct email.</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/** <div className="form-group">
            <div
              className={
                (errors.user_name && errors.user_name.type === "required") ||
                isShowError
                  ? "form-input input-error"
                  : "form-input "
              }
            >
              <label className="input-label" htmlFor="Mobile_number">
                Mobile number
              </label>
              <input
                type="text"
                id="Mobile_number"
                className={
                  watch("Mobile_number") || isShowError
                    ? "form-control"
                    : "form-control input-error"
                }
                placeholder="Please enter mobile number"
                name="Mobile_number"
                ref={register({
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
              {errors.Mobile_number &&
                errors.Mobile_number.type === "required" && (
                  <span className="error">Please enter mobile number.</span>
                )}
              {errors.Mobile_number &&
                errors.Mobile_number.type === "pattern" && (
                  <span className="error">
                    Please enter numeric characters only.
                  </span>
                )}
            </div>
          </div>*/}
                </div>

                <div className="popup-footer">
                  <div className="button-wrap">
                    <div className="button-cols">
                      <Button
                        type="submit"
                        className="button-secondary"
                        name={"Update"}
                        // disabled={loading}
                      ></Button>
                    </div>
                  </div>
                </div>
              </form>
            </Section>
          </Container>
        </Col>
        {!isGoogleUser && (
          <Col lg={14} xs={24} style={{ marginBottom: "30px" }}>
            <Container fluid>
              <Section
                title={
                  <>
                    {isGoogleUser ? (
                      <Title level={4} className={"tab-heading"}>
                        Other section
                      </Title>
                    ) : (
                      <Title level={4} className={"tab-heading"}>
                        Update password
                      </Title>
                    )}
                  </>
                }
              >
                {isGoogleUser ? (
                  <Empty description="" />
                ) : (
                  <form
                    name="update-password-form"
                    onSubmit={handleSubmitPassword(handleUpdatePasswordForm)}
                    className="user-profile-wrapper"
                  >
                    <div className="popup-content">
                      <div>
                        <Row gutter={30}>
                          <Col lg={12} xs={12}>
                            <div className="form-group">
                              {/* <div
                                className={
                                  passwordErrors.old_password &&
                                  (passwordErrors.old_password.type ===
                                    "required" ||
                                    passwordErrors.old_password.type ===
                                      "pattern")
                                    ? "form-input input-error"
                                    : "form-input "
                                }
                              >
                                <label
                                  className="input-label"
                                  htmlFor="old_password"
                                >
                                  Old Password
                                </label>
                                <div className="input-wrap">
                                  <input
                                    type={
                                      showPassword &&
                                      activeInputFieldID === "old_password"
                                        ? "text"
                                        : "password"
                                    }
                                    id="old_password"
                                    className={
                                      passwordWatch("old_password") &&
                                      passwordErrors.old_password
                                        ? "form-control"
                                        : "form-control input-error"
                                    }
                                    name="old_password"
                                    placeholder="Enter your old password"
                                    ref={passwordRegister({
                                      required: true,
                                      pattern:
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    })}
                                  />
                                  <i
                                    className={
                                      showPassword &&
                                      activeInputFieldID === "old_password"
                                        ? "icon-hide show-password-icon"
                                        : "icon-view show-password-icon"
                                    }
                                    aria-hidden="true"
                                    onClick={() =>
                                      handleToggleShowPassword("old_password")
                                    }
                                  ></i>
                                </div>
                                {passwordErrors.old_password &&
                                  passwordErrors.old_password.type ===
                                    "required" && (
                                    <span className="error">
                                      Please enter your old password.
                                    </span>
                                  )}
                                {passwordErrors.old_password &&
                                  passwordErrors.old_password.type ===
                                    "pattern" && (
                                    <span className="error">
                                      Required: 8 characters, including
                                      UPPER/lowercase and numeric.
                                    </span>
                                  )}
                              </div> */}
                              <div
                                className={
                                  // Check if passwordErrors is defined and if old_password error exists
                                  errorsPassword &&
                                  errorsPassword.old_password &&
                                  (errorsPassword.old_password.type === "required" ||
                                    errorsPassword.old_password.type === "pattern")
                                    ? "form-input input-error"
                                    : "form-input"
                                }
                              >
                                <label className="input-label" htmlFor="old_password">
                                  Old Password
                                </label>
                                <div className="input-wrap">
                                  <input
                                    type={
                                      // Toggle password visibility based on showPassword and activeInputFieldID
                                      showPassword && activeInputFieldID === "old_password" ? "text" : "password"
                                    }
                                    id="old_password"
                                    className={
                                      watchPassword("old_password") && errorsPassword && errorsPassword.old_password
                                        ? "form-control input-error"
                                        : "form-control"
                                    }
                                    name="old_password"
                                    placeholder="Enter your old password"
                                    // ref={passwordRegister({
                                    //   required: true,
                                    //   pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    // })}
                                    {...registerPassword("old_password", {
                                      required: true,
                                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                                    })}
                                  />
                                  <i
                                    className={
                                      // Toggle password visibility icon based on showPassword and activeInputFieldID
                                      showPassword && activeInputFieldID === "old_password"
                                        ? "icon-hide show-password-icon"
                                        : "icon-view show-password-icon"
                                    }
                                    aria-hidden="true"
                                    onClick={() => handleToggleShowPassword("old_password")}
                                  ></i>
                                </div>
                                {/* Render error messages if old_password errors exist */}
                                {errorsPassword &&
                                  errorsPassword.old_password &&
                                  (errorsPassword.old_password.type === "required" ||
                                    errorsPassword.old_password.type === "pattern") && (
                                    <span className="error">
                                      {errorsPassword.old_password.type === "required"
                                        ? "Please enter your old password."
                                        : "Required: 8 characters, including UPPER/lowercase and numeric."}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row gutter={30}>
                          <Col lg={12} xs={12}>
                            <div className="form-group">
                              <div
                                className={
                                  errorsPassword &&
                                  errorsPassword.new_password &&
                                  (errorsPassword.new_password.type === "required" ||
                                    errorsPassword.new_password.type === "pattern")
                                    ? "form-input input-error"
                                    : "form-input"
                                }
                              >
                                <label className="input-label" htmlFor="new_password">
                                  New Password
                                </label>
                                <div className="input-wrap">
                                  <input
                                    type={showPassword && activeInputFieldID === "new_password" ? "text" : "password"}
                                    id="new_password"
                                    className={
                                      watchPassword("new_password") &&
                                      errorsPassword &&
                                      errorsPassword.new_password &&
                                      errorsPassword.new_password.type !== "pattern"
                                        ? "form-control"
                                        : "form-control input-error"
                                    }
                                    placeholder="Enter your new password"
                                    name="new_password"
                                    // ref={passwordRegister({
                                    //   required: true,
                                    //   pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    // })}
                                    {...registerPassword("new_password", {
                                      required: true,
                                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                                    })}
                                  />
                                  <i
                                    className={
                                      showPassword && activeInputFieldID === "new_password"
                                        ? "icon-hide show-password-icon"
                                        : "icon-view show-password-icon"
                                    }
                                    aria-hidden="true"
                                    onClick={() => handleToggleShowPassword("new_password")}
                                  ></i>
                                </div>
                                {errorsPassword &&
                                  errorsPassword.new_password &&
                                  errorsPassword.new_password.type === "required" && (
                                    <span className="error">Please enter new password.</span>
                                  )}
                                {errorsPassword &&
                                  errorsPassword.new_password &&
                                  errorsPassword.new_password.type === "pattern" && (
                                    <span className="error">
                                      Required: 8 characters, including UPPER/lowercase and numeric.
                                    </span>
                                  )}
                              </div>
                            </div>
                          </Col>
                          <Col lg={12} xs={12}>
                            <div className="form-group">
                              <div
                                className={
                                  (errorsPassword &&
                                    errorsPassword.confirm_password &&
                                    errorsPassword.confirm_password.type === "required") ||
                                  (watchPassword("new_password") &&
                                    watchPassword("confirm_password") &&
                                    watchPassword("new_password") !== watchPassword("confirm_password"))
                                    ? "form-input input-error"
                                    : "form-input"
                                }
                              >
                                <label className="input-label" htmlFor="confirm_password">
                                  Confirm Password
                                </label>
                                <div className="input-wrap">
                                  <input
                                    type={
                                      showPassword && activeInputFieldID === "confirm_password" ? "text" : "password"
                                    }
                                    id="confirm_password"
                                    className={
                                      watchPassword("confirm_password") ? "form-control" : "form-control input-error"
                                    }
                                    placeholder="Confirm password"
                                    name="confirm_password"
                                    // ref={passwordRegister({
                                    //   required: true,
                                    //   pattern:
                                    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    // })}
                                    {...registerPassword("confirm_password", {
                                      registerPassword,
                                      required: true,
                                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                                    })}
                                  />
                                  <i
                                    className={
                                      showPassword && activeInputFieldID === "confirm_password"
                                        ? "icon-hide show-password-icon"
                                        : "icon-view show-password-icon"
                                    }
                                    aria-hidden="true"
                                    onClick={() => handleToggleShowPassword("confirm_password")}
                                  ></i>
                                </div>
                                {errorsPassword &&
                                  errorsPassword.confirm_password &&
                                  errorsPassword.confirm_password.type === "required" && (
                                    <span className="error">Please confirm your new password.</span>
                                  )}
                                {errorsPassword &&
                                  watchPassword("new_password") &&
                                  watchPassword("confirm_password") &&
                                  watchPassword("new_password") !== watchPassword("confirm_password") && (
                                    <span className="error">Please make sure the passwords match.</span>
                                  )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="popup-footer">
                      <div className="button-wrap">
                        <div className="button-cols">
                          <Button
                            type="submit"
                            className="button-secondary"
                            name={"Update"}
                            form="update-password-form"
                          ></Button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Section>
            </Container>
          </Col>
        )}

        {userDetails && userDetails.role_id !== userRole.SCHOOL_ADMIN.role_id && !userDetails.school_district_id && (
          <Col lg={isGoogleUser ? 12 : 10} xs={24}>
            <Card title="Delete account" bordered={false}>
              <Col>
                <div className="user-profile-remove-text" onClick={handleRemoveAccount}>
                  <div>Delete teacher/parent account </div>
                  <div>(and all associated student accounts)</div>
                </div>
              </Col>
              <div className="mt-15">This option is permanent and cannot be undone.</div>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};
export default UpdateProfile;
