import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    stripePaymentId: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    promptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prompt",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
