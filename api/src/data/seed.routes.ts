import express from "express";
import { seedCategories, seedPrompts, seedUsers } from "./seed.controller";

const router = express.Router();

router.get("/categories", seedCategories);
router.get("/users", seedUsers);
router.get("/prompts", seedPrompts);

export default router;
