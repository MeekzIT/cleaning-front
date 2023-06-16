import { useLocation, useNavigate } from "react-router-dom";
import "./Settings.css";
import { SETTINGS_PAGE, SETTINGS_PAGE_ADDRESS } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../store/actions/authAction";
import { getCity } from "../../store/actions/info";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pages = [
    { id: 1, path: SETTINGS_PAGE, name: t("settings") },
    { id: 2, path: SETTINGS_PAGE_ADDRESS, name: t("addreses") },
  ];

  useEffect(() => {
    dispatch(getUser());
    dispatch(getCity());
  }, []);

  return (
    <div className="sidebar">
      {pages.map((i) => {
        return (
          <div
            onClick={() => navigate(i.path)}
            key={i.id}
            className={location.pathname == i.path && "active-tab"}
          >
            {i.name}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
