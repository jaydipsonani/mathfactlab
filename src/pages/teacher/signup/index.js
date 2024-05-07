import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Switch } from "antd";
import Layout from "../../../components/common/PublicLayout";
import Button from "components/common/Button";
import GoogleSignup from "components/dashboard/GoogleSignup";
import { capitalizeFirstLetter } from "utils/helpers";
import { teacherSignup } from "../../../redux/actions";
import { userRole } from "config/const";
import teacherLoginImg from "assets/images/login/teacher-login.svg";
// import StopUserSignupPopup from "components/StopUserSignupPopup";

function TeacherSignup(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const recaptchaRef = React.useRef();

  const [isShowReCaptchaError, setIsShowReCaptchaError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTeacherLogin, setIsTeacherLogin] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const { teacherSignupLoading, teacherSignupError } = useSelector(({ auth }) => auth);

  //after sign up page success redirect to students page
  const handleGoogleTeacherSignUpSuccess = roleId => {
    switch (roleId) {
      case userRole.PARENT.role_id:
        navigate("/parent/students");
        break;
      default:
        navigate("/teacher/students");
        break;
    }
  };

  const handleTeacherSignUpSuccess = () => {
    navigate("/thank-you?login=true");
  };

  const handleLoginFailure = () => {
    recaptchaRef.current.reset();
  };

  //signup page api call
  const handleSubmitLoginForm = async data => {
    const token = await recaptchaRef.current.executeAsync();
    if (teacherSignupLoading) return;
    const { tsemail, tsname, tspassword, tslname, confirmpassword } = data;
    if (tspassword !== confirmpassword) return;

    if (token) {
      const body = {
        email: tsemail,

        password: tspassword,
        role_id: isTeacherLogin ? userRole.TEACHER.role_id : userRole.PARENT.role_id,
        profile: {
          first_name: tsname,
          last_name: tslname
        }
      };
      setIsShowReCaptchaError(false);
      dispatch(teacherSignup(body, handleTeacherSignUpSuccess, handleLoginFailure));
    } else {
      setIsShowReCaptchaError(true);
    }

    sessionStorage.setItem("user-mail", tsemail);
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onChangeSelectTeacherLogin = checked => {
    setIsTeacherLogin(checked);
    localStorage.setItem("is_teacher_login", checked);
  };

  return (
    <>
      <Layout>
        <ReCAPTCHA size={"invisible"} sitekey={process.env.REACT_APP_GOOGLE_SITE_KEY} ref={recaptchaRef} />
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector">
                <img src={teacherLoginImg} className="vector-img" alt="" />
              </div>
              <div className="login-vector-text">
                <h4 className="h4 text-white font-normal">{t("common.public.subText")}</h4>
              </div>
            </div>
          </div>
          <div className="login-cols">
            <div className={`login-cols-inner ${isTeacherLogin ? "teacher-switch" : "parent-switch"}`}>
              <h2 className="login-title">
                {/* {isTeacherLogin
                  ? "Create Teacher Account"
                  : "Create Parent Account"} */}
                {t("signUp.title." + (isTeacherLogin ? "teacher" : "parent"))}
              </h2>
              <p className="font-18 text-center login-subtext">
                Parent <Switch defaultChecked onChange={onChangeSelectTeacherLogin} /> Teacher
              </p>
              <form name="student-login" onSubmit={handleSubmit(handleSubmitLoginForm)}>
                <div className="social-group">
                  <GoogleSignup handleSuccess={handleGoogleTeacherSignUpSuccess} />
                </div>
                <div className="text-separator">
                  <span className="txt-sep">{t("login.textSeparator.text")}</span>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.tslname && errors.tslname.type === "required" ? "input-wrap input-error" : "input-wrap "
                    }
                  >
                    <label htmlFor="tslname" className="input-label">
                      <i className="icon-user" aria-hidden="true"></i>
                      {t("signUp.formInputLastNameLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("signUp.formInputLastNamePlaceholder")}
                      name="tslname"
                      id="tslname"
                      className={watch("tslname") ? "input-field" : "input-field input-error"}
                      style={{ textTransform: "capitalize" }}
                      {...register("tslname", {
                        required: true,
                        setValueAs: value => capitalizeFirstLetter(value)
                      })}
                      disabled={teacherSignupLoading}
                    />
                    {errors.tslname && errors.tslname.type === "required" && (
                      <span className="error">Please enter your last name.</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.tsname && errors.tsname.type === "required" ? "input-wrap input-error" : "input-wrap "
                    }
                  >
                    <label htmlFor="tsname" className="input-label">
                      <i className="icon-user" aria-hidden="true"></i>
                      {t("signUp.formInputFirstNameLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("signUp.formInputFirstNamePlaceholder")}
                      name="tsname"
                      id="tsname"
                      style={{ textTransform: "capitalize" }}
                      className={watch("tsname") ? "input-field" : "input-field input-error"}
                      {...register("tsname", {
                        required: true,
                        setValueAs: value => capitalizeFirstLetter(value)
                      })}
                      disabled={teacherSignupLoading}
                    />
                    {errors.tsname && errors.tsname.type === "required" && (
                      <span className="error">Please enter your first name.</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  {/* <!-- Add className for error red border ===> input-error  --> */}
                  <div
                    className={
                      (errors.tsemail && errors.tsemail.type === "required") ||
                      (errors.tsemail && errors.tsemail.type === "pattern")
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="tsemail" className="input-label">
                      <i className="icon-envelope" aria-hidden="true"></i>
                      {t("signUp.formInputEmailNameLabel")}
                    </label>
                    <input
                      // type="email"
                      placeholder={t("signUp.formInputEmailNamePlaceholder")}
                      name="tsemail"
                      id="tsemail"
                      className={watch("tsemail") ? "input-field" : "input-field input-error"}
                      {...register("tsemail", {
                        required: true,
                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                      })}
                      disabled={teacherSignupLoading}
                    />
                    {errors.tsemail && errors.tsemail.type === "required" && (
                      <span className="error">Please enter email.</span>
                    )}
                    {errors.tsemail && errors.tsemail.type === "pattern" && (
                      <span className="error">Please enter a valid email address.</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.tspassword && errors.tspassword.type === "required"
                        ? "input-wrap input-error"
                        : errors.tspassword && errors.tspassword.type === "pattern"
                          ? "input-wrap input-error-without-shake"
                          : "input-wrap"
                    }
                  >
                    <label htmlFor="tspassword" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>
                      {t("login.formInputPasswordLabel")}
                    </label>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("login.formInputPasswordPlaceholder")}
                      name="tspassword"
                      id="tspassword"
                      className={watch("tspassword") ? "input-field" : "input-field input-error"}
                      disabled={teacherSignupLoading}
                      {...register("tspassword", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                      })}
                    />
                    <i
                      className={`${showPassword ? "icon-hide" : "icon-view"} show-password-icon`}
                      aria-hidden="true"
                      onClick={() => handleToggleShowPassword("tspassword")}
                    ></i>
                    {errors.tspassword && errors.tspassword.type === "required" && (
                      <span className="error">Please enter password.</span>
                    )}
                    {errors.tspassword && errors.tspassword.type === "pattern" && (
                      <span className="error">Required: 8 characters, including UPPER/lowercase and numeric.</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      (errors.confirmpassword && errors.confirmpassword.type === "required") ||
                      (watch("tspassword") &&
                        watch("confirmpassword") &&
                        !watch("tspassword").startsWith(watch("confirmpassword")) &&
                        watch("tspassword") !== watch("confirmpassword"))
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="confirmpassword" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>
                      {t("signUp.formInputConformPasswordLabel")}
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("signUp.formInputConformPasswordPlaceholder")}
                      name="confirmpassword"
                      id="confirmpassword"
                      className={watch("confirmpassword") ? "input-field" : "input-field input-error"}
                      {...register("confirmpassword", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                      })}
                      disabled={teacherSignupLoading}
                    />

                    <i
                      className={`${showConfirmPassword ? "icon-hide" : "icon-view"} show-password-icon`}
                      aria-hidden="true"
                      onClick={() => handleToggleConfirmPassword("confirmpassword")}
                    ></i>

                    {errors.confirmpassword && errors.confirmpassword.type === "required" && (
                      <span className="error">Please confirm your new password.</span>
                    )}

                    {errors &&
                      watch("tspassword") &&
                      watch("confirmpassword") &&
                      !watch("tspassword").startsWith(
                        watch("confirmpassword") && watch("tspassword") !== watch("confirmpassword")
                      ) && <span className="error">Please make sure the passwords match.</span>}
                  </div>
                </div>
                <div
                  className={`form-group signup-checkbox ${
                    errors["chkbox-score-teacher"] || errors["chkbox-score-parent-1"] || errors["chkbox-score-parent-2"]
                      ? "input-wrap input-error"
                      : "input-wrap "
                  } }`}
                >
                  {isTeacherLogin ? (
                    <>
                      <div className="mfl-input-wrap">
                        <input
                          type="checkbox"
                          id="chkbox-score-teacher"
                          className="mfl-input-checkbox"
                          name="chkbox-score-teacher"
                          {...register("chkbox-score-teacher", {
                            required: true
                          })}
                        />
                        <label className="mfl-input-checkbox-label agreement-text" htmlFor="chkbox-score-teacher">
                          <span className="agreement-text">
                            {t("signUp.agreementText")}{" "}
                            <a href="https://www.mathfactlab.com/terms-of-service/" className="link">
                              {t("signUp.termsOfServiceText")}
                            </a>{" "}
                            and{" "}
                            <a href="https://www.mathfactlab.com/privacy-policy/" className="link">
                              {t("signUp.privacyPolicyText")}
                            </a>
                          </span>
                        </label>
                      </div>
                      {errors["chkbox-score-teacher"] && errors["chkbox-score-teacher"].type === "required" && (
                        <span className="error">Please select checkbox to continue</span>
                      )}
                    </>
                  ) : (
                    <div className="mfl-input-wrap">
                      <input
                        type="checkbox"
                        id="chkbox-score-parent-1"
                        className="mfl-input-checkbox"
                        name="chkbox-score-parent-1"
                        {...register("chkbox-score-parent-1", {
                          required: true
                        })}
                      />
                      <label
                        className="mfl-input-checkbox-label blue-tick  agreement-text"
                        htmlFor="chkbox-score-parent-1"
                      >
                        <span className="agreement-text">
                          {/* I confirm that I am the lawful parent or legal
                          guardian, and I grant my consent for my child's
                          participation in activities and use of MathFactLab. */}
                          {t("signUp.confirmationTextParent1")}
                        </span>
                      </label>
                      <input
                        type="checkbox"
                        id="chkbox-score-parent-2"
                        className="mfl-input-checkbox"
                        name="chkbox-score-parent-2"
                        {...register("chkbox-score-parent-2", {
                          required: true
                        })}
                      />
                      <label
                        className="mfl-input-checkbox-label blue-tick agreement-text"
                        htmlFor="chkbox-score-parent-2"
                      >
                        <span className="agreement-text">
                          {t("signUp.confirmationTextParent2")}{" "}
                          <a href="https://www.mathfactlab.com/terms-of-service/" className="link">
                            {t("signUp.termsOfServiceText")}
                          </a>{" "}
                          and{" "}
                          <a href="https://www.mathfactlab.com/privacy-policy/" className="link">
                            {t("signUp.privacyPolicyText")}
                          </a>
                        </span>
                      </label>
                      {(errors["chkbox-score-parent-1"] || errors["chkbox-score-parent-2"]) && (
                        <span className="error">Please select checkbox to continue</span>
                      )}
                    </div>
                  )}
                </div>
                {teacherSignupError && (
                  <div className="error-text">
                    <span>{teacherSignupError}</span>
                  </div>
                )}

                {isShowReCaptchaError && (
                  <div className="error-text">
                    <span>Something went wrong!</span>
                  </div>
                )}
                <div className="form-group pt-10">
                  <Button
                    name={t("signUp.SignUpButton")}
                    className="btn btn-primary button-full"
                    type="submit"
                    disabled={teacherSignupLoading}
                  />
                </div>
                <div className="form-group text-center">
                  <p className="font-18">
                    <Link to="/login" className="link">
                      {" "}
                      {t("signUp.alreadyHaveAccountText")}
                    </Link>
                  </p>
                </div>
                {/* <div className="wrap text-center pt-10">
                  <p className="font-18">
                    Not a teacher?{" "}
                    <Link to="/student/login" className="link">
                      {" "}
                      Student login
                    </Link>
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </Layout>

      {/* {process.env.REACT_APP_IS_DISABLE_SIGNUP === "YES" && (
        <>
          <StopUserSignupPopup />
        </>
      )} */}
    </>
  );
}

export default TeacherSignup;
