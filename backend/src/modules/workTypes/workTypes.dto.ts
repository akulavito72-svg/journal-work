import { AppError } from "../../common/errors/AppError";

export type CreateWorkTypeDto = {
  name: string;
  description?: string | null;
};

export type UpdateWorkTypeDto = {
  name?: string;
  description?: string | null;
  isActive?: boolean;
};

export function parseCreateWorkTypeDto(body: unknown): CreateWorkTypeDto {
  const payload = body as Partial<CreateWorkTypeDto>;

  if (!payload.name || typeof payload.name !== "string" || payload.name.trim().length < 2) {
    throw new AppError(400, "name must be a string with at least 2 characters");
  }

  return {
    name: payload.name.trim(),
    description: normalizeOptionalString(payload.description)
  };
}

export function parseUpdateWorkTypeDto(body: unknown): UpdateWorkTypeDto {
  const payload = body as Partial<UpdateWorkTypeDto>;
  const dto: UpdateWorkTypeDto = {};

  if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      throw new AppError(400, "name must be a string with at least 2 characters");
    }

    dto.name = payload.name.trim();
  }

  if (payload.description !== undefined) {
    dto.description = normalizeOptionalString(payload.description);
  }

  if (payload.isActive !== undefined) {
    if (typeof payload.isActive !== "boolean") {
      throw new AppError(400, "isActive must be a boolean");
    }

    dto.isActive = payload.isActive;
  }

  if (Object.keys(dto).length === 0) {
    throw new AppError(400, "At least one field must be provided");
  }

  return dto;
}

function normalizeOptionalString(value: unknown): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (typeof value !== "string") {
    throw new AppError(400, "description must be a string or null");
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
