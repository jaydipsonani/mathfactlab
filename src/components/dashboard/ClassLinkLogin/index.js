import React from "react";
import { useTranslation } from "react-i18next";

const ClassLinkLogin = () => {
  const { t } = useTranslation();
  return (
    <>
      <ul className="social-login-buttons flex">
        <li className="social-lb-item flex-grow-1">
          <a
            className="btn-icon btn-class-link with-text"
            href={`https://launchpad.classlink.com/cltest`}
            rel="noreferrer"
          >
            <i className="icon-color-class-link" aria-hidden="true"></i>
            {t("common.classLink.title")}
          </a>
        </li>
      </ul>
    </>
  );
};
export default ClassLinkLogin;
