import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    verified: { type: Boolean, default: false },
    verificationCode: { type: Number },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
