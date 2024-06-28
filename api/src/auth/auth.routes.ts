import express from "express";

import {
  forgotPassword,
  login,
  resendVerification,
  resetPassword,
  verifyEmail,
} from "./auth.controller";
import { jwtPayloadOnly } from "../middleware/jwtVerify";

const router = express.Router();

router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/resend-code", jwtPayloadOnly, resendVerification);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
