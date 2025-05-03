
// Mock data for dashboard
export const MOCK_STATS = {
  totalCars: 12,
  availableCars: 8,
  pendingReservations: 5,
  confirmedReservations: 18
};

// Mock data for recent reservations
export const MOCK_RECENT_RESERVATIONS = [
  { id: "R001", customer: "Jean Dupont", car: "Renault Clio", startDate: "2025-05-10", status: "PENDING" as const },
  { id: "R002", customer: "Marie Leclerc", car: "Peugeot 208", startDate: "2025-05-12", status: "CONFIRMED" as const },
  { id: "R003", customer: "Thomas Martin", car: "Fiat 500", startDate: "2025-05-15", status: "CONFIRMED" as const }
];
