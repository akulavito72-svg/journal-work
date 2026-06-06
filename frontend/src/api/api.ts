import axios, { AxiosError, AxiosInstance } from "axios";

export type ApiResponse<T> = {
  data: T;
};

export type ApiErrorResponse = {
  message: string;
};

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export function getApiErrorMessage(error: unknown, fallback = "Ошибка запроса"): string {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  return axiosError.response?.data?.message ?? fallback;
}
