import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Edit, Trash, Search } from "lucide-react";
import AdminLayout from "../AdminLayout";

// Interface for car data
interface Car {
  id: string;
  licensePlate: string;
  model: string;
  image: string;
  pricePerDay: number;
  available: boolean;
}

// Mock car data
const MOCK_CARS: Car[] = [
  {
    id: "1",
    model: "Renault Clio",
    licensePlate: "AA-123-BB",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800",
    pricePerDay: 40,
    available: true,
  },
  {
    id: "2",
    model: "Peugeot 208",
    licensePlate: "CC-456-DD",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    pricePerDay: 45,
    available: true,
  },
  {
    id: "3",
    model: "Volkswagen Golf",
    licensePlate: "EE-789-FF",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    pricePerDay: 50,
    available: false,
  },
  {
    id: "4",
    model: "Fiat 500",
    licensePlate: "GG-012-HH",
    image: "https://images.unsplash.com/photo-1617654112368-307b8947646c?q=80&w=800",
    pricePerDay: 35,
    available: true,
  },
  {
    id: "5",
    model: "Toyota Yaris",
    licensePlate: "II-345-JJ",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800",
    pricePerDay: 38,
    available: true,
  },
];

const ManageCars = () => {
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
  
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestion des véhicules</h1>
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
          <Link to="/admin/cars/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un véhicule
            </Button>
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-500">Chargement...</div>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow">
          {filteredCars.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-28">Image</TableHead>
                    <TableHead>Modèle</TableHead>
                    <TableHead>Plaque</TableHead>
                    <TableHead>Prix / jour</TableHead>
                    <TableHead>Disponible</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <img 
                          src={car.image} 
                          alt={car.model} 
                          className="h-16 w-24 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{car.model}</TableCell>
                      <TableCell>{car.licensePlate}</TableCell>
                      <TableCell>{car.pricePerDay * 10} DH</TableCell>
                      <TableCell>
                        <Switch 
                          checked={car.available}
                          onCheckedChange={() => handleToggleAvailability(car.id)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/admin/cars/edit/${car.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => openDeleteDialog(car)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              {searchTerm ? (
                <p>Aucun véhicule ne correspond à la recherche.</p>
              ) : (
                <p>Aucun véhicule disponible. Ajoutez-en un !</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <p>
            Êtes-vous sûr de vouloir supprimer le véhicule : 
            <span className="font-semibold"> {carToDelete?.model}</span> ({carToDelete?.licensePlate}) ?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCar}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageCars;
