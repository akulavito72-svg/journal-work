import { api, ApiResponse } from "./api";

export type WorkType = {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type WorkTypesFilters = {
  onlyActive?: boolean;
};

export async function getWorkTypes(filters: WorkTypesFilters = {}): Promise<WorkType[]> {
  const response = await api.get<ApiResponse<WorkType[]>>("/work-types", {
    params: filters
  });

  return response.data.data;
}
