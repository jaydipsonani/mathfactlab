import React from "react";
import AuthHeader from "components/dashboard/StudentAuthHeader";
import ErrorBoundary from "components/common/ErrorBoundary";
import PracticeTest from "./PracticeTest";

const StudentLevelLifterPage = () => {
  return (
    <>
      <ErrorBoundary>
        <AuthHeader />
      </ErrorBoundary>
      <ErrorBoundary>
        <PracticeTest />
      </ErrorBoundary>
    </>
  );
};

export default StudentLevelLifterPage;
