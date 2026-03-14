import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import ComplianceTable from "@/components/ComplianceTable";

const summaryCards = [
  { label: "Total Industries", value: "2,412", icon: Shield, color: "text-primary" },
  { label: "Compliant", value: "1,847", icon: CheckCircle, color: "text-success" },
  { label: "Warnings", value: "389", icon: AlertTriangle, color: "text-warning" },
  { label: "Non-Compliant", value: "176", icon: XCircle, color: "text-destructive" },
];

const Compliance = () => (
  <div className="min-h-screen pt-20 pb-10">
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Compliance Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Track industry compliance against prescribed environmental limits</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <c.icon className={`w-5 h-5 ${c.color} mb-2`} />
            <p className={`data-value ${c.color}`}>{c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </motion.div>
        ))}
      </div>

      <ComplianceTable />
    </div>
  </div>
);

export default Compliance;
