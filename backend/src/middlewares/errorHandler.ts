import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../common/errors/AppError";
import { ApiErrorResponse } from "../common/types/api";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Record with this unique value already exists" });
    }

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Record not found" });
    }
  }

  console.error(error);

  return res.status(500).json({ message: "Internal server error" });
}
