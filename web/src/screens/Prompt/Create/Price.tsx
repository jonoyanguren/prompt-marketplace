import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdRemoveRedEye } from "react-icons/md";
import { Button, Input, Modal } from "../../../components";
import { PriceGuide } from "./PriceGuide";
import { PriceDetails } from "./PriceDetails";

export const Price = ({ form, formFields }: { form: any; formFields: any }) => {
  const { t } = useTranslation();
  const [guidePriceOpen, setGuidePriceOpen] = useState(false);
  const [priceDetailsOpen, setPriceDetailsOpen] = useState(false);

  const calculateServicePrice = () => {
    return Math.max(Math.floor(Number(form.price) * 0.1), 1);
  };

  return (
    <div className="w-3/4 p-8 text-left ml-8">
      <Modal open={guidePriceOpen} onClose={() => setGuidePriceOpen(false)}>
        <PriceGuide onClose={() => setGuidePriceOpen(false)} />
      </Modal>
      <Modal open={priceDetailsOpen} onClose={() => setPriceDetailsOpen(false)}>
        <PriceDetails
          price={form.price}
          servicePrice={calculateServicePrice()}
          onClose={() => setPriceDetailsOpen(false)}
        />
      </Modal>
      <h1 className="text-3xl font-semibold mb-8">
        {t("createPrompt.price.title")}
      </h1>
      {/* Price */}
      <div className="mb-8">
        <p className="mb-6 text-xl font-medium text-gray-900">
          {t("createPrompt.price.price")}
        </p>
        <p className="mb-6 text-gray-500">
          {t("createPrompt.price.priceText")}
        </p>
        <Input
          type="number"
          placeholder={t("createPrompt.price.pricePlaceholder")}
          {...formFields("price")}
        />
        {form.price && form.price !== 0 && (
          <div className="text-gray-500 flex justify-between text-sm px-2">
            <p>
              {t("createPrompt.price.totalPrice")}:{" "}
              {parseFloat(form.price) + calculateServicePrice()}{" "}
              {t("general.currency")}
            </p>
            <p
              className="cursor-pointer text-indigo-500 underline"
              onClick={() => setPriceDetailsOpen(true)}
            >
              {t("createPrompt.price.viewPriceDetails")}
            </p>
          </div>
        )}
      </div>

      {/* Price guide */}
      <div className="mb-8 bg-indigo-50 rounded-xl p-8">
        <h1 className="text-xl text-indigo-800 font-semibold mb-4">
          {t("createPrompt.price.priceGuideTitle")}
        </h1>
        <p className="text-indigo-800 mb-4">
          {t("createPrompt.price.priceGuideText")}
        </p>

        <Button
          className="flex items-center"
          onClick={() => setGuidePriceOpen(true)}
        >
          <MdRemoveRedEye className="w-5 h-5 mr-2" />
          {t("createPrompt.price.priceGuideButton")}
        </Button>
      </div>
    </div>
  );
};
