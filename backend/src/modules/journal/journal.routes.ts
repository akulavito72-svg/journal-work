import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createJournalEntryHandler,
  deleteJournalEntryHandler,
  getJournalEntry,
  listJournalEntries,
  updateJournalEntryHandler
} from "./journal.controller";

export const journalRouter = Router();

journalRouter.get("/", asyncHandler(listJournalEntries));
journalRouter.get("/:id", asyncHandler(getJournalEntry));
journalRouter.post("/", asyncHandler(createJournalEntryHandler));
journalRouter.put("/:id", asyncHandler(updateJournalEntryHandler));
journalRouter.delete("/:id", asyncHandler(deleteJournalEntryHandler));
