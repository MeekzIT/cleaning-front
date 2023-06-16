import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeader } from "../../store/actions/info";
import illDesc from "../../images/IllDesc.svg";
import illMob from "../../images/IllMob.svg";
import illTablet from "../../images/IllTablet.svg";
import Button from "../button/Button";
import { useShowTranslate } from "../../helpers/useShowTranslate";

import "./Header.css";
import { useNavigate } from "react-router-dom";
import { ORDERING_PAGE, SERVICES_PAGE } from "../../routing/pats";
import { useScreenType } from "../../helpers/useScreenType";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screen = useScreenType();
  const data = useSelector((state) => state.info.header);
  const title1 = useShowTranslate(
    data?.titleHy.split(" ")[0],
    data?.titleRu.split(" ")[0],
    data?.titleEn.split(" ")[0]
  );
  const title2 = useShowTranslate(
    data?.titleHy.split(" ")[1],
    data?.titleRu.split(" ")[1],
    data?.titleEn.split(" ")[1]
  );
  const title3 = useShowTranslate(
    data?.titleRu.split(" ")[2],
    data?.titleHy.split(" ")[2],
    data?.titleEn.split(" ")[2]
  );
  const desc = useShowTranslate(data?.descHy, data?.descRu, data?.descEn);
  const imageText = useShowTranslate(
    data?.imageTextHy,
    data?.imageTextRu,
    data?.imageTextEn
  );

  useEffect(() => {
    dispatch(getHeader());
  }, []);
  return (
    <div className="header">
      <span className="ill">
        <img
          src={
            screen === "lg" || screen === "xl"
              ? illDesc
              : screen === "md"
              ? illTablet
              : screen === "sm" && illMob
          }
          alt="ill"
        />
      </span>
      <div className="header-info">
        <h2>{title1}</h2>
        <h1>{title2}</h1>
        <h1>{title3}</h1>
        <div>
          <p>{desc}</p>
        </div>
        <div>
          <div>
            <Button variant="secondary" onClick={() => navigate(ORDERING_PAGE)}>
              {t("order")}
            </Button>
          </div>
          <div>
            <Button onClick={() => navigate(SERVICES_PAGE)}>
              {t("services")}
            </Button>
          </div>
        </div>
      </div>
      <div className="header-image-box">
        <img src={data?.image} />
        <span className="imageText">{imageText}</span>
      </div>
    </div>
  );
};

export default Header;
