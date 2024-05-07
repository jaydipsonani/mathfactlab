import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// import { teacherLogin, studentLogin } from "store/action"; CHANGE THIS REQUIRED
import { teacherLogin, studentLogin, resendVerificationMail } from "../../../redux/actions/authAction";
import { Switch, Modal } from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
// import QrReader from "react-qr-scanner";
import { Scanner } from "@yudiel/react-qr-scanner";
import Button from "components/common/Button";
import PublicLayout from "../../../components/common/PublicLayout";
import GoogleLogin from "components/dashboard/GoogleLogin";
import ClassLinkLogin from "components/dashboard/ClassLinkLogin";
import { userRole } from "config/const";
import teacherLoginImg from "assets/images/teacher-login.svg";
// import { resendVerificationMail, startSession } from "store/action";CHANGE THIS REQUIRED
import { startSession } from "../../../redux/actions/practiceAction";
import { useTranslation } from "react-i18next";

const LoginPage = props => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const recaptchaRef = React.useRef();

  const { loginLoading, loginError, errorType, studentLoginError } = useSelector(({ auth }) => auth);
  const [isShowReCaptchaError, setIsShowReCaptchaError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");
  const [isTeacherLogin, setIsTeacherLogin] = useState(true);
  const [isStudentLogin, setIsStudentLogin] = useState(false);
  // const [showQRReader, setShowQRReader] = useState(false);
  const [showQRScannerModal, setShowQRScannerModal] = useState(false);

  // const { register, handleSubmit, watch, errors, getValues } = useForm({
  //     defaultValues: { classcode: localStorage.getItem("class_code") || "" },
  // });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: { classcode: localStorage.getItem("class_code") || "" }
  });

  function handleLoginSuccess(roleId) {
    switch (roleId) {
      case userRole.SCHOOL_ADMIN.role_id:
        navigate("/admin/students");
        break;
      case userRole.PARENT.role_id:
        navigate("/parent/students");
        break;
      default:
        navigate("/teacher/students");
        break;
    }
  }

  const handleLoginFailure = () => {
    recaptchaRef.current.reset();
  };

  //After student login success redirection
  function handleLoginSuccessStudent(userDetails) {
    const {
      profile: {
        student_learning_mode_id,
        mul_div_level_id,
        add_sub_level_id,
        current_assignment_id,
        session_time_limit
      }
    } = userDetails;

    const activeLevelId = student_learning_mode_id === 1 ? +add_sub_level_id : +mul_div_level_id;

    const body = {
      start_time: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
      student_learning_mode_id: student_learning_mode_id,
      level_id: activeLevelId === 0 ? "" : activeLevelId,
      starting_level_id: activeLevelId === 0 ? "" : activeLevelId,
      // is_assignment_session: is_assignment_on,
      assignment_id: current_assignment_id,
      session_timeout: session_time_limit,
      ending_level_id: activeLevelId === 0 ? "" : activeLevelId
    };
    dispatch(startSession(body));
    sessionStorage.setItem("isSessionStarted", true);
    sessionStorage.setItem("session_start_date", moment().format("YYYY-MM-DD HH:mm"));

    //redirection base on level
    // if student has done practice test then redirected to practice session otherwise on placement test

    if (
      (student_learning_mode_id === 1 && !!add_sub_level_id) ||
      (student_learning_mode_id === 2 && !!mul_div_level_id)
    ) {
      navigate("/student/practice-select-activity");
    } else {
      navigate("/student/placement-test");
    }
  }
  //Login page api call
  // const handleSubmitLoginForm = async data => {
  //   // const token = await recaptchaRef.current.executeAsync();
  //   const token = "123";

  //   if (loginLoading) return;
  //   if (token) {
  //     const { tpassword, username } = data;
  //     const body = {
  //       email: username,
  //       password: tpassword,
  //     };
  //     setIsShowReCaptchaError(false);
  //     dispatch(teacherLogin(body, handleLoginSuccess, handleLoginFailure));
  //   } else {
  //     setIsShowReCaptchaError(true);
  //   }
  // };
  // const handleSubmitLoginForm = async data => {
  //   // const token = "123"; // You can replace this with actual token handling if needed

  //   if (loginLoading) return;
  //   const { tpassword, user_name, classcode } = data;

  //   // Create the 'body' object based on the data
  //   const body = {
  //     email: user_name,
  //     password: tpassword,
  //     class_code: classcode,
  //   };

  //   // If the 'user_name' includes '@', it's a teacher login
  //   if (user_name.includes("@")) {
  //     setIsShowReCaptchaError(false);
  //     dispatch(teacherLogin(body, handleLoginSuccess, handleLoginFailure));
  //   } else {
  //     //student Login
  //     dispatch(studentLogin(body, handleLoginSuccess, handleLoginFailure));
  //   }
  // };
  const validateEmail = email => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email?.trim());
  };

  const handleChangeLoginType = () => {
    if (!validateEmail(watch("username"))) {
      setIsTeacherLogin(false);
      setIsStudentLogin(true);
    } else {
      setIsTeacherLogin(true);
      setIsStudentLogin(false);
    }
  };
  const handleSubmitLoginForm = async data => {
    if (loginLoading) return;
    const { password, username, classcode } = data; // Destructure properties from data

    // If the 'username' includes '@', it's a teacher login
    if (validateEmail(username)) {
      const body = {
        email: username?.trim(),
        password: password?.trim()
      };

      setIsShowReCaptchaError(false);
      dispatch(teacherLogin(body, handleLoginSuccess, handleLoginFailure));
      setIsTeacherLogin(true); // Set teacher login state to true
      setIsStudentLogin(false); // Set student login state to false
    } else {
      // Student Login

      setIsTeacherLogin(false); // Set teacher login state to false
      setIsStudentLogin(true); // Set student login state to true
      if (classcode) {
        const body = {
          user_name: username?.trim(),
          password: password?.trim(),
          class_code: classcode?.trim()
        };
        dispatch(studentLogin(body, handleLoginSuccessStudent));
      }
    }
  };

  const handleToggleShowPassword = inputFieldID => {
    setActiveInputFieldID(inputFieldID);
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (watch("classcode")) {
      localStorage.setItem("class_code", watch("classcode"));
    }
  }, [watch("classcode")]); // eslint-disable-line
  const handleEmailSendSuccess = () => {
    navigate("/thank-you?login=true");
  };

  const handleEmailSendFailure = message => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: { vertical: "bottom", horizontal: "left" }
    });
  };

  const handleResentVerificationEmail = () => {
    const body = {
      email: getValues("username")
    };
    dispatch(resendVerificationMail(body, handleEmailSendSuccess, handleEmailSendFailure));
  };

  const onChangeSelectTeacherLogin = checked => {
    setIsTeacherLogin(checked);
    localStorage.setItem("is_teacher_login", checked);
  };

  useEffect(() => {
    document.getElementById("beacon-container") && (document.getElementById("beacon-container").style.display = "none");
  }, []);

  // //QR reader
  // const handleLoginButtonClick = () => {
  //   setShowQRReader(true);
  // };
  //Or scanner
  const handleQRScan = (result, newResult) => {
    try {
      //Qr Scanner text in convert object
      const parsedData = JSON.parse(result);

      // Define the expected keys
      const expectedKeys = ["class_code", "user_name", "password"];

      // Get the keys of the parsed object
      const parsedKeys = Object.keys(parsedData);

      // Check if the parsed object has the expected keys
      const hasAllExpectedKeys = expectedKeys.every(key => parsedKeys.includes(key));

      // Student Login API after Qr scanner
      if (hasAllExpectedKeys && parsedKeys.length === expectedKeys.length) {
        const body = {
          user_name: parsedData.user_name?.trim(),
          password: parsedData.password?.trim(),
          class_code: parsedData.class_code?.trim()
        };

        dispatch(studentLogin(body, handleLoginSuccessStudent));
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error("Student Login QR Code is not valid. Please try correct one.");
      console.error(e);
    }
  };

  const handleLoginQRCodeButtonClick = () => {
    setShowQRScannerModal(true);
  };
  return (
    <>
      <PublicLayout>
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
              <h2 className="login-title">{t("login.title")}</h2>
              <p className="font-18 text-center login-subtext" style={{ display: "none" }}>
                Parent <Switch defaultChecked onChange={onChangeSelectTeacherLogin} /> Teacher
              </p>
              {/* <div className="tabs">
                <div className="tab-header">
                  <h5 className="tab-link">
                    <a className="active" href="#signup-tab-content">
                      Student
                    </a>
                  </h5>
                </div>
                <div className="tab-header">
                  <h5 className="tab-link">
                    <a href="#login-tab-content">Teacher</a>
                  </h5>
                </div>
                <div className="tab-header">
                  <h5 className="tab-link">
                    <a href="#login-tab-content">Educator</a>
                  </h5>
                </div>
              </div> */}
              <form name="student-login" onSubmit={handleSubmit(handleSubmitLoginForm)}>
                <div className="social-group">
                  <GoogleLogin handleSuccess={handleLoginSuccess} />
                </div>

                <div className="social-group">
                  <ClassLinkLogin />
                </div>

                <div className="text-separator">
                  <span className="txt-sep">{t("login.textSeparator.text")}</span>
                </div>
                <div className="form-group">
                  {/* <!-- Add className for error red border ===> input-error  --> */}
                  <div
                    className={
                      (errors.username && errors.username.type === "required") ||
                      (errors.username && errors.username.type === "pattern")
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="username" className="input-label">
                      {/* <i className="icon-envelope" aria-hidden="true"></i>
                       */}
                      <i className="icon-user" aria-hidden="true"></i>
                      {t("login.formInputUsernameLabel")}
                    </label>
                    <input
                      placeholder={t("login.formInputUsernamePlaceholder")}
                      name="username"
                      id="username"
                      className={watch("username") ? "input-field" : "input-field input-error"}
                      // ref={register({
                      //     required: true,
                      //     // pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      // })}
                      {...register("username", { required: true })}
                      onBlur={() => handleChangeLoginType()}
                      disabled={loginLoading}
                    />
                    {errors.username && errors.username.type === "required" && (
                      <span className="error">Please enter email.</span>
                    )}
                    {/* {errors.username && errors.username.type === "pattern" && (
                      <span className="error">Please enter valid email.</span>
                    )} */}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.password && errors.password.type === "required"
                        ? "input-wrap input-error"
                        : errors.password && errors.password.type === "pattern"
                          ? "input-wrap input-error-without-shake"
                          : "input-wrap"
                    }
                  >
                    <label htmlFor="password" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>
                      {t("login.formInputPasswordLabel")}
                    </label>
                    <input
                      type={showPassword && activeInputFieldID === "password" ? "text" : "password"}
                      // placeholder="Enter your password"
                      placeholder={t("login.formInputPasswordPlaceholder")}
                      name="password"
                      id="password"
                      className={watch("password") ? "input-field" : "input-field input-error"}
                      // ref={register({
                      //     required: true,
                      //     // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                      // })}
                      {...register("password", { required: true })}
                      disabled={loginLoading}
                    />
                    <i
                      className={
                        showPassword && activeInputFieldID === "password"
                          ? "icon-hide show-password-icon"
                          : "icon-view show-password-icon"
                      }
                      aria-hidden="true"
                      onClick={() => handleToggleShowPassword("password")}
                    ></i>
                    {errors.password && errors.password.type === "required" && (
                      <span className="error">Please enter password.</span>
                    )}
                    {/* {errors.tpassword &&
                      errors.tpassword.type === "pattern" && (
                        <span className="error">
                          Required: 8 characters, including UPPER/lowercase and
                          numeric.
                        </span>
                      )} */}
                  </div>
                </div>
                {isStudentLogin && (
                  <div className="form-group">
                    {/* <!-- Add className for error red border ===> input-error  --> */}
                    <div
                      className={
                        errors.classcode && errors.classcode.type === "required"
                          ? "input-wrap input-error"
                          : "input-wrap "
                      }
                    >
                      <label htmlFor="classcode" className="input-label">
                        {/* <img src={classcodeImg} alt="classcodeImg" /> */}
                        <i
                          className="icon-code-lock"
                          aria-hidden="true"
                          style={{ fontSize: "22px", opacity: "0.8" }}
                        ></i>
                        Class Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your class code"
                        name="classcode"
                        id="classcode"
                        className={watch("classcode") ? "input-field" : "input-field input-error"}
                        // ref={register({ required: true })}
                        {...register("classcode", { required: true })}
                      />

                      {errors.classcode && errors.classcode.type === "required" && (
                        <span className="error">Please enter classcode.</span>
                      )}
                    </div>
                  </div>
                )}
                {isTeacherLogin &&
                  loginError &&
                  (errorType === "verify_email" ? (
                    <div className="normal-error-text">
                      <span>
                        Please verify your email to login. If you haven’t received an email,{" "}
                        <Link onClick={() => handleResentVerificationEmail()} className="link">
                          click here{" "}
                        </Link>{" "}
                        to resend the verification email.
                      </span>
                    </div>
                  ) : (
                    <div className="error-text">
                      <span>{loginError}</span>
                    </div>
                  ))}
                {isStudentLogin && studentLoginError && (
                  <div className="error-text">
                    <span>{studentLoginError}</span>
                  </div>
                )}
                {isStudentLogin && (
                  <div className="form-group">
                    <p
                      className="font-18 text-center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    ></p>
                  </div>
                )}
                {isShowReCaptchaError && (
                  <div className="error-text">
                    <span>Something went wrong!</span>
                  </div>
                )}
                {isTeacherLogin && (
                  <div className="form-group pt-10">
                    <Button
                      name={t("login.title")}
                      className="btn btn-primary button-full"
                      type="submit"
                      disabled={loginLoading}
                      onClick={() => {
                        setIsTeacherLogin(true);
                        setIsStudentLogin(false);
                      }}
                    />
                  </div>
                )}
                {isStudentLogin && (
                  <div className="form-group pt-10">
                    <Button
                      name={t("login.title")}
                      className="btn btn-secondary button-full"
                      type="submit"
                      disabled={loginLoading}
                      onClick={() => {
                        setIsTeacherLogin(false);
                        setIsStudentLogin(true);
                      }}
                    />
                  </div>
                )}
                <div className="form-group">
                  <p
                    className="font-18 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Link to="/signup" className="link">
                      {" "}
                      {t("login.LinkName")}{" "}
                    </Link>

                    <i className="icon-elipse sm-elipse"></i>
                    <Link to="/forgot-password" className="link">
                      {" "}
                      {t("login.LinkForgotPassword")}{" "}
                    </Link>
                  </p>
                  <div>
                    {/* Qr Code Scanner with Qr CodeData */}
                    <Button
                      name="Login with QR Code"
                      className="btn btn-secondary button-full mt-10"
                      type="button"
                      onClick={() => handleLoginQRCodeButtonClick()}
                    />
                    {/* {showQRReader && (
                      <QrReader
                        onResult={handleQRScan}
                        style={{ width: '100%' }}
                      />
                    )} */}

                    <Modal
                      title="Scan QR Code"
                      open={showQRScannerModal}
                      onCancel={() => setShowQRScannerModal(false)}
                      footer={null}
                    >
                      <Scanner
                        onResult={handleQRScan}
                        style={{ width: "100%" }}
                        // onError={error => {
                        //   enqueueSnackbar("Student Login QR Code is not valid. Please try another one.", {
                        //     variant: "error",
                        //     anchorOrigin: { vertical: "top", horizontal: "center" }
                        //   });
                        // }}
                      />
                    </Modal>
                  </div>
                </div>
                {/* <div className="App-intro">
                  <Trans>
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                  </Trans>
                  <Trans i18nKey="welcome">trans</Trans>
                </div> */}

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
      </PublicLayout>
    </>
  );
};

export default LoginPage;
