import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    password: { type: String, required: true },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    web: { type: String, default: "" },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    creator: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    verificationCode: { type: Number },
    resetPasswordToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
