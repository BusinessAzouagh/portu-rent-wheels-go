
import { Car } from "@/types/cars";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

interface CarsTableProps {
  cars: Car[];
  onToggleAvailability: (id: string) => void;
  onDeleteClick: (car: Car) => void;
}

const CarsTable = ({ cars, onToggleAvailability, onDeleteClick }: CarsTableProps) => {
  return (
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
          {cars.map((car) => (
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
                  onCheckedChange={() => onToggleAvailability(car.id)}
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
                    onClick={() => onDeleteClick(car)}
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
  );
};

export default CarsTable;
