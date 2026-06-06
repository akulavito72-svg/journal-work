import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["DATABASE_URL"] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is required`);
  }
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  databaseUrl: process.env.DATABASE_URL as string,
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173"
};
