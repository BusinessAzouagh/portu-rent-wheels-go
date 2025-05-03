
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

const SearchForm = ({ onSearch }: { onSearch: (formData: any) => void }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
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
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date de prise en charge */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.startDate')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white border-gray-300",
                  !startDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "dd MMMM yyyy", { locale: getLocale() })
                ) : (
                  <span>{t('search.chooseDate')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                disabled={(date) => date < new Date()}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Heure de prise en charge */}
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.startTime')}
          </label>
          <Input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full bg-white border-gray-300 text-gray-800"
            required
          />
        </div>
        
        {/* Date de restitution */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.endDate')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white border-gray-300",
                  !endDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? (
                  format(endDate, "dd MMMM yyyy", { locale: getLocale() })
                ) : (
                  <span>{t('search.chooseDate')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => (startDate && date < startDate) || date < new Date()}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Heure de restitution */}
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.endTime')}
          </label>
          <Input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full bg-white border-gray-300 text-gray-800"
            required
          />
        </div>
        
        <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
          <Button type="submit" className="w-full py-6">
            {t('common.search')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
