import { AppError } from "../../common/errors/AppError";

export type CreateJournalEntryDto = {
  workDate: Date;
  workTypeId: number;
  description: string;
  employeeName: string;
  hoursSpent: string;
};

export type UpdateJournalEntryDto = Partial<CreateJournalEntryDto>;

export type JournalFiltersDto = {
  dateFrom?: Date;
  dateTo?: Date;
  workTypeId?: number;
};

export function parseJournalFilters(query: Record<string, unknown>): JournalFiltersDto {
  const filters: JournalFiltersDto = {};

  if (query.dateFrom !== undefined) {
    filters.dateFrom = parseDate(String(query.dateFrom), "dateFrom");
  }

  if (query.dateTo !== undefined) {
    filters.dateTo = parseDate(String(query.dateTo), "dateTo");
  }

  if (query.workTypeId !== undefined) {
    filters.workTypeId = parsePositiveInteger(query.workTypeId, "workTypeId");
  }

  if (filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo) {
    throw new AppError(400, "dateFrom must be less than or equal to dateTo");
  }

  return filters;
}

export function parseCreateJournalEntryDto(body: unknown): CreateJournalEntryDto {
  const payload = body as Record<string, unknown>;

  return {
    workDate: parseDate(payload.workDate, "workDate"),
    workTypeId: parsePositiveInteger(payload.workTypeId, "workTypeId"),
    description: parseRequiredString(payload.description, "description", 3),
    employeeName: parseRequiredString(payload.employeeName, "employeeName", 2),
    hoursSpent: parsePositiveDecimal(payload.hoursSpent, "hoursSpent")
  };
}

export function parseUpdateJournalEntryDto(body: unknown): UpdateJournalEntryDto {
  const payload = body as Record<string, unknown>;
  const dto: UpdateJournalEntryDto = {};

  if (payload.workDate !== undefined) {
    dto.workDate = parseDate(payload.workDate, "workDate");
  }

  if (payload.workTypeId !== undefined) {
    dto.workTypeId = parsePositiveInteger(payload.workTypeId, "workTypeId");
  }

  if (payload.description !== undefined) {
    dto.description = parseRequiredString(payload.description, "description", 3);
  }

  if (payload.employeeName !== undefined) {
    dto.employeeName = parseRequiredString(payload.employeeName, "employeeName", 2);
  }

  if (payload.hoursSpent !== undefined) {
    dto.hoursSpent = parsePositiveDecimal(payload.hoursSpent, "hoursSpent");
  }

  if (Object.keys(dto).length === 0) {
    throw new AppError(400, "At least one field must be provided");
  }

  return dto;
}

function parseDate(value: unknown, fieldName: string): Date {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new AppError(400, `${fieldName} must be a date in YYYY-MM-DD format`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    throw new AppError(400, `${fieldName} must be a valid date`);
  }

  return date;
}

function parsePositiveInteger(value: unknown, fieldName: string): number {
  const numberValue = Number(value);

  if (!Number.isInteger(numberValue) || numberValue <= 0) {
    throw new AppError(400, `${fieldName} must be a positive integer`);
  }

  return numberValue;
}

function parseRequiredString(value: unknown, fieldName: string, minLength: number): string {
  if (typeof value !== "string" || value.trim().length < minLength) {
    throw new AppError(400, `${fieldName} must be a string with at least ${minLength} characters`);
  }

  return value.trim();
}

function parsePositiveDecimal(value: unknown, fieldName: string): string {
  const normalized = String(value);
  const numberValue = Number(normalized);

  if (!Number.isFinite(numberValue) || numberValue <= 0 || numberValue > 999.99) {
    throw new AppError(400, `${fieldName} must be greater than 0 and less than or equal to 999.99`);
  }

  return numberValue.toFixed(2);
}
