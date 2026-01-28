export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://demi.qbox.com";

export type ApiError = {
  message: string;
  status: number;
  data?: unknown;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export const request = async <T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body:
      options.body === undefined
        ? undefined
        : typeof options.body === "string"
          ? options.body
          : JSON.stringify(options.body),
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error: ApiError = {
      message:
        (data && (data.message || data.error)) ||
        response.statusText ||
        "Request failed",
      status: response.status,
      data,
    };
    throw error;
  }

  return data as T;
};
