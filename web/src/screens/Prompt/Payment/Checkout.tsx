import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../../stripeConfig";
import { PaymentForm } from "./PaymentForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPromptById } from "../../../api/prompt";
import { Prompt } from "../../../types";

export const Checkout = () => {
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
    <>
      <div>{prompt.title}</div>
      <div>{prompt.price + prompt.servicePrice} €</div>
      <Elements stripe={stripePromise}>
        <PaymentForm
          amount={prompt.price + prompt.servicePrice}
          promptId={promptId}
        />
      </Elements>
    </>
  );
};
