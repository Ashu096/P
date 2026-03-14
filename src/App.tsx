import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Compliance from "./pages/Compliance.tsx";
import Industries from "./pages/Industries.tsx";
import Alerts from "./pages/Alerts.tsx";
import CitizenPortal from "./pages/CitizenPortal.tsx";
import Login from "./pages/Login.tsx";
import Copilot from "./pages/Copilot.tsx";
import NotFound from "./pages/NotFound.tsx";
import CopilotWidget from "@/components/CopilotWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/citizen" element={<CitizenPortal />} />
          <Route path="/copilot" element={<Copilot />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CopilotWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
