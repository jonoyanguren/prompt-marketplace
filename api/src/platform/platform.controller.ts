import { Request, Response } from "express";
import Platform from "./platform.model";
import { ExtendedRequest } from "../types/extendedRequest";
import multer from "multer";
import path from "path";

export const getAll = async (req: Request, res: Response) => {
  try {
    const allPlatforms = await Platform.find();
    res.status(200).json(allPlatforms);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
    console.log("req.file.path", req.file.path);
    newPlatform.logo = req.file.path;
    const savedPlatform = await newPlatform.save();

    res.status(201).json(savedPlatform);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
