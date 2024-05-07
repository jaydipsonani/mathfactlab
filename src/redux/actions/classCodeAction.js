import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
import { message } from "antd";

const initialState = {
  //fetch
  classCodeList: [],
  fetchingAllClassCodeListLoading: false,
  fetchingAllClassCodeListError: "",

  //fetch from google classroom
  allClassCodeList: [],
  fetchingAllClassCodeListFromGoogleClassRoomLoading: false,
  fetchingAllClassCodeListFromGoogleClassRoomError: "",

  //class link classes
  classLinkClassList: [],
  fetchingClassLinkClassListLoading: false,
  fetchingClassLinkClassListLoadingError: "",

  //add
  addNewClassCodeLoading: false,
  addNewClassCodeError: "",

  //update
  editClassCodeDetailsLoading: false,
  editClassCodeDetailsError: "",

  //delete
  deleteClassCodeLoading: false,
  deleteClassCodeError: "",

  syncGoogleClassLoading: false,
  syncClassLinkClassLoading: false
};

const classCodeSlice = createSlice({
  name: "classCode",
  initialState,
  reducers: {
    fetchAllClassCodeList: state => {
      state.fetchingAllClassCodeListLoading = true;
      state.fetchingAllClassCodeListError = "";
    },
    fetchAllClassCodeListSuccess: (state, action) => {
      state.fetchingAllClassCodeListLoading = false;
      state.classCodeList = action.payload;
    },
    fetchAllClassCodeListFailure: (state, action) => {
      state.fetchingAllClassCodeListLoading = false;
      state.fetchingAllClassCodeListError = action.payload.error;
    },
    fetchAllClassCodeListFromGoogleClassRoom: state => {
      state.fetchingAllClassCodeListFromGoogleClassRoomLoading = true;
      state.fetchingAllClassCodeListFromGoogleClassRoomError = "";
    },
    fetchAllClassCodeListFromGoogleClassRoomSuccess: (state, action) => {
      state.fetchingAllClassCodeListFromGoogleClassRoomLoading = false;
      state.allClassCodeList = action.payload;
    },
    fetchAllClassCodeListFromGoogleClassRoomFailure: (state, action) => {
      state.fetchingAllClassCodeListFromGoogleClassRoomLoading = false;
      state.fetchingAllClassCodeListFromGoogleClassRoomError = action.payload.error;
    },
    createNewClassCode: state => {
      state.addNewClassCodeLoading = true;
      state.addNewClassCodeError = "";
    },
    createNewClassCodeSuccess: (state, action) => {
      state.addNewClassCodeLoading = false;
      state.classCodeList = Array.isArray(action.payload)
        ? [...action.payload, ...state.classCodeList]
        : [action.payload, ...state.classCodeList];
    },
    createNewClassCodeFailure: (state, action) => {
      state.addNewClassCodeLoading = false;
      state.addNewClassCodeError = action.payload.error;
    },
    updateClassCode: state => {
      state.editClassCodeDetailsLoading = true;
      state.editClassCodeDetailsError = "";
    },
    updateClassCodeSuccess: (state, action) => {
      state.editClassCodeDetailsLoading = false;
      state.classCodeList = state.classCodeList.map(classCode => {
        return classCode.id === action.payload.id ? action.payload : classCode;
      });
    },
    updateClassCodeFailure: (state, action) => {
      state.editClassCodeDetailsLoading = false;
      state.editClassCodeDetailsError = action.payload.error;
    },
    deleteClassCode: state => {
      state.deleteClassCodeLoading = true;
      state.deleteClassCodeError = "";
    },
    deleteClassCodeSuccess: (state, action) => {
      state.deleteClassCodeLoading = false;
      state.classCodeList = state.classCodeList.filter(classCode => classCode.id !== action.payload);
    },
    deleteClassCodeFailure: (state, action) => {
      state.deleteClassCodeLoading = false;
      state.deleteClassCodeError = action.payload.error;
    },
    addSelectedClassLinkClass: state => {
      state.syncClassLinkClassLoading = true;
    },
    addSelectedClassLinkClassSuccess: state => {
      state.syncClassLinkClassLoading = false;
    },
    addSelectedClassLinkClassFailure: state => {
      state.syncClassLinkClassLoading = false;
    },
    fetchClassLinkClassesSync: (state, action) => {
      state.fetchingClassLinkClassListLoading = true;
      state.fetchingClassLinkClassListLoadingError = "";
    },
    fetchClassLinkClassesSuccess: (state, action) => {
      state.fetchingClassLinkClassListLoading = false;
      state.classLinkClassList = action.payload;
    },
    fetchClassLinkClassesFailure: (state, action) => {
      state.fetchingClassLinkClassListLoading = false;
      state.fetchingClassLinkClassListLoadingError = action.payload.error;
    },
    addSelectedClassCodeSuccess: state => {
      state.syncGoogleClassLoading = true;
    },
    addSelectedClassCodeSuccessSuccess: state => {
      state.syncGoogleClassLoading = false;
    },
    addSelectedClassCodeSuccessFailure: state => {
      state.syncGoogleClassLoading = false;
    }
  }
});

export const {
  fetchAllClassCodeList,
  fetchAllClassCodeListSuccess,
  fetchAllClassCodeListFailure,
  fetchAllClassCodeListFromGoogleClassRoom,
  fetchAllClassCodeListFromGoogleClassRoomSuccess,
  fetchAllClassCodeListFromGoogleClassRoomFailure,
  createNewClassCode,
  createNewClassCodeSuccess,
  createNewClassCodeFailure,
  updateClassCode,
  updateClassCodeSuccess,
  updateClassCodeFailure,
  deleteClassCode,
  deleteClassCodeSuccess,
  deleteClassCodeFailure,
  addSelectedClassLinkClass,
  addSelectedClassLinkClassSuccess,
  addSelectedClassLinkClassFailure,
  fetchClassLinkClassesSync,
  fetchClassLinkClassesSuccess,

  fetchClassLinkClassesFailure,

  addSelectedClassCodeSuccess,
  addSelectedClassCodeSuccessSuccess,
  addSelectedClassCodeSuccessFailure
} = classCodeSlice.actions;

export const getClassCodeList = () => async dispatch => {
  dispatch(fetchAllClassCodeList());

  try {
    const res = await axios.get(`classes/my`);
    dispatch(fetchAllClassCodeListSuccess(res.data.data));
  } catch (error) {
    dispatch(fetchAllClassCodeListFailure({ error: error.response.data.message }));
  }
};

export const getClassCodeListFromGoogleClassRoom =
  (body, handleShowClassSelectDailog, handleCallBackSyncToGoogle) => async dispatch => {
    dispatch(fetchAllClassCodeListFromGoogleClassRoom());

    try {
      const res = await axios.post(`/sync/google-classroom/classes`, body);

      if (!res.data.error) {
        dispatch(fetchAllClassCodeListFromGoogleClassRoomSuccess(res.data.data));
        handleShowClassSelectDailog && handleShowClassSelectDailog();
      } else {
        handleCallBackSyncToGoogle && handleCallBackSyncToGoogle(res.data.message);
      }
    } catch (error) {
      handleCallBackSyncToGoogle && handleCallBackSyncToGoogle(error.response.data.message);
      dispatch(
        fetchAllClassCodeListFromGoogleClassRoomFailure({
          error: error.response.data.message
        })
      );
    }
  };

export const addNewClassCode = (body, handleSuccess) => async dispatch => {
  dispatch(createNewClassCode());

  try {
    const res = await axios.post(`/classes`, body);
    dispatch(createNewClassCodeSuccess(res.data.data));
    handleSuccess && handleSuccess(res.data.data);
    message.success("Class Added successfully.");
  } catch (error) {
    dispatch(createNewClassCodeFailure({ error: error.response.data.message }));
    message.error(error.response.data.message);
  }
};
export const editClassCode = (classObject, body, handleSuccess) => async dispatch => {
  dispatch(updateClassCode());

  try {
    await axios.put(`/classes/${classObject.id}`, body);
    dispatch(updateClassCodeSuccess({ ...classObject, ...body }));
    handleSuccess && handleSuccess();
    message.success("Class updated successfully.");
  } catch (error) {
    dispatch(updateClassCodeFailure({ error: error.response.data.message }));
    message.error(error.response.data.message);
  }
};

export const removeClassCode = (cls_id, handleSuccess) => async dispatch => {
  dispatch(deleteClassCode());

  try {
    await axios.delete(`/classes/${cls_id}`);
    dispatch(deleteClassCodeSuccess(cls_id));

    handleSuccess && handleSuccess();
    message.success("Class removed successfully.");
  } catch (error) {
    dispatch(deleteClassCodeFailure({ error: error.response.data.message }));
  }
};
export const syncSelectedClassLinkStudents = (body, handleSuccess) => async dispatch => {
  dispatch(addSelectedClassLinkClass());

  try {
    const res = await axios.post(`/sync/classlink/students`, body);
    dispatch(addSelectedClassLinkClassSuccess(res.data.data));
    handleSuccess && handleSuccess();
  } catch (error) {
    dispatch(addSelectedClassLinkClassFailure({ error: error.response.data.message }));
  }
};

//Fetch class Link
export const fetchClassLinkClasses = handleSuccess => async dispatch => {
  dispatch(fetchClassLinkClassesSync());

  try {
    const res = await axios.post(`/sync/classlink/classes`);
    dispatch(fetchClassLinkClassesSuccess(res.data.data));
    handleSuccess && handleSuccess();
  } catch (error) {
    dispatch(fetchClassLinkClassesFailure({ error: error.response.data.message }));
  }
};
//Sync Selected class
export const syncSelectedClass = (body, handleSuccess) => async dispatch => {
  dispatch(addSelectedClassCodeSuccess());

  try {
    const res = await axios.post(`/sync/google-classroom/students`, body);
    dispatch(addSelectedClassCodeSuccessSuccess(res.data.data));
    handleSuccess && handleSuccess();
  } catch (error) {
    dispatch(addSelectedClassCodeSuccessFailure({ error: error.response.data.message }));
  }
};

export default classCodeSlice.reducer;
