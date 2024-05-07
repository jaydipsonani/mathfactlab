// src/redux/slices/quizSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questionList: [],
    fetchingQuestionListLoading: false,
    fetchingQuestionListError: "",
    levelList: [],
    fetchingLevelListLoading: false,
    fetchingLevelListError: "",
    levelLearningModeList: [],
    fetchingLevelLearningModeListLoading: false,
    fetchingLevelLearningModeListError: "",
    //new submission
    addingNewSubmissionLoading: false,
    activeSubmissionDetails: {},
    addingNewSubmissionError: "",
    //last submission
    fetchingSubmissionDetailsLoading: false,
    submissionDetails: [],
    placementReportDetails: [],
    // placementTestDetails: [],
    fetchingSubmissionDetailsError: "",
    //Quiz questions data
    totalQuizLevel: "",
    isQuizStarted: false,
    isQuizCompleted: false,
    isQuizFailed: false,
    quizData: null,
    currentQuestionCount: 0,
    rightAnswerCount: 0,
    wrongAnswerCount: 0,
    totalQuestionCount: 0,
    userActiveQuizLevelId: "",
    quizContinuesCount: 0
  },
  reducers: {
    createAnswer: state => {
      return {
        ...state,
        addingNewAnswerLoading: true,
        addingNewAnswerError: ""
      };
    },
    createAnswerSuccess: (state, action) => {
      return {
        ...state,
        addingNewAnswerLoading: false
      };
    },
    createAnswerFailure: (state, action) => {
      return {
        ...state,
        addingNewAnswerLoading: false,
        addingNewAnswerError: action.payload.error
      };
    },
    // FETCHING QUESTIONS LIST
    fetchQuestionsList: state => {
      return {
        ...state,
        fetchingQuestionListLoading: true,
        fetchingQuestionListError: ""
      };
    },

    fetchQuestionsListSuccess: (state, action) => {
      return {
        ...state,
        fetchingQuestionListLoading: false,
        questionList: action.payload
      };
    },

    fetchQuestionsListFailure: (state, action) => {
      return {
        ...state,
        fetchingQuestionListLoading: false,
        fetchingQuestionListError: action.payload.error
      };
    },

    //FETCHING LEVEL LEARNING MODE LIST
    fetchLevelsLearningModeList: state => {
      return {
        ...state,
        isQuizStarted: false,
        isQuizCompleted: false,
        isQuizFailed: false,
        fetchingLevelLearningModeListLoading: true,
        fetchingLevelLearningModeListError: ""
      };
    },

    fetchLevelsLearningModeListSuccess: (state, action) => {
      return {
        ...state,
        fetchingLevelLearningModeListLoading: false,
        levelLearningModeList: action.payload
      };
    },

    fetchLevelsLearningModeListFailure: (state, action) => {
      return {
        ...state,
        fetchingLevelLearningModeListLoading: false,
        fetchingLevelLearningModeListError: action.payload.error
      };
    },

    // ADDING NEW SUBMISSION
    addNewSubmission: state => {
      return {
        ...state,
        addingNewSubmissionLoading: true,
        addingNewSubmissionError: ""
      };
    },

    addNewSubmissionSuccess: (state, action) => {
      return {
        ...state,
        addingNewSubmissionLoading: false,
        activeSubmissionDetails: action.payload
      };
    },

    addNewSubmissionFailure: (state, action) => {
      return {
        ...state,
        addingNewSubmissionLoading: false,
        addingNewSubmissionError: action.payload.error
      };
    },

    // FETCHING LAST SUBMISSION DETAILS
    fetchLastSubmissionDetails: state => {
      return {
        ...state,
        fetchingSubmissionDetailsLoading: true,
        fetchingSubmissionDetailsError: ""
      };
    },

    fetchLastSubmissionDetailsSuccess: (state, action) => {
      return {
        ...state,
        submissionDetails: action.payload.submissionDetails,
        fetchingSubmissionDetailsLoading: false
      };
    },

    fetchLastSubmissionDetailsFailure: (state, action) => {
      return {
        ...state,
        fetchingSubmissionDetailsLoading: false,
        fetchingSubmissionDetailsError: action.payload.error
      };
    },

    // FETCHING PLACEMENT TEST REPORT DETAILS
    fetchPlacementTestReportDetails: state => {
      return {
        ...state,
        fetchingSubmissionDetailsLoading: true,
        fetchingSubmissionDetailsError: ""
      };
    },

    fetchPlacementTestReportDetailsSuccess: (state, action) => {
      return {
        ...state,
        placementReportDetails: [action.payload.submissionDetails],
        fetchingSubmissionDetailsLoading: false
      };
    },

    fetchPlacementTestReportDetailsFailure: (state, action) => {
      return {
        ...state,
        fetchingSubmissionDetailsLoading: false,
        fetchingSubmissionDetailsError: action.payload.error
      };
    },
    // UPDATING CURRENT SUBMISSION DETAILS
    editCurrentSubmissionDetails: state => {
      return {
        ...state,
        updatingSubmissionLoading: true,
        updatingSubmissionError: ""
      };
    },

    editCurrentSubmissionDetailsSuccess: (state, action) => {
      return {
        ...state,
        updatingSubmissionLoading: false
      };
    },

    editCurrentSubmissionDetailsFailure: (state, action) => {
      return {
        ...state,
        updatingSubmissionLoading: false,
        updatingSubmissionError: action.payload.error
      };
    },
    // INCREMENTING CURRENT QUESTION
    updateCurrentQuestion: (state, action) => {
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1
      };
    },
    // UPDATING WRONG QUESTION COUNT
    updateWrongQuestionCount: (state, action) => {
      return {
        ...state,
        wrongAnswer: state.wrongAnswer + 1
      };
    }
  }
});

export const {
  createAnswer,
  createAnswerSuccess,
  createAnswerFailure,
  fetchQuestionsList,
  fetchQuestionsListSuccess,
  fetchQuestionsListFailure,
  fetchLevelsLearningModeList,
  fetchLevelsLearningModeListSuccess,
  fetchLevelsLearningModeListFailure,
  addNewSubmission,
  addNewSubmissionSuccess,
  addNewSubmissionFailure,
  fetchLastSubmissionDetails,
  fetchLastSubmissionDetailsSuccess,
  fetchLastSubmissionDetailsFailure,
  fetchPlacementTestReportDetails,
  fetchPlacementTestReportDetailsSuccess,
  fetchPlacementTestReportDetailsFailure,
  editCurrentSubmissionDetails,
  editCurrentSubmissionDetailsSuccess,
  editCurrentSubmissionDetailsFailure,
  updateCurrentQuestion,
  updateWrongQuestionCount
} = quizSlice.actions;

export const addAnswer = answerBody => async dispatch => {
  dispatch(createAnswer());

  axios
    .post(`/placement-test/submission/answers`, answerBody)
    .then(res => {
      dispatch(createAnswerSuccess({}));
    })

    .catch(error => {
      dispatch(
        createAnswerFailure({
          error: error.response.data.errors.message
        })
      );
    });
};

// get Questions List By level
export const getQuestionsList = body => async dispatch => {
  dispatch(fetchQuestionsList());

  try {
    const res = await axios.get(`/placement-test/questions/2`, body);
    dispatch(fetchQuestionsListSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchQuestionsListFailure({
        error: error.response?.data?.errors?.message || "Error fetching questions list"
      })
    );
  }
};
// get  Level learning mode List
export const getLevelsLearningModeList = () => async dispatch => {
  dispatch(fetchLevelsLearningModeList());

  try {
    const res = await axios.get(`/levels`);
    dispatch(fetchLevelsLearningModeListSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchLevelsLearningModeListFailure({
        error: error.response?.data?.errors?.message || "Error fetching level learning mode list"
      })
    );
  }
};

//add new submission
export const createNewSubmission = (body, handleSuccess) => async dispatch => {
  dispatch(addNewSubmission());

  try {
    const res = await axios.post(`/placement-test/submissions`, body);
    dispatch(addNewSubmissionSuccess(res.data.data));
    handleSuccess && handleSuccess();
  } catch (error) {
    dispatch(
      addNewSubmissionFailure({
        error: error.response?.data?.errors?.message || "Error adding new submission"
      })
    );
  }
};

//get last submission details
export const getSubmissionDetails =
  (userDetails, type = "") =>
  async dispatch => {
    dispatch(fetchLastSubmissionDetails());

    try {
      const res = await axios.get(
        `/placement-test/questions?learning_mode_id=${userDetails.profile.student_learning_mode_id}`
      );
      dispatch(fetchLastSubmissionDetailsSuccess({ submissionDetails: res.data.data }));
    } catch (error) {
      dispatch(
        fetchLastSubmissionDetailsFailure({
          error: error.response?.data?.errors?.message || "Error fetching last submission details"
        })
      );
    }
  };

//placement-test details
export const getPlacementTestReportDetails = (user_id, learning_mode) => async dispatch => {
  dispatch(fetchPlacementTestReportDetails());

  try {
    const res = await axios.get(
      `/placement-test/submissions/recent-report?learning_mode_id=${learning_mode}&user_id=${user_id}`
    );
    dispatch(
      fetchPlacementTestReportDetailsSuccess({
        submissionDetails: res.data.data
      })
    );
  } catch (error) {
    dispatch(
      fetchPlacementTestReportDetailsFailure({
        error: error.response?.data?.errors?.message || "Error fetching placement test report details"
      })
    );
  }
};

//update current submission
export const updateCurrentSubmissionDetails = (body, activeSubmissionDetails, handleSuccess) => async dispatch => {
  dispatch(editCurrentSubmissionDetails());

  axios
    .put(`/placement-test/submissions/${activeSubmissionDetails.id}`, body)
    .then(res => {
      dispatch(editCurrentSubmissionDetailsSuccess({}));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        editCurrentSubmissionDetailsFailure({
          error: error.response.data.errors.message
        })
      );
    });
};

export default quizSlice.reducer;
