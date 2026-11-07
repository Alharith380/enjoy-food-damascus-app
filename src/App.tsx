
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminContentProvider } from "@/contexts/AdminContentContext";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import HallBookingPage from "./pages/HallBookingPage";
import HallReservationPage from "./pages/HallReservationPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminContentProvider>
        <div className="w-full">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/hall-booking" element={<HallBookingPage />} />
              <Route path="/hall-reservation" element={<HallReservationPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/content" element={<AdminPanel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AdminContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
