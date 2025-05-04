
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
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { t, language } = useLanguage();
  const currencySymbol = language === 'ar' ? 'درهم' : 'DH';
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
  
  // Change items per page
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
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
        // Add ellipsis
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
      toast.success(t('admin.invoiceGeneration'));
    } catch (error) {
      console.error("Erreur lors de la génération de la facture:", error);
      toast.error(t('admin.invoiceError'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">{t('common.loading')}</div>
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
                  <TableHead>{t('admin.customer')}</TableHead>
                  <TableHead>{t('admin.phone')}</TableHead>
                  <TableHead>{t('admin.vehicle')}</TableHead>
                  <TableHead className="min-w-[100px]">{t('vehicles.licensePlate')}</TableHead>
                  <TableHead>{t('admin.startDate')}</TableHead>
                  <TableHead>{t('admin.endDate')}</TableHead>
                  <TableHead>{t('reservation.days')}</TableHead>
                  <TableHead>{t('vehicles.pricePerDay')}</TableHead>
                  <TableHead className="min-w-[120px]">{t('admin.totalPrice')}</TableHead>
                  <TableHead>{t('admin.status')}</TableHead>
                  <TableHead className="text-right">{t('admin.actions')}</TableHead>
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
                      <TableCell className="whitespace-nowrap">{reservation.licensePlate || "N/A"}</TableCell>
                      <TableCell>{new Date(reservation.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(reservation.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{daysCount}</TableCell>
                      <TableCell>{reservation.pricePerDay} {currencySymbol}</TableCell>
                      <TableCell className="whitespace-nowrap">{totalPrice} {currencySymbol}</TableCell>
                      <TableCell>
                        <StatusBadge status={reservation.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openDetailsDialog(reservation)}
                            title={t('admin.details')}
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
                              title={t('admin.invoiceGeneration')}
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
                              {t('admin.confirm')}
                            </Button>
                          )}
                          {reservation.status !== "CANCELLED" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleStatusChange(reservation.id, "CANCELLED")}
                            >
                              {t('admin.cancel')}
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
          
          {/* Pagination controls and items per page selector */}
          <div className="flex items-center justify-between border-t p-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{t('admin.itemsPerPage')}</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {renderPaginationItems()}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      ) : (
        <div className="py-10 text-center text-gray-500">
          {searchTerm || statusFilter !== "ALL" ? (
            <p>{t('admin.noReservationsFound')}</p>
          ) : (
            <p>{t('admin.noReservationsAvailable')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationsTable;
