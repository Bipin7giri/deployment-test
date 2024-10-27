const entities = "[auth]";

const actions = {
  USER_REGISTER_GOOGLE_REQ: `${entities} USER_REGISTER_GOOGLE_REQ`,

  USER_LOGIN_REQ: `${entities} USER_LOGIN_REQ`,

  USER_GOOGLE_LOGIN_REQ: `${entities} USER_GOOGLE_LOGIN_REQ`,

  GET_CURRENT_USER_REQ: `${entities} GET_CURRENT_USER_REQ`,
  GET_CURRENT_USER_SUC: `${entities} GET_CURRENT_USER_SUC`,
  GET_CURRENT_USER_FAIL: `${entities} GET_CURRENT_USER_FAIL`,

  UPDATE_CURRENT_USER_REQ: `${entities} UPDATE_CURRENT_USER_REQ`,
  UPDATE_CURRENT_USER_SUC: `${entities} UPDATE_CURRENT_USER_SUC`,
  UPDATE_CURRENT_USER_FAIL: `${entities} UPDATE_CURRENT_USER_FAIL`,

  USER_LOGOUT_REQ: `${entities} USER_LOGOUT_REQ`,
  USER_LOGOUT_SUC: `${entities} USER_LOGOUT_SUC`,
  USER_LOGOUT_FAIL: `${entities} USER_LOGOUT_FAIL`,

  GET_TOKEN_FROM_LS_REQ: `${entities} GET_TOKEN_FROM_LS_REQ`,
  GET_TOKEN_FROM_LS_SUC: `${entities} GET_TOKEN_FROM_LS_SUC`,
  GET_TOKEN_FROM_LS_FAIL: `${entities} GET_TOKEN_FROM_LS_FAIL`,

  login: (payload) => ({
    type: actions.USER_LOGIN_REQ,
    payload,
  }),

  loginGoogle: (payload) => ({
    type: actions.USER_GOOGLE_LOGIN_REQ,
    payload,
  }),

  registerGoogle: (payload) => ({
    type: actions.USER_REGISTER_GOOGLE_REQ,
    payload,
  }),

  logout: () => ({
    type: actions.USER_LOGOUT_REQ,
  }),

  getCurrentUser: (payload) => ({
    type: actions.GET_CURRENT_USER_REQ,
    payload,
  }),

  updateCurrentUser: (payload) => ({
    type: actions.UPDATE_CURRENT_USER_REQ,
    payload,
  }),

  getTokenFromStorage: (payload) => ({
    type: actions.GET_TOKEN_FROM_LS_REQ,
    payload,
  }),

  UPDATE_PHONE_NUMBER: `${entities} UPDATE_PHONE_NUMBER`,
  updatePhoneNumber: (payload) => ({
    type: actions.UPDATE_PHONE_NUMBER,
    payload,
  }),

  CHECK_ALLOW_SIGNIN: `${entities} CHECK_ALLOW_SIGNIN`,
  checkAllowSignin: (payload) => ({
    type: actions.CHECK_ALLOW_SIGNIN,
    payload,
  }),
};

export default actions;
