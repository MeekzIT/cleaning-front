import { useState } from "react";
import i18next from "i18next";
import cookies from "js-cookie";
import arm from "../../images/arm.png";
import rus from "../../images/rus.webp";
import uk from "../../images/uk.png";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../store/actions/languageAction";
export function LanguageSwitcher() {
  const languages = [
    {
      id: 1,
      langEn: "am",
      image: arm,
    },
    {
      id: 2,
      langEn: "en",
      image: uk,
    },
    {
      id: 3,
      langEn: "ru",
      image: rus,
    },
  ];
  const dispatch = useDispatch();
  const currentLang = cookies.get("i18next");
  const [activeLang, setActiveLang] = useState(currentLang);

  const selectLange = (e) => {
    i18next.changeLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
    setActiveLang(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <select
      onChange={selectLange}
      defaultValue={"am"}
      className="select languageBox"
    >
      {languages?.map((item) => {
        return (
          <option key={item.id} value={item.langEn}>
            {item.langEn.toUpperCase()}
          </option>
        );
      })}
    </select>
  );
}
