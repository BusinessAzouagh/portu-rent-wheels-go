import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Reservation } from "@/types/reservation";

// Mock reservation data
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
    licensePlate: "AA-123-BB",
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
    licensePlate: "CC-456-DD",
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
    licensePlate: "EE-789-FF",
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
    licensePlate: "GG-012-HH",
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
    licensePlate: "II-345-JJ",
    pricePerDay: 320,
    startDate: "2025-06-01",
    endDate: "2025-06-07",
    status: "PENDING",
  },
  // Ajout de 6 nouvelles réservations
  {
    id: "R006",
    customerName: "Emma Rodriguez",
    firstName: "Emma",
    lastName: "Rodriguez",
    customerPhone: "+33 6 67 89 01 23",
    email: "emma.rodriguez@example.com",
    carModel: "C3",
    carBrand: "Citroën",
    licensePlate: "KK-678-LL",
    pricePerDay: 240,
    startDate: "2025-06-05",
    endDate: "2025-06-12",
    status: "PENDING",
  },
  {
    id: "R007",
    customerName: "Antoine Dubois",
    firstName: "Antoine",
    lastName: "Dubois",
    customerPhone: "+33 6 78 90 12 34",
    email: "antoine.dubois@example.com",
    carModel: "Mégane",
    carBrand: "Renault",
    licensePlate: "MM-901-NN",
    pricePerDay: 300,
    startDate: "2025-06-10",
    endDate: "2025-06-15",
    status: "CONFIRMED",
  },
  {
    id: "R008",
    customerName: "Chloé Lefebvre",
    firstName: "Chloé",
    lastName: "Lefebvre",
    customerPhone: "+33 6 89 01 23 45",
    email: "chloe.lefebvre@example.com",
    carModel: "3008",
    carBrand: "Peugeot",
    licensePlate: "OO-234-PP",
    pricePerDay: 350,
    startDate: "2025-06-15",
    endDate: "2025-06-25",
    status: "CONFIRMED",
  },
  {
    id: "R009",
    customerName: "Hugo Moreau",
    firstName: "Hugo",
    lastName: "Moreau",
    customerPhone: "+33 6 90 12 34 56",
    email: "hugo.moreau@example.com",
    carModel: "Captur",
    carBrand: "Renault",
    licensePlate: "QQ-567-RR",
    pricePerDay: 270,
    startDate: "2025-06-20",
    endDate: "2025-06-22",
    status: "CANCELLED",
  },
  {
    id: "R010",
    customerName: "Léa Simon",
    firstName: "Léa",
    lastName: "Simon",
    customerPhone: "+33 6 01 23 45 67",
    email: "lea.simon@example.com",
    carModel: "A1",
    carBrand: "Audi",
    licensePlate: "SS-890-TT",
    pricePerDay: 400,
    startDate: "2025-07-01",
    endDate: "2025-07-10",
    status: "PENDING",
  },
  {
    id: "R011",
    customerName: "Gabriel Fournier",
    firstName: "Gabriel",
    lastName: "Fournier",
    customerPhone: "+33 6 12 34 56 78",
    email: "gabriel.fournier@example.com",
    carModel: "2008",
    carBrand: "Peugeot",
    licensePlate: "UU-123-VV",
    pricePerDay: 290,
    startDate: "2025-07-05",
    endDate: "2025-07-15",
    status: "PENDING",
  },
];

export const useReservations = () => {
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
          res.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (res.licensePlate && res.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())) ||
          String(res.pricePerDay * calculateDays(res.startDate, res.endDate)).includes(searchTerm)
      );
    }

    setFilteredReservations(filtered);
  }, [searchTerm, statusFilter, reservations]);

  // Helper function to calculate days between dates for search
  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  // Handle status change
  const handleStatusChange = (reservationId: string, newStatus: "PENDING" | "CONFIRMED" | "CANCELLED") => {
    setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === reservationId ? { ...res, status: newStatus } : res
      )
    );

    toast(`Statut mis à jour: ${newStatus === "CONFIRMED" ? "Confirmé" : newStatus === "CANCELLED" ? "Annulé" : "En attente"}`);
  };

  return {
    reservations,
    filteredReservations,
    isLoading,
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
    handleStatusChange
  };
};
