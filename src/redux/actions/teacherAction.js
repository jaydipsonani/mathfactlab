import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
import { removeInvitedEmail } from "utils/helpers";
import { message } from "antd";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    //fetch

    teacherData: [],
    fetchingAllTeacherDataLoading: false,
    fetchingAllTeacherDataError: "",

    //add
    addNewTeacherLoading: false,
    addNewTeacherError: "",

    //update
    editNewTeacherLoading: false,
    editNewTeacherError: "",

    //delete
    deleteNewTeacherLoading: false,
    deleteTeacherError: ""
  },
  reducers: {
    fetchTeacher: state => {
      return {
        ...state,
        fetchingAllTeacherDataLoading: true,
        fetchingAllTeacherDataError: ""
      };
    },

    fetchTeacherSuccess: (state, action) => {
      const updatedTeacherData = action.payload.map(user =>
        Object.assign(user, { email: removeInvitedEmail(user.email) })
      );
      return {
        ...state,
        fetchingAllTeacherDataLoading: false,
        teacherData: updatedTeacherData
      };
    },

    fetchTeacherFailure: (state, action) => {
      return {
        ...state,
        fetchingAllTeacherDataLoading: false,
        fetchingAllTeacherDataError: action.payload.error
      };
    },

    createTeacherData: state => {
      return {
        ...state,
        addNewTeacherLoading: true,
        addNewTeacherError: ""
      };
    },
    createTeacherDataSuccess: (state, action) => {
      const updatedPayload = Object.assign(action.payload, {
        email: removeInvitedEmail(action.payload.email)
      });
      return {
        ...state,
        addNewTeacherLoading: false,
        teacherData: [updatedPayload, ...state.teacherData]
      };
    },
    createTeacherDataFailure: (state, action) => {
      return {
        ...state,
        addNewTeacherLoading: false,
        addNewTeacherError: action.payload.error
      };
    },
    editTeacherProfile: state => {
      return {
        ...state,
        editNewTeacherLoading: true,
        editNewTeacherError: ""
      };
    },

    // editTeacherProfileSuccess: (state, action) => {
    //   state.editNewTeacherLoading = false;
    //   state.teacherData = state.teacherData.map((user) => {
    //     return user.id === action.payload.user.id ? action.payload : user;
    //   });
    // },
    editTeacherProfileSuccess: (state, action) => {
      state.editNewTeacherLoading = false;
      state.teacherData = state.teacherData.map(user => {
        return user.user_id === action.payload.user_id ? action.payload : user;
      });
    },
    editTeacherProfileFailure: (state, action) => {
      return {
        ...state,
        editNewTeacherLoading: false,
        editNewTeacherError: action.payload.error
      };
    },

    deleteTeacherData: state => {
      return {
        ...state,
        deleteNewTeacherLoading: true,
        deleteTeacherError: ""
      };
    },
    deleteTeacherDataSuccess: (state, action) => {
      let updateTeacherList;
      updateTeacherList = state.teacherData.filter(teacher => teacher.user_id !== action.payload);
      return {
        ...state,
        deleteNewTeacherLoading: false,
        teacherData: updateTeacherList
      };
    },
    deleteTeacherDataFailure: (state, action) => {
      return {
        ...state,
        deleteNewTeacherLoading: false,
        deleteTeacherError: action.payload.error
      };
    },

    createNewTeachers: state => {
      return {
        ...state,
        addNewStudentsLoading: true,
        addNewUsersError: ""
      };
    },
    createNewTeachersSuccess: (state, action) => {
      const newTeachersList = [...action.payload, ...state.teacherData]
        .sort((a, b) => {
          let fa = a.profile.last_name.toLowerCase(),
            fb = b.profile.last_name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        })
        ?.map(user =>
          Object.assign(user, {
            email: removeInvitedEmail(user.email)
          })
        );
      return {
        ...state,
        addNewStudentsLoading: false,
        teacherData: newTeachersList
      };
    },
    createNewTeachersFailure: (state, action) => {
      return {
        ...state,
        addNewStudentsLoading: false,
        addNewUsersError: action.payload.error
      };
    },
    sendTeacherInvitationEmail: state => {
      return {
        ...state,
        sendTeacherInvitationLoading: true,
        sendTeacherInvitationError: ""
      };
    },
    sendTeacherInvitationEmailSuccess: (state, action) => {
      return {
        ...state,
        sendTeacherInvitationLoading: false
        // ... any other state updates ...
      };
    },
    sendTeacherInvitationEmailFailure: (state, action) => {
      return {
        ...state,
        sendTeacherInvitationLoading: false,
        sendTeacherInvitationError: action.payload.error
      };
    }
  }
});

export const {
  fetchTeacher,
  fetchTeacherSuccess,
  fetchTeacherFailure,
  createTeacherData,
  createTeacherDataSuccess,
  createTeacherDataFailure,
  editTeacherProfile,
  editTeacherProfileSuccess,
  editTeacherProfileFailure,
  deleteTeacherData,
  deleteTeacherDataSuccess,
  deleteTeacherDataFailure,
  createNewTeachers,
  createNewTeachersSuccess,
  createNewTeachersFailure,
  sendTeacherInvitationEmail,
  sendTeacherInvitationEmailSuccess,
  sendTeacherInvitationEmailFailure
} = teacherSlice.actions;

export const getTeacher = () => async dispatch => {
  dispatch(fetchTeacher());

  try {
    const res = await axios.get(`/teachers/my`);
    dispatch(fetchTeacherSuccess(res.data.data));
  } catch (error) {
    dispatch(fetchTeacherFailure({ error: error.response.data.message }));
  }
};

//add teacher
export const addTeacher = (body, handleSuccess) => async dispatch => {
  dispatch(createTeacherData());

  try {
    const res = await axios.post(`/teachers`, body);
    dispatch(createTeacherDataSuccess(res.data.data));
    handleSuccess && handleSuccess(res.data.data);
    message.success("Teacher added successfully.");
  } catch (error) {
    dispatch(createTeacherDataFailure({ error: error.response.data.message }));
    message.error(error.response.data.message);
  }
};

// Edit School

export const editTeacher = (teacherObject, body, handleSuccess) => async dispatch => {
  dispatch(editTeacherProfile());
  try {
    await axios.put(`/teachers/${teacherObject.user_id}`, body);
    dispatch(editTeacherProfileSuccess(Object.assign(teacherObject, body)));
    handleSuccess && handleSuccess();
    message.success("Teacher edited successfully.");
  } catch (error) {
    dispatch(editTeacherProfileFailure({ error: error.response.data.message }));
    message.error(error.response.data.message);
  }
};
// Delete teacher code
export const deleteTeacher = (id, handleSuccess) => async dispatch => {
  dispatch(deleteTeacherData());

  try {
    await axios.delete(`/teachers/${id}`);
    dispatch(deleteTeacherDataSuccess(id));
    message.success("Teacher deleted successfully.");
    handleSuccess && handleSuccess();
  } catch (error) {
    dispatch(deleteTeacherDataFailure({ error: error.response.data.message }));
  }
};

//multiple teacher
export const addTeachers = (body, handleCreateNewUsersSuccess) => async dispatch => {
  dispatch(createNewTeachers());

  try {
    const res = await axios.post(`/teachers`, body);
    dispatch(createNewTeachersSuccess(res.data.data));
    handleCreateNewUsersSuccess && handleCreateNewUsersSuccess();
    message.success("Teachers have been added successfully.");
  } catch (error) {
    dispatch(createNewTeachersFailure({ error: error.response.message }));
    message.error(error.response.data.message);
  }
};

//Join now email invitation resend
export const sendTeacherJoinInvitation = user_id => async dispatch => {
  dispatch(sendTeacherInvitationEmail());

  try {
    const res = await axios.post(`/teachers/resend-invite/${user_id}`);
    dispatch(sendTeacherInvitationEmailSuccess(res.data.data));
    message.success("Sent Invitation successfully.");
  } catch (error) {
    dispatch(
      sendTeacherInvitationEmailFailure({
        error: error.response.data.message
      })
    );
    message.error(error.response.data.message);
  }
};

export default teacherSlice.reducer;
