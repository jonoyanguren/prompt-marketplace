import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    prompt: { type: String, required: true },
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
const Prompt = mongoose.model("Prompt", promptSchema);

export default Prompt;
