import React, { useState } from "react";
import Layout from "../../../components/common/PublicLayout";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginPasswordImage from "assets/images/login/password.svg";
import { resetPassword } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/common/Button";
import { useTranslation } from "react-i18next";

const ResetPasswordPage = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  let navigate = useNavigate();

  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");
  const { resetPasswordLoading, resetPasswordError } = useSelector(({ auth }) => auth);

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

  //After reset password sucess redirect to thank you page
  const handleResetPasswordSuccess = () => {
    navigate("/thank-you");
  };

  //Reset Password  api call

  const handleResetPassword = data => {
    const { resetcpassword } = data;
    const body = {
      token: id,
      new_password: resetcpassword
    };
    if (resetPasswordLoading) return;

    dispatch(resetPassword(body, handleResetPasswordSuccess));
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
              <h2 className="login-title">{t("reset-password.title")}</h2>
              <form name="student-login" onSubmit={handleSubmit(handleResetPassword)}>
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
                      {t("reset-password.formNewPasswordLabel")}
                    </label>
                    <input
                      type={showPassword && activeInputFieldID === "resetpassword" ? "text" : "password"}
                      placeholder={t("reset-password.formNewPasswordPlaceHolder")}
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
                      {t("reset-password.formConformPasswordLabel")}
                    </label>
                    <input
                      type={showPassword && activeInputFieldID === "resetcpassword" ? "text" : "password"}
                      placeholder={t("reset-password.formConformPasswordPlaceholder")}
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
                    name={t("reset-password.resetButton")}
                    className="btn btn-primary button-full"
                    type="submit"
                  />
                </div>
                <div className="wrap text-center pt-10">
                  <p className="font-18">
                    <Link to="/login" className="link">
                      {t("reset-password.linkTeacherLogin")}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ResetPasswordPage;
