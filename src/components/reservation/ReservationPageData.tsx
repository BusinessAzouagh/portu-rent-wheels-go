
import { useState, useEffect } from "react";
import { ExtendedCar } from "./CarDetails";

// Mock data for cars (would be fetched from API in real app)
export const MOCK_CARS: { [key: string]: ExtendedCar } = {
  "1": {
    id: "1",
    model: "Clio",
    brand: "Renault",
    licensePlate: "AA-123-BB",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800",
    pricePerDay: 40,
    available: true,
    transmission: "Manuelle",
    fuelType: "Essence",
    features: ["Bluetooth", "USB", "GPS"],
    seats: 5,
    luggage: 2,
    airConditioned: true,
  },
  "2": {
    id: "2",
    model: "208",
    brand: "Peugeot",
    licensePlate: "CC-456-DD",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    pricePerDay: 45,
    available: true,
    transmission: "Automatique",
    fuelType: "Diesel",
    features: ["Bluetooth", "Caméra de recul", "USB"],
    seats: 5,
    luggage: 2,
    airConditioned: true,
  },
  "3": {
    id: "3",
    model: "Golf",
    brand: "Volkswagen",
    licensePlate: "EE-789-FF",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    pricePerDay: 50,
    available: false,
    transmission: "Manuelle",
    fuelType: "Diesel",
    features: ["Bluetooth", "Caméra de recul", "GPS", "USB"],
    seats: 5,
    luggage: 3,
    airConditioned: true,
  },
  "4": {
    id: "4",
    model: "500",
    brand: "Fiat",
    licensePlate: "GG-012-HH",
    image: "https://images.unsplash.com/photo-1617654112368-307b8947646c?q=80&w=800",
    pricePerDay: 35,
    available: true,
    transmission: "Manuelle",
    fuelType: "Essence",
    features: ["Bluetooth", "USB"],
    seats: 4,
    luggage: 1,
    airConditioned: true,
  }
};

export interface UseCarDataProps {
  carId: string | undefined;
}

export const useCarData = ({ carId }: UseCarDataProps) => {
  const [car, setCar] = useState<ExtendedCar | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchCar = () => {
      setTimeout(() => {
        if (carId && MOCK_CARS[carId]) {
          setCar(MOCK_CARS[carId]);
        }
        setIsLoading(false);
      }, 500);
    };

    fetchCar();
  }, [carId]);

  return { car, isLoading };
};
