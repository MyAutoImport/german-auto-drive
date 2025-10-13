import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/cookies/CookieBanner";
import Index from "./pages/Index";
import Stock from "./pages/Stock";
import CarDetail from "./pages/CarDetail";
import NotFound from "./pages/NotFound";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaCookies from "./pages/PoliticaCookies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/coche/:param" element={<CarDetail />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
