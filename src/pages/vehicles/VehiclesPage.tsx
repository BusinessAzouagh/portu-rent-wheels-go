
import { useState } from "react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import FilterSidebar from "./FilterSidebar";
import VehicleGrid from "./VehicleGrid";
import { EXTENDED_MOCK_CARS } from "./data";
import { ExtendedCarInfo } from "./types";

const VehiclesPage = () => {
    const [filteredCars, setFilteredCars] = useState<ExtendedCarInfo[]>(EXTENDED_MOCK_CARS);
    const [filters, setFilters] = useState({
        brand: "",
        transmission: "",
        color: "",
    });
    const { t } = useLanguage();

    const handleFilterChange = (
        key: string,
        value: string
    ) => {
        const newFilters = {...filters, [key]: value};
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const applyFilters = (currentFilters: typeof filters) => {
        let result = [...EXTENDED_MOCK_CARS];

        if (currentFilters.brand) {
            result = result.filter(car =>
                car.brand.toLowerCase().includes(currentFilters.brand.toLowerCase())
            );
        }

        if (currentFilters.transmission && currentFilters.transmission !== "all") {
            result = result.filter(car =>
                car.transmission === currentFilters.transmission
            );
        }

        if (currentFilters.color && currentFilters.color !== "all") {
            result = result.filter(car =>
                car.color === currentFilters.color
            );
        }

        setFilteredCars(result);
    };

    const resetFilters = () => {
        setFilters({
            brand: "",
            transmission: "",
            color: "",
        });
        setFilteredCars(EXTENDED_MOCK_CARS);
    };

    // Get unique colors from the data (these are now translation keys)
    const uniqueColors = [...new Set(EXTENDED_MOCK_CARS.map(car => car.color))];

    return (
        <Layout>
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('vehicles.ourFleet')}
                        </h1>
                        <p className="text-lg text-gray-600">
                            {t('vehicles.discoverFleet')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Vehicles Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Filters Column */}
                        <FilterSidebar
                            filters={filters}
                            uniqueColors={uniqueColors}
                            handleFilterChange={handleFilterChange}
                            resetFilters={resetFilters}
                        />

                        {/* Vehicles Grid */}
                        <VehicleGrid 
                            filteredCars={filteredCars}
                            resetFilters={resetFilters}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default VehiclesPage;
