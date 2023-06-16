import { useSelector } from "react-redux";

export const useShowTranslate = (hy, ru, en) => {
  const lang = useSelector((state) => state.lang.lang);

  return <>{lang == "am" ? hy : lang == "ru" ? ru : en}</>;
};
