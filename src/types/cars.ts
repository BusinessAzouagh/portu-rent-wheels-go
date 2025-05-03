
// Interface for car data
export interface Car {
  id: string;
  licensePlate: string;
  model: string;
  image: string;
  pricePerDay: number;
  available: boolean;
  transmission?: string;
  currencySymbol?: string; // Added currencySymbol as an optional property
}

// Mock car data for development
export const MOCK_CARS: Car[] = [
  {
    id: "1",
    model: "Renault Clio",
    licensePlate: "AA-123-BB",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800",
    pricePerDay: 40,
    available: true,
    transmission: "Automatique",
  },
  {
    id: "2",
    model: "Peugeot 208",
    licensePlate: "CC-456-DD",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    pricePerDay: 45,
    available: true,
    transmission: "Manuelle",
  },
  {
    id: "3",
    model: "Volkswagen Golf",
    licensePlate: "EE-789-FF",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    pricePerDay: 50,
    available: false,
    transmission: "Automatique",
  },
  {
    id: "4",
    model: "Fiat 500",
    licensePlate: "GG-012-HH",
    image: "https://images.unsplash.com/photo-1617654112368-307b8947646c?q=80&w=800",
    pricePerDay: 35,
    available: true,
    transmission: "Manuelle",
  },
  {
    id: "5",
    model: "Toyota Yaris",
    licensePlate: "II-345-JJ",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800",
    pricePerDay: 38,
    available: true,
    transmission: "Automatique",
  },
];
