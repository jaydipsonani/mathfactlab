// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
import { message } from "antd";
import moment from "moment";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    updateUserProfileLoading: false,

    fetchingUserDetailsLoading: false,
    fetchingUserDetailsError: "",

    userCreateExtraFieldLoading: false,
    userCreateExtraFieldError: "",
    userPermissions: [],
    fetchingTeachersListLoading: false,
    teachersList: [],
    studentList: [],
    allUserList: [],
    fetchingAllUserListLoading: false,
    fetchingAllUserListError: "",

    addNewStudentLoading: false,

    addNewStudentsLoading: false,
    addNewUsersError: "",
    studentListWithClass: [],
    fetchingAllWithClassLoading: false,
    fetchingAllWithUserListClassError: "",

    editUserDetailsLoading: false,
    editUserDetailsError: "",

    deleteUserLoading: false,

    fetchingAllUserListFromGoogleClassRoomLoading: false,
    fetchingAllUserListFromGoogleClassRoomError: "",

    addSubUpdatedDate: "",
    mulDivUpdatedDate: "",
    totalStudents: 0,
    studentIndividual: [],
    studentIndividualReportDetails: {},
    fetchingStudentIndividualLoading: false,
    fetchingStudentIndividualError: "",
    studentsGroupReport: [],
    fetchingStudentsGroupReportLoading: false,
    fetchingStudentsGroupReportError: "",

    growthGaugeReport: [],
    fetchingGrowthGaugeReportLoading: false,
    fetchingGrowthGaugeReportError: ""
  },
  reducers: {
    //fetch student list
    fetchAllUserList: state => {
      state.fetchingAllUserListLoading = true;
      state.fetchingAllUserListError = "";
    },
    fetchAllUserListSuccess: (state, action) => {
      state.fetchingAllUserListLoading = false;
      state.studentList = action.payload;
    },
    fetchAllUserListFailure: (state, action) => {
      state.fetchingAllUserListLoading = false;
      state.fetchingAllUserListError = action.payload.error;
    },
    //fetch from google class room
    fetchAllUserListFromGoogleClassRoom: state => {
      state.fetchingAllUserListFromGoogleClassRoomLoading = true;
      state.fetchingAllUserListFromGoogleClassRoomError = "";
    },
    fetchAllUserListFromGoogleClassRoomSuccess: (state, action) => {
      state.fetchingAllUserListFromGoogleClassRoomLoading = false;
      state.studentListWithClass = action.payload;
    },
    fetchAllUserListFromGoogleClassRoomFailure: (state, action) => {
      state.fetchingAllUserListFromGoogleClassRoomLoading = false;
      state.fetchingAllUserListFromGoogleClassRoomError = action.payload.error;
    },
    createNewUser: state => {
      state.addNewStudentLoading = true;
    },
    createNewUserSuccess: (state, action) => {
      const updatedStudentList = [action.payload, ...state.studentList].sort((a, b) => {
        let fa = a.profile.last_name.toLowerCase(),
          fb = b.profile.last_name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      state.addNewStudentLoading = false;
      state.studentList = updatedStudentList;
    },
    createNewUserFailure: (state, action) => {
      state.addNewStudentLoading = false;
      state.addNewUserError = action.payload.error;
    },
    // Edit Student
    editUser: state => {
      state.editUserDetailsLoading = true;
      state.editUserDetailsError = "";
    },
    editUserSuccess: (state, action) => {
      const currentTimestamp = moment();
      let updateStudentList;

      const updatedProfile = {
        ...action.payload.currentStudentData.profile,
        ...action.payload.body.profile
      };

      const updatedUser = {
        ...action.payload.currentStudentData,
        ...action.payload.body,
        profile: updatedProfile,
        updated_at: currentTimestamp
      };

      updateStudentList = state.studentList.map(user => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        } else {
          return user;
        }
      });

      return {
        ...state,
        editUserDetailsLoading: false,
        studentList: updateStudentList
      };
    },
    editUserFailure: (state, action) => {
      state.editUserDetailsLoading = false;
      state.editUserDetailsError = action.payload.error;
    },
    editMultipleUser: state => {
      state.editUserDetailsLoading = true;
      state.editUserDetailsError = "";
    },
    editMultipleUserSuccess: (state, action) => {
      const currentTimestamp = moment();
      let updateStudentList = state.studentList.map(user => {
        if (action.payload.studentUserIds.includes(user.id)) {
          let currentUser = { ...user };
          let userProfile = { ...user.profile };
          let userAssignment = { ...user.current_assignment_stats };

          userProfile = Object.assign(userProfile, action.payload.updates.profile);
          userAssignment = Object.assign(userAssignment, {
            activities_count: 0,
            completed_sessions_count: 0,
            passed_level_lifter_count: 0,
            sessions_count: 0,
            sessions_spent_time: 0
          });

          if (action.payload.updates.hasOwnProperty("current_assignment_stats")) {
            delete currentUser.current_assignment_stats;
            currentUser.current_assignment_stats = userAssignment;
          }

          delete currentUser.profile;
          currentUser.profile = userProfile;

          currentUser.updated_at = currentTimestamp;

          return currentUser;
        } else {
          return user;
        }
      });

      state.editUserDetailsLoading = false;
      state.studentList = updateStudentList;
    },
    editMultipleUserFailure: (state, action) => {
      state.editUserDetailsLoading = false;
      state.editUserDetailsError = action.payload.error;
    },
    // Delete Student
    removeUser: state => {
      state.deleteUserLoading = true;
      state.deleteUserError = "";
    },
    removeUserSuccess: (state, action) => {
      const updateStudentList = state.studentList.filter(user => user.id !== action.payload.id);

      state.deleteUserLoading = false;
      state.studentList = updateStudentList;
    },
    removeUserFailure: (state, action) => {
      state.deleteUserLoading = false;
      state.deleteUserError = action.payload.error;
    },
    removeMultipleUser: state => {
      state.deleteUserLoading = true;
      state.deleteUserError = "";
    },
    removeMultipleUserSuccess: (state, action) => {
      const updateStudentList = state.studentList.filter(user => {
        return !action.payload.student_user_ids.includes(user.id);
      });

      state.deleteUserLoading = false;
      state.studentList = updateStudentList;
    },
    removeMultipleUserFailure: (state, action) => {
      state.deleteUserLoading = false;
      state.deleteUserError = action.payload.error;
    },
    // Add New Student
    createNewUsers: state => {
      state.addNewStudentsLoading = true;
      state.addNewUsersError = "";
    },
    createNewUsersSuccess: (state, action) => {
      return {
        ...state,
        addNewStudentsLoading: false,
        studentList: [...action.payload, ...state.studentList]
      };
    },
    createNewUsersFailure: (state, action) => {
      return {
        ...state,
        addNewStudentsLoading: false,
        addNewUsersError: action.payload.error
      };
    },
    //fetch student list
    fetchAllUserWithClassesList: state => {
      state.fetchingAllWithClassLoading = true;
      state.fetchingAllUserListError = "";
    },
    fetchAllUserWithClassesListSuccess: (state, action) => {
      return {
        ...state,
        fetchingAllWithClassLoading: false,
        studentListWithClass: action.payload
      };
    },
    fetchAllUserWithClassesListFailure: (state, action) => {
      return {
        ...state,
        fetchingAllWithClassLoading: false,
        fetchingAllWithUserListClassError: action.payload.error
      };
    },
    fetchStudentIndividualReport: state => {
      state.fetchingStudentIndividualLoading = true;
      state.fetchingStudentIndividualError = "";
    },
    fetchStudentIndividualReportSuccess: (state, action) => {
      state.fetchingStudentIndividualLoading = false;
      state.studentIndividual = action.payload;
      state.studentIndividualReportDetails = action.payload;
    },
    fetchStudentIndividualReportFailure: (state, action) => {
      state.fetchingStudentIndividualLoading = false;
      state.fetchingStudentIndividualError = action.payload.error;
    },
    fetchStudentsGroupReport: state => {
      state.fetchingStudentsGroupReportLoading = true;
      state.fetchingStudentsGroupReportError = "";
    },
    fetchStudentsGroupReportSuccess: (state, action) => {
      state.fetchingStudentsGroupReportLoading = false;
      state.studentsGroupReport = action.payload;
    },
    fetchStudentsGroupReportFailure: (state, action) => {
      state.fetchingStudentsGroupReportLoading = false;
      state.fetchingStudentsGroupReportError = action.payload.error;
    },
    fetchGrowthGaugeReport: state => {
      state.fetchingGrowthGaugeReportLoading = true;
      state.fetchingGrowthGaugeReportError = "";
    },
    fetchGrowthGaugeReportSuccess: (state, action) => {
      state.fetchingGrowthGaugeReportLoading = false;
      state.growthGaugeReport = action.payload;
    },
    fetchGrowthGaugeReportFailure: (state, action) => {
      state.fetchingGrowthGaugeReportLoading = false;
      state.fetchingGrowthGaugeReportError = action.payload.error;
    }
    // ... other reducer functions ...
  }
});

export const {
  fetchAllUserList,
  fetchAllUserListSuccess,
  fetchAllUserListFailure,
  fetchAllUserListFromGoogleClassRoom,
  fetchAllUserListFromGoogleClassRoomSuccess,
  fetchAllUserListFromGoogleClassRoomFailure,
  createNewUser,
  createNewUserSuccess,
  createNewUserFailure,
  editUser,
  editUserSuccess,
  editUserFailure,
  editMultipleUser,
  editMultipleUserSuccess,
  editMultipleUserFailure,
  removeUser,
  removeUserSuccess,
  removeUserFailure,
  removeMultipleUser,
  removeMultipleUserSuccess,
  removeMultipleUserFailure,
  createNewUsers,
  createNewUsersSuccess,
  createNewUsersFailure,
  fetchAllUserWithClassesList,
  fetchAllUserWithClassesListSuccess,
  fetchAllUserWithClassesListFailure,
  fetchStudentIndividualReport,
  fetchStudentIndividualReportSuccess,
  fetchStudentIndividualReportFailure,
  fetchStudentsGroupReport,
  fetchStudentsGroupReportSuccess,
  fetchStudentsGroupReportFailure,
  fetchGrowthGaugeReport,
  fetchGrowthGaugeReportSuccess,
  fetchGrowthGaugeReportFailure
} = userSlice.actions;

//fetch student list
export const getUsersList = (classCodesList, add_sub_start_date, mul_div_start_date, page, limit) => async dispatch => {
  dispatch(fetchAllUserList());

  try {
    // Call API only if class code available otherwise assign  only
    if (classCodesList.length > 0) {
      const res = await axios.get(
        `/students/my?class_codes=${classCodesList?.join(",")}${
          add_sub_start_date ? `&add_sub_previous_date=${add_sub_start_date}` : ""
        }${mul_div_start_date ? `&mul_div_previous_date=${mul_div_start_date}` : ""}`
      );
      dispatch(fetchAllUserListSuccess(res.data.data));
    } else {
      dispatch(fetchAllUserListSuccess([]));
    }
  } catch (error) {
    dispatch(fetchAllUserListFailure({ error: error.response.data.message }));
  }
};

//fetch from google class room
export const getUsersListFromGoogleClassRoom = classId => async dispatch => {
  dispatch(fetchAllUserListFromGoogleClassRoom());

  try {
    const res = await axios.get(`/google-classroom/import-students?classId=${classId}`);
    dispatch(fetchAllUserListFromGoogleClassRoomSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchAllUserListFromGoogleClassRoomFailure({
        error: error.response.data.message
      })
    );
  }
};

// Add New Student
export const addStudent = (body, handleSuccess) => async dispatch => {
  dispatch(createNewUser());
  let isEdit = false;

  try {
    const res = await axios.post(`/students`, body);
    dispatch(createNewUserSuccess(res.data.data));
    handleSuccess && handleSuccess(isEdit);
    message.success("Student has been added successfully.");
  } catch (error) {
    dispatch(createNewUserFailure({ error: error.response.data.message }));
    message.error(error.response.data.message || "Something went wrong!");
  }
};
// Edit Student
export const editStudent = (body, currentStudentData, handleSuccess) => async dispatch => {
  dispatch(editUser());

  const updatedBody = Object.assign({}, body);
  delete updatedBody["class_name"];

  try {
    await axios.put(`/students/${currentStudentData.id}`, updatedBody);
    dispatch(editUserSuccess({ currentStudentData, body }));
    handleSuccess && handleSuccess();
    message.success("Student has been updated successfully.");
  } catch (error) {
    dispatch(editUserFailure({ error: error.response.data.message }));
    message.error(error.response.data.message || "Something went wrong!");
  }
};

export const editMultipleStudents =
  (body, handleSuccess, successMessage, current_assignment_stats) => async dispatch => {
    dispatch(editMultipleUser());
    let isEdit = true;

    try {
      await axios.put(`/students/bulk`, body);
      dispatch(editMultipleUserSuccess(Object.assign(body)));

      handleSuccess && handleSuccess(isEdit);
      message.success(successMessage || "Students have been updated successfully.");
    } catch (error) {
      dispatch(editMultipleUserFailure({ error: error.response.data.message }));
      message.error("Something went wrong!");
    }
  };

// Delete Student
export const removeUserAction = (user, handleSuccess) => async dispatch => {
  dispatch(removeUser());

  try {
    await axios.delete(`/students/${user.id}`);
    dispatch(removeUserSuccess(user));

    handleSuccess && handleSuccess();
    message.success("Student has been deleted successfully.");
  } catch (error) {
    dispatch(removeUserFailure({ error: error.response.data.message }));
    message.error("Something went wrong!");
  }
};

export const removeBulkStudents = (body, handleSuccess) => async dispatch => {
  dispatch(removeMultipleUser());

  try {
    await axios.post(`/students/bulk-delete`, body);
    dispatch(removeMultipleUserSuccess(body));
    handleSuccess && handleSuccess();
    message.success("Students have been deleted successfully.");
  } catch (error) {
    dispatch(removeMultipleUserFailure({ error: error.response.data.message }));
    message.error("Something went wrong!");
  }
};
// Add New Student
export const addBulkStudents = (body, handleCreateNewUsersSuccess) => async dispatch => {
  dispatch(createNewUsers());

  try {
    const res = await axios.post(`/students/bulk`, body);
    dispatch(createNewUsersSuccess(res.data.data));
    handleCreateNewUsersSuccess && handleCreateNewUsersSuccess();
    message.success("Students have been added successfully.");
  } catch (error) {
    dispatch(createNewUsersFailure({ error: error?.response?.data?.message }));
    message.error(error?.response?.data?.message);
  }
};

//fetch student list
export const getUsersWithClassesList = class_code => async dispatch => {
  dispatch(fetchAllUserWithClassesList());

  try {
    const res = await axios.get(`/users?class_code=${class_code}&role_id=${3}`);
    dispatch(fetchAllUserWithClassesListSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchAllUserWithClassesListFailure({
        error: error.response.data.message
      })
    );
  }
};

//fetch student list
export const getStudentIndividualReport = body => async dispatch => {
  dispatch(fetchStudentIndividualReport());

  try {
    const res = await axios.post(`/reports/student/individual`, body);
    dispatch(fetchStudentIndividualReportSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchStudentIndividualReportFailure({
        error: error.response.data.message
      })
    );
  }
};

//fetch student list
export const getStudentsGroupReport = body => async dispatch => {
  dispatch(fetchStudentsGroupReport());

  try {
    const res = await axios.post(`/reports/student/group`, body);
    dispatch(fetchStudentsGroupReportSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchStudentsGroupReportFailure({
        error: error.response.data.message
      })
    );
  }
};

export const getGrowthGaugeReport = (learning_mode_id, after_date, before_date, class_code) => async dispatch => {
  dispatch(fetchGrowthGaugeReport());

  try {
    const res = await axios.get(
      `/reports/growth-gauge/?learning_mode_id=${learning_mode_id}${
        after_date ? `&after_date=${after_date}` : ""
      }${before_date ? `&before_date=${before_date}` : ""}${class_code ? `&class_codes=${class_code}` : ""}`
    );
    dispatch(fetchGrowthGaugeReportSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchGrowthGaugeReportFailure({
        error: error.response.data.message
      })
    );
  }
};
export default userSlice.reducer;
