
import CarCard, { Car } from "@/components/CarCard";
import { useLanguage } from "@/i18n/LanguageContext";

interface SearchResult extends Car {
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  hasSearched: boolean;
}

const SearchResults = ({ results, hasSearched }: SearchResultsProps) => {
  const { t, language } = useLanguage();
  
  // Determine currency display based on language
  const currencySymbol = language === "ar" ? "درهم" : "DH";
  
  if (!hasSearched) return null;
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {results.length > 0 
            ? `${results.length} ${t('vehicles.availableVehicles')}`
            : t('vehicles.noVehiclesFound')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map(car => (
            <CarCard 
              key={car.id} 
              car={{...car, currencySymbol}} 
              startDate={car.startDate}
              endDate={car.endDate}
              startTime={car.startTime}
              endTime={car.endTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
