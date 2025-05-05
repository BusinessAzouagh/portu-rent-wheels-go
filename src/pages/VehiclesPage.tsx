
import { useState } from "react";
import Layout from "@/components/Layout";
import { Car as CarIcon, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Extended car information for the vehicle page
interface ExtendedCarInfo {
  id: string;
  model: string;
  brand: string;
  licensePlate: string;
  color: string;
  image: string;
  images: string[];
  available: boolean;
  transmission: "Manuelle" | "Automatique";
}

// Extended mock data with additional information
const EXTENDED_MOCK_CARS: ExtendedCarInfo[] = [
  {
    id: "1",
    model: "208",
    brand: "Peugeot",
    licensePlate: "AA-123-BB",
    color: "Noir",
    image: "https://images.unsplash.com/photo-1617469767053-d3b16242fa54?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1617469767053-d3b16242fa54?q=80&w=800",
      "https://images.unsplash.com/photo-1617469767053-d3b16242fa54?q=80&w=800&angle=10",
      "https://images.unsplash.com/photo-1617469815450-52a8af2f591d?q=80&w=800",
      "https://images.unsplash.com/photo-1608983765214-1e455a249e17?q=80&w=800",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800",
      "https://images.unsplash.com/photo-1617468149629-4788ae5c5151?q=80&w=800"
    ],
    available: true,
    transmission: "Automatique",
  },
  {
    id: "2",
    model: "208",
    brand: "Peugeot",
    licensePlate: "CC-456-DD",
    color: "Gris",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800",
      "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?q=80&w=800",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800",
      "https://images.unsplash.com/photo-1607953070259-4c2705d35173?q=80&w=800",
      "https://images.unsplash.com/photo-1581829952606-7526345c99d6?q=80&w=800",
      "https://images.unsplash.com/photo-1570733577524-3a047079e80d?q=80&w=800",
      "https://images.unsplash.com/photo-1617284802361-d90a53cf45af?q=80&w=800"
    ],
    available: true,
    transmission: "Manuelle",
  },
  {
    id: "3",
    model: "208",
    brand: "Peugeot",
    licensePlate: "EE-789-FF",
    color: "Rouge",
    image: "https://images.unsplash.com/photo-1612828512773-4192eae44937?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1612828512773-4192eae44937?q=80&w=800",
      "https://images.unsplash.com/photo-1617074172287-ea8eecb37184?q=80&w=800",
      "https://images.unsplash.com/photo-1624135197012-5bce51ed9812?q=80&w=800",
      "https://images.unsplash.com/photo-1601640365825-66327247a486?q=80&w=800",
      "https://images.unsplash.com/photo-1617469817648-6bdb54e80efb?q=80&w=800",
      "https://images.unsplash.com/photo-1605515298946-d0573885718c?q=80&w=800",
      "https://images.unsplash.com/photo-1636292422797-1a201d8d9712?q=80&w=800"
    ],
    available: true,
    transmission: "Automatique",
  },
  {
    id: "4",
    model: "208",
    brand: "Peugeot",
    licensePlate: "GG-012-HH",
    color: "Blanc",
    image: "https://images.unsplash.com/photo-1605515340322-46718c184f35?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1605515340322-46718c184f35?q=80&w=800",
      "https://images.unsplash.com/photo-1617084246636-ffb6ba2d8f22?q=80&w=800",
      "https://images.unsplash.com/photo-1584369372267-a85f98cd334e?q=80&w=800",
      "https://images.unsplash.com/photo-1580274068197-0d3f2ee2a954?q=80&w=800",
      "https://images.unsplash.com/photo-1617083934551-2178fc3255df?q=80&w=800",
      "https://images.unsplash.com/photo-1524082983062-21c24967d6c9?q=80&w=800",
      "https://images.unsplash.com/photo-1531920327645-347e96a7f31e?q=80&w=800"
    ],
    available: true,
    transmission: "Manuelle",
  },
  {
    id: "5",
    model: "208",
    brand: "Peugeot",
    licensePlate: "II-345-JJ",
    color: "Jaune",
    image: "https://images.unsplash.com/photo-1610844330803-f7c495fe7ec7?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1610844330803-f7c495fe7ec7?q=80&w=800",
      "https://images.unsplash.com/photo-1610226444910-68b613162a80?q=80&w=800",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800",
      "https://images.unsplash.com/photo-1618843479255-1add2fae3215?q=80&w=800",
      "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?q=80&w=800",
      "https://images.unsplash.com/photo-1575996367261-5bb9b1904133?q=80&w=800",
      "https://images.unsplash.com/photo-1627694329308-df442eec48ab?q=80&w=800"
    ],
    available: true,
    transmission: "Automatique",
  },
  {
    id: "6",
    model: "208",
    brand: "Peugeot",
    licensePlate: "KK-678-LL",
    color: "Vert",
    image: "https://images.unsplash.com/photo-1615223456341-8a1c3be04166?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1615223456341-8a1c3be04166?q=80&w=800",
      "https://images.unsplash.com/photo-1608047246626-fc576853da28?q=80&w=800",
      "https://images.unsplash.com/photo-1611651186286-44d700e2f149?q=80&w=800",
      "https://images.unsplash.com/photo-1580274365290-3dde951e7a55?q=80&w=800",
      "https://images.unsplash.com/photo-1536400705173-21f5aefe60ca?q=80&w=800",
      "https://images.unsplash.com/photo-1626621335412-66dea66fc9a6?q=80&w=800",
      "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=800"
    ],
    available: true,
    transmission: "Manuelle",
  },
  {
    id: "7",
    model: "208",
    brand: "Peugeot",
    licensePlate: "MM-901-NN",
    color: "Bleu",
    image: "https://images.unsplash.com/photo-1610630694586-2af0950a2747?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1610630694586-2af0950a2747?q=80&w=800",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800",
      "https://images.unsplash.com/photo-1620366487638-195fb4e800ea?q=80&w=800",
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?q=80&w=800",
      "https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?q=80&w=800",
      "https://images.unsplash.com/photo-1607853554264-fd1e737f1873?q=80&w=800",
      "https://images.unsplash.com/photo-1625419584519-ce1c9df08be0?q=80&w=800"
    ],
    available: true,
    transmission: "Automatique",
  },
];

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

    if (currentFilters.transmission && currentFilters.transmission !== "all") {
      result = result.filter(car => 
        car.transmission === currentFilters.transmission
      );
    }

    if (currentFilters.color && currentFilters.color !== "all") {
      result = result.filter(car => 
        car.color.toLowerCase() === currentFilters.color.toLowerCase()
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

  // Get unique colors for filtering
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
                
                {/* Color Filter */}
                <div className="space-y-2">
                  <Label htmlFor="color">{t('vehicles.color')}</Label>
                  <Select
                    value={filters.color}
                    onValueChange={(value) => handleFilterChange("color", value)}
                  >
                    <SelectTrigger id="color">
                      <SelectValue placeholder={t('vehicles.allColors')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('vehicles.allColors')}</SelectItem>
                      {uniqueColors.map(color => (
                        <SelectItem key={color} value={color.toLowerCase()}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
    </Layout>
  );
};

// Vehicle Card Component
const VehicleCard = ({ car }: { car: ExtendedCarInfo }) => {
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
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={car.images[currentImageIndex]}
          alt={`${car.brand} ${car.model} - ${car.color}`}
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
        <h3 className="font-bold text-lg">{car.brand} {car.model} - {car.color}</h3>
        
        <div className="mt-2 space-y-1 text-sm text-gray-600 flex-grow">
          <div className="flex justify-between">
            <span>{t('vehicles.transmission')}:</span>
            <span className="font-medium">
              {car.transmission === "Manuelle" ? t('vehicles.manual') : t('vehicles.automatic')}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>{t('vehicles.color')}:</span>
            <span className="font-medium">{car.color}</span>
          </div>
          
          <div className="flex justify-between">
            <span>{t('vehicles.licensePlate')}:</span>
            <span className="font-medium">{car.licensePlate}</span>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex items-end justify-end">
          <WhatsAppButton
            size="sm"
            vehicleInfo={{
              model: `${car.brand} ${car.model} - ${car.color}`,
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

export default VehiclesPage;
