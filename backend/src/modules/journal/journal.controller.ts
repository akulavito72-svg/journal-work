import { Request, Response } from "express";
import { ApiResponse } from "../../common/types/api";
import { parseIdParam } from "../../utils/parsers";
import {
  parseCreateJournalEntryDto,
  parseJournalFilters,
  parseUpdateJournalEntryDto
} from "./journal.dto";
import {
  createJournalEntry,
  deleteJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry
} from "./journal.service";

export async function listJournalEntries(req: Request, res: Response<ApiResponse<unknown>>) {
  const filters = parseJournalFilters(req.query);
  const data = await getJournalEntries(filters);

  return res.json({ data });
}

export async function getJournalEntry(req: Request, res: Response<ApiResponse<unknown>>) {
  const id = parseIdParam(req.params.id);
  const data = await getJournalEntryById(id);

  return res.json({ data });
}

export async function createJournalEntryHandler(req: Request, res: Response<ApiResponse<unknown>>) {
  const dto = parseCreateJournalEntryDto(req.body);
  const data = await createJournalEntry(dto);

  return res.status(201).json({ data });
}

export async function updateJournalEntryHandler(req: Request, res: Response<ApiResponse<unknown>>) {
  const id = parseIdParam(req.params.id);
  const dto = parseUpdateJournalEntryDto(req.body);
  const data = await updateJournalEntry(id, dto);

  return res.json({ data });
}

export async function deleteJournalEntryHandler(req: Request, res: Response<ApiResponse<unknown>>) {
  const id = parseIdParam(req.params.id);
  const data = await deleteJournalEntry(id);

  return res.json({ data });
}
