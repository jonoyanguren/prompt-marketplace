import { Request, Response } from "express";
import Prompt from "./prompt.model";
import { logger } from "../logger";
import { ExtendedRequest } from "../types/extendedRequest";

export const getAll = async (req: Request, res: Response) => {
  try {
    const allPrompts = await Prompt.find().populate("createdBy");
    res.status(200).json(allPrompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req: ExtendedRequest, res: Response) => {
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
      createdBy: req.user?.id,
      tags: tags || [],
    });

    const savedPrompt = await newPrompt.save();
    res.status(201).json(savedPrompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id).populate("createdBy");
    res.status(200).json(prompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const upvotePrompt = async (req: Request, res: Response) => {
  logger.info("UPVOTE");
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    prompt.upvotes++;
    const savedPrompt = await prompt.save();
    res.status(200).json(savedPrompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const downvotePrompt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    prompt.downvotes++;
    const savedPrompt = await prompt.save();
    res.status(200).json(savedPrompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
