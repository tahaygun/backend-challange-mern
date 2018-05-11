import { FETCH_POSTS } from "../actions/types";
import axios from "axios";
export const fetchPosts = () => dispatch => {
  console.log("fetching..");
  axios
    .get(process.env.REACT_APP_SECRET_CODE + "/api/getarticles")
    .then(articles => {
      dispatch({
        type: FETCH_POSTS,
        payload: articles.data
      });
    });
};
