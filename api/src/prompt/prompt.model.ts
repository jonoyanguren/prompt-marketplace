import mongoose from "mongoose";

interface PrompTypes {
  title: string;
  description: string;
  prompt: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  platforms: string[];
  upvotes: number;
  downvotes: number;
  tags: string[];
}

const promptSchema = new mongoose.Schema<PrompTypes>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  prompt: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  platforms: [{ type: String, required: true }],
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  tags: [{ type: String }],
});

const Prompt = mongoose.model<PrompTypes>("Prompt", promptSchema);

export default Prompt;
