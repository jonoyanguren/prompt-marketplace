import { Request, Response } from "express";
import Prompt from "./prompt.model";
import { ExtendedRequest } from "../types/extendedRequest";
import PromptUpvote from "./promptUpvote.model";

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
    const { id } = req.params;

    const prompts = await Prompt.find({
      categories: id,
    })
      .populate("createdBy")
      .populate("platforms")
      .populate("categories");

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

export const getOneById = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const upvoteCount = await PromptUpvote.countDocuments({ prompt: id });
    const userHasUpvoted = await PromptUpvote.exists({
      prompt: id,
      user: req.user?.id,
    });

    const prompt = await Prompt.findById(id)
      .populate("createdBy")
      .populate("platforms")
      .populate("categories");
    res.status(200).json({
      ...prompt.toObject(),
      upvoteCount,
      userHasUpvoted: !!userHasUpvoted,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const upvotePrompt = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    console.log("ID", id);
    console.log("USER", req.user?.id);

    const userHasUpvoted = await PromptUpvote.exists({
      prompt: id,
      user: req.user?.id,
    });

    console.log("UPVOTE", userHasUpvoted);

    if (userHasUpvoted) {
      return res.status(400).json({ message: "Prompt already upvoted" });
    }

    await PromptUpvote.create({ prompt: id, user: req.user?.id });

    prompt.upvotes++;
    const savedPrompt = await prompt.save();
    res
      .status(200)
      .json({ savedPrompt, upvoteCount: prompt.upvotes, userHasUpvoted: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const downvotePrompt = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    const existingUpvote = await PromptUpvote.findOne({
      prompt: id,
      user: req.user?.id,
    });

    if (!existingUpvote) {
      return res.status(400).json({ message: "Prompt already downvoted" });
    } else {
      await PromptUpvote.findByIdAndDelete(existingUpvote._id);
    }

    prompt.upvotes--;
    const savedPrompt = await prompt.save();
    res.status(200).json({
      ...savedPrompt,
      upvoteCount: prompt.upvotes,
      userHasUpvoted: false,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPrompt = await Prompt.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPrompt);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPromptsByText = async (req: Request, res: Response) => {
  try {
    const { text } = req.params;
    if (!text) getAll(req, res);
    const prompts = await Prompt.find({
      $text: { $search: text },
    })
      .populate("createdBy")
      .populate("platforms")
      .populate("categories");

    res.status(200).json(prompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
