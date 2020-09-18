import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_PROFILE,
  PROFILE_LOADING
  } from "./types";
//Get current profile
export const getCurrentprofile = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`api/dashboard/user/${id}`)
  .then(res => {
      console.log("printing from getCurrentprofile",res.data);
     dispatch({
      type:GET_PROFILE,
      payload:res.data.trans,
      balance:res.data.bal
    })
    }
    )
    .catch(err => 
      dispatch ({
        type:GET_PROFILE,
        payload:{}
      }))
}
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};