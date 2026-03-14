import { Bot } from "lucide-react";
import CopilotChat from "@/components/CopilotChat";

const Copilot = () => (
  <div className="min-h-screen pt-20 pb-10">
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="w-7 h-7 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">AI Compliance Copilot</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Ask scenario questions like: “If industry X reduces emissions by 30%, how will pollution levels change?”
        </p>
      </div>

      <div className="glass-card overflow-hidden">
        <CopilotChat />
      </div>
    </div>
  </div>
);

export default Copilot;

