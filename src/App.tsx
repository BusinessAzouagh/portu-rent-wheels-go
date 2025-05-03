
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Index from "./pages/Index";
import VehiclesPage from "./pages/VehiclesPage";
import ReservationPage from "./pages/ReservationPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard/index";
import ManageCars from "./pages/admin/Cars/ManageCars";
import AddCar from "./pages/admin/Cars/AddCar";
import ManageReservations from "./pages/admin/Reservations/ManageReservations";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/reservation/:carId" element={<ReservationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/cars" element={<ManageCars />} />
            <Route path="/admin/cars/new" element={<AddCar />} />
            <Route path="/admin/reservations" element={<ManageReservations />} />
            <Route path="/admin/settings" element={<Settings />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </TooltipProvider>
      </BrowserRouter>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
