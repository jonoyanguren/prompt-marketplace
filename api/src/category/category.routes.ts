import express from "express";
import { create, getAll, getOneById, update } from "./category.controller";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOneById);
router.post("/", create);
router.put("/:id", update);

export default router;
