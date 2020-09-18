import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_TEAM,
  TEAM_LOADING
  } from "./types";

//Get current team
export const getCurrentteam = () => dispatch => {
  dispatch(setteamLoading());
  axios.get('api/users/test')
  .then(res => {
    console.log("I am here in getCurrentteam");
    console.log(res.data);
     dispatch({
      type:GET_TEAM,
      payload:res.data
    })
    }
    )
    .catch(err => 
      dispatch ({
        type:GET_TEAM,
        payload:{}
      }))
}
// team loading
export const setteamLoading = () => {
  return {
    type: TEAM_LOADING
  };
};