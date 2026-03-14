import { motion } from "framer-motion";
import { Factory, MapPin, FileText, AlertTriangle } from "lucide-react";

const industries = [
  { name: "Bhilai Steel Plant", region: "Durg", type: "Steel Manufacturing", status: "non-compliant", emissions: "High", employees: "28,000+", lat: "21.2097", lng: "81.3784" },
  { name: "Korba Thermal Power Station", region: "Korba", type: "Thermal Power", status: "warning", emissions: "Moderate", employees: "5,200", lat: "22.3595", lng: "82.7501" },
  { name: "BALCO Aluminium", region: "Korba", type: "Aluminium Smelting", status: "compliant", emissions: "Low", employees: "3,400", lat: "22.3461", lng: "82.6836" },
  { name: "ACC Cement Jamul", region: "Bhilai", type: "Cement Production", status: "compliant", emissions: "Low", employees: "1,800", lat: "21.2314", lng: "81.3622" },
  { name: "Raipur Ferro Alloys", region: "Raipur", type: "Ferro Alloy", status: "non-compliant", emissions: "High", employees: "950", lat: "21.2514", lng: "81.6296" },
  { name: "Ultratech Cement Hirmi", region: "Raipur", type: "Cement Production", status: "warning", emissions: "Moderate", employees: "2,100", lat: "21.5389", lng: "81.7229" },
];

const statusStyle = {
  "compliant": "bg-success/10 text-success border-success/20",
  "warning": "bg-warning/10 text-warning border-warning/20",
  "non-compliant": "bg-destructive/10 text-destructive border-destructive/20",
};

const Industries = () => (
  <div className="min-h-screen pt-20 pb-10">
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Industry Registry</h1>
        <p className="text-muted-foreground text-sm mt-1">Registered industries and monitoring status across Chhattisgarh</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <Factory className="w-5 h-5 text-primary" />
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusStyle[ind.status as keyof typeof statusStyle]}`}>
                {ind.status}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-2">{ind.name}</h3>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> {ind.region} ({ind.lat}, {ind.lng})
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3 h-3" /> {ind.type}
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3" /> Emissions: {ind.emissions}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Industries;
