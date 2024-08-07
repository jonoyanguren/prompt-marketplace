import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
  console.log("VERIFY");
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (typeof token !== "string")
      return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const jwtPayloadOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    next();
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  // @ts-ignore
  req.user = decoded;
  next();
};
