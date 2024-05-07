import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../components/common/PublicLayout";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../../redux/actions";
import loginPasswordImage from "assets/images/login/password.svg";
import Button from "components/common/Button";
import { useTranslation } from "react-i18next";

const ForgotPasswordPage = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  //after forgot password success redirect  to confirmation page
  function handleForgotPasswordSuccess() {
    navigate("/confirmation");
  }
  const { forgotPasswordError, forgotPasswordLoading } = useSelector(({ auth }) => auth);

  //forgot password  api call
  const handleForgotPassword = data => {
    const { resetemail } = data;
    if (forgotPasswordLoading) return;

    const body = {
      email: resetemail
    };

    dispatch(forgotPassword(body, handleForgotPasswordSuccess));
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
              <h2 className="login-title">{t("forgot-password.title")}</h2>
              <p className="font-18 text-center login-subtext">{t("forgot-password.subtext")}</p>
              <form name="student-login" onSubmit={handleSubmit(handleForgotPassword)}>
                <div className="form-group">
                  {/* <!-- Add className for error red border ===> input-error  --> */}
                  <div
                    className={
                      (errors.resetemail && errors.resetemail.type === "required") ||
                      (errors.resetemail && errors.resetemail.type === "pattern")
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="resetemail" className="input-label">
                      <i className="icon-envelope" aria-hidden="true"></i>
                      {t("signUp.formInputEmailNameLabel")}
                    </label>
                    <input
                      placeholder={t("forgot-password.formInputConformPasswordPlaceholder")}
                      name="resetemail"
                      id="resetemail"
                      className={watch("resetemail") ? "input-field" : "input-field input-error"}
                      {...register("resetemail", {
                        required: true,
                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                      })}
                    />
                    {errors.resetemail && errors.resetemail.type === "required" && (
                      <span className="error">Please enter an email.</span>
                    )}
                    {errors.resetemail && errors.resetemail.type === "pattern" && (
                      <span className="error">Please enter valid email.</span>
                    )}
                  </div>
                </div>
                {forgotPasswordError && (
                  <div className="error-text">
                    <span>{forgotPasswordError}</span>
                  </div>
                )}
                <div className="form-group pt-10">
                  <Button
                    name={t("forgot-password.buttonName")}
                    className="btn btn-primary button-full"
                    type="submit"
                  />
                </div>

                <div className="wrap text-center pt-10">
                  <p className="font-18">
                    <Link to="/login" className="link">
                      {t("forgot-password.linkLoginInstead")}
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

export default ForgotPasswordPage;
