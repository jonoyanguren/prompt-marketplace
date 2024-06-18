import Payment from "../payments/payment.model";
import { Response } from "express";
import { ExtendedRequest } from "../types/extendedRequest";

export const getMine = async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const orders = await Payment.find({ userId: userId })
      .populate("promptId")
      .populate("userId");

    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
