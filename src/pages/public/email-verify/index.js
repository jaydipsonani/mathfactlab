import React, { useEffect } from "react";
import Layout from "../../../components/common/PublicLayout";

import resetLinkImg from "assets/images/reset-link.svg";
import { Link } from "react-router-dom";
import teacherLoginImg from "assets/images/teacher-login.svg";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmMail } from "../../../redux/actions";
import { useTranslation } from "react-i18next";

const EmailVerifyPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const { emailVerificationError } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (token) {
      const body = {
        token: token
      };
      dispatch(confirmMail(body));
    }
  }, [token]); // eslint-disable-line

  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector sm-vector">
                <img src={teacherLoginImg} className="vector-img" alt="loginPasswordImage" />
              </div>
              <div className="login-vector-text">
                <h4 className="h4 text-white font-normal">{t("common.public.subText")}</h4>
              </div>
            </div>
          </div>
          <div className="login-cols">
            <div className="login-cols-inner confirmation-wrap text-center">
              {emailVerificationError ? (
                <div className="sign-vector">
                  <img src={resetLinkImg} alt="resetLinkImg" className="signtop-img"></img>
                  <h2 className="login-title">{t("verify-email.thankyouSubText")}</h2>
                  <p className="font-18 text-center login-subtext">{emailVerificationError}</p>

                  <div className="wrap text-center pt-10">
                    <p className="font-18">
                      <Link to="/login" className="link">
                        Back to login
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="sign-vector">
                  <img src={resetLinkImg} alt="resetLinkImg" className="signtop-img"></img>
                  <h2 className="login-title">{t("verify-email.thankyouSubText")}</h2>
                  <p className="font-18 text-center login-subtext">
                    {emailVerificationError ? emailVerificationError : t("verify-email.emailVerified")}
                  </p>
                  <div className="wrap text-center pt-10">
                    <p className="font-18">
                      <Link to="/login" className="link">
                        {t("common.public.backLoginLink")}
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EmailVerifyPage;
