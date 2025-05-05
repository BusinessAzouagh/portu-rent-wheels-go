
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import WhatsAppButton from "./WhatsAppButton";

export interface CarWithGallery {
  id: string;
  model: string;
  brand?: string;
  licensePlate: string;
  images: string[];
  transmission?: string;
}

interface CarCardProps {
  car: CarWithGallery;
}

const CarCardWithGallery = ({ car }: CarCardProps) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {car.images.length > 0 && (
        <div className="h-48 overflow-hidden relative">
          {/* Image carousel */}
          <img 
            src={car.images[currentImageIndex]} 
            alt={car.model} 
            className="w-full h-full object-cover transition-all duration-300"
          />
          
          {/* Navigation buttons */}
          {car.images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight size={18} />
              </Button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {car.images.map((_, index) => (
                  <span 
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full", 
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold">{car.model}</h3>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>{car.transmission || t('vehicles.notSpecified')}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <WhatsAppButton 
            size="sm" 
            vehicleInfo={{
              model: car.brand ? `${car.brand} ${car.model}` : car.model,
              image: car.images[0]
            }}
          >
            {t('common.contactUs')}
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
};

export default CarCardWithGallery;
