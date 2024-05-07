import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
import { message } from "antd";

const initialState = {
  schoolData: [],
  fetchingAllSchoolDataLoading: false,
  fetchingAllSchoolDataError: "",
  addNewSchoolLoading: false,
  addNewSchoolError: "",
  //update
  editSchoolDataLoading: false,
  editSchoolDataError: "",
  deleteSchoolLoading: false,
  deleteSchoolError: ""
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    fetchAllSchool: state => {
      state.fetchingAllSchoolDataLoading = true;
      state.fetchingAllSchoolDataError = "";
    },
    fetchAllSchoolSuccess: (state, action) => {
      state.fetchingAllSchoolDataLoading = false;
      state.schoolData = action.payload;
    },
    fetchAllSchoolFailure: (state, action) => {
      state.fetchingAllSchoolDataLoading = false;
      state.fetchingAllSchoolDataError = action.payload.error;
    },
    createSchoolData: state => {
      state.addNewSchoolLoading = true;
      state.addNewSchoolError = "";
    },
    createSchoolDataSuccess: (state, action) => {
      state.addNewSchoolLoading = false;
      state.schoolData.push(action.payload);
    },
    createSchoolDataFailure: (state, action) => {
      state.addNewSchoolLoading = false;
      state.addNewSchoolError = action.payload.error;
    },

    updateSchoolData(state) {
      state.editSchoolDataLoading = true;
      state.editSchoolDataError = "";
    },
    updateSchoolDataSuccess(state, action) {
      state.editSchoolDataLoading = false;
      state.schoolData = state.schoolData.map(school => {
        return school.id === action.payload.id ? action.payload : school;
      });
    },
    updateSchoolDataFailure(state, action) {
      state.editSchoolDataLoading = false;
      state.editSchoolDataError = action.payload.error;
      message.error(action.payload.error);
    },

    deleteSchoolData: state => {
      state.deleteSchoolLoading = true;
      state.deleteSchoolError = "";
    },
    deleteSchoolDataSuccess: (state, action) => {
      state.deleteSchoolLoading = false;
      state.schoolData = state.schoolData.filter(school => school.id !== action.payload);
    },
    deleteSchoolDataFailure: (state, action) => {
      state.deleteSchoolLoading = false;
      state.deleteSchoolError = action.payload.error;
    }
    // Add other actions for add, update, delete as needed
  }
});

export const {
  fetchAllSchool,
  fetchAllSchoolSuccess,
  fetchAllSchoolFailure,
  createSchoolData,
  createSchoolDataSuccess,
  createSchoolDataFailure,
  updateSchoolData,
  updateSchoolDataSuccess,
  updateSchoolDataFailure,
  deleteSchoolData,
  deleteSchoolDataSuccess,
  deleteSchoolDataFailure
} = schoolSlice.actions;
export const getSchool = () => async dispatch => {
  dispatch(fetchAllSchool());

  axios
    .get(`/schools/my`)
    .then(res => {
      dispatch(fetchAllSchoolSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(fetchAllSchoolFailure({ error: error.response.data.message }));
    });
};
export const addNewSchool = (body, handleSuccess) => async dispatch => {
  dispatch(createSchoolData());

  try {
    const res = await axios.post(`/schools`, body);
    dispatch(createSchoolDataSuccess(res.data.data));
    handleSuccess && handleSuccess(res.data.data);
    message.success("School added successfully.");
  } catch (error) {
    dispatch(createSchoolDataFailure({ error: error.response.data.message }));
    message.error(error.response.data.message);
  }
};

export const editSchool = (schoolObj, body, handleSuccess) => async dispatch => {
  dispatch(updateSchoolData());
  try {
    await axios.put(`/schools/${schoolObj.id}`, body);
    dispatch(updateSchoolDataSuccess({ ...schoolObj, ...body }));
    message.success("School edited successfully.");
    handleSuccess && handleSuccess();
  } catch (error) {
    dispatch(updateSchoolDataFailure({ error: error.response.data.message }));
  }
};
export const removeSchool = (created_by, handleSuccess) => async dispatch => {
  dispatch(deleteSchoolData());

  try {
    await axios.delete(`schools/${created_by}`);
    dispatch(deleteSchoolDataSuccess(created_by));
    handleSuccess && handleSuccess();
    message.success("School deleted successfully.");
  } catch (error) {
    dispatch(deleteSchoolDataFailure({ error: error.response.data.message }));
  }
};

export default schoolSlice.reducer;
