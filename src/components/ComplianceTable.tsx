import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

const industries = [
  {
    name: "Bhilai Steel Plant", region: "Durg", type: "Steel", compliance: "non-compliant", lastReport: "2026-02-28", violations: 3,
    violationDetails: [
      { parameter: "PM2.5 Emissions", limit: "50 µg/m³", actual: "112 µg/m³", severity: "critical" },
      { parameter: "SO₂ Emissions", limit: "80 ppb", actual: "145 ppb", severity: "critical" },
      { parameter: "Effluent pH", limit: "6.5–8.5", actual: "5.2", severity: "major" },
    ]
  },
  {
    name: "Korba Thermal Power", region: "Korba", type: "Power", compliance: "warning", lastReport: "2026-03-10", violations: 1,
    violationDetails: [
      { parameter: "Fly Ash Utilisation", limit: "≥80%", actual: "62%", severity: "moderate" },
    ]
  },
  {
    name: "ACC Cement Jamul", region: "Bhilai", type: "Cement", compliance: "compliant", lastReport: "2026-03-12", violations: 0,
    violationDetails: []
  },
  {
    name: "BALCO Aluminium", region: "Korba", type: "Aluminium", compliance: "compliant", lastReport: "2026-03-13", violations: 0,
    violationDetails: []
  },
  {
    name: "Raipur Ferro Alloys", region: "Raipur", type: "Ferro Alloy", compliance: "non-compliant", lastReport: "2026-01-15", violations: 5,
    violationDetails: [
      { parameter: "PM10 Emissions", limit: "100 µg/m³", actual: "280 µg/m³", severity: "critical" },
      { parameter: "CO Emissions", limit: "2 mg/m³", actual: "5.8 mg/m³", severity: "critical" },
      { parameter: "Noise Level", limit: "75 dB", actual: "92 dB", severity: "major" },
      { parameter: "Wastewater BOD", limit: "30 mg/L", actual: "68 mg/L", severity: "major" },
      { parameter: "Hazardous Waste Storage", limit: "Licensed facility", actual: "Open dump", severity: "critical" },
    ]
  },
  {
    name: "Ultratech Cement", region: "Raipur", type: "Cement", compliance: "warning", lastReport: "2026-03-08", violations: 2,
    violationDetails: [
      { parameter: "Dust Emissions", limit: "50 mg/Nm³", actual: "78 mg/Nm³", severity: "moderate" },
      { parameter: "Stack Height", limit: "30m min", actual: "22m", severity: "moderate" },
    ]
  },
  {
    name: "Lafarge Cement Sonadih", region: "Baloda Bazar", type: "Cement", compliance: "compliant", lastReport: "2026-03-11", violations: 0,
    violationDetails: []
  },
  {
    name: "NTPC Sipat", region: "Bilaspur", type: "Power", compliance: "warning", lastReport: "2026-03-09", violations: 1,
    violationDetails: [
      { parameter: "Thermal Discharge", limit: "≤5°C rise", actual: "7.2°C rise", severity: "moderate" },
    ]
  },
];

const complianceBadge = {
  "compliant": "bg-success/10 text-success border-success/20",
  "warning": "bg-warning/10 text-warning border-warning/20",
  "non-compliant": "bg-destructive/10 text-destructive border-destructive/20",
};

const severityColors = {
  critical: "text-destructive",
  major: "text-warning",
  moderate: "text-info",
};

const ComplianceTable = () => {
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = industries.filter((ind) =>
    ind.name.toLowerCase().includes(search.toLowerCase()) ||
    ind.region.toLowerCase().includes(search.toLowerCase()) ||
    ind.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-card p-5 overflow-x-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-sm font-semibold text-foreground">Industry Compliance Tracker</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search industry, region, type..."
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

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-2 text-muted-foreground font-medium">Industry</th>
            <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Region</th>
            <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden md:table-cell">Type</th>
            <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
            <th className="text-right py-3 px-2 text-muted-foreground font-medium">Violations</th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((ind, i) => {
            const isExpanded = expandedRow === ind.name;
            return (
              <>
                <motion.tr
                  key={ind.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer ${isExpanded ? "bg-secondary/30" : ""}`}
                  onClick={() => setExpandedRow(isExpanded ? null : ind.name)}
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
                  <td className="py-3 px-2">
                    {ind.violations > 0 && (
                      isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </td>
                </motion.tr>
                <AnimatePresence>
                  {isExpanded && ind.violationDetails.length > 0 && (
                    <motion.tr
                      key={`${ind.name}-details`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan={6} className="px-2 py-3 bg-secondary/20">
                        <div className="rounded-lg border border-border overflow-hidden">
                          <div className="px-3 py-2 bg-secondary/50 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                            <span className="text-xs font-semibold text-foreground">Violation Details</span>
                          </div>
                          <div className="divide-y divide-border/50">
                            {ind.violationDetails.map((v, vi) => (
                              <div key={vi} className="px-3 py-2 flex items-center justify-between text-xs gap-2 flex-wrap">
                                <span className="font-medium text-foreground flex-1 min-w-[120px]">{v.parameter}</span>
                                <span className="text-muted-foreground">Limit: <span className="text-foreground">{v.limit}</span></span>
                                <span className={`font-mono font-bold ${severityColors[v.severity as keyof typeof severityColors]}`}>Actual: {v.actual}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                                  v.severity === "critical" ? "bg-destructive/10 text-destructive" :
                                  v.severity === "major" ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
                                }`}>{v.severity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </>
            );
          })}
        </tbody>
      </table>
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-8">No industries found matching "{search}"</p>
      )}
    </div>
  );
};

export default ComplianceTable;
