import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "./user.model";
import { ExtendedRequest } from "../types/extendedRequest";
import { sendEmail } from "../brevo";

export const getAll = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: ExtendedRequest, res: Response) => {
  try {
    const { username, password, name, email, creator } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
      creator: creator || false,
    });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    sendEmail({
      subject: "Verifica tu cuenta de usuario",
      to: email,
      htmlContent: `Tu código de verificación es: <b>${verificationCode}</b>`,
    });

    newUser.verificationCode = verificationCode;
    const savedUser = await newUser.save();
    await newUser.save();

    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: ExtendedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const setCreator = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { $set: { creator: true } });
    res.status(200).json({ message: "User set as creator" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
