
import { CarIcon, Calendar, Clock, Users } from "lucide-react";
import StatCard from "./StatCard";
import { useLanguage } from "@/i18n/LanguageContext";

interface DashboardStatsProps {
  totalCars: number;
  availableCars: number;
  pendingReservations: number;
  confirmedReservations: number;
}

const DashboardStats = ({
  totalCars,
  availableCars,
  pendingReservations,
  confirmedReservations
}: DashboardStatsProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={CarIcon}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
        label={t('admin.totalVehicles')}
        value={totalCars}
      />
      
      <StatCard
        icon={Clock}
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
        label={t('admin.availableVehicles')}
        value={availableCars}
      />
      
      <StatCard
        icon={Calendar}
        iconColor="text-amber-600"
        iconBgColor="bg-amber-100"
        label={t('admin.pendingReservations')}
        value={pendingReservations}
      />
      
      <StatCard
        icon={Users}
        iconColor="text-purple-600"
        iconBgColor="bg-purple-100"
        label={t('admin.confirmedReservations')}
        value={confirmedReservations}
      />
    </div>
  );
};

export default DashboardStats;
