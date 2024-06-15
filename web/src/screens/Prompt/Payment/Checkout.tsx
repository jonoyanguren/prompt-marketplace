import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../../stripeConfig";
import { PaymentForm } from "./PaymentForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPromptById } from "../../../api/prompt";
import { Prompt } from "../../../types";
import { Title } from "../../../components";
import { useTranslation } from "react-i18next";

export const Checkout = () => {
  const { t } = useTranslation();
  const { promptId } = useParams();
  const [prompt, setPrompt] = useState<Prompt>();

  useEffect(() => {
    const fetchPromptById = async () => {
      if (!promptId) return;
      try {
        const data = await getPromptById({ id: promptId });
        setPrompt(data);
      } catch (error) {
        console.error("Error al obtener el prompt:", error);
      }
    };

    fetchPromptById();
  }, [promptId]);

  if (!promptId) return <div>No prompt id</div>;
  if (!prompt) return <div>Loading...</div>;
  return (
    <div className="bg-white">
      <Title className="text-left">{t("checkoutForm.title")}</Title>
      <div className="flex items-start mt-16">
        <div className="w-1/2">
          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={prompt.price + prompt.servicePrice}
              promptId={promptId}
            />
          </Elements>
        </div>
        <div className="w-1/2">
          <div className="text-left flex justify-between items-end p-6 border-2 border-gray-200 mx-8 mb-8 bg-white shadow-lg">
            <div>
              <p className="font-bold mb-4">{prompt.title}</p>
              <p className="text-gray-500">
                {t("checkoutForm.creator")}: {prompt.createdBy.name}
              </p>
            </div>
            <p className="font-bold">
              {prompt.price + prompt.servicePrice} {t("general.currency")}
            </p>
          </div>

          <div className="p-6 border border-gray-200 m-8 bg-white shadow-xl text-left">
            <p className="font-bold mb-4">{t("checkoutForm.orderSummary")}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-500">{t("checkoutForm.total")}</p>
              {prompt.price + prompt.servicePrice} {t("general.currency")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
