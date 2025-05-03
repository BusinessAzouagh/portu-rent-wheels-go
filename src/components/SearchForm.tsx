
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useLanguage } from "@/i18n/LanguageContext";
import DateTimeSelector from "./home/DateTimeSelector";

const SearchForm = ({ onSearch }: { onSearch: (formData: any) => void }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const { t, language } = useLanguage();
  
  // Get locale based on current language
  const getLocale = () => {
    switch (language) {
      case 'fr': return fr;
      // Add other locale imports if needed
      default: return undefined;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      return;
    }

    const formData = {
      startDate,
      startTime,
      endDate,
      endTime
    };

    onSearch(formData);
  };

  return (
    <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow-lg md:w-full lg:max-w-4xl mx-auto">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-center text-gray-800">{t('search.findPerfectCar')}</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date et heure de prise en charge */}
        <div>
          <DateTimeSelector
            label={t('search.startDate')}
            date={startDate}
            time={startTime}
            onDateChange={setStartDate}
            onTimeChange={setStartTime}
            locale={getLocale()}
          />
        </div>
        
        {/* Date et heure de restitution */}
        <div>
          <DateTimeSelector 
            label={t('search.endDate')}
            date={endDate}
            time={endTime}
            onDateChange={setEndDate}
            onTimeChange={setEndTime}
            minDate={startDate}
            locale={getLocale()}
          />
        </div>
        
        <div className="col-span-1 md:col-span-2 mt-2">
          <Button type="submit" className="w-full py-6">
            {t('common.search')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
