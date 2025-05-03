
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

export interface Car {
  id: string;
  model: string;
  licensePlate: string;
  image: string;
  pricePerDay: number;
  available: boolean;
  transmission?: string; // Added transmission property
}

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="car-card overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">{t('vehicles.unavailable')}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{car.model}</h3>
        <div className="text-sm text-gray-500 mt-1">
          {car.transmission ? `${t('vehicles.transmission')}: ${car.transmission}` : `${t('vehicles.licensePlate')}: ${car.licensePlate}`}
        </div>
        <div className="mt-2 font-semibold text-primary">
          {car.pricePerDay * 10} DH <span className="text-sm font-normal text-gray-500">{t('vehicles.pricePerDay')}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/reservation/${car.id}`} className="w-full">
          <Button 
            variant={car.available ? "default" : "outline"} 
            className="w-full"
            disabled={!car.available}
          >
            {car.available ? t('vehicles.reserve') : t('vehicles.unavailable')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
