
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchForm from "@/components/SearchForm";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeroSectionProps {
  onSearch: (formData: any) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <section 
      className="hero-section relative flex items-center justify-center text-white"
      style={{
        minHeight: "600px"
      }}
    >
      {/* Background Image with Overlay - Updated with new URL */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://i.imgur.com/cZONdw9.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black bg-opacity-60" />
      
      <div className="container relative z-10 mx-auto px-4 py-16">
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
        <SearchForm onSearch={onSearch} />
      </div>
    </section>
  );
};

export default HeroSection;
