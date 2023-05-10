import { load } from "../storage/index.mjs";

/**
 * This function generates an object with HTTP headers for API requests, including an Authorization header with a Bearer token.
 *
 */
export function headers() {
  const token = load("token");
  console.log(token);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * This function sends a fetch request to the API with the specified URL, including the headers object returned by the headers function as the request headers.
 * @param {string} url
 * @param {object} options
 * @returns
 */
export async function authFetch(url, options = {}) {
  return await fetch(url, {
    ...options,
    headers: headers(),
  });
}
