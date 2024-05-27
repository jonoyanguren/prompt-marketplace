import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../api/payments";
import { useTranslation } from "react-i18next";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const { t } = useTranslation();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      setError("Stripe has not loaded correctly.");
      setProcessing(false);
      return;
    }

    try {
      const response = await createPaymentIntent({
        amount: 1000,
        currency: "usd",
      });
      const { clientSecret } = response;

      // Confirm the payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (stripeError) {
        setError(`${t("checkoutForm.error")} ${stripeError.message}`);
        setSuccess(null);
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setError(null);
        setSuccess(t("checkoutForm.success"));
        setProcessing(false);
      }
    } catch (error: any) {
      setError(`Payment failed: ${error.message}`);
      setSuccess(null);
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <CardElement className="p-2 border border-gray-300 rounded-md mb-4" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {processing ? "Processing…" : "Pay"}
      </button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {success && <div className="mt-4 text-green-500">{success}</div>}
    </form>
  );
};

export default CheckoutForm;
