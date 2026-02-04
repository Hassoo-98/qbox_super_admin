import axios from "axios";
import type { ApiError } from "../types";

export const normalizeApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const res = error.response;

    throw {
      status: res?.status ?? 0,
      code: res?.data?.code ?? "API_ERROR",
      message: res?.data?.message ?? error.message ?? "Request failed",
      errors: res?.data?.errors,
    } satisfies ApiError;
  }

  if (error instanceof Error) {
    throw {
      status: 500,
      code: "CLIENT_ERROR",
      message: error.message,
    } satisfies ApiError;
  }

  throw {
    status: 500,
    code: "UNKNOWN_ERROR",
    message: "Unexpected error occurred",
  } satisfies ApiError;
};
