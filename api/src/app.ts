import express, { Request, Response, NextFunction } from "express";
import path from "path";
const cors = require("cors");
import dotenv from "dotenv";
dotenv.config();

import { logger } from "./logger";
import connectDB from "./database";

import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import promptRoutes from "./prompt/prompt.routes";
import categoryRoutes from "./category/category.routes";
import platformRoutes from "./platform/platform.routes";
import configRoutes from "./config/config.routes";
import paymentRoutes from "./payments/payments.routes";
import { getPresignedUploadURL } from "./s3";

const app = express();
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

logger.info("Testing logger");

// Routes
app.use("/payment", paymentRoutes);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/prompt", promptRoutes);
app.use("/category", categoryRoutes);
app.use("/platform", platformRoutes);
app.use("/config", configRoutes);

// Return platforms logos
app.get("/platformsLogos/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "..", "platformsLogos", filename);
  res.sendFile(imagePath);
});

//aws presigned URL
app.get("/upload-url", async (req, res) => {
  const { fileName, fileType } = req.query;
  try {
    const url = await getPresignedUploadURL(fileName, fileType);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.options("*", cors());

//DB
connectDB();

//Server
const server = app
  .listen(process.env.PORT, () => {
    console.info(`Magic is happening in port: ${process.env.PORT}`);
  })
  .on("error", function (err) {
    process.once("SIGUSR2", function () {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
      process.kill(process.pid, "SIGINT");
    });
  });

const closeServer = () => {
  server.close();
};

export { app, closeServer };
