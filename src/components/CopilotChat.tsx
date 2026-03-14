import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  formatCopilotReply,
  simulateEnvironmentalImpact,
  type CopilotSimulation,
} from "@/lib/complianceCopilot";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatPollutantBreakdown(sim: CopilotSimulation) {
  const rows = sim.pollutantIndex
    .map((p) => `${p.pollutant}: ${p.baseline} → ${p.next} (${p.deltaPct.toFixed(1)}%)`)
    .join("\n");
  return [
    `Pollutant-by-pollutant (relative index):`,
    rows,
    "",
    `Note: This is a simplified scenario model (not a regulatory-grade dispersion model).`,
  ].join("\n");
}

function genericComplianceTips(industry?: string) {
  const label = industry ? ` for ${industry}` : "";
  return [
    `Practical steps to improve compliance${label}:`,
    "- Tighten monitoring (CEMS/stack + ambient) and fix data gaps.",
    "- Prioritize PM controls (baghouse/ESP maintenance, fugitive dust suppression).",
    "- Reduce SO2/NOx via fuel quality, scrubbers/FGD, low-NOx burners, and process tuning.",
    "- Run an energy-efficiency sprint (often fastest CO2e reduction).",
    "- Add a monthly compliance cadence: limits, actions, owners, evidence.",
  ].join("\n");
}

export default function CopilotChat(props: { compact?: boolean }) {
  const [input, setInput] = useState("");
  const [lastSimulation, setLastSimulation] = useState<CopilotSimulation | null>(null);
  const [followups, setFollowups] = useState<string[]>([
    "If thermal power reduces emissions by 30%, how will pollution levels change?",
    "If steel manufacturing cuts emissions by 20%, what happens to AQI?",
  ]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      text: "Hi — I’m the AI Compliance Copilot. Ask a what-if like: “If thermal power reduces emissions by 30%, how will pollution levels change?”",
    },
  ]);

  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  function pushAssistant(text: string) {
    setMessages((m) => [...m, { id: uid(), role: "assistant", text }]);
  }

  function handleSend(nextText?: string) {
    const text = (nextText ?? input).trim();
    if (!text) return;

    setMessages((m) => [...m, { id: uid(), role: "user", text }]);
    setInput("");

    const normalized = text.toLowerCase();
    if (normalized.includes("pollutant") && normalized.includes("show") && lastSimulation) {
      pushAssistant(formatPollutantBreakdown(lastSimulation));
      setFollowups([
        `What if ${lastSimulation.industry} reduces emissions by ${Math.min(80, lastSimulation.reductionPct + 20)}%?`,
        "How to reach compliance faster?",
      ]);
      return;
    }

    if ((normalized.includes("compliance") || normalized.includes("reach")) && normalized.includes("faster")) {
      pushAssistant(genericComplianceTips(lastSimulation?.industry));
      setFollowups([
        "Show pollutant-by-pollutant changes",
        "If cement production reduces emissions by 15%, how will pollution levels change?",
      ]);
      return;
    }

    const sim = simulateEnvironmentalImpact({ question: text });
    const reply = formatCopilotReply(sim);
    if (reply.simulation) setLastSimulation(reply.simulation);
    setFollowups(reply.followups ?? []);
    pushAssistant(reply.text.replaceAll("**", ""));
  }

  return (
    <div className={cn("flex flex-col", props.compact ? "h-[520px]" : "h-[680px]")}>
      <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-border bg-card/40 backdrop-blur-xl rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">AI Compliance Copilot</div>
            <div className="text-xs text-muted-foreground">What-if emissions → ambient impact (simplified)</div>
          </div>
        </div>
        <div className="text-[10px] text-muted-foreground mt-0.5">Local simulation</div>
      </div>

      <div ref={viewportRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[92%] sm:max-w-[78%] rounded-2xl border px-3.5 py-2.5 text-sm whitespace-pre-wrap",
                    isUser
                      ? "bg-primary text-primary-foreground border-primary/20"
                      : "bg-card/70 text-foreground border-border",
                  )}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-80">
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-primary" />}
                    <span className="text-[11px] font-medium">{isUser ? "You" : "Copilot"}</span>
                  </div>
                  {m.text}
                </div>
              </div>
            );
          })}

          {followups.length > 0 && (
            <div className="pt-1 flex flex-wrap gap-2">
              {followups.slice(0, 3).map((f) => (
                <Button
                  key={f}
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSend(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
          )}
      </div>

      <div className="px-4 py-3 border-t border-border bg-card/40 backdrop-blur-xl rounded-b-xl">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask: "If industry X reduces emissions by 30%, how will pollution levels change?"'
            className="h-10"
          />
          <Button type="submit" disabled={!canSend} className="h-10 px-3">
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <div className="mt-2 text-[10px] text-muted-foreground">
          Tip: Include an industry keyword (thermal power, steel, cement, aluminium, mining, transport, agriculture) and a %.
        </div>
      </div>
    </div>
  );
}
