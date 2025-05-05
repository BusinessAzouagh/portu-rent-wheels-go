
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
  color?: string;
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

  // Constructing better alt text for images
  const getImageAlt = () => {
    const brandModel = `${car.brand || ''} ${car.model}`.trim();
    const colorInfo = car.color ? ` - ${car.color}` : '';
    const imagePosition = car.images.length > 1 ? ` (${currentImageIndex + 1}/${car.images.length})` : '';
    return `${brandModel}${colorInfo}${imagePosition}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {car.images.length > 0 && (
        <div className="h-48 overflow-hidden relative">
          {/* Image carousel with explicit width/height and loading="lazy" */}
          <img 
            src={car.images[currentImageIndex]}
            alt={getImageAlt()}
            className="w-full h-full object-cover transition-all duration-300"
            loading="lazy"
            width="400"
            height="192"
          />
          
          {/* Navigation buttons with improved accessibility */}
          {car.images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={prevImage}
                aria-label={t('common.previousImage')}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={nextImage}
                aria-label={t('common.nextImage')}
              >
                <ChevronRight size={18} />
              </Button>
              
              {/* Dots indicator with improved accessibility */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5" role="tablist">
                {car.images.map((_, index) => (
                  <span 
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full cursor-pointer", 
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                    role="tab"
                    tabIndex={0}
                    aria-selected={index === currentImageIndex}
                    aria-label={`${t('common.showImage')} ${index + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold">{`${car.brand} ${car.model}`}</h3>
        <div className="space-y-1 mt-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>{t('vehicles.transmission')}:</span>
            <span className="font-medium">{car.transmission || t('vehicles.notSpecified')}</span>
          </div>
          {car.color && (
            <div className="flex justify-between">
              <span>{t('vehicles.color')}:</span>
              <span className="font-medium">{car.color}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <WhatsAppButton 
            size="sm" 
            vehicleInfo={{
              model: car.brand ? `${car.brand} ${car.model} - ${car.color}` : car.model,
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
