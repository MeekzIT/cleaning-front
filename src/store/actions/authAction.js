import axios from "axios";
import { api } from "../../helpers/keys";
import { HOME_PAGE, LOGIN_PAGE } from "../../routing/pats";
import { GET_ADDRESS, GET_AVATAR, GET_USER, SET_AUTH } from "../types";

export const register = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/users/create`, data)
      .then(function (response) {
        if (response.data.succes) {
          window.location.href = LOGIN_PAGE;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const login = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/users/login`, data)
      .then(function (response) {
        if (response.data.succes) {
          localStorage.setItem("token", response.data.data.token);
          window.location.href = HOME_PAGE;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const changeAuth = (auth) => {
  return (dispatch) => {
    dispatch({ type: SET_AUTH, payload: auth });
  };
};

export const logout = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/users/logout`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({ type: SET_AUTH, payload: false });
          localStorage.removeItem("token");
          window.location.href = HOME_PAGE;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    axios
      .get(`${api}/users/single`, {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const editAccount = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/users/edit`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({ type: GET_USER, payload: response.data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const editPassword = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/users/changePassword`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({ type: GET_USER, payload: response.data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const editAvatar = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/users/changeAvatar`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          // dispatch({ type: GET_AVATAR, payload: response.data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const changeAvavtar = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_AVATAR, payload: data });
  };
};

export const addAddress = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/addres/create`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        getUser();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const delAddress = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/addres/del`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        getUser();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const editAddress = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/addres/edit`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
};
