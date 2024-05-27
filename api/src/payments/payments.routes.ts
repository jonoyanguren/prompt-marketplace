import express from "express";
import { createPaymentIntent, stripeWebhook } from "./payments.controller";

const router = express.Router();

router.post("/onePayment", createPaymentIntent);

// TODO: Add to a public domain
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook
// );

export default router;
