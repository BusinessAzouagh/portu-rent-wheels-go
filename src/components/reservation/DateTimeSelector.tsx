
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

interface DateTimeSelectorProps {
  label: string;
  date: Date;
  time: string;
  onDateChange: (date?: Date) => void;
  onTimeChange: (time: string) => void;
  minDate?: Date;
  locale?: Locale;
  compact?: boolean;
}

const DateTimeSelector = ({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate,
  locale,
  compact = false
}: DateTimeSelectorProps) => {
  const { t } = useLanguage();
  
  // Generate hours options (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  
  // Generate minutes options (0, 15, 30, 45)
  const minutes = ["00", "15", "30", "45"];
  
  // Split current time into hours and minutes
  const [currentHour, currentMinute] = time.split(':');
  
  const handleHourChange = (hour: string) => {
    const newTime = `${hour}:${currentMinute}`;
    onTimeChange(newTime);
  };
  
  const handleMinuteChange = (minute: string) => {
    const newTime = `${currentHour}:${minute}`;
    onTimeChange(newTime);
  };
  
  // Format the date for display
  const formattedDate = format(date, compact ? "dd/MM/yy" : "dd MMM yyyy", { locale });
  
  return (
    <div className="space-y-2">
      {!compact && <label className="block text-sm font-medium">{label}</label>}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Date Picker */}
        <div className="flex-grow min-w-[140px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  compact ? "text-sm px-3 py-1 h-auto" : "",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className={cn("mr-2", compact ? "h-3 w-3" : "h-4 w-4")} />
                {formattedDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={onDateChange}
                initialFocus
                disabled={(currentDate) => 
                  minDate ? currentDate < minDate : currentDate < new Date()
                }
                className="p-3 pointer-events-auto"
                locale={locale}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Hour Selector */}
        <div className="w-[80px]">
          <Select value={currentHour} onValueChange={handleHourChange}>
            <SelectTrigger className={compact ? "h-8 text-sm" : ""}>
              <SelectValue placeholder={t('reservation.hour')} />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {hours.map(hour => (
                <SelectItem key={`hour-${hour}`} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Minute Selector */}
        <div className="w-[80px]">
          <Select value={currentMinute} onValueChange={handleMinuteChange}>
            <SelectTrigger className={compact ? "h-8 text-sm" : ""}>
              <SelectValue placeholder={t('reservation.minute')} />
            </SelectTrigger>
            <SelectContent>
              {minutes.map(minute => (
                <SelectItem key={`minute-${minute}`} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
