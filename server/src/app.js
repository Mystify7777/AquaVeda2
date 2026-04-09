import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import healthRoutes from "./routes/healthRoutes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import commentRoutes from "./modules/comments/comment.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import issueRoutes from "./modules/issues/issue.routes.js";
import projectRoutes from "./modules/projects/project.routes.js";
import wikiRoutes from "./modules/wiki/wiki.routes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Render runs behind a proxy; trust first hop for correct client IP handling.
app.set("trust proxy", 1);

const parseAllowedOrigins = () => {
  const envOrigins = process.env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (envOrigins && envOrigins.length > 0) {
    return envOrigins;
  }

  return [process.env.CLIENT_URL || "http://localhost:3000"];
};

const allowedOrigins = parseAllowedOrigins();

const globalLimiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max: Number.parseInt(process.env.RATE_LIMIT_MAX, 10) || 200,
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: Number.parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max: Number.parseInt(process.env.AUTH_RATE_LIMIT_MAX, 10) || 20,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const corsError = new Error("CORS origin not allowed");
      corsError.status = 403;
      return callback(corsError);
    },
    credentials: true
  })
);
app.use(globalLimiter);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/health", healthRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/issues", issueRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/wiki", wikiRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Aquaveda API is running" });
});

app.use(notFound);
app.use(errorHandler);

export default app;