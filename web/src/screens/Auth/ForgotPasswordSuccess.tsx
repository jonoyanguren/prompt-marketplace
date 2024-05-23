import { useTranslation } from "react-i18next";
import { Title } from "../../components";

export const ForgotPasswordSuccess = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title>{t("forgotPasswordSuccess.title")}</Title>
      <p>{t("forgotPasswordSuccess.text")}</p>
    </div>
  );
};
