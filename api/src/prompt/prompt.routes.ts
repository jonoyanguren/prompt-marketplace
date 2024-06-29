import express from "express";
import {
  getAll,
  create,
  getOneById,
  upvotePrompt,
  downvotePrompt,
  update,
  getPromptsByCategory,
  getPromptsByText,
  getMine,
} from "./prompt.controller";

import { jwtPayloadOnly, jwtVerify } from "../middleware/jwtVerify";
import { checkCreator } from "../middleware/checkCreator";

const router = express.Router();

router.get("/", getAll);
router.post("/", jwtVerify, checkCreator, create);
router.get("/category/:id", getPromptsByCategory);
router.get("/search", getAll);
router.get("/search/:text", getPromptsByText);
router.get("/mine", jwtVerify, getMine);
router.post("/:id/upvote", jwtVerify, upvotePrompt);
router.post("/:id/downvote", jwtVerify, downvotePrompt);
router.get("/:id", jwtPayloadOnly, getOneById);
router.put("/:id", update);

export default router;
