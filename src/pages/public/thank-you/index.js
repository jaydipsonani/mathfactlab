import React, { useState } from "react";
import Layout from "../../../components/common/PublicLayout";
import thankyouImg from "assets/images/login/thankyou.svg";
import thankyouSuccessImg from "assets/images/login/thankyou-success.svg";
import homePageBanner from "assets/images/home-banner-inner.png";
import { useDispatch } from "react-redux";
import { resendVerificationMail } from "../../../redux/actions";

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ThankyouPage = props => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const query = new URLSearchParams(location.search);

  const isLoginUser = query.get("login") === "true";
  const isGoogleUser = query.get("verify-with-google") === "true";
  const isJoinUser = query.get("user-join") === "true";

  const mail = sessionStorage.getItem("user-mail");

  const [resendMailSuccessMessage, setResendMailSuccessMessage] = useState("");
  const [resendMailErrorMessage, setResendMailErrorMessage] = useState("");

  const handleEmailSendSuccess = () => {
    setResendMailSuccessMessage("Resend email verification sent successfully.");
  };

  const handleEmailSendFailure = message => {
    setResendMailErrorMessage(message);
  };

  const handleResentVerificationEmail = () => {
    const body = {
      email: mail
    };
    dispatch(resendVerificationMail(body, handleEmailSendSuccess, handleEmailSendFailure));
  };

  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector">
                <img src={isLoginUser ? homePageBanner : thankyouImg} className="vector-img" alt="thankyouImg" />
              </div>
              <div className="login-vector-text">
                <h4 className="h4 text-white font-normal">{t("thankyou.vectorText")}</h4>
              </div>
            </div>
          </div>
          <div className="login-cols">
            <div className="login-cols-inner confirmation-wrap text-center">
              <div className="sign-vector">
                <img src={thankyouSuccessImg} alt="thankyouSuccessImg" className="signtop-img" />
              </div>

              {isGoogleUser ? (
                <>
                  <div className="form-group">
                    <span className="font-24 login-subtext"> Your gmail account has been verify with us.</span>
                  </div>
                  <div className="form-group">
                    <span className="font-24 login-subtext"> Now try to login with Gmail</span>
                  </div>
                </>
              ) : isLoginUser ? (
                <>
                  <h2 className="login-title">Email verification sent</h2>
                  <div className="form-group">
                    <span className="font-24 login-subtext">
                      An email has been sent to <b>{mail}</b> to confirm your account.
                    </span>
                  </div>
                  <div className="form-group">
                    <span className="font-24 login-subtext"> Please check your email and verify to login.</span>
                  </div>
                  <div className="form-group">
                    {resendMailSuccessMessage ? (
                      <span className="font-24 mail-resend-success"> {resendMailSuccessMessage}</span>
                    ) : resendMailErrorMessage ? (
                      <span className="font-24 mail-resend-failure"> {resendMailErrorMessage}</span>
                    ) : (
                      <span className="font-24 link" onClick={() => handleResentVerificationEmail()}>
                        {" "}
                        Click here to resend verification email.
                      </span>
                    )}
                  </div>
                </>
              ) : isJoinUser ? (
                <>
                  <div className="form-group">
                    <span className="font-24 login-subtext"> Your password has been set successfully.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <span className="font-24 login-subtext"> {t("thankyou.successText")}</span>
                  </div>
                  <div className="form-group">
                    <span className="font-24 login-subtext"> {t("thankyou.loginText")}</span>
                  </div>
                </>
              )}
              <div className="wrap">
                <span className="font-24">
                  <Link to="/login" className="link">
                    {t("thankyou.loginLink")}
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ThankyouPage;
