
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import CarCardWithGallery from "@/components/CarCardWithGallery";
import { MOCK_CARS_WITH_GALLERY } from "@/data/mockCars";

const FeaturedCars = () => {
  const { t } = useLanguage();
  // Only show the first 4 cars on the homepage for better performance
  const featuredCars = MOCK_CARS_WITH_GALLERY.slice(0, 4);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{t('vehicles.popularVehicles')}</h2>
          <p className="text-gray-600 mt-2">{t('vehicles.discoverFleet')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map(car => (
            <CarCardWithGallery key={car.id} car={car} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/vehicles">
            <Button variant="outline">{t('vehicles.ourVehicles')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
