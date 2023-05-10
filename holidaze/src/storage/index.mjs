/**
 * This function saves a key-value pair in the local storage, with the value being stringified first
 * @param {string} key
 * @param {string} value
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
/**
 * This function retrieves a value from the local storage using the specified key, and attempts to parse the value as JSON. If the parsing fails, it returns null.
 * @param {string} key
 * @returns
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}
/**
 * This function removes a key-value pair from the local storage using the specified key.
 * @param {string} key
 */
export function remove(key) {
  localStorage.removeItem(key);
}
