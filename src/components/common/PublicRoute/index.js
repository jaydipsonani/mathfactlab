// import { ACCESS_TOKEN } from 'constants/common.constant';
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userRole } from "config/const";
// import { getStorageValue } from 'services/axiosClient';

const PublicRoute = ({ children }) => {
  const location = useLocation();
  // Retrieve access token and role ID from respective storage
  const accessToken = sessionStorage.getItem("user-token") || localStorage.getItem("user-token");
  const roleId = sessionStorage.getItem("user-role") || localStorage.getItem("user-role");

  if (accessToken) {
    switch (+roleId) {
      case userRole.SCHOOL_ADMIN.role_id:
        return <Navigate to="/admin/students" state={{ from: location }} />;
      case userRole.PARENT.role_id:
        return <Navigate to="/parent/students" state={{ from: location }} />;
      case userRole.TEACHER.role_id:
        return <Navigate to="/teacher/students" state={{ from: location }} />;
      case userRole.STUDENT.role_id:
        return <Navigate to="/student/practice-select-activity" state={{ from: location }} />;

      default:
        return children;
    }
  }
  return children;
};

export default PublicRoute;
