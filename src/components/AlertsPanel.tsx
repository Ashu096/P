import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

const alerts = [
  { id: 1, type: "critical", message: "AQI exceeds 200 at Station R-04, Raipur Industrial Zone", time: "2 min ago", icon: XCircle },
  { id: 2, type: "warning", message: "Water pH dropped below 6.0 at Kharoon River monitoring point", time: "15 min ago", icon: AlertTriangle },
  { id: 3, type: "warning", message: "Noise levels above 75 dB near Bhilai Steel Plant", time: "32 min ago", icon: AlertTriangle },
  { id: 4, type: "info", message: "Monthly compliance report pending for 12 industries", time: "1 hour ago", icon: Clock },
  { id: 5, type: "resolved", message: "SO₂ levels normalized at Korba Thermal Station", time: "2 hours ago", icon: CheckCircle },
];

const typeStyles = {
  critical: "border-destructive/30 bg-destructive/5",
  warning: "border-warning/30 bg-warning/5",
  info: "border-info/30 bg-info/5",
  resolved: "border-success/30 bg-success/5",
};

const iconColors = {
  critical: "text-destructive",
  warning: "text-warning",
  info: "text-info",
  resolved: "text-success",
};

const AlertsPanel = () => (
  <div className="glass-card p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-foreground">Recent Alerts</h3>
      <span className="text-xs font-mono text-primary">Live</span>
    </div>
    <div className="space-y-3">
      {alerts.map((alert, i) => {
        const Icon = alert.icon;
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-start gap-3 p-3 rounded-lg border ${typeStyles[alert.type as keyof typeof typeStyles]}`}
          >
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconColors[alert.type as keyof typeof iconColors]}`} />
            <div className="min-w-0">
              <p className="text-sm text-foreground leading-tight">{alert.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default AlertsPanel;
