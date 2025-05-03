
import { Button } from "@/components/ui/button";
import { Car } from "./CarCard";
import { useReservationForm } from "@/hooks/useReservationForm";
import { ReservationFormData } from "@/types/reservation";
import DateTimeSelector from "./reservation/DateTimeSelector";
import CustomerForm from "./reservation/CustomerForm";
import PriceSummary from "./reservation/PriceSummary";
import { useLanguage } from "@/i18n/LanguageContext";
import { fr, es, ar, enUS } from "date-fns/locale";

interface ReservationFormProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  onSubmit: (formData: ReservationFormData) => Promise<void>;
}

const ReservationForm = ({ car, startDate: initialStartDate, endDate: initialEndDate, onSubmit }: ReservationFormProps) => {
  const { t, language } = useLanguage();
  
  // Function to get locale based on current language - now using directly imported locales
  const getLocale = () => {
    switch (language) {
      case 'fr': return fr;
      case 'es': return es;
      case 'ar': return ar;
      default: return enUS; // Default to English
    }
  };
  
  const {
    startDate,
    endDate,
    startTime,
    endTime,
    formData,
    days,
    totalPrice,
    isSubmitting,
    handleChange,
    updateStartDateTime,
    updateEndDateTime,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSubmit
  } = useReservationForm({
    car,
    initialStartDate,
    initialEndDate,
    onSubmit,
    getLocale
  });
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('reservation.bookNow')} {car.model}</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium mb-4 text-primary">{t('reservation.rentalPeriod')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Combined Start Date and Time */}
          <DateTimeSelector
            label={t('search.startDate')}
            date={startDate}
            time={startTime}
            onDateChange={updateStartDateTime}
            onTimeChange={handleStartTimeChange}
            locale={getLocale()}
          />
          
          {/* Combined End Date and Time */}
          <DateTimeSelector
            label={t('search.endDate')}
            date={endDate}
            time={endTime}
            onDateChange={updateEndDateTime}
            onTimeChange={handleEndTimeChange}
            minDate={startDate}
            locale={getLocale()}
          />
        </div>
        
        <PriceSummary 
          car={car}
          days={days}
          totalPrice={totalPrice}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomerForm 
          formData={formData}
          onChange={handleChange}
        />
        
        <Button
          type="submit"
          className="w-full mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('reservation.processing') : t('reservation.confirmReservation')}
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
