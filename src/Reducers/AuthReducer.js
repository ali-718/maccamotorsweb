import { LOGIN } from "../Actions/types";
let initialState = {
  authErrorModal: false,
  Loading: false,
  isLogin: false,
  isForgotSuccess: false,
  forgotPasswordError: false,
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, currentUser: action.payload[0], isLogin: true };
    case "AUTH_ERROR":
      return { ...state, authErrorModal: true, Loading: false };
    case "LOADING":
      return { ...state, Loading: true };
    case "LOGOUT":
      return { ...state, currentUser: {}, isLogin: false };
    case "CLOSE_LOADING":
      return { ...state, Loading: false };
    case "FORGOT_PASSWORD":
      return {
        ...state,
        Loading: false,
        isForgotSuccess: true,
        authErrorModal: false
      };
    case "FORGOT_PASSWORD_ERROR":
      return {
        ...state,
        Loading: false,
        forgotPasswordError: true
      };
    default:
      return state;
  }
};
