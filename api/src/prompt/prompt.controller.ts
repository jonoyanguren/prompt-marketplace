import { Request, Response } from "express";
import Prompt from "./prompt.model";
import { ExtendedRequest } from "../types/extendedRequest";
import mongoose from "mongoose";

export const getAll = async (req: Request, res: Response) => {
  try {
    const allPrompts = await Prompt.find()
      .populate("createdBy")
      .populate("platforms")
      .populate("categories");
    res.status(200).json(allPrompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPromptsByCategory = async (req: Request, res: Response) => {
  try {
    console.log("BY CATEGORY");
    const { id } = req.params;
    console.log("ID", id);
    console.log(new mongoose.Types.ObjectId(id));

    // const prompts = await Prompt.find({
    //   "createdBy._id": "6637b77a156ebb7b8a11fcc8",
    // });

    const allPrompts = await Prompt.find()
      .populate("categories")
      .populate("createdBy")
      .populate("platforms");

    // const db = mongoose.connection.db;
    // const prompts = await db
    //   .collection("prompts")
    //   .find({ categories: id })
    //   .toArray();

    const prompts = await Prompt.find({
      categories: id,
    })
      .populate("createdBy")
      .populate("platforms")
      .populate("categories");

    console.log("PROMPTS", prompts.length);
    res.status(200).json(prompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPromptsByPlatform = async (req: Request, res: Response) => {
  try {
    const { platform } = req.params;
    const prompts = await Prompt.find({ platforms: platform })
      .populate("createdBy")
      .populate("platforms")
      .populate("categories");
    res.status(200).json(prompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req: ExtendedRequest, res: Response) => {
  const { title, description, prompt, platforms, tags, categories } = req.body;

  if (!title || !description || !prompt || !platforms || !categories) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPrompt = new Prompt({
      title,
      description,
      prompt,
      platforms,
      createdBy: req.user?.id,
      categories,
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
    const prompt = await Prompt.findById(id)
      .populate("createdBy")
      .populate("platforms")
      .populate("categories");
    res.status(200).json(prompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const upvotePrompt = async (req: Request, res: Response) => {
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

export const update = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    console.log("UPDATE");
    const updatedPrompt = await Prompt.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPrompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
