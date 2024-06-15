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
  console.log("WEBHOOK EVENT TYPE", event.type);
  switch (event.type) {
    case "payment_intent.succeeded":
    case "payment_intent.charge.updated":
      const paymentIntent = event.data.object;

      //TODO
      const payment = new Payment({
        stripePaymentId: paymentIntent.id,
        userId: paymentIntent.metadata.userId || "", //TODO remove this on production
        promptId: paymentIntent.metadata.promptId || "", //TODO remove this on production
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
      console.warn(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
