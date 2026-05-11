import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import schoolRoutes from "./routes/schoolRoutes.js";

app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "School Management API Running",
  });
});

export default app;
