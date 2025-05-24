
import { Car as CarIcon, Shield, Clock, Map } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { useLanguage } from "@/i18n/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default ServicesSection;

