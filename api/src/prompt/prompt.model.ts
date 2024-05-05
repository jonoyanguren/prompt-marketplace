import mongoose from "mongoose";

interface PrompTypes {
  title: string;
  description: string;
  prompt: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  categories: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  platforms: mongoose.Schema.Types.ObjectId[];
  upvotes: number;
  downvotes: number;
  tags: string[];
}

const promptSchema = new mongoose.Schema<PrompTypes>(
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
    downvotes: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Prompt = mongoose.model<PrompTypes>("Prompt", promptSchema);

export default Prompt;
