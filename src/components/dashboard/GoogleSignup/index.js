import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { teacherLoginWithGoogle } from "../../../redux/actions";
import { googleLoginScope, userRole } from "config/const";

const GoogleSignup = ({ handleSuccess }) => {
  const isTeacherLogin = !localStorage.getItem("is_teacher_login")
    ? true
    : localStorage.getItem("is_teacher_login") === "true";
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  const [isScopeError, setScopeError] = useState(false);

  const scopeList = query.get("scope")
    ? query
        .get("scope")
        .split(" ")
        .filter(scope => scope.includes("https"))
    : [];

  const responseGoogleSignUp = response => {
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
        role_id: isTeacherLogin ? userRole.TEACHER.role_id : userRole.PARENT.role_id,
        code: uriEncode,
        requested_url: location.pathname
      };

      dispatch(teacherLoginWithGoogle(body, handleSuccess));
    } else {
      setScopeError(true);
    }
  };

  useEffect(() => {
    if (code) {
      responseGoogleSignUp();
    }
  }, [code]); // eslint-disable-line

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
            }/signup&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&access_type=offline`}
          >
            <i className="icon-color-google" aria-hidden="true"></i>
            Sign up with Google
          </a>
          {/* </span> */}
        </li>
      </ul>
      {isScopeError && <p className="error text-center">Please allow all classroom permission.</p>}
    </>
  );
};

export default GoogleSignup;
