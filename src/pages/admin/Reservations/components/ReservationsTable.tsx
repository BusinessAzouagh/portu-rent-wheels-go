
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reservation } from "@/types/reservation";
import { Eye, Download } from "lucide-react";
import { generateInvoice } from "@/services/invoiceService";
import { toast } from "sonner";
import StatusBadge from "./StatusBadge";

interface ReservationsTableProps {
  filteredReservations: Reservation[];
  isLoading: boolean;
  searchTerm: string;
  statusFilter: string;
  handleStatusChange: (reservationId: string, newStatus: "PENDING" | "CONFIRMED" | "CANCELLED") => void;
  openDetailsDialog: (reservation: Reservation) => void;
}

const ReservationsTable = ({
  filteredReservations,
  isLoading,
  searchTerm,
  statusFilter,
  handleStatusChange,
  openDetailsDialog,
}: ReservationsTableProps) => {
  
  // Handle invoice download
  const handleDownloadInvoice = (reservation: Reservation) => {
    try {
      generateInvoice(reservation);
      toast.success("Facture générée avec succès");
    } catch (error) {
      console.error("Erreur lors de la génération de la facture:", error);
      toast.error("Erreur lors de la génération de la facture");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow">
      {filteredReservations.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead>Date début</TableHead>
                <TableHead>Date fin</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>{reservation.customerName}</TableCell>
                  <TableCell>{reservation.customerPhone}</TableCell>
                  <TableCell>{`${reservation.carBrand} ${reservation.carModel}`}</TableCell>
                  <TableCell>{new Date(reservation.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(reservation.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={reservation.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openDetailsDialog(reservation)}
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {/* Download Invoice Button - Only enabled for CONFIRMED status */}
                      {reservation.status === "CONFIRMED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 hover:bg-blue-50"
                          onClick={() => handleDownloadInvoice(reservation)}
                          title="Télécharger la facture"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {reservation.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:bg-green-50"
                          onClick={() => handleStatusChange(reservation.id, "CONFIRMED")}
                        >
                          Confirmer
                        </Button>
                      )}
                      {reservation.status !== "CANCELLED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleStatusChange(reservation.id, "CANCELLED")}
                        >
                          Annuler
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          {searchTerm || statusFilter !== "ALL" ? (
            <p>Aucune réservation ne correspond aux critères.</p>
          ) : (
            <p>Aucune réservation disponible.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationsTable;
