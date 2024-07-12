/**
 * Generate a random number
 * @param min minimal number
 * @param max maximal number
 * @returns number from min to max
 */
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
