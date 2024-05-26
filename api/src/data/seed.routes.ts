import express from "express";
import {
  seedCategories,
  seedPlatforms,
  seedPrompts,
  seedUsers,
} from "./seed.controller";
import { checkAdmin } from "../middleware/checkAdmin";
import { jwtVerify } from "../middleware/jwtVerify";

const router = express.Router();

router.get("/categories", seedCategories);
router.get("/users", seedUsers);
router.get("/prompts", seedPrompts);
router.get("/platforms", seedPlatforms);

export default router;
