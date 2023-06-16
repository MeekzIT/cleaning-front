import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useShowTranslate } from "../../helpers/useShowTranslate";
import { getAbout } from "../../store/actions/info";

import "./AboutUs.css";

const AboutUs = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector((state) => state.info.about);
  const desc = useShowTranslate(data?.textHy, data?.textRu, data?.textEn);

  useEffect(() => {
    dispatch(getAbout());
  }, []);

  return (
    <div className="about-us">
      <h1>{t("about-us")}</h1>
      <div className="about-us-box">
        <img src={data?.image} />
        <div>{desc}</div>
      </div>
    </div>
  );
};

export default AboutUs;
