import express from "express";

import { getAll, register, getMe, update } from "./user.controller";
import { jwtVerify } from "../middleware/jwtVerify";

const router = express.Router();

router.get("/all", getAll);
router.post("/register", register);
router.get("/me", jwtVerify, getMe);
router.put("/:id", jwtVerify, update);

export default router;
