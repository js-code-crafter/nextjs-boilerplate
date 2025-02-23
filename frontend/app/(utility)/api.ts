import { API_URL } from "./config";

/**
 * Represents the structure of a JSON response from an API call.
 *
 * This type includes:
 * - `json`: The parsed JSON response data, represented as an object.
 * - `status`: The HTTP status code returned by the server.
 * - `ok`: A boolean indicating if the request was successful (status in the range 200-299).
 */
export type JsonResponse = {
  json: object; // The parsed JSON response data.
  status: number; // The HTTP status code of the response.
  ok: boolean; // Indicates if the response was successful.
};

/**
 * Sends a GET request to the specified route.
 * @param route - The API endpoint to send the request to.
 * @param init - Optional additional request options (e.g., headers).
 * @returns A promise that resolves to a JsonResponse containing the response data, status, and ok flag.
 */
export async function get(
  route: string,
  init?: RequestInit
): Promise<JsonResponse> {
  const response = await fetch(API_URL + route, { ...init, method: "GET" });

  return {
    json: await response.json(),
    status: response.status,
    ok: response.ok,
  };
}

/**
 * Sends a POST request to the specified route with the given data.
 * @param route - The API endpoint to send the request to.
 * @param data - The data to be sent in the request body.
 * @param init - Optional additional request options (e.g., headers).
 * @returns A promise that resolves to a JsonResponse containing the response data, status, and ok flag.
 */
export async function post(
  [route, data]: [string, object],
  init?: RequestInit
): Promise<JsonResponse> {
  const response = await fetch(API_URL + route, {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return {
    json: await response.json(),
    status: response.status,
    ok: response.ok,
  };
}

/**
 * Sends a PUT request to the specified route with the provided data.
 * Use this method to update a resource at the given endpoint.
 *
 * @param route - The API endpoint to send the request to.
 * @param data - The data to be sent in the request body as a JSON object.
 * @param init - Optional additional request options (e.g., headers).
 * @returns A promise that resolves to a JsonResponse containing the response data, status, and ok flag.
 */
export async function put(
  [route, data]: [string, object],
  init?: RequestInit
): Promise<JsonResponse> {
  const response = await fetch(API_URL + route, {
    ...init,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return {
    json: await response.json(),
    status: response.status,
    ok: response.ok,
  };
}

/**
 * Sends a DELETE request to the specified route.
 * Use this method to remove a resource at the given endpoint.
 *
 * @param route - The API endpoint to send the request to.
 * @param init - Optional additional request options (e.g., headers).
 * @returns A promise that resolves to a JsonResponse containing the response data, status, and ok flag.
 */
export async function delete_(
  route: string,
  init?: RequestInit
): Promise<JsonResponse> {
  const response = await fetch(API_URL + route, { ...init, method: "DELETE" });

  return {
    json: await response.json(),
    status: response.status,
    ok: response.ok,
  };
}

/**
 * Sends a PATCH request to the specified route with the provided data.
 * Use this method to make partial updates to a resource at the given endpoint.
 *
 * @param route - The API endpoint to send the request to.
 * @param data - The data to be sent in the request body as a JSON object.
 * @param init - Optional additional request options (e.g., headers).
 * @returns A promise that resolves to a JsonResponse containing the response data, status, and ok flag.
 */
export async function patch(
  [route, data]: [string, object],
  init?: RequestInit
): Promise<JsonResponse> {
  const response = await fetch(API_URL + route, {
    ...init,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return {
    json: await response.json(),
    status: response.status,
    ok: response.ok,
  };
}
