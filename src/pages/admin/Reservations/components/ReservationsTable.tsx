
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Reservation } from "@/types/reservation";
import { Eye, Download } from "lucide-react";
import { generateInvoice } from "@/services/invoiceService";
import { toast } from "sonner";
import StatusBadge from "./StatusBadge";
import { useState } from "react";

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
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredReservations.length / itemsPerPage));
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate days between dates for each reservation
  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };
  
  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Pagination navigation
  const renderPaginationItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      // Show maximum 5 page buttons, prioritize current page and neighbors
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1) ||
        totalPages <= 5
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) || 
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        // Add ellipsis - Fixed: Removed the 'disabled' prop and used aria-disabled instead
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationLink aria-disabled="true">...</PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );
    
    return items;
  };
  
  // Handle invoice download
  const handleDownloadInvoice = (reservation: Reservation) => {
    try {
      generateInvoice(reservation);
      toast.success("Génération de la facture en cours");
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
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Plaque</TableHead>
                  <TableHead>Date début</TableHead>
                  <TableHead>Date fin</TableHead>
                  <TableHead>Jours</TableHead>
                  <TableHead>Prix/jour</TableHead>
                  <TableHead className="min-w-[120px]">Prix total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((reservation) => {
                  const daysCount = calculateDays(reservation.startDate, reservation.endDate);
                  const totalPrice = daysCount * reservation.pricePerDay;
                  
                  return (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">{reservation.id}</TableCell>
                      <TableCell>{reservation.customerName}</TableCell>
                      <TableCell>{reservation.customerPhone}</TableCell>
                      <TableCell>{`${reservation.carBrand} ${reservation.carModel}`}</TableCell>
                      <TableCell>{reservation.licensePlate || "N/A"}</TableCell>
                      <TableCell>{new Date(reservation.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(reservation.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{daysCount}</TableCell>
                      <TableCell>{reservation.pricePerDay} DH</TableCell>
                      <TableCell className="whitespace-nowrap">{totalPrice} DH</TableCell>
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
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center py-4">
              <Pagination>
                <PaginationContent>
                  {renderPaginationItems()}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
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
