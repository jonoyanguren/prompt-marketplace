import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import { sendEmail } from "../middleware/sendEmail";

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
      .json({
        token,
        email: user.email,
        id: user._id,
        role: user.role,
        avatar: user.avatar,
      });
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

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if the user does not exist
      return res.status(200).json({ message: "Email sent" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!
    );

    //TODO send email with LINK
    // await sendEmail(email, token);

    user.resetPasswordToken = token;
    user.save();

    res.status(200).json({ message: "Email sent" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findOne({ _id: decoded.id, email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
