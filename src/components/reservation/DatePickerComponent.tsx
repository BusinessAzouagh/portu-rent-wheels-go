
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
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerComponentProps {
  date: Date;
  onDateChange: (date?: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
  compact?: boolean;
}

const DatePickerComponent = ({
  date,
  onDateChange,
  minDate,
  maxDate,
  locale,
  compact = false
}: DatePickerComponentProps) => {
  const { t } = useLanguage();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // Format the date for display
  const formattedDate = format(date, compact ? "dd/MM/yy" : "dd MMM yyyy", { locale });
  
  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <span className="sr-only">{t('search.selectDate')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onDateChange(selectedDate);
              // Close the calendar immediately after selection
              setIsCalendarOpen(false);
            }
          }}
          initialFocus
          disabled={(currentDate) => {
            let isDisabled = false;
            
            // Disable dates before minDate (for endDate picker)
            if (minDate) {
              const minDateWithoutTime = new Date(minDate);
              minDateWithoutTime.setHours(0, 0, 0, 0);
              if (currentDate < minDateWithoutTime) {
                isDisabled = true;
              }
            }
            
            // Disable dates after maxDate (for startDate picker)
            if (maxDate && !isDisabled) {
              const maxDateWithoutTime = new Date(maxDate);
              maxDateWithoutTime.setHours(23, 59, 59, 999);
              if (currentDate > maxDateWithoutTime) {
                isDisabled = true;
              }
            }
            
            // If neither of the above conditions matched, check if date is before today
            if (!isDisabled && !minDate) {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (currentDate < today) {
                isDisabled = true;
              }
            }
            
            return isDisabled;
          }}
          className="p-3 pointer-events-auto rounded-md border shadow-md"
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerComponent;
