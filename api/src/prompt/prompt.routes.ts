import express from "express";
import {
  getAll,
  create,
  getOneById,
  upvotePrompt,
  downvotePrompt,
} from "./prompt.controller";

import { jwtVerify } from "../middleware/jwtVerify";

const router = express.Router();

router.get("/", getAll);
router.post("/", jwtVerify, create);
router.post("/:id/upvote", upvotePrompt);
router.post("/:id/downvote", downvotePrompt);
router.get("/:id", getOneById);

export default router;
