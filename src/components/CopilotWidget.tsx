import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CopilotChat from "@/components/CopilotChat";

export default function CopilotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full h-12 w-12 p-0 shadow-lg"
          aria-label="Open AI Compliance Copilot"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-[720px] bg-transparent border-0 shadow-none">
          <div className="glass-card overflow-hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>AI Compliance Copilot</DialogTitle>
            </DialogHeader>
            <CopilotChat compact />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
