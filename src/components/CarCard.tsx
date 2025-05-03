
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

export interface Car {
  id: string;
  model: string;
  brand?: string;
  licensePlate: string;
  image: string;
  pricePerDay: number;
  available: boolean;
  transmission?: "Manuelle" | "Automatique";
  currencySymbol?: string; // Added currencySymbol as an optional property
}

interface CarCardProps {
  car: Car;
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
}

const CarCard = ({ car, startDate, endDate, startTime, endTime }: CarCardProps) => {
  const { t } = useLanguage();
  
  // Build the reservation URL with query parameters for dates and times
  const buildReservationUrl = () => {
    const baseUrl = `/reservation/${car.id}`;
    const params = new URLSearchParams();
    
    // Only add params if they exist
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());
    if (startTime) params.append('startTime', startTime);
    if (endTime) params.append('endTime', endTime);
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {car.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={car.image} 
            alt={car.model} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold">{car.model}</h3>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>{car.transmission || t('vehicles.notSpecified')}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="font-bold text-primary text-xl">
            {car.pricePerDay}{car.currencySymbol || '€'}
            <span className="text-xs text-gray-500 ml-1">{t('vehicles.perDay')}</span>
          </div>
          <div>
            {car.available ? (
              <Link to={buildReservationUrl()}>
                <Button size="sm">{t('common.book')}</Button>
              </Link>
            ) : (
              <Button size="sm" variant="outline" disabled>
                {t('vehicles.unavailable')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
