import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "./user.model";

export const getAll = async (req: Request, res: Response) => {
  console.log("GET ALL USERS");
  return res.status(200).json({ message: "GET ALL USERS" });
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

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
