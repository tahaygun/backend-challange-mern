import { LOGIN_USER, IS_LOGGED_IN } from "../actions/types";
const initialState = {
  user: [],
  isloggedin: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        isloggedin: action.payload.isloggedin
      };
    case IS_LOGGED_IN:
      return {
        ...state,
        isloggedin: action.payload.isloggedin
      };
    default:
      return state;
  }
}
