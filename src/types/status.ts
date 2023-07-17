export interface ResponseSuccess {
  success: boolean;
}

export interface ResponseError {
  errors: string | Record<string, unknown>[];
}
