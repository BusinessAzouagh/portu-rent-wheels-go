
import {useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useLanguage} from "@/i18n/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import {ExtendedCarInfo} from "./types";

interface VehicleCardProps {
    car: ExtendedCarInfo;
}

const VehicleCard = ({car}: VehicleCardProps) => {
    const {t} = useLanguage();
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

    const getColorTranslation = (colorKey: string) => {
        // Extract the color key from the translation path (e.g., "vehicles.colors.black" -> "black")
        const colorName = colorKey.split('.').pop();
        return t(`vehicles.colors.${colorName}` as any);
    };

    const getTransmissionTranslation = (transmissionKey: string) => {
        // Extract the transmission key from the translation path
        const transmissionName = transmissionKey.split('.').pop();
        return t(`vehicles.transmissions.${transmissionName}` as any);
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
            <div className="aspect-video relative overflow-hidden">
                <img
                    src={car.images[currentImageIndex]}
                    alt={`${car.brand} ${car.model} - ${getColorTranslation(car.color)}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                            <ChevronLeft size={18}/>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                            onClick={nextImage}
                        >
                            <ChevronRight size={18}/>
                        </Button>

                        {/* Dots indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {car.images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`w-2 h-2 rounded-full cursor-pointer ${
                                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </>
                )}

                {!car.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">{t('vehicles.unavailable')}</span>
                    </div>
                )}
            </div>

            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-lg">{car.brand} {car.model} - {getColorTranslation(car.color)}</h3>

                <div className="mt-2 space-y-1 text-sm text-gray-600 flex-grow">
                    <div className="flex justify-between">
                        <span>{t('vehicles.transmission')}:</span>
                        <span className="font-medium">
                            {getTransmissionTranslation(car.transmission)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>{t('vehicles.color')}:</span>
                        <span className="font-medium">{getColorTranslation(car.color)}</span>
                    </div>
                </div>

                <Separator className="my-3"/>

                <div className="flex items-end justify-end">
                    <WhatsAppButton
                        size="sm"
                        vehicleInfo={{
                            model: `${car.brand} ${car.model} - ${getColorTranslation(car.color)}`,
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

export default VehicleCard;
