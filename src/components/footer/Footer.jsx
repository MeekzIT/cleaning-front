import "./Footer.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInfo } from "../../store/actions/info";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const year = new Date().getFullYear();
  const data = useSelector((state) => state?.info.info);

  useEffect(() => {
    dispatch(getInfo());
  }, []);

  return (
    <footer className="footer">
      <div className="footer-info">
        <div>
          <div>
            <h3>{t("contacts")}</h3>
          </div>
          <div>
            <LocalPhoneIcon />
            {t("phone")} : <br /> {data?.phone} <br /> {data?.secondPhone}
          </div>
          <div>
            <EmailIcon />
            {t("email")} : {data?.email}
          </div>
          <div>
            <LocationOnIcon />
            {data?.address},
          </div>
        </div>
        <div>
          <div>
            <h3>{t("follow-us")}</h3>
          </div>
          <div className="footer-social-icons-box">
            <a href={data?.facebook} target="_blank">
              <FacebookIcon fontSize="large" />
            </a>
            <a href={data?.instagram} target="_blank">
              <InstagramIcon fontSize="large" />
            </a>
            {/* <WhatsAppIcon fontSize="large" /> */}
            {/* <TelegramIcon fontSize="large" /> */}
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="footer-copyrigth">© MEEKZ-IT {year}</div>
    </footer>
  );
};

export default Footer;
