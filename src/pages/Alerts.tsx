import { motion } from "framer-motion";
import { Bell, AlertTriangle, CheckCircle, Clock, XCircle, Filter } from "lucide-react";

const allAlerts = [
  { id: 1, type: "critical", title: "AQI Critical — Raipur Industrial Zone", message: "Station R-04 reported AQI 218, exceeding prescribed limit of 100. Immediate action required.", time: "2 min ago", station: "R-04" },
  { id: 2, type: "critical", title: "SO₂ Spike — Korba Thermal", message: "SO₂ concentration reached 142 ppb, 3x above the hourly limit. Source: Korba Thermal Power Station.", time: "8 min ago", station: "K-11" },
  { id: 3, type: "warning", title: "Water pH Below Threshold", message: "Kharoon River monitoring point showing pH 5.8 (limit: 6.5-8.5). Potential industrial discharge.", time: "15 min ago", station: "W-03" },
  { id: 4, type: "warning", title: "Noise Violation — Bhilai", message: "Continuous noise level 78 dB near residential zone (limit: 55 dB nighttime).", time: "32 min ago", station: "N-07" },
  { id: 5, type: "info", title: "Monthly Reports Pending", message: "12 industries have not submitted their March 2026 compliance reports. Automated reminders sent.", time: "1 hour ago", station: "—" },
  { id: 6, type: "info", title: "Sensor Maintenance Due", message: "4 air quality sensors require calibration. Scheduled for March 18.", time: "2 hours ago", station: "—" },
  { id: 7, type: "resolved", title: "PM2.5 Normalized — Durg", message: "PM2.5 levels returned to 35 µg/m³ after peaking at 120 µg/m³ earlier today.", time: "3 hours ago", station: "D-02" },
  { id: 8, type: "resolved", title: "SO₂ Levels Normalized — Korba", message: "SO₂ concentration at Station K-11 dropped to 28 ppb after plant shutdown.", time: "5 hours ago", station: "K-11" },
];

const typeConfig = {
  critical: { icon: XCircle, color: "text-destructive", bg: "border-destructive/30 bg-destructive/5" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "border-warning/30 bg-warning/5" },
  info: { icon: Clock, color: "text-info", bg: "border-info/30 bg-info/5" },
  resolved: { icon: CheckCircle, color: "text-success", bg: "border-success/30 bg-success/5" },
};

const Alerts = () => (
  <div className="min-h-screen pt-20 pb-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Bell className="w-7 h-7 text-primary" /> Alerts Center
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Environmental alerts and notifications</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-primary">
          <div className="pulse-dot" /> Live Monitoring
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Critical", count: 2, type: "critical" as const },
          { label: "Warnings", count: 2, type: "warning" as const },
          { label: "Info", count: 2, type: "info" as const },
          { label: "Resolved", count: 2, type: "resolved" as const },
        ].map((s) => {
          const cfg = typeConfig[s.type];
          return (
            <div key={s.label} className={`glass-card p-4 border ${cfg.bg}`}>
              <p className={`data-value ${cfg.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {allAlerts.map((alert, i) => {
          const cfg = typeConfig[alert.type as keyof typeof typeConfig];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card p-5 border ${cfg.bg}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.color}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-2">Station: {alert.station}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Alerts;
