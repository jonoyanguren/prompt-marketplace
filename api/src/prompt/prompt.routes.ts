import express from "express";
import { getAll, create, getOneById } from "./prompt.controller";

const router = express.Router();

router.get("/:id", getOneById);
router.get("/", getAll);
router.post("/", create);

export default router;
