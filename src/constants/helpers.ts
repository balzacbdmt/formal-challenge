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
