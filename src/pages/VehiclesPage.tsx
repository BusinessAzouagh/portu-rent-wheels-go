
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard, { Car } from "@/components/CarCard";
import { Car as CarIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock data for cars (would be fetched from API in real app)
const MOCK_CARS: Car[] = [
  {
    id: "1",
    model: "Renault Clio",
    licensePlate: "AA-123-BB",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800",
    pricePerDay: 40,
    available: true,
  },
  {
    id: "2",
    model: "Peugeot 208",
    licensePlate: "CC-456-DD",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    pricePerDay: 45,
    available: true,
  },
  {
    id: "3",
    model: "Volkswagen Golf",
    licensePlate: "EE-789-FF",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    pricePerDay: 50,
    available: false,
  },
  {
    id: "4",
    model: "Fiat 500",
    licensePlate: "GG-012-HH",
    image: "https://images.unsplash.com/photo-1617654112368-307b8947646c?q=80&w=800",
    pricePerDay: 35,
    available: true,
  },
  {
    id: "5",
    model: "Citroën C3",
    licensePlate: "II-345-JJ",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800",
    pricePerDay: 38,
    available: true,
  },
  {
    id: "6",
    model: "Ford Fiesta",
    licensePlate: "KK-678-LL",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800",
    pricePerDay: 42,
    available: true,
  },
];

// Extended car information for the vehicle page
interface ExtendedCarInfo {
  id: string;
  model: string;
  brand: string;
  licensePlate: string;
  image: string;
  pricePerDay: number;
  available: boolean;
  transmission: "Manuelle" | "Automatique";
  fuelType: "Essence" | "Diesel";
}

// Extended mock data with additional information
const EXTENDED_MOCK_CARS: ExtendedCarInfo[] = [
  {
    id: "1",
    model: "Clio",
    brand: "Renault",
    licensePlate: "AA-123-BB",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800",
    pricePerDay: 40,
    available: true,
    transmission: "Manuelle",
    fuelType: "Essence",
  },
  {
    id: "2",
    model: "208",
    brand: "Peugeot",
    licensePlate: "CC-456-DD",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    pricePerDay: 45,
    available: true,
    transmission: "Automatique",
    fuelType: "Diesel",
  },
  {
    id: "3",
    model: "Golf",
    brand: "Volkswagen",
    licensePlate: "EE-789-FF",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    pricePerDay: 50,
    available: false,
    transmission: "Manuelle",
    fuelType: "Diesel",
  },
  {
    id: "4",
    model: "500",
    brand: "Fiat",
    licensePlate: "GG-012-HH",
    image: "https://images.unsplash.com/photo-1617654112368-307b8947646c?q=80&w=800",
    pricePerDay: 35,
    available: true,
    transmission: "Manuelle",
    fuelType: "Essence",
  },
  {
    id: "5",
    model: "C3",
    brand: "Citroën",
    licensePlate: "II-345-JJ",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800",
    pricePerDay: 38,
    available: true,
    transmission: "Automatique",
    fuelType: "Essence",
  },
  {
    id: "6",
    model: "Fiesta",
    brand: "Ford",
    licensePlate: "KK-678-LL",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800",
    pricePerDay: 42,
    available: true,
    transmission: "Manuelle",
    fuelType: "Diesel",
  },
];

const VehiclesPage = () => {
  const [filteredCars, setFilteredCars] = useState<ExtendedCarInfo[]>(EXTENDED_MOCK_CARS);
  const [filters, setFilters] = useState({
    brand: "",
    transmission: "",
    fuelType: "",
    priceMax: "",
  });
  const { t } = useLanguage();

  const handleFilterChange = (
    key: string,
    value: string
  ) => {
    const newFilters = { ...filters, [key]: value };
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

    if (currentFilters.transmission) {
      result = result.filter(car => 
        car.transmission === currentFilters.transmission
      );
    }

    if (currentFilters.fuelType) {
      result = result.filter(car => 
        car.fuelType === currentFilters.fuelType
      );
    }

    if (currentFilters.priceMax && !isNaN(Number(currentFilters.priceMax))) {
      result = result.filter(car => 
        car.pricePerDay <= Number(currentFilters.priceMax)
      );
    }

    setFilteredCars(result);
  };

  const resetFilters = () => {
    setFilters({
      brand: "",
      transmission: "",
      fuelType: "",
      priceMax: "",
    });
    setFilteredCars(EXTENDED_MOCK_CARS);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
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
              <div className="md:w-1/4 bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center">
                    <Filter size={20} className="mr-2" />
                    {t('vehicles.filters')}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                  >
                    {t('vehicles.resetFilters')}
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Brand Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="brand">{t('vehicles.brand')}</Label>
                    <Input
                      id="brand"
                      placeholder={t('vehicles.searchBrand')}
                      value={filters.brand}
                      onChange={(e) => handleFilterChange("brand", e.target.value)}
                    />
                  </div>
                  
                  {/* Transmission Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="transmission">{t('vehicles.transmission')}</Label>
                    <Select
                      value={filters.transmission}
                      onValueChange={(value) => handleFilterChange("transmission", value)}
                    >
                      <SelectTrigger id="transmission">
                        <SelectValue placeholder={t('vehicles.allTypes')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('vehicles.allTypes')}</SelectItem>
                        <SelectItem value="Manuelle">{t('vehicles.manual')}</SelectItem>
                        <SelectItem value="Automatique">{t('vehicles.automatic')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Fuel Type Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">{t('vehicles.fuelType')}</Label>
                    <Select
                      value={filters.fuelType}
                      onValueChange={(value) => handleFilterChange("fuelType", value)}
                    >
                      <SelectTrigger id="fuelType">
                        <SelectValue placeholder={t('vehicles.allTypes')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('vehicles.allTypes')}</SelectItem>
                        <SelectItem value="Essence">{t('vehicles.gasoline')}</SelectItem>
                        <SelectItem value="Diesel">{t('vehicles.diesel')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="priceMax">{t('vehicles.maxPrice')}</Label>
                    <Input
                      id="priceMax"
                      type="number"
                      placeholder="Maximum €"
                      value={filters.priceMax}
                      onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Vehicles Grid */}
              <div className="md:w-3/4">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <CarIcon size={24} className="mr-2" />
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
                      <VehicleCard key={car.id} car={car} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Vehicle Card Component
const VehicleCard = ({ car }: { car: ExtendedCarInfo }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">{t('vehicles.unavailable')}</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
        
        <div className="mt-2 space-y-1 text-sm text-gray-600 flex-grow">
          <div className="flex justify-between">
            <span>{t('vehicles.transmission')}:</span>
            <span className="font-medium">
              {car.transmission === "Manuelle" ? t('vehicles.manual') : t('vehicles.automatic')}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>{t('vehicles.fuelType')}:</span>
            <span className="font-medium">
              {car.fuelType === "Essence" ? t('vehicles.gasoline') : t('vehicles.diesel')}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>{t('vehicles.licensePlate')}:</span>
            <span className="font-medium">{car.licensePlate}</span>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex items-end justify-between">
          <div className="font-semibold text-primary text-lg">
            {car.pricePerDay * 10} DH <span className="text-sm font-normal text-gray-500">{t('vehicles.pricePerDay')}</span>
          </div>
          
          <Button
            size="sm"
            disabled={!car.available}
            onClick={() => window.location.href = `/reservation/${car.id}`}
          >
            {car.available ? t('vehicles.reserve') : t('vehicles.unavailable')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
