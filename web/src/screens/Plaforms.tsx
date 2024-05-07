import { useTranslation } from "react-i18next";

import { Title } from "../components";

export const Platforms = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title>{t("platforms.title")}</Title>
    </div>
  );
};
