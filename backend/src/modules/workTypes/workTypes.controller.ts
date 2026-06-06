import { Request, Response } from "express";
import { ApiResponse } from "../../common/types/api";
import {
  createWorkType,
  deleteWorkType,
  getWorkTypes,
  updateWorkType
} from "./workTypes.service";
import { parseCreateWorkTypeDto, parseUpdateWorkTypeDto } from "./workTypes.dto";
import { parseBooleanQuery, parseIdParam } from "../../utils/parsers";

export async function listWorkTypes(req: Request, res: Response<ApiResponse<unknown>>) {
  const onlyActive = parseBooleanQuery(req.query.onlyActive);
  const data = await getWorkTypes(onlyActive);

  return res.json({ data });
}

export async function createWorkTypeHandler(req: Request, res: Response<ApiResponse<unknown>>) {
  const dto = parseCreateWorkTypeDto(req.body);
  const data = await createWorkType(dto);

  return res.status(201).json({ data });
}

export async function updateWorkTypeHandler(req: Request, res: Response<ApiResponse<unknown>>) {
  const id = parseIdParam(req.params.id);
  const dto = parseUpdateWorkTypeDto(req.body);
  const data = await updateWorkType(id, dto);

  return res.json({ data });
}

export async function deleteWorkTypeHandler(req: Request, res: Response<ApiResponse<unknown>>) {
  const id = parseIdParam(req.params.id);
  const data = await deleteWorkType(id);

  return res.json({ data });
}
