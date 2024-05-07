import React, { useEffect, useState } from "react";
import { includes } from "lodash";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import Sidebar from "components/common/TeacherLayout/sidebar";
import Header from "components/common/TeacherLayout/header";
import Loader from "components/common/Loader";
import { userRole } from "config/const";
import { authRoles } from "config/const/authRoles";
import { getUserDetails } from "../../../redux/actions/authAction";

const { Content } = Layout;

const PrivateRoute = ({
  children,
  roles = [authRoles.school_admin, authRoles.teacher, authRoles.parent, authRoles.student],
  isHideAppLayout,
  ...props
}) => {
  // Get access token from localStorage or sessionStorage
  const accessToken = localStorage.getItem("user-token") || sessionStorage.getItem("user-token");
  const dispatch = useDispatch();

  const { userDetails, fetchingUserDetailsLoading } = useSelector(({ auth }) => {
    return auth;
  });

  useEffect(() => {
    // Fetch user details if access token is present
    if (accessToken) {
      dispatch(getUserDetails());
    }
  }, [accessToken, dispatch]);

  // Manage sidebar visibility state
  const [isSidebarVisible, setIsSidebarVisible] = useState(localStorage.getItem("is-full-sidebar-visible") === "true");

  // Function to update sidebar visibility in both state and localStorage
  const setIsSidebarVisibleWithLocalStorageUpdate = status => {
    setIsSidebarVisible(status);
    localStorage.setItem("is-full-sidebar-visible", status + "");
  };

  // Redirect to login if no access token is present
  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  // Check role access based on user details
  if (userDetails?.role) {
    const isRoleAccess = includes(roles, userDetails.role);

    // Redirect to login if user doesn't have the required role access
    if (!isRoleAccess) {
      return <Navigate to={"/login"} />;
    }
  }

  if (fetchingUserDetailsLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 244px)",
          width: "100%"
        }}
      >
        <Loader role_id={userDetails?.role_id} />
      </div>
    );
  }

  // Render the protected layout with sidebar, header, and content
  return (
    <>
      {userDetails?.role_id === userRole.STUDENT.role_id ? (
        <>
          <Content className="content">{children}</Content>
        </>
      ) : !isHideAppLayout ? (
        <Layout style={{ minHeight: "100vh" }} className="teacher-layout-wrapper">
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={value => setIsSidebarVisibleWithLocalStorageUpdate(value)}
          />
          <div className="rightPanel">
            <Header {...props} onMenuClick={() => setIsSidebarVisibleWithLocalStorageUpdate(!isSidebarVisible)} />
            <Content className="content">{children}</Content>
          </div>
        </Layout>
      ) : (
        <Content className="content">{children}</Content>
      )}
    </>
  );
};

export default PrivateRoute;
