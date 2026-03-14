import { Wind, Droplets, Volume2, Thermometer, Eye, Factory } from "lucide-react";
import StatCard from "@/components/StatCard";
import PollutionChart from "@/components/PollutionChart";
import AlertsPanel from "@/components/AlertsPanel";
import HeatmapRegion from "@/components/HeatmapRegion";

const Dashboard = () => (
  <div className="min-h-screen pt-20 pb-10">
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Environmental Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time monitoring across Chhattisgarh • Last updated: just now</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Air Quality Index" value="54" unit="AQI" icon={Wind} status="moderate" trend="↓ 12%" delay={0} />
        <StatCard title="Water pH Level" value="6.8" icon={Droplets} status="good" trend="→ Stable" delay={0.1} />
        <StatCard title="Noise Level" value="48" unit="dB" icon={Volume2} status="good" trend="↓ 5%" delay={0.2} />
        <StatCard title="Temperature" value="32" unit="°C" icon={Thermometer} status="moderate" trend="↑ 2°" delay={0.3} />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="PM2.5" value="23" unit="µg/m³" icon={Eye} status="good" delay={0.1} />
        <StatCard title="SO₂" value="18" unit="ppb" icon={Factory} status="good" delay={0.15} />
        <StatCard title="NO₂" value="42" unit="ppb" icon={Factory} status="moderate" delay={0.2} />
        <StatCard title="Active Stations" value="142" unit="/148" icon={Eye} status="good" delay={0.25} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <PollutionChart dataKey="aqi" color="hsl(38, 92%, 50%)" title="AQI Trend (24h)" />
        <PollutionChart dataKey="water" color="hsl(200, 80%, 55%)" title="Water pH Trend (24h)" />
        <PollutionChart dataKey="noise" color="hsl(160, 60%, 45%)" title="Noise Level Trend (24h)" />
      </div>

      {/* Map + Alerts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <HeatmapRegion />
        <AlertsPanel />
      </div>
    </div>
  </div>
);

export default Dashboard;
