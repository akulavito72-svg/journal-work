import { AppError } from "../common/errors/AppError";

export function parseIdParam(value: string): number {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(400, "id must be a positive integer");
  }

  return id;
}

export function parseBooleanQuery(value: unknown): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  throw new AppError(400, "Boolean query parameter must be true or false");
}
