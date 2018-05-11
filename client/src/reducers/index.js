import { combineReducers } from "redux";
import postReducer from "./postsReducer";
import usersReducer from "./usersReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
  posts: postReducer,
  user: usersReducer,
  errors: errorReducer
});
