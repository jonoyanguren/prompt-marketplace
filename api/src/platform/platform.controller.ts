import { Request, Response } from "express";
import Platform from "./platform.model";
import { ExtendedRequest } from "../types/extendedRequest";
import mongoose from "mongoose";
import PlatformUpvote from "./platformUpvote.model";

export const getAll = async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const allPlatforms = await Platform.find().sort({ votes: -1 });

    if (userId) {
      const userUpvotes = await PlatformUpvote.find({ userId }).select(
        "platformId"
      );

      const upvotedPlatformIds = new Set(
        userUpvotes.map((upvote) => upvote.platformId.toString())
      );

      const platformsWithUpvoteStatus = allPlatforms.map((platform) => ({
        ...platform.toObject(),
        userHasUpvoted: upvotedPlatformIds.has(platform._id.toString()),
      }));

      return res.status(200).json(platformsWithUpvoteStatus);
    }

    res.status(200).json(allPlatforms);
  } catch (error) {
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

export const getOneById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findById(id);

    if (!platform) {
      return res.status(404).json({ message: "Platform not found" });
    }

    res.status(200).json(platform);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPlatform = await Platform.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPlatform);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha cargado ningún archivo" });
    }
    const newPlatform = new Platform(req.body);
    newPlatform.logo = req.file.path;
    const savedPlatform = await newPlatform.save();

    res.status(201).json(savedPlatform);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const upvotePlatform = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const { platformId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(platformId)
  ) {
    return res.status(400).json({ message: "Invalid user ID or platform ID." });
  }

  try {
    const existingUpvote = await PlatformUpvote.findOne({ userId, platformId });
    if (existingUpvote) {
      return res
        .status(400)
        .json({ message: "You have already upvoted this platform." });
    }

    const newUpvote = new PlatformUpvote({ userId, platformId });
    await newUpvote.save();

    await Platform.findByIdAndUpdate(platformId, { $inc: { votes: 1 } });

    res.status(200).json({ message: "Platform upvoted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Please try again later.", error });
  }
};
