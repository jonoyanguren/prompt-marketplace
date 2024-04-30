import express from "express";

import { getAll, register } from "./user.controller";

const router = express.Router();

router.get("/all", getAll);
router.post("/register", register);

export default router;
