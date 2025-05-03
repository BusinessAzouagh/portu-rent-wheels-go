
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

// Extended car information (moved from ReservationPage)
export interface ExtendedCar {
  id: string;
  model: string;
  brand?: string;
  licensePlate: string;
  image: string;
  pricePerDay: number;
  available: boolean;
  transmission?: "Manuelle" | "Automatique";
  fuelType?: "Essence" | "Diesel";
  features?: string[];
  seats?: number;
  luggage?: number;
  airConditioned?: boolean;
}

interface CarDetailsProps {
  car: ExtendedCar;
}

const CarDetails = ({ car }: CarDetailsProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img 
        src={car.image} 
        alt={`${car.brand} ${car.model}`} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">
          {car.brand} {car.model}
        </h1>
        <p className="text-gray-600 mb-4">{t('vehicles.transmission')}: {car.transmission}</p>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">{t('vehicles.vehicleInfo')}</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {car.airConditioned && <li>{t('vehicles.airConditioning')}</li>}
            {car.transmission && <li>{t('vehicles.transmission')} {car.transmission.toLowerCase() === 'manuelle' ? t('vehicles.manual').toLowerCase() : t('vehicles.automatic').toLowerCase()}</li>}
            {car.fuelType && <li>{car.fuelType === 'Essence' ? t('vehicles.gasoline') : t('vehicles.diesel')}</li>}
            {car.seats && <li>{car.seats} {t('vehicles.seats')}</li>}
            {car.luggage && <li>{car.luggage} {t('vehicles.luggage')}</li>}
          </ul>
        </div>
        
        {car.features && car.features.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">{t('vehicles.equipment')}</h3>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xl font-bold text-primary">
          {car.pricePerDay}€ <span className="text-sm font-normal text-gray-500">{t('vehicles.pricePerDay')}</span>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
