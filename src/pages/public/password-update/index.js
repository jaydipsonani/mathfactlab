import React, { useState, useEffect } from "react";
import Layout from "../../../components/common/PublicLayout";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginPasswordImage from "assets/images/login/password.svg";
import GoogleVerify from "components/dashboard/GoogleVerify";
// import DataMigrationPopup from "components/DataMigrationPopup";
import { joinUser, resetPassword } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/common/Button";
// import resetLinkImg from "assets/images/reset-link.svg";
import { userRole } from "config/const";
import { useTranslation } from "react-i18next";

const PasswordUpdatePage = () => {
  const { t } = useTranslation();
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const isExistingUser = query.get("is_existing_user");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isShowDataMigrationPopup, setIsShowDataMigrationPopup] = useState(false);

  const [activeInputFieldID, setActiveInputFieldID] = useState("");
  // const [isMigrateOldData, setIsMigrateOldData] = useState(0);

  const { resetPasswordLoading, resetPasswordError, joinUserError, joinUserLoading } = useSelector(({ auth }) => auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const handleToggleShowPassword = inputFieldID => {
    setActiveInputFieldID(inputFieldID);
    setShowPassword(!showPassword);
  };

  const handleEndSession = selectedOption => {
    const isMigrateOldData = selectedOption === "YES" ? 1 : 0;
    handleCloseMigrationPopup(isMigrateOldData);
  };

  //After reset password success redirect to thank you page
  const handleRetPasswordSuccess = () => {
    navigate("/thank-you?user-join=true");
    localStorage.clear();
  };

  //Reset Password  api call

  const handleResetPassword = data => {
    const { resetcpassword } = data;
    const body = {
      token: localStorage.getItem("reset_password_token"),
      new_password: resetcpassword
    };
    if (resetPasswordLoading) return;
    dispatch(resetPassword(body, handleRetPasswordSuccess));
  };
  //After login success redirection to student page
  function handleLoginSuccess(userData) {
    if (userData.role_id === userRole.SCHOOL_ADMIN.role_id) {
      navigate("/school-admin/schools");
    } else {
      navigate("/teacher/students");
    }
    localStorage.removeItem("google-update-password-token");
  }

  useEffect(() => {
    if (isExistingUser && process.env.REACT_APP_ENV === "local") {
      setIsShowDataMigrationPopup(true);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    // : Remove user token so logged user will be log out
    localStorage.removeItem("user-token");
    if (token) {
      const body = {
        // isMigrateOldData: 0,
        token: token || ""
      };
      dispatch(joinUser(body));
    }

    // if (!isExistingUser) {

    // }
  }, [token, isShowDataMigrationPopup]); // eslint-disable-line

  const handleCloseMigrationPopup = selectedOption => {
    setIsShowDataMigrationPopup(false);
    const body = {
      // isMigrateOldData: selectedOption,
      token: token || ""
    };
    dispatch(joinUser(body));
  };

  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector sm-vector">
                <img src={loginPasswordImage} className="vector-img" alt="" />
              </div>
              <div className="login-vector-text">
                <h4 className="h4 text-white font-normal">{t("thankyou.vectorText")}</h4>
              </div>
            </div>
          </div>
          <div className="login-cols">
            <div className="login-cols-inner">
              {isShowDataMigrationPopup ? (
                <>
                  <div
                    style={{
                      padding: "0px 24px 24px 24px",
                      textAlign: "center"
                    }}
                  >
                    <h4 className="mb-10">
                      Would you like the student data from your teacher account migrated into your school's/district's
                      MathFactLab account?
                    </h4>

                    <span>If you choose not to select "yes," the old data will be removed.</span>
                  </div>
                  <div className="popup-footer">
                    <div
                      className="button-wrap"
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        marginBottom: "24px"
                      }}
                    >
                      <div className="button-cols">
                        <Button
                          type="button"
                          className="btn btn-secondary-outline"
                          name={"No"}
                          onClick={() => handleEndSession("NO")}
                        ></Button>
                      </div>
                      <div className="button-cols">
                        <Button
                          type="button"
                          className="btn btn-secondary"
                          name={"Yes"}
                          onClick={() => handleEndSession("YES")}
                        ></Button>
                      </div>
                    </div>
                    <div>
                      <p>Note: Your teacher account will be deleted once you join your school's MathFactLab account.</p>
                    </div>
                  </div>
                </>
              ) : !joinUserLoading ? (
                joinUserError ? (
                  <div className="sign-vector">
                    {/* <img
                      src={resetLinkImg}
                      alt="resetLinkImg"
                      className="signtop-img"
                    ></img>
                    <h2 className="login-title">Thank you!</h2> */}
                    <p className="font-18 text-center login-subtext error-text">{joinUserError}</p>

                    <div className="wrap text-center pt-10">
                      <p className="font-18">
                        <Link to="/login" className="link">
                          {t("common.public.backLoginLink")}
                        </Link>
                      </p>
                    </div>
                  </div>
                ) : (
                  <form name="student-login" onSubmit={handleSubmit(handleResetPassword)}>
                    <div className="social-group">
                      <GoogleVerify handleSuccess={handleLoginSuccess} />
                    </div>
                    <div className="text-separator">
                      <span className="txt-sep">or</span>
                    </div>

                    <h2 className="login-title additional-class">{t("join-user.title")}</h2>
                    <div className="form-group">
                      <div
                        className={
                          errors.resetpassword && errors.resetpassword.type === "required"
                            ? "input-wrap extra-text input-error"
                            : errors.resetpassword && errors.resetpassword.type === "pattern"
                              ? "input-wrap extra-text input-error-without-shake"
                              : "input-wrap extra-text"
                        }
                      >
                        <label htmlFor="resetpassword" className="input-label">
                          <i className="icon-lock" aria-hidden="true"></i>
                          {t("join-user.formSetPasswordLabel")}
                        </label>
                        <input
                          type={showPassword && activeInputFieldID === "resetpassword" ? "text" : "password"}
                          placeholder={t("join-user.formSetPasswordPlaceHolder")}
                          // className="input-field"
                          name="resetpassword"
                          id="resetpassword"
                          className={watch("resetpassword") ? "input-field" : "input-field input-error"}
                          {...register("resetpassword", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                          })}
                        />
                        <i
                          className={
                            showPassword && activeInputFieldID === "resetpassword"
                              ? "icon-hide show-password-icon"
                              : "icon-view show-password-icon"
                          }
                          aria-hidden="true"
                          onClick={() => handleToggleShowPassword("resetpassword")}
                        ></i>
                        {errors.resetpassword && errors.resetpassword.type === "required" && (
                          <span className="error">Please enter password.</span>
                        )}
                        {errors.resetpassword && errors.resetpassword.type === "pattern" && (
                          <span className="error">Required: 8 characters, including UPPER/lowercase and numeric.</span>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      {/* <!-- Add className for error red border ===> input-error  --> */}
                      <div
                        className={
                          (errors.resetcpassword && errors.resetcpassword.type === "required") ||
                          (errors &&
                            watch("resetpassword") &&
                            watch("resetcpassword") &&
                            !watch("resetpassword").startsWith(watch("resetcpassword")) &&
                            watch("resetpassword") !== watch("resetcpassword"))
                            ? "input-wrap extra-text input-error"
                            : "input-wrap extra-text"
                        }
                      >
                        <label htmlFor="resetcpassword" className="input-label">
                          <i className="icon-lock" aria-hidden="true"></i>
                          {t("join-user.formConformPasswordLabel")}
                        </label>
                        <input
                          type={showPassword && activeInputFieldID === "resetcpassword" ? "text" : "password"}
                          placeholder={t("join-user.formConformPasswordPlaceholder")}
                          name="resetcpassword"
                          id="resetcpassword"
                          {...register("resetcpassword", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                          })}
                          className={watch("resetcpassword") ? "input-field" : "input-field input-error"}
                        />
                        <i
                          className={
                            showPassword && activeInputFieldID === "resetcpassword"
                              ? "icon-hide show-password-icon"
                              : "icon-view show-password-icon"
                          }
                          aria-hidden="true"
                          onClick={() => handleToggleShowPassword("resetcpassword")}
                        ></i>
                        {errors.resetcpassword && <p>{errors.resetcpassword.message}</p>}
                        {errors.resetcpassword && errors.resetcpassword.type === "required" && (
                          <span className="error">Please confirm your new password.</span>
                        )}
                        {errors &&
                          watch("resetpassword") &&
                          watch("resetcpassword") &&
                          !watch("resetpassword").startsWith(
                            watch("resetcpassword") && watch("resetpassword") !== watch("resetcpassword")
                          ) && <span className="error">Please make sure the passwords match.</span>}
                      </div>
                    </div>
                    {resetPasswordError && (
                      <div className="error-text">
                        <span>{resetPasswordError}</span>
                      </div>
                    )}
                    <div className="form-group pt-10">
                      <Button
                        name={t("join-user.setPasswordButton")}
                        className="btn btn-primary button-full"
                        type="submit"
                      />
                    </div>
                    <div className="wrap text-center pt-10">
                      <p className="font-18">
                        <Link to="/login" className="link">
                          {t("join-user.returnToLoginLink")}
                        </Link>
                      </p>
                    </div>
                  </form>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* {isShowDataMigrationPopup ? (
          <DataMigrationPopup close={handleCloseMigrationPopup} />
        ) : (
          ""
        )} */}
      </Layout>
    </>
  );
};

export default PasswordUpdatePage;
