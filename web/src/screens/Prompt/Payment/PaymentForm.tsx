import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { API_URL } from "../../../conf";

export const PaymentForm = ({
  amount,
  promptId,
}: {
  amount: number;
  promptId: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    try {
      const {
        data: { clientSecret },
      } = await axios.post(`${API_URL}/payment/onePayment`, {
        amount: amount * 100,
        currency: "eur",
        promptId: promptId,
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message);
      } else if (paymentIntent?.status === "succeeded") {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      {success ? (
        <h2>Payment successful!</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
          {error && <div>{error}</div>}
        </form>
      )}
    </div>
  );
};
