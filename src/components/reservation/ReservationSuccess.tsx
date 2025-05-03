
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";

const ReservationSuccess = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="w-full flex justify-center items-center min-h-[50vh]">
      <div className="max-w-md text-center">
        <div className="mb-6 text-green-500 flex justify-center">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">{t('reservation.reservationReceived')}</h2>
        <p className="text-lg mb-8">
          {t('reservation.reservationThanks')}
        </p>
        <Button onClick={() => navigate("/")}>{t('reservation.returnHome')}</Button>
      </div>
    </div>
  );
};

export default ReservationSuccess;
