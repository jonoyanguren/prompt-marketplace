import { useTranslation } from "react-i18next";
import { Button } from "../../../components";

export const PriceDetails = ({
  price,
  servicePrice,
  onClose,
}: {
  price: number;
  servicePrice: number;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  const total = () => Number(price) + Number(servicePrice);

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-2xl font-medium">{t("priceDetails.title")}</h1>
      <p className="text-gray-900 font-medium">
        {t("priceDetails.costToUser")}
      </p>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-gray-500">
          <p>{t("priceDetails.promptPrice")}</p>
          {price} {t("general.currency")}
        </div>

        <div className="flex justify-between text-gray-500">
          <p>{t("priceDetails.servicePrice")}</p>
          {servicePrice} {t("general.currency")}
        </div>

        <div className="flex justify-between text-gray-500">
          <p>{t("priceDetails.total")}</p>
          {total()} {t("general.currency")}
        </div>
      </div>

      <p className="text-gray-900 font-medium">
        {t("priceDetails.yourPayment")}
      </p>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-gray-500">
          <p>{t("priceDetails.benefit")}</p>
          {price} {t("general.currency")}
        </div>
      </div>
      <Button onClick={onClose}>{t("priceGuide.button")}</Button>
    </div>
  );
};
