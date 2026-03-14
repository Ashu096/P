import { describe, expect, it } from "vitest";
import { detectIndustry, extractReductionPct, simulateEnvironmentalImpact } from "@/lib/complianceCopilot";

describe("complianceCopilot", () => {
  it("extracts reduction percent", () => {
    expect(extractReductionPct("reduce emissions by 30%")).toBe(30);
    expect(extractReductionPct("cut by 12.5 percent")).toBe(12.5);
    expect(extractReductionPct("no percent here")).toBe(null);
  });

  it("detects industry by alias", () => {
    expect(detectIndustry("thermal power reduces emissions")).not.toBeNull();
    expect(detectIndustry("steel plant reduces emissions")).not.toBeNull();
    expect(detectIndustry("unknown sector reduces emissions")).toBeNull();
  });

  it("simulates aqi decrease when reduction applied", () => {
    const res = simulateEnvironmentalImpact({
      question: "If thermal power reduces emissions by 30%, how will pollution levels change?",
      baselineAqi: 100,
    });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.newAqi).toBeLessThan(res.baselineAqi);
      expect(res.reductionPct).toBe(30);
      expect(res.industry.toLowerCase()).toContain("thermal");
    }
  });
});

