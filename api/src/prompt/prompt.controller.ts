import { Request, Response } from "express";

export const getAllPropmts = (req: Request, res: Response) => {
  res.send("PROMPT GET ROUTE!");
};
