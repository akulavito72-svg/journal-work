import { api, ApiResponse } from "./api";

export type WorkTypeShort = {
  id: number;
  name: string;
  isActive: boolean;
};

export type WorkLog = {
  id: number;
  workDate: string;
  workTypeId?: number;
  workType: WorkTypeShort;
  employeeName: string;
  description: string;
  hoursSpent: number | string;
  createdAt: string;
  updatedAt: string;
};

export type WorkLogsFilters = {
  date?: string;
};

export type CreateWorkLogRequest = {
  workDate: string;
  workTypeId: number;
  employeeName: string;
  description: string;
  hoursSpent: number;
};

export type UpdateWorkLogRequest = CreateWorkLogRequest;

export async function getWorkLogs(filters: WorkLogsFilters = {}): Promise<WorkLog[]> {
  const response = await api.get<ApiResponse<WorkLog[]>>("/work-logs", {
    params: filters
  });

  return response.data.data;
}

export async function createWorkLog(payload: CreateWorkLogRequest): Promise<WorkLog> {
  const response = await api.post<ApiResponse<WorkLog>>("/work-logs", payload);

  return response.data.data;
}

export async function updateWorkLog(id: number, payload: UpdateWorkLogRequest): Promise<WorkLog> {
  const response = await api.put<ApiResponse<WorkLog>>(`/work-logs/${id}`, payload);

  return response.data.data;
}

export async function deleteWorkLog(id: number): Promise<void> {
  await api.delete<void>(`/work-logs/${id}`);
}
