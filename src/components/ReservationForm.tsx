
import { Button } from "@/components/ui/button";
import { Car } from "./CarCard";
import { useReservationForm } from "@/hooks/useReservationForm";
import { ReservationFormData } from "@/types/reservation";
import DateTimeSelector from "./reservation/DateTimeSelector";
import CustomerForm from "./reservation/CustomerForm";
import PriceSummary from "./reservation/PriceSummary";
import { useLanguage } from "@/i18n/LanguageContext";
import { fr, es, ar, enUS } from "date-fns/locale";
import { useIsMobile } from "@/hooks/use-mobile"; 

interface ReservationFormProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  onSubmit: (formData: ReservationFormData) => Promise<void>;
}

const ReservationForm = ({ 
  car, 
  startDate: initialStartDate, 
  endDate: initialEndDate, 
  startTime: initialStartTime = "12:00", 
  endTime: initialEndTime = "12:00",
  onSubmit 
}: ReservationFormProps) => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  
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
    validationError,
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
    initialStartTime,
    initialEndTime,
    onSubmit,
    getLocale
  });
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('reservation.bookNow')} {car.model}</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium mb-4 text-primary">{t('reservation.rentalPeriod')}</h3>
        
        {/* Date/Time selectors */}
        <div className="mb-4 space-y-6">
          {/* Start date and end date - display side by side on non-mobile screens */}
          <div className={`grid ${isMobile ? 'gap-6' : 'grid-cols-2 gap-4'}`}>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">{t('common.start')}</h4>
              <DateTimeSelector
                label={t('common.start')}
                date={startDate}
                time={startTime}
                onDateChange={updateStartDateTime}
                onTimeChange={handleStartTimeChange}
                maxDate={endDate}
                locale={getLocale()}
                compact={false}
              />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">{t('common.end')}</h4>
              <DateTimeSelector
                label={t('common.end')}
                date={endDate}
                time={endTime}
                onDateChange={updateEndDateTime}
                onTimeChange={handleEndTimeChange}
                minDate={startDate}
                locale={getLocale()}
                compact={false}
              />
            </div>
          </div>
          
          {/* Display validation error if present */}
          {validationError && (
            <div className="text-sm font-medium text-destructive mt-2">
              {t(validationError)}
            </div>
          )}
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
          disabled={isSubmitting || !!validationError}
        >
          {isSubmitting ? t('reservation.processing') : t('reservation.confirmReservation')}
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
