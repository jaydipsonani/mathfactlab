import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./actions/authAction";
import { practiceReducer } from "./actions/practiceAction";
import quizReducer from "./actions/quizAction";
import classCodeReducer from "./actions/classCodeAction";
import userReducer from "./actions/userAction";
import notificationReducer from "./actions/notifications";
import schoolReducer from "./actions/schoolAction";
import teacherReducer from "./actions/teacherAction";
import headerReducer from "./actions/headerAction";
import subSchoolAdminAction from "./actions/subSchoolAdminAction";

const rootReducer = {
  auth: authReducer,
  strategy: practiceReducer,
  quiz: quizReducer,
  classCode: classCodeReducer,
  user: userReducer,
  notification: notificationReducer,
  schoolData: schoolReducer,
  teacherData: teacherReducer,
  header: headerReducer,
  subSchoolAdminList: subSchoolAdminAction
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
