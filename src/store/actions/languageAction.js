import { CHANGE_LANGUAGE } from "../types";

export const changeLanguage = (lang) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_LANGUAGE, payload: lang });
  };
};
