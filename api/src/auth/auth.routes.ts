import express from "express";

import { login, verifyEmail } from "./auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/verify-email", verifyEmail);

export default router;
