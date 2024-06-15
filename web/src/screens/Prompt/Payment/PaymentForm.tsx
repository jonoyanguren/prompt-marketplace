import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../../api/payments";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface PaymentFormProps {
  amount: number;
  promptId: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  promptId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    const cardNumberElement = elements?.getElement(CardNumberElement);
    const cardExpiryElement = elements?.getElement(CardExpiryElement);
    const cardCvcElement = elements?.getElement(CardCvcElement);

    if (
      !stripe ||
      !elements ||
      !cardNumberElement ||
      !cardExpiryElement ||
      !cardCvcElement
    ) {
      setError("Stripe has not loaded correctly.");
      setProcessing(false);
      return;
    }

    try {
      const response = await createPaymentIntent({
        amount: amount * 100,
        currency: "eur",
        promptId,
      });
      const { clientSecret } = response;

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              // Add any additional billing details here
            },
          },
        });

      if (stripeError) {
        setError(`${t("checkoutForm.error")} ${stripeError.message}`);
        setSuccess(null);
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setError(null);
        // setSuccess(t("checkoutForm.success"));
        navigate("/payment-success");
        setProcessing(false);
      }
    } catch (error: any) {
      setError(`Payment failed: ${error.message}`);
      setSuccess(null);
      setProcessing(false);
    }
  };

  // Custom styles for Card Elements
  const cardElementOptions = {
    showIcon: true,
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg text-left"
    >
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          {t("checkoutForm.cardNumber")}
        </label>
        <div className="relative">
          <CardNumberElement
            options={cardElementOptions}
            className="p-2 border border-gray-300 rounded-md"
          />
          <div className="absolute left-2 top-2 text-gray-400">
            {/* You can add a placeholder for the card icon */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            {t("checkoutForm.expiryDate")}
          </label>
          <CardExpiryElement className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            {t("checkoutForm.cvc")}
          </label>
          <CardCvcElement className="p-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {processing ? "Processing…" : t("checkoutForm.pay", { amount })}
      </button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {success && <div className="mt-4 text-green-500">{success}</div>}
    </form>
  );
};
