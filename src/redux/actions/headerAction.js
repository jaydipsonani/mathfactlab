import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    searchText: "",
    searchClassCode: "",
    searchSchoolId: ""
  },
  reducers: {
    headerSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    headerSearchClassCode: (state, action) => {
      state.searchClassCode = action.payload;
    },
    headerResetFilter: state => {
      state.searchText = "";
      state.searchClassCode = "";
    },
    headerSearchSchool: (state, action) => {
      state.searchSchoolId = action.payload;
    }
  }
});

export const { headerSearchText, headerSearchClassCode, headerResetFilter, headerSearchSchool } = headerSlice.actions;

export default headerSlice.reducer;
