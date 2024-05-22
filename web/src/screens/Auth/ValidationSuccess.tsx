import { useTranslation } from "react-i18next";
import { Title } from "../../components";

export const ValidationSuccess = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title>{t("validationSuccess.title")}</Title>
    </div>
  );
};
