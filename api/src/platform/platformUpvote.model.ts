import mongoose from "mongoose";

const platformUpvoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },
    upvotedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

platformUpvoteSchema.index({ userId: 1, platformId: 1 }, { unique: true });

const PlatformUpvote = mongoose.model("PlatformUpvote", platformUpvoteSchema);

export default PlatformUpvote;
