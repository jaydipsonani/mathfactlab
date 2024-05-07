import React from "react";
import Layout from "../../../components/common/PublicLayout";
import loginPasswordImage from "assets/images/login/password.svg";
import resetLinkImg from "assets/images/reset-link.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ConfirmationPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector sm-vector">
                <img src={loginPasswordImage} className="vector-img" alt="loginPasswordImage" />
              </div>
              <div className="login-vector-text">
                <h4 className="h4 text-white font-normal">{t("thankyou.vectorText")}</h4>
              </div>
            </div>
          </div>
          <div className="login-cols">
            <div className="login-cols-inner confirmation-wrap text-center">
              <div className="sign-vector">
                <img src={resetLinkImg} alt="resetLinkImg" className="signtop-img"></img>
                <h2 className="login-title">{t("confirmation.title")}</h2>
                <p className="font-18 text-center login-subtext"> {t("confirmation.subText")}</p>
                <p>
                  {t("confirmation.linkSubText")}{" "}
                  <a href="mailto:support@mathfactlab.com" className="link-blue">
                    {t("confirmation.mathFactLabLink")}
                  </a>{" "}
                  and we’ll take care of it.
                </p>
                <div className="wrap text-center pt-10">
                  <p className="font-18">
                    <Link to="/login" className="link">
                      {t("common.public.backLoginLink")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ConfirmationPage;
