import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import IssueMap from "./pages/IssueMap";
import Reports from "./pages/Reports";
import Workforce from "./pages/Workforce";
import WorkOrders from "./pages/WorkOrders";
import Scheduling from "./pages/Scheduling";
import Communications from "./pages/Communications";
import Analytics from "./pages/Analytics";
import Departments from "./pages/Departments";
import Moderation from "./pages/Moderation";
import Emergency from "./pages/Emergency";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="civicpulse-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/issue-map" element={<IssueMap />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/workforce" element={<Workforce />} />
                    <Route path="/work-orders" element={<WorkOrders />} />
                    <Route path="/scheduling" element={<Scheduling />} />
                    <Route path="/communications" element={<Communications />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/moderation" element={<Moderation />} />
                    <Route path="/emergency" element={<Emergency />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
