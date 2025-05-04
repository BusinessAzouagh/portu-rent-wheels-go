
// Mock data for dashboard
export const MOCK_STATS = {
  totalCars: 12,
  availableCars: 8,
  pendingReservations: 5,
  confirmedReservations: 18
};

// Mock data for recent reservations
export const MOCK_RECENT_RESERVATIONS = [
  { 
    id: "R001", 
    customerName: "Jean Dupont", 
    customerPhone: "+33612345678",
    carModel: "Renault Clio", 
    carBrand: "Renault",
    pricePerDay: 350,
    startDate: "2025-05-10", 
    endDate: "2025-05-15",
    status: "PENDING" as const 
  },
  { 
    id: "R002", 
    customerName: "Marie Leclerc", 
    customerPhone: "+33623456789",
    carModel: "Peugeot 208", 
    carBrand: "Peugeot",
    pricePerDay: 380,
    startDate: "2025-05-12", 
    endDate: "2025-05-17",
    status: "CONFIRMED" as const 
  },
  { 
    id: "R003", 
    customerName: "Thomas Martin", 
    customerPhone: "+33634567890",
    carModel: "Fiat 500", 
    carBrand: "Fiat",
    pricePerDay: 320,
    startDate: "2025-05-15", 
    endDate: "2025-05-20",
    status: "CONFIRMED" as const 
  }
];
