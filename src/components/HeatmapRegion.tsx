import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Wind, Droplets, Volume2, Thermometer, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const allDistricts = [
  { name: "Raipur", aqi: 142, water: 6.2, noise: 68, temp: 34, risk: "high", x: 55, y: 45, population: "10.1L", industries: 312 },
  { name: "Bilaspur", aqi: 78, water: 7.0, noise: 55, temp: 31, risk: "moderate", x: 58, y: 28, population: "6.2L", industries: 145 },
  { name: "Korba", aqi: 165, water: 5.8, noise: 72, temp: 33, risk: "high", x: 68, y: 22, population: "3.6L", industries: 89 },
  { name: "Durg", aqi: 95, water: 6.8, noise: 62, temp: 32, risk: "moderate", x: 42, y: 44, population: "4.2L", industries: 198 },
  { name: "Bhilai-Charoda", aqi: 120, water: 6.5, noise: 66, temp: 33, risk: "moderate", x: 44, y: 47, population: "6.8L", industries: 210 },
  { name: "Jagdalpur", aqi: 35, water: 7.2, noise: 42, temp: 29, risk: "low", x: 58, y: 78, population: "1.4L", industries: 32 },
  { name: "Ambikapur", aqi: 42, water: 7.1, noise: 38, temp: 28, risk: "low", x: 62, y: 12, population: "1.2L", industries: 28 },
  { name: "Rajnandgaon", aqi: 68, water: 6.9, noise: 50, temp: 31, risk: "moderate", x: 32, y: 42, population: "2.8L", industries: 95 },
  { name: "Janjgir-Champa", aqi: 88, water: 6.6, noise: 58, temp: 32, risk: "moderate", x: 65, y: 32, population: "2.4L", industries: 78 },
  { name: "Kabirdham", aqi: 45, water: 7.0, noise: 40, temp: 30, risk: "low", x: 28, y: 35, population: "1.5L", industries: 42 },
  { name: "Mahasamund", aqi: 55, water: 7.1, noise: 45, temp: 31, risk: "moderate", x: 62, y: 52, population: "1.8L", industries: 55 },
  { name: "Dhamtari", aqi: 48, water: 7.3, noise: 38, temp: 30, risk: "low", x: 55, y: 58, population: "1.3L", industries: 38 },
  { name: "Kanker", aqi: 38, water: 7.2, noise: 35, temp: 28, risk: "low", x: 48, y: 68, population: "1.1L", industries: 22 },
  { name: "Bastar", aqi: 32, water: 7.4, noise: 30, temp: 27, risk: "low", x: 52, y: 82, population: "0.8L", industries: 15 },
  { name: "Narayanpur", aqi: 28, water: 7.5, noise: 28, temp: 26, risk: "low", x: 42, y: 75, population: "0.5L", industries: 8 },
  { name: "Bijapur", aqi: 25, water: 7.5, noise: 25, temp: 27, risk: "low", x: 38, y: 85, population: "0.4L", industries: 5 },
  { name: "Dantewada", aqi: 30, water: 7.3, noise: 32, temp: 28, risk: "low", x: 48, y: 88, population: "0.7L", industries: 18 },
  { name: "Sukma", aqi: 26, water: 7.4, noise: 26, temp: 27, risk: "low", x: 55, y: 92, population: "0.3L", industries: 6 },
  { name: "Kondagaon", aqi: 33, water: 7.3, noise: 34, temp: 28, risk: "low", x: 50, y: 72, population: "0.6L", industries: 12 },
  { name: "Surguja", aqi: 50, water: 7.0, noise: 42, temp: 29, risk: "low", x: 58, y: 8, population: "2.3L", industries: 65 },
  { name: "Surajpur", aqi: 52, water: 6.9, noise: 44, temp: 30, risk: "moderate", x: 72, y: 12, population: "1.6L", industries: 48 },
  { name: "Balrampur", aqi: 40, water: 7.1, noise: 36, temp: 28, risk: "low", x: 68, y: 8, population: "1.0L", industries: 25 },
  { name: "Koriya", aqi: 55, water: 6.8, noise: 48, temp: 30, risk: "moderate", x: 72, y: 6, population: "1.4L", industries: 52 },
  { name: "Mungeli", aqi: 58, water: 6.9, noise: 46, temp: 31, risk: "moderate", x: 48, y: 30, population: "1.1L", industries: 35 },
  { name: "Balod", aqi: 52, water: 7.0, noise: 42, temp: 30, risk: "moderate", x: 38, y: 52, population: "1.2L", industries: 40 },
  { name: "Bemetara", aqi: 60, water: 6.8, noise: 48, temp: 31, risk: "moderate", x: 38, y: 38, population: "1.3L", industries: 45 },
  { name: "Gariaband", aqi: 42, water: 7.2, noise: 36, temp: 29, risk: "low", x: 62, y: 60, population: "0.9L", industries: 20 },
  { name: "Raigarh", aqi: 92, water: 6.5, noise: 60, temp: 33, risk: "moderate", x: 75, y: 28, population: "3.1L", industries: 120 },
];

const riskColors = {
  low: { bg: "bg-success", ring: "ring-success/30", text: "text-success" },
  moderate: { bg: "bg-warning", ring: "ring-warning/30", text: "text-warning" },
  high: { bg: "bg-destructive", ring: "ring-destructive/30", text: "text-destructive" },
};

const HeatmapRegion = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof allDistricts[0] | null>(null);

  const filtered = search
    ? allDistricts.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    : allDistricts;

  const highlighted = search ? filtered.map((d) => d.name) : [];

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-sm font-semibold text-foreground">Regional Pollution Map — Chhattisgarh</h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Good</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Moderate</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" /> Poor</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search district..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSelected(null); }}
          className="pl-9 bg-secondary border-border text-sm h-9"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {search && filtered.length > 0 && !selected && (
        <div className="mb-4 max-h-32 overflow-y-auto rounded-lg bg-secondary/80 border border-border">
          {filtered.map((d) => {
            const c = riskColors[d.risk as keyof typeof riskColors];
            return (
              <button
                key={d.name}
                onClick={() => { setSelected(d); setSearch(d.name); }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-secondary transition-colors text-left"
              >
                <span className="text-foreground font-medium">{d.name}</span>
                <span className={`text-xs font-mono ${c.text}`}>AQI {d.aqi}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Map */}
      <div className="relative w-full aspect-[4/3] bg-secondary/50 rounded-xl overflow-hidden grid-pattern">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
          <path
            d="M40 5 L70 5 L80 15 L78 30 L82 45 L75 55 L80 70 L70 85 L55 90 L40 80 L30 65 L25 50 L28 35 L35 20 Z"
            fill="none"
            stroke="hsl(200, 15%, 25%)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        </svg>

        {allDistricts.map((region, i) => {
          const colors = riskColors[region.risk as keyof typeof riskColors];
          const isHighlighted = highlighted.length === 0 || highlighted.includes(region.name);
          const isSelected = selected?.name === region.name;
          return (
            <motion.div
              key={region.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: isHighlighted ? 1 : 0.2 }}
              transition={{ delay: i * 0.03 + 0.1, type: "spring" }}
              className="absolute group cursor-pointer"
              style={{ left: `${region.x}%`, top: `${region.y}%`, transform: "translate(-50%, -50%)" }}
              onClick={() => { setSelected(region); setSearch(region.name); }}
            >
              <div className={`w-3 h-3 rounded-full ${colors.bg} ring-3 ${colors.ring} ${isSelected ? "ring-4 scale-150" : ""} transition-all`} />
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

      {/* Selected District Detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-xl bg-secondary/60 border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-bold text-foreground">{selected.name} District</h4>
              </div>
              <button onClick={() => { setSelected(null); setSearch(""); }}>
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-warning" />
                <div>
                  <p className={`text-sm font-mono font-bold ${riskColors[selected.risk as keyof typeof riskColors].text}`}>{selected.aqi}</p>
                  <p className="text-xs text-muted-foreground">AQI</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-info" />
                <div>
                  <p className="text-sm font-mono font-bold text-info">{selected.water}</p>
                  <p className="text-xs text-muted-foreground">Water pH</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-success" />
                <div>
                  <p className="text-sm font-mono font-bold text-foreground">{selected.noise} dB</p>
                  <p className="text-xs text-muted-foreground">Noise</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-destructive" />
                <div>
                  <p className="text-sm font-mono font-bold text-foreground">{selected.temp}°C</p>
                  <p className="text-xs text-muted-foreground">Temperature</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
              <span>Population: <span className="text-foreground font-medium">{selected.population}</span></span>
              <span>Industries: <span className="text-foreground font-medium">{selected.industries}</span></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeatmapRegion;
