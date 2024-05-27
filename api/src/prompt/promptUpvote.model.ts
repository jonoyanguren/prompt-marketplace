import mongoose from "mongoose";

const promptUpvoteSchema = new mongoose.Schema(
  {
    prompt: { type: mongoose.Schema.Types.ObjectId, ref: "Prompt" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const PromptUpvote = mongoose.model("PromptUpvote", promptUpvoteSchema);
export default PromptUpvote;
