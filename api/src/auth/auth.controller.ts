import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);
    res.status(200).json({ token, email: user.email, id: user._id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
