
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
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

  // Generate time options in 30-minute increments
  const timeOptions = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

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

  const handleTimeClick = (setter: React.Dispatch<React.SetStateAction<string>>) => (time: string) => {
    setter(time);
  };

  return (
    <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow-lg md:w-full lg:max-w-4xl mx-auto">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-center text-gray-800">{t('search.findPerfectCar')}</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date et heure de prise en charge */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.startDate')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white border-gray-300 text-gray-800",
                  !startDate && "text-gray-500"
                )}
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                {startDate ? (
                  <span className="text-gray-800">
                    {format(startDate, "dd MMMM yyyy", { locale: getLocale() })} à {startTime}
                  </span>
                ) : (
                  <span>{t('search.chooseDate')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="p-3 pointer-events-auto"
                />
                <div className="p-3 border-t border-gray-200">
                  <div className="mb-2 text-sm font-medium">{t('reservation.selectTime')}</div>
                  <div className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto">
                    {timeOptions.map((timeOption) => (
                      <Button
                        key={timeOption}
                        variant={startTime === timeOption ? "default" : "outline"}
                        className={cn(
                          "text-xs py-1 px-2 h-auto",
                          startTime === timeOption ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        )}
                        onClick={() => handleTimeClick(setStartTime)(timeOption)}
                      >
                        {timeOption}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Date et heure de restitution */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.endDate')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white border-gray-300 text-gray-800",
                  !endDate && "text-gray-500"
                )}
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                {endDate ? (
                  <span className="text-gray-800">
                    {format(endDate, "dd MMMM yyyy", { locale: getLocale() })} à {endTime}
                  </span>
                ) : (
                  <span>{t('search.chooseDate')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => (startDate && date < startDate) || date < new Date()}
                  className="p-3 pointer-events-auto"
                />
                <div className="p-3 border-t border-gray-200">
                  <div className="mb-2 text-sm font-medium">{t('reservation.selectTime')}</div>
                  <div className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto">
                    {timeOptions.map((timeOption) => (
                      <Button
                        key={timeOption}
                        variant={endTime === timeOption ? "default" : "outline"}
                        className={cn(
                          "text-xs py-1 px-2 h-auto",
                          endTime === timeOption ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        )}
                        onClick={() => handleTimeClick(setEndTime)(timeOption)}
                      >
                        {timeOption}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
