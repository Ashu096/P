import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Wind, Droplets, Volume2, MapPin, TrendingDown, TrendingUp, Minus, Search, X, Info } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Input } from "@/components/ui/input";

const cityData = [
  { city: "Raipur", aqi: 142, water: 6.2, noise: 68, trend: "up" },
  { city: "Bilaspur", aqi: 78, water: 7.0, noise: 55, trend: "down" },
  { city: "Korba", aqi: 165, water: 5.8, noise: 72, trend: "up" },
  { city: "Durg", aqi: 95, water: 6.8, noise: 62, trend: "stable" },
  { city: "Jagdalpur", aqi: 35, water: 7.2, noise: 42, trend: "down" },
  { city: "Ambikapur", aqi: 42, water: 7.1, noise: 38, trend: "stable" },
  { city: "Rajnandgaon", aqi: 68, water: 6.9, noise: 50, trend: "down" },
  { city: "Raigarh", aqi: 92, water: 6.5, noise: 60, trend: "up" },
  { city: "Janjgir", aqi: 88, water: 6.6, noise: 58, trend: "stable" },
  { city: "Mahasamund", aqi: 55, water: 7.1, noise: 45, trend: "down" },
  { city: "Dhamtari", aqi: 48, water: 7.3, noise: 38, trend: "down" },
  { city: "Kanker", aqi: 38, water: 7.2, noise: 35, trend: "stable" },
];

const weeklyTrend = [
  { day: "Mon", aqi: 88, water: 6.5, noise: 58 },
  { day: "Tue", aqi: 92, water: 6.4, noise: 62 },
  { day: "Wed", aqi: 105, water: 6.2, noise: 65 },
  { day: "Thu", aqi: 98, water: 6.3, noise: 60 },
  { day: "Fri", aqi: 115, water: 6.0, noise: 70 },
  { day: "Sat", aqi: 78, water: 6.7, noise: 52 },
  { day: "Sun", aqi: 65, water: 6.9, noise: 45 },
];

const getAqiStatus = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "text-success", bg: "bg-success" };
  if (aqi <= 100) return { label: "Moderate", color: "text-warning", bg: "bg-warning" };
  return { label: "Poor", color: "text-destructive", bg: "bg-destructive" };
};

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };

const CitizenPortal = () => {
  const [search, setSearch] = useState("");

  const filtered = cityData.filter((c) =>
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-7 h-7 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Citizen Transparency Portal</h1>
          </div>
          <p className="text-muted-foreground text-sm">Public environmental data for all citizens of Chhattisgarh</p>
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <Wind className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="data-value text-warning">89</p>
            <p className="text-xs text-muted-foreground mt-1">State Avg. AQI</p>
          </div>
          <div className="glass-card p-5 text-center">
            <Droplets className="w-6 h-6 text-info mx-auto mb-2" />
            <p className="data-value text-info">6.5</p>
            <p className="text-xs text-muted-foreground mt-1">Avg. Water pH</p>
          </div>
          <div className="glass-card p-5 text-center">
            <Volume2 className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="data-value text-success">56</p>
            <p className="text-xs text-muted-foreground mt-1">Avg. Noise (dB)</p>
          </div>
        </div>

        {/* Safety Reference */}
        <div className="glass-card p-4 mb-8 border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Safety Reference Guide</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-semibold text-foreground mb-1.5">AQI (Air Quality Index) Levels</p>
              <div className="space-y-1 text-muted-foreground">
                <p><span className="inline-block w-2 h-2 rounded-full bg-success mr-1.5" />0–50: <span className="text-success font-medium">Good</span> — Minimal health risk</p>
                <p><span className="inline-block w-2 h-2 rounded-full bg-warning mr-1.5" />51–100: <span className="text-warning font-medium">Moderate</span> — Sensitive groups may be affected</p>
                <p><span className="inline-block w-2 h-2 rounded-full bg-destructive mr-1.5" />101–200: <span className="text-destructive font-medium">Unhealthy</span> — Everyone may experience effects</p>
                <p><span className="inline-block w-2 h-2 rounded-full bg-destructive mr-1.5" />200+: <span className="text-destructive font-medium">Hazardous</span> — Health emergency</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1.5">Water pH Levels</p>
              <div className="space-y-1 text-muted-foreground">
                <p><span className="inline-block w-2 h-2 rounded-full bg-success mr-1.5" />6.5–8.5: <span className="text-success font-medium">Safe</span> — WHO/BIS drinking water standard</p>
                <p><span className="inline-block w-2 h-2 rounded-full bg-warning mr-1.5" />6.0–6.5: <span className="text-warning font-medium">Slightly acidic</span> — May corrode pipes</p>
                <p><span className="inline-block w-2 h-2 rounded-full bg-destructive mr-1.5" />&lt;6.0 or &gt;8.5: <span className="text-destructive font-medium">Unsafe</span> — Not suitable for consumption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-foreground">City-wise Air Quality</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border text-sm h-9"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* City Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filtered.map((city, i) => {
            const aqiInfo = getAqiStatus(city.aqi);
            const TrendIcon = trendIcon[city.trend as keyof typeof trendIcon];
            const phSafe = city.water >= 6.5 && city.water <= 8.5;
            return (
              <motion.div
                key={city.city}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">{city.city}</h3>
                  </div>
                  <TrendIcon className={`w-4 h-4 ${aqiInfo.color}`} />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`data-value ${aqiInfo.color}`}>{city.aqi}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${aqiInfo.bg}/10 ${aqiInfo.color} font-medium`}>
                    {aqiInfo.label}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mb-3">
                  {city.aqi <= 50 ? "✅ Air quality is safe for all groups" :
                   city.aqi <= 100 ? "⚠️ Sensitive individuals should limit outdoor activity" :
                   "🚨 Unhealthy — avoid prolonged outdoor exposure"}
                </p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    pH {city.water}
                    <span className={`text-[10px] font-medium ${phSafe ? "text-success" : "text-destructive"}`}>
                      {phSafe ? "Safe" : "Unsafe"}
                    </span>
                  </span>
                  <span>{city.noise} dB</span>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground text-sm">
              No cities found matching "{search}"
            </div>
          )}
        </div>

        {/* Weekly Trends */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly AQI Trend (State Average)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 18%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(200, 10%, 55%)" }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(200, 10%, 55%)" }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(200, 18%, 10%)",
                    border: "1px solid hsl(200, 15%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(160, 20%, 92%)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="aqi" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Water pH Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyTrend}>
                <defs>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 18%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(200, 10%, 55%)" }} axisLine={false} />
                <YAxis domain={[5.5, 7.5]} tick={{ fontSize: 11, fill: "hsl(200, 10%, 55%)" }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(200, 18%, 10%)",
                    border: "1px solid hsl(200, 15%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(160, 20%, 92%)",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="water" stroke="hsl(200, 80%, 55%)" fill="url(#waterGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Banner */}
        <div className="glass-card p-6 mt-8 border-primary/20 glow-border text-center">
          <p className="text-sm text-muted-foreground">
            Data is sourced from <span className="text-primary font-semibold">148 monitoring stations</span> across Chhattisgarh and updated in real-time.
            For concerns or complaints, contact CECB at <span className="text-primary">cecb@cg.gov.in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CitizenPortal;
