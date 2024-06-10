import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    whoIsFor: { type: String, required: true },
    howToUse: { type: String, required: true },
    prompt: { type: String, required: true },
    free: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    servicePrice: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    platforms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Platform",
        required: true,
      },
    ],
    upvotes: { type: Number, default: 0 },
    tags: [{ type: String, index: true }],
  },
  { timestamps: true }
);

promptSchema.index({ title: "text", description: "text" });

promptSchema.pre("save", function (next) {
  this.servicePrice = Math.floor(this.price * 0.1);
  this.free = this.price === 0;
  next();
});

const Prompt = mongoose.model("Prompt", promptSchema);

export default Prompt;
