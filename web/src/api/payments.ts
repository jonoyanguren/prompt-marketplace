import axios from "axios";
import { API_URL } from "../conf";
import { handleAxiosError } from ".";

export const createPaymentIntent = async ({
  amount,
  currency,
  promptId,
}: {
  amount: number;
  currency: "usd" | "eur" | "gbp";
  promptId: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/payment/onePayment`, {
      amount,
      currency,
      promptId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
