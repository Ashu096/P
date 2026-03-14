export type CopilotRole = "user" | "assistant";

export type CopilotPollutant = "PM2.5" | "SO2" | "NOx" | "CO2e";

export type CopilotSimulation = {
  industry: string;
  reductionPct: number;
  baselineAqi: number;
  newAqi: number;
  aqiDelta: number;
  aqiDeltaPct: number;
  pollutantIndex: Array<{
    pollutant: CopilotPollutant;
    baseline: number;
    next: number;
    delta: number;
    deltaPct: number;
  }>;
  assumptions: string[];
  confidence: "low" | "medium";
};

type IndustryProfile = {
  label: string;
  aliases: string[];
  overallShare: number; // share of overall ambient pollution drivers (0..1)
  pollutantShare: Record<CopilotPollutant, number>; // share of statewide emissions by pollutant (0..1)
};

const BASELINE_AQI = 89;
const BASELINE_POLLUTANT_INDEX = 100;

// Note: These are heuristic shares used for "what-if" exploration only.
const INDUSTRY_PROFILES: IndustryProfile[] = [
  {
    label: "Thermal Power",
    aliases: ["thermal", "power", "thermal power", "coal", "power station", "power plant"],
    overallShare: 0.28,
    pollutantShare: { "PM2.5": 0.26, SO2: 0.42, NOx: 0.36, CO2e: 0.48 },
  },
  {
    label: "Steel Manufacturing",
    aliases: ["steel", "steel plant", "steel manufacturing", "iron and steel", "blast furnace"],
    overallShare: 0.18,
    pollutantShare: { "PM2.5": 0.18, SO2: 0.09, NOx: 0.14, CO2e: 0.17 },
  },
  {
    label: "Cement Production",
    aliases: ["cement", "cement plant", "cement production", "clinker"],
    overallShare: 0.12,
    pollutantShare: { "PM2.5": 0.14, SO2: 0.05, NOx: 0.11, CO2e: 0.09 },
  },
  {
    label: "Aluminium Smelting",
    aliases: ["aluminium", "aluminum", "smelting", "aluminium smelting"],
    overallShare: 0.06,
    pollutantShare: { "PM2.5": 0.05, SO2: 0.06, NOx: 0.04, CO2e: 0.06 },
  },
  {
    label: "Mining & Minerals",
    aliases: ["mining", "coal mining", "ore", "minerals", "quarry"],
    overallShare: 0.1,
    pollutantShare: { "PM2.5": 0.16, SO2: 0.02, NOx: 0.05, CO2e: 0.03 },
  },
  {
    label: "Transport",
    aliases: ["transport", "vehicles", "road", "traffic", "diesel", "trucks"],
    overallShare: 0.16,
    pollutantShare: { "PM2.5": 0.12, SO2: 0.01, NOx: 0.23, CO2e: 0.18 },
  },
  {
    label: "Agriculture",
    aliases: ["agriculture", "farming", "crop", "stubble", "burning"],
    overallShare: 0.1,
    pollutantShare: { "PM2.5": 0.06, SO2: 0.0, NOx: 0.01, CO2e: 0.04 },
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function extractReductionPct(text: string): number | null {
  const normalized = text.toLowerCase();
  const pctMatch = normalized.match(/(-?\d+(?:\.\d+)?)\s*%/);
  if (pctMatch?.[1]) return clamp(Number(pctMatch[1]), 0, 100);

  const percentWordMatch = normalized.match(/(-?\d+(?:\.\d+)?)\s*(?:percent|per\s*cent)\b/);
  if (percentWordMatch?.[1]) return clamp(Number(percentWordMatch[1]), 0, 100);

  return null;
}

export function detectIndustry(text: string): IndustryProfile | null {
  const normalized = text.toLowerCase();

  // Prefer explicit "industry X" phrasing if present.
  const industryPhrase = normalized.match(/\bindustry\s+([a-z0-9\s&/-]{2,80})/);
  if (industryPhrase?.[1]) {
    const phrase = industryPhrase[1].trim();
    const exact = INDUSTRY_PROFILES.find((p) => p.aliases.some((a) => phrase.includes(a)));
    if (exact) return exact;
  }

  // Otherwise, match by aliases anywhere in text.
  for (const profile of INDUSTRY_PROFILES) {
    if (profile.aliases.some((a) => normalized.includes(a))) return profile;
  }

  return null;
}

export function simulateEnvironmentalImpact(input: {
  question: string;
  baselineAqi?: number;
}): CopilotSimulation | { error: string; followups: string[] } {
  const reductionPct = extractReductionPct(input.question);
  const industry = detectIndustry(input.question);

  if (!industry && reductionPct == null) {
    return {
      error: "Tell me the industry and the % emissions reduction to simulate.",
      followups: [
        "If thermal power reduces emissions by 30%, how will pollution levels change?",
        "If steel manufacturing cuts emissions by 20%, what happens to AQI?",
      ],
    };
  }

  if (!industry) {
    return {
      error: `Which industry should I simulate? Try: ${INDUSTRY_PROFILES.map((p) => p.label).join(", ")}.`,
      followups: [
        "Simulate thermal power with 30% reduction",
        "Simulate cement production with 15% reduction",
      ],
    };
  }

  if (reductionPct == null) {
    return {
      error: "What % reduction should I apply (e.g., 30%)?",
      followups: ["Reduce by 10%", "Reduce by 30%", "Reduce by 50%"],
    };
  }

  const baselineAqi = input.baselineAqi ?? BASELINE_AQI;

  // Converts emissions reduction to *ambient* change; accounts for meteorology, secondary formation, and other sources.
  const ambientTransferFactor = 0.65;
  const overallReduction = clamp(
    industry.overallShare * (reductionPct / 100) * ambientTransferFactor,
    0,
    0.95,
  );

  const newAqi = Math.max(0, Math.round(baselineAqi * (1 - overallReduction)));
  const aqiDelta = newAqi - baselineAqi;
  const aqiDeltaPct = baselineAqi === 0 ? 0 : (aqiDelta / baselineAqi) * 100;

  const pollutantIndex = (["PM2.5", "SO2", "NOx", "CO2e"] as const).map((pollutant) => {
    const pollutantReduction = clamp(industry.pollutantShare[pollutant] * (reductionPct / 100), 0, 0.95);
    const next = Math.round(BASELINE_POLLUTANT_INDEX * (1 - pollutantReduction));
    const delta = next - BASELINE_POLLUTANT_INDEX;
    const deltaPct = (delta / BASELINE_POLLUTANT_INDEX) * 100;
    return { pollutant, baseline: BASELINE_POLLUTANT_INDEX, next, delta, deltaPct };
  });

  const assumptions = [
    `Baseline AQI is assumed at ${baselineAqi} (edit baseline in the prompt for a specific city/season).`,
    "Industry shares are heuristic and meant for scenario exploration, not regulatory reporting.",
    "Ambient response is damped (transfer factor) because pollution depends on weather, chemistry, and other sources.",
  ];

  return {
    industry: industry.label,
    reductionPct,
    baselineAqi,
    newAqi,
    aqiDelta,
    aqiDeltaPct,
    pollutantIndex,
    assumptions,
    confidence: "low",
  };
}

export function formatCopilotReply(result: ReturnType<typeof simulateEnvironmentalImpact>): {
  text: string;
  simulation?: CopilotSimulation;
  followups?: string[];
} {
  if ("error" in result) {
    return {
      text: result.error,
      followups: result.followups,
    };
  }

  const pm = result.pollutantIndex.find((p) => p.pollutant === "PM2.5");
  const aqiLine = `Estimated AQI: ${result.baselineAqi} → ${result.newAqi} (${result.aqiDelta > 0 ? "+" : ""}${result.aqiDelta} / ${result.aqiDeltaPct.toFixed(1)}%).`;
  const headline = `Simulated impact for **${result.industry}** with **${result.reductionPct}%** emissions reduction.`;
  const pmLine = pm
    ? `PM2.5 index (relative): ${pm.baseline} → ${pm.next} (${pm.deltaPct.toFixed(1)}%).`
    : "";

  const assumptions = result.assumptions.map((a) => `- ${a}`).join("\n");

  return {
    text: [headline, aqiLine, pmLine, "", "Assumptions:", assumptions].filter(Boolean).join("\n"),
    simulation: result,
    followups: [
      `What if ${result.industry} reduces emissions by ${Math.min(80, result.reductionPct + 20)}%?`,
      "Show pollutant-by-pollutant changes",
      "How to reach compliance faster?",
    ],
  };
}

