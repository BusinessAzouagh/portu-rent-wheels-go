
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface Car {
  id: string;
  model: string;
  licensePlate: string;
  image: string;
  pricePerDay: number;
  available: boolean;
}

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
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
            <span className="text-white font-semibold text-lg">Non disponible</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{car.model}</h3>
        <div className="text-sm text-gray-500 mt-1">
          Plaque: {car.licensePlate}
        </div>
        <div className="mt-2 font-semibold text-primary">
          {car.pricePerDay}€ <span className="text-sm font-normal text-gray-500">/ jour</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/reservation/${car.id}`} className="w-full">
          <Button 
            variant={car.available ? "default" : "outline"} 
            className="w-full"
            disabled={!car.available}
          >
            {car.available ? "Réserver" : "Indisponible"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
