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
} from "./prompt.controller";

import { jwtVerify } from "../middleware/jwtVerify";

const router = express.Router();

router.get("/", getAll);
router.post("/", jwtVerify, create);
router.get("/category/:id", getPromptsByCategory);
router.get("/search", getAll);
router.get("/search/:text", getPromptsByText);
router.post("/:id/upvote", upvotePrompt);
router.post("/:id/downvote", downvotePrompt);
router.get("/:id", getOneById);
router.put("/:id", update);

export default router;
