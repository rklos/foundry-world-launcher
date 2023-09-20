interface SuccessResponse<T> {
  status: 'ok';
  data?: T;
}

interface ErrorResponse {
  status: 'error';
  error: string;
}

export type ApiResponse<T = void> = SuccessResponse<T> | ErrorResponse;
