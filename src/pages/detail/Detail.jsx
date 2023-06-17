import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAdvantages,
  getSubCategory,
  getSubs,
} from "../../store/actions/servicesAction";
import { useShowTranslate } from "../../helpers/useShowTranslate";

import "./Detail.css";
import Button from "../../components/button/Button";
import { ORDERING_PAGE } from "../../routing/pats";
import CardService from "../../components/card/Card";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const advantages = useSelector((state) => state.services.advantages);
  const single = useSelector((state) => state.services.single);
  const lang = useSelector((state) => state.lang.lang);
  const subs = useSelector((state) => state.services.subs);
  useEffect(() => {
    dispatch(getAdvantages(id));
    dispatch(getSubCategory(id));
    {
      !subs?.length && dispatch(getSubs(1));
    }
  }, [id]);
  const title = useShowTranslate(
    single?.naemHy,
    single?.nameRu,
    single?.nameEn
  );
  const desc = useShowTranslate(single?.descHy, single?.descRu, single?.descEn);

  return (
    <div>
      <div className="services-title">
        <h1>{title}</h1>
      </div>
      <div className="detail-info">
        <div>
          <img src={single?.mainImage} alt="mainImage" />
        </div>
        <div>{desc}</div>
      </div>

      <div className="services-title">
        <h4>ծառայությունը ներառում է</h4>
      </div>
      <div className="detail-advantages">
        {advantages?.map((i) => {
          return (
            <div key={i.id}>
              <span></span>{" "}
              {lang == "am" ? i?.textHy : lang == "ru" ? i?.textRu : i?.textEn}
            </div>
          );
        })}
      </div>
      <div
        className="services-title"
        style={{
          margin: "50px",
        }}
      >
        <Button variant="secondary" onClick={() => navigate(ORDERING_PAGE)}>
          ԱՄՐԱԳՐԵԼ
        </Button>
      </div>
      <div className="services-title">
        <h3>օգտվեք նաևվ</h3>
      </div>
      <div className="subs-box">
        {subs?.slice(0, 3)?.map((i) => {
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
              mainImage={i?.mainImage}
              show={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
