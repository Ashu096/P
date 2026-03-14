import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const hourlyData = [
  { time: "00:00", aqi: 42, water: 6.8, noise: 45 },
  { time: "03:00", aqi: 38, water: 6.9, noise: 35 },
  { time: "06:00", aqi: 55, water: 7.0, noise: 52 },
  { time: "09:00", aqi: 78, water: 6.5, noise: 68 },
  { time: "12:00", aqi: 95, water: 6.2, noise: 72 },
  { time: "15:00", aqi: 110, water: 6.0, noise: 75 },
  { time: "18:00", aqi: 88, water: 6.3, noise: 70 },
  { time: "21:00", aqi: 62, water: 6.7, noise: 55 },
  { time: "Now", aqi: 54, water: 6.8, noise: 48 },
];

interface PollutionChartProps {
  dataKey: "aqi" | "water" | "noise";
  color: string;
  title: string;
}

const PollutionChart = ({ dataKey, color, title }: PollutionChartProps) => (
  <div className="glass-card p-5">
    <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={hourlyData}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 18%)" />
        <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(200, 10%, 55%)" }} axisLine={false} />
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
        <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#grad-${dataKey})`} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default PollutionChart;
