import React from "react";
import AuthHeader from "components/dashboard/StudentAuthHeader";
import ErrorBoundary from "components/common/ErrorBoundary";
import PlacementTest from "./PlacementTest";

const StudentPlacementPage = () => {
  return (
    <>
      <ErrorBoundary>
        <AuthHeader />
      </ErrorBoundary>
      <ErrorBoundary>
        <PlacementTest />
      </ErrorBoundary>
    </>
  );
};

export default StudentPlacementPage;
