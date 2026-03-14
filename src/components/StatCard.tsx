import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  status: "good" | "moderate" | "poor";
  trend?: string;
  delay?: number;
}

const statusColors = {
  good: "text-success",
  moderate: "text-warning",
  poor: "text-destructive",
};

const statusBg = {
  good: "bg-success/10 border-success/20",
  moderate: "bg-warning/10 border-warning/20",
  poor: "bg-destructive/10 border-destructive/20",
};

const StatCard = ({ title, value, unit, icon: Icon, status, trend, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`glass-card p-5 ${statusBg[status]}`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2 rounded-lg ${statusBg[status]}`}>
        <Icon className={`w-5 h-5 ${statusColors[status]}`} />
      </div>
      {trend && (
        <span className={`text-xs font-mono ${statusColors[status]}`}>{trend}</span>
      )}
    </div>
    <p className="text-sm text-muted-foreground mb-1">{title}</p>
    <div className="flex items-baseline gap-1">
      <span className={`data-value ${statusColors[status]}`}>{value}</span>
      {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
    </div>
  </motion.div>
);

export default StatCard;
