import express from "express";
import { getAll, create } from "./prompt.controller";

const router = express.Router();

router.get("/", getAll);
router.post("/", create);

export default router;
