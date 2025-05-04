
import { Car } from "@/types/cars";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2 } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { useLanguage } from "@/i18n/LanguageContext";

interface CarsTableProps {
  cars: Car[];
  onToggleAvailability: (id: string) => void;
  onDeleteClick: (car: Car) => void;
}

const CarsTable = ({ cars, onToggleAvailability, onDeleteClick }: CarsTableProps) => {
  const { t, language } = useLanguage();
  const currencySymbol = language === 'ar' ? 'درهم' : 'DH';
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-28">{t('admin.image')}</TableHead>
            <TableHead>{t('admin.model')}</TableHead>
            <TableHead>{t('admin.licensePlate')}</TableHead>
            <TableHead>{t('admin.pricePerDay')}</TableHead>
            <TableHead>{t('admin.available')}</TableHead>
            <TableHead className="text-right">{t('admin.actions')}</TableHead>
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
              <TableCell>{car.pricePerDay * 10} {currencySymbol}</TableCell>
              <TableCell>
                <Switch 
                  checked={car.available}
                  onCheckedChange={() => onToggleAvailability(car.id)}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link to={`/admin/cars/new?id=${car.id}`}>
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
                    <Trash2 className="h-4 w-4" />
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
