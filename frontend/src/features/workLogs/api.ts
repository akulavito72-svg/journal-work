import { axiosInstance } from "../../shared/api/axiosInstance";
import { ApiResponse } from "../../shared/api/types";
import { WorkLog, WorkLogFilters, WorkLogFormValues } from "./types";

export async function getWorkLogs(filters: WorkLogFilters = {}): Promise<WorkLog[]> {
  const response = await axiosInstance.get<ApiResponse<WorkLog[]>>("/work-logs", {
    params: filters
  });

  return response.data.data;
}

export async function createWorkLog(payload: WorkLogFormValues): Promise<WorkLog> {
  const response = await axiosInstance.post<ApiResponse<WorkLog>>("/work-logs", payload);

  return response.data.data;
}

export async function updateWorkLog(id: number, payload: WorkLogFormValues): Promise<WorkLog> {
  const response = await axiosInstance.put<ApiResponse<WorkLog>>(`/work-logs/${id}`, payload);

  return response.data.data;
}

export async function deleteWorkLog(id: number): Promise<void> {
  await axiosInstance.delete(`/work-logs/${id}`);
}
