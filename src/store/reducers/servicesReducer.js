import {
  GET_ADVANTAGES,
  GET_IMAGES,
  GET_SERVICES,
  GET_SUBS,
  GET_SUB_CATEGORY,
} from "../types";

const initialState = {
  services: null,
  subs: null,
  images: null,
  count: null,
  advantages: null,
  single: null,
};

export const ServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return { ...state, services: action.payload };
    case GET_SUBS:
      return { ...state, subs: action.payload };
    case GET_IMAGES:
      return {
        ...state,
        images: action.payload.paginateData,
        count: action.payload.count,
      };
    case GET_ADVANTAGES:
      return {
        ...state,
        advantages: action.payload,
      };
    case GET_SUB_CATEGORY:
      return {
        ...state,
        single: action.payload,
      };
    default:
      return state;
  }
};
