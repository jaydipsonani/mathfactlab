import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "components/common/PrivateRoute/index";
import PublicRoute from "components/common/PublicRoute/index";
import TeacherStudentListPage from "pages/teacher/students";
import LoginPage from "pages/public/login";
import SchoolAdminTeacherPage from "pages/admin/teachers";
import SchoolAdminClassesPage from "pages/admin/classes";
import SchoolAdminSubSchoolAdminPage from "pages/admin/sub-school-admin";
import SchoolAdminSchoolPage from "pages/admin/school";
import StudentPlacementPage from "pages/student/placement-test";
import StudentPracticeSessionPage from "pages/student/practice-session";
import StudentPracticeSelectActivityPage from "pages/student/practice-select-activity";
import StudentPracticeTestPage from "pages/student/practice-test";
import StudentLevelLifterTestPage from "pages/student/practice-select-activity";
import TeacherClassesPage from "pages/teacher/classes";
import AccountPage from "pages/teacher/update-profile";
import TeacherDashboardPage from "pages/teacher/home";
import TeacherSignupPage from "pages/teacher/signup";
import ForgotPasswordPage from "pages/public/forgot-password";
import ResetPasswordPage from "pages/public/reset-password";
import ResendEmailPage from "pages/public/resend-email";
import ThankyouPage from "pages/public/thank-you";
import ConfirmationPage from "pages/public/confirmation";
import EmailVerifyPage from "pages/public/email-verify";
import PasswordUpdatePage from "pages/public/password-update";
import TeacherTeachingToolsPage from "pages/common/teaching-tools";
import TeacherPracticeSessionPage from "pages/common/practice-session";
import TeacherSelectActivityPage from "pages/common/practice-select-activity";
import TeacherLevelLifterInterviewPage from "pages/common/level-lifter-interview"; //CHANGE
import FAQPage from "pages/common/faqs";
import TeacherClassroomImplementationPage from "pages/common/classroom-implementation";
import FeedbackPage from "pages/common/feedback";
import ClasslinkPage from "components/dashboard/Classlink";
import { authRoles } from "config/const/authRoles";

const RouteList = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {/* admin */}
        <Route
          path="/admin/teacher"
          element={
            <PrivateRoute>
              <SchoolAdminTeacherPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <PrivateRoute>
              <SchoolAdminClassesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/sub-admins"
          element={
            <PrivateRoute>
              <SchoolAdminSubSchoolAdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/schools"
          element={
            <PrivateRoute>
              <SchoolAdminSchoolPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <PrivateRoute roles={authRoles.admin}>
              <TeacherStudentListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/teaching-tools"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <TeacherTeachingToolsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/practice-session"
          element={
            <PrivateRoute roles={authRoles.teacher} isHideAppLayout={true}>
              <TeacherPracticeSessionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/practice-select-activity"
          element={
            <PrivateRoute roles={authRoles.teacher} isHideAppLayout={true}>
              <TeacherSelectActivityPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/level-lifter-interview"
          element={
            <PrivateRoute roles={authRoles.teacher} isHideAppLayout={true}>
              <TeacherLevelLifterInterviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/faqs"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <FAQPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/feedback"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <FeedbackPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/classroom-implementation"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <TeacherClassroomImplementationPage />
            </PrivateRoute>
          }
        />

        {/* teacher */}

        <Route
          path="/teacher/students"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <TeacherStudentListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <TeacherDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <TeacherClassesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/teaching-tools"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <TeacherTeachingToolsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/practice-session"
          element={
            <PrivateRoute roles={authRoles.teacher} isHideAppLayout={true}>
              <TeacherPracticeSessionPage />
            </PrivateRoute>
          }
        />

        {/* // ?? isHideAppLayout props use for hide dashboard layout  */}
        <Route
          path="/teacher/practice-select-activity"
          element={
            <PrivateRoute roles={authRoles.teacher} isHideAppLayout={true}>
              <TeacherSelectActivityPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/level-lifter-interview"
          element={
            <PrivateRoute roles={authRoles.teacher} isHideAppLayout={true}>
              <TeacherLevelLifterInterviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/faqs"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <FAQPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/feedback"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <FeedbackPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/classroom-implementation"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <TeacherClassroomImplementationPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/account"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <AccountPage />
            </PrivateRoute>
          }
        />

        {/* parent  */}

        <Route
          path="/parent/students"
          element={
            <PrivateRoute roles={authRoles.parent}>
              <TeacherStudentListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/faqs"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <FAQPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/feedback"
          element={
            <PrivateRoute roles={authRoles.teacher}>
              <FeedbackPage />
            </PrivateRoute>
          }
        />
        {/* student */}

        {/* <Route path="/student/login" element={<PublicRoute>
          <StudentLoginPage />
        </PublicRoute>} /> */}
        <Route
          path="/student/practice-test"
          element={
            <PrivateRoute roles={authRoles.student}>
              <StudentPracticeTestPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/practice-session"
          element={
            <PrivateRoute roles={authRoles.student}>
              <StudentPracticeSessionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/practice-select-activity"
          element={
            <PrivateRoute roles={authRoles.student}>
              <StudentPracticeSelectActivityPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/placement-test"
          element={
            <PrivateRoute roles={authRoles.student}>
              <StudentPlacementPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/level-lifter-test"
          element={
            <PrivateRoute roles={authRoles.student}>
              <StudentLevelLifterTestPage />
            </PrivateRoute>
          }
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/thank-you"
          element={
            <PublicRoute>
              <ThankyouPage />
            </PublicRoute>
          }
        />
        <Route
          path="/resend-email"
          element={
            <PublicRoute>
              <ResendEmailPage />
            </PublicRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <PublicRoute>
              <ConfirmationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <EmailVerifyPage />
            </PublicRoute>
          }
        />
        <Route
          path="/join-user"
          element={
            <PublicRoute>
              <PasswordUpdatePage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <TeacherSignupPage />
            </PublicRoute>
          }
        />

        <Route path="/class-link" element={<ClasslinkPage />} />
        <Route path="/clever" element={<div>clever Page</div>} />
        <Route path="*" element={<Navigate to="/login" />} />
        {/* <PrivateRoute path="/admin/schools" element={<AdminPage />} allowedRoles={['admin']} /> */}
        {/* <PrivateRoute path="/teacher/students" element={<Placement />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/placement-test" element={<StudentPage />} allowedRoles={['student']} /> */}
        {/* <PrivateRoute path="/teacher/dashboard" element={<Dashboard />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/teacher/classes" element={<TeacherClassesListPage />} allowedRoles={['admin']} /> */}
        {/* <PrivateRoute path="/admin/teacher" element={<SchoolAdminTeacherListPage />} allowedRoles={['admin']} /> */}
        {/* <PrivateRoute path="/admin/classes" element={<SchoolAdminClassesListPage />} allowedRoles={['admin']} /> */}
        {/* <PrivateRoute path="/admin/sub-admins " element={<SubSchoolAdminListPage />} allowedRoles={['admin']} /> */}
        {/* <PrivateRoute path="/admin/schools " element={<SchoolListPage />} allowedRoles={['admin']} /> */}
        {/* <PrivateRoute path="/teacher/teaching-tools " element={<TeacherTeachingToolsPage />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/teacher/practice-session " element={<TeacherPracticeSessionPage />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/teacher/practice-select-activity " element={<TeacherSelectActivityPage />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/teacher/level-lifter-interview " element={<TeacherLevelLifterInterviewPage />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/teacher/faqs " element={<TeacherFAQsPage />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/teacher/feedback " element={<Feedback />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/teacher/classroom/teacher/settings-implementation " element={<TeacherClassroomImplementationPage />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path=" " element={<Settings />} allowedRoles={['teacher']} /> */}
        {/* <PrivateRoute path="/account" element={<UpdateProfile />} allowedRoles={['student']} /> */}
        {/* <PrivateRoute path="/practice-test" element={<StudentPracticeTestPage />} allowedRoles={['student']} /> */}
        {/* <PrivateRoute path="/practice-session" element={<StudentPracticeSessionPage />} allowedRoles={['student']} /> */}
        {/* <PrivateRoute path="/practice-select-activity" element={<StudentPracticeSelectActivityPage />} allowedRoles={['student']} /> */}
        {/* <PublicRoute path="/teacher/signup" element={<TeacherSignupPage />} allowedRoles={['teacher']} /> */}
        {/* <PublicRoute path="/forgot-password" element={<TeacherForgotPasswordPage />} allowedRoles={['teacher']} /> */}
        {/* <PublicRoute path="/reset-password" element={<TeacherResetPasswordPage />} allowedRoles={['teacher']} /> */}
        {/* <PublicRoute path=" /thank-you" element={<ThankyouPage />} allowedRoles={['teacher']} /> */}
        {/* <PublicRoute path="/resend-email" element={<ResendEmailPage />} allowedRoles={['teacher']} /> */}
        {/* <PublicRoute path="/confirmation" element={<ConfirmationPage />} allowedRoles={['teacher']} /> */}
        {/* <PublicRoute path=" /verify-email" element={<EmailVerificationPage />} allowedRoles={['teacher']} /> */}
        {/* <PublicRoute path=" /join-user" element={<PasswordUpdatePage />} allowedRoles={['teacher']} /> */}
        {/* <PublicRoute path="/student/login" element={<StudentLoginPage />} allowedRoles={['student']} /> */}
        {/* <PublicRoute path="/teacher/login" element={<TeacherLoginPage />} allowedRoles={['teacher']} /> */}

        {/* <PublicRoute>
              <Authentication />
            </PublicRoute>
<PrivateRoute>
                <Home />
              </PrivateRoute> */}
      </Routes>
    </Router>
  );
};

export default RouteList;
