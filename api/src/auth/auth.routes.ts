import express from "express";

import {
  forgotPassword,
  login,
  resetPassword,
  verifyEmail,
} from "./auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
