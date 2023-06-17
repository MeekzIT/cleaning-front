import { useTranslation } from "react-i18next";

const Price = ({ price, area, withArea }) => {
  const { t } = useTranslation();
  return (
    <>
      <h3>
        {t("all")} `
        {withArea ? (
          <>{Number(price) * Number(area)} ֏</>
        ) : (
          <>{Number(price)} ֏</>
        )}
      </h3>
    </>
  );
};

export default Price;
