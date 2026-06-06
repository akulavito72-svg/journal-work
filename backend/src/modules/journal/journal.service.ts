import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { AppError } from "../../common/errors/AppError";
import {
  CreateJournalEntryDto,
  JournalFiltersDto,
  UpdateJournalEntryDto
} from "./journal.dto";
import { ensureActiveWorkTypeExists } from "../workTypes/workTypes.service";

const journalEntryInclude = {
  workType: {
    select: {
      id: true,
      name: true,
      isActive: true
    }
  }
} satisfies Prisma.JournalEntryInclude;

export async function getJournalEntries(filters: JournalFiltersDto) {
  return prisma.journalEntry.findMany({
    where: buildJournalWhere(filters),
    include: journalEntryInclude,
    orderBy: [{ workDate: "desc" }, { id: "desc" }]
  });
}

export async function getJournalEntryById(id: number) {
  const entry = await prisma.journalEntry.findUnique({
    where: { id },
    include: journalEntryInclude
  });

  if (!entry) {
    throw new AppError(404, "Journal entry not found");
  }

  return entry;
}

export async function createJournalEntry(dto: CreateJournalEntryDto) {
  await ensureActiveWorkTypeExists(dto.workTypeId);

  return prisma.journalEntry.create({
    data: dto,
    include: journalEntryInclude
  });
}

export async function updateJournalEntry(id: number, dto: UpdateJournalEntryDto) {
  await getJournalEntryById(id);

  if (dto.workTypeId !== undefined) {
    await ensureActiveWorkTypeExists(dto.workTypeId);
  }

  return prisma.journalEntry.update({
    where: { id },
    data: dto,
    include: journalEntryInclude
  });
}

export async function deleteJournalEntry(id: number) {
  await getJournalEntryById(id);

  await prisma.journalEntry.delete({
    where: { id }
  });

  return null;
}

function buildJournalWhere(filters: JournalFiltersDto): Prisma.JournalEntryWhereInput {
  const where: Prisma.JournalEntryWhereInput = {};

  if (filters.dateFrom || filters.dateTo) {
    where.workDate = {
      gte: filters.dateFrom,
      lte: filters.dateTo
    };
  }

  if (filters.workTypeId) {
    where.workTypeId = filters.workTypeId;
  }

  return where;
}
