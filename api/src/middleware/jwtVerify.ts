import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    if (typeof token !== "string")
      return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
