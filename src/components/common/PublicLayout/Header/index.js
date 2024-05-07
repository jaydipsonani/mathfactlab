import React from "react";
import i18n from "../../../../config/i18n";
import logo from "assets/images/logo.svg";

const Header = props => {
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <header className="header">
        <div className="header-flex">
          <div className="header-cols head-col-left">
            <span className="logo-wrapper">
              <a href="https://www.mathfactlab.com/">
                <img src={logo} alt="MathFactLab" className="login-logo" />
              </a>
            </span>
          </div>
          {process.env.REACT_APP_ENV === "local" && (
            <div className="App-header">
              <button onClick={() => changeLanguage("es")}>de</button>
              <button onClick={() => changeLanguage("en")}>en</button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
