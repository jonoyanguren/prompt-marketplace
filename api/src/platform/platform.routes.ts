import express from "express";
import { getAll, create, update, getOneById } from "./platform.controller";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOneById);
router.post("/", create);
router.put("/:id", update);

export default router;
