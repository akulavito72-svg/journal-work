import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { apiRouter } from "./routes";

export const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ data: { status: "ok" } });
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);
