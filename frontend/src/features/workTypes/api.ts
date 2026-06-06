import { axiosInstance } from "../../shared/api/axiosInstance";
import { ApiResponse } from "../../shared/api/types";
import { WorkType } from "./types";

export async function getWorkTypes(onlyActive = true): Promise<WorkType[]> {
  const response = await axiosInstance.get<ApiResponse<WorkType[]>>("/work-types", {
    params: { onlyActive }
  });

  return response.data.data;
}
