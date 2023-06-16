import { useEffect } from "react";
import Slider from "react-slick";
import "./HomeServices.css";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../store/actions/servicesAction";
import Button from "../button/Button";
import { useNavigate } from "react-router";
import { ORDERING_PAGE } from "../../routing/pats";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useScreenType } from "../../helpers/useScreenType";
import { useTranslation } from "react-i18next";

const HomeServices = () => {
  const screen = useScreenType();

  var settings = {
    dots:
      screen === "lg" || screen === "xl"
        ? true
        : screen === "md"
        ? false
        : screen === "sm" && false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.services.services);
  const lang = useSelector((state) => state.lang.lang);
  useEffect(() => {
    dispatch(getServices());
  }, []);

  console.log(data);

  return (
    <div className="home-services">
      <h1>{t("services")}</h1>
      <Slider {...settings}>
        {data?.map((i) => {
          return (
            <div className="slider-item" key={i.id}>
              <div className="slider-category">
                <h1>
                  {lang == "am" ? i.naemHy : lang == "ru" ? i.nameRu : i.nameEn}
                </h1>
                {(screen === "lg" || screen === "xl") && (
                  <Button onClick={() => navigate(ORDERING_PAGE)}>
                    {t("order")}
                  </Button>
                )}
              </div>
              <div className="slider-subcategory">
                {i?.SubCategories?.slice(0, 3)?.map((s) => {
                  return (
                    <div className="slider-subcategory-item" key={s.id}>
                      <img
                        src={
                          "https://res.cloudinary.com/practicaldev/image/fetch/s--yTbPkRhw--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/2pb3iwjeka9u3westcxk.png"
                        }
                        alt="slider-subcategory-item"
                      />
                      <h2>
                        {lang == "am"
                          ? s.naemHy
                          : lang == "ru"
                          ? s.nameRu
                          : s.nameEn}
                      </h2>
                      <ControlPointIcon
                        sx={{
                          color: "#1a1940",
                          fontSize: "40px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(ORDERING_PAGE)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Slider>
      {/* {(screen !== "lg" || screen !== "xl") && (
        <div
          style={{
            marginTop: "20px",
            padding: "0 10px",
          }}
        >
          <Button onClick={() => navigate(ORDERING_PAGE)}>Amragrel</Button>
        </div>
      )} */}
    </div>
  );
};

export default HomeServices;
