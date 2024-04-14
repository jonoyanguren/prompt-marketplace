import express from "express";
import { getAllPropmts } from "./prompt.controller";

const router = express.Router();

router.get("/", getAllPropmts);

export default router;
