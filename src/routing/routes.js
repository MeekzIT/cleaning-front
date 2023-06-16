import Detail from "../pages/detail/Detail";
import Home from "../pages/home/Home";
import Images from "../pages/images/Images";
import Login from "../pages/login/Login";
import Order from "../pages/order/Order";
import Register from "../pages/register/Register";
import Services from "../pages/services/Services";
import SettingAddress from "../pages/settings/SettingAddress";
import SettingUser from "../pages/settings/SettingUser";
import Settings from "../pages/settings/Settings";
import {
  HOME_PAGE,
  IMAGES_PAGE,
  LOGIN_PAGE,
  ORDERING_PAGE,
  REGISTER_PAGE,
  SERVICES_PAGE,
  SERVICE_DETAIL,
  SETTINGS_PAGE,
  SETTINGS_PAGE_ADDRESS,
} from "./pats";

export const pages = [
  { id: 1, path: HOME_PAGE, component: <Home /> },
  { id: 2, path: SERVICES_PAGE, component: <Services /> },
  { id: 3, path: IMAGES_PAGE, component: <Images /> },
  { id: 4, path: ORDERING_PAGE, component: <Order /> },
  { id: 5, path: SERVICE_DETAIL, component: <Detail /> },
  { id: 6, path: REGISTER_PAGE, component: <Register /> },
  { id: 7, path: LOGIN_PAGE, component: <Login /> },
];

export const isAuthPages = [
  { id: 1, path: SETTINGS_PAGE, component: <SettingUser /> },
  { id: 2, path: SETTINGS_PAGE_ADDRESS, component: <SettingAddress /> },
];
