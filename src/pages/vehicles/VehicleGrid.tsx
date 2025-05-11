
import { Car as CarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import VehicleCard from "./VehicleCard";
import { ExtendedCarInfo } from "./types";

interface VehicleGridProps {
    filteredCars: ExtendedCarInfo[];
    resetFilters: () => void;
}

const VehicleGrid = ({ filteredCars, resetFilters }: VehicleGridProps) => {
    const { t } = useLanguage();

    return (
        <div className="md:w-3/4">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                    <CarIcon size={24} className="mr-2"/>
                    {filteredCars.length} {t('vehicles.availableVehicles')}
                </h2>
            </div>

            {filteredCars.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-lg text-gray-600">
                        {t('vehicles.noVehiclesFound')}
                    </p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={resetFilters}
                    >
                        {t('vehicles.resetFilters')}
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                        <VehicleCard key={car.id} car={car}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VehicleGrid;
