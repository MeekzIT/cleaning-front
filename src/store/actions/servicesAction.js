import axios from "axios";
import { api } from "../../helpers/keys";
import {
  GET_ADVANTAGES,
  GET_IMAGES,
  GET_SERVICES,
  GET_SUBS,
  GET_SUB_CATEGORY,
} from "../types";

export const getServices = () => {
  return (dispatch) => {
    axios
      .get(`${api}/category`)
      .then(function (response) {
        dispatch({ type: GET_SERVICES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSubs = (id) => {
  return (dispatch) => {
    axios
      .get(`${api}/category/single`, { params: { id } })
      .then(function (response) {
        dispatch({ type: GET_SUBS, payload: response.data.SubCategories });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getImages = (data) => {
  return (dispatch) => {
    axios
      .get(`${api}/images`, { params: data })
      .then(function (response) {
        dispatch({ type: GET_IMAGES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getAdvantages = (data) => {
  return (dispatch) => {
    axios
      .get(`${api}/advantages`, { params: { id: data } })
      .then(function (response) {
        dispatch({ type: GET_ADVANTAGES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSubCategory = (data) => {
  return (dispatch) => {
    axios
      .get(`${api}/subCategory/single`, { params: { id: data } })
      .then(function (response) {
        dispatch({ type: GET_SUB_CATEGORY, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
