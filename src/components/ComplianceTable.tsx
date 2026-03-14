import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const industries = [
  { name: "Bhilai Steel Plant", region: "Durg", type: "Steel", compliance: "non-compliant", lastReport: "2026-02-28", violations: 3 },
  { name: "Korba Thermal Power", region: "Korba", type: "Power", compliance: "warning", lastReport: "2026-03-10", violations: 1 },
  { name: "ACC Cement Jamul", region: "Bhilai", type: "Cement", compliance: "compliant", lastReport: "2026-03-12", violations: 0 },
  { name: "BALCO Aluminium", region: "Korba", type: "Aluminium", compliance: "compliant", lastReport: "2026-03-13", violations: 0 },
  { name: "Raipur Ferro Alloys", region: "Raipur", type: "Ferro Alloy", compliance: "non-compliant", lastReport: "2026-01-15", violations: 5 },
  { name: "Ultratech Cement", region: "Raipur", type: "Cement", compliance: "warning", lastReport: "2026-03-08", violations: 2 },
];

const complianceBadge = {
  "compliant": "bg-success/10 text-success border-success/20",
  "warning": "bg-warning/10 text-warning border-warning/20",
  "non-compliant": "bg-destructive/10 text-destructive border-destructive/20",
};

const ComplianceTable = () => (
  <div className="glass-card p-5 overflow-x-auto">
    <h3 className="text-sm font-semibold text-foreground mb-4">Industry Compliance Tracker</h3>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left py-3 px-2 text-muted-foreground font-medium">Industry</th>
          <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Region</th>
          <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden md:table-cell">Type</th>
          <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
          <th className="text-right py-3 px-2 text-muted-foreground font-medium">Violations</th>
        </tr>
      </thead>
      <tbody>
        {industries.map((ind, i) => (
          <motion.tr
            key={ind.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
          >
            <td className="py-3 px-2 font-medium text-foreground">{ind.name}</td>
            <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{ind.region}</td>
            <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">{ind.type}</td>
            <td className="py-3 px-2">
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${complianceBadge[ind.compliance as keyof typeof complianceBadge]}`}>
                {ind.compliance}
              </span>
            </td>
            <td className="py-3 px-2 text-right font-mono">{ind.violations}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ComplianceTable;
