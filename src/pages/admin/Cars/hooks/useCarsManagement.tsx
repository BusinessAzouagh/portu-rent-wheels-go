
import { useState, useEffect } from "react";
import { Car, MOCK_CARS } from "@/types/cars";
import { toast } from "sonner";

export const useCarsManagement = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCars(MOCK_CARS);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter cars based on search term
  const filteredCars = cars.filter((car) => 
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle availability toggle
  const handleToggleAvailability = (id: string) => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === id ? { ...car, available: !car.available } : car
      )
    );
    
    // Show toast
    toast("Disponibilité mise à jour");
  };
  
  // Delete car handlers
  const openDeleteDialog = (car: Car) => {
    setCarToDelete(car);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteCar = () => {
    if (!carToDelete) return;
    
    // Filter out the car to delete
    setCars((prevCars) => prevCars.filter((car) => car.id !== carToDelete.id));
    
    // Close dialog and show toast
    setIsDeleteDialogOpen(false);
    setCarToDelete(null);
    toast("Véhicule supprimé avec succès");
  };

  return {
    cars: filteredCars,
    isLoading,
    searchTerm,
    setSearchTerm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    carToDelete,
    handleToggleAvailability,
    openDeleteDialog,
    handleDeleteCar
  };
};
