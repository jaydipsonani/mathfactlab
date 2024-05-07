// src/redux/slices/quizSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
import { gaErrorLogger } from "../../utils/helpers";

const strategySlice = createSlice({
  name: "strategy",
  initialState: {
    fetchingStrategiesLoading: false,
    fetchingStrategiesError: "",
    strategyList: [],
    addNewPracticeTestSubmissionLoading: false,
    addNewPracticeTestSubmissionError: "",
    addNewPracticeTestSubmissionDetails: null,
    fetchingLevelLifterSubmissionCountLoading: false,
    fetchingLevelLifterSubmissionCountError: "",
    levelLifterSubmissionCount: 0,
    isSessionStart: false,

    userDetails: {
      profile: {
        is_add_sub_level_lifter: 0,
        is_mul_div_level_lifter: 0
      }
    },
    updateSessionLoading: false,
    updateSessionError: "",

    fetchingPracticeTestQuestionListLoading: false,
    fetchingPracticeTestQuestionListError: "",
    practiceTestQuestionList: [],
    studentPracticeTestProgressBarPercentage: 0,
    addPracticeTestAnswerListLoading: false,
    addPracticeTestAnswerListError: "",
    fetchingLevelLifterQuestionListLoading: false,
    fetchingSubmissionDetailsError: "",
    levelLifterSubmissionReportDetails: {},

    fetchingLevelLifterQuestionListError: "",
    levelLifterQuestionList: [],
    addNewLevelLifterSubmissionLoading: false,
    addNewLevelLifterSubmissionError: "",
    levelLifterSubmissionDetails: {},
    updatingCurrentLevelLifterSubmission: false,
    updateCurrentLevelLifterSubmissionError: "",
    createSessionLoading: false,
    createSessionError: "",
    sessionDetails: {},
    fetchingSessionListLoading: false,
    fetchingSessionListError: "",
    sessionListByUser: [],
    totalSessionLengthByUser: "",
    totalCompletedSessionLengthByUser: "",
    studentSessionStartDate: "",
    studentSessionTimer: +sessionStorage.getItem("sessionTimer") || 0,

    monthlySessionList: [],
    weeklySessionList: [],
    allStrategyList: [],
    fetchingAllStrategyListLoading: false,
    fetchingAllStrategyListError: "",
    addStudentOrderPracticeTestSubmissionLoading: false,
    addStudentOrderPracticeTestSubmissionError: "",
    addStudentOrderPracticeTestSubmissionDetails: null
  },
  reducers: {
    fetchStrategies: state => {
      state.fetchingStrategiesLoading = true;
      state.fetchingStrategiesError = "";
    },
    fetchStrategiesSuccess: (state, action) => {
      state.fetchingStrategiesLoading = false;
      state.strategyList = action.payload;
    },
    fetchStrategiesFailure: (state, action) => {
      state.fetchingStrategiesLoading = false;
      state.fetchingStrategiesError = action.payload.error;
    },
    createPracticeTestSubmission: state => {
      state.addNewPracticeTestSubmissionLoading = true;
      state.addNewPracticeTestSubmissionError = "";
    },
    createPracticeTestSubmissionSuccess: (state, action) => {
      state.addNewPracticeTestSubmissionLoading = false;
      state.addNewPracticeTestSubmissionDetails = action.payload;
    },
    createPracticeTestSubmissionFailure: (state, action) => {
      state.addNewPracticeTestSubmissionLoading = false;
      state.addNewPracticeTestSubmissionError = action.payload.error;
    },
    fetchLevelLifterSubmissionCount: state => {
      state.fetchingLevelLifterSubmissionCountLoading = true;
      state.fetchingLevelLifterSubmissionCountError = "";
    },
    fetchLevelLifterSubmissionCountSuccess: (state, action) => {
      state.fetchingLevelLifterSubmissionCountLoading = false;
      state.levelLifterSubmissionCount = action.payload;
    },
    fetchLevelLifterSubmissionCountFailure: (state, action) => {
      state.fetchingLevelLifterSubmissionCountLoading = false;
      state.fetchingLevelLifterSubmissionCountError = action.payload.error;
    },
    startStudentSessionTimer: (state, action) => {
      sessionStorage.setItem("sessionTimer", state.studentSessionTimer + 1);
      return {
        ...state,
        isSessionStart: true,
        studentSessionTimer: state.studentSessionTimer + 1
      };
    },
    // updateLevelLifterCount: (state, action) => {
    //   return {
    //     ...state,
    //     userDetails: {
    //       ...state.userDetails,
    //       profile: {
    //         ...state.userDetails.profile,
    //         is_add_sub_level_lifter:
    //           action.payload.student_learning_mode_id === 1
    //             ? +state.userDetails.profile.is_add_sub_level_lifter + 1
    //             : state.userDetails.profile.is_add_sub_level_lifter,

    //         is_mul_div_level_lifter:
    //           action.payload.student_learning_mode_id === 2
    //             ? +state.userDetails.profile.is_mul_div_level_lifter + 1
    //             : state.userDetails.profile.is_mul_div_level_lifter,
    //       },
    //     },
    //   };
    // },
    endStudentSession: state => {
      return {
        ...state,
        updateSessionLoading: true, // we have put a timer of 5sec that's why we are not changing state here
        updateSessionError: ""
      };
    },
    endStudentSessionSuccess: (state, action) => {
      return {
        ...state,
        updateSessionLoading: false,
        sessionDetails: action.payload
      };
    },
    endStudentSessionFailure: (state, action) => {
      return {
        ...state,
        updateSessionLoading: false,
        updateSessionError: action.payload.error
      };
    },
    fetchPracticeTestQuestionList: state => {
      return {
        ...state,
        fetchingPracticeTestQuestionListLoading: true,
        fetchingPracticeTestQuestionListError: "",
        practiceTestQuestionList: [],
        studentPracticeTestProgressBarPercentage: 0
      };
    },
    fetchPracticeTestQuestionListSuccess: (state, action) => {
      return {
        ...state,
        fetchingPracticeTestQuestionListLoading: false,
        practiceTestQuestionList: action.payload,
        studentPracticeTestProgressBarPercentage: 1 * (100 / action.payload.length)
      };
    },
    fetchPracticeTestQuestionListFailure: (state, action) => {
      return {
        ...state,
        fetchingPracticeTestQuestionListLoading: false,
        fetchingPracticeTestQuestionListError: action.payload.error
      };
    },
    createBatchPracticeTestSubmission: state => {
      return {
        ...state,
        addPracticeTestAnswerListLoading: true,
        addPracticeTestAnswerListError: ""
      };
    },
    createBatchPracticeTestSubmissionSuccess: state => {
      return {
        ...state,
        addPracticeTestAnswerListLoading: false
      };
    },
    createBatchPracticeTestSubmissionFailure: (state, action) => {
      return {
        ...state,
        addPracticeTestAnswerListLoading: false,
        addPracticeTestAnswerListError: action.payload.error
      };
    },
    updatePracticeSessionProgressBarCountSuccess: (state, action) => {
      const { currentQuestionIndex, totalPracticeTestQuestion } = action.payload.payload;
      const addedIndex = 2;

      return {
        ...state,
        studentPracticeTestProgressBarPercentage:
          (currentQuestionIndex + addedIndex) * (100 / totalPracticeTestQuestion)
      };
    },
    fetchLevelLifterTestReportDetails: state => {
      return {
        ...state,
        fetchingLevelLifterQuestionListLoading: true,
        fetchingSubmissionDetailsError: ""
      };
    },
    fetchLevelLifterTestReportDetailsSuccess: (state, action) => {
      return {
        ...state,
        levelLifterSubmissionReportDetails: action.payload.submissionDetails,
        fetchingLevelLifterQuestionListLoading: false
      };
    },
    fetchLevelLifterTestReportDetailsFailure: (state, action) => {
      return {
        ...state,
        fetchingLevelLifterQuestionListLoading: false,
        fetchingSubmissionDetailsError: action.payload.error
      };
    },
    fetchLevelLifterQuestionList: (state, action) => {
      state.fetchingLevelLifterQuestionListLoading = true;
      state.fetchingLevelLifterQuestionListError = "";
      state.levelLifterQuestionList = [];
      state.levelLifterSubmissionReportDetails = {};
    },
    fetchLevelLifterQuestionListSuccess: (state, action) => {
      state.fetchingLevelLifterQuestionListLoading = false;
      state.levelLifterQuestionList = action.payload.questions;
      state.levelLifterSubmissionReportDetails = action.payload;
    },
    fetchLevelLifterQuestionListFailure: (state, action) => {
      state.fetchingLevelLifterQuestionListLoading = false;
      state.fetchingLevelLifterQuestionListError = action.payload.error;
    },
    addNewLevelLifterSubmission: state => {
      state.addNewLevelLifterSubmissionLoading = true;
      state.addNewLevelLifterSubmissionError = "";
    },
    addNewLevelLifterSubmissionSuccess: (state, action) => {
      state.addNewLevelLifterSubmissionLoading = false;
      state.levelLifterSubmissionDetails = action.payload;
    },
    addNewLevelLifterSubmissionFailure: (state, action) => {
      state.addNewLevelLifterSubmissionLoading = false;
      state.addNewLevelLifterSubmissionError = action.payload.error;
    },
    createLevelLifterAnswer: state => {
      state.addLevelLifterAnswerLoading = true;
      state.addLevelLifterAnswerError = "";
    },
    createLevelLifterAnswerSuccess: state => {
      state.addLevelLifterAnswerLoading = false;
    },
    createLevelLifterAnswerFailure: (state, action) => {
      state.addLevelLifterAnswerLoading = false;
      state.addLevelLifterAnswerError = action.payload.error;
    },
    editCurrentLevelLifterSubmissionDetails: state => {
      state.updatingCurrentLevelLifterSubmission = true;
      state.updateCurrentLevelLifterSubmissionError = "";
    },
    editCurrentLevelLifterSubmissionDetailsSuccess: state => {
      state.updatingCurrentLevelLifterSubmission = false;
      state.levelLifterSubmissionCount += 1;
    },
    editCurrentLevelLifterSubmissionDetailsFailure: (state, action) => {
      state.updatingCurrentLevelLifterSubmission = false;
      state.updateCurrentLevelLifterSubmissionError = action.payload.error;
    },
    createStudentSession: state => {
      state.createSessionLoading = true;
      state.createSessionError = "";
    },
    createStudentSessionSuccess: (state, action) => {
      state.createSessionLoading = false;
      state.sessionDetails = action.payload;
    },
    createStudentSessionFailure: (state, action) => {
      state.createSessionLoading = false;
      state.createSessionError = action.payload.error;
    },
    fetchStudentSessionList: (state, action) => {
      state.fetchingSessionListLoading = true;
      state.fetchingSessionListError = "";
      state.sessionListByUser = action.payload.page === 1 ? [] : state.sessionListByUser;
      state.totalSessionLengthByUser = "";
      state.totalCompletedSessionLengthByUser = "";
      state.studentSessionStartDate = "";
    },
    fetchStudentSessionListSuccess: (state, action) => {
      state.fetchingSessionListLoading = false;
      state.sessionListByUser =
        action.payload.page === 1
          ? [...action.payload.res.sessions]
          : [...state.sessionListByUser, ...action.payload.res.sessions];
      state.totalSessionLengthByUser = action.payload.res.total_sessions;
      state.totalCompletedSessionLengthByUser = action.payload.res.total_completed_sessions;
      state.studentSessionStartDate = action.payload.res.session_start_date;
    },
    fetchStudentSessionListFailure: (state, action) => {
      state.fetchingSessionListLoading = false;
      state.fetchingSessionListError = action.payload.error;
    },
    stopStudentSessionTimer: (state, action) => {
      state.isSessionStart = false;
      state.studentSessionTimer = 0;
    },
    fetchWeeklyStudentSessionList: state => {
      state.fetchingSessionListLoading = true;
      state.fetchingSessionListError = "";
      state.weeklySessionList = [];
    },
    fetchWeeklyStudentSessionListSuccess: (state, action) => {
      state.fetchingSessionListLoading = false;
      state.weeklySessionList = action.payload;
    },
    fetchWeeklyStudentSessionListFailure: (state, action) => {
      state.fetchingSessionListLoading = false;
      state.fetchingSessionListError = action.payload.error;
    },
    fetchMonthlyStudentSessionList: state => {
      state.fetchingSessionListLoading = true;
      state.fetchingSessionListError = "";
      state.monthlySessionList = [];
    },
    fetchMonthlyStudentSessionListSuccess: (state, action) => {
      state.fetchingSessionListLoading = false;
      state.monthlySessionList = action.payload;
    },
    fetchMonthlyStudentSessionListFailure: (state, action) => {
      state.fetchingSessionListLoading = false;
      state.fetchingSessionListError = action.payload.error;
    },
    fetchAllStrategyList: state => {
      state.fetchingAllStrategyListLoading = true;
      state.fetchingAllStrategyListError = "";
    },
    fetchAllStrategyListSuccess: (state, action) => {
      state.fetchingAllStrategyListLoading = false;
      state.allStrategyList = action.payload.filter(strategy => strategy.isViewable);
    },
    fetchAllStrategyListFailure: (state, action) => {
      state.fetchingAllStrategyListLoading = false;
      state.fetchingAllStrategyListError = action.payload.error;
    },
    createStudentOrderPracticeTestSubmission: state => {
      state.addStudentOrderPracticeTestSubmissionLoading = true;
      state.addStudentOrderPracticeTestSubmissionError = "";
    },
    createStudentOrderPracticeTestSubmissionSuccess: (state, action) => {
      state.addStudentOrderPracticeTestSubmissionLoading = false;
      state.addStudentOrderPracticeTestSubmissionDetails = action.payload;
    },
    createStudentOrderPracticeTestSubmissionFailure: (state, action) => {
      state.addStudentOrderPracticeTestSubmissionLoading = false;
      state.addStudentOrderPracticeTestSubmissionError = action.payload.error;
    }
  }
});

export const {
  fetchStrategies,
  fetchStrategiesSuccess,
  fetchStrategiesFailure,
  createPracticeTestSubmission,
  createPracticeTestSubmissionSuccess,
  createPracticeTestSubmissionFailure,
  fetchLevelLifterSubmissionCount,
  fetchLevelLifterSubmissionCountSuccess,
  fetchLevelLifterSubmissionCountFailure,
  startStudentSessionTimer,
  stopStudentSessionTimer,
  // updateLevelLifterCount,
  endStudentSession,
  endStudentSessionSuccess,
  endStudentSessionFailure,
  fetchPracticeTestQuestionList,
  fetchPracticeTestQuestionListSuccess,
  fetchPracticeTestQuestionListFailure,
  createBatchPracticeTestSubmission,
  createBatchPracticeTestSubmissionSuccess,
  createBatchPracticeTestSubmissionFailure,
  updatePracticeSessionProgressBarCountSuccess,
  fetchLevelLifterTestReportDetails,
  fetchLevelLifterTestReportDetailsSuccess,
  fetchLevelLifterTestReportDetailsFailure,
  fetchLevelLifterQuestionList,
  fetchLevelLifterQuestionListSuccess,
  fetchLevelLifterQuestionListFailure,
  addNewLevelLifterSubmission,
  addNewLevelLifterSubmissionSuccess,
  addNewLevelLifterSubmissionFailure,
  createLevelLifterAnswer,
  createLevelLifterAnswerSuccess,
  createLevelLifterAnswerFailure,
  editCurrentLevelLifterSubmissionDetails,
  editCurrentLevelLifterSubmissionDetailsSuccess,
  editCurrentLevelLifterSubmissionDetailsFailure,
  createStudentSession,
  createStudentSessionSuccess,
  createStudentSessionFailure,
  fetchStudentSessionList,
  fetchStudentSessionListSuccess,
  fetchStudentSessionListFailure,
  fetchWeeklyStudentSessionList,
  fetchWeeklyStudentSessionListSuccess,
  fetchWeeklyStudentSessionListFailure,
  fetchMonthlyStudentSessionList,
  fetchMonthlyStudentSessionListSuccess,
  fetchMonthlyStudentSessionListFailure,
  fetchAllStrategyList,
  fetchAllStrategyListSuccess,
  fetchAllStrategyListFailure,
  createStudentOrderPracticeTestSubmission,
  createStudentOrderPracticeTestSubmissionSuccess,
  createStudentOrderPracticeTestSubmissionFailure
} = strategySlice.actions;

export const getStrategies = (learning_mode, level_id) => async dispatch => {
  dispatch(fetchStrategies());

  axios
    .get(
      `/strategies/user${
        learning_mode ? `?learning_mode_id=${learning_mode}` : ""
      }${level_id ? `&level=${level_id}` : ""}`
    )
    .then(res => {
      dispatch(fetchStrategiesSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(fetchStrategiesFailure({ error: error?.response?.data?.message }));
      gaErrorLogger(error, "getStrategies");
    });
};

export const addNewPracticeTestSubmission = body => async dispatch => {
  dispatch(createPracticeTestSubmission());

  try {
    const res = await axios.post("/practice-test/submissions", body);
    dispatch(createPracticeTestSubmissionSuccess(res.data.data));
  } catch (error) {
    dispatch(
      createPracticeTestSubmissionFailure({
        error: error?.response?.data?.message
      })
    );
    gaErrorLogger(error, "addNewPracticeTestSubmission");
  }
};

//fetch level lifter submission count
export const getLevelLifterSubmissionCount = (learningMode, levelId) => async dispatch => {
  dispatch(fetchLevelLifterSubmissionCount());

  try {
    const res = await axios.get(
      `/level-lifter-test/submissions/count?learning_mode_id=${learningMode}&level=${levelId}`
    );
    dispatch(fetchLevelLifterSubmissionCountSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchLevelLifterSubmissionCountFailure({
        error: error?.response?.data?.message
      })
    );
    gaErrorLogger(error, "getLevelLifterSubmissionCount");
  }
};

//end session
export const endSession = (sessionId, body, handleSuccess) => async dispatch => {
  dispatch(endStudentSession());

  return axios
    .put(`/student-sessions/${sessionId}`, body)
    .then(res => {
      dispatch(endStudentSessionSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        endStudentSessionFailure({
          error: error?.response?.data?.message
        })
      );
      gaErrorLogger(error, "endSession");
    });
};

export const getPracticeTestQuestionList = (slug, learning_mode, level_id, set_no, orderType) => async dispatch => {
  dispatch(fetchPracticeTestQuestionList());

  axios
    .get(
      `/practice-test/strategies/${slug}/questions?learning_mode_id=${learning_mode}&level=${level_id}${
        set_no ? `&set_no=${set_no}` : ""
      }${orderType ? `&order=${orderType}` : ""}`
    )
    .then(res => {
      dispatch(fetchPracticeTestQuestionListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchPracticeTestQuestionListFailure({
          error: error?.response?.data?.message
        })
      );
      gaErrorLogger(error, "getPracticeTestQuestionList");
    });
};
//Submit practice test  batch answer list
export const addBatchPracticeTestAnswerList = (body, handleSuccess) => async dispatch => {
  dispatch(createBatchPracticeTestSubmission());
  axios
    .post(`/practice-test/submissions/answers`, body)
    .then(res => {
      dispatch(createBatchPracticeTestSubmissionSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        createBatchPracticeTestSubmissionFailure({
          error: error?.response?.data?.message
        })
      );
      gaErrorLogger(error, "addBatchPracticeTestAnswerList");
    });
};

//placement-test details
export const getLevelLifterTestReportDetails = (user_id, learning_mode, submission_id) => async dispatch => {
  dispatch(fetchLevelLifterTestReportDetails());

  axios
    .get(
      `/level-lifter-test/submissions/recent-report?learning_mode_id=${learning_mode}&user_id=${user_id}${
        submission_id ? `&submission_id=${submission_id}` : ""
      }`
    )
    .then(res => {
      dispatch(
        fetchLevelLifterTestReportDetailsSuccess({
          submissionDetails: res.data.data
        })
      );
    })
    .catch(error => {
      dispatch(
        fetchLevelLifterTestReportDetailsFailure({
          error: error.response.data.errors.message
        })
      );
    });
};
//practice test question list
export const getLevelLifterQuestionList = (type, userID, learningMode, submissionID, levelId) => async dispatch => {
  dispatch(fetchLevelLifterQuestionList());

  axios
    .get(
      `/level-lifter-test/questions?learning_mode_id=${learningMode}&level=${levelId}`
      // `/test/get-level-lifter-questions${type ? "?type=attempted" : ""}${
      //   userID ? `${type ? "&" : "?"}user_id=${userID}` : ""
      // }${learningMode ? `&learning_mode=${learningMode}` : ""}${
      //   submissionID ? `&submission_id=${submissionID}` : ""
      // }`,
    )
    .then(res => {
      dispatch(fetchLevelLifterQuestionListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchLevelLifterQuestionListFailure({
          error: error?.response?.data?.message
        })
      );
      gaErrorLogger(error, "getLevelLifterQuestionList");
    });
};

//level lifter  list
export const createNewLevelLifterSubmission = (body, handleSuccess, student_user_id) => async dispatch => {
  dispatch(addNewLevelLifterSubmission());

  axios
    .post(`/level-lifter-test/submissions${student_user_id ? `?student_user_id=${student_user_id}` : ""}`, body)
    .then(res => {
      dispatch(addNewLevelLifterSubmissionSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        addNewLevelLifterSubmissionFailure({
          error: error?.response?.data?.message
        })
      );
      gaErrorLogger(error, "createNewLevelLifterSubmission");
    });
};

//add new level lifter answer
export const addLevelLifterAnswer = answerBody => async dispatch => {
  dispatch(createLevelLifterAnswer());

  axios
    .post(`/level-lifter-test/submission/answers`, answerBody)
    .then(res => {
      dispatch(createLevelLifterAnswerSuccess({}));
    })

    .catch(error => {
      dispatch(
        createLevelLifterAnswerFailure({
          error: error?.response?.data?.message
        })
      );
      gaErrorLogger(error, "addLevelLifterAnswer");
    });
};

//update current level lifter submission

export const updateCurrentLevelLifterSubmissionDetails =
  (body, activeSubmissionDetails, handleSuccess, handleCallbackFetchStrategies, student_user_id) => async dispatch => {
    dispatch(editCurrentLevelLifterSubmissionDetails());

    axios
      .put(
        `/level-lifter-test/submissions/${activeSubmissionDetails.id}?${
          student_user_id ? `student_user_id=${student_user_id}` : ""
        }`,
        body
      )
      .then(res => {
        dispatch(editCurrentLevelLifterSubmissionDetailsSuccess({}));
        handleSuccess && handleSuccess();
        handleCallbackFetchStrategies && handleCallbackFetchStrategies();
      })
      .catch(error => {
        dispatch(
          editCurrentLevelLifterSubmissionDetailsFailure({
            error: error?.response?.data?.message
          })
        );
        gaErrorLogger(error, "updateCurrentLevelLifterSubmissionDetails");
      });
  };
//start session

export const startSession = body => async dispatch => {
  dispatch(createStudentSession());

  axios
    .post(`/student-sessions`, body)
    .then(res => {
      dispatch(createStudentSessionSuccess(res.data.data));
      sessionStorage.setItem("session_id", res.data.data.id);
    })
    .catch(error => {
      dispatch(
        createStudentSessionFailure({
          error: error?.response?.data?.message
        })
      );
      gaErrorLogger(error, "startSession");
    });
};
//get all session details by student id

export const getSessionDetailsByStudentID = (userID, page, limit, start_date, end_date) => async dispatch => {
  dispatch(fetchStudentSessionList({ page }));
  axios
    // .get(`/user/sessions?user_id=${userID}`)
    .get(
      `/student-sessions?user_id=${userID}${page ? `&page=${page}` : ""}${
        limit ? `&limit=${limit}` : ""
      }${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`
    )
    .then(res => {
      dispatch(fetchStudentSessionListSuccess({ res: res.data.data, page }));
    })
    .catch(error => {
      dispatch(
        fetchStudentSessionListFailure({
          error: error?.response?.data?.message
        })
      );
      gaErrorLogger(error, "getSessionDetailsByStudentID");
    });
};
export const getWeeklySessionDetailsByStudentID = (userID, start_date, end_date) => async dispatch => {
  dispatch(fetchWeeklyStudentSessionList());
  try {
    const response = await axios.get(
      `/student-sessions?user_id=${userID}${
        start_date ? `&start_date=${start_date}` : ""
      }${end_date ? `&end_date=${end_date}` : ""}`
    );
    dispatch(fetchWeeklyStudentSessionListSuccess(response.data.data));
  } catch (error) {
    dispatch(
      fetchWeeklyStudentSessionListFailure({
        error: error?.response?.data?.message
      })
    );
  }
};

//monthly session details

export const getMonthlySessionDetailsByStudentID = (userID, start_date, end_date) => async dispatch => {
  dispatch(fetchMonthlyStudentSessionList());
  try {
    const response = await axios.get(
      `/student-sessions?user_id=${userID}${
        start_date ? `&start_date=${start_date}` : ""
      }${end_date ? `&end_date=${end_date}` : ""}`
    );
    dispatch(fetchMonthlyStudentSessionListSuccess(response.data.data));
  } catch (error) {
    dispatch(
      fetchMonthlyStudentSessionListFailure({
        error: error?.response?.data?.message
      })
    );
  }
};
//all strategy list
export const getAllStrategyList = () => async dispatch => {
  dispatch(fetchAllStrategyList());
  try {
    const response = await axios.get(`/strategies`);
    dispatch(fetchAllStrategyListSuccess(response.data.data));
  } catch (error) {
    dispatch(
      fetchAllStrategyListFailure({
        error: error?.response?.data?.message
      })
    );
    gaErrorLogger(error, "getAllStrategyList");
  }
};

export const addStudentOrderPracticeTestSubmission = (slug, learning_mode, level_id, orderType) => async dispatch => {
  dispatch(fetchPracticeTestQuestionList());
  try {
    const res = await axios.get(
      `/practice-test/strategies/${slug}/questions?learning_mode_id=${learning_mode}&level=${level_id}&order=${orderType}`
    );

    dispatch(fetchPracticeTestQuestionListSuccess(res.data.data));
    sessionStorage.setItem("practice_test_submissions_id", res.data.data.id);
  } catch (error) {
    dispatch(
      fetchPracticeTestQuestionListFailure({
        error: error?.response?.data?.message
      })
    );
    gaErrorLogger(error, "addStudentOrderPracticeTestSubmission");
  }
};

export const updatePracticeSessionProgressBarCount = (currentQuestionIndex, totalPracticeTestQuestion) => dispatch => {
  dispatch(
    updatePracticeSessionProgressBarCountSuccess({
      type: "UPDATE_PRACTICE_SESSION_PROGRESS_BAR_COUNT_LOCALLY",
      payload: {
        currentQuestionIndex,
        totalPracticeTestQuestion
      }
    })
  );
};
// export default strategySlice.reducer;
export const { reducer: practiceReducer } = strategySlice;
export default strategySlice;
