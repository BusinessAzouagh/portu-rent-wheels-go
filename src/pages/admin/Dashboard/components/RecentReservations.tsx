
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";
import { Eye } from "lucide-react";
import { useState } from "react";
import ReservationDetailsDialog from "../../Reservations/components/ReservationDetailsDialog";
import { Reservation } from "@/types/reservation";

interface RecentReservationsProps {
  reservations: Reservation[];
}

const RecentReservations = ({ reservations }: RecentReservationsProps) => {
  const { t } = useLanguage();
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  // Open details dialog
  const openDetailsDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsDialogOpen(true);
  };
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">{t('admin.recentReservations')}</CardTitle>
      </CardHeader>
      <CardContent>
        {reservations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t('admin.id')}</th>
                  <th className="text-left py-3 px-4">{t('admin.customer')}</th>
                  <th className="text-left py-3 px-4">{t('admin.vehicle')}</th>
                  <th className="text-left py-3 px-4">{t('admin.date')}</th>
                  <th className="text-left py-3 px-4">{t('admin.status')}</th>
                  <th className="text-left py-3 px-4">{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b">
                    <td className="py-3 px-4">{reservation.id}</td>
                    <td className="py-3 px-4">{reservation.customer}</td>
                    <td className="py-3 px-4">{reservation.car}</td>
                    <td className="py-3 px-4">{reservation.startDate}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reservation.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {reservation.status === 'CONFIRMED' ? t('admin.confirmed') : t('admin.pending')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => openDetailsDialog(reservation)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {t('admin.details')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">{t('admin.noReservationsAvailable')}</p>
        )}
        
        <div className="mt-4">
          <Link to="/admin/reservations">
            <Button variant="outline" size="sm">{t('admin.allReservations')}</Button>
          </Link>
        </div>

        {/* Details Dialog */}
        <ReservationDetailsDialog 
          reservation={selectedReservation}
          isOpen={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      </CardContent>
    </Card>
  );
};

export default RecentReservations;
