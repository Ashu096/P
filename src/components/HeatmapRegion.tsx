import { motion } from "framer-motion";

const regions = [
  { name: "Raipur", aqi: 142, risk: "high", x: 55, y: 40 },
  { name: "Bilaspur", aqi: 78, risk: "moderate", x: 60, y: 25 },
  { name: "Korba", aqi: 165, risk: "high", x: 70, y: 20 },
  { name: "Bhilai", aqi: 120, risk: "moderate", x: 45, y: 45 },
  { name: "Durg", aqi: 95, risk: "moderate", x: 40, y: 42 },
  { name: "Jagdalpur", aqi: 35, risk: "low", x: 55, y: 75 },
  { name: "Ambikapur", aqi: 42, risk: "low", x: 65, y: 10 },
  { name: "Rajnandgaon", aqi: 68, risk: "moderate", x: 30, y: 40 },
];

const riskColors = {
  low: { bg: "bg-success", ring: "ring-success/30", text: "text-success" },
  moderate: { bg: "bg-warning", ring: "ring-warning/30", text: "text-warning" },
  high: { bg: "bg-destructive", ring: "ring-destructive/30", text: "text-destructive" },
};

const HeatmapRegion = () => (
  <div className="glass-card p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-foreground">Regional Pollution Map — Chhattisgarh</h3>
      <div className="flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Good</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Moderate</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" /> Poor</span>
      </div>
    </div>
    <div className="relative w-full aspect-[4/3] bg-secondary/50 rounded-xl overflow-hidden grid-pattern">
      {/* Chhattisgarh outline approximation */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <path
          d="M40 5 L70 5 L80 15 L78 30 L82 45 L75 55 L80 70 L70 85 L55 90 L40 80 L30 65 L25 50 L28 35 L35 20 Z"
          fill="none"
          stroke="hsl(200, 15%, 25%)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>

      {regions.map((region, i) => {
        const colors = riskColors[region.risk as keyof typeof riskColors];
        return (
          <motion.div
            key={region.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
            className="absolute group cursor-pointer"
            style={{ left: `${region.x}%`, top: `${region.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className={`w-4 h-4 rounded-full ${colors.bg} ring-4 ${colors.ring} opacity-80`} />
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 hidden group-hover:block z-10">
              <div className="bg-card border border-border rounded-lg px-3 py-2 text-center shadow-lg whitespace-nowrap">
                <p className="text-xs font-semibold text-foreground">{region.name}</p>
                <p className={`text-sm font-mono font-bold ${colors.text}`}>AQI {region.aqi}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default HeatmapRegion;
