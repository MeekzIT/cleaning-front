import axios from "axios";
import { api } from "../../helpers/keys";
import { GET_ABOUT_US, GET_CITYES, GET_HEADER, GET_INFO } from "../types";

export const getInfo = () => {
  return (dispatch) => {
    axios
      .get(`${api}/info`)
      .then(function (response) {
        dispatch({ type: GET_INFO, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getHeader = () => {
  return (dispatch) => {
    axios
      .get(`${api}/header`)
      .then(function (response) {
        dispatch({ type: GET_HEADER, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getAbout = () => {
  return (dispatch) => {
    axios
      .get(`${api}/about`)
      .then(function (response) {
        dispatch({ type: GET_ABOUT_US, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getCity = () => {
  return (dispatch) => {
    axios
      .get(`${api}/city`)
      .then(function (response) {
        dispatch({ type: GET_CITYES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const setContactForm = (data) => {
  return (dispatch) => {
    axios.post(`${api}/contactUs`, data).then((res) => {});
  };
};
