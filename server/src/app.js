import express from "express";
import cors from "cors";
import morgan from "morgan";

import healthRoutes from "./routes/healthRoutes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import commentRoutes from "./modules/comments/comment.routes.js";
import issueRoutes from "./modules/issues/issue.routes.js";
import projectRoutes from "./modules/projects/project.routes.js";
import wikiRoutes from "./modules/wiki/wiki.routes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Render runs behind a proxy; trust first hop for correct client IP handling.
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000"
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/health", healthRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/issues", issueRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/wiki", wikiRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Aquaveda API is running" });
});

app.use(notFound);
app.use(errorHandler);

export default app;