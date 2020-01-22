import { LOGIN } from "../Actions/types";
let initialState = {
  authErrorModal: false,
  Loading: false,
  isLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, currentUser: action.payload[0], isLogin: true };
    case "AUTH_ERROR":
      return { ...state, authErrorModal: true, Loading: false };
    case "LOADING":
      return { ...state, Loading: true };
    case "CLOSE_LOADING":
      return { ...state, Loading: false };
    default:
      return state;
  }
};
