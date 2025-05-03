import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, Search, Download } from "lucide-react";
import AdminLayout from "../AdminLayout";
import ReservationDetailsDialog from "./components/ReservationDetailsDialog";
import { generateInvoice } from "@/services/invoiceService";
import { Reservation } from "@/types/reservation";

// Mock reservation data with additional fields
const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "R001",
    customerName: "Jean Dupont",
    firstName: "Jean",
    lastName: "Dupont",
    customerPhone: "+33 6 12 34 56 78",
    email: "jean.dupont@example.com",
    carModel: "Clio",
    carBrand: "Renault",
    pricePerDay: 250,
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    status: "PENDING",
  },
  {
    id: "R002",
    customerName: "Marie Leclerc",
    firstName: "Marie",
    lastName: "Leclerc",
    customerPhone: "+33 6 23 45 67 89",
    email: "marie.leclerc@example.com",
    carModel: "208",
    carBrand: "Peugeot",
    pricePerDay: 280,
    startDate: "2025-05-12",
    endDate: "2025-05-14",
    status: "CONFIRMED",
  },
  {
    id: "R003",
    customerName: "Thomas Martin",
    firstName: "Thomas",
    lastName: "Martin",
    customerPhone: "+33 6 34 56 78 90",
    email: "thomas.martin@example.com",
    carModel: "500",
    carBrand: "Fiat",
    pricePerDay: 220,
    startDate: "2025-05-15",
    endDate: "2025-05-20",
    status: "CONFIRMED",
  },
  {
    id: "R004",
    customerName: "Sophie Bernard",
    firstName: "Sophie",
    lastName: "Bernard",
    customerPhone: "+33 6 45 67 89 01",
    email: "sophie.bernard@example.com",
    carModel: "Yaris",
    carBrand: "Toyota",
    pricePerDay: 260,
    startDate: "2025-05-20",
    endDate: "2025-05-25",
    status: "CANCELLED",
  },
  {
    id: "R005",
    customerName: "Lucas Petit",
    firstName: "Lucas",
    lastName: "Petit",
    customerPhone: "+33 6 56 78 90 12",
    email: "lucas.petit@example.com",
    carModel: "Golf",
    carBrand: "Volkswagen",
    pricePerDay: 320,
    startDate: "2025-06-01",
    endDate: "2025-06-07",
    status: "PENDING",
  },
];

const ManageReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  
  // Dialog states
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReservations(MOCK_RESERVATIONS);
      setFilteredReservations(MOCK_RESERVATIONS);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Update filtered reservations when search term or status filter changes
  useEffect(() => {
    let filtered = reservations;

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((res) => res.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (res) =>
          res.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReservations(filtered);
  }, [searchTerm, statusFilter, reservations]);

  // Handle status change
  const handleStatusChange = (reservationId: string, newStatus: "PENDING" | "CONFIRMED" | "CANCELLED") => {
    setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === reservationId ? { ...res, status: newStatus } : res
      )
    );

    toast(`Statut mis à jour: ${newStatus === "CONFIRMED" ? "Confirmé" : newStatus === "CANCELLED" ? "Annulé" : "En attente"}`);
  };

  // Open details dialog
  const openDetailsDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsDialogOpen(true);
  };

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

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor;
    let textColor;
    let statusText;

    switch (status) {
      case "CONFIRMED":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        statusText = "Confirmée";
        break;
      case "CANCELLED":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        statusText = "Annulée";
        break;
      default:
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        statusText = "En attente";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {statusText}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestion des réservations</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-8 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-36">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tous</SelectItem>
              <SelectItem value="PENDING">En attente</SelectItem>
              <SelectItem value="CONFIRMED">Confirmé</SelectItem>
              <SelectItem value="CANCELLED">Annulé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-500">Chargement...</div>
        </div>
      ) : (
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
      )}
      
      {/* Reservation Details Dialog */}
      <ReservationDetailsDialog 
        reservation={selectedReservation}
        isOpen={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
      />
    </AdminLayout>
  );
};

export default ManageReservations;
