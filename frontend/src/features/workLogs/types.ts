import { WorkType } from "../workTypes/types";

export type WorkLog = {
  id: number;
  workDate: string;
  workTypeId?: number;
  workType: Pick<WorkType, "id" | "name" | "isActive">;
  employeeName: string;
  description: string;
  hoursSpent: number | string;
  createdAt: string;
  updatedAt: string;
};

export type WorkLogFormValues = {
  workDate: string;
  workTypeId: number;
  employeeName: string;
  description: string;
  hoursSpent: number;
};

export type WorkLogFilters = {
  date?: string;
};
