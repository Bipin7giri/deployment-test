import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    currentUser: false,
    name: null,
    isLoggedIn: false,
    token: null,
    message: "",
    statusCode: null,
    isEmailExist: false,
    phoneNumber: null,
    is_subscribed: false,
    email: null,
    memberType: null,
    isVerificationMailSend: false,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    registerSuc: (state, action) => {
      // if email already exit in db redirect to login api
      if (action.payload.statusCode === 409) {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        state.currentUser = action.payload.currentUser;
        state.isEmailExist = true;
      } else {
        state.message = "Logged in successfully";
        state.token = action.payload?.token;
        state.isLoggedIn = true;
        state.currentUser = action.payload.currentUser;
        // state.phoneNumber = action.payload.phone_number;
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIssubscribed: (state, action) => {
      state.is_subscribed = action.payload;
    },

    loginSuc: (state, action) => {
      state.statusCode = action.payload.statusCode;
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
      state.name = action.payload.name;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.memberType = action.payload.memberType;
      // window.location.reload();
    },
    loginFail: (state, action) => {
      message?.error(action?.payload?.message);
    },
    registerFail: (state, action) => {
      state.message = action.payload.message;
      state.statusCode = action.payload.statusCode;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.isEmailExist = false;
      state.statusCode = null;
    },
    clearState: (state) => {
      state.isEmailExist = false;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setIsVerificationMailSend: (state, action) => {
      state.isVerificationMailSend = action.payload;
    },
  },
});

export const {
  setToken,
  clearToken,
  registerSuc,
  registerFail,
  setLoading,
  clearState,
  loginSuc,
  loginFail,
  setIssubscribed,
  setPhoneNumber,
  setIsVerificationMailSend,
} = authSlice.actions;
export default authSlice.reducer;
