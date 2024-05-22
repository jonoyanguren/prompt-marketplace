import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);
    res
      .status(200)
      .json({ token, email: user.email, id: user._id, role: user.role });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verificationCode != code) {
      return res.status(401).json({ message: "Invalid verification code" });
    }

    user.verified = true;
    user.verificationCode = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
