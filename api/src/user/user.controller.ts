import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "./user.model";
import { sendEmail } from "../middleware/sendEmail";

export const getAll = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, name, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
    });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // await sendEmail(email, verificationCode);

    newUser.verificationCode = verificationCode;
    const savedUser = await newUser.save();
    await newUser.save();

    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
