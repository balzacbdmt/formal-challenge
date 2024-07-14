import { describe, expect, it } from "vitest";
import {
  calculateCrossProductPercentage,
  getRandomNumber,
  formatNumberWithCommas,
  join,
} from "./helpers";

describe("Helpers: getRandomNumber", () => {
  it("should return a number within min and max", () => {
    const min = 1;
    const max = 10;
    const result = getRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it("should return min when min and max are the same", () => {
    const min = 5;
    const max = 5;
    const result = getRandomNumber(min, max);
    expect(result).toBe(min);
  });
});

describe("Helper: calculateCrossProductPercentage", () => {
  it("should return 0 when value is 0", () => {
    const value = 0;
    const max = 100;
    const result = calculateCrossProductPercentage(value, max);
    expect(result).toBe(0);
  });

  it("should return 50 when max is half of value", () => {
    const value = 50;
    const max = 100;
    const result = calculateCrossProductPercentage(value, max);
    expect(result).toBe(50);
  });

  it("should return 100 when value equals max", () => {
    const value = 100;
    const max = 100;
    const result = calculateCrossProductPercentage(value, max);
    expect(result).toBe(100);
  });

  it("should handle decimal values correctly", () => {
    const value = 33.33;
    const max = 100;
    const result = calculateCrossProductPercentage(value, max);
    expect(result).toBeCloseTo(33.33, 2);
  });
});

describe("Helpers: formatNumberWithCommas", () => {
  it("should format positive numbers correctly", () => {
    expect(formatNumberWithCommas(1000)).toBe("1,000");
    expect(formatNumberWithCommas(1000000)).toBe("1,000,000");
    expect(formatNumberWithCommas(123456789)).toBe("123,456,789");
  });

  it("should format negative numbers correctly", () => {
    expect(formatNumberWithCommas(-1000)).toBe("-1,000");
    expect(formatNumberWithCommas(-1000000)).toBe("-1,000,000");
    expect(formatNumberWithCommas(-123456789)).toBe("-123,456,789");
  });

  it("should format numbers less than 1000 without commas", () => {
    expect(formatNumberWithCommas(999)).toBe("999");
    expect(formatNumberWithCommas(-999)).toBe("-999");
    expect(formatNumberWithCommas(0)).toBe("0");
  });

  it("should format very large numbers correctly", () => {
    expect(formatNumberWithCommas(1000000000)).toBe("1,000,000,000");
    expect(formatNumberWithCommas(-1000000000)).toBe("-1,000,000,000");
  });
});

describe("Helpers: join", () => {
  it("Basic behavior, join array of string with space", () => {
    expect(join(["hello", "world"])).toBe("hello world");
  });

  it("Doesn't break for an empty array", () => {
    expect(join([])).toBe("");
  });

  it("Only one element", () => {
    expect(join(["hello"])).toBe("hello");
  });

  it("Empty string", () => {
    expect(join(["hello", "", "world"])).toBe("hello  world");
  });

  it("elements contains spaces", () => {
    expect(join(["hello world", "great world"])).toBe(
      "hello world great world"
    );
  });

  it("Array of numbers", () => {
    expect(join([1, 3, 123, 0])).toBe("1 3 123 0");
  });

  it("Mix of numbers and string", () => {
    expect(join([1, "hello", 123, "0"])).toBe("1 hello 123 0");
  });
});
