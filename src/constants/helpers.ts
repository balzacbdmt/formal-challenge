/**
 * Generate a random number
 * @param min minimal number
 * @param max maximal number
 * @returns number from min to max
 */
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates cross porduct percentage
 * @param value The value to calculate
 * @param max The maximum value against which 'value' is compared
 * @returns The cross product percentage
 */
export function calculateCrossProductPercentage(value: number, max: number) {
  return (value / max) * 100;
}

/**
 * Formats a number with commas for thousands, millions, etc
 * @param number the number to format
 * @returns A string representation of the number with commas as thousands separators
 */
export function formatNumberWithCommas(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Helper that joins strings together with a space
 * @param items - Array of string and/or number to be joined.
 * @returns The joined string, with items separated by a space.
 * @example
 * join(["A", "B", "C"]) => "A B C"
 */
export function join(items: (string | number)[]) {
  return items.join(" ");
}
