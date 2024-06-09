import { useTranslation } from "react-i18next";
import { Button } from "../../../components";

export const PriceGuide = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-2xl font-medium">{t("priceGuide.title")}</h1>
      <p className="text-gray-500">{t("priceGuide.text")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("priceGuide.simple") }}></p>
      <p dangerouslySetInnerHTML={{ __html: t("priceGuide.moderate") }}></p>
      <p dangerouslySetInnerHTML={{ __html: t("priceGuide.advanced") }}></p>
      <Button onClick={onClose}>{t("priceGuide.button")}</Button>
    </div>
  );
};
