import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HOME_PAGE,
  IMAGES_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  SERVICES_PAGE,
  SETTINGS_PAGE,
} from "../../routing/pats";
import { useIsMobile } from "../../helpers/useScreenType";
import Button from "../button/Button";
import { LanguageSwitcher } from "../languageSwitcher/LanguageSwitcher";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../store/actions/authAction";
import logo from "./logo.png";

export default function Navbar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const handleClickA = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    setActive(false);
  }, [location?.pathname]);

  const menuPages = [
    { id: 1, path: SERVICES_PAGE, name: t("services") },
    { id: 2, path: IMAGES_PAGE, name: t("images") },
  ];
  return (
    <nav className="navbar-all">
      <section className="navbar">
        <h1 className="navbar-logo" onClick={() => navigate(HOME_PAGE)}>
          <img src={logo} alt="logo" />
        </h1>
        <div className="menu-icon">
          {active ? (
            <CloseIcon
              sx={{ color: "white" }}
              onClick={handleClick}
              fontSize="large"
            />
          ) : (
            <MenuIcon
              sx={{ color: "white" }}
              onClick={handleClick}
              fontSize="large"
            />
          )}
        </div>
        <ul className={active ? "nav-menu active" : "nav-menu"}>
          {menuPages.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={
                    location.pathname.slice(0, 7) === item.path.slice(0, 7)
                      ? "nav-links-active"
                      : "nav-links"
                  }
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          {!isAuth && isMobile && (
            <li>
              <Button onClick={() => navigate(LOGIN_PAGE)}>{t("login")}</Button>
            </li>
          )}
          {!isAuth && isMobile && (
            <li>
              <Button onClick={() => navigate(REGISTER_PAGE)}>
                {t("register")}
              </Button>
            </li>
          )}

          {isAuth && isMobile && (
            <>
              <li
                onClick={() => navigate(SETTINGS_PAGE)}
                className={
                  location.pathname.slice(0, 7) === SETTINGS_PAGE.slice(0, 7)
                    ? "nav-links-active"
                    : "nav-links"
                }
              >
                Settings
              </li>
              <li
                onClick={() => dispatch(logout())}
                style={{
                  alignItems: "center",
                }}
              >
                <LogoutIcon
                  sx={{
                    display: "flex",
                    color: "#4ad9e4",
                  }}
                />
                Logout
              </li>
            </>
          )}
        </ul>
        {!isMobile && (
          <div className="loginBox">
            <LanguageSwitcher />
            {isAuth ? (
              <AccountCircleIcon onClick={handleClickA} fontSize="large" />
            ) : (
              <>
                <div>
                  <Button onClick={() => navigate(LOGIN_PAGE)}>
                    {t("login")}
                  </Button>
                </div>
                <div>
                  <Button onClick={() => navigate(REGISTER_PAGE)}>
                    {t("register")}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </section>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => navigate(SETTINGS_PAGE)}
          sx={{
            display: "flex",
            gap: "10px",
            color: "#1A1940",
          }}
        >
          <SettingsIcon
            sx={{
              color: "#4ad9e4",
            }}
          />
          {t("settings")}
        </MenuItem>
        <MenuItem
          onClick={() => dispatch(logout())}
          sx={{
            display: "flex",
            gap: "10px",
            color: "#1A1940",
          }}
        >
          <LogoutIcon
            sx={{
              color: "#4ad9e4",
            }}
          />
          {t("logout")}
        </MenuItem>
      </Menu>
    </nav>
  );
}
