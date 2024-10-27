import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  authSignInWithGoogle,
  authSignUpWithGoogle,
  authSignInEmail,
  updatePhoneNumberReq,
  checkAllowSigninReq,
  loadPromoCode,
} from "./api.js";
import {
  loginFail,
  loginSuc,
  registerFail,
  clearToken,
  registerSuc,
  setLoading,
  setIssubscribed,
  setPhoneNumber,
} from "./authSlice.js";
import { jwtDecode } from "jwt-decode";

import actions from "./actions";

// here
function* callUserGoogleSignReq(action) {
  try {
    yield put(setLoading(true));
    if (action.payload.login_type === 1) {
      const response = yield call(authSignUpWithGoogle, {
        user_id: action.payload.user_id,
        email: action.payload.email,
        login_type: action.payload.login_type,
      });
      yield put(
        registerSuc({
          statusCode: response?.data?.status,
          message: response?.data?.message,
          name: response?.data?.data?.name,
          currentUser: response?.data?.data?.user_id,
          token: response?.data?.accessToken,
        })
      );
      yield put(setLoading(false));
    }
    if (action.payload.login_type === 2) {
      const response = yield call(authSignUpWithGoogle, {
        user_id: action.payload.user_id,
        email: action.payload.email,
        login_type: action.payload.login_type,
        password: action.payload.password,
        user_name: action.payload.user_name,
        phone_number: action.payload.phone_number,
        // firebaseValidation: action.payload.firebaseValidation,
      });
      // yield put(
      //   registerSuc({
      //     statusCode: response.data.status,
      //     message: response.data.message,
      //     token: response.data.data.accessToken,
      //     name: response.data.data.name,
      //     currentUser: response.data.data.user_id,
      //     // phone_number: response.data.data.phone_number,
      //   })
      // );
      yield put(setLoading(false));
      const code = localStorage.getItem("sarallagani_promocode");
      if (response?.data?.data && code) {
        loadPromoCode({
          email: action.payload.email,
          code: code,
        });
      }
    }
  } catch (error) {
    yield put(
      registerFail({
        message: error.response?.data.error.message,
        statusCode: error.response?.data.statusCode,
      })
    );

    yield put(setLoading(false));
  }
}
function* callUserGoogleLoginReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(authSignInWithGoogle, {
      email: action.payload.email,
      password: action.payload?.password,
    });
    if (response?.data?.message === "Error: Password did not match.") {
      yield put(
        loginFail({
          message:
            "It appears that this email has been used for login in a different form previously",
        })
      );
    } else if (response?.data?.status != 200) {
      yield put(
        loginFail({
          message: response?.data?.message,
        })
      );
    } else {
      const token = response?.headers?.authorization;
      document.cookie = `authorization=${token}; path=/;`;
      const decoded = jwtDecode(token);
      if (decoded?.is_subscribed) {
        yield put(setIssubscribed(decoded?.is_subscribed === 0 ? false : true));
      } else {
        yield put(setIssubscribed(false));
      }
      yield put(
        loginSuc({
          statusCode: response?.data?.status,
          currentUser: response?.data?.data?.user_id,
          name: response?.data?.data?.user_name,
          token: response?.headers?.authorization,
          phoneNumber: response?.data?.data?.phone_number,
          email: response?.data?.data?.email,
          memberType: response?.data?.data?.member_type,
          isLoggedIn: true,
        })
      );
    }
    yield put(setLoading(false));
  } catch (error) {
    yield put(
      loginFail({
        message: "Something went wrong",
      })
    );
    yield put(setLoading(false));
  }
}

function* callUserNormalLoginReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(authSignInEmail, {
      email: action.payload.email,
      password: action.payload?.password,
    });
    if (response?.data?.status != 200) {
      yield put(
        loginFail({
          message:
            "It appears that this email has been used for login in a different form previously.",
        })
      );
    } else {
      yield put(
        loginSuc({
          statusCode: response?.data?.status,
          currentUser: response?.data?.data?.user_id,
          name: response?.data?.data?.name,
          token: response?.headers?.authorization,
          isLoggedIn: true,
        })
      );
      // yield put(
      //   loginFail({
      //     message: "Login Success",
      //   })
      // );
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(
      loginFail({
        message: "Something went wrong",
      })
    );
    yield put(setLoading(false));
  }
}

function* callUserLogoutReq() {
  yield put(clearToken(false));
  yield put(setIssubscribed(false));
  localStorage.removeItem("persist:root");
  // Set the expiration date to a date in the past
  document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; sameSite=Strict`;
  yield put(
    loginSuc({
      statusCode: null,
      currentUser: null,
      name: null,
      token: null,
      phoneNumber: null,
      email: null,
      isLoggedIn: false,
    })
  );
  // window.location.reload();
}

function* callUpdateUserPhoneNumberReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(updatePhoneNumberReq, {
      user_id: action.payload.user_id,
      phone_number: action.payload?.phone_number,
    });
    yield put(setPhoneNumber(response?.data?.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* callCheckAllowSigninReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(checkAllowSigninReq, {});
    if (response?.data?.status === 498 || response?.data?.status === 499) {
      yield put(clearToken(false));
      // window.location.reload();
      localStorage.removeItem("persist:root");
      // Set the expiration date to a date in the past
      document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; sameSite=Strict`;
    }
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* userGoogleRegister() {
  yield takeLatest(actions.USER_REGISTER_GOOGLE_REQ, callUserGoogleSignReq);
}

export function* userGoogleLogin() {
  yield takeLatest(actions.USER_GOOGLE_LOGIN_REQ, callUserGoogleLoginReq);
}
export function* userNormalLogin() {
  yield takeLatest(actions.USER_LOGIN_REQ, callUserNormalLoginReq);
}

export function* userLogout() {
  yield takeLatest(actions.USER_LOGOUT_REQ, callUserLogoutReq);
}

export function* callUpdateUserPhoneNumber() {
  yield takeLatest(actions.UPDATE_PHONE_NUMBER, callUpdateUserPhoneNumberReq);
}

export function* callCheckAllowSignin() {
  yield takeLatest(actions.CHECK_ALLOW_SIGNIN, callCheckAllowSigninReq);
}

export default function* authSaga() {
  yield all([
    fork(userGoogleRegister),
    fork(userGoogleLogin),
    fork(userLogout),
    fork(userNormalLogin),
    fork(callUpdateUserPhoneNumber),
    fork(callCheckAllowSignin),
  ]);
}
