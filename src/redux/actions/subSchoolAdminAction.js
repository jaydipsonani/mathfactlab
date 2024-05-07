import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
import { message } from "antd";
import { removeInvitedEmail } from "utils/helpers";

const subSchoolAdminSlice = createSlice({
  name: "subSchoolAdmin",
  initialState: {
    fetchSubSchoolAdminListLoading: false,
    subSchoolAdminList: [],
    fetchSubSchoolAdminListError: "",
    deleteSubSchoolAdminListLoading: false,
    deleteSubSchoolAdminListError: "",
    addSubSchoolAdminListLoading: false,
    addSubSchoolAdminListError: "",
    editSubSchoolAdminListLoading: false,
    editSubSchoolAdminListError: "",
    sendInvitationLoading: false,
    sendInvitationError: ""
  },
  reducers: {
    fetchSubSchoolAdminStart: state => {
      state.fetchSubSchoolAdminListLoading = true;
    },
    fetchSubSchoolAdminSuccess: (state, action) => {
      const updatedSubSchoolAdminList = action.payload.map(user => ({
        ...user,
        email: removeInvitedEmail(user.email)
      }));
      state.fetchSubSchoolAdminListLoading = false;
      state.subSchoolAdminList = updatedSubSchoolAdminList;
    },
    fetchSubSchoolAdminFailure: (state, action) => {
      state.fetchSubSchoolAdminListLoading = false;
      state.fetchSubSchoolAdminListError = action.payload.error;
    },
    addSubSchoolAdminStart: state => {
      state.addSubSchoolAdminListLoading = true;
    },
    addSubSchoolAdminSuccess: (state, action) => {
      const isMultiAdd = Array.isArray(action.payload);
      let updatedActionPayload = action.payload;

      if (isMultiAdd) {
        updatedActionPayload = updatedActionPayload.map(user =>
          Object.assign(user, { email: removeInvitedEmail(user.email) })
        );
      } else {
        updatedActionPayload = Object.assign(updatedActionPayload, {
          email: removeInvitedEmail(updatedActionPayload.email)
        });
      }

      state.addSubSchoolAdminListLoading = false;
      state.subSchoolAdminList = isMultiAdd
        ? [...updatedActionPayload, ...state.subSchoolAdminList]
        : [updatedActionPayload, ...state.subSchoolAdminList];
    },
    addSubSchoolAdminFailure: (state, action) => {
      state.addSubSchoolAdminListLoading = false;
      state.addSubSchoolAdminListError = action.payload.error;
    },
    editSubSchoolAdminStart: state => {
      state.editSubSchoolAdminListLoading = true;
    },
    editSubSchoolAdminSuccess: (state, action) => {
      state.editSubSchoolAdminListLoading = false;
      state.subSchoolAdminList = state.subSchoolAdminList.map(admin => {
        return admin.id === action.payload.id ? action.payload : admin;
      });
    },
    editSubSchoolAdminFailure: (state, action) => {
      state.editSubSchoolAdminListLoading = false;
      state.editSubSchoolAdminListError = action.payload.error;
    },
    deleteSubSchoolAdminStart: state => {
      state.deleteSubSchoolAdminListLoading = true;
    },
    deleteSubSchoolAdminSuccess: (state, action) => {
      state.deleteSubSchoolAdminListLoading = false;
      state.subSchoolAdminList = state.subSchoolAdminList.filter(admin => admin.id !== action.payload);
    },
    deleteSubSchoolAdminFailure: (state, action) => {
      state.deleteSubSchoolAdminListLoading = false;
      state.deleteSubSchoolAdminListError = action.payload.error;
    },
    sendInvitationStart: state => {
      state.sendInvitationLoading = true;
    },
    sendInvitationSuccess: state => {
      state.sendInvitationLoading = false;
    },
    sendInvitationFailure: (state, action) => {
      state.sendInvitationLoading = false;
      state.sendInvitationError = action.payload.error;
    }
  }
});

export const {
  fetchSubSchoolAdminStart,
  fetchSubSchoolAdminSuccess,
  fetchSubSchoolAdminFailure,
  addSubSchoolAdminStart,
  addSubSchoolAdminSuccess,
  addSubSchoolAdminFailure,
  editSubSchoolAdminStart,
  editSubSchoolAdminSuccess,
  editSubSchoolAdminFailure,
  deleteSubSchoolAdminStart,
  deleteSubSchoolAdminSuccess,
  deleteSubSchoolAdminFailure,
  sendInvitationStart,
  sendInvitationSuccess,
  sendInvitationFailure
} = subSchoolAdminSlice.actions;
export const getSubSchoolAdmin = () => async dispatch => {
  dispatch(fetchSubSchoolAdminStart());

  try {
    const res = await axios.get("/admins/my");
    dispatch(fetchSubSchoolAdminSuccess(res.data.data));
  } catch (error) {
    dispatch(fetchSubSchoolAdminFailure({ error: error.response.data.message }));
  }
};

export const addSubSchoolAdmin = (body, handleSuccess, MultiAdd) => async dispatch => {
  dispatch(addSubSchoolAdminStart());

  try {
    const res = await axios.post("/admins", body);
    dispatch(addSubSchoolAdminSuccess(res.data.data, MultiAdd));
    handleSuccess && handleSuccess();
    message.success("Sub Admin added successfully.");
  } catch (error) {
    dispatch(addSubSchoolAdminFailure({ error: error.response.data.message }));
    message.error(error.response.data.message);
  }
};

export const updateSubSchoolAdminByAdmin = (user, body, handleSuccess) => async dispatch => {
  dispatch(editSubSchoolAdminStart());

  try {
    await axios.put(`/admins/${user.id}`, body);
    dispatch(editSubSchoolAdminSuccess(Object.assign(user, body)));
    handleSuccess && handleSuccess();
    message.success("Sub Admin updated successfully.");
  } catch (error) {
    dispatch(editSubSchoolAdminFailure({ error: error.response.data.message }));
    message.error(error.response.data.message);
  }
};

export const removeSubSchoolAdmin = user_id => async dispatch => {
  dispatch(deleteSubSchoolAdminStart());

  try {
    await axios.delete(`/admins/${user_id}`);
    dispatch(deleteSubSchoolAdminSuccess(user_id));
    message.success("Sub Admin removed successfully.");
  } catch (error) {
    dispatch(deleteSubSchoolAdminFailure({ error: error.response.data.message }));
  }
};

export const sendInvitations = user_id => async dispatch => {
  dispatch(sendInvitationStart());

  try {
    const res = await axios.post(`/admins/resend-invite/${user_id}`);
    dispatch(sendInvitationSuccess(res.data.data));
    message.success("Sent Invitation successfully.");
  } catch (error) {
    dispatch(sendInvitationFailure({ error: error.response.data.message }));
    message.error(error.response.data.message);
  }
};

export default subSchoolAdminSlice.reducer;
