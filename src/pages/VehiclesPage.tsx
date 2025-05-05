import {useState} from "react";
import Layout from "@/components/Layout";
import {Car as CarIcon, Filter, ChevronLeft, ChevronRight} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useLanguage} from "@/i18n/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

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
        image: "/cars/Peugeot_black/1.jpg",
        images: [
            "/cars/Peugeot_black/1.jpg",
            "/cars/Peugeot_black/2.webp",
            "/cars/Peugeot_black/3.png",
            "/cars/Peugeot_black/4.jpg",
        ],
        available: true,
        transmission: "Manuelle",
    },
    {
        id: "2",
        model: "208",
        brand: "Peugeot",
        licensePlate: "CC-456-DD",
        color: "Gris",
        image: "/cars/Peugeot_gris/1.avif",
        images: [
            "/cars/Peugeot_gris/1.avif",
            "/cars/Peugeot_gris/2.jpg",
            "/cars/Peugeot_gris/3.webp",
            "/cars/Peugeot_gris/4.webp",
            "/cars/Peugeot_gris/5.jpg",
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
        image: "/cars/Peugeot_red/1.jpg",
        images: [
            "/cars/Peugeot_red/1.jpg",
            "/cars/Peugeot_red/2.jpg",
            "/cars/Peugeot_red/3.jpg",
            "/cars/Peugeot_red/4.jpg"
        ],
        available: true,
        transmission: "Manuelle",
    },
    {
        id: "4",
        model: "Leon",
        brand: "Siat",
        licensePlate: "GG-012-HH",
        color: "Noir",
        image: "/cars/Seat_black/1.png",
        images: [
            "/cars/Seat_black/1.png",
            "/cars/Seat_black/2.png"
        ],
        available: true,
        transmission: "Automatique",
    },
    {
        id: "5",
        model: "208",
        brand: "Peugeot",
        licensePlate: "II-345-JJ",
        color: "Jaune",
        image: "/cars/Peugeot_yellow/1.jpg",
        images: [
            "/cars/Peugeot_yellow/1.jpg",
            "/cars/Peugeot_yellow/2.png"
        ],
        available: true,
        transmission: "Manuelle",
    },
    {
        id: "6",
        model: "208",
        brand: "Peugeot",
        licensePlate: "KK-678-LL",
        color: "Vert",
        image: "/cars/Peugeot_green/1.webp",
        images: [
            "/cars/Peugeot_green/1.webp",
            "/cars/Peugeot_green/2.avif",
            "/cars/Peugeot_green/3.webp",
            "/cars/Peugeot_green/4.png",
            "/cars/Peugeot_green/5.webp",
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
        image: "/cars/Peugeot_blue/1.webp",
        images: [
            "/cars/Peugeot_blue/1.webp",
            "/cars/Peugeot_blue/2.jpg",
            "/cars/Peugeot_blue/3.jpg"
        ],
        available: true,
        transmission: "Manuelle",
    },
];

const VehiclesPage = () => {
    const [filteredCars, setFilteredCars] = useState<ExtendedCarInfo[]>(EXTENDED_MOCK_CARS);
    const [filters, setFilters] = useState({
        brand: "",
        transmission: "",
        color: "",
    });
    const {t} = useLanguage();

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
                                    <Filter size={20} className="mr-2"/>
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
                                            <SelectValue placeholder={t('vehicles.allTypes')}/>
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
                                            <SelectValue placeholder={t('vehicles.allColors')}/>
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
                    </div>
                </div>
            </section>
        </Layout>
    );
};

// Vehicle Card Component
const VehicleCard = ({car}: { car: ExtendedCarInfo }) => {
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
                </div>

                <Separator className="my-3"/>

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
