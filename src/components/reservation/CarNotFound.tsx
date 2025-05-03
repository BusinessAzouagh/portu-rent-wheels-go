
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";

const CarNotFound = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">{t('reservation.vehicleNotFound')}</h1>
      <p className="mb-6">{t('reservation.vehicleNotFoundText')}</p>
      <Button onClick={() => navigate("/")}>{t('reservation.returnHome')}</Button>
    </div>
  );
};

export default CarNotFound;
