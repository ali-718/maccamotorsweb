import axios from "axios";
import { url } from "../config";
import { LOGIN } from "./types";

export const Login = (Email, Passsword, history) => dispatch => {
  dispatch(Loading());
  console.log("Login clicked");
  axios
    .post(`${url}/Login?EmailAddr=${Email}&pwd=${Passsword}`)
    .then(res => {
      dispatch({ type: LOGIN, payload: res.data });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch(CloseLoading());
      history.push("/home");
    })
    .catch(e => {
      dispatch({ type: "AUTH_ERROR" });
      dispatch(CloseLoading());
    });
};

export const Logout = history => dispatch => {
  localStorage.removeItem("currentUser");
  dispatch({ type: "LOGOUT" });
  history.push("/");
};

export const ForgotPassword = Email => dispatch => {
  dispatch(Loading());
  axios
    .post(`${url}/ForgetPwd?EmailAddr=${Email}`)
    .then(res => {
      dispatch({ type: "FORGOT_PASSWORD" });
      dispatch(CloseLoading());
    })
    .catch(e => {
      dispatch({ type: "FORGOT_PASSWORD_ERROR" });
      dispatch(CloseLoading());
    });
};

export const setUser = data => dispatch => {
  dispatch({ type: LOGIN, payload: data });
};

const Loading = () => dispatch => {
  dispatch({ type: "LOADING" });
};
const CloseLoading = () => dispatch => {
  dispatch({ type: "CLOSE_LOADING" });
};
