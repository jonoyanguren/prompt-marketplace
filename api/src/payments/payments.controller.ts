import { Request, Response } from "express";
import stripe from "../stripe";
import Payment from "./payment.model";
import { ExtendedRequest } from "../types/extendedRequest";

export const createPaymentIntent = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    const { amount, currency, promptId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { userId: req.user?.id, promptId: promptId },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Use the raw body to construct the event
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  const successCases =
    "payment_intent.succeeded" ||
    "payment_intent.charge.updated" ||
    "payment_intent.created";

  switch (event.type) {
    case successCases:
      const paymentIntent = event.data.object;

      // Save payment details to the database
      const payment = new Payment({
        stripePaymentId: paymentIntent.id,
        userId: paymentIntent.metadata.userId || "6654c347fa5daf6824175a2a",
        promptId: paymentIntent.metadata.promptId || "663d583a972ec1008d846f12",
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      });

      try {
        await payment.save();
        console.info("Payment saved:", payment);
      } catch (error) {
        console.error("Error saving payment:", error);
      }

      break;

    default:
      console.error(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
