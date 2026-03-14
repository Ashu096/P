import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wind, Droplets, Volume2, Shield, BarChart3, Globe, Leaf, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Wind, title: "Air Quality Monitoring", desc: "Real-time AQI tracking across all monitoring stations with predictive forecasting." },
  { icon: Droplets, title: "Water Quality Analysis", desc: "pH, dissolved oxygen, and contaminant levels from rivers and industrial outlets." },
  { icon: Volume2, title: "Noise Level Tracking", desc: "Decibel monitoring near industrial zones, highways, and residential areas." },
  { icon: Shield, title: "Compliance Engine", desc: "Automated compliance checks against prescribed limits with escalation workflows." },
  { icon: Brain, title: "AI Compliance Copilot", desc: "Query-driven insights — simulate emission reductions and predict regional impact." },
  { icon: Globe, title: "Citizen Portal", desc: "Public transparency dashboards with real-time environmental data access." },
];

const stats = [
  { value: "148", label: "Monitoring Stations" },
  { value: "2,400+", label: "Industries Tracked" },
  { value: "99.7%", label: "Data Uptime" },
  { value: "24/7", label: "Real-time Alerts" },
];

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="pulse-dot" />
              <span className="text-sm font-mono text-primary">LIVE MONITORING ACTIVE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
              Prithvi<span className="text-primary">Net</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-3 leading-relaxed max-w-2xl">
              Smart Environmental Monitoring Platform for Chhattisgarh
            </p>
            <p className="text-base text-muted-foreground mb-8 max-w-xl">
              Real-time pollution tracking, automated compliance, predictive analytics, and citizen transparency — powered by IoT and AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                <Link to="/dashboard">
                  Open Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary">
                <Link to="/citizen">Citizen Portal</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className="data-value text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Platform Capabilities</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            End-to-end environmental monitoring ecosystem for CECB
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="font-semibold">
            <Link to="/copilot">
              Try AI Compliance Copilot <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Roles */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-3">Role-Based Access</h2>
          <p className="text-muted-foreground">Secure, tiered access for every stakeholder</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: Zap, role: "Super Admin", desc: "Full system control" },
            { icon: BarChart3, role: "Regional Officer", desc: "Regional oversight" },
            { icon: Leaf, role: "Monitoring Team", desc: "Data collection" },
            { icon: Shield, role: "Industry User", desc: "Compliance reports" },
            { icon: Globe, role: "Citizen", desc: "Public dashboards" },
          ].map((r, i) => (
            <motion.div
              key={r.role}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 text-center"
            >
              <r.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground">{r.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">PrithviNet</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Chhattisgarh Environment Conservation Board — Smart Environmental Monitoring Platform
        </p>
      </div>
    </footer>
  </div>
);

export default Index;
