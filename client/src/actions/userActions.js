import {
  LOGIN_USER,
  GET_ERRORS,
  IS_LOGGED_IN
  // CURRENT_USER
} from "../actions/types";
import axios from "axios";
export const loginUser = formData => dispatch => {
  console.log("logging..");
  axios
    .post(process.env.REACT_APP_SECRET_CODE + "/api/login", formData)
    .then(respond => {
      dispatch({
        type: LOGIN_USER,
        payload: {
          user: respond.data,
          isloggedin: true
        }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const isloggedin = formData => dispatch => {
  axios
    .get(process.env.REACT_APP_SECRET_CODE + "/api/isloggedin")
    .then(answer => {
      dispatch({
        type: IS_LOGGED_IN,
        payload: {
          isloggedin: answer.data
        }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
