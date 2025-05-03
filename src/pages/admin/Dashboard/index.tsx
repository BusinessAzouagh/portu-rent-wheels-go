
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import RecentReservations from "./components/RecentReservations";
import QuickActions from "./components/QuickActions";
import { MOCK_STATS, MOCK_RECENT_RESERVATIONS } from "./data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    
    if (!isLoggedIn) {
      navigate("/admin");
      return;
    }
    
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-gray-500">{t('common.loading')}</div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <DashboardHeader onLogout={handleLogout} />
      
      <DashboardStats 
        totalCars={MOCK_STATS.totalCars}
        availableCars={MOCK_STATS.availableCars}
        pendingReservations={MOCK_STATS.pendingReservations}
        confirmedReservations={MOCK_STATS.confirmedReservations}
      />
      
      <RecentReservations reservations={MOCK_RECENT_RESERVATIONS} />
      
      <QuickActions 
        pendingReservations={MOCK_STATS.pendingReservations}
        totalCars={MOCK_STATS.totalCars}
      />
    </AdminLayout>
  );
};

export default Dashboard;
