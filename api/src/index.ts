import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./database";

import promptRoutes from "./prompt/prompt.routes";

const app = express();
app.use(express.json());

// Routes
app.use("/prompt", promptRoutes);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

//DB
connectDB();

// Server
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Magic is happening in port: ${port}`);
  });
}

export default app;
