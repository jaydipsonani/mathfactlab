import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithGoogleVerify } from "../../../redux/actions";
import { googleLoginScope } from "config/const";

const GoogleVerify = ({ handleSuccess }) => {
  const dispatch = useDispatch();
  let location = useLocation();

  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  const token = query.get("token");
  // let history = useHistory();

  const [isScopeError, setScopeError] = useState(false);

  const scopeList = query.get("scope")
    ? query
        .get("scope")
        .split(" ")
        .filter(scope => scope.includes("https"))
    : [];
  //After success redirect to thank you page
  // const handleGoogleVerifySuccess = () => {
  //   history.push("/thank-you?verify-with-google=true");
  // };
  const responseGoogleVerify = response => {
    if (
      code &&
      scopeList.length &&
      googleLoginScope.every(scopeString => {
        return scopeList.join(",").includes(scopeString);
      })
    ) {
      const uri = code;
      const uriEncode = encodeURIComponent(uri);

      const body = {
        // role_id: isTeacherLogin
        //   ? userRole.TEACHER.role_id
        //   : userRole.PARENT.role_id,
        code: uriEncode,
        requested_url: location.pathname,
        token: localStorage.getItem("sing_in_with_google_token")
      };
      dispatch(loginWithGoogleVerify(body, handleSuccess));
    } else {
      setScopeError(true);
    }
  };

  useEffect(() => {
    if (code) {
      responseGoogleVerify();
    }
  }, [code]); // eslint-disable-line

  useEffect(() => {
    if (token) {
      localStorage.setItem("google-update-password-token", token);
    }
  }, [token]); // eslint-disable-line

  return (
    <>
      <ul className="social-login-buttons flex">
        <li
          className="social-lb-item flex-grow-1"
          //onClick={handleGoogleLogin}
        >
          {/* <span className="btn-icon btn-google with-text"> */}
          <a
            className="btn-icon btn-google with-text"
            // href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${process.env.REACT_APP_GOOGLE_SCOPE}&include_granted_scopes=true&redirect_uri=${process.env.REACT_APP_FRONTEND_REDIRECT_URL}/teacher/login&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code`}
            href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${googleLoginScope.join(
              "%20"
            )}&include_granted_scopes=true&redirect_uri=${
              process.env.REACT_APP_FRONTEND_REDIRECT_URL
            }/join-user&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&access_type=offline`}
          >
            <i className="icon-color-google" aria-hidden="true"></i> Join with Google
          </a>
          {/* </span> */}
        </li>
      </ul>
      {isScopeError && <p className="error text-center">Please allow all classroom permission.</p>}
    </>
  );
};

export default GoogleVerify;
