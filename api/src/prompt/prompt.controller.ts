import { Request, Response } from "express";
import Prompt from "./prompt.model";
import { logger } from "../logger";

export const getAll = async (req: Request, res: Response) => {
  try {
    const allPrompts = await Prompt.find();
    res.status(200).json(allPrompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  const { title, description, prompt, platforms, tags } = req.body;

  if (!title || !description || !prompt || !platforms) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPrompt = new Prompt({
      title,
      description,
      prompt,
      platforms,
      tags: tags || [],
    });

    const savedPrompt = await newPrompt.save();
    res.status(201).json(savedPrompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneById = async (req: Request, res: Response) => {
  logger.info("HELLo");
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id);
    res.status(200).json(prompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
