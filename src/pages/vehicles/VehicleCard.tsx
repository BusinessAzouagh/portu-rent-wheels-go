
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";
import { ExtendedCarInfo } from "./types";

interface VehicleCardProps {
    car: ExtendedCarInfo;
}

const VehicleCard = ({ car }: VehicleCardProps) => {
    const { t } = useLanguage();

    const handleWhatsAppContact = () => {
        const message = `${t('whatsapp.vehicleInterest')}: ${car.brand} ${car.model} (${car.licensePlate})`;
        const whatsappUrl = `https://wa.me/212661234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
                        <p className="text-sm text-gray-600">{t('vehicles.licensePlate')}: {car.licensePlate}</p>
                    </div>
                    <Badge variant={car.available ? "default" : "destructive"}>
                        {car.available ? t('vehicles.reserve') : t('vehicles.unavailable')}
                    </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('vehicles.color')}:</span>
                        <span>{t(car.color)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('vehicles.transmission')}:</span>
                        <span>{t(car.transmission)}</span>
                    </div>
                </div>

                <Button 
                    className="w-full"
                    disabled={!car.available}
                    onClick={handleWhatsAppContact}
                >
                    {car.available ? t('common.contactWhatsApp') : t('vehicles.unavailable')}
                </Button>
            </CardContent>
        </Card>
    );
};

export default VehicleCard;
