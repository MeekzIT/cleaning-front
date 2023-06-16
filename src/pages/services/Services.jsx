import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, getSubs } from "../../store/actions/servicesAction";
import CircularProgress from "@mui/material/CircularProgress";
import CardService from "../../components/card/Card";

import "./Services.css";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  const dispactch = useDispatch();
  const category = useSelector((state) => state.services.services);
  const subs = useSelector((state) => state.services.subs);
  const lang = useSelector((state) => state.lang.lang);
  const [categoryId, setCategoryId] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    dispactch(getServices());
    setLoading(false);
  }, []);

  useEffect(() => {
    dispactch(getSubs(categoryId));
  }, [categoryId]);

  return (
    <div className="services">
      <div className="services-title">
        <h1>{t("services")}</h1>
      </div>
      <div className="category-box">
        {category?.map(({ id, naemHy, nameRu, nameEn }) => {
          return (
            <div
              key={id}
              className={id == categoryId ? "activeCategory" : null}
              onClick={() => setCategoryId(id)}
            >
              <h3>{lang == "am" ? naemHy : lang == "ru" ? nameRu : nameEn}</h3>
            </div>
          );
        })}
      </div>
      {loading && (
        <div className="loading-box">
          <CircularProgress
            sx={{
              color: "#01dfa4",
            }}
          />
          <h3>{t("loading")}</h3>
        </div>
      )}
      <div className="subs-box">
        {!loading &&
          subs?.map((i) => {
            return (
              <CardService
                key={i.id}
                titleHy={i?.naemHy}
                titleRu={i?.nameRu}
                titleEn={i?.nameEn}
                descEn={i?.descEn}
                descHy={i?.descHy}
                descRu={i?.descRu}
                path={i?.id}
                show={true}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Services;
