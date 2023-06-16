import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { InfoReducer } from "./reducers/infoRducer";
import { languageReducer } from "./reducers/languageReducer";
import { ServiceReducer } from "./reducers/servicesReducer";
import { AuthReducer } from "./reducers/authRducer";

const rootReducer = combineReducers({
  info: InfoReducer,
  lang: languageReducer,
  services: ServiceReducer,
  auth:AuthReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
