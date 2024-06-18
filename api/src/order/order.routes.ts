import express from "express";

import { jwtVerify } from "../middleware/jwtVerify";
import { getMine } from "./order.controller";

const router = express.Router();

router.get("/mine", jwtVerify, getMine);

export default router;
