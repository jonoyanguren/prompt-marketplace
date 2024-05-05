import express from "express";
import { getConfig } from "./config.controller";

const router = express.Router();

router.get("/", getConfig);

export default router;
