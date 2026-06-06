export type ApiResponse<T> = {
  data: T;
};

export type ApiErrorResponse = {
  message: string;
};
