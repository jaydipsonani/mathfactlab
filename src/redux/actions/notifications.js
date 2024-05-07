import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  fetchNotificationListLoading: false,
  fetchNotificationListError: "",
  notificationList: [],
  unReadNotificationsCount: 0,
  isShowViewMoreButton: true,
  markAllNotificationAsReadLoading: false
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    enqueueSnackbar: (state, action) => {
      state.notifications.push({
        key: action.payload.key,
        ...action.payload.notification
      });
    },
    closeSnackbar: (state, action) => {
      state.notifications = state.notifications.map(notification =>
        action.payload.dismissAll || notification.key === action.payload.key
          ? { ...notification, dismissed: true }
          : { ...notification }
      );
    },
    removeSnackbar: (state, action) => {
      state.notifications = state.notifications.filter(notification => notification.key !== action.payload.key);
    },
    fetchAllNotificationsList: state => {
      state.fetchNotificationListLoading = true;
      state.isShowViewMoreButton = false;
      state.fetchNotificationListError = "";
    },
    fetchAllNotificationsListSuccess: (state, action) => {
      state.fetchNotificationListLoading = false;
      state.notificationList =
        action.payload.pageCount > 1
          ? [...state.notificationList, ...action.payload.notifications]
          : action.payload.notifications;
      state.unReadNotificationsCount = action.payload.unReadCount;
      state.isShowViewMoreButton = action.payload.notifications.length < 5 ? false : true;
    },
    fetchAllNotificationsListFailure: (state, action) => {
      state.fetchNotificationListLoading = false;
      state.fetchNotificationListError = action.payload.error;
    }
  }
});

export const {
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar,
  fetchAllNotificationsList,
  fetchAllNotificationsListSuccess,
  fetchAllNotificationsListFailure
} = notificationSlice.actions;

export default notificationSlice.reducer;
