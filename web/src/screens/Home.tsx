import { useTranslation } from "react-i18next";
import { Title } from "../components";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title>{t("home.title")}</Title>
    </div>
  );
};
