import { time } from "console";
import mongoose from "mongoose";

const platformSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Platform = mongoose.model("Platform", platformSchema);

export default Platform;
