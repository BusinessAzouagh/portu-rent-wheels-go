import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import CarCard, { Car } from "@/components/CarCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car as CarIcon, Shield, Clock, Map } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// Mock data for cars
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
];

const Home = () => {
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { t } = useLanguage();
  
  const handleSearch = (formData: any) => {
    console.log("Search data:", formData);
    // In a real app, this would make an API call to fetch available cars
    setSearchResults(MOCK_CARS.filter(car => car.available));
    setHasSearched(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Search Form */}
        <section className="hero-section flex items-center justify-center text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {t('home.rentIdealCar')}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {t('home.qualityVehicles')}
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <Link to="/vehicles">
                  <Button size="lg" variant="outline" className="bg-white bg-opacity-20 hover:bg-opacity-30 border-white text-white">
                    {t('vehicles.ourVehicles')}
                  </Button>
                </Link>
              </div>
            </div>
            <SearchForm onSearch={handleSearch} />
          </div>
        </section>
        
        {/* Search Results Section */}
        {hasSearched && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {searchResults.length > 0 
                  ? `${searchResults.length} ${t('vehicles.availableVehicles')}`
                  : t('vehicles.noVehiclesFound')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Featured Cars Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">{t('vehicles.popularVehicles')}</h2>
              <p className="text-gray-600 mt-2">{t('vehicles.discoverFleet')}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_CARS.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/vehicles">
                <Button variant="outline">{t('vehicles.ourVehicles')}</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">{t('services.ourServices')}</h2>
              <p className="text-gray-600 mt-2">{t('services.forYourComfort')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard 
                title={t('services.wideRange')}
                description={t('services.wideRangeText')}
                icon={<CarIcon size={32} />}
              />
              <ServiceCard 
                title={t('services.insurance')}
                description={t('services.insuranceText')}
                icon={<Shield size={32} />}
              />
              <ServiceCard 
                title={t('services.assistance')}
                description={t('services.assistanceText')}
                icon={<Clock size={32} />}
              />
              <ServiceCard 
                title={t('services.airportDelivery')}
                description={t('services.airportDeliveryText')}
                icon={<Map size={32} />}
              />
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="lg:flex items-center gap-12">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1612057457904-28f4785d24e5?q=80&w=800" 
                  alt="Portu Rent Team" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('about.aboutPortuRent')}</h2>
                <p className="text-gray-600 mb-4">
                  {t('about.historyText1')}
                </p>
                <p className="text-gray-600 mb-6">
                  {t('about.historyText2')}
                </p>
                <Link to="/about">
                  <Button>{t('common.about')}</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
