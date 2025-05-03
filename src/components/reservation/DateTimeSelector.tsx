
import { format } from "date-fns";
import { Locale } from "date-fns";
import { CalendarClock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";

interface DateTimeSelectorProps {
  label: string;
  date: Date;
  time: string;
  onDateChange: (date?: Date) => void;
  onTimeChange: (time: string) => void;
  minDate?: Date;
  locale?: Locale;
}

const DateTimeSelector = ({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate,
  locale
}: DateTimeSelectorProps) => {
  const { t } = useLanguage();
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  
  // Generate time options in 30-minute increments
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  
  const handleTimeClick = (selectedTime: string) => {
    onTimeChange(selectedTime);
    setIsTimeOpen(false);
  };
  
  return (
    <div>
      <label htmlFor={`${label}-date`} className="block mb-2">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal text-gray-800",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarClock className="mr-2 h-4 w-4" />
            {format(date, "dd MMMM yyyy", { locale })} à {time}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              initialFocus
              disabled={(currentDate) => 
                minDate ? currentDate < minDate : currentDate < new Date()
              }
              className="p-3 pointer-events-auto"
            />
            <div className="p-3 border-t border-gray-200">
              <div className="mb-2 text-sm font-medium">{t('reservation.selectTime')}</div>
              <div className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto">
                {timeOptions.map((timeOption) => (
                  <Button
                    key={timeOption}
                    variant={time === timeOption ? "default" : "outline"}
                    className={cn(
                      "text-xs py-1 px-2 h-auto",
                      time === timeOption ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                    onClick={() => handleTimeClick(timeOption)}
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
  );
};

export default DateTimeSelector;
