import { Router } from "express";
import {
  createWorkTypeHandler,
  deleteWorkTypeHandler,
  listWorkTypes,
  updateWorkTypeHandler
} from "./workTypes.controller";
import { asyncHandler } from "../../utils/asyncHandler";

export const workTypesRouter = Router();

workTypesRouter.get("/", asyncHandler(listWorkTypes));
workTypesRouter.post("/", asyncHandler(createWorkTypeHandler));
workTypesRouter.put("/:id", asyncHandler(updateWorkTypeHandler));
workTypesRouter.delete("/:id", asyncHandler(deleteWorkTypeHandler));
