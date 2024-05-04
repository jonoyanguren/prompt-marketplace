import { time } from "console";
import mongoose from "mongoose";

interface PlatformTypes {
  name: string;
  url: string;
}

const platformSchema = new mongoose.Schema<PlatformTypes>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const Platform = mongoose.model<PlatformTypes>("Platform", platformSchema);

export default Platform;
