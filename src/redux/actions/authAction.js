import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
import { gaErrorLogger } from "utils/helpers";
import { message } from "antd";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    student: "",
    studentLoginLoading: false,
    studentLoginError: "",
    // userDetails: {},
    userDetails: {
      profile: {
        is_super_level_lifter_lock: false,
        first_name: "",
        last_name: "",
        student_learning_mode_id: ""
      }
    },

    userPermissions: null,
    createSessionLoading: false,
    sessionDetails: null,
    createSessionError: "",
    updateUserProfileLoading: false,
    updateUserProfileError: "",
    logoutLoading: false,
    logoutLoadingError: ""
  },
  reducers: {
    authStudentLogin: state => {
      state.studentLoginLoading = true;
      state.studentLoginError = "";
    },
    authStudentLoginSuccess: (state, action) => {
      const authenticationPermission = {
        1: ["admin"],
        2: ["teacher"],
        3: ["student"],
        4: ["parent"],
        5: ["school_admin"]
      };
      state.studentLoginLoading = false;
      state.userDetails = action.payload.user;
      state.userPermissions = authenticationPermission[action.payload.user.role_id];
    },
    authStudentLoginFailure: (state, action) => {
      state.studentLoginLoading = false;
      state.studentLoginError = action.payload.error;
    },

    //LOGOUT
    authLogout: state => {
      state.logoutLoading = true;
    },
    authLogoutSuccess: state => {
      // state.userDetails = {};
      // state.logoutLoading = false;
      return {};
    },
    authLogoutFailure: (state, action) => {
      state.logoutLoading = false;
      state.logoutLoadingError = action.payload.error;
    },
    // Action creators for updating teacher profile
    updateTeacherProfile: state => {
      return {
        ...state,
        updateUserProfileLoading: true,
        updateUserProfileError: ""
      };
    },
    updateTeacherProfileSuccess: (state, action) => {
      const updatedProfile = {
        ...state.userDetails.profile,
        ...action.payload.profile
      };

      const updatedUser = {
        ...state.userDetails,
        ...action.payload,
        profile: updatedProfile
      };

      return {
        ...state,
        updateUserProfileLoading: false,
        userDetails: updatedUser
      };
    },
    updateTeacherProfileFailure: (state, action) => {
      return {
        ...state,
        updateUserProfileLoading: false,
        updateUserProfileError: action.payload.error
      };
    },
    authLogin: state => {
      return {
        ...state,
        loginLoading: true,
        loginError: "",
        errorType: ""
      };
    },
    authLoginSuccess: (state, action) => {
      const authenticationPermission = {
        1: ["admin"],
        2: ["teacher"],
        3: ["student"],
        4: ["parent"],
        5: ["school_admin"]
      };
      return {
        ...state,
        loginLoading: false,
        userDetails: action.payload.data.user,
        userPermissions: authenticationPermission[action.payload.data.user.role_id]
      };
    },
    authLoginFailure: (state, action) => {
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload.error,
        errorType: action.payload.error_type
      };
    },

    // TEACHER SIGN UP
    authTeacherSignup: state => {
      return {
        ...state,
        teacherSignupLoading: false,
        teacherSignupError: ""
      };
    },
    authTeacherSignupSuccess: (state, action) => {
      return {
        ...state,
        teacherSignupLoading: false,
        teacherSignupSuccessMessage: action.payload.message
        // userDetails: action.payload.user,
        // userPermissions:
        // authenticationPermission[action.payload.user.role_name],
      };
    },
    authTeacherSignupFailure: (state, action) => {
      return {
        ...state,
        teacherSignupLoading: false,
        teacherSignupError: action.payload.error
      };
    },

    // FETCH USER DETAILS
    fetchUserDetails: state => {
      return {
        ...state,
        fetchingUserDetailsLoading: true,
        updateUserProfileError: ""
      };
    },
    fetchUserDetailsSuccess: (state, action) => {
      const authenticationPermission = {
        1: ["admin"],
        2: ["teacher"],
        3: ["student"],
        4: ["parent"],
        5: ["school_admin"]
      };

      return {
        ...state,
        fetchingUserDetailsLoading: false,
        userDetails: action.payload,
        userPermissions: authenticationPermission[action.payload.role_id]
      };
    },
    fetchUserDetailsFailure: (state, action) => {
      return {
        ...state,
        fetchingUserDetailsLoading: false,
        fetchingUserDetailsError: action.payload.error
      };
    },

    // DELETE USER DETAILS
    deleteUserDetails: state => {
      return {
        ...state,
        deleteUserDetailsLoading: true,
        deleteUserProfileError: ""
      };
    },
    deleteUserDetailsSuccess: (state, action) => {
      return {
        ...state,
        userDetails: {},
        userPermissions: [],
        deleteUserDetailsLoading: false
      };
    },
    deleteUserDetailsFailure: (state, action) => {
      return {
        ...state,
        deleteUserDetailsLoading: false,
        deleteUserProfileError: action.payload.error
      };
    },
    // FORGOT PASSWORD
    authForgotPassword: state => {
      return {
        ...state,
        forgotPasswordLoading: true,
        forgotPasswordError: ""
      };
    },
    authForgotPasswordSuccess: (state, action) => {
      return {
        ...state,
        forgotPasswordLoading: false
      };
    },
    authForgotPasswordFailure: (state, action) => {
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: action.payload.error
      };
    },
    // RESET PASSWORD
    authResetPassword: state => {
      return {
        ...state,
        resetPasswordLoading: true,
        resetPasswordError: ""
      };
    },
    authResetPasswordSuccess: (state, action) => {
      return {
        ...state,
        resetPasswordLoading: false
      };
    },
    authResetPasswordFailure: (state, action) => {
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: action.payload.error
      };
    },

    // SET SCHOOL ADMIN PASSWORD
    setSchoolAdminPassword: state => {
      return {
        ...state,
        setSchoolAdminPasswordLoading: true,
        setSchoolAdminPasswordError: ""
      };
    },
    setSchoolAdminPasswordSuccess: (state, action) => {
      return {
        ...state,
        setSchoolAdminPasswordLoading: false
      };
    },
    setSchoolAdminPasswordFailure: (state, action) => {
      return {
        ...state,
        setSchoolAdminPasswordLoading: false,
        setSchoolAdminPasswordError: action.payload.error
      };
    },

    // UPDATE USER LEVEL ID
    updateUserLevelIdSuccess: (state, action) => {
      // You can directly update the state with the payload
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            add_sub_level_id:
              action.payload.student_learning_mode_id === 1
                ? +state.userDetails.profile.add_sub_level_id === 17
                  ? +state.userDetails.profile.add_sub_level_id + 9
                  : +state.userDetails.profile.add_sub_level_id + 1 + ""
                : state.userDetails.profile.add_sub_level_id,
            mul_div_level_id:
              action.payload.student_learning_mode_id === 2
                ? +state.userDetails.profile.mul_div_level_id + 1 + ""
                : state.userDetails.profile.mul_div_level_id,
            is_level_lifter_lock: 0
          }
        }
      };
    },

    // UPDATE USER DETAILS
    updateUserDetails: (state, action) => {
      // You can directly update the state with the payload
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            is_level_lifter_lock: 0
            // Add other properties from the payload if needed
            // For example: newProperty: action.payload.newProperty,
          }
        }
      };
    },
    // UPDATE USER PROFILE
    updateUserProfile: (state, action) => {
      // Merge the existing user details with the payload
      let updatedUserProfile = {
        ...state.userDetails,
        ...action.payload
      };

      return {
        ...state,
        userDetails: updatedUserProfile
      };
    },
    // UPDATE_USER_LEVEL_LIFTER_COUNT
    updateLevelLifterCount: (state, action) => {
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            is_add_sub_level_lifter:
              action.payload.student_learning_mode_id === 1
                ? +state.userDetails.profile.is_add_sub_level_lifter + 1
                : state.userDetails.profile.is_add_sub_level_lifter,

            is_mul_div_level_lifter:
              action.payload.student_learning_mode_id === 2
                ? +state.userDetails.profile.is_mul_div_level_lifter + 1
                : state.userDetails.profile.is_mul_div_level_lifter
          }
        }
      };
    },
    handleUpdateCurrentSubmissionUserLevelId: (state, action) => {
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            ...action.payload
          }
        }
      };
    },
    // EMAIL CONFIRMATION
    authMailConfirm: state => {
      return {
        ...state,
        emailVerificationLoading: true
      };
    },

    authMailConfirmSuccess: state => {
      return {
        ...state,
        emailVerificationLoading: false
      };
    },

    authMailConfirmFailure: (state, action) => {
      return {
        ...state,
        emailVerificationLoading: false,
        emailVerificationErrorCode: action.payload.errorStatus,
        emailVerificationError: action.payload.error
      };
    },
    //RESENDING VERIFICATION EMAIL
    authResendVerificationMail: state => {
      return {
        ...state,
        resendVerificationEmailLoading: true,
        resendVerificationEmailError: ""
      };
    },

    authResendVerificationMailSuccess: state => {
      return {
        ...state,
        resendVerificationEmailLoading: false
      };
    },

    authResendVerificationMailFailure: (state, action) => {
      return {
        ...state,
        resendVerificationEmailLoading: false,
        resendVerificationEmailError: action.payload.error
      };
    },
    // UPDATING TEACHER PASSWORD
    updateTeacherProfilePassword: state => {
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordError: ""
      };
    },

    updateTeacherProfilePasswordSuccess: state => {
      return {
        ...state,
        changePasswordLoading: false
      };
    },

    updateTeacherProfilePasswordFailure: (state, action) => {
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: action.payload.error
      };
    },

    // GOOGLE LOGIN VERIFY
    verifyLogin: state => {
      return {
        ...state,
        loginLoading: true,
        loginError: "",
        errorType: ""
      };
    },

    verifyLoginSuccess: (state, action) => {
      const authenticationPermission = {
        1: ["admin"],
        2: ["teacher"],
        3: ["student"],
        4: ["parent"],
        5: ["school_admin"]
      };
      return {
        ...state,
        loginLoading: false,
        userDetails: action.payload.data.user,
        userPermissions: authenticationPermission[action.payload.data.user.role_id]
      };
    },

    verifyLoginFailure: (state, action) => {
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload.error,
        errorType: action.payload.error_type
      };
    },
    //USER JOIN
    authJoinUser: state => {
      return {
        ...state,
        joinUserLoading: true
      };
    },

    authJoinUserSuccess: state => {
      return {
        ...state,
        joinUserLoading: false
      };
    },

    authJoinUserFailure: (state, action) => {
      return {
        ...state,
        joinUserLoading: false,
        joinUserError: action.payload.error
      };
    }
  }
});

export const {
  authStudentLogin,
  authStudentLoginSuccess,
  authStudentLoginFailure,
  authLogout,
  authLogoutSuccess,
  authLogoutFailure,
  updateTeacherProfile,
  updateTeacherProfileSuccess,
  updateTeacherProfileFailure,
  authLogin,
  authLoginSuccess,
  authLoginFailure,
  authTeacherSignup,
  authTeacherSignupSuccess,
  authTeacherSignupFailure,
  fetchUserDetails,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  deleteUserDetails,
  deleteUserDetailsSuccess,
  deleteUserDetailsFailure,
  authForgotPassword,
  authForgotPasswordSuccess,
  authForgotPasswordFailure,
  authResetPassword,
  authResetPasswordSuccess,
  authResetPasswordFailure,
  setSchoolAdminPassword,
  setSchoolAdminPasswordSuccess,
  setSchoolAdminPasswordFailure,
  updateUserLevelIdSuccess,
  updateUserDetails,
  updateUserProfile,
  updateLevelLifterCount,
  handleUpdateCurrentSubmissionUserLevelId,
  authMailConfirm,
  authMailConfirmSuccess,
  authMailConfirmFailure,
  authResendVerificationMail,
  authResendVerificationMailSuccess,
  authResendVerificationMailFailure,
  updateTeacherProfilePassword,
  updateTeacherProfilePasswordSuccess,
  updateTeacherProfilePasswordFailure,
  verifyLogin,
  verifyLoginSuccess,
  verifyLoginFailure,
  authJoinUser,
  authJoinUserSuccess,
  authJoinUserFailure
} = authSlice.actions;

export const studentLogin = (body, handleLoginSuccess) => async dispatch => {
  dispatch(authStudentLogin());

  axios
    .post("/auth/login", body)

    .then(res => {
      dispatch(authStudentLoginSuccess(res.data.data));

      sessionStorage.setItem("user-token", res.data.data.token);
      sessionStorage.setItem("user-role", res.data.data.user.role_id);
      sessionStorage.setItem("isSessionStarted", false);

      handleLoginSuccess && handleLoginSuccess(res.data.data.user);
    })
    .catch(error => {
      dispatch(
        authStudentLoginFailure({
          error: error?.response?.data?.message || "Something went wrong.Please contact admin for support."
        })
      );
    });
};

//LOGOUT
export const logout = handleLogoutSuccess => async dispatch => {
  dispatch(authLogout());
  try {
    const resPromise = axios.post(`/auth/logout`);

    setTimeout(() => {
      handleLogoutSuccess && handleLogoutSuccess();
    }, 0);

    resPromise.then(res => {
      Promise.resolve().then(() => {
        if (!res.data.error) {
          dispatch(authLogoutSuccess());
        }
      });
    });
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error);
    dispatch(authLogoutFailure({ error: error?.response?.data?.errors }));
  }
};

// Thunk for updating teacher profile
export const updateTeacher = (body, handleSuccess) => async dispatch => {
  dispatch(updateTeacherProfile());
  try {
    const res = await axios.put(`/user/profile`, body);
    dispatch(updateTeacherProfileSuccess(body));
    handleSuccess && handleSuccess();
    return res.data.data;
  } catch (error) {
    dispatch(
      updateTeacherProfileFailure({
        error: error.response.data.errors
      })
    );
  }
};

//Teacher login
export const teacherLogin = (body, handleLoginSuccess, handleLoginFailure) => async dispatch => {
  dispatch(authLogin());

  axios
    .post(`/auth/login`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data));

      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.user.role_id);

      handleLoginSuccess && handleLoginSuccess(res.data.data.user.role_id);
    })
    .catch(error => {
      handleLoginFailure && handleLoginFailure();
      dispatch(
        authLoginFailure({
          error: error.response.data.message,
          statusCode: error.response.status
        })
      );
    });
};

export const teacherLoginWithGoogle = (body, handleLoginSuccess) => async dispatch => {
  dispatch(authLogin());

  axios
    .post(`/auth/sing-in-or-register-with-google`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.user.role_id);
      handleLoginSuccess && handleLoginSuccess(res.data.data.user.role_id);
    })
    .catch(error => {
      dispatch(authLoginFailure({ error: error.response.data.message }));
    });
};

export const teacherLoginClassLink = (body, handleLoginSuccess, handleFailed) => async dispatch => {
  dispatch(authLogin());

  axios
    .post(`/auth/sing-in-or-register-with-classlink`, body)
    .then(res => {
      localStorage.setItem("CLASS_LINK_RESW", JSON.stringify(res.data));
      dispatch(authLoginSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.user.role_id);

      handleLoginSuccess && handleLoginSuccess(res.data.data);
    })
    .catch(error => {
      dispatch(authLoginFailure({ error: error.response.data.message }));
      handleFailed && handleFailed();
    });
};

// Clever login
export const teacherLoginClever = (body, handleLoginSuccess, handleFailed) => async dispatch => {
  dispatch(authLogin());

  axios
    .post(`/clever/login`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.user.role_id);
      handleLoginSuccess && handleLoginSuccess();
    })
    .catch(error => {
      dispatch(authLoginFailure({ error: error.response.data.message }));
      handleFailed && handleFailed();
    });
};

export const teacherSignup = (body, handleSignUpSuccess, handleLoginFailure) => async dispatch => {
  dispatch(authTeacherSignup());
  axios
    .post(`/auth/register`, body)
    .then(res => {
      dispatch(authTeacherSignupSuccess(res.data));

      // localStorage.setItem("user-token", res.data.data.token);
      handleSignUpSuccess && handleSignUpSuccess();
    })
    .catch(error => {
      handleLoginFailure && handleLoginFailure();
      dispatch(authTeacherSignupFailure({ error: error.response.data.message }));
    });
};

export const getUserDetails = () => async dispatch => {
  dispatch(fetchUserDetails());

  axios
    .get(`/user/profile`)

    .then(res => {
      dispatch(fetchUserDetailsSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(fetchUserDetailsFailure({ error: error?.response?.data?.message }));
      gaErrorLogger(error, "getStrategies");
    });
};

//DELETE USER DETAILS
export const removeUserDetails = handleRemoveAccountSuccess => async dispatch => {
  dispatch(deleteUserDetails());
  axios
    .delete(`/user/profile`)

    .then(res => {
      dispatch(deleteUserDetailsSuccess(res.data.data));
      handleRemoveAccountSuccess && handleRemoveAccountSuccess();
    })
    .catch(error => {
      dispatch(deleteUserDetailsFailure({ error: error.response.data.message }));
    });
};

// FORGOT PASSWORD
export const forgotPassword = (body, handleLoginSuccess) => async dispatch => {
  dispatch(authForgotPassword());

  axios
    .post(`/auth/forgot-password`, body)
    .then(res => {
      dispatch(authForgotPasswordSuccess(res.data));
      handleLoginSuccess && handleLoginSuccess();
      message.success("Reset password link has been sent successfully");
    })
    .catch(error => {
      dispatch(authForgotPasswordFailure({ error: error.response.data.message }));
    });
};

// RESET PASSWORD
export const resetPassword = (body, handleLoginSuccess) => async dispatch => {
  dispatch(authResetPassword());

  axios
    .post(`/auth/reset-password`, body)
    .then(res => {
      dispatch(authResetPasswordSuccess());
      handleLoginSuccess && handleLoginSuccess();
      localStorage.removeItem("reset_password_token");
      localStorage.removeItem("sing_in_with_google_token");
    })
    .catch(error => {
      dispatch(
        authResetPasswordFailure({
          error: error.response.data.message
        })
      );
    });
};

// SET SCHOOL ADMIN PASSWORD
export const setPasswordForSchoolAdmin = (body, handleSetPasswordSuccess) => async dispatch => {
  dispatch(setSchoolAdminPassword());
  axios
    .post(`/set-password`, body)
    .then(res => {
      dispatch(setSchoolAdminPasswordSuccess());
      handleSetPasswordSuccess && handleSetPasswordSuccess();
    })
    .catch(error => {
      dispatch(setSchoolAdminPasswordFailure({ error: error.response.data.message }));
    });
};

// UPDATE USER LEVEL ID
export const updateUserLevelId = (learningMode, handleSuccess) => async dispatch => {
  // Dispatch the updateUserLevelIdSuccess action with the provided payload
  dispatch(updateUserLevelIdSuccess(learningMode));
  handleSuccess && handleSuccess();
};

//EMAIL CONFIRMATION
export const confirmMail = (body, handleRedirectToDashboard) => async dispatch => {
  axios
    .post(`/auth/verify-email`, body)
    .then(res => {
      dispatch(authMailConfirmSuccess());
      // handleRedirectToDashboard && handleRedirectToDashboard()
    })
    .catch(error => {
      dispatch(
        authMailConfirmFailure({
          errorStatus: error.response.status,
          error: error.response.data.message
        })
      );
      if (error.response.status === 409) {
        handleRedirectToDashboard && handleRedirectToDashboard();
      }
    });
};

//RESENDING VERIFICATION EMAI
export const resendVerificationMail = (body, handleSuccess, handleEmailSendFailure) => async dispatch => {
  dispatch(authResendVerificationMail());

  axios
    .post(`/auth/resend-verification-email`, body)
    .then(res => {
      dispatch(authResendVerificationMailSuccess());
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        authResendVerificationMailFailure({
          error: error.response.data.errors.message
        }),
        handleEmailSendFailure && handleEmailSendFailure(error.response.data.errors.message)
      );
    });
};

// update teacher password
export const updateTeacherPassword = body => async dispatch => {
  dispatch(updateTeacherProfilePassword());
  return axios
    .put(`/user/update-password`, body)
    .then(res => {
      dispatch(updateTeacherProfilePasswordSuccess());
    })
    .catch(error => {
      dispatch(
        updateTeacherProfilePasswordFailure({
          error: error.response.data.errors.message
        })
      );
    });
};

//Google Verify
export const loginWithGoogleVerify = (body, handleLoginSuccess) => async dispatch => {
  dispatch(verifyLogin());

  axios
    .post(`/auth/sing-in-or-register-with-google`, body)
    .then(res => {
      dispatch(verifyLoginSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);

      localStorage.setItem("user-role", res.data.data.user.role_id);

      handleLoginSuccess && handleLoginSuccess(res.data.data.user);
      localStorage.removeItem("reset_password_token");
      localStorage.removeItem("sing_in_with_google_token");
    })
    .catch(error => {
      dispatch(verifyLoginFailure({ error: error.response.data.message }));
    });
};

// join user
export const joinUser = body => async dispatch => {
  dispatch(authJoinUser());
  axios
    .post(`/auth/join-user`, body)
    .then(res => {
      dispatch(authJoinUserSuccess());
      localStorage.setItem("reset_password_token", res.data.data.reset_password_token);
      localStorage.setItem("sing_in_with_google_token", res.data.data.sing_in_with_google_token);
      // handleRedirectToDashboard && handleRedirectToDashboard()
    })
    .catch(error => {
      dispatch(authJoinUserFailure({ error: error.response.data.message }));
      // if (error.response.status === 409) {
      //   handleRedirectToDashboard && handleRedirectToDashboard();
      // }
    });
};

export default authSlice.reducer;
