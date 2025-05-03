
import { useLanguage } from "@/i18n/LanguageContext";
import { Car } from "@/types/cars";

interface PriceSummaryProps {
  car: Car;
  days: number;
  totalPrice: number;
}

const PriceSummary = ({ car, days, totalPrice }: PriceSummaryProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white p-3 rounded-md border border-gray-200 mt-4">
      <p className="font-medium text-primary">{t('reservation.totalPrice')}</p>
      <p className="font-bold text-lg">{totalPrice} {car.currencySymbol || 'DH'} ({days} {t('reservation.days')} {car.pricePerDay * 10} {car.currencySymbol || 'DH'})</p>
    </div>
  );
};

export default PriceSummary;
