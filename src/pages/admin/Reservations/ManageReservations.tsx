
import { useState } from "react";
import AdminLayout from "../AdminLayout";
import ReservationsHeader from "./components/ReservationsHeader";
import ReservationsTable from "./components/ReservationsTable";
import ReservationDetailsDialog from "./components/ReservationDetailsDialog";
import { useReservations } from "./hooks/useReservations";
import { Reservation } from "@/types/reservation";
import { useLanguage } from "@/i18n/LanguageContext";

const ManageReservations = () => {
  const { t } = useLanguage();
  const { 
    reservations,
    filteredReservations,
    isLoading,
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
    handleStatusChange
  } = useReservations();
  
  // Dialog states
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Open details dialog
  const openDetailsDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsDialogOpen(true);
  };

  return (
    <AdminLayout>
      {/* Title is now properly translated */}
      <h1 className="text-2xl font-bold mb-6">{t('admin.manageReservations')}</h1>
      
      <ReservationsHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ReservationsTable 
        filteredReservations={filteredReservations}
        isLoading={isLoading}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        handleStatusChange={handleStatusChange}
        openDetailsDialog={openDetailsDialog}
      />
      
      <ReservationDetailsDialog 
        reservation={selectedReservation}
        isOpen={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
      />
    </AdminLayout>
  );
};

export default ManageReservations;
