import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

import { logger } from "./logger";
import connectDB from "./database";

import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import promptRoutes from "./prompt/prompt.routes";

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

logger.info("Testing logger");

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/prompt", promptRoutes);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

//DB
connectDB();

//Server
app.listen(process.env.PORT, () => {
  console.info(`Magic is happening in port: ${process.env.PORT}`);
});

export { app };
