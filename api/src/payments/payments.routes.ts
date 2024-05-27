import express from "express";
import { createPaymentIntent, stripeWebhook } from "./payments.controller";
import { jwtVerify } from "../middleware/jwtVerify";

const router = express.Router();

router.post("/onePayment", express.json(), jwtVerify, createPaymentIntent);

// TODO: Add to a public domain
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;
