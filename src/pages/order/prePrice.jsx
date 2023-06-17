import { useTranslation } from "react-i18next";

const PrePrice = ({ price, area, withArea }) => {
  const { t } = useTranslation();
  return (
    <>
      <h3>
        {t("pre")} 20% `
        {withArea ? (
          <>{Number(price) * Number(area) * 0.2} ֏</>
        ) : (
          <>{Number(price) * 0.2} ֏</>
        )}
      </h3>
    </>
  );
};

export default PrePrice;