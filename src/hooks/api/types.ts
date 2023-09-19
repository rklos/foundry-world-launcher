interface SuccessResponse<T> {
  status: 'ok';
  data: T;
}

interface ErrorResponse {
  status: 'error';
  error: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
