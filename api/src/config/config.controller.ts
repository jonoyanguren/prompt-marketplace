import { Request, Response } from "express";
import Category from "../category/category.model";
import Platform from "../platform/platform.model";

export const getConfig = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    const platforms = await Platform.find();
    res.status(200).json({ categories, platforms });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
