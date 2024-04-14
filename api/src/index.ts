import express from "express";
import dotenv from "dotenv";

dotenv.config();

import promptRoutes from "./prompt/prompt.routes";

const app = express();

app.use(express.json());

app.use("/prompt", promptRoutes);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Magic is happening in port: ${port}`);
  });
}

export default app;
