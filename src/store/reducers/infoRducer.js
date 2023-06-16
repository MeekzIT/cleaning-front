import { GET_ABOUT_US, GET_CITYES, GET_HEADER, GET_INFO } from "../types";

const initialState = {
  info: null,
  header: null,
  about: null,
  city: null,
};

export const InfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO:
      return { ...state, info: action.payload };
    case GET_HEADER:
      return {
        ...state,
        header: action.payload,
      };
    case GET_ABOUT_US:
      return {
        ...state,
        about: action.payload,
      };
    case GET_CITYES:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};
