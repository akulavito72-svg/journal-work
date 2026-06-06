import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { AppError } from "../../common/errors/AppError";
import { CreateWorkTypeDto, UpdateWorkTypeDto } from "./workTypes.dto";

export async function getWorkTypes(onlyActive?: boolean) {
  return prisma.workType.findMany({
    where: onlyActive ? { isActive: true } : undefined,
    orderBy: { name: "asc" }
  });
}

export async function createWorkType(dto: CreateWorkTypeDto) {
  return prisma.workType.create({
    data: dto
  });
}

export async function updateWorkType(id: number, dto: UpdateWorkTypeDto) {
  await ensureWorkTypeExists(id);

  return prisma.workType.update({
    where: { id },
    data: dto
  });
}

export async function deleteWorkType(id: number) {
  await ensureWorkTypeExists(id);

  const journalEntriesCount = await prisma.journalEntry.count({
    where: { workTypeId: id }
  });

  if (journalEntriesCount > 0) {
    return prisma.workType.update({
      where: { id },
      data: { isActive: false }
    });
  }

  await prisma.workType.delete({
    where: { id }
  });

  return null;
}

export async function ensureActiveWorkTypeExists(id: number) {
  const workType = await prisma.workType.findFirst({
    where: {
      id,
      isActive: true
    }
  });

  if (!workType) {
    throw new AppError(400, "Active work type not found");
  }

  return workType;
}

async function ensureWorkTypeExists(id: number) {
  const workType = await prisma.workType.findUnique({
    where: { id }
  });

  if (!workType) {
    throw new AppError(404, "Work type not found");
  }

  return workType;
}
