
import { Link } from "react-router-dom";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Car {
  id: string;
  model: string;
  licensePlate: string;
  pricePerDay: number;
  available: boolean;
  image: string;
}

interface CarsTableProps {
  cars: Car[];
  onToggleAvailability: (id: string) => void;
  onDeleteClick: (car: Car) => void;
}

const CarsTable = ({
  cars,
  onToggleAvailability,
  onDeleteClick,
}: CarsTableProps) => {
  const { t, language } = useLanguage();
  const currencySymbol = language === 'ar' ? 'درهم' : 'DH';

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t('admin.image')}</TableHead>
            <TableHead>{t('admin.model')}</TableHead>
            <TableHead>{t('admin.licensePlate')}</TableHead>
            <TableHead>{t('admin.pricePerDay')}</TableHead>
            <TableHead>{t('admin.status')}</TableHead>
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
                  className="h-12 w-auto rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{car.model}</TableCell>
              <TableCell>{car.licensePlate}</TableCell>
              <TableCell>
                {car.pricePerDay} {currencySymbol}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={car.available ? "default" : "outline"}
                  className={
                    car.available
                      ? "bg-green-500 hover:bg-green-600"
                      : "text-red-500 border-red-200 hover:bg-red-50"
                  }
                  onClick={() => onToggleAvailability(car.id)}
                >
                  {car.available
                    ? t('admin.available')
                    : t('vehicles.unavailable')}
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0"
                    asChild
                  >
                    <Link to={`/admin/cars/details/${car.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0"
                    asChild
                  >
                    <Link to={`/admin/cars/new?id=${car.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 text-red-500 hover:text-red-500 hover:bg-red-50 hover:border-red-300"
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
