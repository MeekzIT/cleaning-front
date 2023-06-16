import { GET_ADDRESS, GET_AVATAR, GET_USER, SET_AUTH } from "../types";

const initialState = {
  isAuth: false,
  user: null,
  avatar: null,
  address: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuth: action.payload };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        avatar: action.payload.image,
        address: action.payload.Addres,
      };
    case GET_AVATAR:
      return { ...state, avatar: action.payload };
    case GET_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
};
