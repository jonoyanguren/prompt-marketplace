import express from "express";
import multer from "multer";
import {
  getAll,
  create,
  update,
  getOneById,
  upvotePlatform,
} from "./platform.controller";
import { jwtPayloadOnly, jwtVerify } from "../middleware/jwtVerify";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "./platformsLogos",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage });

router.get("/", jwtPayloadOnly, getAll);
router.get("/:id", getOneById);
router.post("/", upload.single("file"), create);
router.put("/:id", update);
router.post("/upvote", jwtVerify, upvotePlatform);

export default router;
