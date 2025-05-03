
import { useState } from "react";
import { format } from "date-fns";
import { Locale } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { CalendarIcon, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimeSelectorProps {
  label: string;
  date?: Date;
  time: string;
  onDateChange: (date?: Date) => void;
  onTimeChange: (time: string) => void;
  minDate?: Date;
  locale?: Locale;
  dateError?: string;
  timeError?: boolean;
}

const DateTimeSelector = ({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate,
  locale,
  dateError,
  timeError,
}: DateTimeSelectorProps) => {
  const { t } = useLanguage();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Split current time into hours and minutes
  const [currentHour, currentMinute] = time.split(':');

  // Generate hours options (8-19)
  const hours = Array.from({ length: 12 }, (_, i) => (i + 8).toString().padStart(2, '0'));
  
  // Generate minutes options (0, 15, 30, 45)
  const minutes = ["00", "15", "30", "45"];
  
  const handleHourChange = (hour: string) => {
    const newTime = `${hour}:${currentMinute}`;
    onTimeChange(newTime);
  };
  
  const handleMinuteChange = (minute: string) => {
    const newTime = `${currentHour}:${minute}`;
    onTimeChange(newTime);
  };

  return (
    <div>
      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {/* Date Picker - Width adjusted for better text visibility */}
        <div className="md:col-span-3">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white border-gray-300 text-gray-800",
                  !date && "text-gray-500",
                  dateError && "border-red-500 ring-1 ring-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "dd/MM/yyyy", { locale })
                ) : (
                  <span>{t('search.chooseDate')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  onDateChange(selectedDate);
                  // Close the calendar immediately after selection
                  setIsCalendarOpen(false);
                }}
                initialFocus
                disabled={(currentDate) => 
                  minDate ? currentDate < minDate : currentDate < new Date()
                }
                className="p-3 pointer-events-auto"
                locale={locale}
              />
            </PopoverContent>
          </Popover>
          {dateError && (
            <p className="text-red-500 text-sm mt-1">{dateError}</p>
          )}
        </div>

        {/* Time Selectors - Hour and Minute with black text and adjusted width */}
        <div className="md:col-span-4 grid grid-cols-2 gap-2">
          <div>
            <Select value={currentHour} onValueChange={handleHourChange}>
              <SelectTrigger className={cn(
                "w-full bg-white border-gray-300 text-black",
                timeError && "border-red-500 ring-1 ring-red-500"
              )}>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue className="text-black" placeholder={t('common.hour')} />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white shadow-md">
                {hours.map(hour => (
                  <SelectItem key={hour} value={hour} className="text-black">{hour}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={currentMinute} onValueChange={handleMinuteChange}>
              <SelectTrigger className={cn(
                "w-full bg-white border-gray-300 text-black",
                timeError && "border-red-500 ring-1 ring-red-500"
              )}>
                <SelectValue className="text-black" placeholder={t('common.minute')} />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-md">
                {minutes.map(minute => (
                  <SelectItem key={minute} value={minute} className="text-black">{minute}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
