import express from "express";

import { getAll, register, getMe, update, setCreator } from "./user.controller";
import { jwtPayloadOnly, jwtVerify } from "../middleware/jwtVerify";

const router = express.Router();

router.get("/all", getAll);
router.post("/register", register);
router.get("/me", jwtVerify, getMe);
router.put("/:id", jwtVerify, update);
router.post("/become-a-creator", jwtVerify, setCreator);

export default router;
