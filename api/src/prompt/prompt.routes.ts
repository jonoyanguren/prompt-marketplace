import express from "express";
import {
  getAll,
  create,
  getOneById,
  upvotePrompt,
  downvotePrompt,
  update,
  getPromptsByCategory,
} from "./prompt.controller";

import { jwtVerify } from "../middleware/jwtVerify";

const router = express.Router();

router.get("/", getAll);
router.post("/", jwtVerify, create);
router.get("/category/:id", getPromptsByCategory);
router.post("/:id/upvote", upvotePrompt);
router.post("/:id/downvote", downvotePrompt);
router.get("/:id", getOneById);
router.put("/:id", update);

export default router;
