import { describe, it, expect } from "vitest";
import { getStrategy } from "./strategyLogic";

describe("getStrategy", () => {
  it("recommends a 1-stop for low degradation with no rain", () => {
    const result = getStrategy(55, "low", 0);
    expect(result.stops).toBe("1-Stop");
    expect(result.tires).toEqual(["Medium", "Hard"]);
  });

  it("recommends a 2-stop for high degradation with no rain", () => {
    const result = getStrategy(55, "high", 0);
    expect(result.stops).toBe("2-Stop");
    expect(result.tires).toEqual(["Soft", "Medium", "Hard"]);
  });

  it("recommends a 2-stop for medium degradation on a long race", () => {
    const result = getStrategy(70, "medium", 0);
    expect(result.stops).toBe("2-Stop");
  });

  it("recommends a 1-stop for medium degradation on a short race", () => {
    const result = getStrategy(50, "medium", 0);
    expect(result.stops).toBe("1-Stop");
  });

  it("forces a reactive wet strategy when rain probability is high", () => {
    const result = getStrategy(55, "low", 75);
    expect(result.stops).toBe("Reactive (Wet)");
  });

  it("keeps a dry strategy but adds a rain warning at moderate rain probability", () => {
    const result = getStrategy(55, "low", 40);
    expect(result.stops).toBe("1-Stop");
    expect(result.note).toContain("chance of rain");
  });
});