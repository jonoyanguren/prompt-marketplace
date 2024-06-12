import { Request, Response } from "express";
import Prompt from "./prompt.model";
import { ExtendedRequest } from "../types/extendedRequest";
import PromptUpvote from "./promptUpvote.model";
import mongoose from "mongoose";
import Payment from "../payments/payment.model";

const COUNT_PER_PAGE = 10;

export const getAll = async (req: Request, res: Response) => {
  const param = req.query;
  const timesFetched = req.query.timesFetched || 0;

  try {
    const allPrompts = await Prompt.find()
      .sort({ createdAt: -1 })
      .skip(COUNT_PER_PAGE * parseInt(timesFetched as string))
      .limit(10)
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
    const timesFetched = req.query.timesFetched || 0;

    const prompts = await Prompt.find({
      categories: id,
    })
      .skip(COUNT_PER_PAGE * parseInt(timesFetched as string))
      .limit(10)
      .populate("createdBy")
      .populate("platforms")
      .populate("categories");

    res.status(200).json(prompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPromptsByText = async (req: Request, res: Response) => {
  try {
    const { text } = req.params;
    const timesFetched = req.query.timesFetched || 0;

    if (!text) getAll(req, res);
    const prompts = await Prompt.find({
      $text: { $search: text },
    })
      .skip(COUNT_PER_PAGE * parseInt(timesFetched as string))
      .limit(10)
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
  const {
    title,
    description,
    prompt,
    platforms,
    price,
    tags,
    categories,
    whoIsFor,
    howToUse,
  } = req.body;

  try {
    const newPrompt = new Prompt({
      title,
      description,
      whoIsFor,
      howToUse,
      prompt,
      price,
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
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid prompt ID." });
    }

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const [prompt, upvoteCount, userHasUpvoted, userHasPaid] =
      await Promise.all([
        Prompt.findById(id)
          .populate("createdBy")
          .populate("platforms")
          .populate("categories"),
        PromptUpvote.countDocuments({ prompt: id }),
        userId ? PromptUpvote.exists({ prompt: id, user: userId }) : null,
        userId ? Payment.exists({ promptId: id, userId: userId }) : null,
      ]);

    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found." });
    }

    res.status(200).json({
      ...prompt.toObject(),
      upvoteCount,
      userHasUpvoted: !!userHasUpvoted,
      userHasPaid: !!userHasPaid,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

export const upvotePrompt = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    const userHasUpvoted = await PromptUpvote.exists({
      prompt: id,
      user: req.user?.id,
    });

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

export const getMine = async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const prompts = await Prompt.find({ createdBy: userId }).populate(
      "createdBy"
    );
    res.status(200).json(prompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
