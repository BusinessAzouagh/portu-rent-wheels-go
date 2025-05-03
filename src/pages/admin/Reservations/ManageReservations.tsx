
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
import { Eye, Search } from "lucide-react";
import AdminLayout from "../AdminLayout";

// Interface for reservation data
interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  carModel: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

// Mock reservation data
const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "R001",
    customerName: "Jean Dupont",
    customerPhone: "+33 6 12 34 56 78",
    carModel: "Renault Clio",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    status: "PENDING",
  },
  {
    id: "R002",
    customerName: "Marie Leclerc",
    customerPhone: "+33 6 23 45 67 89",
    carModel: "Peugeot 208",
    startDate: "2025-05-12",
    endDate: "2025-05-14",
    status: "CONFIRMED",
  },
  {
    id: "R003",
    customerName: "Thomas Martin",
    customerPhone: "+33 6 34 56 78 90",
    carModel: "Fiat 500",
    startDate: "2025-05-15",
    endDate: "2025-05-20",
    status: "CONFIRMED",
  },
  {
    id: "R004",
    customerName: "Sophie Bernard",
    customerPhone: "+33 6 45 67 89 01",
    carModel: "Toyota Yaris",
    startDate: "2025-05-20",
    endDate: "2025-05-25",
    status: "CANCELLED",
  },
  {
    id: "R005",
    customerName: "Lucas Petit",
    customerPhone: "+33 6 56 78 90 12",
    carModel: "Volkswagen Golf",
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
                      <TableCell>{reservation.carModel}</TableCell>
                      <TableCell>{new Date(reservation.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(reservation.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={reservation.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/admin/reservations/${reservation.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
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
    </AdminLayout>
  );
};

export default ManageReservations;
