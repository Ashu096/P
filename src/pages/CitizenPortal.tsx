import { motion } from "framer-motion";
import { Globe, Wind, Droplets, Volume2, MapPin, TrendingDown, TrendingUp, Minus, Search } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const cityData = [
  { city: "Raipur", aqi: 142, water: 6.2, noise: 68, trend: "up" },
  { city: "Bilaspur", aqi: 78, water: 7.0, noise: 55, trend: "down" },
  { city: "Korba", aqi: 165, water: 5.8, noise: 72, trend: "up" },
  { city: "Durg", aqi: 95, water: 6.8, noise: 62, trend: "stable" },
  { city: "Jagdalpur", aqi: 35, water: 7.2, noise: 42, trend: "down" },
  { city: "Ambikapur", aqi: 42, water: 7.1, noise: 38, trend: "stable" },
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

const CitizenPortal = () => (
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

      {/* City Cards */}
      <h2 className="text-lg font-semibold text-foreground mb-4">City-wise Air Quality</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cityData.map((city, i) => {
          const aqiInfo = getAqiStatus(city.aqi);
          const TrendIcon = trendIcon[city.trend as keyof typeof trendIcon];
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
              <div className="flex items-baseline gap-2 mb-3">
                <span className={`data-value ${aqiInfo.color}`}>{city.aqi}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${aqiInfo.bg}/10 ${aqiInfo.color} font-medium`}>
                  {aqiInfo.label}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>pH {city.water}</span>
                <span>{city.noise} dB</span>
              </div>
            </motion.div>
          );
        })}
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

export default CitizenPortal;
