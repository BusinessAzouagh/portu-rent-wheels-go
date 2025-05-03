
import { Link } from "react-router-dom";
import { Plus, Clock3, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";

interface QuickActionsProps {
  pendingReservations: number;
  totalCars: number;
}

const QuickActions = ({ pendingReservations, totalCars }: QuickActionsProps) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t('admin.quickActions')}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/cars/new" className="no-underline">
          <Card className="h-full hover:shadow-md transition-all border-blue-100 hover:border-blue-300">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">{t('admin.addVehicle')}</h3>
              <p className="text-sm text-gray-500">
                Ajoutez un nouveau véhicule à votre flotte avec tous les détails
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/reservations/pending" className="no-underline">
          <Card className="h-full hover:shadow-md transition-all border-amber-100 hover:border-amber-300">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="bg-amber-50 p-3 rounded-full mb-4">
                <Clock3 className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">{t('admin.pendingReservationsList')}</h3>
              <p className="text-sm text-gray-500">
                {pendingReservations} réservations en attente nécessitent votre attention
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/cars/availability" className="no-underline">
          <Card className="h-full hover:shadow-md transition-all border-green-100 hover:border-green-300">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="bg-green-50 p-3 rounded-full mb-4">
                <CalendarDays className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">{t('admin.manageAvailability')}</h3>
              <p className="text-sm text-gray-500">
                Définissez les périodes de disponibilité pour vos {totalCars} véhicules
              </p>
            </CardContent>
          </Card>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
